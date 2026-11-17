import Image from "next/image";

import { PromisesBackdrop } from "./promises/promises-backdrop";
import { SectionHeading } from "./section-heading";

// TODO(client): confirm the tools list in promise 3 (Website Direction §7, owner Jay).
const promises = [
  {
    title: "You own what we build.",
    body: "Always. The code, the systems, the documentation. Any exception is agreed and documented before work begins, and there usually isn’t one.",
    image: "/images/promises/promise-ownership-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
  {
    title: "No single point of failure.",
    body: "Critical roles have depth behind them by design, not by luck. When someone moves on, it’s a handoff, not a restart.",
    image: "/images/promises/promise-redundancy-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
  {
    title: "We adapt to you.",
    body: "Notion, Slack, Jira, Teams, whatever you already run. Your process, your ceremonies, your definition of done. The adjustment is ours to make.",
    image: "/images/promises/promise-workflow-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
];

function CardTides({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden sm:h-32"
    >
      <svg
        className="absolute top-0 h-full w-[300%] max-w-none"
        preserveAspectRatio="none"
        style={{ left: `${index * -100}%` }}
        viewBox="0 0 1560 130"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`promise-tide-back-${index}`}
            x1="780"
            x2="780"
            y1="4"
            y2="124"
          >
            <stop stopColor="#1971c9" stopOpacity="0.92" />
            <stop offset="1" stopColor="#0b3d80" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`promise-tide-front-${index}`}
            x1="780"
            x2="780"
            y1="42"
            y2="126"
          >
            <stop stopColor="#0f4f9b" stopOpacity="0.8" />
            <stop offset="1" stopColor="#082f68" stopOpacity="0.62" />
          </linearGradient>
        </defs>
        <path
          d="M0 6C175 5 336 58 520 79C695 100 840 24 1040 10C1214 -2 1362 57 1560 73L1560 98C1360 84 1210 29 1040 35C852 43 700 121 520 107C329 91 170 35 0 34Z"
          fill={`url(#promise-tide-back-${index})`}
        />
        <path
          d="M0 56C176 47 340 91 520 100C710 111 844 53 1040 46C1210 40 1370 89 1560 90L1560 112C1375 112 1210 66 1040 70C850 75 708 132 520 124C335 116 175 75 0 82Z"
          fill={`url(#promise-tide-front-${index})`}
        />
      </svg>
    </div>
  );
}

export function PromisesSection() {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#061F46_0%,#061F46_76%,#082854_100%)] px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-28 sm:pt-28 md:pb-32 md:pt-32 lg:px-[2.5vw] lg:pt-28">
      <PromisesBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(15,75,146,0.18),transparent_46%)]"
      />
      <div className="relative z-10 mx-auto max-w-[1540px]">
        <SectionHeading
          eyebrow="The same three, every engagement"
          eyebrowTone="quiet"
          title="What you get in writing"
        />

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {promises.map((promise, index) => (
            <article
              className="relative min-h-[30rem] overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/45 bg-[#061d3d]/90 px-7 pb-12 pt-36 shadow-[0_22px_60px_rgba(0,9,29,0.22)] sm:min-h-[32rem] sm:px-9 sm:pt-40 lg:px-7 xl:px-9"
              key={promise.title}
            >
              <CardTides index={index} />

              <Image
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -left-[8%] top-[67%] z-0 h-auto w-[60%] -translate-y-1/2 object-contain opacity-[0.18]"
                height={promise.imageHeight}
                sizes="(min-width: 1024px) 20vw, 56vw"
                src={promise.image}
                unoptimized
                width={promise.imageWidth}
              />

              <div className="relative z-10 sm:pl-[22%] lg:pl-[26%]">
                <div className="flex items-end gap-2">
                  <span className="text-[clamp(2.8rem,4.2vw,4.4rem)] font-semibold leading-none tracking-[-0.055em] text-white">
                    0{index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mb-1.5 size-3 rounded-full bg-[#ff8a70] sm:size-3.5"
                  />
                </div>
                <h3 className="mt-6 max-w-[23rem] text-[clamp(1.45rem,1.9vw,1.8rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
                  {promise.title}
                </h3>
                <p className="mt-5 max-w-[27rem] text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.58] text-[#edf3fb]">
                  {promise.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
