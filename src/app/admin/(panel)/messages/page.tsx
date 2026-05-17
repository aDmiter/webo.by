import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    messages = [];
  }

  return (
    <>
      <h1 className="admin-panel__title">Заявки</h1>
      <ul className="space-y-3">
        {messages.map((msg) => (
          <li key={msg.id} className="admin-panel__card">
            <p className="font-medium">
              {msg.name} · {msg.email}
            </p>
            <p className="mt-2 text-sm text-slate-600">{msg.message}</p>
            <p className="mt-2 text-xs text-slate-400">{msg.createdAt.toLocaleString("ru-BY")}</p>
          </li>
        ))}
        {messages.length === 0 && <li className="text-sm text-slate-400">Заявок пока нет.</li>}
      </ul>
    </>
  );
}
