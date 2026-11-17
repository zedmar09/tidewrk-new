import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { PageHero } from "@/components/sections/route-page/route-page";
import { capabilityItems, whatWeDoItems } from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Capabilities | Tidewrk",
  description:
    "Everything Tidewrk teams build and run, delivered through four ways we work.",
};

const sectionClass =
  "relative bg-[#061F46] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]";

// These pages inform; the four route pages sell. No AI language beyond what's true per capability.
export default function CapabilitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What We Do"
          subline="Everything our teams build and run. Each one comes to you through one of four ways we work: building your product, scaling your engineering team, running your back office, or freeing up your time."
          title="Capabilities"
        />

        <section className={sectionClass}>
          <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {capabilityItems.map((capability) => (
              <Link
                className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-6 transition hover:border-[#0F4B92]/70 hover:bg-[#0A2148] sm:p-7"
                href={capability.href}
                key={capability.href}
              >
                <span className="flex items-start justify-between gap-3 text-xl font-semibold leading-tight">
                  {capability.title}
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                  />
                </span>
                <span className="mt-3 text-base leading-7 text-white/64">
                  {capability.description}
                </span>
                {capability.tags && (
                  <span className="mt-5 flex flex-wrap gap-1.5">
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
        </section>

        <section className={sectionClass}>
          <div className="mx-auto max-w-[1500px]">
            <SectionHeading
              eyebrow="Four ways we work"
              title="Every capability comes through one of these"
            />
            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whatWeDoItems.map((route) => (
                <Link
                  className="group rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-6 transition hover:border-[#0F4B92]/70 hover:bg-[#0A2148]"
                  href={route.href}
                  key={route.href}
                >
                  <span className="flex items-center justify-between gap-3 text-lg font-semibold">
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
      </main>
      <Footer />
    </>
  );
}
