import Link from "next/link";
import { ArrowRight, Code2, Rocket, UserRound, Workflow } from "lucide-react";

import { routes } from "@/constants/navigation";

// Card order matches the menu. The whole card is the action; no button in this section.
const fitCards = [
  {
    quote: "I have an idea but no technical team.",
    description:
      "You can see the product. You can’t build it, and handing it to the wrong team costs you the runway you just raised.",
    linkLabel: "Build your product",
    href: routes.buildYourProduct,
    icon: Rocket,
  },
  {
    quote: "We can’t hire engineers fast enough.",
    description:
      "The roadmap is committed and the team is short. You need people who ramp inside your process instead of slowing it down.",
    linkLabel: "Scale your engineering team",
    href: routes.scaleYourEngineeringTeam,
    icon: Code2,
  },
  {
    quote: "My back office can’t keep up.",
    description:
      "The work that keeps the business running rests on two people, and one of them is out next week.",
    linkLabel: "Run your back office",
    href: routes.runYourBackOffice,
    icon: Workflow,
  },
  {
    quote: "I’m doing work I shouldn’t be doing.",
    description:
      "Your calendar is full and none of it is the job you were hired to do.",
    linkLabel: "Free up your time",
    href: routes.freeUpYourTime,
    icon: UserRound,
  },
];

export function WhereTidewrkFitsSection() {
  return (
    <section className="relative z-0 overflow-hidden bg-[#02050a] px-5 py-14 text-white sm:px-8 md:py-20 lg:px-[6vw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_28%,rgba(0,63,114,0.24),transparent_32%),radial-gradient(ellipse_at_78%_68%,rgba(0,63,114,0.22),transparent_34%),linear-gradient(180deg,#02050a_0%,#050b13_48%,#02050a_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#02050a] via-[#02050a]/88 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#02050a] via-[#02050a]/88 to-transparent"
      />

      <div className="relative mx-auto max-w-[1800px]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
            Where Tidewrk fits
          </span>

          <h2 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[4.7rem]">
            Built for the work behind{" "}
            <span className="tidewrk-glow-text">growth</span>
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-pretty text-xl leading-9 text-white/66 sm:text-2xl sm:leading-10">
            Most conversations start with one of these. Pick the one that
            sounds like your week.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[82%] -translate-x-1/2 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.18),0_0_30px_rgba(0,63,114,0.45)] xl:block"
          />

          {fitCards.map((card, index) => {
            const CardIcon = card.icon;

            return (
              <Link
                aria-label={`${card.quote} ${card.linkLabel}`}
                className="group relative min-h-[24rem] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.035))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#003f72]/70 hover:bg-white/[0.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:p-7"
                href={card.href}
                key={card.href}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#003f72] to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(0,63,114,0.22),transparent_34%)]"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex size-14 items-center justify-center rounded-full border border-[#003f72]/50 bg-[#003f72]/22 text-white shadow-[0_0_18px_rgba(255,255,255,0.12),0_0_34px_rgba(0,63,114,0.45)]">
                      <CardIcon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/34">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-9">
                    <h3 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-[1.7rem]">
                      &ldquo;{card.quote}&rdquo;
                    </h3>
                    <p className="mt-4 text-lg leading-8 text-white/64">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-8">
                    <span className="inline-flex items-center gap-2 text-base font-semibold text-white/86 transition group-hover:text-white">
                      {card.linkLabel}
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
