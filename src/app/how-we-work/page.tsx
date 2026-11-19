import Image from "next/image";
import type { Metadata } from "next";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import {
  AiWorkflowSection,
  PromisesSection,
} from "@/components/sections/home";
import { PromiseCardGrid } from "@/components/sections/home/promises/promise-card-grid";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import {
  PageHero,
  PlanCarouselSection,
} from "@/components/sections/route-page/route-page";
import { SectionPill } from "@/components/ui/section-pill";

export const metadata: Metadata = {
  title: "How We Work | Tidewrk",
  description:
    "The same plan and the same three promises, whatever Tidewrk is doing for you.",
};

// The main five-step plan from Brand Positioning & StoryBrand §2.2.
const mainPlan = [
  {
    title: "One conversation.",
    body: "About what you’re trying to deliver. You talk, we ask questions.",
  },
  {
    title: "We match the people.",
    body: "Against your bar, your stack, your process.",
  },
  {
    title: "They embed.",
    body: "In your tools, your hours, your culture.",
  },
  {
    title: "Redundancy behind everything critical.",
    body: "So continuity never rests on one person.",
  },
  {
    title: "We grow as you do.",
    body: "Scope widens as trust builds, not before.",
  },
];

const withYourTeam = [
  {
    title: "Your tools, your hours, your ceremonies.",
    body: "We join your stand-ups, work in your tracker, and keep your schedule. Nothing about how your team runs has to change for us.",
    image: "/images/promises/promise-workflow-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
  {
    title: "Redundancy on critical roles.",
    body: "Anyone your work depends on has someone trained behind them, so a day off or a departure doesn’t stop anything.",
    image: "/images/promises/promise-redundancy-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
];

const executiveSectionClass =
  "relative -mt-px min-h-[44rem] overflow-hidden bg-[linear-gradient(180deg,#022874_0%,#061F46_32%,#061F46_100%)] px-5 pb-36 pt-20 text-white sm:min-h-[48rem] sm:px-8 sm:pb-44 sm:pt-24 md:min-h-[50rem] md:pb-48 md:pt-28 lg:min-h-[52rem] lg:px-[2.5vw]";

export default function HowWeWorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="How We Work"
          heroArtwork="/images/how-we-work/how-we-work-bg.svg"
          heroLayout="center"
          showEyebrow={false}
          subline="The same plan and the same three promises, whatever we’re doing for you."
          title="How we work"
        />

        {/* Executive Advisory is how every engagement starts, not a separate service line. */}
        <section
          className={`${executiveSectionClass} scroll-mt-16`}
          id="executive-advisory"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(23,91,168,0.2),transparent_48%)]"
          />

          <div className="relative z-20 mx-auto max-w-[1540px]">
            <div className="mx-auto max-w-[1080px] text-center">
              <SectionPill>Executive Advisory</SectionPill>
              <h2 className="mx-auto mt-7 max-w-[18ch] text-balance text-[clamp(2.35rem,4vw,4.4rem)] font-semibold leading-[1.07] tracking-[-0.035em]">
                Every engagement starts at the leadership level.
              </h2>
              <p className="mx-auto mt-6 max-w-[780px] text-pretty text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
                Before anyone is staffed, you talk with Tidewrk&apos;s leadership
                about what you&apos;re trying to deliver, and the work gets shaped
                in that conversation.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[230%] max-w-none -translate-x-1/2 opacity-[0.17] saturate-[0.45] brightness-[0.62] contrast-[1.08] sm:w-[175%] md:w-[140%] lg:w-[118%] xl:w-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 74%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 74%, transparent 100%)",
            }}
          >
            <Image
              alt=""
              className="h-auto w-full object-contain"
              height={724}
              sizes="(min-width: 1280px) 100vw, (min-width: 1024px) 118vw, (min-width: 768px) 140vw, (min-width: 640px) 175vw, 230vw"
              src="/images/how-we-work/exec-advisory.svg"
              unoptimized
              width={2172}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-[linear-gradient(180deg,rgba(6,31,70,0)_0%,#061F46_100%)]"
          />
        </section>

        <PlanCarouselSection
          artwork={[
            "/images/build-your-product/tidewrk_how_it_works_step_01.svg",
            "/images/build-your-product/tidewrk_how_it_works_step_02.svg",
            "/images/build-your-product/tidewrk_how_it_works_step_03.svg",
            "/images/build-your-product/tidewrk_how_it_works_step_04.svg",
            "/images/build-your-product/tidewrk_how_it_works_step_05.svg",
          ]}
          eyebrow="The plan"
          id="the-plan"
          steps={mainPlan}
          title="Five steps, every engagement"
        />

        {/* TODO(client): Website Direction §5.7 asks for one more sentence on each promise. */}
        <PromisesSection />

        <AiWorkflowSection />

        <section className="relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#03224F_0%,#03224F_58%,#022C69_100%)] px-5 pb-40 pt-32 text-white sm:px-8 sm:pb-44 sm:pt-36 md:pb-48 md:pt-40 lg:px-[2.5vw] lg:pt-40">
          <SoftWaveJoin
            body="#03224F"
            id="how-we-work-team-join"
            top="#061F46"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(15,75,146,0.2),transparent_48%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
            style={{
              background: `linear-gradient(180deg, rgba(3,34,79,0) 0%, rgba(2,44,105,0.62) 48%, ${CTA_TOP} 100%)`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-[1540px]">
            <SectionHeading
              eyebrow="Working with your team"
              title="How we work with your team"
            />
            <PromiseCardGrid
              idPrefix="how-we-work-team"
              items={withYourTeam}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
