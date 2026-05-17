"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  PortfolioEditDialog,
  type PortfolioAdminItem,
} from "@/components/admin/PortfolioEditDialog";
import { toast } from "sonner";

export function PortfolioManager() {
  const { data, mutate, isLoading } = useSWR<PortfolioAdminItem[]>("/api/admin/portfolio");
  const [items, setItems] = useState<PortfolioAdminItem[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<PortfolioAdminItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const list = items;
  const listRef = useRef(items);
  listRef.current = items;

  const saveOrder = async (ordered: PortfolioAdminItem[]) => {
    setSavingOrder(true);
    try {
      const res = await fetch("/api/portfolio/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: ordered.map((i) => i.id) }),
      });
      if (!res.ok) throw new Error("reorder failed");
      toast.success("Порядок сохранён");
      await mutate();
    } catch {
      toast.error("Не удалось сохранить порядок");
      if (data) setItems(data);
    } finally {
      setSavingOrder(false);
    }
  };

  const onDragStart = (index: number) => setDragIndex(index);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const next = [...list];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(index, 0, moved);
    setDragIndex(index);
    setItems(next);
  };

  const onDragEnd = () => {
    const wasDragging = dragIndex !== null;
    setDragIndex(null);
    if (wasDragging) void saveOrder(listRef.current);
  };

  const openEdit = (item: PortfolioAdminItem) => {
    setEditing(item);
    setDialogOpen(true);
  };

  return (
    <>
      <p className="mb-4 text-sm text-slate-500">
        Перетащите проекты для изменения порядка. Первый в списке — выше в карусели.
        {savingOrder && " · Сохранение…"}
      </p>

      <ul className="space-y-2">
        {list.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            className={`admin-panel__card admin-portfolio__item${dragIndex === index ? " admin-portfolio__item--dragging" : ""}`}
          >
            <div className="flex items-start gap-3">
              <span className="admin-portfolio__handle" title="Перетащить">
                ⋮⋮
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {item.sortOrder}. {item.title}
                  {item.featured && (
                    <span className="ml-2 text-xs text-[var(--webo-primary)]">· флагман</span>
                  )}
                  {!item.published && (
                    <span className="ml-2 text-xs text-slate-400">· скрыт</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-slate-500 line-clamp-1">{item.excerpt}</p>
                <p className="mt-1 text-xs text-slate-400">/portfolio/{item.slug}</p>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => openEdit(item)}>
                Редактировать
              </Button>
            </div>
          </li>
        ))}
        {!isLoading && list.length === 0 && (
          <li className="text-sm text-slate-400">Нет проектов. Запустите npm run db:seed</li>
        )}
      </ul>

      <PortfolioEditDialog
        item={editing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSaved={() => {
          mutate();
          setItems([]);
        }}
      />
    </>
  );
}
