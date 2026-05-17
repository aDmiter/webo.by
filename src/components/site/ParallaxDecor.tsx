"use client";

import { useEffect, useRef } from "react";

const DECOR = [
  { kind: "orb" as const, tone: "primary" as const, size: 320, top: "8%", left: "14%", factor: 1.4, delay: 0 },
  { kind: "orb" as const, tone: "accent" as const, size: 200, top: "58%", left: "78%", factor: 1.1, delay: 1.2 },
  { kind: "bubble" as const, tone: "primary" as const, size: 140, top: "22%", left: "68%", factor: 0.7, delay: 0.4 },
  { kind: "bubble" as const, tone: "accent" as const, size: 96, top: "72%", left: "22%", factor: 0.5, delay: 2 },
  { kind: "orb" as const, tone: "accent" as const, size: 120, top: "38%", left: "42%", factor: 0.85, delay: 1.8 },
  { kind: "bubble" as const, tone: "primary" as const, size: 72, top: "12%", left: "52%", factor: 0.45, delay: 0.9 },
  { kind: "bubble" as const, tone: "accent" as const, size: 180, top: "78%", left: "58%", factor: 1.25, delay: 1.5 },
  { kind: "orb" as const, tone: "primary" as const, size: 88, top: "48%", left: "8%", factor: 0.6, delay: 2.4 },
  { kind: "bubble" as const, tone: "primary" as const, size: 52, top: "84%", left: "88%", factor: 0.35, delay: 3 },
  { kind: "orb" as const, tone: "accent" as const, size: 64, top: "6%", left: "86%", factor: 0.55, delay: 0.6 },
] as const;

export function ParallaxDecor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const root = layer?.closest(".flipbook") as HTMLElement | null;
    if (!layer || !root) return;

    let frame = 0;

    const setParallax = (x: number, y: number) => {
      root.style.setProperty("--parallax-x", String(x));
      root.style.setProperty("--parallax-y", String(y));
    };

    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setParallax(x, y);
      });
    };

    const onLeave = () => setParallax(0, 0);

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      setParallax(0, 0);
    };
  }, []);

  return (
    <div ref={layerRef} className="parallax" aria-hidden>
      {DECOR.map((item, index) => (
        <div
          key={index}
          className="parallax__item"
          style={{
            ["--factor" as string]: item.factor,
            ["--size" as string]: `${item.size}px`,
            ["--float-delay" as string]: `${item.delay}s`,
            top: item.top,
            left: item.left,
          }}
        >
          <span
            className={`parallax__${item.kind} parallax__${item.kind}--${item.tone}`}
          />
        </div>
      ))}
    </div>
  );
}
