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
      problemArtwork="/images/build-your-product/sound-familiar.svg"
    />
  );
}
