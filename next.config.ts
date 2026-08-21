import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
