import { PromiseCardGrid } from "./promises/promise-card-grid";
import { PromisesBackdrop } from "./promises/promises-backdrop";
import { SectionHeading } from "./section-heading";

// TODO(client): confirm the tools list in promise 3 (Website Direction §7, owner Jay).
const promises = [
  {
    title: "You own what we build.",
    body: "Always. The code, the systems, the documentation. Any exception is agreed and documented before work begins, and there usually isn’t one.",
    image: "/images/promises/promise-ownership-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
  {
    title: "No single point of failure.",
    body: "Critical roles have depth behind them by design, not by luck. When someone moves on, it’s a handoff, not a restart.",
    image: "/images/promises/promise-redundancy-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
  {
    title: "We adapt to you.",
    body: "Notion, Slack, Jira, Teams, whatever you already run. Your process, your ceremonies, your definition of done. The adjustment is ours to make.",
    image: "/images/promises/promise-workflow-icon.svg",
    imageWidth: 1310,
    imageHeight: 1200,
  },
];

export function PromisesSection() {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[linear-gradient(180deg,#061F46_0%,#061F46_76%,#082854_100%)] px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-28 sm:pt-28 md:pb-32 md:pt-32 lg:px-[2.5vw] lg:pt-28">
      <PromisesBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(15,75,146,0.18),transparent_46%)]"
      />
      <div className="relative z-10 mx-auto max-w-[1540px]">
        <SectionHeading
          eyebrow="The same three, every engagement"
          title="What you get in writing"
        />

        <PromiseCardGrid idPrefix="homepage-promise" items={promises} />
      </div>
    </section>
  );
}
