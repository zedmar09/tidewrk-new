import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { contactIntro, contactLocations } from "@/constants/contact";
import { ContactForm } from "./contact-form";

export function ContactPage() {
  return (
    <main
      className="relative overflow-hidden text-white"
      style={{ background: CTA_TOP }}
    >
      <section className="relative px-5 pb-14 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-[6vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(15,75,146,0.38), transparent 34%), radial-gradient(ellipse at 15% 70%, rgba(15,75,146,0.22), transparent 28%), linear-gradient(180deg, ${CTA_TOP} 0%, #082854 52%, ${CTA_TOP} 100%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background: `linear-gradient(0deg, ${CTA_TOP} 0%, rgba(2,44,105,0.82) 55%, transparent 100%)`,
          }}
        />

        <div className="relative mx-auto max-w-[1500px] text-center">
          <h1 className="mx-auto max-w-5xl text-balance text-[3.2rem] font-semibold leading-[0.98] tracking-normal text-white sm:text-7xl lg:text-[6rem]">
            Start a <span className="text-[#E98973]">conversation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-pretty text-lg leading-8 text-white/66 sm:text-2xl sm:leading-10">
            {contactIntro}
          </p>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-8 sm:pb-28 lg:px-[6vw]">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#071A3A]/80 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/44">
              Contact information
            </p>
            <p className="mt-4 text-base leading-8 text-white/60">
              Prefer to reach us directly? Our regional details are below.
            </p>

            <div className="mt-8 space-y-5">
              {contactLocations.map((location) => (
                <article
                  className="rounded-[1.2rem] border border-white/10 bg-[#071A3A] p-5"
                  key={location.region}
                >
                  <h3 className="text-2xl font-semibold text-white">
                    {location.region}
                  </h3>
                  <div className="mt-5 space-y-4">
                    <ContactLine icon={Phone}>{location.phone}</ContactLine>
                    <ContactLine icon={Mail}>{location.email}</ContactLine>
                    <ContactLine icon={MapPin}>
                      <span className="space-y-2">
                        {location.addresses.map((address) => (
                          <span className="block" key={address}>
                            {address}
                          </span>
                        ))}
                      </span>
                    </ContactLine>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}

function ContactLine({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon: LucideIcon;
}) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-white/64 sm:text-base sm:leading-7">
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#003f72]/50 bg-[#003f72]/18 text-white">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </div>
  );
}
