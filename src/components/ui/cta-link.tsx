import Link from "next/link";
import type { ComponentProps } from "react";

import { primaryCta } from "@/constants/navigation";
import { cn } from "@/lib/utils";

// The one sitewide button: "Start a conversation".
// Brand palette: Navy #123362 on white, Silver Mist #C8CCD0 on hover.
export const ctaButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold text-[#123362] transition duration-300 hover:bg-[#C8CCD0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

type CtaLinkProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  size?: keyof typeof sizes;
};

export function CtaLink({ size = "md", className, ...props }: CtaLinkProps) {
  return (
    <Link
      className={cn(ctaButtonClass, sizes[size], className)}
      href={primaryCta.href}
      {...props}
    >
      {primaryCta.label}
    </Link>
  );
}
