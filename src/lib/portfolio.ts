import { PORTFOLIO_PROJECTS } from "@/data/portfolio-projects";
import { prisma } from "@/lib/prisma";

export type PortfolioItemView = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string | null;
  featured: boolean;
  sortOrder: number;
};

function staticPortfolioItems(): PortfolioItemView[] {
  return PORTFOLIO_PROJECTS.map((project) => ({
    id: `static-${project.slug}`,
    slug: project.slug,
    title: project.title,
    excerpt: project.excerpt,
    description: project.description,
    content: project.content,
    imageUrl: project.imagePath,
    projectUrl: project.projectUrl,
    tags: project.tags,
    featured: project.featured,
    sortOrder: project.sortOrder,
  })).sort((a, b) => a.sortOrder - b.sortOrder);
}

function mapDbItem(item: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string | null;
  featured: boolean;
  sortOrder: number;
}): PortfolioItemView {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    description: item.description,
    content: item.content,
    imageUrl: item.imageUrl,
    projectUrl: item.projectUrl,
    tags: item.tags,
    featured: item.featured,
    sortOrder: item.sortOrder,
  };
}

export async function getPortfolioItems(): Promise<PortfolioItemView[]> {
  try {
    const items = await prisma.portfolioItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }],
    });

    if (items.length === 0) {
      return staticPortfolioItems();
    }

    return items
      .map(mapDbItem)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.sortOrder - b.sortOrder;
      });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[portfolio] getPortfolioItems failed:", error);
    }
    return staticPortfolioItems();
  }
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItemView | null> {
  try {
    const item = await prisma.portfolioItem.findFirst({
      where: { slug, published: true },
    });
    if (item) return mapDbItem(item);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[portfolio] getPortfolioItemBySlug failed:", error);
    }
  }

  return staticPortfolioItems().find((item) => item.slug === slug) ?? null;
}

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.portfolioItem.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (rows.length > 0) return rows.map((r) => r.slug);
  } catch {
    // fallback below
  }
  return staticPortfolioItems().map((item) => item.slug);
}
