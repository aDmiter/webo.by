"use client";

import { useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import type { PortfolioItemView } from "@/lib/portfolio";

type Props = {
  items: PortfolioItemView[];
};

export function PortfolioPageContent({ items }: Props) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="flipbook-screen flipbook-screen--portfolio">
      <header className="flipbook-screen__header flipbook__reveal">
        <h1 className="flipbook__title flipbook__title--section">
          <span className="flipbook__title-accent">Портфолио</span>
        </h1>
        <p className="flipbook__lead flipbook-screen__lead">
          Проекты, которыми гордимся — флагман: сайт ФК «Динамо» Брест.
        </p>
      </header>

      <PortfolioCarousel items={items} variant="full" />

      <footer className="flipbook-screen__actions flipbook__reveal flipbook__reveal--delay-2">
        <button type="button" className="flipbook__cta" onClick={() => setContactOpen(true)}>
          Хочу такой же проект →
        </button>
      </footer>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        title="Заявка на проект"
        description="Опишите идею — предложим решение на основе наших кейсов."
        defaultMessage="Здравствуйте! Хочу заказать проект, похожий на ваши работы в портфолио."
      />
    </div>
  );
}
