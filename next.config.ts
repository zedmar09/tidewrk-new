import type { NextConfig } from "next";

// Retired URLs from the Website Direction & Changes doc (§2.4).
// 301 so anything already shared or indexed lands on the new page.
const retiredRoutes: Array<{ source: string; destination: string }> = [
  { source: "/software-development", destination: "/build-your-product" },
  { source: "/full-stack-development-team", destination: "/build-your-product" },
  { source: "/staff-augmentation", destination: "/scale-your-engineering-team" },
  {
    source: "/virtual-assistance-business-administration",
    destination: "/free-up-your-time",
  },
  {
    source: "/executive-advisory-consulting",
    destination: "/how-we-work#executive-advisory",
  },
  // Not in the doc; retired because distance is never the selling point.
  { source: "/offshoring", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return retiredRoutes.map((route) => ({ ...route, statusCode: 301 }));
  },
};

export default nextConfig;
