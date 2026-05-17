import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSection } from "@/components/site/PageSection";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Статья" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageSection className="flipbook__page--scroll flipbook__page--detail">
      <article className="blog-detail flipbook__reveal">
        <Link href="/blog" className="blog-detail__back">
          ← Блог
        </Link>
        <header>
          <h1 className="blog-detail__title">{post.title}</h1>
          {post.publishedAt && <p className="blog-detail__meta">{formatDate(post.publishedAt)}</p>}
        </header>
        <div
          className="blog-detail__prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PageSection>
  );
}
