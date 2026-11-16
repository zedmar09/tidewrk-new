import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { PageHero } from "@/components/sections/route-page/route-page";
import { capabilityItems, whatWeDoItems } from "@/constants/navigation";
import {
  buildYourProduct,
  freeUpYourTime,
  runYourBackOffice,
  scaleYourEngineeringTeam,
} from "@/constants/route-pages";

const routePages = [
  buildYourProduct,
  scaleYourEngineeringTeam,
  runYourBackOffice,
  freeUpYourTime,
];

const sectionClass =
  "relative bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]";

function getCapability(href: string) {
  return capabilityItems.find((item) => item.href === href);
}

// A capability comes through every route page whose "What's included" lists it.
function getRoutesFor(href: string) {
  const slugs = routePages
    .filter((page) => page.included?.capabilities.some((item) => item.href === href))
    .map((page) => page.slug);

  return whatWeDoItems.filter((route) => slugs.includes(route.href));
}

export function capabilityMetadata(href: string): Metadata {
  const capability = getCapability(href);

  return capability
    ? { title: `${capability.title} | Tidewrk`, description: capability.description }
    : {};
}

// Capability template (Website Direction §5.6): what it is · which routes it
// comes through · stack tags · one proof point · closing CTA (footer).
// These pages inform; the four route pages sell. No AI language beyond what's true.
export function CapabilityPage({ href }: { href: string }) {
  const capability = getCapability(href);
  if (!capability) notFound();

  const routes = getRoutesFor(href);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Capability"
          subline={capability.description}
          title={capability.title}
        />

        {capability.overview && (
          <section className={sectionClass}>
            <div className="mx-auto max-w-4xl">
              <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
                What it is
              </span>
              <p className="mt-7 text-pretty text-2xl leading-10 text-white/80">
                {capability.overview}
              </p>
            </div>
          </section>
        )}

        <section className={sectionClass}>
          <div className="mx-auto max-w-[1300px]">
            <SectionHeading
              eyebrow="How it comes to you"
              title={
                routes.length === 1
                  ? "Through one of the four ways we work"
                  : "Through the ways we work"
              }
            />
            <div
              className={`mx-auto mt-14 grid gap-4 ${
                routes.length > 1 ? "md:grid-cols-2" : "max-w-xl"
              }`}
            >
              {routes.map((route) => (
                <Link
                  className="group rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 transition hover:border-[#003f72]/70 hover:bg-white/[0.07] sm:p-7"
                  href={route.href}
                  key={route.href}
                >
                  <span className="flex items-center justify-between gap-3 text-xl font-semibold">
                    {route.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                    />
                  </span>
                  <span className="mt-2 block text-base leading-7 text-white/60">
                    {route.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {capability.tags && (
          <section className={sectionClass}>
            <div className="mx-auto max-w-4xl text-center">
              <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
                The stack
              </span>
              <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {capability.tags.map((tag) => (
                  <li
                    className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/80"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {capability.proof && (
          <section className={sectionClass}>
            <div className="mx-auto max-w-3xl rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-7 sm:p-9">
              <h2 className="text-2xl font-semibold leading-tight">
                {capability.proof.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/64">
                {capability.proof.body}
              </p>
            </div>
          </section>
        )}

        <section className={`${sectionClass} pt-0 md:pt-0`}>
          <div className="mx-auto max-w-[1500px] text-center">
            <Link
              className="inline-flex items-center gap-2 text-base font-semibold text-white/80 transition hover:text-white"
              href="/capabilities"
            >
              See all capabilities
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
