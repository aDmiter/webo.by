export function phoneToTelegramUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://t.me/+${digits}` : "https://t.me";
}
