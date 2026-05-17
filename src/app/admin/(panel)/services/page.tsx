import { prisma } from "@/lib/prisma";

export default async function AdminServicesPage() {
  let items: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    items = [];
  }

  return (
    <>
      <h1 className="admin-panel__title">Услуги</h1>
      <p className="mb-4 text-sm text-slate-500">
        CRUD через API <code className="text-xs">POST /api/services</code>. Расширенный UI — следующий этап.
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel__card">
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{item.description}</p>
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-slate-400">Пока нет записей — добавьте через seed или API.</li>}
      </ul>
    </>
  );
}
