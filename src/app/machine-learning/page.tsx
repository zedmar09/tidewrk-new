import {
  CapabilityPage,
  capabilityMetadata,
} from "@/components/sections/capability-page/capability-page";

const href = "/machine-learning";

export const metadata = capabilityMetadata(href);

export default function MachineLearningPage() {
  return <CapabilityPage href={href} />;
}
