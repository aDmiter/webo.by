import { notFound } from "next/navigation";
import { PageSection } from "@/components/site/PageSection";
import { PortfolioDetailClient } from "@/components/site/PortfolioDetailClient";
import { getPortfolioItemBySlug, getPortfolioSlugs } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return { title: "Проект" };
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  return (
    <PageSection className="flipbook__page--scroll flipbook__page--detail">
      <PortfolioDetailClient item={item} />
    </PageSection>
  );
}
