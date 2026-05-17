export const DEFAULT_THEME = {
  siteName: "WEBO.by",
  tagline: "Студия web-разработки",
  colorBackground: "#ffffff",
  colorPrimary: "#03ccbd",
  colorAccent: "#ff6b4a",
  colorForeground: "#0f172a",
  contactEmail: "info@webo.by",
  contactPhone: "+375 (29) 728-10-82",
  contactAddress: null as string | null,
  googleAnalyticsId: null as string | null,
  yandexMetrikaId: null as string | null,
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Главная", index: 0 },
  { href: "/services", label: "Услуги", index: 1 },
  { href: "/portfolio", label: "Портфолио", index: 2 },
  { href: "/blog", label: "Блог", index: 3 },
  { href: "/contacts", label: "Контакты", index: 4 },
] as const;

export const AUTH_COOKIE = "webo_admin_token";
