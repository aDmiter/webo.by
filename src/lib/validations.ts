import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Сообщение слишком короткое"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const settingsSchema = z.object({
  siteName: z.string().min(2),
  tagline: z.string().min(2),
  colorBackground: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  colorPrimary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  colorAccent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  colorForeground: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

const urlOrPath = z
  .string()
  .trim()
  .refine((value) => value === "" || value.startsWith("/") || /^https?:\/\//i.test(value), {
    message: "Укажите https://... или путь, например /images/portfolio/name.jpg",
  });

export const portfolioSchema = z.object({
  title: z.string().min(2, "Минимум 2 символа"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Только латиница, цифры и дефис"),
  excerpt: z.string().min(10, "Минимум 10 символов"),
  description: z.string().min(10, "Минимум 10 символов"),
  content: z.string().optional(),
  imageUrl: z.union([z.literal(""), urlOrPath]).optional(),
  projectUrl: z.union([z.literal(""), urlOrPath]).optional(),
  tags: z.string().optional(),
  featured: z.boolean(),
  sortOrder: z.coerce.number().int(),
  published: z.boolean(),
});

export const portfolioUpdateSchema = portfolioSchema;

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
