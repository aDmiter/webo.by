import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = reorderSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.$transaction(
    parsed.data.ids.map((id, index) =>
      prisma.portfolioItem.update({
        where: { id },
        data: { sortOrder: index + 1 },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}
