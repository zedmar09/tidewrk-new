import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { freeUpYourTime } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${freeUpYourTime.menuLabel} | Tidewrk`,
  description: freeUpYourTime.subline,
};

export default function FreeUpYourTimePage() {
  return <RoutePage content={freeUpYourTime} />;
}
