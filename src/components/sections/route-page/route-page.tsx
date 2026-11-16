import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
import type { RoutePageContent } from "@/constants/route-pages";

const sectionClass =
  "relative overflow-hidden bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]";

// Hero-page template (Website Direction §5.1). Section order is fixed:
// hero → problem → guide → plan → promises → included → stakes → closing CTA (footer).
export function RoutePage({ content }: { content: RoutePageContent }) {
  return (
    <>
      <Navbar />
      <main>
        <RouteHero content={content} />
        <RouteProblem content={content} />
        <RouteGuide content={content} />
        <RoutePlan content={content} />
        <RoutePromises content={content} />
        {content.included && <RouteIncluded content={content} />}
        <RouteStakes content={content} />
      </main>
      <Footer />
    </>
  );
}

function RouteHero({ content }: { content: RoutePageContent }) {
  return (
    <PageHero
      eyebrow={content.menuLabel}
      subline={content.subline}
      title={content.headline}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  subline,
}: {
  eyebrow: string;
  title: string;
  subline: string;
}) {
  return (
    <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-[#02050a] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-[6vw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,63,114,0.7),transparent_45%),linear-gradient(180deg,#02050a_0%,#07111f_50%,#02050a_100%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl text-center">
        <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
          {eyebrow}
        </span>
        <h1 className="mt-8 text-balance text-[clamp(2.4rem,10vw,3.4rem)] font-semibold leading-[1.04] tracking-normal sm:text-7xl lg:text-[5.2rem]">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-4xl text-pretty text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
          {subline}
        </p>
        <CtaLink className="mt-9" size="lg" />
      </div>
    </section>
  );
}

function RouteProblem({ content }: { content: RoutePageContent }) {
  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-4xl">
        <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
          Sound familiar?
        </span>
        <p className="mt-7 text-balance text-3xl font-semibold leading-tight text-white sm:text-[2.6rem] sm:leading-[1.15]">
          {content.problem}
        </p>
      </div>
    </section>
  );
}

function RouteGuide({ content }: { content: RoutePageContent }) {
  return (
    <section className={sectionClass}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(0,63,114,0.3),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Why Tidewrk" title={content.empathy} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {content.proof.map((point) => (
            <article
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 sm:p-7"
              key={point.title}
            >
              <h3 className="text-2xl font-semibold leading-tight">{point.title}</h3>
              <p className="mt-4 text-lg leading-8 text-white/64">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoutePlan({ content }: { content: RoutePageContent }) {
  return <StepsSection eyebrow="The plan" steps={content.plan} title="How this works" />;
}

export function StepsSection({
  eyebrow,
  title,
  steps,
  id,
}: {
  eyebrow: string;
  title: string;
  steps: Array<{ title: string; body: string }>;
  id?: string;
}) {
  return (
    <section className={`${sectionClass} scroll-mt-16`} id={id}>
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ol className="relative mt-14 grid gap-5 xl:grid-cols-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-[#003f72] via-white/30 to-[#003f72] xl:block"
          />
          {steps.map((step, index) => (
            <li
              className="relative flex gap-5 xl:block"
              key={step.title}
            >
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[#003f72]/70 bg-[#06111f] text-base font-semibold shadow-[0_0_28px_rgba(0,63,114,0.6)] xl:mx-auto">
                0{index + 1}
              </span>
              <div className="flex-1 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5 xl:mt-6 xl:text-center">
                <h3 className="text-xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/64">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <CtaLink size="lg" />
        </div>
      </div>
    </section>
  );
}

function RoutePromises({ content }: { content: RoutePageContent }) {
  const columns =
    content.promises.length === 4
      ? "md:grid-cols-2 xl:grid-cols-4"
      : content.promises.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section className={sectionClass}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,63,114,0.3),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Our promises" title="What you get in writing" />
        <div
          className={`mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 ${columns}`}
        >
          {content.promises.map((promise, index) => (
            <article className="bg-[#050b14] p-7 sm:p-9" key={promise.title}>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/34">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{promise.title}</h3>
              <p className="mt-4 text-lg leading-8 text-white/64">{promise.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteIncluded({ content }: { content: RoutePageContent }) {
  const included = content.included!;

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading
          description={included.description}
          eyebrow="What’s included"
          title={included.title}
        />

        {included.roleTags && (
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {included.roleTags.map((role) => (
              <li
                className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/80"
                key={role}
              >
                {role}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {included.capabilities.map((capability) => (
            <Link
              className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 transition hover:border-[#003f72]/70 hover:bg-white/[0.07]"
              href={capability.href}
              key={capability.href}
            >
              <span className="flex items-center justify-between gap-3 text-lg font-semibold">
                {capability.title}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </span>
              <span className="mt-2 text-base leading-7 text-white/60">
                {capability.description}
              </span>
              {capability.tags && (
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {capability.tags.map((tag) => (
                    <span
                      className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-white/60"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteStakes({ content }: { content: RoutePageContent }) {
  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-[1300px]">
        <SectionHeading eyebrow="What’s at stake" title="The difference the right team makes" />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <StakesColumn items={content.stakes.without} title="Without the right team" tone="without" />
          <StakesColumn items={content.stakes.with} title="With it" tone="with" />
        </div>

        {content.nextStep && (
          <p className="mt-12 text-center text-lg text-white/68">
            {content.nextStep.text}{" "}
            <Link
              className="inline-flex items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline"
              href={content.nextStep.href}
            >
              {content.nextStep.linkLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

function StakesColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "with" | "without";
}) {
  const Icon = tone === "with" ? Check : Minus;

  return (
    <div
      className={`rounded-[1.25rem] border p-7 sm:p-9 ${
        tone === "with"
          ? "border-[#003f72]/70 bg-[#003f72]/14"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li className="flex gap-3 text-lg leading-8 text-white/72" key={item}>
            <Icon
              aria-hidden="true"
              className={`mt-1.5 size-5 shrink-0 ${tone === "with" ? "text-white" : "text-white/40"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
