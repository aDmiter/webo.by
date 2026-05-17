import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let services = 0;
  let portfolio = 0;
  let posts = 0;
  let messages = 0;

  try {
    [services, portfolio, posts, messages] = await Promise.all([
      prisma.service.count(),
      prisma.portfolioItem.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
  } catch {
    // DB not ready
  }

  return (
    <>
      <h1 className="admin-panel__title">Обзор</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Услуги", value: services, href: "/admin/services" },
          { label: "Портфолио", value: portfolio, href: "/admin/portfolio" },
          { label: "Статьи", value: posts, href: "/admin/blog" },
          { label: "Новые заявки", value: messages, href: "/admin/messages" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="admin-panel__card hover:border-[var(--webo-primary)]">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold">{item.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
