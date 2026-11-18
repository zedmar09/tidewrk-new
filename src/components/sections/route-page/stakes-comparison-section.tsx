import { Check, X } from "lucide-react";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import type { RoutePageContent } from "@/constants/route-pages";

const STAKES_BODY = "#03224F";
const ABOVE = "#061F46";

export function StakesComparisonSection({
  stakes,
}: {
  stakes: RoutePageContent["stakes"];
}) {
  return (
    <section
      className="relative isolate -mt-px overflow-hidden px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-14 sm:pt-36 md:pt-40 lg:px-[3.5vw]"
      style={{ background: STAKES_BODY }}
    >
      <SoftWaveJoin body={STAKES_BODY} id="build-product-stakes-join" top={ABOVE} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `linear-gradient(180deg, rgba(3,34,79,0) 0%, ${CTA_TOP} 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(15,75,146,0.2),transparent_54%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <SectionHeading
          eyebrow="What’s at stake"
          title="The difference the right team makes"
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:gap-7">
          <StakePanel
            items={stakes.without}
            title="Without the right team"
            tone="without"
          />
          <StakePanel
            items={stakes.with}
            title="With it"
            tone="with"
          />
        </div>
      </div>
    </section>
  );
}

function StakePanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "with" | "without";
}) {
  const positive = tone === "with";
  const StatusIcon = positive ? Check : X;

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border-[3px] bg-[#071A3A]/82 px-6 pb-20 pt-7 shadow-[0_22px_65px_rgba(0,9,29,0.2)] sm:px-8 sm:pb-24 sm:pt-8 lg:px-10 ${
        positive ? "border-[#36b8ff]" : "border-[#ff8068]"
      }`}
    >
      <PanelTides positive={positive} />

      <h3 className="relative z-10 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
        {title}
      </h3>

      <ul className="relative z-10 mt-4 flex-1 space-y-1">
        {items.map((item) => (
          <li
            className="flex items-start gap-3 py-2.5 text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.45] text-[#edf3fb]"
            key={item}
          >
            <span
              className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${
                positive
                  ? "bg-[#36b8ff] text-white"
                  : "bg-[#ff8068] text-white"
              }`}
            >
              <StatusIcon aria-hidden="true" className="size-4" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PanelTides({ positive }: { positive: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden">
      <svg
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
        viewBox="0 0 720 120"
      >
        <defs>
          <linearGradient id={`stakes-panel-back-${positive ? "with" : "without"}`} x1="0" x2="0" y1="0" y2="120">
            <stop stopColor={positive ? "#1971c9" : "#ff8a70"} stopOpacity={positive ? "0.34" : "0.22"} />
            <stop offset="1" stopColor="#071A3A" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`stakes-panel-front-${positive ? "with" : "without"}`} x1="0" x2="0" y1="0" y2="120">
            <stop stopColor={positive ? "#0f4f9b" : "#d9685a"} stopOpacity={positive ? "0.42" : "0.18"} />
            <stop offset="1" stopColor="#071A3A" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path
          d="M0 44C96 24 172 72 278 65C376 59 444 30 536 37C609 42 665 63 720 54V120H0Z"
          fill={`url(#stakes-panel-back-${positive ? "with" : "without"})`}
        />
        <path
          d="M0 76C88 61 185 92 284 87C379 82 450 57 548 63C621 68 676 83 720 76V120H0Z"
          fill={`url(#stakes-panel-front-${positive ? "with" : "without"})`}
        />
      </svg>
    </div>
  );
}
