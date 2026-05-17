import { prisma } from "@/lib/prisma";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    posts = [];
  }

  return (
    <>
      <h1 className="admin-panel__title">Блог</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="admin-panel__card">
            <p className="font-medium">{post.title}</p>
            <p className="mt-1 text-xs text-slate-400">{post.published ? "Опубликован" : "Черновик"}</p>
          </li>
        ))}
        {posts.length === 0 && <li className="text-sm text-slate-400">Нет статей.</li>}
      </ul>
    </>
  );
}
