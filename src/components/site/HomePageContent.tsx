"use client";

import Link from "next/link";
import { useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import type { PortfolioItemView } from "@/lib/portfolio";

type Props = {
  tagline: string;
  portfolio: PortfolioItemView[];
};

export function HomePageContent({ tagline, portfolio }: Props) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="flipbook-screen flipbook-screen--home">
      <header className="flipbook-screen__header flipbook__reveal">
        <p className="flipbook__tag flipbook-screen__eyebrow">Web-студия · Беларусь</p>
        <h1 className="flipbook__title flipbook__title--home">
          Создаём
          <br />
          <span className="flipbook__title-accent">цифровые</span>
          <br />
          продукты
        </h1>
        <p className="flipbook__lead flipbook-screen__lead">{tagline}</p>
      </header>

      <PortfolioCarousel items={portfolio} variant="home" limit={5} />

      <footer className="flipbook-screen__actions flipbook__reveal flipbook__reveal--delay-3">
        <button type="button" className="flipbook__cta" onClick={() => setContactOpen(true)}>
          Обсудить проект →
        </button>
        <Link href="/portfolio" className="flipbook__cta flipbook__cta--ghost">
          Все проекты
        </Link>
      </footer>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        title="Обсудить проект"
        description="Опишите задачу — предложим формат, сроки и ориентир по бюджету."
        defaultMessage="Здравствуйте! Хочу обсудить новый проект."
      />
    </div>
  );
}
