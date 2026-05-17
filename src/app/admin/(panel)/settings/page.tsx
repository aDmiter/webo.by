import { SettingsForm } from "@/components/admin/SettingsForm";

export default function AdminSettingsPage() {
  return (
    <>
      <h1 className="admin-panel__title">Настройки</h1>
      <p className="mb-6 max-w-xl text-sm text-slate-500">
        Цвета задаются CSS-переменными (--webo-primary, --webo-accent и др.) и применяются на всём сайте.
      </p>
      <div className="admin-panel__card">
        <SettingsForm />
      </div>
    </>
  );
}
