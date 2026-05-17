import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = blogSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = {
    ...parsed.data,
    coverUrl: parsed.data.coverUrl || null,
    publishedAt: parsed.data.published ? new Date() : null,
  };

  const post = await prisma.blogPost.create({ data });
  return NextResponse.json(post, { status: 201 });
}
