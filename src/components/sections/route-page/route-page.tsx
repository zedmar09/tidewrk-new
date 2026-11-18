import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Handshake,
  Minus,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PromiseCardGrid } from "@/components/sections/home/promises/promise-card-grid";
import { PromisesBackdrop } from "@/components/sections/home/promises/promises-backdrop";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionPill } from "@/components/ui/section-pill";
import type { RoutePageContent } from "@/constants/route-pages";

import { IncludedTeamSection } from "./included-team-section";
import { PlanCarousel } from "./plan-carousel";
import { StakesComparisonSection } from "./stakes-comparison-section";

const sectionClass =
  "relative overflow-hidden bg-[#061F46] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]";

const featuredGuideAssets: Array<{
  image: string;
  icon: LucideIcon;
}> = [
  {
    image: "/images/guide/why-us-project-recovery.svg",
    icon: Wrench,
  },
  {
    image: "/images/guide/why-us-quality-scrutiny.svg",
    icon: Search,
  },
  {
    image: "/images/guide/why-us-client-referrals.svg",
    icon: Handshake,
  },
];

const featuredPromiseAssets = [
  "/images/promises/promise-ownership-icon.svg",
  "/images/promises/promise-redundancy-icon.svg",
  "/images/promises/promise-workflow-icon.svg",
] as const;

// Hero-page template (Website Direction §5.1). Section order is fixed:
// hero → problem → guide → plan → promises → included → stakes → closing CTA (footer).
export function RoutePage({
  content,
  guideTitleAccent,
  guideVariant = "default",
  heroArtwork,
  heroTitleAccent,
  includedVariant = "default",
  planArtwork,
  planVariant = "default",
  problemArtwork,
  problemArtworkAlt,
  promisesArtwork,
  promisesVariant = "default",
  stakesVariant = "default",
}: {
  content: RoutePageContent;
  guideTitleAccent?: string;
  guideVariant?: "default" | "homepage";
  heroArtwork?: string;
  heroTitleAccent?: string;
  includedVariant?: "default" | "team-coverage";
  planArtwork?: string[];
  planVariant?: "default" | "carousel";
  problemArtwork?: string;
  problemArtworkAlt?: string;
  promisesArtwork?: string[];
  promisesVariant?: "default" | "homepage";
  stakesVariant?: "default" | "comparison";
}) {
  return (
    <>
      <Navbar />
      <main>
        <RouteHero
          content={content}
          heroArtwork={heroArtwork}
          heroTitleAccent={heroTitleAccent}
        />
        <RouteProblem
          content={content}
          continuesHeroArtwork={Boolean(heroArtwork)}
          problemArtwork={problemArtwork}
          problemArtworkAlt={problemArtworkAlt}
        />
        <RouteGuide
          content={content}
          titleAccent={guideTitleAccent}
          variant={guideVariant}
        />
        <RoutePlan
          artwork={planArtwork}
          content={content}
          variant={planVariant}
        />
        <RoutePromises
          artwork={promisesArtwork}
          content={content}
          variant={promisesVariant}
        />
        {content.included && (
          <RouteIncluded content={content} variant={includedVariant} />
        )}
        <RouteStakes content={content} variant={stakesVariant} />
      </main>
      <Footer />
    </>
  );
}

function RouteHero({
  content,
  heroArtwork,
  heroTitleAccent,
}: {
  content: RoutePageContent;
  heroArtwork?: string;
  heroTitleAccent?: string;
}) {
  return (
    <PageHero
      eyebrow={content.menuLabel}
      heroArtwork={heroArtwork}
      heroTitleAccent={heroTitleAccent}
      subline={content.subline}
      title={content.headline}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  subline,
  heroArtwork,
  heroLayout = "left",
  heroTitleAccent,
}: {
  eyebrow: string;
  title: string;
  subline: string;
  heroArtwork?: string;
  heroLayout?: "left" | "center";
  heroTitleAccent?: string;
}) {
  const hasArtwork = Boolean(heroArtwork);
  const hasCenteredArtwork = hasArtwork && heroLayout === "center";
  const hasAccent = Boolean(
    heroTitleAccent && title.endsWith(heroTitleAccent),
  );
  const titleLead = hasAccent
    ? title.slice(0, -heroTitleAccent!.length).trim()
    : title;

  return (
    <section
      className={
        hasArtwork
          ? "relative isolate flex min-h-[46rem] items-start overflow-hidden bg-[#08245b] px-5 pb-24 pt-32 text-white sm:min-h-[50rem] sm:px-8 sm:pb-28 sm:pt-36 lg:min-h-[max(100svh,56.28vw)] lg:px-[6vw] lg:pb-24 lg:pt-32"
          : "relative isolate flex min-h-[86svh] items-center overflow-hidden bg-[#061F46] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-[6vw]"
      }
    >
      {hasArtwork ? (
        <>
          <Image
            alt=""
            aria-hidden="true"
            className={
              hasCenteredArtwork
                ? "object-cover object-center"
                : "object-cover object-[70%_center] sm:object-[66%_center] md:object-[60%_center] lg:object-cover lg:object-center"
            }
            fill
            priority
            sizes="100vw"
            src={heroArtwork!}
            unoptimized
          />
          <div
            aria-hidden="true"
            className={
              hasCenteredArtwork
                ? "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,15,42,0.2)_0%,rgba(1,15,42,0.08)_52%,rgba(1,15,42,0.22)_100%)]"
                : "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,54,0.9)_0%,rgba(2,25,68,0.7)_46%,rgba(3,31,79,0.22)_72%,transparent_100%)] sm:bg-[linear-gradient(90deg,rgba(2,19,54,0.72)_0%,rgba(2,25,68,0.42)_40%,rgba(3,31,79,0.1)_64%,transparent_82%)] lg:bg-[linear-gradient(90deg,rgba(2,19,54,0.26)_0%,rgba(2,25,68,0.12)_34%,rgba(3,31,79,0.02)_56%,transparent_72%)]"
            }
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(2,40,116,0.5)_58%,#022874_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,75,146,0.38),transparent_45%),linear-gradient(180deg,#061F46_0%,#082854_50%,#061F46_100%)]"
        />
      )}

      <div
        className={
          hasCenteredArtwork
            ? "relative mx-auto w-full max-w-[1800px] translate-y-6 text-center sm:translate-y-8 lg:translate-y-10"
            : hasArtwork
            ? "relative mx-auto w-full max-w-[1800px] text-left"
            : "relative mx-auto w-full max-w-6xl text-center"
        }
      >
        <div
          className={
            hasCenteredArtwork
              ? "mx-auto max-w-[62rem]"
              : hasArtwork
                ? "max-w-[50rem]"
                : undefined
          }
        >
          <SectionPill>{eyebrow}</SectionPill>
          <h1
            className={
              hasCenteredArtwork
                ? "mt-7 text-balance text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.02em]"
                : hasArtwork
                ? "mt-7 max-w-[44rem] text-balance text-[clamp(2.6rem,4.9vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
                : "mt-8 text-balance text-[clamp(2.4rem,10vw,3.4rem)] font-semibold leading-[1.04] tracking-normal sm:text-7xl lg:text-[5.2rem]"
            }
          >
            {hasAccent ? (
              <>
                <span className="block">{titleLead}</span>
                <span className="block text-[#E98973]">
                  {heroTitleAccent}
                </span>
              </>
            ) : (
              title
            )}
          </h1>
          <p
            className={
              hasCenteredArtwork
                ? "mx-auto mt-6 max-w-4xl text-pretty text-[clamp(1rem,1.5vw,1.3rem)] font-normal leading-[1.55] text-[#E4E8EE]"
                : hasArtwork
                ? "mt-5 max-w-[42rem] text-pretty text-[clamp(1rem,1.3vw,1.25rem)] font-normal leading-[1.5] text-[#E4E8EE]"
                : "mx-auto mt-7 max-w-4xl text-pretty text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10"
            }
          >
            {subline}
          </p>
          <CtaLink className={hasArtwork ? "mt-7" : "mt-9"} size="lg" />
        </div>
      </div>
    </section>
  );
}

function RouteProblem({
  content,
  continuesHeroArtwork = false,
  problemArtwork,
  problemArtworkAlt,
}: {
  content: RoutePageContent;
  continuesHeroArtwork?: boolean;
  problemArtwork?: string;
  problemArtworkAlt?: string;
}) {
  const hasProblemArtwork = Boolean(
    problemArtwork && content.problemDisplay,
  );

  if (hasProblemArtwork) {
    const problemDisplay = content.problemDisplay!;

    return (
      <section className="relative -mt-px overflow-hidden bg-[linear-gradient(180deg,#022874_0%,#082854_38%,#061F46_100%)] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
        <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8 xl:gap-14">
          <div className="max-w-[38rem]">
            <SectionPill>Sound familiar?</SectionPill>
            <h2 className="mt-7 text-balance text-[clamp(2.65rem,5vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
              <span className="block">{problemDisplay.title}</span>
              <span className="mt-1 block text-[#E98973]">
                {problemDisplay.accent}
              </span>
            </h2>
            <p className="mt-7 max-w-[35rem] text-pretty text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
              {problemDisplay.body}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[50rem] lg:ml-auto">
            <Image
              alt={
                problemArtworkAlt ??
                "A product owner reviewing a software product plan and delivery workflow"
              }
              className="h-auto w-full object-contain"
              height={815}
              sizes="(min-width: 1024px) 54vw, 100vw"
              src={problemArtwork!}
              unoptimized
              width={1086}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        continuesHeroArtwork
          ? "relative -mt-px overflow-hidden bg-[linear-gradient(180deg,#022874_0%,#02266e_16%,#082854_52%,#061F46_100%)] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]"
          : sectionClass
      }
    >
      <div className="mx-auto max-w-4xl">
        <SectionPill>Sound familiar?</SectionPill>
        <p className="mt-7 text-balance text-3xl font-semibold leading-tight text-white sm:text-[2.6rem] sm:leading-[1.15]">
          {content.problem}
        </p>
      </div>
    </section>
  );
}

function RouteGuideCardCurrent({ reversed = false }: { reversed?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-32"
      preserveAspectRatio="none"
      viewBox="0 0 520 130"
    >
      <g transform={reversed ? "translate(520 0) scale(-1 1)" : undefined}>
        <path
          d="M0 67C76 91 147 57 223 45C319 30 386 72 520 16V130H0V67Z"
          fill="#0a3a78"
          opacity="0.92"
        />
        <path
          d="M0 84C101 105 176 65 266 64C363 63 415 87 520 42V130H0V84Z"
          fill="#0c4385"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

function RouteGuide({
  content,
  titleAccent,
  variant = "default",
}: {
  content: RoutePageContent;
  titleAccent?: string;
  variant?: "default" | "homepage";
}) {
  if (variant === "homepage") {
    const hasAccent = Boolean(
      titleAccent && content.empathy.endsWith(titleAccent),
    );
    const titleLead = hasAccent
      ? content.empathy.slice(0, -titleAccent!.length).trim()
      : content.empathy;

    return (
      <section
        className="relative isolate -mt-px overflow-hidden bg-[#061F46] px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 md:pt-40 lg:px-[2.5vw] lg:pb-24"
        id="why-tidewrk"
      >
        <SoftWaveJoin
          body="#061F46"
          id="build-product-guide-join"
          top="#061F46"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(15,75,146,0.22),transparent_40%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1540px]">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
            <SectionPill>Why Tidewrk</SectionPill>
            <h2 className="mt-7 text-balance text-[clamp(2.35rem,3.5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
              {titleLead}{" "}
              {hasAccent && (
                <span className="text-[#f18a73]">{titleAccent}</span>
              )}
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:gap-6">
            {content.proof.map((point, index) => {
              const asset = featuredGuideAssets[index];
              const Icon = asset.icon;

              return (
                <article
                  className="relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.6rem] border border-[#9fb2ca]/45 bg-[#061d3d]/90 px-6 pb-24 pt-5 shadow-[0_22px_60px_rgba(0,9,29,0.24)] sm:px-9 sm:pt-7 lg:px-7 xl:px-9"
                  key={point.title}
                >
                  <div className="relative z-10 flex h-52 items-center justify-center sm:h-60 lg:h-52 xl:h-60">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                      height={675}
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      src={asset.image}
                      unoptimized
                      width={1200}
                    />
                  </div>

                  <div className="relative z-10 mt-4">
                    <div className="flex items-start gap-3">
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 size-8 shrink-0 text-[#ff8a70]"
                        strokeWidth={2.2}
                      />
                      <h3 className="text-[clamp(1.3rem,1.8vw,1.65rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.52] text-[#edf3fb]">
                      {point.body}
                    </p>
                  </div>

                  <RouteGuideCardCurrent reversed={index === 1} />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(15,75,146,0.3),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Why Tidewrk" title={content.empathy} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {content.proof.map((point) => (
            <article
              className="rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-6 sm:p-7"
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

function RoutePlan({
  artwork = [],
  content,
  variant = "default",
}: {
  artwork?: string[];
  content: RoutePageContent;
  variant?: "default" | "carousel";
}) {
  if (variant === "carousel") {
    return (
      <PlanCarouselSection
        artwork={artwork}
        eyebrow="The plan"
        steps={content.plan}
        title="How this works"
      />
    );
  }

  return <StepsSection eyebrow="The plan" steps={content.plan} title="How this works" />;
}

export function PlanCarouselSection({
  artwork,
  eyebrow,
  id,
  steps,
  title,
}: {
  artwork: string[];
  eyebrow: string;
  id?: string;
  steps: Array<{ title: string; body: string }>;
  title: string;
}) {
  return (
    <section
      className="relative isolate -mt-px scroll-mt-16 overflow-hidden bg-[linear-gradient(180deg,#061F46_0%,#061F46_72%,#082854_100%)] px-0 pb-24 pt-32 text-white sm:pb-28 sm:pt-36 md:pb-32 md:pt-40"
      id={id}
    >
      <SoftWaveJoin
        body="#061F46"
        id={`${id ?? "route-plan"}-join`}
        top="#061F46"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(15,75,146,0.2),transparent_44%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1800px]">
        <div className="px-5 sm:px-8 lg:px-[6vw]">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <PlanCarousel images={artwork} steps={steps} />
      </div>
    </section>
  );
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
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[#003f72]/70 bg-[#071A3A] text-base font-semibold shadow-[0_0_28px_rgba(0,63,114,0.6)] xl:mx-auto">
                0{index + 1}
              </span>
              <div className="flex-1 rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-5 xl:mt-6 xl:text-center">
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

function RoutePromises({
  artwork = featuredPromiseAssets,
  content,
  variant = "default",
}: {
  artwork?: readonly string[];
  content: RoutePageContent;
  variant?: "default" | "homepage";
}) {
  if (variant === "homepage") {
    const promiseCards = content.promises.map((promise, index) => ({
      ...promise,
      image:
        artwork[index] ??
        featuredPromiseAssets[index] ??
        featuredPromiseAssets[0],
      imageWidth: 1310,
      imageHeight: 1200,
    }));

    return (
      <section className="relative isolate -mt-px overflow-hidden bg-[#061F46] px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-28 sm:pt-28 md:pb-32 md:pt-32 lg:px-[2.5vw] lg:pt-28">
        <PromisesBackdrop />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(15,75,146,0.18),transparent_46%)]"
        />
        <div className="relative z-10 mx-auto max-w-[1540px]">
          <SectionHeading eyebrow="Our promises" title="What you get in writing" />
          <PromiseCardGrid
            idPrefix="build-product-promise"
            items={promiseCards}
          />
        </div>
      </section>
    );
  }

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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(15,75,146,0.3),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading eyebrow="Our promises" title="What you get in writing" />
        <div
          className={`mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 ${columns}`}
        >
          {content.promises.map((promise, index) => (
            <article className="bg-[#071A3A] p-7 sm:p-9" key={promise.title}>
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

function RouteIncluded({
  content,
  variant = "default",
}: {
  content: RoutePageContent;
  variant?: "default" | "team-coverage";
}) {
  const included = content.included!;

  if (variant === "team-coverage") {
    return <IncludedTeamSection included={included} />;
  }

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
              className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-6 transition hover:border-[#003f72]/70 hover:bg-[#0A2148]"
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

function RouteStakes({
  content,
  variant = "default",
}: {
  content: RoutePageContent;
  variant?: "default" | "comparison";
}) {
  if (variant === "comparison") {
    return <StakesComparisonSection stakes={content.stakes} />;
  }

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
