import { PageSection } from "@/components/site/PageSection";
import { HomePageContent } from "@/components/site/HomePageContent";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSiteTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [theme, portfolio] = await Promise.all([getSiteTheme(), getPortfolioItems()]);

  return (
    <PageSection className="flipbook__page--screen flipbook__page--home">
      <HomePageContent tagline={theme.tagline} portfolio={portfolio} />
    </PageSection>
  );
}
