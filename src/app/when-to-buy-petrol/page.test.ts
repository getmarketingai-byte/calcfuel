import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ACCC_CYCLE_PAGE_URL, CITY_CYCLE_TIPS, DIESEL_CYCLE_FACT } from "@/lib/accc-cycle-tips";

const PAGE = readFileSync(resolve(process.cwd(), "src/app/when-to-buy-petrol/page.tsx"), "utf8");

const FENCE =
  /neutrino\.au|free.?15|assessment|cal\.com|adsense|adsbygoogle|affiliate|guaranteed (rank|citation|AI)/i;

describe("/when-to-buy-petrol fences and copy", () => {
  it("is a decision page with five city phases and an ACCC citation", () => {
    expect(PAGE).toContain("When should I buy petrol in my city?");
    expect(PAGE).toContain("/data/australian-fuel-prices");
    expect(PAGE).toContain("/calculators/trip-fuel-cost-calculator");
    expect(PAGE).toContain("city.sourceUrl");
    expect(ACCC_CYCLE_PAGE_URL).toContain(
      "accc.gov.au/consumers/petrol-and-fuel/petrol-price-cycles-in-the-5-largest-cities",
    );
    expect(CITY_CYCLE_TIPS).toHaveLength(5);
    expect(PAGE).toContain("Diesel does not cycle");
    expect(DIESEL_CYCLE_FACT.toLowerCase()).toContain("do not move in petrol price cycles");
  });

  it("does not add Neutrino CTAs, AdSense units, affiliates, or forecast dollars", () => {
    expect(PAGE).not.toMatch(FENCE);
    expect(PAGE).not.toContain("AdSenseUnit");
    expect(PAGE).not.toMatch(/\$[0-9]+\.[0-9]+\/L forecast/i);
    expect(PAGE.toLowerCase()).not.toContain("always buy tuesday");
  });
});
