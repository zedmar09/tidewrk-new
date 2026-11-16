import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/data-engineering";

export const metadata = capabilityMetadata(href);

export default function DataEngineeringPage() {
  return <CapabilityPage href={href} />;
}
