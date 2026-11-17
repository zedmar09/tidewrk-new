import Image from "next/image";
import { Handshake, Search, Wrench, type LucideIcon } from "lucide-react";

import { GuideBackdrop } from "./guide/guide-backdrop";

// Client names stay out until each client gives permission (see Website Direction §7).
const proofPoints: Array<{
  title: string;
  body: string;
  image: string;
  icon: LucideIcon;
}> = [
  {
    title: "We fix what others abandon.",
    body: "A previous vendor walked off a client project mid-stream. We took it over, stabilized it, and the engagement has grown since.",
    image: "/images/guide/why-us-project-recovery.svg",
    icon: Wrench,
  },
  {
    title: "We hold up under scrutiny.",
    body: "One client sent six of their own programmers to evaluate our team before they engaged. Another client’s CEO is famously and self-admittedly hard to satisfy, and we built their platform end to end.",
    image: "/images/guide/why-us-quality-scrutiny.svg",
    icon: Search,
  },
  {
    title: "Clients send us clients.",
    body: "One client came through a referral and named us vendor of choice quickly. Another came through a board member. Most of our growth has come from someone vouching for us.",
    image: "/images/guide/why-us-client-referrals.svg",
    icon: Handshake,
  },
];

function CardCurrent({ reversed = false }: { reversed?: boolean }) {
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

export function GuideSection() {
  return (
    <section
      className="relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#061F46_0%,#061F46_58%,#082854_84%,#061F46_100%)] px-5 pb-16 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28 md:pb-20 md:pt-32 lg:px-[2.5vw] lg:pb-20 lg:pt-28"
      id="why-tidewrk"
    >
      <GuideBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(15,75,146,0.22),transparent_40%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-[#9fb2ca]/55 bg-[#061a37]/70 px-7 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_32px_rgba(0,9,29,0.24)] sm:text-sm">
            Why companies bet on us
          </span>

          <h2 className="mt-7 text-balance text-[clamp(2.35rem,3.5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            We’ve been the team companies bet on.{" "}
            <span className="text-[#f18a73]">
              We build so that bet is safe.
            </span>
          </h2>

          <p className="mt-5 max-w-[1140px] text-pretty text-[clamp(1.05rem,1.45vw,1.35rem)] leading-[1.55] text-[#d8e2ef]">
            We don’t send people and wait for instructions. We’re in the room
            where decisions get made, working in your tools, on your schedule,
            to your standard. That’s the difference between a vendor and a team.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <article
                className="relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/45 bg-[#061d3d]/90 px-6 pb-24 pt-5 shadow-[0_22px_60px_rgba(0,9,29,0.24)] sm:px-9 sm:pt-7 lg:px-7 xl:px-9"
                key={point.title}
              >
                <div className="relative z-10 flex h-52 items-center justify-center sm:h-60 lg:h-52 xl:h-60">
                  <Image
                    alt=""
                    className="h-full w-full object-contain"
                    height={675}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    src={point.image}
                    unoptimized
                    width={1200}
                  />
                </div>

                <div className="relative z-10 mt-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 size-8 shrink-0 text-[#ff8a70]"
                      strokeWidth={2.2}
                    />
                    <h3 className="text-[clamp(1.3rem,1.8vw,1.65rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.52] text-[#edf3fb]">
                    {point.body}
                  </p>
                </div>

                <CardCurrent reversed={index === 1} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
