import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import {
  AiWorkflowSection,
  GuideSection,
  HeroSection,
  PlanSection,
  ProblemSection,
  PromisesSection,
  ProofSection,
  WhereTidewrkFitsSection,
} from "@/components/sections/home";

// StoryBrand order (Website Direction §4). The closing CTA (§4.9) lives in the footer.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhereTidewrkFitsSection />
        <GuideSection />
        <PlanSection />
        <PromisesSection />
        <AiWorkflowSection />
        <ProofSection />
      </main>
      <Footer />
    </>
  );
}
