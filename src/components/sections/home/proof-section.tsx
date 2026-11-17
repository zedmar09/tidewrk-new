import Image from "next/image";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { SectionPill } from "@/components/ui/section-pill";
import { siteConfig } from "@/constants/site";

import { ClientTestimonials } from "./client-testimonials";
import { ProofConfetti } from "./proof/proof-confetti";
import { SoftWaveJoin } from "./shared/soft-wave-join";

// "Teams already running on this" (Website Direction §4.8): the trophy for the
// one confirmed number on the left, the three stories on the right.
// Design: design/references/proof-* (flat 2D assets from ChatGPT).
//
// Real numbers only. Never fill a slot with an estimate or "70+ years".
// TODO(client): confirm the current team count with HR; add the retention
// number and cost ratio only once confirmed.
// Client names (STS, Xpanse, KSA, Omatic) stay out until each client approves.

const PROOF_BODY = "#03224F";
/** The "How we use AI" section ends on this navy, so the join starts on it. */
const ABOVE = "#061F46";

// The trimmed trophy art (1051 × 896) and the ribbon's front face inside it,
// as % of the art, so "100+" and its label always sit inside the ribbon.
const TROPHY = { w: 1051, h: 896 };
const RIBBON = { left: 12.9, width: 73.7, top: 70.1, height: 21.2 };

// "The rescue" is the strongest story, so it comes first.
const stories = [
  {
    id: "rescue",
    title: "The rescue",
    body: "The previous vendor dropped the project. We picked it up mid-stream, stabilized it, and have grown with them since.",
  },
  {
    id: "platform",
    title: "Built end to end",
    body: "A comprehensive platform delivered under a CEO known for being hard to satisfy.",
  },
  {
    id: "gears",
    title: "The back office, run",
    body: "Not tasks handed off. Functions handed off: the process captured, people trained on it, redundancy behind the critical ones.",
  },
];

/** Every icon fills the same square tile, so they read as one balanced set. */
function StoryIcon({ id }: { id: string }) {
  if (id === "rescue") {
    return (
      <Image alt="" className="proof-bob size-[82%] object-contain" height={941} sizes="80px" src="/images/proof/icon-rescue.webp" width={931} />
    );
  }
  if (id === "platform") {
    return (
      <Image alt="" className="proof-bob size-[82%] object-contain" height={958} sizes="80px" src="/images/proof/icon-platform.webp" style={{ animationDelay: "-1.6s" }} width={926} />
    );
  }
  // Two gears turning against each other, composed inside the same square.
  return (
    <span className="relative block size-[86%]">
      <Image alt="" className="proof-spin absolute left-0 top-0 h-auto w-[66%]" height={800} sizes="56px" src="/images/proof/gear-large.webp" width={800} />
      <Image alt="" className="proof-spin-reverse absolute bottom-0 right-0 h-auto w-[48%]" height={600} sizes="40px" src="/images/proof/gear-small.webp" width={600} />
    </span>
  );
}

export function ProofSection() {
  return (
    <section
      className="relative isolate -mt-px overflow-hidden pb-12 pt-24 text-white md:pb-14 md:pt-28"
      style={{ background: PROOF_BODY }}
    >
      {/* Soft gradient-wave join from the section above (same as Problem → Fits). */}
      <SoftWaveJoin body={PROOF_BODY} id="proof-join" top={ABOVE} />
      {/* Fades into the top of the final CTA's sky, so the two meet seamlessly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: `linear-gradient(180deg, rgba(3,34,79,0) 0%, ${CTA_TOP} 100%)` }}
      />

      {/* Heading, centred above both columns. The client's two lines are
          swapped (§4.8 lists "Proof" as the H2): the full sentence carries the
          headline, "Proof" labels the section in the pill. No new copy. */}
      <div className="relative px-5 text-center sm:px-8">
        <SectionPill>Proof</SectionPill>
        <h2 className="mx-auto mt-5 max-w-[16ch] text-balance text-[clamp(2.3rem,4.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.01em] sm:max-w-none">
          Teams already running on this
        </h2>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:mt-14 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        {/* Left: the trophy (the one confirmed number). */}
        <div className="text-center">
          <div className="@container relative mx-auto w-[min(76vw,22rem)] lg:w-full lg:max-w-[23rem]">
            {/* Soft glow behind the trophy */}
            <div
              aria-hidden="true"
              className="proof-glow pointer-events-none absolute left-1/2 top-[38%] size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,137,115,0.28)_0%,rgba(59,111,184,0.32)_30%,rgba(3,34,79,0)_68%)]"
            />
            <ProofConfetti />

            <div className="proof-float relative">
              <Image
                alt=""
                className="h-auto w-full"
                height={TROPHY.h}
                sizes="(min-width: 1024px) 368px, 76vw"
                src="/images/proof/trophy.svg"
                unoptimized
                width={TROPHY.w}
              />
              {/* "100+" and its label together, inside the ribbon. */}
              <p
                className="absolute flex flex-col items-center justify-center text-center leading-none"
                style={{ left: `${RIBBON.left}%`, width: `${RIBBON.width}%`, top: `${RIBBON.top}%`, height: `${RIBBON.height}%` }}
              >
                <span className="font-semibold text-white" style={{ fontSize: "clamp(1.4rem, 9.2cqw, 2.4rem)" }}>
                  100+
                </span>
                <span className="mt-[0.35em] font-medium text-[#C8CCD0]" style={{ fontSize: "clamp(0.7rem, 3.3cqw, 0.9rem)" }}>
                  team members, and growing
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: the three stories, compact. */}
        <ol className="mx-auto grid w-full max-w-[40rem] gap-4 lg:max-w-none">
          {stories.map((story) => (
            <li
              className="flex items-start gap-5 rounded-[1.1rem] border border-[#C8CCD0]/25 bg-[#071A3A] p-5 shadow-[0_18px_50px_rgba(0,8,30,0.35)] sm:gap-6 sm:p-6"
              key={story.id}
            >
              <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-[1rem] border border-[#C8CCD0]/15 bg-[#0B2A55] sm:size-20">
                <StoryIcon id={story.id} />
              </span>
              <span className="min-w-0">
                <h3 className="text-[clamp(1.2rem,1.6vw,1.45rem)] font-semibold leading-tight">{story.title}</h3>
                <p className="mt-2 text-pretty text-base leading-relaxed text-[#C8CCD0]">{story.body}</p>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {siteConfig.features.showTestimonials && (
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
          <ClientTestimonials />
        </div>
      )}
    </section>
  );
}
