"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations";

type FormValues = z.infer<typeof loginSchema>;

type LoginError = {
  error?: string;
  message?: string;
};

export function LoginForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@webo.by", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await res.json().catch(() => ({}))) as LoginError;

    if (!res.ok) {
      const message =
        data.message ??
        (data.error === "invalid_credentials"
          ? "Неверный email или пароль"
          : "Не удалось войти. Попробуйте позже.");
      form.setError("password", { message });
      return;
    }

    router.push("/admin");
    router.refresh();
  });

  return (
    <form className="admin-panel__form-grid mx-auto max-w-sm" onSubmit={onSubmit}>
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        После первого запуска: <code className="font-mono">npm run db:push</code> и{" "}
        <code className="font-mono">npm run db:seed</code>. Пароль — из{" "}
        <code className="font-mono">ADMIN_PASSWORD</code> в <code className="font-mono">.env</code>.
      </p>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="username" {...form.register("email")} />
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" autoComplete="current-password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="mt-1 text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Вход…" : "Войти"}
      </Button>
    </form>
  );
}
