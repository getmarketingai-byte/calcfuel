import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" removed to enable API routes (e.g. /api/mcp for MCP server)
  // Vercel handles dynamic Next.js natively - static export not required
  async redirects() {
    return [
      {
        source: "/calculators/work-from-home-tax-deduction-calculator",
        destination: "/calculators/work-from-home-tax-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
