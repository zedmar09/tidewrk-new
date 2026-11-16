import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PlaceholderPageHero } from "@/components/sections/shared/placeholder-page-hero";

export const metadata: Metadata = {
  title: "Cookie settings | Tidewrk",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PlaceholderPageHero
          eyebrow="Legal"
          title="Cookie settings"
        />
      </main>
      <Footer />
    </>
  );
}
