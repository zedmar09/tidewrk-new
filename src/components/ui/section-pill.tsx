import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function SectionPill({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[#9fb2ca]/55 bg-[#061a37]/70 px-7 py-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_32px_rgba(0,9,29,0.24)] sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
