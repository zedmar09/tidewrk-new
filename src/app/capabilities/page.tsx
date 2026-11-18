import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarClock,
  Code2,
  Rocket,
  Workflow,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import { IncludedTeamSection } from "@/components/sections/route-page/included-team-section";
import { PageHero } from "@/components/sections/route-page/route-page";
import {
  capabilityItems,
  routes,
  whatWeDoItems,
} from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Capabilities | Tidewrk",
  description:
    "Everything Tidewrk teams build and run, delivered through four ways we work.",
};

const routeIcons: Record<string, LucideIcon> = {
  [routes.buildYourProduct]: Rocket,
  [routes.scaleYourEngineeringTeam]: Code2,
  [routes.runYourBackOffice]: Workflow,
  [routes.freeUpYourTime]: CalendarClock,
};

// These pages inform; the four route pages sell. No AI language beyond what's true per capability.
export default function CapabilitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What We Do"
          heroArtwork="/images/capabilities/capabilities-bg.svg"
          heroLayout="center"
          subline="Everything our teams build and run. Each one comes to you through one of four ways we work: building your product, scaling your engineering team, running your back office, or freeing up your time."
          title="Capabilities"
        />

        <IncludedTeamSection
          included={{
            title: "Capabilities",
            capabilities: capabilityItems,
          }}
          linkCapabilities
          topColor="#022874"
        />

        <section className="relative isolate -mt-px overflow-hidden bg-[#03224F] px-5 pb-24 pt-32 text-white sm:px-8 sm:pb-28 sm:pt-36 md:pb-32 md:pt-40 lg:px-[6vw]">
          <SoftWaveJoin
            body="#03224F"
            id="capabilities-routes-join"
            top="#061F46"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
            style={{
              background: `linear-gradient(180deg, rgba(3,34,79,0) 0%, ${CTA_TOP} 100%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(15,75,146,0.2),transparent_55%)]"
          />

          <div className="relative z-10 mx-auto max-w-[1500px]">
            <SectionHeading
              eyebrow="Four ways we work"
              title="Every capability comes through one of these"
            />
            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whatWeDoItems.map((route) => {
                const RouteIcon = routeIcons[route.href] ?? ArrowRight;

                return (
                  <Link
                    className="group flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-[#071A3A]/80 p-6 transition hover:border-[#8cc9ff]/55 hover:bg-[#0A2148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cc9ff]/80"
                    href={route.href}
                    key={route.href}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-[0.8rem] border border-[#8cc9ff]/24 bg-[#0E2A5A] text-[#ff8a70]"
                    >
                      <RouteIcon className="size-5" strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3 text-lg font-semibold">
                        {route.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
                        />
                      </span>
                      <span className="mt-2 block text-base leading-7 text-white/60">
                        {route.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
