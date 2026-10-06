import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function pageFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...pageFiles(full));
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

const RENDERS_AGE = /PricesLastUpdated|CycleTipsLastUpdated|CalcDisclaimer/;

describe("request-time freshness routes", () => {
  it("sets hourly ISR on every page that renders a relative age or a stale flag", () => {
    const pages = pageFiles(join(process.cwd(), "src/app"));
    const agePages = pages.filter((file) => RENDERS_AGE.test(readFileSync(file, "utf8")));
    expect(agePages.length).toBeGreaterThan(10);
    for (const file of agePages) {
      const text = readFileSync(file, "utf8");
      expect(text, file).toContain("export const revalidate = 3600");
      expect(text, file).not.toMatch(/dynamic\s*=\s*["']force-dynamic["']/);
    }
  });
});
