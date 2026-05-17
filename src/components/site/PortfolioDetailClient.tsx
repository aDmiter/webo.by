"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "@/components/site/ExternalLink";
import { ProjectRequestModal } from "@/components/site/ProjectRequestModal";
import type { PortfolioItemView } from "@/lib/portfolio";

type Props = {
  item: PortfolioItemView;
};

function Prose({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/).filter(Boolean);
  if (blocks.length <= 1) {
    return <p>{text}</p>;
  }
  return (
    <>
      {blocks.map((block, i) => (
        <p key={i}>{block}</p>
      ))}
    </>
  );
}

export function PortfolioDetailClient({ item }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const bodyText = item.content ?? item.description;

  return (
    <article className="portfolio-detail portfolio-detail--enter">
      <div className="portfolio-detail__layout">
        <aside className="portfolio-detail__sidebar">
          <Link href="/portfolio" className="portfolio-detail__back">
            ← Портфолио
          </Link>

          <header className="portfolio-detail__intro">
            {item.featured && <span className="portfolio-detail__flag">Флагман</span>}
            <h1
              className={`portfolio-detail__title${item.featured ? " portfolio-detail__title--featured" : ""}`}
            >
              {item.title}
            </h1>
            <p className="portfolio-detail__excerpt">{item.excerpt}</p>
            {item.tags && <span className="flipbook__tag portfolio-detail__tags">{item.tags}</span>}
          </header>

          <div className="portfolio-detail__actions">
            {item.projectUrl && (
              <ExternalLink href={item.projectUrl} className="flipbook__cta portfolio-detail__cta-site">
                Открыть сайт ↗
              </ExternalLink>
            )}
            <button
              type="button"
              className="flipbook__cta portfolio-detail__cta-accent"
              onClick={() => setModalOpen(true)}
            >
              Хочу такой же проект
            </button>
          </div>
        </aside>

        <div className="portfolio-detail__main">
          {item.imageUrl && (
            <div
              className="portfolio-detail__hero"
              style={{ viewTransitionName: `portfolio-${item.slug}` } as React.CSSProperties}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="portfolio-detail__hero-img"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="portfolio-detail__prose">
            <Prose text={bodyText} />
          </div>
        </div>
      </div>

      <ProjectRequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        projectTitle={item.title}
      />
    </article>
  );
}
