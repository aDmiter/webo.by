import { DEFAULT_THEME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export type SiteTheme = {
  siteName: string;
  tagline: string;
  colorBackground: string;
  colorPrimary: string;
  colorAccent: string;
  colorForeground: string;
  contactEmail: string;
  contactPhone: string | null;
  contactAddress: string | null;
};

export async function getSiteTheme(): Promise<SiteTheme> {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!settings) return { ...DEFAULT_THEME };
    return {
      siteName: settings.siteName,
      tagline: settings.tagline,
      colorBackground: settings.colorBackground,
      colorPrimary: settings.colorPrimary,
      colorAccent: settings.colorAccent,
      colorForeground: settings.colorForeground,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactAddress: settings.contactAddress,
    };
  } catch {
    return { ...DEFAULT_THEME };
  }
}

export function themeToCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--webo-bg": theme.colorBackground,
    "--webo-primary": theme.colorPrimary,
    "--webo-accent": theme.colorAccent,
    "--webo-fg": theme.colorForeground,
    "--background": theme.colorBackground,
    "--foreground": theme.colorForeground,
    "--primary": theme.colorPrimary,
    "--primary-foreground": "#ffffff",
    "--accent": theme.colorAccent,
    "--accent-foreground": "#ffffff",
    "--ring": theme.colorPrimary,
  };
}

export function themeStyle(theme: SiteTheme): React.CSSProperties {
  return themeToCssVars(theme) as React.CSSProperties;
}
