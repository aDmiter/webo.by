import { PageSection } from "@/components/site/PageSection";
import { PortfolioPageContent } from "@/components/site/PortfolioPageContent";
import { getPortfolioItems } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <PageSection className="flipbook__page--screen flipbook__page--portfolio">
      <PortfolioPageContent items={items} />
    </PageSection>
  );
}
