import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { scaleYourEngineeringTeam } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${scaleYourEngineeringTeam.menuLabel} | Tidewrk`,
  description: scaleYourEngineeringTeam.subline,
};

export default function ScaleYourEngineeringTeamPage() {
  return <RoutePage content={scaleYourEngineeringTeam} />;
}
