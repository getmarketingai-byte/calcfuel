import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CityCycleTips from "@/components/CityCycleTips";
import {
  ACCC_CYCLE_PAGE_URL,
  CITY_CYCLE_TIPS,
  DIESEL_CYCLE_FACT,
  cycleTipsStaleAfterDaysFromEnv,
} from "@/lib/accc-cycle-tips";

const PAGE = readFileSync(resolve(process.cwd(), "src/app/when-to-buy-petrol/page.tsx"), "utf8");
const TIPS = readFileSync(resolve(process.cwd(), "src/components/CityCycleTips.tsx"), "utf8");

// Parts are concatenated so this file does not contain the banned phrases itself.
const FENCE = new RegExp(
  [
    "neut" + "rino\\.au",
    "free.?15",
    "assess" + "ment",
    "cal\\.com",
    "adsense",
    "adsbygoogle",
    "affiliate",
    "guaranteed (rank|citation|AI)",
  ].join("|"),
  "i",
);

describe("/when-to-buy-petrol fences and copy", () => {
  it("is a decision page with five city phases and an ACCC citation", () => {
    expect(PAGE).toContain("When should I buy petrol in my city?");
    expect(PAGE).toContain("/data/australian-fuel-prices");
    expect(PAGE).toContain("/calculators/trip-fuel-cost-calculator");
    expect(PAGE).toContain("<CityCycleTips");
    expect(TIPS).toContain("city.sourceUrl");
    expect(PAGE).toContain("export const revalidate = 3600");
    expect(ACCC_CYCLE_PAGE_URL).toContain(
      "accc.gov.au/consumers/petrol-and-fuel/petrol-price-cycles-in-the-5-largest-cities",
    );
    expect(CITY_CYCLE_TIPS).toHaveLength(5);
    expect(PAGE).toContain("Diesel does not cycle");
    expect(DIESEL_CYCLE_FACT.toLowerCase()).toContain("do not move in petrol price cycles");
  });

  it("does not add Neutrino CTAs, AdSense units, affiliates, or forecast dollars", () => {
    expect(PAGE).not.toMatch(FENCE);
    expect(TIPS).not.toMatch(FENCE);
    expect(PAGE).not.toContain("AdSenseUnit");
    expect(PAGE).not.toMatch(/\$[0-9]+\.[0-9]+\/L forecast/i);
    expect(PAGE.toLowerCase()).not.toContain("always buy tuesday");
  });

  it("renders live phase labels while the Monday tip is inside 7 days", () => {
    const html = renderToStaticMarkup(
      createElement(CityCycleTips, { now: new Date("2026-10-06T03:00:00.000Z") }),
    );
    expect(html).toContain('data-cycle-tips-state="live"');
    expect(html).toContain("Phase: climbing");
    expect(html).toContain("Phase: near low");
    expect(html).toContain("Sydney");
    expect(html).toContain("Perth");
    expect(html).not.toContain("Buying tips paused");
  });

  it("hides phase labels and shows the pause note once the tip is 7 days old", () => {
    const limit = cycleTipsStaleAfterDaysFromEnv();
    const html = renderToStaticMarkup(
      createElement(CityCycleTips, { now: new Date("2026-10-12T03:00:00.000Z") }),
    );
    expect(html).toContain('data-cycle-tips-state="parked"');
    expect(html).toContain("Buying tips paused");
    expect(html).toContain("5 October 2026");
    expect(html).toContain("7 days ago");
    expect(html).toContain(`older than our ${limit}-day limit`);
    expect(html).toContain("ACCC page");
    expect(html).toContain(ACCC_CYCLE_PAGE_URL);
    expect(html).not.toContain("Phase:");
    expect(PAGE).toContain("Diesel does not cycle");
  });
});
