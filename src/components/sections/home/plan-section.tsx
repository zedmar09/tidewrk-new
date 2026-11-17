import Image from "next/image";

import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";

import { PlanBackdrop } from "./plan/plan-backdrop";
import { SectionHeading } from "./section-heading";

// Must not promise an output: no "we'll map your workflow", no timeframe on a deliverable.
const steps = [
  {
    title: "One conversation.",
    body: "You tell us what you’re trying to deliver. We ask questions. That’s the whole first step.",
    image: "/images/plan/how-it-works-conversation-scene.svg",
  },
  {
    title: "We match the people to the work.",
    body: "Against your bar, your stack, your process. On technical roles, you interview and approve every person.",
    image: "/images/plan/how-it-works-team-matching-scene.svg",
  },
  {
    title: "They embed, and they’re backed up.",
    body: "Your tools, your hours, your team’s rhythm. Redundancy behind anything critical, so continuity never rests on one person.",
    image: "/images/plan/how-it-works-embedded-backup-scene.svg",
  },
];

function CtaCurrent() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full sm:h-28"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <defs>
        <linearGradient
          id="plan-cta-current-back"
          x1="600"
          x2="600"
          y1="16"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1b5ca1" stopOpacity="0.38" />
          <stop offset="1" stopColor="#103f78" stopOpacity="0.68" />
        </linearGradient>
        <linearGradient
          id="plan-cta-current-mid"
          x1="600"
          x2="600"
          y1="34"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#15508c" stopOpacity="0.48" />
          <stop offset="1" stopColor="#0d3e79" stopOpacity="0.76" />
        </linearGradient>
        <linearGradient
          id="plan-cta-current-front"
          x1="600"
          x2="600"
          y1="60"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0f4a8d" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0a3a78" stopOpacity="0.88" />
        </linearGradient>
      </defs>
      <path
        d="M0 40C155 75 281 20 442 42C598 64 714 13 878 36C1014 55 1117 30 1200 16V120H0V40Z"
        fill="url(#plan-cta-current-back)"
      />
      <path
        d="M0 63C150 92 284 37 434 58C591 80 710 27 873 51C1010 71 1114 44 1200 29V120H0V63Z"
        fill="url(#plan-cta-current-mid)"
      />
      <path
        d="M0 82C154 104 286 62 441 78C597 95 715 51 873 70C1015 87 1117 66 1200 52V120H0V82Z"
        fill="url(#plan-cta-current-front)"
      />
    </svg>
  );
}

function StepMarker({ number }: { number: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-12 shrink-0 items-center justify-center rounded-full lg:size-[4.5rem]"
    >
      <span className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,#ffb49e73_0%,#f590783d_42%,#ff806814_68%,#ff806800_100%)]" />
      <span className="relative flex size-full items-center justify-center rounded-full border-2 border-[#ffb49e] bg-[#071a3a] text-lg font-semibold tracking-[-0.03em] text-white shadow-[0_0_0_3px_rgba(255,138,112,0.18),0_0_16px_rgba(255,128,104,0.28)] lg:text-[1.75rem]">
        0{number}
      </span>
    </span>
  );
}

function ProcessRoute() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 1500 1000"
      >
        <path
          d="M750 58V232C750 261 720 270 720 300V390C720 420 750 430 750 462V538C750 570 780 580 780 610V700C780 730 750 740 750 770V942"
          fill="none"
          opacity="0.14"
          stroke="#ff8068"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M750 58V232C750 261 720 270 720 300V390C720 420 750 430 750 462V538C750 570 780 580 780 610V700C780 730 750 740 750 770V942"
          fill="none"
          stroke="#ff8a70"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-8 left-7 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,#ff8a70_8%,#ff8a70_92%,transparent_100%)] shadow-[0_0_10px_rgba(255,128,104,0.28)] lg:hidden"
      />
    </>
  );
}

export function PlanSection() {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#061F46_0%,#061F46_78%,#082854_100%)] px-5 pb-28 pt-16 text-white sm:px-8 sm:pb-32 sm:pt-20 md:pb-36 md:pt-24 lg:px-[6vw] lg:pb-40 lg:pt-24">
      <PlanBackdrop />

      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow="No decks, no homework"
          title="How this works"
        />

        <ol className="relative mt-14 sm:mt-16 lg:mt-20">
          <ProcessRoute />

          {steps.map((step, index) => {
            const imageOnLeft = index === 1;

            return (
              <li
                className={cn(
                  "relative grid items-center gap-8 py-16 pl-16 sm:py-20 sm:pl-20 lg:min-h-[25rem] lg:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] lg:gap-x-5 lg:gap-y-0 lg:px-6 lg:py-16 xl:gap-x-8 xl:px-10 xl:py-20",
                )}
                key={step.title}
              >
                <div
                  className={cn(
                    "relative z-10 max-w-[39rem] self-center",
                    imageOnLeft
                      ? "lg:col-start-3 lg:row-start-1 lg:justify-self-start lg:pl-6"
                      : "lg:col-start-1 lg:row-start-1 lg:justify-self-end lg:pr-6",
                  )}
                >
                  <h3 className="text-balance text-[clamp(1.55rem,2.25vw,2.45rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[39rem] text-pretty text-[clamp(1rem,1.3vw,1.22rem)] leading-[1.55] text-[#d8e2ef]">
                    {step.body}
                  </p>
                </div>

                <div className="absolute left-7 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 lg:static lg:col-start-2 lg:row-start-1 lg:translate-x-0 lg:translate-y-0 lg:self-center lg:justify-self-center">
                  <StepMarker number={index + 1} />
                </div>

                <div
                  className={cn(
                    "relative z-10 flex w-full justify-center",
                    imageOnLeft
                      ? "lg:col-start-1 lg:row-start-1 lg:max-w-[35rem] lg:justify-self-end lg:pr-6"
                      : "lg:col-start-3 lg:row-start-1 lg:max-w-[35rem] lg:justify-self-start lg:pl-6",
                  )}
                >
                  <Image
                    alt=""
                    className="h-auto w-full object-contain"
                    height={887}
                    sizes="(min-width: 1280px) 35rem, (min-width: 1024px) 42vw, 88vw"
                    src={step.image}
                    unoptimized
                    width={1774}
                  />
                </div>
              </li>
            );
          })}
        </ol>

        <div className="relative mt-14 overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/40 bg-[#061a37]/72 px-6 pb-20 pt-11 text-center shadow-[0_20px_60px_rgba(0,9,29,0.18)] sm:mt-16 sm:px-10 sm:pb-24 sm:pt-14 lg:mt-20">
          <CtaCurrent />
          <div className="relative z-10 flex flex-col items-center gap-7">
            <p className="max-w-5xl text-balance text-xl font-semibold leading-9 text-white/88 sm:text-2xl sm:leading-10">
              From there we grow as you do. Scope widens as trust builds, not
              before.
            </p>
            <CtaLink size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
