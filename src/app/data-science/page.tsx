import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/data-science";

export const metadata = capabilityMetadata(href);

export default function DataSciencePage() {
  return <CapabilityPage href={href} />;
}
