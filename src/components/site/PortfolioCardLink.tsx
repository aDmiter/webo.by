"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function PortfolioCardLink({ href, className, children }: Props) {
  return (
    <Link href={href} className={className} draggable={false}>
      {children}
    </Link>
  );
}
