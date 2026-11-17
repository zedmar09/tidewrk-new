import type { ReactNode } from "react";

import { SectionPill } from "@/components/ui/section-pill";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-5xl text-center" : "max-w-4xl", className)}>
      <SectionPill>{eyebrow}</SectionPill>
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
