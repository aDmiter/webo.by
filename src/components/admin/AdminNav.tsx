"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminBrand } from "@/components/admin/AdminBrand";

const links = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/settings", label: "Настройки" },
  { href: "/admin/services", label: "Услуги" },
  { href: "/admin/portfolio", label: "Портфолио" },
  { href: "/admin/blog", label: "Блог" },
  { href: "/admin/messages", label: "Заявки" },
];

type Props = {
  logoSrc: string;
};

export function AdminNav({ logoSrc }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="admin-panel__sidebar">
      <AdminBrand href="/admin" src={logoSrc} />
      <nav className="admin-panel__nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-panel__nav-link${pathname === link.href ? " admin-panel__nav-link--active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button type="button" className="admin-panel__logout" onClick={logout}>
        Выйти
      </button>
    </aside>
  );
}
