import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { runYourBackOffice } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${runYourBackOffice.menuLabel} | Tidewrk`,
  description: runYourBackOffice.subline,
};

export default function RunYourBackOfficePage() {
  return (
    <RoutePage
      content={runYourBackOffice}
      guideTitleAccent="We build for continuity, not coverage."
      guideVariant="homepage"
      heroArtwork="/images/run-your-back-office/run-your-back-office-bg.svg"
      heroTitleAccent="your back office."
      includedVariant="team-coverage"
      planArtwork={[
        "/images/build-your-product/tidewrk_how_it_works_step_01.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_02.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_03.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_04.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_05.svg",
      ]}
      planVariant="carousel"
      promisesArtwork={[
        "/images/promises/promise-workflow-icon.svg",
        "/images/promises/promise-redundancy-icon.svg",
        "/images/promises/promise-user-approval-icon.svg",
      ]}
      promisesVariant="homepage"
      stakesVariant="comparison"
    />
  );
}
