// Content for the four route pages, from Website Direction §5.2–5.5 and the
// matching sub-BrandScripts in Brand Positioning & StoryBrand Part 3.
//
// Rules this copy follows: one button ("Start a conversation"), never promise a
// deliverable, never lead with price, the villain is transactional (never
// offshore), and no client names until each client gives permission.

import { capabilityItems, routes } from "@/constants/navigation";

type Point = { title: string; body: string };

export type RoutePageContent = {
  slug: string;
  menuLabel: string;
  headline: string;
  subline: string;
  problem: string;
  problemDisplay?: {
    title: string;
    accent: string;
    body: string;
  };
  empathy: string;
  proof: Point[];
  plan: Point[];
  promises: Point[];
  included?: {
    title: string;
    description?: string;
    capabilities: typeof capabilityItems;
    roleTags?: string[];
  };
  stakes: { without: string[]; with: string[] };
  nextStep?: { text: string; linkLabel: string; href: string };
};

const pickCapabilities = (...hrefs: string[]) =>
  capabilityItems.filter((item) => hrefs.includes(item.href));

const ownership: Point = {
  title: "You own what we build.",
  body: "The code, the systems, the documentation. Always. Any exception is agreed and documented before work begins.",
};

const noSinglePointOfFailure: Point = {
  title: "No single point of failure.",
  body: "Critical roles have depth behind them by design. When someone moves on, it’s a handoff, not a restart.",
};

const yourTools: Point = {
  title: "We work in your tools.",
  body: "Jira, Slack, Notion, Teams, whatever you already run. The adjustment is ours to make.",
};

const referrals: Point = {
  title: "Clients send us clients.",
  body: "Most of our growth has come from someone vouching for us.",
};

export const buildYourProduct: RoutePageContent = {
  slug: routes.buildYourProduct,
  menuLabel: "Build Your Product",
  headline: "The tide behind your big idea.",
  subline:
    "A full development team that builds your product from idea to launch, stays to support it, and hands you the code.",
  problem:
    "You can see the product. You can’t build it. And handing your vision, and your investors’ money, to the wrong team is the one mistake you can’t afford.",
  problemDisplay: {
    title: "You can see the product.",
    accent: "You can’t build it.",
    body: "And handing your vision, and your investors’ money, to the wrong team is the one mistake you can’t afford.",
  },
  empathy:
    "You’re the visionary. Stick with that. Building it is what we do for a living.",
  proof: [
    {
      title: "We fix what others abandon.",
      body: "A previous vendor walked off a client project mid-stream. We took it over, stabilized it, and the engagement has grown since.",
    },
    {
      title: "We hold up under pressure.",
      body: "We built a comprehensive platform end to end for a CEO who is famously hard to satisfy.",
    },
    {
      title: "We stand up to technical scrutiny.",
      body: "One client sent six of their own programmers to evaluate our team before they engaged.",
    },
  ],
  // Step 2 describes a way of working, never a free deliverable.
  plan: [
    {
      title: "Talk it through.",
      body: "Get on a call and tell us what you see. No decks, no homework.",
    },
    {
      title: "We show you we heard you.",
      body: "We work visually, with your idea, your workflows, and real scenarios on the table, so you confirm your own vision before code gets written.",
    },
    {
      title: "Your team, assembled.",
      body: "Scoped and staffed with redundancy on every critical role, with a project plan and real milestones.",
    },
    {
      title: "Build, review, launch.",
      body: "Sprints and user acceptance testing on a regular cadence, tracked in the open.",
    },
    {
      title: "And we stay.",
      body: "Built knowing we’ll support it: maintenance, and whatever comes next.",
    },
  ],
  promises: [
    { ...ownership, title: "You own your code, always." },
    noSinglePointOfFailure,
    yourTools,
  ],
  included: {
    title: "What your team covers",
    description: "One team, every role a product needs.",
    capabilities: pickCapabilities(
      "/web-desktop-application-development",
      "/mobile-application-development",
      "/qa-testing-and-engineering",
      "/cloud-services",
    ),
    roleTags: [
      "Front-End",
      "Back-End",
      "DevOps",
      "Business Analyst",
      "QA",
      "Project Manager",
    ],
  },
  stakes: {
    without: [
      "Runway spent on a team that couldn’t deliver.",
      "The market window closes while the product sits half-built.",
      "A vendor walks and takes the progress, or the code, with them.",
      "Back to zero, with less money and less time, explaining it to the board.",
    ],
    with: [
      "The product is live.",
      "Your funding went further than an internal hire would have.",
      "You’re back on vision, market, and customers.",
      "Your technical partner behaves like they have skin in the game.",
    ],
  },
};

// Don't say "we become the team" here; to a CTO it sounds like a takeover. Don't lead with price.
// TODO(client): near-zero attrition proof needs a retention number; ramp time to first commit is missing.
export const scaleYourEngineeringTeam: RoutePageContent = {
  slug: routes.scaleYourEngineeringTeam,
  menuLabel: "Scale Your Engineering Team",
  headline: "The tide behind your roadmap.",
  subline:
    "Engineers who work inside your repo, your standards, and your ceremonies. You interview and approve every one, and critical roles have backup behind them.",
  problem:
    "The roadmap is committed and the team is short. You own the date no matter who writes the code, so the last thing you need is help that slows you down.",
  empathy:
    "You’re accountable for the roadmap regardless of who writes the code. We staff so that stays comfortably true.",
  proof: [
    {
      title: "We work inside your direction.",
      body: "Our engineers already work inside clients’ repos, standards, and ceremonies: an extension of the team, just not in the same building.",
    },
    {
      title: "We stand up to technical scrutiny.",
      body: "One client sent six of their own programmers to evaluate our team before they engaged.",
    },
    {
      title: "There’s depth on the bench.",
      body: "100+ team members and growing, so critical skills have backup behind them.",
    },
  ],
  plan: [
    { title: "Tell us the gap.", body: "Roles, stack, seniority, timeline." },
    {
      title: "You interview. You choose.",
      body: "We shortlist against your bar. The hiring decision stays yours.",
    },
    {
      title: "Ramp inside your process.",
      body: "Your repo, your standards, your stand-ups, your definition of done.",
    },
    {
      title: "Backed up.",
      body: "Redundancy behind critical skills, so continuity never rests on one engineer.",
    },
    {
      title: "Flex with the roadmap.",
      body: "Scale up or down as priorities move.",
    },
  ],
  promises: [
    {
      title: "Your process, not ours.",
      body: "Your repo, your standards, your ceremonies. The adjustment is ours to make.",
    },
    {
      title: "You approve every person.",
      body: "You interview and approve every engineer before they join your team.",
    },
    noSinglePointOfFailure,
    ownership,
  ],
  included: {
    title: "Capabilities",
    description: "Every capability our engineers bring, with the stack behind it.",
    capabilities: capabilityItems,
  },
  stakes: {
    without: [
      "The roadmap slips, and you own the slip.",
      "Your team burns out covering the gap.",
      "Or the help becomes the problem: velocity drops and quality wobbles.",
    ],
    with: [
      "The roadmap ships to plan.",
      "The team scaled without a hiring cycle.",
      "Your in-house engineers stay on the hard, differentiating problems.",
    ],
  },
};

// Keep this about the business, not one person, so it doesn't blur with Free Up Your Time.
// No audit or staffing plan promised.
// TODO(client): this page has no number yet (retention, cost vs. local hire, volume, or turnaround).
export const runYourBackOffice: RoutePageContent = {
  slug: routes.runYourBackOffice,
  menuLabel: "Run Your Back Office",
  headline: "The tide behind your back office.",
  subline:
    "An embedded operations team for the process work that keeps your business running, trained on how you do it and backed up so nothing drops.",
  problem:
    "The work that keeps the business running rests on one or two people. If either of them is out, it stops.",
  empathy:
    "This work only counts if it’s still handled six months from now. We build for continuity, not coverage.",
  proof: [
    {
      title: "Redundancy, designed in.",
      body: "Critical roles get deliberate backup, so nothing drops when someone is out.",
    },
    {
      title: "We run functions, not just tasks.",
      body: "We already run embedded back-office operations for clients: the process captured, people trained on it, redundancy behind the critical ones.",
    },
    referrals,
  ],
  plan: [
    {
      title: "Walk the work.",
      body: "What tasks, what volume, and what genuinely can’t drop.",
    },
    {
      title: "Capture the process.",
      body: "How you do it gets written down, often for the first time.",
    },
    {
      title: "Match and train.",
      body: "People with the organizational skills the work needs, trained on your process.",
    },
    { title: "Embed.", body: "Your tools, your hours, your team’s rhythm." },
    {
      title: "Back it up, then expand.",
      body: "Redundancy on anything critical. Scope widens as trust builds.",
    },
  ],
  promises: [
    yourTools,
    {
      title: "Redundancy on critical roles.",
      body: "Anything the business can’t drop has a trained backup behind it.",
    },
    {
      title: "Our people are employees with careers.",
      body: "Not gig labor. People who stay, grow, and keep your process in their heads.",
    },
  ],
  included: {
    title: "Where reporting is part of the work",
    capabilities: pickCapabilities("/business-intelligence", "/data-engineering"),
  },
  stakes: {
    without: [
      "Growth capped by admin drag.",
      "The one person who knows the process leaves and takes it with them.",
      "Client requests slip, and the reputation cost lands on you.",
    ],
    with: [
      "The back office runs without you in it.",
      "Capacity scales with volume, not headcount.",
      "Nothing drops when someone is out.",
    ],
  },
};

// Often a first engagement: end with a soft path to Run Your Back Office.
// TODO(client): confirm the VA backup model with Marge, then add the
// "Backup on recurring work" promise and the backup in plan step 4.
export const freeUpYourTime: RoutePageContent = {
  slug: routes.freeUpYourTime,
  menuLabel: "Free Up Your Time",
  headline: "The tide behind your best hours.",
  subline:
    "A dedicated assistant trained on your recurring work, so your calendar goes back to the job only you can do.",
  problem:
    "Your calendar is full and none of it is the job you were hired to do. You can’t justify a full-time hire, and you can’t keep doing it yourself.",
  empathy:
    "You shouldn’t have to choose between doing it yourself and hiring someone full time.",
  proof: [
    {
      title: "Assistants who open doors.",
      body: "Trained, embedded assistants who represent our clients well enough to open doors for them.",
    },
    {
      title: "A company, not a marketplace.",
      body: "Every assistant is part of a real company with a career path, not a freelancer between gigs.",
    },
    referrals,
  ],
  plan: [
    {
      title: "Name what’s on your plate.",
      body: "The recurring tasks, not the exceptions.",
    },
    {
      title: "Match the person to the work.",
      body: "Organizational fit over résumé.",
    },
    {
      title: "A defined onboarding period.",
      body: "Clear expectations on both sides from the start.",
    },
    {
      title: "Hand off the recurring work.",
      body: "Your assistant takes it over in your tools, on your schedule.",
    },
    {
      title: "Grow the scope.",
      body: "As trust builds, the work you hand off grows with it.",
    },
  ],
  promises: [
    yourTools,
    {
      title: "A company behind every assistant.",
      body: "Your assistant is a Tidewrk employee, with a team and a company standing behind them.",
    },
  ],
  stakes: {
    without: [
      "You stay the bottleneck.",
      "Strategic work keeps sliding to evenings and weekends.",
      "Or a full-time hire, made too early, for work that never justified the salary.",
    ],
    with: [
      "The recurring work runs without you.",
      "Your calendar reflects the job you were hired to do.",
    ],
  },
  nextStep: {
    text: "Need a team for the business, not an assistant for one person?",
    linkLabel: "Run your back office",
    href: routes.runYourBackOffice,
  },
};
