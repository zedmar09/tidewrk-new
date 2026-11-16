import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PlaceholderPageHero } from "@/components/sections/shared/placeholder-page-hero";

export const metadata: Metadata = {
  title: "Privacy policy | Tidewrk",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PlaceholderPageHero
          eyebrow="Legal"
          title="Privacy policy"
        />
      </main>
      <Footer />
    </>
  );
}
