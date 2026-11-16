import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/business-intelligence";

export const metadata = capabilityMetadata(href);

export default function BusinessIntelligencePage() {
  return <CapabilityPage href={href} />;
}
