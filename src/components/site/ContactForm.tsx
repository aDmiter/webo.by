"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { contactSchema } from "@/lib/validations";

type FormValues = z.infer<typeof contactSchema>;

type Props = {
  variant?: "page" | "modal";
  compact?: boolean;
  defaultMessage?: string;
  onSuccess?: () => void;
};

export function ContactForm({ variant = "page", compact = false, defaultMessage = "", onSuccess }: Props) {
  const formClass = variant === "modal" ? "flipbook__form flipbook__form--modal" : "flipbook__form";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: defaultMessage },
  });

  useEffect(() => {
    if (defaultMessage) setValue("message", defaultMessage);
  }, [defaultMessage, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset({ name: "", email: "", phone: "", message: defaultMessage });
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  });

  const id = variant;

  return (
    <form className={formClass} onSubmit={onSubmit}>
      <div className="flipbook__form-row">
        <label htmlFor={`name-${id}`}>Имя</label>
        <input id={`name-${id}`} {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flipbook__form-row">
        <label htmlFor={`email-${id}`}>Email</label>
        <input id={`email-${id}`} type="email" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flipbook__form-row">
        <label htmlFor={`phone-${id}`}>Телефон</label>
        <input id={`phone-${id}`} {...register("phone")} />
      </div>
      <div className="flipbook__form-row">
        <label htmlFor={`message-${id}`}>Сообщение</label>
        <textarea
          id={`message-${id}`}
          rows={variant === "modal" ? 5 : compact ? 3 : 4}
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>
      <button type="submit" className="flipbook__cta" disabled={status === "loading"}>
        {status === "loading" ? "Отправка…" : "Отправить заявку"}
      </button>
      {status === "success" && (
        <p className="text-sm text-[var(--webo-primary)]">Спасибо! Мы свяжемся с вами.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">Не удалось отправить. Попробуйте позже.</p>
      )}
    </form>
  );
}
