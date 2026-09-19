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
        source: "/ph",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
