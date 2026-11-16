import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { runYourBackOffice } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${runYourBackOffice.menuLabel} | Tidewrk`,
  description: runYourBackOffice.subline,
};

export default function RunYourBackOfficePage() {
  return <RoutePage content={runYourBackOffice} />;
}
