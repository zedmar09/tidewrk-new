"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PlanStep = {
  title: string;
  body: string;
};

const AUTOPLAY_DELAY = 5500;
const SWIPE_THRESHOLD = 48;
const ARTWORK_POSITIONS = [
  "center 60%",
  "center 52%",
  "center 68%",
  "center 54%",
  "center 82%",
] as const;

function relativePosition(index: number, activeIndex: number, length: number) {
  const forward = (index - activeIndex + length) % length;
  return forward > length / 2 ? forward - length : forward;
}

export function PlanCarousel({
  steps,
  images,
}: {
  steps: PlanStep[];
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + steps.length) % steps.length);
  };

  const previous = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion || steps.length < 2) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, prefersReducedMotion, steps.length]);

  return (
    <div
      aria-label="How this works"
      aria-roledescription="carousel"
      className="mt-12 sm:mt-14"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onFocusCapture={() => setPaused(true)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      tabIndex={0}
    >
      <p aria-live="polite" className="sr-only">
        Step {activeIndex + 1} of {steps.length}: {steps[activeIndex]?.title}
      </p>

      <div
        className="relative h-[42rem] touch-pan-y overflow-hidden sm:h-[46rem]"
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
        onPointerDown={(event) => {
          if (event.isPrimary) pointerStartX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current === null) return;

          const distance = event.clientX - pointerStartX.current;
          pointerStartX.current = null;

          if (Math.abs(distance) < SWIPE_THRESHOLD) return;
          if (distance > 0) previous();
          else next();
        }}
      >
        {steps.map((step, index) => {
          const position = relativePosition(index, activeIndex, steps.length);
          const distance = Math.abs(position);
          const isActive = position === 0;
          const translate = position * 78;
          const scale = isActive ? 1 : distance === 1 ? 0.82 : 0.68;
          const opacity = isActive ? 1 : distance === 1 ? 0.66 : 0.3;
          const image = images[index];
          const artworkPosition =
            ARTWORK_POSITIONS[index] ?? ARTWORK_POSITIONS[0];

          return (
            <article
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${index + 1} of ${steps.length}`}
              className={`absolute left-1/2 top-4 h-[39rem] w-[min(86vw,46rem)] overflow-hidden rounded-[1.65rem] border bg-[#071A3A] px-5 pb-7 shadow-[0_24px_70px_rgba(0,9,29,0.2)] transition-[transform,opacity,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[43rem] sm:w-[min(74vw,46rem)] sm:px-8 sm:pb-9 ${
                isActive
                  ? "border-[#57adf7]/85 shadow-[0_26px_85px_rgba(0,34,91,0.32)]"
                  : "border-[#0F4B92]/55"
              }`}
              key={step.title}
              role="group"
              style={{
                opacity,
                transform: `translateX(calc(-50% + ${translate}%)) scale(${scale})`,
                zIndex: 10 - distance,
              }}
            >
              <div className="relative -mx-5 h-[21rem] overflow-hidden sm:-mx-8 sm:h-[25rem]">
                <span
                  className={`absolute left-5 top-5 z-20 flex items-center justify-center rounded-full border bg-[#071A3A]/88 font-semibold text-white backdrop-blur-sm transition-[width,height,font-size,border-color,box-shadow] duration-500 sm:left-8 sm:top-7 ${
                    isActive
                      ? "size-[4.75rem] border-[#ff8a70] text-[1.75rem] shadow-[0_0_20px_rgba(255,138,112,0.22)] sm:size-20 sm:text-3xl"
                      : "size-14 border-[#57adf7]/60 text-xl text-white/70 sm:size-16 sm:text-2xl"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {image ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="object-cover"
                    draggable={false}
                    fill
                    sizes="(min-width: 640px) 46rem, 86vw"
                    src={image}
                    style={{ objectPosition: artworkPosition }}
                    unoptimized
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center text-[9rem] font-semibold leading-none text-white/[0.04]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="relative z-10 mt-2">
                <h3 className="text-balance text-[clamp(1.65rem,3vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[41rem] text-pretty text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.55] text-[#d8e2ef]">
                  {step.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-5 sm:mt-6 sm:gap-7">
        <button
          aria-label="Show previous step"
          className="flex size-12 items-center justify-center rounded-full border border-[#57adf7]/65 bg-[#071A3A] text-white transition hover:border-white/70 hover:bg-[#0A2148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={previous}
          type="button"
        >
          <ChevronLeft aria-hidden="true" className="size-6" />
        </button>

        <div className="flex items-center gap-3" role="tablist" aria-label="Choose a step">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                aria-label={`Show step ${index + 1}: ${step.title}`}
                aria-selected={isActive}
                className={`size-3 rounded-full transition-[background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061F46] ${
                  isActive
                    ? "scale-125 bg-[#ff8a70]"
                    : "bg-[#57adf7]/75 hover:bg-[#8cc9ff]"
                }`}
                key={step.title}
                onClick={() => goTo(index)}
                role="tab"
                type="button"
              />
            );
          })}
        </div>

        <button
          aria-label="Show next step"
          className="flex size-12 items-center justify-center rounded-full border border-[#57adf7]/65 bg-[#071A3A] text-white transition hover:border-white/70 hover:bg-[#0A2148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={next}
          type="button"
        >
          <ChevronRight aria-hidden="true" className="size-6" />
        </button>
      </div>
    </div>
  );
}
