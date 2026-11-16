import { CtaLink } from "@/components/ui/cta-link";

import { SectionHeading } from "./section-heading";

// Must not promise an output: no "we'll map your workflow", no timeframe on a deliverable.
const steps = [
  {
    title: "One conversation.",
    body: "You tell us what you’re trying to deliver. We ask questions. That’s the whole first step.",
  },
  {
    title: "We match the people to the work.",
    body: "Against your bar, your stack, your process. On technical roles, you interview and approve every person.",
  },
  {
    title: "They embed, and they’re backed up.",
    body: "Your tools, your hours, your team’s rhythm. Redundancy behind anything critical, so continuity never rests on one person.",
  },
];

export function PlanSection() {
  return (
    <section className="relative bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="No decks, no homework" title="How this works" />

        <ol className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-[#003f72] via-white/30 to-[#003f72] lg:block"
          />
          {steps.map((step, index) => (
            <li className="relative" key={step.title}>
              <span className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full border border-[#003f72]/70 bg-[#06111f] text-lg font-semibold text-white shadow-[0_0_28px_rgba(0,63,114,0.6)] lg:mx-auto">
                0{index + 1}
              </span>
              <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 text-center sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-white/64">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-7 text-center">
          <p className="max-w-3xl text-xl leading-9 text-white/72 sm:text-2xl">
            From there we grow as you do. Scope widens as trust builds, not
            before.
          </p>
          <CtaLink size="lg" />
        </div>
      </div>
    </section>
  );
}
