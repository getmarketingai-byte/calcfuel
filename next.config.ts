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
        source: "/ph",
        destination: "/",
        permanent: true,
      },
      {
        source: "/calculators/work-from-home-tax-deduction-calculator",
        destination: "/calculators/work-from-home-tax-calculator",
        permanent: true,
      },
      // Aliases of retired inventory → home (canonical content is 410)
      {
        source: "/calculators/hecs-help-calculator",
        destination: "/",
        permanent: true,
      },
      {
        source: "/calculators/income-tax-calculator",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
