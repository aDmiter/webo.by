import Image from "next/image";
import Link from "next/link";
import { logoUrl } from "@/lib/assets.server";

export function BrandLogo() {
  const src = logoUrl();

  return (
    <aside className="brand-strip" aria-label="WEBO.by">
      <Link href="/" className="brand-strip__link">
        <Image
          src={src}
          alt="WEBO.by"
          width={640}
          height={160}
          className="brand-strip__img"
          priority
          unoptimized
        />
      </Link>
    </aside>
  );
}
