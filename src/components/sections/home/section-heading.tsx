import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  eyebrowTone?: "glow" | "quiet";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  eyebrowTone = "glow",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-5xl text-center" : "max-w-4xl", className)}>
      <span
        className={cn(
          "inline-flex rounded-full text-xs font-semibold uppercase",
          eyebrowTone === "glow"
            ? "tidewrk-glow-badge px-3 py-1.5 tracking-[0.1em]"
            : "border border-[#9fb2ca]/55 bg-[#061a37]/70 px-7 py-2 tracking-[0.22em] text-white shadow-[0_10px_32px_rgba(0,9,29,0.24)] sm:text-sm",
        )}
      >
        {eyebrow}
      </span>
      <h2 className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-[4.2rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-4xl text-pretty text-xl leading-9 text-white/66 sm:text-2xl sm:leading-10",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
