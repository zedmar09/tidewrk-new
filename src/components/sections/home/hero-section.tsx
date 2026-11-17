"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";

import { HeroChips } from "./hero/hero-chips";
import { TideBackdrop } from "./hero/tide-backdrop";

// Rotator: "The tide behind" stays fixed, the whole ending swaps.
// Loops forever, lingering a little longer on the brand line "you".
const rotatorEndings = [
  "your roadmap",
  "your launch",
  "your back office",
  "your next move",
  "you",
];

const ROTATE_EVERY_MS = 2200;
const HOLD_FINAL_MS = 3600;

function useRotatorIndex(length: number, disabled: boolean) {
  const [index, setIndex] = useState(0);
  const finalIndex = length - 1;

  useEffect(() => {
    if (disabled) return;

    const timeoutId = window.setTimeout(
      () => setIndex((current) => (current + 1) % length),
      index === finalIndex ? HOLD_FINAL_MS : ROTATE_EVERY_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [disabled, finalIndex, index, length]);

  return disabled ? finalIndex : index;
}

/**
 * Phones: while the hero is pinned, vertical scrolling slides the scene
 * sideways (Plan → Build → Test → Launch → Next move). Once the end is
 * reached the page carries on to the next section. Returns the extra
 * scroll distance the hero needs (0 when the scene already fits, e.g. desktop).
 */
function useScrollSlide(
  sectionRef: RefObject<HTMLElement | null>,
  stripRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!strip || !track || !section) return;

    let distance = 0;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const progress =
        distance > 0
          ? Math.min(
              1,
              Math.max(0, -section.getBoundingClientRect().top / distance),
            )
          : 0;
      track.style.transform =
        distance > 0
          ? `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`
          : "";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const measure = () => {
      distance = Math.max(0, Math.round(track.scrollWidth - strip.clientWidth));
      setTravel(distance);
      apply();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    observer.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionRef, stripRef, trackRef]);

  return travel;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const index = useRotatorIndex(rotatorEndings.length, reduceMotion);
  const ending = rotatorEndings[index];
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travel = useScrollSlide(sectionRef, stripRef, trackRef);

  return (
    // The section is taller than the screen only on phones, by exactly the
    // distance the scene slides sideways while the hero stays pinned.
    <section
      className="relative isolate bg-[#010F2A] text-white"
      ref={sectionRef}
      style={travel ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[600px] flex-col overflow-clip md:min-h-[640px]">
        {/* Desktop: the scene fills the hero behind the text. Phones: it fills
          the space between the text and the chips, and slides sideways as
          you scroll, about two team members per screen. */}
        <div
          className="relative order-2 min-h-0 flex-1 overflow-hidden md:absolute md:inset-0 md:-z-10"
          ref={stripRef}
        >
          <div
            className="h-full w-max will-change-transform md:w-full"
            ref={trackRef}
          >
            <TideBackdrop
              avoidRef={textRef}
              className="block aspect-[2.8] h-full w-auto max-w-none md:aspect-auto md:w-full"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="relative z-10 order-1 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-2 pt-[5.25rem] text-center sm:px-8 md:pb-0 md:pt-[clamp(6rem,14svh,9rem)]"
        >
          <h1 className="w-full text-balance text-[clamp(2.3rem,4.9vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.01em]">
            <span className="sr-only">The tide behind you.</span>
            <span aria-hidden="true" className="block">
              The tide behind
            </span>
            <span aria-hidden="true" className="grid overflow-hidden">
              {/* Invisible copies reserve the height of the longest ending, so wrapping never clips. */}
              {rotatorEndings.map((text) => (
                <span className="invisible [grid-area:1/1]" key={text}>
                  {text}
                </span>
              ))}
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  animate={{ opacity: 1, y: "0%" }}
                  className="self-center text-[#E98973] [grid-area:1/1]"
                  exit={{ opacity: 0, y: "-60%" }}
                  initial={{ opacity: 0, y: "60%" }}
                  key={ending}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ending}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-4 max-w-[46rem] text-pretty text-[clamp(1rem,1.3vw,1.25rem)] font-normal leading-[1.45] text-[#C8CCD0]">
            Tidewrk embeds developers, operators, and support inside your
            business, backed by redundancy, built to stay, and yours to direct.
          </p>

          <CtaLink className="mt-6" size="lg" />
        </div>

        {/* Proof points along the bottom: a sliding row on phones (on the
          front-wave colour, so the scene flows into it), centred on desktop. */}
        <HeroChips className="relative z-10 order-3 -mt-px bg-[#012356] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:mt-auto md:bg-transparent md:pb-[clamp(1.5rem,5svh,3.5rem)] md:pt-0" />
      </div>
    </section>
  );
}
