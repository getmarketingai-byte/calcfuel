import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Apex is the only Google-facing host. Vercel already 308s www → apex;
        // keep the same rule in-app so a non-Vercel host cannot serve www as a second site.
        source: "/",
        has: [{ type: "host", value: "www.calcfuel.com" }],
        destination: "https://calcfuel.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.calcfuel.com" }],
        destination: "https://calcfuel.com/:path*",
        permanent: true,
      },
      {
        // Merged 2026-11-17: the trip calculator's Commute mode does the same job.
        source: "/calculators/commute-fuel-cost-calculator",
        destination: "/calculators/trip-fuel-cost-calculator#commute",
        permanent: true,
      },
      {
        // Merged 2026-11-17: thin page; "how long will my fuel last" now answered on the budget planner.
        source: "/calculators/emergency-fuel-rationing-calculator",
        destination: "/calculators/fuel-budget-planner#how-long-fuel-lasts",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        // Category consolidated into /calculators on 2026-08-21.
        source: "/calculators/fuel-energy",
        destination: "/calculators",
        permanent: true,
      },
      {
        // Section roots without an index page (GSC 404s, 2026-11-17).
        source: "/data",
        destination: "/data/australian-fuel-prices",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ph",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
