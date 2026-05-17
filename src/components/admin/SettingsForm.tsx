"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settingsSchema } from "@/lib/validations";
import { toast } from "sonner";

type FormValues = z.infer<typeof settingsSchema>;

const colorFields: {
  key: keyof Pick<FormValues, "colorBackground" | "colorPrimary" | "colorAccent" | "colorForeground">;
  label: string;
}[] = [
  { key: "colorBackground", label: "Фон" },
  { key: "colorPrimary", label: "Основной" },
  { key: "colorAccent", label: "Акцент" },
  { key: "colorForeground", label: "Текст" },
];

export function SettingsForm() {
  const { data, mutate } = useSWR("/api/settings");
  const form = useForm<FormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "WEBO.by",
      tagline: "Студия web-разработки",
      colorBackground: "#ffffff",
      colorPrimary: "#03ccbd",
      colorAccent: "#ff6b4a",
      colorForeground: "#0f172a",
      contactEmail: "hello@webo.by",
    },
  });

  useEffect(() => {
    if (data) form.reset(data);
  }, [data, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      toast.error("Не удалось сохранить");
      return;
    }
    await mutate();
    toast.success("Настройки сохранены");
  });

  return (
    <form className="admin-panel__form-grid" onSubmit={onSubmit}>
      <div>
        <Label htmlFor="siteName">Название сайта</Label>
        <Input id="siteName" {...form.register("siteName")} />
      </div>
      <div>
        <Label htmlFor="tagline">Слоган</Label>
        <Input id="tagline" {...form.register("tagline")} />
      </div>
      {colorFields.map(({ key, label }) => (
        <div key={key} className="admin-panel__color-row">
          <Input type="color" {...form.register(key)} />
          <div>
            <Label>{label}</Label>
            <Input {...form.register(key)} />
          </div>
        </div>
      ))}
      <div>
        <Label htmlFor="contactEmail">Email</Label>
        <Input id="contactEmail" {...form.register("contactEmail")} />
      </div>
      <div>
        <Label htmlFor="contactPhone">Телефон</Label>
        <Input id="contactPhone" {...form.register("contactPhone")} />
      </div>
      <div>
        <Label htmlFor="contactAddress">Адрес</Label>
        <Input id="contactAddress" {...form.register("contactAddress")} />
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  );
}
