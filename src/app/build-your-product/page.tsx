import type { Metadata } from "next";

import { RoutePage } from "@/components/sections/route-page/route-page";
import { buildYourProduct } from "@/constants/route-pages";

export const metadata: Metadata = {
  title: `${buildYourProduct.menuLabel} | Tidewrk`,
  description: buildYourProduct.subline,
};

export default function BuildYourProductPage() {
  return (
    <RoutePage
      content={buildYourProduct}
      guideTitleAccent="Building it is what we do for a living."
      guideVariant="homepage"
      heroArtwork="/images/build-your-product/build-your-product-bg.svg"
      heroTitleAccent="your big idea."
      includedVariant="team-coverage"
      planArtwork={[
        "/images/build-your-product/tidewrk_how_it_works_step_01.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_02.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_03.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_04.svg",
        "/images/build-your-product/tidewrk_how_it_works_step_05.svg",
      ]}
      planVariant="carousel"
      problemArtwork="/images/build-your-product/sound-familiar.svg"
      problemArtworkHeight={1024}
      problemArtworkWidth={1536}
      promisesVariant="homepage"
      stakesVariant="comparison"
    />
  );
}
