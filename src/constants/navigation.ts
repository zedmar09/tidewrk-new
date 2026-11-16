import type { NavigationItem } from "@/types";

export const routes = {
  buildYourProduct: "/build-your-product",
  scaleYourEngineeringTeam: "/scale-your-engineering-team",
  runYourBackOffice: "/run-your-back-office",
  freeUpYourTime: "/free-up-your-time",
  capabilities: "/capabilities",
  howWeWork: "/how-we-work",
  ourWork: "/our-work",
  about: "/about-us",
  careers: "/about-us#careers",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
} as const;

export const primaryCta = {
  label: "Start a conversation",
  href: routes.contact,
} as const;

// The four routes, in the same order as the homepage "Where Tidewrk fits" cards.
export const whatWeDoItems = [
  {
    label: "Build Your Product",
    description: "A full development team, idea to launch and beyond",
    href: routes.buildYourProduct,
  },
  {
    label: "Scale Your Engineering Team",
    description: "Engineers who work inside your process",
    href: routes.scaleYourEngineeringTeam,
  },
  {
    label: "Run Your Back Office",
    description: "An embedded team for the operations work that can’t drop",
    href: routes.runYourBackOffice,
  },
  {
    label: "Free Up Your Time",
    description: "A dedicated assistant for the work that doesn’t need you",
    href: routes.freeUpYourTime,
  },
] as const;

// TODO(client): stack tags for the other seven capabilities (Website Direction §5.6).
export const capabilityItems: ReadonlyArray<{
  label: string;
  href: string;
  title: string;
  description: string;
  tags?: readonly string[];
  // TODO(client): "What it is" (two sentences) and one relevant proof point per
  // capability (Website Direction §5.6). Sections stay hidden until filled.
  overview?: string;
  proof?: { title: string; body: string };
}> = [
  {
    label: "Web & desktop applications",
    href: "/web-desktop-application-development",
    title: "Web & Desktop Applications",
    description: "Business apps that cut manual work.",
    // Tech-stack tags carried over from the old solution card.
    tags: ["Next.js", "React", "TypeScript", "Laravel", "Python", "Express", "MongoDB", "MySQL", "PostgreSQL", "Electron", "VB.NET", "Java"],
  },
  {
    label: "Mobile applications",
    href: "/mobile-application-development",
    title: "Mobile Applications",
    description: "Mobile experiences for customers and field teams.",
  },
  {
    label: "QA testing & engineering",
    href: "/qa-testing-and-engineering",
    title: "QA Testing & Engineering",
    description: "Test strategy, automation, and quality checks before anything ships.",
  },
  {
    label: "Cloud services",
    href: "/cloud-services",
    title: "Cloud Services",
    description: "Planning, migration, and management across cloud platforms.",
  },
  {
    label: "Data engineering",
    href: "/data-engineering",
    title: "Data Engineering",
    description: "Pipelines that get data ready for reporting, automation, and analytics.",
  },
  {
    label: "Business intelligence",
    href: "/business-intelligence",
    title: "Business Intelligence",
    description: "A leadership view of performance, risk, and opportunity.",
  },
  {
    label: "Data science",
    href: "/data-science",
    title: "Data Science",
    description: "Patterns for planning and forecasting.",
  },
  {
    label: "Machine learning",
    href: "/machine-learning",
    title: "Machine Learning",
    description: "Models for prediction and personalization, with a person reviewing what they produce.",
  },
];

// "Our Work" stays out of the menu until two client stories are approved.
export const showOurWork = false;

export const navigationItems: NavigationItem[] = [
  {
    label: "What We Do",
    href: routes.capabilities,
    children: whatWeDoItems.map(({ label, href }) => ({ label, href })),
  },
  { label: "How We Work", href: routes.howWeWork },
  ...(showOurWork ? [{ label: "Our Work", href: routes.ourWork }] : []),
  { label: "About", href: routes.about },
];
