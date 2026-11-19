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
      guideTitleAccent="We staff so that stays comfortably true."
      guideVariant="homepage"
      heroArtwork="/images/scale-your-engineering-team/scale-your-engineering-team-bg.svg"
      heroTitleAccent="your roadmap."
      includedVariant="team-coverage"
      planArtwork={[
        "/images/build-your-product/tidewrk_how_it_works_step_01.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_02.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_03.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_04.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_05.svg",
      ]}
      planVariant="carousel"
      problemArtwork="/images/scale-your-engineering-team/scale-your-engineering-team-sound-familiar.svg"
      problemArtworkAlt="A committed software roadmap showing delivery milestones and open engineering capacity"
      problemArtworkHeight={1024}
      problemArtworkWidth={1536}
      promisesArtwork={[
        "/images/promises/promise-workflow-icon.svg",
        "/images/promises/promise-user-approval-icon.svg",
        "/images/promises/promise-redundancy-icon.svg",
        "/images/promises/promise-ownership-icon.svg",
      ]}
      promisesVariant="homepage"
      stakesVariant="comparison"
    />
  );
}
