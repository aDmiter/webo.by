import { AnalyticsScripts } from "@/components/site/AnalyticsScripts";
import { BrandLogo } from "@/components/site/BrandLogo";
import { FlipbookShell } from "@/components/site/FlipbookShell";
import { pageBackgroundUrl } from "@/lib/assets.server";
import { getSiteTheme, themeStyle } from "@/lib/theme";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getSiteTheme();

  const siteStyle = {
    ...themeStyle(theme),
    ["--flipbook-bg-image" as string]: `url("${pageBackgroundUrl()}")`,
  };

  return (
    <div className="site-root" style={siteStyle}>
      <AnalyticsScripts
        googleAnalyticsId={theme.googleAnalyticsId}
        yandexMetrikaId={theme.yandexMetrikaId}
      />
      <BrandLogo />
      <FlipbookShell>{children}</FlipbookShell>
    </div>
  );
}
