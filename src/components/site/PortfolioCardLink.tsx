"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  href: string;
  slug: string;
  className?: string;
  children: ReactNode;
};

export function PortfolioCardLink({ href, slug, className, children }: Props) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const navigate = () => router.push(href);
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(navigate);
    } else {
      navigate();
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      style={{ viewTransitionName: `portfolio-${slug}` } as React.CSSProperties}
    >
      {children}
    </Link>
  );
}
