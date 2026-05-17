"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";
import { ParallaxDecor } from "@/components/site/ParallaxDecor";
import { NAV_ITEMS } from "@/lib/constants";

type Props = {
  children: React.ReactNode;
};

export function FlipbookShell({ children }: Props) {
  const pathname = usePathname();
  const prevIndex = useRef(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [contactOpen, setContactOpen] = useState(false);

  const current = NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0];
  const progress = ((current.index + 1) / NAV_ITEMS.length) * 100;
  useEffect(() => {
    const nextIndex = current.index;
    setDirection(nextIndex >= prevIndex.current ? "forward" : "backward");
    prevIndex.current = nextIndex;
  }, [current.index]);

  return (
    <div className="flipbook">
      <ParallaxDecor />
      <header className="flipbook__header">
        <button
          type="button"
          className="flipbook__header-cta"
          onClick={() => setContactOpen(true)}
        >
          Связаться
        </button>
      </header>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        title="Связаться с WEBO"
        description="Оставьте заявку — ответим в течение рабочего дня."
        defaultMessage="Здравствуйте! Хочу связаться по проекту."
      />

      <nav className="flipbook__nav" aria-label="Навигация">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flipbook__nav-link${item.href === pathname ? " flipbook__nav-link--active" : ""}`}
          >
            <span className="flipbook__nav-dot" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        key={pathname}
        className={`flipbook__content flipbook__content--${direction}`}
      >
        {children}
      </div>

      <div className="flipbook__progress" style={{ width: `${progress}%` }} />
    </div>
  );
}
