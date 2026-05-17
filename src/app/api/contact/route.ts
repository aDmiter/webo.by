import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const message = await prisma.contactMessage.create({ data: parsed.data });
  await sendContactEmail(parsed.data);

  return NextResponse.json({ id: message.id });
}
