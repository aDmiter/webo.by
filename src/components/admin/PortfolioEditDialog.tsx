"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { portfolioSchema } from "@/lib/validations";
import { toast } from "sonner";

export type PortfolioAdminItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  tags: string | null;
  featured: boolean;
  sortOrder: number;
  published: boolean;
};

type FormValues = z.infer<typeof portfolioSchema>;

type Props = {
  item: PortfolioAdminItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

export function PortfolioEditDialog({ item, open, onOpenChange, onSaved }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(portfolioSchema),
  });

  useEffect(() => {
    if (!item || !open) return;
    form.reset({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      description: item.description,
      content: item.content ?? "",
      imageUrl: item.imageUrl ?? "",
      projectUrl: item.projectUrl ?? "",
      tags: item.tags ?? "",
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
    });
  }, [item, open, form]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (!item) return;
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(payload.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Проект обновлён");
      onSaved();
      onOpenChange(false);
    },
    (fieldErrors) => {
      const first = Object.values(fieldErrors)[0];
      toast.error(first?.message?.toString() ?? "Проверьте поля формы");
    },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать проект</DialogTitle>
        </DialogHeader>
        <form className="admin-panel__form-grid" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="title">Название</Label>
            <Input id="title" {...form.register("title")} />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" {...form.register("slug")} />
          </div>
          <div>
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea id="excerpt" rows={2} {...form.register("excerpt")} />
          </div>
          <div>
            <Label htmlFor="description">Описание (карточка)</Label>
            <Textarea id="description" rows={3} {...form.register("description")} />
          </div>
          <div>
            <Label htmlFor="content">Полный текст (страница проекта)</Label>
            <Textarea id="content" rows={5} {...form.register("content")} />
          </div>
          <div>
            <Label htmlFor="projectUrl">URL сайта</Label>
            <Input id="projectUrl" {...form.register("projectUrl")} />
          </div>
          <div>
            <Label htmlFor="imageUrl">URL скриншота</Label>
            <Input id="imageUrl" {...form.register("imageUrl")} />
          </div>
          <div>
            <Label htmlFor="tags">Теги</Label>
            <Input id="tags" {...form.register("tags")} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="featured">Флагманский проект</Label>
            <Switch
              id="featured"
              checked={form.watch("featured")}
              onCheckedChange={(v) => form.setValue("featured", v)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="published">Опубликован</Label>
            <Switch
              id="published"
              checked={form.watch("published")}
              onCheckedChange={(v) => form.setValue("published", v)}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
