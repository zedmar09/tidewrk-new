import { ProblemBackdrop } from "./problem/problem-backdrop";
import { ProblemScene } from "./problem/problem-scene";

// Plain band: no cards, no icons. The villain is the transactional vendor, never distance.
// Continues the hero: it starts on the hero's front-wave colour (#012356) and
// deepens like design/references/problem-reference-v1.webp.
//
// Alignment with the hero: the copy starts at the same x as the hero's first
// (Plan) dot, which the hero places at 9% of the screen width (EDGE in
// hero/tide-stations.tsx). On phones the hero scene slides sideways, so the
// margin is a fixed value there.
//
//   --top   section padding above the text
//   --rail  left margin of the copy (= the hero's Plan dot on md+)
//   --end   right-hand padding
export function ProblemSection() {
  return (
    <section className="@container relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#012356_0%,#02204C_12%,#021C47_22%,#011840_45%,#021C43_75%,#011437_100%)] pb-24 pt-[var(--top)] text-white [--top:6.5rem] md:pb-32 md:[--top:9.5rem]">
      <ProblemBackdrop />
      {/* Settle into calm #011437 at the bottom, the colour "Where Tidewrk fits" starts with. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,rgba(1,20,55,0)_0%,#011437_100%)]" />

      <div className="relative [--end:1.25rem] [--rail:1.25rem] sm:[--end:1.5rem] sm:[--rail:1.5rem] md:[--end:9cqw] md:[--rail:9cqw]">
        <div
          className="grid items-center gap-12 xl:grid-cols-[minmax(0,50rem)_minmax(0,1fr)] xl:gap-20"
          style={{ paddingLeft: "var(--rail)", paddingRight: "var(--end)" }}
        >
          <div>
            <span className="inline-flex rounded-full border border-[#C8CCD0]/30 bg-[#071A3A] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-[0_8px_30px_rgba(0,8,30,0.35)] sm:px-5 sm:py-2 sm:text-sm">
              What we were built against
            </span>

            <h2 className="mt-7 text-balance text-[clamp(2.3rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.01em]">
              You&apos;re not struggling.
              <br />
              You&apos;re <span className="text-[#E98973]">constrained.</span>
            </h2>

            <p className="mt-6 text-[clamp(1.15rem,1.7vw,1.5rem)] font-medium leading-snug">
              You know what needs to happen. The gap is people.
            </p>

            <div className="mt-6 max-w-[40rem] space-y-6 text-pretty text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.65] text-[#C8CCD0]">
              <p>
                Hiring is slow, expensive, and competitive, and every hire is a
                bet you&apos;re the one who has to answer for. Meanwhile
                everything that matters depends on too few people, and you know
                exactly which ones.
              </p>
              <p>
                The usual answer makes it worse. A vendor sends people, takes
                direction, owns nothing, and rotates them out when it suits
                them. Six months later you&apos;re re-explaining your own
                business to someone new, or finding out the hard way who owns
                the code.
              </p>
            </div>

            <p className="mt-8 max-w-[38rem] text-pretty text-[clamp(1.1rem,1.5vw,1.35rem)] font-semibold leading-snug">
              Building a company shouldn&apos;t force a choice between what you
              can afford and what you can trust.
            </p>
          </div>

          {/* Centred in the right column with clear space from the copy; under the text on smaller screens. */}
          <ProblemScene className="mx-auto w-full max-w-[28rem] xl:max-w-[32rem]" />
        </div>
      </div>
    </section>
  );
}
