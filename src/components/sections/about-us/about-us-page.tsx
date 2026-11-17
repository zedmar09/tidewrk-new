import { CheckCircle2, Compass, Workflow } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-link";
import { SectionPill } from "@/components/ui/section-pill";

// Values: kept from the current site with light edits (Website Direction §5.8).
const values = [
  {
    title: "Move with purpose",
    description: "The next practical step, not noise or busywork.",
    icon: Compass,
  },
  {
    title: "Build around the work",
    description:
      "People, workflows, and technology shaped around how your business actually runs.",
    icon: Workflow,
  },
  {
    title: "Stay accountable",
    description:
      "A named person behind every piece of work, clear communication, and follow-through.",
    icon: CheckCircle2,
  },
];

// TODO(client): confirm the current team count with HR.
const numbers = [
  { value: "100+", label: "team members and growing" },
  { value: "3", label: "offices: South Carolina, New York, and Manila" },
];

export function AboutUsPage() {
  return (
    <main className="relative overflow-hidden bg-[#061F46] text-white">
      <section className="relative isolate px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-[6vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,75,146,0.38),transparent_34%),radial-gradient(ellipse_at_14%_72%,rgba(15,75,146,0.22),transparent_28%),radial-gradient(ellipse_at_88%_58%,rgba(15,75,146,0.18),transparent_30%),linear-gradient(180deg,#061F46_0%,#082854_52%,#061F46_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#061F46] via-[#061F46]/88 to-transparent"
        />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
          <div>
            <SectionPill>About Tidewrk</SectionPill>

            <h1 className="mt-8 max-w-5xl text-balance text-[3.5rem] font-semibold leading-[0.98] tracking-normal text-white sm:text-7xl lg:text-[6.2rem]">
              Built on three coasts.{" "}
              <span className="text-[#E98973]">Working inside your team.</span>
            </h1>
          </div>

          <div className="max-w-3xl lg:pb-3">
            <p className="text-pretty text-xl leading-9 text-white/68 sm:text-2xl sm:leading-10">
              Tidewrk&apos;s roots run from Long Island to Charleston to the
              Philippines. We embed developers, operators, and support inside
              growing businesses, and we build so the people we hire have
              careers, not gigs.
            </p>
            <CtaLink className="mt-8" size="lg" />
          </div>
        </div>
      </section>

      {/* TODO(client): "The name" section needs the three-coasts story from the
          rebrand announcement (short), and leadership bios are still open (MJE / John). */}

      <section className="relative px-5 py-14 sm:px-8 md:py-20 lg:px-[6vw]">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
              Our mission
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Building careers and community in the Philippines.
            </h2>
          </div>
          <div className="space-y-6 text-pretty text-xl leading-9 text-white/68">
            <p>
              Tidewrk was built in the Philippines on purpose. Employing and
              developing people is part of the mission.
            </p>
            <p>
              The people we hire are employees with career paths, not
              freelancers between gigs. That&apos;s what makes us a company,
              not a marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-4 sm:px-8 sm:pb-28 lg:px-[6vw]">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
            Our values
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {values.map((value) => {
              const ValueIcon = value.icon;

              return (
                <article
                  className="rounded-[1.35rem] border border-white/10 bg-[#071A3A]/80 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-7"
                  key={value.title}
                >
                  <span className="flex size-[3.25rem] items-center justify-center rounded-full border border-[#003f72]/50 bg-[#003f72]/22 text-white shadow-[0_0_18px_rgba(255,255,255,0.12),0_0_34px_rgba(0,63,114,0.45)]">
                    <ValueIcon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight text-white">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/62">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 border-t border-white/10 pt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
              By the numbers
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {numbers.map((item) => (
                <div key={item.label}>
                  <p className="text-6xl font-semibold leading-none text-[#E98973]">
                    {item.value}
                  </p>
                  <p className="mt-3 text-lg text-white/62">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TODO(client): confirm where HR takes applications, then link to it. */}
      <section
        className="relative scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28 lg:px-[6vw]"
        id="careers"
      >
        <div className="mx-auto max-w-[1500px] border-t border-white/10 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/42">
            Careers
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white">
            Careers, not gigs.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
            We&apos;re building careers and community in the Philippines. If
            you want to grow with a team that stays, we&apos;d like to hear
            from you.
          </p>
        </div>
      </section>
    </main>
  );
}
