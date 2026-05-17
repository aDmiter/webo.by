import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { portfolioUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const parsed = portfolioUpdateSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join("; ");
    return NextResponse.json({ error: message, details: parsed.error.flatten() }, { status: 400 });
  }

  const data = {
    ...parsed.data,
    content: parsed.data.content?.trim() || null,
    imageUrl: parsed.data.imageUrl?.trim() ? parsed.data.imageUrl.trim() : null,
    projectUrl: parsed.data.projectUrl?.trim() ? parsed.data.projectUrl.trim() : null,
    tags: parsed.data.tags?.trim() ? parsed.data.tags.trim() : null,
  };

  try {
    const item = await prisma.$transaction(async (tx) => {
      if (data.featured) {
        await tx.portfolioItem.updateMany({
          where: { id: { not: id }, featured: true },
          data: { featured: false },
        });
      }

      return tx.portfolioItem.update({
        where: { id },
        data,
      });
    });

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Такой slug уже используется" }, { status: 400 });
      }
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Проект не найден" }, { status: 404 });
      }
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.error("[portfolio PATCH] validation", error.message);
      return NextResponse.json(
        {
          error:
            "Схема Prisma устарела. Остановите dev-сервер, выполните npx prisma generate и перезапустите npm run dev.",
        },
        { status: 500 },
      );
    }
    console.error("[portfolio PATCH]", error);
    return NextResponse.json({ error: "Ошибка базы данных" }, { status: 500 });
  }
}
