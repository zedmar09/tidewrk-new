import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { freeUpYourTime } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${freeUpYourTime.menuLabel} | Tidewrk`,
  description: freeUpYourTime.subline,
};

export default function FreeUpYourTimePage() {
  return (
    <RoutePage
      content={freeUpYourTime}
      guideTitleAccent="hiring someone full time."
      guideVariant="homepage"
      heroArtwork="/images/free-up-your-time/free-up-your-time-bg.svg"
      heroTitleAccent="your best hours."
      planArtwork={[
        "/images/build-your-product/tidewrk_how_it_works_step_01.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_02.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_03.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_04.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_05.svg",
      ]}
      planVariant="carousel"
      problemArtwork="/images/free-up-your-time/free-up-your-time-sounds-familiar.svg"
      problemArtworkAlt="An overloaded calendar and recurring task workflow ready to delegate"
      problemArtworkHeight={1086}
      problemArtworkWidth={1448}
      promisesArtwork={[
        "/images/promises/promise-workflow-icon.svg",
        "/images/promises/promise-user-approval-icon.svg",
      ]}
      promisesVariant="homepage"
      stakesVariant="comparison"
    />
  );
}
