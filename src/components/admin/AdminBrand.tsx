import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  src: string;
};

export function AdminBrand({ href = "/admin", src }: Props) {
  return (
    <Link href={href} className="admin-panel__brand">
      <Image
        src={src}
        alt="WEBO.by"
        width={320}
        height={80}
        className="admin-panel__brand-img"
        priority
        unoptimized
      />
    </Link>
  );
}
