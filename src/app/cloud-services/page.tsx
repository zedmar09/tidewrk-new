import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/cloud-services";

export const metadata = capabilityMetadata(href);

export default function CloudServicesPage() {
  return <CapabilityPage href={href} />;
}
