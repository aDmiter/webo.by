"use client";

import { useState } from "react";
import { ContactForm } from "@/components/site/ContactForm";
import { ContactModal } from "@/components/site/ContactModal";

type Props = {
  contactEmail: string;
  contactPhone?: string | null;
  contactAddress?: string | null;
};

export function ContactsPageContent({ contactEmail, contactPhone, contactAddress }: Props) {
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <>
      <h1 className="flipbook__title flipbook__reveal">
        <span className="flipbook__title-accent">Контакты</span>
      </h1>
      <p className="flipbook__lead flipbook__reveal flipbook__reveal--delay-1">
        Расскажите о задаче — ответим в течение рабочего дня.
      </p>
      <div className="flipbook__reveal flipbook__reveal--delay-2 contacts-page__info">
        <p>{contactEmail}</p>
        {contactPhone && <p>{contactPhone}</p>}
        {contactAddress && <p>{contactAddress}</p>}
        <button type="button" className="flipbook__cta contacts-page__quick" onClick={() => setQuickOpen(true)}>
          Быстрая заявка →
        </button>
      </div>
      <ContactForm />

      <ContactModal
        open={quickOpen}
        onOpenChange={setQuickOpen}
        title="Быстрая заявка"
        description="Короткая форма — перезвоним или напишем в течение рабочего дня."
        defaultMessage="Здравствуйте! Хочу обсудить проект."
      />
    </>
  );
}
