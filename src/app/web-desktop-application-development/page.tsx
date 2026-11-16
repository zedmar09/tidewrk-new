import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/web-desktop-application-development";

export const metadata = capabilityMetadata(href);

export default function WebDesktopApplicationDevelopmentPage() {
  return <CapabilityPage href={href} />;
}
