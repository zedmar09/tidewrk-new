"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  Code2,
  Menu,
  Rocket,
  Workflow,
  X,
} from "lucide-react";
import {
  navigationItems,
  routes,
  whatWeDoItems,
} from "@/constants/navigation";
import tidewrkLogo from "@/assets/images/tidewrk-logo.svg";
import { CtaLink } from "@/components/ui/cta-link";

// One icon per route, matching the four "Where Tidewrk fits" cards.
const routeIcons: Record<string, LucideIcon> = {
  [routes.buildYourProduct]: Rocket,
  [routes.scaleYourEngineeringTeam]: Code2,
  [routes.runYourBackOffice]: Workflow,
  [routes.freeUpYourTime]: CalendarClock,
};

function RouteIcon({ href, size = "md" }: { href: string; size?: "sm" | "md" }) {
  const Icon = routeIcons[href] ?? ArrowRight;

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-[0.7rem] border border-[#C8CCD0]/20 bg-[#0E2A5A] text-[#E98973] ${
        size === "md" ? "size-10" : "size-9"
      }`}
    >
      <Icon className={size === "md" ? "size-5" : "size-[1.125rem]"} strokeWidth={1.75} />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!isMenuOpen && !isDropdownOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        isScrolled || isDropdownOpen
          ? "border-b border-[#C8CCD0]/15 bg-[#010F2A] shadow-[0_12px_40px_rgba(1,8,24,0.45)]"
          : "border-b border-[#C8CCD0]/15 bg-[#010F2A]"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Go to Tidewrk home page"
          onClick={handleLogoClick}
        >
          <Image
            alt="Tidewrk"
            className="h-8 w-auto brightness-0 invert"
            priority
            src={tidewrkLogo}
          />
        </Link>

        <div className="hidden items-center gap-10 text-[1.02rem] font-normal text-white/72 lg:flex">
          {navigationItems.map((item) =>
            item.children ? (
              <div
                className="relative"
                key={item.label}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  aria-controls="what-we-do-menu"
                  aria-expanded={isDropdownOpen}
                  className={`inline-flex h-16 items-center gap-1.5 transition hover:text-white ${
                    isDropdownOpen ? "text-white" : ""
                  }`}
                  onClick={(event) =>
                    // Mouse clicks land after hover already opened it, so keep it open;
                    // keyboard activation (detail === 0) toggles.
                    setIsDropdownOpen((open) => (event.detail === 0 ? !open : true))
                  }
                  type="button"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 transition ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-2 transition duration-200 ${
                    isDropdownOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                  id="what-we-do-menu"
                >
                  <div className="overflow-hidden rounded-[1rem] border border-[#C8CCD0]/30 bg-[#071A3A] shadow-[0_24px_60px_rgba(1,8,24,0.55)]">
                    <ul className="p-2">
                      {whatWeDoItems.map((link) => (
                        <li key={link.href}>
                          <Link
                            className="group flex items-start gap-3.5 rounded-[0.75rem] px-4 py-3 transition hover:bg-[#0E2A5A]"
                            href={link.href}
                            onClick={closeMenu}
                          >
                            <RouteIcon href={link.href} />
                            <span>
                              <span className="block text-base font-semibold text-white">
                                {link.label}
                              </span>
                              <span className="mt-0.5 block text-sm leading-6 text-[#C8CCD0]/80">
                                {link.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      className="flex items-center justify-between border-t border-[#C8CCD0]/20 px-6 py-4 text-sm font-semibold text-white/85 transition hover:bg-[#0E2A5A] hover:text-white"
                      href={routes.capabilities}
                      onClick={closeMenu}
                    >
                      See all capabilities
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="inline-flex h-16 items-center transition hover:text-white"
                href={item.href}
                key={item.label}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <CtaLink className="hidden lg:inline-flex" size="sm" />

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white shadow-none transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 top-16 z-40 bg-[#010F2A]/70 transition-opacity duration-200 lg:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed inset-x-0 top-16 z-50 flex max-h-[calc(100svh-4rem)] flex-col border-b border-[#C8CCD0]/15 bg-[#071A3A] shadow-[0_22px_70px_rgba(0,0,0,0.26)] transition duration-300 lg:hidden ${
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        id="mobile-navigation"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col">
            {navigationItems.map((item) =>
              item.children ? (
                <div className="border-b border-white/10 py-2" key={item.label}>
                  <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    {item.label}
                  </p>
                  {whatWeDoItems.map((link) => (
                    <Link
                      className="flex items-start gap-3 px-3 py-2.5 transition hover:bg-[#0E2A5A]"
                      href={link.href}
                      key={link.href}
                      onClick={closeMenu}
                    >
                      <RouteIcon href={link.href} size="sm" />
                      <span>
                        <span className="block text-base font-medium text-white">
                          {link.label}
                        </span>
                        <span className="block text-sm text-[#C8CCD0]/75">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white"
                    href={routes.capabilities}
                    onClick={closeMenu}
                  >
                    See all capabilities
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              ) : (
                <Link
                  className="block border-b border-white/10 px-3 py-4 text-base font-medium text-white transition hover:bg-white/10"
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4 sm:px-8">
          <CtaLink className="mx-auto flex w-full max-w-3xl" onClick={closeMenu} />
        </div>
      </div>
    </header>
  );
}
