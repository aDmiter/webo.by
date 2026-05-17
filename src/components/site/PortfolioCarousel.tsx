"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "@/components/site/ExternalLink";
import { PortfolioCardLink } from "@/components/site/PortfolioCardLink";
import type { PortfolioItemView } from "@/lib/portfolio";

type Props = {
  items: PortfolioItemView[];
  variant?: "home" | "full";
  limit?: number;
};

type DragState = {
  active: boolean;
  moved: boolean;
  startX: number;
  scrollLeft: number;
};

export function PortfolioCarousel({ items, variant = "full", limit }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const dragRef = useRef<DragState>({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const visibleItems = useMemo(() => {
    if (!limit || limit >= items.length) return items;
    const featured = items.find((item) => item.featured);
    const rest = items.filter((item) => !item.featured);
    const picked = featured ? [featured, ...rest.filter((i) => i.id !== featured.id)] : rest;
    return picked.slice(0, limit);
  }, [items, limit]);

  const setActiveIndex = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const readActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    setActiveIndex(nearest);
  }, [setActiveIndex]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.children[index] as HTMLElement | undefined;
      if (!slide) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const target = slideCenter - track.clientWidth / 2;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

      track.scrollTo({
        left: Math.min(maxScroll, Math.max(0, target)),
        behavior,
      });
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const go = useCallback(
    (delta: number) => {
      const len = visibleItems.length;
      if (len === 0) return;
      const next = (activeRef.current + delta + len) % len;
      scrollToIndex(next);
    },
    [scrollToIndex, visibleItems.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    requestAnimationFrame(() => scrollToIndex(0, "instant"));

    const onScroll = () => {
      if (dragRef.current.active) return;
      readActiveFromScroll();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [visibleItems, readActiveFromScroll, scrollToIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a")) return;

    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
    };
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 12) {
      dragRef.current.moved = true;
    }

    if (dragRef.current.moved) {
      e.preventDefault();
      track.scrollLeft = dragRef.current.scrollLeft - dx;
    }
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;

    const wasDrag = dragRef.current.moved;
    dragRef.current.active = false;
    dragRef.current.moved = false;
    setDragging(false);

    if (wasDrag) {
      readActiveFromScroll();
    }
  };

  if (visibleItems.length === 0) return null;

  const isHome = variant === "home";
  const isScreen = isHome || variant === "full";

  return (
    <section className={`portfolio-carousel portfolio-carousel--${variant}`}>
      <div className="portfolio-carousel__head">
        <div className="portfolio-carousel__head-start">
          <h2 className="portfolio-carousel__title">
            {isHome ? (
              <span className="portfolio-carousel__title-accent">Проекты</span>
            ) : (
              "Кейсы"
            )}
          </h2>
          {isScreen && (
            <span className="portfolio-carousel__counter" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="portfolio-carousel__controls">
          <button type="button" className="portfolio-carousel__btn" onClick={() => go(-1)} aria-label="Предыдущий">
            ←
          </button>
          <button type="button" className="portfolio-carousel__btn" onClick={() => go(1)} aria-label="Следующий">
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`portfolio-carousel__track${isScreen ? " portfolio-carousel__track--showcase" : ""}${dragging ? " portfolio-carousel__track--dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className={`portfolio-carousel__slide${item.featured ? " portfolio-carousel__slide--featured" : ""}`}
          >
            <PortfolioCardLink
              href={`/portfolio/${item.slug}`}
              className="portfolio-carousel__card"
            >
              <div className="portfolio-carousel__media">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="portfolio-carousel__img"
                    sizes={
                      isScreen
                        ? "(max-width: 768px) 85vw, 560px"
                        : "(max-width: 768px) 88vw, 520px"
                    }
                    draggable={false}
                    unoptimized
                  />
                ) : (
                  <div className="portfolio-carousel__placeholder" />
                )}
                {item.featured && <span className="portfolio-carousel__badge">Флагман</span>}
              </div>
              <div className="portfolio-carousel__body">
                <h3 className="portfolio-carousel__card-title">{item.title}</h3>
                <p className="portfolio-carousel__card-text">{item.excerpt}</p>
                {!isHome && item.tags && <span className="flipbook__tag">{item.tags}</span>}
              </div>
            </PortfolioCardLink>
            {!isHome && item.projectUrl && (
              <ExternalLink href={item.projectUrl} className="portfolio-carousel__external">
                Сайт ↗
              </ExternalLink>
            )}
          </article>
        ))}
      </div>

      {isScreen && (
        <div className="portfolio-carousel__progress" aria-hidden>
          <div
            className="portfolio-carousel__progress-fill"
            style={{ width: `${((active + 1) / visibleItems.length) * 100}%` }}
          />
        </div>
      )}

      {!isHome && (
        <div className="portfolio-carousel__dots">
          {visibleItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`portfolio-carousel__dot${i === active ? " portfolio-carousel__dot--active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={item.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}
