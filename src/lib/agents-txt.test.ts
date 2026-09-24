import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { config as middlewareConfig } from "@/middleware";
import nextConfig from "../../next.config";

const AGENTS_TXT = readFileSync(resolve(process.cwd(), "public/agents.txt"), "utf8");
const WELL_KNOWN = readFileSync(
  resolve(process.cwd(), "public/.well-known/agents.txt"),
  "utf8",
);

const FENCE =
  /neutrino\.au|free.?15|assessment|cal\.com|guaranteed (rank|citation|AI)/i;

describe("agents.txt", () => {
  it("is a static public file with product facts and live URLs", () => {
    expect(AGENTS_TXT).toContain("https://calcfuel.com/calculators/trip-fuel-cost-calculator");
    expect(AGENTS_TXT).toContain("https://calcfuel.com/llms.txt");
    expect(AGENTS_TXT).toContain("https://calcfuel.com/DESIGN.md");
    expect(AGENTS_TXT).not.toMatch(FENCE);
    expect(AGENTS_TXT).not.toMatch(/ai\.txt/i);
  });

  it("is also served at /.well-known/agents.txt with the same body", () => {
    expect(WELL_KNOWN).toBe(AGENTS_TXT);
  });

  it("is excluded from middleware matchers", () => {
    expect(middlewareConfig.matcher).toEqual([
      "/calculators/:path*",
      "/blog/:path*",
      "/tools/:path*",
    ]);
    for (const pattern of middlewareConfig.matcher) {
      expect(pattern).not.toMatch(/agents\.txt/);
      expect(pattern).not.toBe("/:path*");
    }
  });

  it("is not subject to a catch-all rewrite", () => {
    expect(nextConfig.rewrites).toBeUndefined();
  });
});
