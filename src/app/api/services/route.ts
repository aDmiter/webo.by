import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";

export async function GET() {
  const items = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = serviceSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.service.create({ data: parsed.data });
  return NextResponse.json(item, { status: 201 });
}
