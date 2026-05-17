"use client";

import { useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";

export type ServiceView = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
};

type Props = {
  services: ServiceView[];
};

export function ServicesGrid({ services }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ServiceView | null>(null);

  const openInquiry = (service: ServiceView) => {
    setActive(service);
    setOpen(true);
  };

  return (
    <>
      <div className="flipbook__grid services-grid">
        {services.map((service, i) => (
          <article
            key={service.id}
            className={`flipbook__card flipbook__reveal flipbook__reveal--delay-${Math.min(i + 1, 3)}`}
          >
            <h2 className="flipbook__card-title">{service.title}</h2>
            <p className="flipbook__card-text">{service.description}</p>
            {service.icon && <span className="flipbook__tag">{service.icon}</span>}
            <button
              type="button"
              className="flipbook__card-action"
              onClick={() => openInquiry(service)}
            >
              Обсудить услугу →
            </button>
          </article>
        ))}
      </div>

      <ContactModal
        open={open}
        onOpenChange={setOpen}
        title={active ? `Услуга: ${active.title}` : "Заявка на услугу"}
        description="Расскажите о задаче — подберём формат работы и сроки."
        defaultMessage={
          active ? `Здравствуйте! Интересует услуга «${active.title}».` : ""
        }
      />
    </>
  );
}
