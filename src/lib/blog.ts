import { BLOG_POSTS } from "@/data/blog-posts";
import { prisma } from "@/lib/prisma";

export type BlogPostView = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  publishedAt: Date | null;
};

function staticPosts(): BlogPostView[] {
  return BLOG_POSTS.map((post) => ({
    id: `static-${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverUrl: null,
    publishedAt: new Date(post.publishedAt),
  })).sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));
}

function mapDbPost(item: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  publishedAt: Date | null;
}): BlogPostView {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    coverUrl: item.coverUrl,
    publishedAt: item.publishedAt,
  };
}

export async function getBlogPosts(): Promise<BlogPostView[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });

    if (posts.length === 0) {
      return staticPosts();
    }

    return posts.map(mapDbPost);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[blog] getBlogPosts failed:", error);
    }
    return staticPosts();
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostView | null> {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
    if (post) return mapDbPost(post);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[blog] getBlogPostBySlug failed:", error);
    }
  }

  return staticPosts().find((post) => post.slug === slug) ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (rows.length > 0) return rows.map((r) => r.slug);
  } catch {
    // fallback below
  }
  return staticPosts().map((post) => post.slug);
}
