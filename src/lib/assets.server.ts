import "server-only";
import fs from "node:fs";
import path from "node:path";

function assetVersion(filename: string): string {
  if (process.env.NEXT_PUBLIC_ASSET_VERSION) {
    return process.env.NEXT_PUBLIC_ASSET_VERSION;
  }

  try {
    const filePath = path.join(process.cwd(), "public", filename);
    return String(fs.statSync(filePath).mtimeMs);
  } catch {
    return "1";
  }
}

export function logoUrl(): string {
  return `/images/logo.png?v=${assetVersion("images/logo.png")}`;
}

export function faviconUrl(): string {
  return `/images/favicon.ico?v=${assetVersion("images/favicon.ico")}`;
}

export function pageBackgroundUrl(): string {
  return `/images/bg-1.jpg?v=${assetVersion("images/bg-1.jpg")}`;
}
