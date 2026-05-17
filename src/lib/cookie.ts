/** Cookie secure flag for Beget (HTTPS + Apache/Passenger). */
export function isSecureCookie(request?: Request): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (process.env.COOKIE_SECURE === "false") return false;

  if (request) {
    const forwarded = request.headers.get("x-forwarded-proto");
    if (forwarded) {
      return forwarded.split(",")[0]?.trim() === "https";
    }
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ?? true;
}
