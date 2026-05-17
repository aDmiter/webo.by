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
      googleAnalyticsId: "",
      yandexMetrikaId: "",
    },
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      ...data,
      googleAnalyticsId: data.googleAnalyticsId ?? "",
      yandexMetrikaId: data.yandexMetrikaId ?? "",
    });
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

      <fieldset className="admin-panel__fieldset">
        <legend className="admin-panel__fieldset-legend">Аналитика</legend>
        <p className="admin-panel__fieldset-hint">
          ID из кабинетов Google Analytics 4 и Яндекс Метрики. Оставьте пустым, чтобы отключить
          счётчик.
        </p>
        <div>
          <Label htmlFor="googleAnalyticsId">Google Analytics (ID потока)</Label>
          <Input
            id="googleAnalyticsId"
            placeholder="G-XXXXXXXXXX"
            autoComplete="off"
            {...form.register("googleAnalyticsId")}
          />
          {form.formState.errors.googleAnalyticsId && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.googleAnalyticsId.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="yandexMetrikaId">Яндекс Метрика (номер счётчика)</Label>
          <Input
            id="yandexMetrikaId"
            placeholder="12345678"
            inputMode="numeric"
            autoComplete="off"
            {...form.register("yandexMetrikaId")}
          />
          {form.formState.errors.yandexMetrikaId && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.yandexMetrikaId.message}</p>
          )}
        </div>
      </fieldset>

      <Button type="submit">Сохранить</Button>
    </form>
  );
}
