# WEBO.by

Сайт и минимальная админка студии web-разработки **WEBO.by**.

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Prisma** + **MySQL**
- **Tailwind CSS 4** + **BEM** (`flipbook__*`, `admin-panel__*`)
- **shadcn/ui**, **SWR**, **React Hook Form**, **Zod**, **Nodemailer**

## Страницы

| Публичные | Админка |
|-----------|---------|
| `/` Главная | `/admin` Обзор |
| `/services` | `/admin/settings` Цвета и контакты |
| `/portfolio` | `/admin/services` |
| `/blog` | `/admin/portfolio` |
| `/contacts` | `/admin/blog`, `/admin/messages` |

Каждая публичная страница — **100vh × 100vw**, переходы в стиле flipbook.

## Цвета (CSS-переменные)

- `--webo-bg` — фон (по умолчанию `#ffffff`)
- `--webo-primary` — основной `#03ccbd`
- `--webo-accent` — акцент `#ff6b4a`
- `--webo-fg` — текст

Редактируются в **Админка → Настройки** и сохраняются в MySQL.

## Быстрый старт

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:push
npm run db:seed
npm run dev
```

- Сайт: http://localhost:3001  
- Админка: http://localhost:3001/admin/login  
- Логин по умолчанию: `admin@webo.by` / `changeme` (см. `.env`)

## SMTP

Для отправки писем с формы контактов заполните `SMTP_*` и `MAIL_TO` в `.env`. Без SMTP заявки сохраняются в БД.
