export const DEFAULT_THEME = {
  siteName: "WEBO.by",
  tagline: "Студия web-разработки",
  colorBackground: "#ffffff",
  colorPrimary: "#03ccbd",
  colorAccent: "#ff6b4a",
  colorForeground: "#0f172a",
  contactEmail: "hello@webo.by",
  contactPhone: null as string | null,
  contactAddress: null as string | null,
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Главная", index: 0 },
  { href: "/services", label: "Услуги", index: 1 },
  { href: "/portfolio", label: "Портфолио", index: 2 },
  { href: "/blog", label: "Блог", index: 3 },
  { href: "/contacts", label: "Контакты", index: 4 },
] as const;

export const AUTH_COOKIE = "webo_admin_token";
