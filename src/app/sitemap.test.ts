import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { CALCFUEL_ORG, SITE_URL } from "@/lib/site";

const BOAT = `${SITE_URL}/calculators/boat-fuel-calculator`;

describe("sitemap apex hygiene", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => String(entry.url));

  it("lists every loc on the apex host only", () => {
    expect(SITE_URL).toBe("https://calcfuel.com");
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith("https://calcfuel.com")).toBe(true);
      expect(url).not.toContain("www.calcfuel.com");
      expect(url).not.toContain("://www.");
    }
  });

  it("includes the boat calculator exactly once as an apex loc", () => {
    const boat = urls.filter((url) => url === BOAT);
    expect(boat).toEqual([BOAT]);
    expect(urls.filter((url) => url.includes("boat-fuel-calculator"))).toHaveLength(1);
  });

  it("lists calculator URLs as apex paths only", () => {
    const calculators = urls.filter((url) => url.includes("/calculators/"));
    expect(calculators.length).toBeGreaterThan(0);
    for (const url of calculators) {
      expect(url.startsWith("https://calcfuel.com/calculators/")).toBe(true);
    }
  });

  it("lists the road-trip fuel FAQ as an apex loc exactly once", () => {
    const faq = `${SITE_URL}/guides/australia-road-trip-fuel-cost-faq`;
    expect(urls.filter((url) => url === faq)).toEqual([faq]);
    expect(urls.some((url) => url.includes("www.calcfuel.com"))).toBe(false);
  });
});

describe("CalcFuel Organization JSON-LD", () => {
  it("is CalcFuel-only with no parentOrganization", () => {
    expect(CALCFUEL_ORG.name).toBe("CalcFuel");
    expect(CALCFUEL_ORG.url).toBe("https://calcfuel.com");
    expect(CALCFUEL_ORG).not.toHaveProperty("parentOrganization");
  });
});
