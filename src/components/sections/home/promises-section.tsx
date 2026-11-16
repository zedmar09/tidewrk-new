import { SectionHeading } from "./section-heading";

// TODO(client): confirm the tools list in promise 3 (Website Direction §7, owner Jay).
const promises = [
  {
    title: "You own what we build.",
    body: "Always. The code, the systems, the documentation. Any exception is agreed and documented before work begins, and there usually isn’t one.",
  },
  {
    title: "No single point of failure.",
    body: "Critical roles have depth behind them by design, not by luck. When someone moves on, it’s a handoff, not a restart.",
  },
  {
    title: "We adapt to you.",
    body: "Notion, Slack, Jira, Teams, whatever you already run. Your process, your ceremonies, your definition of done. The adjustment is ours to make.",
  },
];

export function PromisesSection() {
  return (
    <section className="relative overflow-hidden bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,63,114,0.3),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow="The same three, every engagement"
          title="What you get in writing"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-3">
          {promises.map((promise, index) => (
            <article className="bg-[#050b14] p-7 sm:p-9" key={promise.title}>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/34">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                {promise.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-white/64">{promise.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
