import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routes } from "@/constants/navigation";

import { FitsBackdrop } from "./fits/fits-backdrop";


// "Where Tidewrk fits" (Website Direction §4.3): four scenario cards in the
// visitor's words. Copy is the client's, word for word; card order matches the
// menu; the whole card is the action, so there is no button in this section.
// Design: design/references/fits-mockup.png. Each card's illustration is a
// two-beat flow, "your week" → "with Tidewrk".
//
// The left margin matches the Problem section above (--rail = 9% of the width
// on md+, the same x as the hero's Plan dot).

// All four scenario images share one crop (1734 × 597), so they line up.
const SCENE_W = 1734;
const SCENE_H = 597;

const scenarios = [
  {
    number: "01",
    quote: "I have an idea but no technical team.",
    body: "You can see the product. You can’t build it, and handing it to the wrong team costs you the runway you just raised.",
    link: "Build your product",
    href: routes.buildYourProduct,
    image: "/images/fits/scenario-01-build.svg",
  },
  {
    number: "02",
    quote: "We can’t hire engineers fast enough.",
    body: "The roadmap is committed and the team is short. You need people who ramp inside your process instead of slowing it down.",
    link: "Scale your engineering team",
    href: routes.scaleYourEngineeringTeam,
    image: "/images/fits/scenario-02-scale.svg",
  },
  {
    number: "03",
    quote: "My back office can’t keep up.",
    body: "The work that keeps the business running rests on two people, and one of them is out next week.",
    link: "Run your back office",
    href: routes.runYourBackOffice,
    image: "/images/fits/scenario-03-backoffice.svg",
  },
  {
    number: "04",
    quote: "I’m doing work I shouldn’t be doing.",
    body: "Your calendar is full and none of it is the job you were hired to do.",
    link: "Free up your time",
    href: routes.freeUpYourTime,
    image: "/images/fits/scenario-04-time.svg",
  },
];

export function WhereTidewrkFitsSection() {
  // Soft gradient waves join the Problem section at the top (FitsBackdrop);
  // the last wave's colour (#03224F, FITS_BODY) is the solid body colour.
  return (
    <section className="@container relative isolate -mt-px overflow-hidden bg-[#03224F] pb-24 pt-32 text-white md:pb-32 md:pt-40">
      <FitsBackdrop />

      <div className="relative [--rail:1.25rem] sm:[--rail:1.5rem] md:[--rail:9cqw]" style={{ paddingInline: "var(--rail)" }}>
        {/* Heading block centred over the cards. */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-[#C8CCD0]/30 bg-[#071A3A] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-[0_8px_30px_rgba(0,8,30,0.35)] sm:px-5 sm:py-2 sm:text-sm">
            Where Tidewrk fits
          </span>

          <h2 className="mt-7 text-balance text-[clamp(2.3rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.01em]">
            Built for the work behind <span className="text-[#E98973]">growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46rem] text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-[#C8CCD0]">
            Most conversations start with one of these. Pick the one that sounds
            like your week.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6 xl:mt-14">
          {scenarios.map((card) => (
            <li key={card.href}>
              <Link
                aria-label={`${card.quote} ${card.link}`}
                className="group flex h-full flex-col rounded-[1.25rem] border border-[#C8CCD0]/25 bg-[#071A3A] p-5 shadow-[0_18px_50px_rgba(0,8,30,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#C8CCD0]/50 hover:bg-[#0A2148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:p-7"
                href={card.href}
              >
                <span className="text-sm font-medium text-[#C8CCD0]/80">{card.number}</span>

                {/* "Your week" → "with Tidewrk" */}
                <span className="mt-3 block overflow-hidden">
                  <Image
                    alt=""
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                    height={SCENE_H}
                    sizes="(min-width: 768px) 41vw, 90vw"
                    src={card.image}
                    unoptimized
                    width={SCENE_W}
                  />
                </span>

                <span className="mt-5 block text-[clamp(1.2rem,1.6vw,1.45rem)] font-medium leading-snug text-white">
                  &ldquo;{card.quote}&rdquo;
                </span>
                <span className="mt-2 block text-pretty text-base leading-relaxed text-[#C8CCD0]">
                  {card.body}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold text-white">
                  {card.link}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
