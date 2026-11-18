import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { scaleYourEngineeringTeam } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${scaleYourEngineeringTeam.menuLabel} | Tidewrk`,
  description: scaleYourEngineeringTeam.subline,
};

export default function ScaleYourEngineeringTeamPage() {
  return (
    <RoutePage
      content={scaleYourEngineeringTeam}
      heroArtwork="/images/scale-your-engineering-team/scale-your-engineering-team-bg.svg"
      heroTitleAccent="your roadmap."
      includedVariant="team-coverage"
      stakesVariant="comparison"
    />
  );
}
