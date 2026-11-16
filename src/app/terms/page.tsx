import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PlaceholderPageHero } from "@/components/sections/shared/placeholder-page-hero";

export const metadata: Metadata = {
  title: "Terms of service | Tidewrk",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PlaceholderPageHero
          eyebrow="Legal"
          title="Terms of service"
        />
      </main>
      <Footer />
    </>
  );
}
