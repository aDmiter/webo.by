import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioSchema } from "@/lib/validations";

export async function GET() {
  const items = await prisma.portfolioItem.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = portfolioSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = {
    ...parsed.data,
    imageUrl: parsed.data.imageUrl || null,
    projectUrl: parsed.data.projectUrl || null,
  };

  const item = await prisma.portfolioItem.create({ data });
  return NextResponse.json(item, { status: 201 });
}
