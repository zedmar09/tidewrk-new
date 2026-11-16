import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/mobile-application-development";

export const metadata = capabilityMetadata(href);

export default function MobileApplicationDevelopmentPage() {
  return <CapabilityPage href={href} />;
}
