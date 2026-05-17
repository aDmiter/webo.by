/** GA4 Measurement ID, например G-XXXXXXXXXX */
export function sanitizeGoogleAnalyticsId(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  const id = value.trim().toUpperCase();
  return /^G-[A-Z0-9]+$/.test(id) ? id : null;
}

/** Номер счётчика Яндекс Метрики, только цифры */
export function sanitizeYandexMetrikaId(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  const id = value.trim().replace(/\D/g, "");
  return id.length > 0 ? id : null;
}
