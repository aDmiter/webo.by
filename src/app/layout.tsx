import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { faviconUrl } from "@/lib/assets.server";
import { getSiteTheme } from "@/lib/theme";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const theme = await getSiteTheme();
  return {
    title: {
      default: `${theme.siteName} — ${theme.tagline}`,
      template: `%s · ${theme.siteName}`,
    },
    description: theme.tagline,
    icons: {
      icon: faviconUrl(),
      shortcut: faviconUrl(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full`}>
      <body className="h-full overflow-hidden font-sans antialiased">{children}</body>
    </html>
  );
}
