"use client";

import { ContactForm } from "@/components/site/ContactForm";
import { phoneToTelegramUrl } from "@/lib/contact-links";

type Props = {
  contactEmail: string;
  contactPhone?: string | null;
  contactAddress?: string | null;
};

export function ContactsPageContent({ contactEmail, contactPhone, contactAddress }: Props) {
  const telegramHref = contactPhone ? phoneToTelegramUrl(contactPhone) : null;

  return (
    <div className="flipbook-screen flipbook-screen--contacts">
      <header className="flipbook-screen__header flipbook__reveal">
        <h1 className="flipbook__title flipbook__title--section">
          <span className="flipbook__title-accent">Контакты</span>
        </h1>
        <p className="flipbook__lead flipbook-screen__lead">
          Расскажите о задаче — ответим в течение рабочего дня.
        </p>
      </header>

      <div className="contacts-page__layout flipbook__reveal flipbook__reveal--delay-1">
        <aside className="contacts-page__card contacts-page__channels">
          <p className="contacts-page__label">Связь</p>
          <a href={`mailto:${contactEmail}`} className="contacts-page__link contacts-page__link--email">
            {contactEmail}
          </a>
          {contactPhone && telegramHref && (
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="contacts-page__link contacts-page__link--telegram"
            >
              <span className="contacts-page__phone">{contactPhone}</span>
              <span className="contacts-page__telegram-hint">Написать в Telegram ↗</span>
            </a>
          )}
          {contactAddress && <p className="contacts-page__address">{contactAddress}</p>}
        </aside>

        <div className="contacts-page__card contacts-page__form-card">
          <p className="contacts-page__label">Заявка</p>
          <ContactForm variant="page" compact />
        </div>
      </div>
    </div>
  );
}
