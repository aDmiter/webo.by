import { SWRProvider } from "@/components/providers/SWRProvider";
import { getSiteTheme, themeStyle } from "@/lib/theme";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getSiteTheme();

  return (
    <div className="admin-root" style={themeStyle(theme)}>
      <SWRProvider>{children}</SWRProvider>
      <Toaster richColors position="top-right" />
    </div>
  );
}
