import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/qa-testing-and-engineering";

export const metadata = capabilityMetadata(href);

export default function QATestingAndEngineeringPage() {
  return <CapabilityPage href={href} />;
}
