import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactPage } from "@/components/sections/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Tidewrk",
  description:
    "Tidewrk embeds developers, operators, and support inside your business, backed by redundancy, built to stay, and yours to direct.",
};

export default function ContactRoute() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
