"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";

const wavePaths = [
  "M-560 720 C-220 610 20 720 170 520 C340 294 512 378 680 500 C842 618 1012 432 1192 318 C1394 190 1596 232 2040 54",
  "M-560 696 C-206 594 42 700 194 502 C364 282 528 366 700 482 C866 594 1034 416 1216 304 C1412 184 1628 214 2040 42",
  "M-560 672 C-192 578 64 680 218 484 C388 270 544 354 720 464 C890 570 1056 400 1240 290 C1430 178 1660 196 2040 30",
  "M-560 648 C-178 562 86 660 242 466 C412 258 560 342 740 446 C914 546 1078 384 1264 276 C1448 172 1692 178 2040 18",
  "M-560 624 C-164 546 108 640 266 448 C436 246 576 330 760 428 C938 522 1100 368 1288 262 C1466 166 1724 160 2040 6",
  "M-560 600 C-150 530 130 620 290 430 C460 234 592 318 780 410 C962 498 1122 352 1312 248 C1484 160 1756 142 2040 -6",
  "M-560 576 C-136 514 152 600 314 412 C484 222 608 306 800 392 C986 474 1144 336 1336 234 C1502 154 1788 124 2040 -18",
  "M-560 552 C-122 498 174 580 338 394 C508 210 624 294 820 374 C1010 450 1166 320 1360 220 C1520 148 1820 106 2040 -30",
  "M-560 528 C-108 482 196 560 362 376 C532 198 640 282 840 356 C1034 426 1188 304 1384 206 C1538 142 1852 88 2040 -42",
  "M-560 504 C-94 466 218 540 386 358 C556 186 656 270 860 338 C1058 402 1210 288 1408 192 C1556 136 1884 70 2040 -54",
  "M-560 480 C-80 450 240 520 410 340 C580 174 672 258 880 320 C1082 378 1232 272 1432 178 C1574 130 1916 52 2040 -66",
  "M-560 456 C-66 434 262 500 434 322 C604 162 688 246 900 302 C1106 354 1254 256 1456 164 C1592 124 1948 34 2040 -78",
];

// Rotator: "The tide behind" stays fixed, the whole ending swaps.
// Runs once and holds on "you."
const rotatorEndings = [
  "your roadmap.",
  "your launch.",
  "your back office.",
  "your next move.",
  "you.",
];

const ROTATE_EVERY_MS = 2200;

function useRotatorIndex(length: number, disabled: boolean) {
  const [index, setIndex] = useState(0);
  const finalIndex = length - 1;

  useEffect(() => {
    if (disabled || index >= finalIndex) return;

    const timeoutId = window.setTimeout(
      () => setIndex((current) => Math.min(current + 1, finalIndex)),
      ROTATE_EVERY_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [disabled, finalIndex, index]);

  return disabled ? finalIndex : index;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const index = useRotatorIndex(rotatorEndings.length, reduceMotion);
  const ending = rotatorEndings[index];

  return (
    <section className="relative z-0 min-h-[100svh] overflow-hidden bg-[#02050a] px-5 pb-6 pt-[4.75rem] text-white sm:px-8 sm:pt-20 lg:px-[6vw]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,63,114,0.78),transparent_45%),radial-gradient(ellipse_at_50%_20%,rgba(0,63,114,0.32),transparent_32%),linear-gradient(180deg,#02050a_0%,#07111f_46%,#02050a_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#003f72]/46 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#02050a] via-[#02050a]/88 to-transparent" />

      <svg
        aria-hidden="true"
        className="tide-wave-geometry pointer-events-none absolute -bottom-[1%] -left-[88%] h-[42svh] min-h-[290px] w-[280%] opacity-45 sm:-left-[42%] sm:h-[58svh] sm:min-h-[430px] sm:w-[205%] sm:opacity-60 lg:-bottom-[2%] lg:-left-[20%] lg:h-[76svh] lg:min-h-[560px] lg:w-[150%] lg:opacity-82"
        fill="none"
        preserveAspectRatio="none"
        style={{
          WebkitMaskImage:
            "linear-gradient(112deg, transparent 0%, #000 13%, #000 86%, transparent 100%)",
          maskImage:
            "linear-gradient(112deg, transparent 0%, #000 13%, #000 86%, transparent 100%)",
          backfaceVisibility: "hidden",
          contain: "layout paint",
          transform: "translate3d(0,0,0)",
        }}
        viewBox="-360 0 2160 720"
      >
        {wavePaths.map((path, index) => (
          <path
            d={path}
            key={path}
            className={index % 2 === 0 ? "tide-wave-line" : "tide-wave-line tide-wave-line-alt"}
            stroke={
              index % 3 === 0
                ? "rgba(0,63,114,0.58)"
                : index % 3 === 1
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(0,63,114,0.46)"
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={index % 4 === 0 ? 1.6 : 1}
            style={{
              animationDelay: `${index * -0.58}s`,
              animationDuration: `${8.6 + (index % 5) * 0.9}s`,
            }}
          />
        ))}
      </svg>

      <div className="relative mx-auto flex min-h-[calc(100svh-4.75rem)] w-full max-w-[1900px] flex-col items-center justify-center pb-16 text-center sm:min-h-[calc(100svh-5rem)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <h1 className="w-full text-balance text-[clamp(2.4rem,11vw,3.4rem)] font-semibold leading-[1.04] tracking-normal text-white sm:text-7xl sm:leading-[1.02] lg:text-[5.4rem] xl:text-[6.2rem]">
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
                  className="tidewrk-glow-text self-center [grid-area:1/1]"
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

          <p className="mt-7 max-w-4xl text-pretty text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
            Tidewrk embeds developers, operators, and support inside your
            business, backed by redundancy, built to stay, and yours to direct.
          </p>

          <CtaLink className="mt-9" size="lg" />
        </div>
      </div>
    </section>
  );
}
