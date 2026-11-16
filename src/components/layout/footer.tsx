import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

import tidewrkLogo from "@/assets/images/tidewrk-logo.svg";
import { CtaLink } from "@/components/ui/cta-link";
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
    links: [...capabilityItems],
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
      { label: "Privacy policy", href: routes.privacy },
      { label: "Terms of service", href: routes.terms },
      { label: "Cookie settings", href: routes.cookies },
    ],
  },
];

// Social icons are left out until each one has a real account URL behind it.

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#02050a] px-5 pb-8 pt-20 text-white sm:px-8 md:pt-28 lg:px-[6vw]"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_34%_58%,rgba(0,63,114,0.46),transparent_38%),radial-gradient(ellipse_at_68%_56%,rgba(0,63,114,0.22),transparent_30%),radial-gradient(ellipse_at_58%_96%,rgba(0,63,114,0.34),transparent_30%),linear-gradient(180deg,#02050a_0%,#02050a_40%,#02050a_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#02050a] via-[#02050a]/88 to-transparent"
      />

      <div className="relative mx-auto max-w-[1800px] rounded-[1.1rem] bg-black/16 px-5 py-12 shadow-[0_34px_120px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-3xl py-8 text-center sm:py-10 lg:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
            The tide behind you.
          </p>
          <h2 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.06] tracking-normal text-white sm:text-5xl lg:text-[3.7rem]">
            Ready for your next move?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/64 sm:text-xl">
            More to build and run than you can hire for? Tell us what
            you&apos;re trying to deliver.
          </p>
          <CtaLink className="mt-8" size="lg" />
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 xl:grid-cols-[minmax(16rem,1.2fr)_repeat(4,minmax(0,1fr))]">
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
            <p className="mt-2 text-sm leading-6 text-white/54">
              Developers, operators, and support embedded in your business.
              Built in the Philippines, working inside your team.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav aria-label={column.title} key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/44">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/72">
                {column.links.map((link) => (
                  <li key={link.href}>
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

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/42">
            © 2026 Tidewrk. All rights reserved.
          </p>
          <Link
            aria-label="Back to top"
            className="flex size-11 items-center justify-center rounded-full border border-white/14 bg-white text-[#003f72] transition hover:-translate-y-1 hover:bg-white/88"
            href="#top"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
