import { AdminBrand } from "@/components/admin/AdminBrand";
import { LoginForm } from "@/components/admin/LoginForm";
import { logoUrl } from "@/lib/assets.server";

export default function AdminLoginPage() {
  return (
    <div className="admin-login flex min-h-[100vh] flex-col items-center justify-center gap-8 bg-white p-6">
      <AdminBrand href="/" src={logoUrl()} />
      <div className="w-full max-w-md space-y-6">
        <p className="text-center text-sm text-slate-500">Вход в панель управления</p>
        <LoginForm />
      </div>
    </div>
  );
}
