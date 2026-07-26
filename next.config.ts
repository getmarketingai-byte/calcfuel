import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" removed to enable API routes (e.g. /api/mcp for MCP server)
  // Vercel handles dynamic Next.js natively - static export not required
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
      {
        source: "/calculators/hecs-help-calculator",
        destination: "/calculators/hecs-help-repayment-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
