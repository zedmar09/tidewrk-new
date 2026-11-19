import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";

import { CTA_TOP } from "@/components/layout/footer/cta-theme";
import { contactIntro, contactLocations } from "@/constants/contact";
import { ContactForm } from "./contact-form";

const CONTACT_BODY = "#091F70";

export function ContactPage() {
  return (
    <main
      className="relative overflow-hidden text-white"
      style={{ background: CONTACT_BODY }}
    >
      <section className="relative px-5 pb-14 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-[6vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(38,104,196,0.34), transparent 36%), radial-gradient(ellipse at 15% 72%, rgba(15,75,146,0.24), transparent 30%), linear-gradient(180deg, ${CONTACT_BODY} 0%, #0A286F 54%, ${CONTACT_BODY} 100%)`,
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

      <section className="relative px-5 pb-28 sm:px-8 sm:pb-36 lg:px-[6vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
          style={{
            background: `linear-gradient(180deg, rgba(9,31,112,0) 0%, rgba(5,39,105,0.72) 52%, ${CTA_TOP} 100%)`,
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
          <div className="rounded-[1.5rem] bg-[#0A2878]/68 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/44">
              Contact information
            </p>
            <p className="mt-4 text-base leading-8 text-white/60">
              Prefer to reach us directly? Our regional details are below.
            </p>

            <div className="mt-8 space-y-5">
              {contactLocations.map((location) => (
                <article
                  className="rounded-[1.2rem] border border-white/12 bg-[#0B2D80]/72 p-5"
                  key={location.region}
                >
                  <h3 className="text-2xl font-semibold text-white">
                    {location.region}
                  </h3>
                  <div className="mt-5 space-y-4">
                    <ContactLine icon={Phone}>{location.phone}</ContactLine>
                    <ContactLine icon={Mail}>{location.email}</ContactLine>
                    {location.addresses.map((address) => (
                      <ContactLine icon={MapPin} key={address}>
                        {address}
                      </ContactLine>
                    ))}
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
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.08] text-white">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </div>
  );
}
