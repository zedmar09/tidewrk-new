import { KeyRound, Shield, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const chips = [
  { icon: Users, label: "Embedded in your team" },
  { icon: Shield, label: "Backup on every critical role" },
  { icon: KeyRound, label: "You own the code" },
];

// The three proof points under the hero, as small navy pills.
export function HeroChips({ className }: { className?: string }) {
  return (
    // Phones: one row that slides sideways. Larger screens: centred, wrapping.
    <ul
      className={cn(
        "flex snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 py-1 [scrollbar-width:none] sm:gap-4 md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {chips.map(({ icon: Icon, label }, i) => (
        <li
          className="hero-chip flex shrink-0 snap-start items-center whitespace-nowrap gap-2.5 rounded-full border border-[#C8CCD0]/30 bg-[#071A3A]/80 px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,8,30,0.35)] backdrop-blur-sm sm:px-5 sm:text-base"
          key={label}
          style={{ animationDelay: `${1.6 + i * 0.15}s` }}
        >
          <Icon aria-hidden="true" className="size-5 shrink-0 text-[#E98973]" strokeWidth={1.75} />
          {label}
        </li>
      ))}
    </ul>
  );
}
