"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ⚠ PLACEHOLDER DATA. These quotes are not real and must never go live.
// Replace with real, client-approved testimonials, then turn on
// siteConfig.features.showTestimonials.
const testimonials = [
  {
    quote:
      "Working with this team was an absolute game-changer for our business. Their attention to detail, innovative ideas, and commitment to deadlines truly and wonderful impressed us.",
    name: "Sandra Sicharan",
    role: "Global Head of Engineering Platform at JP Morgan Chase",
    mark: "S",
  },
  {
    quote:
      "Working with this team was an absolute game-changer for our business. Their attention to detail, innovative ideas, and commitment to deadlines truly and wonderful impressed us.",
    name: "Jeremy Lucien",
    role: "Director of R&D Productivity, International",
    mark: "J",
  },
  {
    quote:
      "Working with this team was an absolute game-changer for our business. Their attention to detail, innovative ideas, and commitment to deadlines truly and wonderful impressed us.",
    name: "Oscar Mullin",
    role: "VP of Data, GenAI & Infrastructure, Mercado Libre",
    mark: "O",
  },
  {
    quote:
      "Working with this team was an absolute game-changer for our business. Their attention to detail, innovative ideas, and commitment to deadlines truly and wonderful impressed us.",
    name: "Jenna Reyes",
    role: "Head of Operations, Northstar Systems",
    mark: "J",
  },
];

export function ClientTestimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const scrollToTestimonial = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>("[data-testimonial-card]");
    if (!card) return;

    carousel.scrollTo({
      left: index * (card.offsetWidth + 20),
      behavior: "smooth",
    });
    setActiveTestimonial(index);
  };

  const scrollTestimonials = (direction: "previous" | "next") => {
    const nextIndex =
      direction === "next"
        ? (activeTestimonial + 1) % testimonials.length
        : (activeTestimonial - 1 + testimonials.length) % testimonials.length;

    scrollToTestimonial(nextIndex);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveTestimonial((current) => {
        const nextIndex = (current + 1) % testimonials.length;
        const carousel = carouselRef.current;
        const card = carousel?.querySelector<HTMLElement>(
          "[data-testimonial-card]",
        );

        if (carousel && card) {
          carousel.scrollTo({
            left: nextIndex * (card.offsetWidth + 20),
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      scrollToTestimonial(activeTestimonial);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTestimonial]);

  return (
        <div className="relative mx-auto mt-16 max-w-7xl">
          <div className="pointer-events-none absolute left-1/2 top-20 size-52 -translate-x-1/2 rounded-full bg-[#003f72]/14 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/54">
                <span className="tidewrk-glow-badge rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]">
                  Client stories
                </span>
                Proof from teams in motion
              </div>
              <h3 className="mt-5 max-w-4xl text-balance text-[1.9rem] font-semibold leading-[1.03] tracking-normal text-white sm:text-[2.55rem]">
                Hear From Our{" "}
                <span className="tidewrk-glow-text">Satisfied Clients</span>
              </h3>
              <p className="mt-4 max-w-3xl text-xl leading-9 text-white/66 sm:text-2xl sm:leading-10">
                Stories from teams who trust Tidewrk to keep people, systems,
                and execution moving with clarity.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                aria-label="Show previous testimonial"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/70 shadow-[0_12px_34px_rgba(0,0,0,0.22)] transition hover:border-[#003f72]/60 hover:bg-[#003f72]/18 hover:text-white hover:shadow-[0_0_22px_rgba(0,63,114,0.3)]"
                onClick={() => scrollTestimonials("previous")}
                type="button"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                aria-label="Show next testimonial"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/70 shadow-[0_12px_34px_rgba(0,0,0,0.22)] transition hover:border-[#003f72]/60 hover:bg-[#003f72]/18 hover:text-white hover:shadow-[0_0_22px_rgba(0,63,114,0.3)]"
                onClick={() => scrollTestimonials("next")}
                type="button"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="testimonial-carousel relative mt-8 flex snap-x gap-5 overflow-x-auto pb-4 sm:mt-10"
            ref={carouselRef}
            onScroll={(event) => {
              const cardWidth =
                event.currentTarget.querySelector<HTMLElement>(
                  "[data-testimonial-card]",
                )?.offsetWidth ?? 340;
              const nextActive = Math.round(
                event.currentTarget.scrollLeft / (cardWidth + 20),
              );
              setActiveTestimonial(
                Math.min(Math.max(nextActive, 0), testimonials.length - 1),
              );
            }}
          >
            {testimonials.map((testimonial, index) => (
              <article
                className={`relative min-h-52 w-[calc(100vw-2.5rem)] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[1rem] border bg-white/[0.045] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-500 sm:w-[24rem] sm:max-w-none sm:p-6 ${
                  index === activeTestimonial
                    ? "border-[#003f72]/72 shadow-[0_22px_80px_rgba(0,0,0,0.28),0_0_8px_rgba(255,255,255,0.18),0_0_38px_rgba(0,63,114,0.68),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-white/10"
                }`}
                data-testimonial-card
                key={testimonial.name}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#003f72] to-transparent" />
                {index === activeTestimonial && (
                  <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-[#003f72]/18 blur-2xl" />
                )}
                {index === activeTestimonial && (
                  <div className="pointer-events-none absolute -left-12 bottom-0 size-32 rounded-full bg-[#003f72]/18 blur-2xl" />
                )}
                <div className="mb-5 text-4xl font-semibold leading-none text-white/18">
                  “
                </div>
                <p className="relative text-sm leading-6 text-white/72 sm:text-[0.95rem] sm:leading-7">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="relative mt-8 flex items-center gap-4">
                  <div className="flex size-11 items-center justify-center rounded-full border border-[#003f72]/48 bg-[#003f72]/20 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,63,114,0.32)]">
                    {testimonial.mark}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 max-w-56 text-xs leading-5 text-white/56">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {index === activeTestimonial && (
                  <span className="absolute inset-x-14 bottom-0 h-0.5 rounded-full bg-white shadow-[0_0_7px_rgba(255,255,255,0.48),0_0_24px_rgba(0,63,114,1)]" />
                )}
              </article>
            ))}
          </div>

          <div className="mt-1 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                aria-label={`Show testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition ${
                  index === activeTestimonial
                    ? "w-10 bg-white shadow-[0_0_6px_rgba(255,255,255,0.5),0_0_22px_rgba(0,63,114,0.95)]"
                    : "w-4 bg-white/16 hover:bg-white/28"
                }`}
                key={testimonial.name}
                onClick={() => {
                  scrollToTestimonial(index);
                }}
                type="button"
              />
            ))}
          </div>
        </div>
  );
}
