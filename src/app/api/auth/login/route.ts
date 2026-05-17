import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createSessionToken } from "@/lib/auth";
import { AUTH_COOKIE } from "@/lib/constants";
import { isSecureCookie } from "@/lib/cookie";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 400 });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    const token = await createSessionToken({ sub: user.id, email: user.email });
    const response = NextResponse.json({ ok: true, email: user.email });

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: isSecureCookie(request),
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      console.error("[auth/login] database error:", error.message);
      return NextResponse.json(
        {
          error: "database_unavailable",
          message:
            "База данных недоступна. Проверьте DATABASE_URL в .env и выполните: npm run db:push && npm run db:seed",
        },
        { status: 503 },
      );
    }
    console.error("[auth/login]", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
