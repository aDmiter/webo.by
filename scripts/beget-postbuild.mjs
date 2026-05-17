import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("[beget-postbuild] Сначала выполните: npm run build");
  process.exit(1);
}

const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(standalone, ".next", "static");
mkdirSync(path.dirname(staticDest), { recursive: true });
cpSync(staticSrc, staticDest, { recursive: true });

const publicSrc = path.join(root, "public");
const publicDest = path.join(standalone, "public");
cpSync(publicSrc, publicDest, { recursive: true });

const prismaSrc = path.join(root, "prisma");
const prismaDest = path.join(standalone, "prisma");
if (existsSync(prismaSrc)) {
  cpSync(prismaSrc, prismaDest, { recursive: true });
}

const prismaClientSrc = path.join(root, "node_modules", ".prisma");
const prismaClientDest = path.join(standalone, "node_modules", ".prisma");
if (existsSync(prismaClientSrc)) {
  mkdirSync(path.dirname(prismaClientDest), { recursive: true });
  cpSync(prismaClientSrc, prismaClientDest, { recursive: true });
}

console.log("[beget-postbuild] static, public и prisma скопированы в standalone");
