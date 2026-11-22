import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

import tidewrkLogo from "@/assets/images/tidewrk-logo.svg";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionPill } from "@/components/ui/section-pill";

import { FOOTER_BG } from "./footer/cta-theme";
import {
  capabilityItems,
  routes,
  showOurWork,
  whatWeDoItems,
} from "@/constants/navigation";

const footerColumns = [
  {
    title: "What we do",
    links: whatWeDoItems.map(({ label, href }) => ({
      label: label.charAt(0) + label.slice(1).toLowerCase(),
      href,
    })),
  },
  {
    title: "Capabilities",
    links: capabilityItems.map(({ label }) => ({
      label,
      href: routes.capabilities,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "How we work", href: routes.howWeWork },
      ...(showOurWork ? [{ label: "Our work", href: routes.ourWork }] : []),
      { label: "About", href: routes.about },
      { label: "Careers", href: routes.careers },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Cookie settings", href: "#" },
    ],
  },
];

// Social icons are left out until each one has a real account URL behind it.

// The closing CTA (Website Direction §4.9) sits over a sunrise: the page began
// at night in the hero and ends at sunrise. The artwork's final colour is the
// footer background, so the CTA and footer read as one continuous scene.
export function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" id="contact" style={{ background: FOOTER_BG }}>
      {/* One scene: the CTA text sits in the sky, the sun rises below it. */}
      <div className="relative h-[clamp(46rem,75vw,68rem)]">
        <Image
          alt=""
          className="object-cover object-center"
          fill
          sizes="100vw"
          src="/images/footer/cta-bg.svg"
          unoptimized
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-[linear-gradient(180deg,#022C69_0%,rgba(2,44,105,0)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-[linear-gradient(180deg,rgba(0,19,58,0)_0%,#00133A_100%)]"
        />
        <div className="absolute inset-x-0 top-0 z-20 px-5 pt-[clamp(3.5rem,5.5vw,5.5rem)] text-center sm:px-8">
          <SectionPill>The tide behind you.</SectionPill>
          <h2 className="mx-auto mt-5 max-w-[16ch] text-balance text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.01em] md:max-w-none">
            Ready for your <span className="text-[#E98973]">next move?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-[#E4E8EE]">
            More to build and run than you can hire for? Tell us what
            you&apos;re trying to deliver.
          </p>
          <CtaLink className="mt-7" size="lg" />
        </div>
      </div>

      <div className="relative -mt-px px-5 pb-8 pt-2 sm:px-8 lg:px-[6vw]">
        <div className="mx-auto grid max-w-[1800px] gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[minmax(16rem,1.2fr)_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm sm:col-span-2 lg:col-span-4 xl:col-span-1">
            <Link
              aria-label="Go to Tidewrk home page"
              className="inline-flex"
              href="/"
            >
              <Image
                alt="Tidewrk"
                className="h-auto w-36 brightness-0 invert sm:w-40"
                priority={false}
                src={tidewrkLogo}
              />
            </Link>
            <p className="mt-5 text-base font-semibold text-white">
              The tide behind you.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#C8CCD0]/80">
              Developers, operators, and support embedded in your business.
              Built in the Philippines, working inside your team.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav aria-label={column.title} key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8CCD0]/70">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      className="transition hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-[1800px] flex-col-reverse items-center justify-between gap-6 border-t border-[#C8CCD0]/15 pt-6 sm:flex-row">
          <p className="text-xs text-[#C8CCD0]/70">
            © 2026 Tidewrk. All rights reserved.
          </p>
          <Link
            aria-label="Back to top"
            className="flex size-11 items-center justify-center rounded-full border border-white/14 bg-white text-[#123362] transition hover:-translate-y-1 hover:bg-[#C8CCD0]"
            href="#top"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
