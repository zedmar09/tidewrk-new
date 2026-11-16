import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutUsPage } from "@/components/sections/about-us/about-us-page";

export const metadata: Metadata = {
  title: "About Us | Tidewrk",
  description:
    "Tidewrk embeds developers, operators, and support inside your business, backed by redundancy, built to stay, and yours to direct.",
};

export default function AboutUsRoute() {
  return (
    <>
      <Navbar />
      <AboutUsPage />
      <Footer />
    </>
  );
}
