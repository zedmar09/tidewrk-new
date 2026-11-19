import Image from "next/image";
import {
  CheckCircle2,
  Compass,
  MapPinned,
  UsersRound,
  Workflow,
} from "lucide-react";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionPill } from "@/components/ui/section-pill";

// Values: kept from the current site with light edits (Website Direction §5.8).
const values = [
  {
    title: "Move with purpose",
    description: "The next practical step, not noise or busywork.",
    icon: Compass,
    image: "/images/guide/why-us-project-recovery.svg",
  },
  {
    title: "Build around the work",
    description:
      "People, workflows, and technology shaped around how your business actually runs.",
    icon: Workflow,
    image: "/images/guide/why-us-quality-scrutiny.svg",
  },
  {
    title: "Stay accountable",
    description:
      "A named person behind every piece of work, clear communication, and follow-through.",
    icon: CheckCircle2,
    image: "/images/guide/why-us-client-referrals.svg",
  },
];

// TODO(client): confirm the current team count with HR.
const numbers = [
  {
    value: "100+",
    label: "Team members and growing",
    icon: UsersRound,
  },
  {
    value: "4",
    label: "Offices: South Carolina, New York, Manila, and Sorsogon.",
    icon: MapPinned,
  },
];

function ValueCardTide({ reversed = false }: { reversed?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-32"
      preserveAspectRatio="none"
      viewBox="0 0 520 130"
    >
      <g transform={reversed ? "translate(520 0) scale(-1 1)" : undefined}>
        <path
          d="M0 67C76 91 147 57 223 45C319 30 386 72 520 16V130H0V67Z"
          fill="#0a3a78"
          opacity="0.92"
        />
        <path
          d="M0 84C101 105 176 65 266 64C363 63 415 87 520 42V130H0V84Z"
          fill="#0c4385"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

function MetricConfetti({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute right-5 top-5 h-20 w-28 opacity-75 sm:right-8 sm:top-7 sm:h-24 sm:w-32 ${
        mirrored ? "-scale-x-100" : ""
      }`}
      viewBox="0 0 132 96"
    >
      <path
        d="M18 19L26 31"
        stroke="#ff8a70"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M50 9L48 24"
        stroke="#64c8ff"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M82 20L72 32"
        stroke="#ff8a70"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M108 12L103 25"
        stroke="#64c8ff"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <circle cx="29" cy="58" fill="#64c8ff" r="4" />
      <circle cx="95" cy="52" fill="#ff8a70" r="5" />
      <path
        d="M58 60L67 69L57 76L49 67Z"
        fill="#ffbe72"
        opacity="0.9"
      />
      <path
        d="M113 66L120 72"
        stroke="#64c8ff"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

export function AboutUsPage() {
  return (
    <main className="relative overflow-hidden bg-[#061F46] text-white">
      <section className="relative isolate min-h-[46rem] overflow-hidden px-5 pb-24 pt-32 sm:min-h-[50rem] sm:px-8 sm:pb-28 sm:pt-36 lg:min-h-[max(100svh,56.28vw)] lg:px-[6vw] lg:pb-24 lg:pt-32">
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/images/about-us/about-bg.svg"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,15,42,0.2)_0%,rgba(1,15,42,0.08)_52%,rgba(1,15,42,0.22)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(6,31,70,0.62)_58%,#061F46_100%)]"
        />

        <div className="relative mx-auto max-w-[1620px] text-center">
          <div className="mx-auto max-w-[1160px]">
            <SectionPill>About Tidewrk</SectionPill>

            <h1 className="mx-auto mt-8 max-w-5xl text-balance text-[3.5rem] font-semibold leading-[0.98] tracking-normal text-white sm:text-7xl lg:text-[6.2rem]">
              Built on three coasts.{" "}
              <span className="text-[#E98973]">Working inside your team.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-4xl text-pretty text-xl leading-9 text-white/68 sm:text-2xl sm:leading-10">
              Tidewrk&apos;s roots run from Long Island to Charleston to the
              Philippines. We embed developers, operators, and support inside
              growing businesses, and we build so the people we hire have
              careers, not gigs.
            </p>
            <CtaLink className="mt-8" size="lg" />
          </div>
        </div>
      </section>

      {/* TODO(client): "The name" section needs the three-coasts story from the
          rebrand announcement (short), and leadership bios are still open (MJE / John). */}

      <section className="relative isolate -mt-px overflow-hidden bg-[#03224F] px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-36 md:pt-40 lg:px-[2.5vw]">
        <SoftWaveJoin
          body="#03224F"
          id="about-mission-join"
          top="#061F46"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(22,91,172,0.2),transparent_42%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1540px]">
          <div className="mx-auto max-w-[1120px] text-center">
            <SectionPill>Our Mission &amp; Values</SectionPill>
            <h2 className="mx-auto mt-7 max-w-[19ch] text-balance text-[clamp(2.5rem,4.4vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
              Building careers and community in the{" "}
              <span className="text-[#E98973]">Philippines.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-[820px] text-pretty text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
              Tidewrk was built in the Philippines on purpose. Employing and
              developing people is part of the mission. The people we hire are
              employees with career paths, not freelancers between gigs.
              That&apos;s what makes us a company, not a marketplace.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:gap-6">
            {values.map((value, index) => {
              const ValueIcon = value.icon;

              return (
                <article
                  className="relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/45 bg-[#061d3d]/90 px-6 pb-24 pt-5 shadow-[0_22px_60px_rgba(0,9,29,0.24)] sm:px-9 sm:pt-7 lg:px-7 xl:px-9"
                  key={value.title}
                >
                  <div className="relative z-10 flex h-52 items-center justify-center sm:h-60 lg:h-52 xl:h-60">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                      height={675}
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      src={value.image}
                      unoptimized
                      width={1200}
                    />
                  </div>

                  <div className="relative z-10 mt-4">
                    <div className="flex items-start gap-3">
                      <ValueIcon
                        aria-hidden="true"
                        className="mt-0.5 size-8 shrink-0 text-[#ff8a70]"
                        strokeWidth={2.2}
                      />
                      <h3 className="text-[clamp(1.3rem,1.8vw,1.65rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
                        {value.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.52] text-[#edf3fb]">
                      {value.description}
                    </p>
                  </div>

                  <ValueCardTide reversed={index === 1} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate -mt-px overflow-hidden bg-[#061F46] px-5 pb-28 pt-32 sm:px-8 sm:pb-32 sm:pt-36 md:pt-40 lg:px-[6vw]">
        <SoftWaveJoin
          body="#061F46"
          id="about-numbers-join"
          top="#03224F"
        />
        <div className="relative z-10 mx-auto max-w-[1320px]">
          <div className="text-center">
            <SectionPill>By the numbers</SectionPill>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-7">
            {numbers.map((item, index) => {
              const NumberIcon = item.icon;

              return (
                <article
                  className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/38 bg-[#061d3d]/78 px-7 py-9 text-center shadow-[0_20px_60px_rgba(0,9,29,0.18)] sm:px-10"
                  key={item.label}
                >
                  <NumberIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-7 -left-7 size-40 text-[#58baff] opacity-[0.12] sm:-bottom-9 sm:-left-8 sm:size-52"
                    strokeWidth={1.35}
                  />
                  <MetricConfetti mirrored={index === 1} />
                  <p className="relative z-10 text-6xl font-semibold leading-none tracking-[-0.045em] text-[#E98973] sm:text-7xl">
                    {item.value}
                  </p>
                  <p className="relative z-10 mt-5 max-w-[34rem] text-lg leading-8 text-white/72 sm:text-xl">
                    {item.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TODO(client): confirm where HR takes applications, then link to it. */}
      <section
        className="relative isolate -mt-px min-h-[46rem] scroll-mt-24 overflow-hidden px-5 pb-40 pt-40 text-white sm:min-h-[50rem] sm:px-8 sm:pb-44 sm:pt-44 md:min-h-[52rem] md:pb-48 md:pt-48 lg:px-[6vw]"
        id="careers"
        style={{
          background: `linear-gradient(180deg, #03224F 0%, #061F46 35%, ${CTA_TOP} 100%)`,
        }}
      >
        <SoftWaveJoin
          body="#03224F"
          id="about-careers-join"
          top="#061F46"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(23,91,168,0.22),transparent_46%)]"
        />

        <div className="relative z-20 mx-auto max-w-[1080px] text-center">
          <SectionPill>Careers</SectionPill>
          <h2 className="mx-auto mt-7 max-w-[17ch] text-balance text-[clamp(2.5rem,4.4vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
            Careers, not gigs.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-pretty text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
            We&apos;re building careers and community in the Philippines. If
            you want to grow with a team that stays, we&apos;d like to hear
            from you.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[230%] max-w-none -translate-x-1/2 opacity-[0.16] saturate-[0.45] brightness-[0.65] contrast-[1.08] sm:w-[175%] md:w-[140%] lg:w-[118%] xl:w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 72%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 72%, transparent 100%)",
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44"
          style={{
            background: `linear-gradient(180deg, rgba(2,44,105,0) 0%, ${CTA_TOP} 100%)`,
          }}
        />
      </section>
    </main>
  );
}
