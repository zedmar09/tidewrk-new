import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import {
  AiWorkflowSection,
  PromisesSection,
} from "@/components/sections/home";
import { SectionHeading } from "@/components/sections/home/section-heading";
import {
  PageHero,
  StepsSection,
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
  },
  {
    title: "Redundancy on critical roles.",
    body: "Anyone your work depends on has someone trained behind them, so a day off or a departure doesn’t stop anything.",
  },
];

const sectionClass =
  "relative bg-[#061F46] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]";

export default function HowWeWorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="How We Work"
          subline="The same plan and the same three promises, whatever we’re doing for you."
          title="How we work"
        />

        {/* Executive Advisory is how every engagement starts, not a separate service line. */}
        <section className={`${sectionClass} scroll-mt-16`} id="executive-advisory">
          <div className="mx-auto max-w-4xl">
            <SectionPill>Executive Advisory</SectionPill>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Every engagement starts at the leadership level.
            </h2>
            <p className="mt-6 text-pretty text-xl leading-9 text-white/68">
              Before anyone is staffed, you talk with Tidewrk&apos;s leadership
              about what you&apos;re trying to deliver, and the work gets shaped
              in that conversation.
            </p>
          </div>
        </section>

        <StepsSection
          eyebrow="The plan"
          id="the-plan"
          steps={mainPlan}
          title="Five steps, every engagement"
        />

        {/* TODO(client): Website Direction §5.7 asks for one more sentence on each promise. */}
        <PromisesSection />

        <AiWorkflowSection />

        <section className={sectionClass}>
          <div className="mx-auto max-w-[1300px]">
            <SectionHeading
              eyebrow="Working with your team"
              title="How we work with your team"
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {withYourTeam.map((item) => (
                <article
                  className="rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-7 sm:p-9"
                  key={item.title}
                >
                  <h3 className="text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-white/64">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
