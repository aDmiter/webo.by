<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

For a full doc index: `node_modules/next/dist/docs/index.mdx` or https://nextjs.org/docs/llms.txt

<!-- END:nextjs-agent-rules -->

# WEBO.by — agent guide

Site and minimal admin panel for the **WEBO.by** web development studio (Belarus). UI copy is **Russian** unless the user asks otherwise.

## Stack (pinned)

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.2** App Router, React 19, TypeScript |
| Styling | Tailwind CSS **4**, **BEM** for layout/animation (`flipbook__*`, `admin-panel__*`) |
| UI | shadcn/ui (`base-nova`), Lucide icons |
| Data | Prisma **6.19** + **MySQL** |
| Forms / fetch | React Hook Form, Zod, SWR (admin client) |
| Auth | JWT in httpOnly cookie (`jose`), `bcryptjs` |
| Mail | Nodemailer (optional SMTP) |

**Dev server port:** `3001` (`npm run dev` / `npm run start`). Do not assume port 3000.

## Repository layout

```
src/app/(site)/          Public pages (100vh flipbook)
src/app/admin/           Admin: login + (panel) with sidebar
src/app/api/             REST route handlers
src/components/site/     FlipbookShell, PageSection, ContactForm
src/components/admin/    AdminNav, SettingsForm, LoginForm
src/components/ui/       shadcn primitives
src/lib/                 prisma, auth, theme, validations, mail, constants
src/styles/flipbook.css  Public BEM + flip animations
src/styles/admin.css     Admin BEM
prisma/schema.prisma     MySQL models
prisma/seed.ts           Default settings, admin user, sample services
```

Path alias: `@/*` → `src/*` (see `components.json`).

## Product rules

### Public site

- Five routes: `/`, `/services`, `/portfolio`, `/blog`, `/contacts`.
- Each page is **one full viewport** (`100vh` × `100vw`). Content lives in `PageSection` inside `FlipbookShell`.
- Page transitions use **flipbook-style** CSS (`flipbook__content--forward|backward` in `FlipbookShell.tsx`). Prefer extending `src/styles/flipbook.css` over ad-hoc animations.
- Navigation: fixed header + right-side dots (`NAV_ITEMS` in `src/lib/constants.ts`).

### Theme / colors

Brand tokens (also stored in DB `SiteSettings`):

| CSS variable | Default | Role |
|--------------|---------|------|
| `--webo-bg` | `#ffffff` | Background |
| `--webo-primary` | `#03ccbd` | Primary brand |
| `--webo-accent` | `#ff6b4a` | Accent |
| `--webo-fg` | `#0f172a` | Text |

- Server: `getSiteTheme()` / `themeStyle()` in `src/lib/theme.ts` — applied on `(site)/layout` and `admin/layout`.
- Admin edits colors at `/admin/settings` → `PUT /api/settings` (auth required).
- When changing colors, update **CSS variables** and keep shadcn `--primary` / `--accent` in sync via `themeToCssVars()`.
- Light theme only; do not add dark mode unless requested.

### Admin

- Login: `/admin/login` (no sidebar). Panel: `/admin/*` under `(panel)/layout.tsx`.
- `src/middleware.ts` protects `/admin/*` except `/admin/login` (JWT cookie `webo_admin_token`).
- Mutating API routes must call `getAdminSession()` and return `401` if missing.
- Admin lists are read-only UI for now; create/update goes through API (`POST /api/services`, etc.) or seed.

## Database

```bash
docker compose up -d    # MySQL :3306, DB webo_by
npm run db:push         # sync schema
npm run db:seed         # settings + admin + sample data
npm run db:migrate      # prefer for production migrations
```

- Connection: `DATABASE_URL` in `.env` (see `.env.example`).
- Default admin: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env` (seed overwrites hash).
- Prisma client: `src/lib/prisma.ts`. Use **Prisma 6** patterns (`url` in `schema.prisma`) — do not upgrade to Prisma 7 without explicit request.
- Server components that query DB should **try/catch** or tolerate missing DB at build time (see existing pages).

Models: `SiteSettings`, `AdminUser`, `Service`, `PortfolioItem`, `BlogPost`, `ContactMessage`.

## API conventions

| Route | GET | POST/PUT |
|-------|-----|----------|
| `/api/settings` | public read | admin `PUT` |
| `/api/contact` | — | public `POST` (saves + optional email) |
| `/api/services`, `/api/portfolio`, `/api/blog` | published only | admin `POST` |
| `/api/auth/login`, `/api/auth/logout` | — | auth |

Validation schemas: `src/lib/validations.ts` (Zod). Reuse them in API and forms.

## Coding conventions

1. **Minimal diffs** — match existing style; no drive-by refactors.
2. **BEM** for site/admin layout classes; Tailwind for utilities and shadcn.
3. **Server Components** by default; `"use client"` only for hooks, SWR, forms, `FlipbookShell`.
4. New shadcn components: `npx shadcn@latest add <name>`.
5. Do not commit `.env` or secrets.
6. Do not change dev port from `3001` without updating `package.json`, `.env.example`, and README.
7. Invalid JSX tag names (e.g. `motionless-*`) break the build — use standard HTML elements.

## Common tasks

| Task | Where to work |
|------|----------------|
| New public section content | `src/app/(site)/…/page.tsx` + optional Prisma model |
| Flipbook nav item | `NAV_ITEMS` in `src/lib/constants.ts` + new route under `(site)/` |
| Theme default | `DEFAULT_THEME` in `src/lib/constants.ts` + `prisma/seed.ts` |
| Admin CRUD UI | `src/app/admin/(panel)/…` + extend API routes |
| Contact email | `src/lib/mail.ts`, SMTP vars in `.env` |

## Verify changes

```bash
npm run lint
npm run build
```

Run `npm run dev` and test http://localhost:3001 and http://localhost:3001/admin/login.

Human-oriented setup details: [README.md](./README.md).
