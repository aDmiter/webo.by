import { AdminNav } from "@/components/admin/AdminNav";
import { logoUrl } from "@/lib/assets.server";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-panel">
      <AdminNav logoSrc={logoUrl()} />
      <main className="admin-panel__main">{children}</main>
    </div>
  );
}
