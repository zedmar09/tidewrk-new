import { siteConfig } from "@/constants/site";

import { ClientTestimonials } from "./client-testimonials";
import { SectionHeading } from "./section-heading";

// Real numbers only. Never fill a slot with an estimate or "70+ years".
// TODO(client): retention number, cost ratio vs. a local hire, and a current
// team count confirmation from HR. Add each stat here only once confirmed.
const stats = [{ value: "100+", label: "team members, and growing" }];

// Client names (STS, Xpanse, KSA, Omatic) stay out until each client approves.
// TODO(client): swap in names and Laura's quote once permission is granted.
const stories = [
  {
    eyebrow: "The rescue",
    body: "The previous vendor dropped the project. We picked it up mid-stream, stabilized it, and have grown with them since.",
  },
  {
    eyebrow: "Built end to end",
    body: "A comprehensive platform delivered under a CEO known for being hard to satisfy.",
  },
  {
    eyebrow: "The back office, run",
    body: "Not tasks handed off. Functions handed off: the process captured, people trained on it, redundancy behind the critical ones.",
  },
];

export function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Teams already running on this" title="Proof" />

        <div className="mt-14 flex flex-wrap justify-center gap-10">
          {stats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <p className="tidewrk-glow-text text-6xl font-semibold leading-none sm:text-7xl">
                {stat.value}
              </p>
              <p className="mt-3 text-base text-white/60 sm:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <article
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 sm:p-7"
              key={story.eyebrow}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/46">
                {story.eyebrow}
              </p>
              <p className="mt-4 text-lg leading-8 text-white/72">{story.body}</p>
            </article>
          ))}
        </div>

        {siteConfig.features.showTestimonials && <ClientTestimonials />}
      </div>
    </section>
  );
}
