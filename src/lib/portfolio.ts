/**
 * Approved URL dispositions (2026-08-10 gate).
 * Strategy + search data — used by sitemap, middleware, redirects.
 */

export const KEEP_CALCULATORS = [
  "boat-fuel-calculator",
  "trip-fuel-cost-calculator",
  "towing-fuel-cost-calculator",
  "fuel-budget-planner",
  "drive-vs-fly-calculator",
  "motorcycle-fuel-cost-calculator",
  "fuel-economy-savings-calculator",
  "hybrid-vs-gas-calculator",
  "ev-vs-gas-calculator",
  "idling-fuel-waste-calculator",
  "carpool-fuel-split-calculator",
  "commute-fuel-cost-calculator",
  // Demoted but still indexable
  "fuel-surcharge-calculator",
  "generator-fuel-calculator",
  "hydrogen-vs-gas-calculator",
  "ev-charging-cost-calculator",
  "ifta-fuel-tax-calculator",
  "fuel-tax-credit-calculator",
  "emergency-fuel-rationing-calculator",
  "fuel-energy",
] as const;

/** Staged exit: live + noindex, removed from sitemap. */
export const HOLD_EQUITY_PATHS = [
  "/calculators/capital-gains-tax-calculator",
  "/calculators/franking-credits-calculator",
  "/calculators/marketing-roi-calculator",
  "/calculators/mortgage-repayment-calculator",
  "/calculators/profit-margin-calculator",
  "/calculators/rag-storage-cost-calculator",
  "/calculators/salary-sacrifice-calculator",
  "/calculators/social-media",
  "/calculators/social-media-follower-growth-rate-calculator",
  "/calculators/tax-refund-estimator",
  "/calculators/website-traffic-calculator",
  "/calculators/work-from-home-tax-calculator",
  "/blog/what-is-a-good-conversion-rate",
] as const;

/** Irreversible gone — middleware returns 410. */
export const GONE_PATHS = [
  "/calculators/ad-spend-calculator",
  "/calculators/age-calculator",
  "/calculators/ai-developer-tools",
  "/calculators/ai-model-router-savings-calculator",
  "/calculators/amazon-fba-fee-calculator",
  "/calculators/australian-income-tax-calculator",
  "/calculators/average-order-value-calculator",
  "/calculators/bmi-calculator",
  "/calculators/break-even-calculator",
  "/calculators/churn-rate-calculator",
  "/calculators/click-through-rate-calculator",
  "/calculators/compound-interest-calculator",
  "/calculators/conversion",
  "/calculators/conversion-rate-calculator",
  "/calculators/cost-per-acquisition-calculator",
  "/calculators/cost-per-lead-calculator",
  "/calculators/cpm-calculator",
  "/calculators/customer-acquisition-cost-calculator",
  "/calculators/customer-lifetime-value-calculator",
  "/calculators/ebay-fee-calculator",
  "/calculators/email-list-growth-rate-calculator",
  "/calculators/email-marketing",
  "/calculators/email-open-rate-calculator",
  "/calculators/etsy-fee-calculator",
  "/calculators/financial",
  "/calculators/freelance-rate-calculator",
  "/calculators/gst-calculator",
  "/calculators/hecs-help-repayment-calculator",
  "/calculators/influencer-rate-calculator",
  "/calculators/loan-repayment-calculator",
  "/calculators/marketing-budget-calculator",
  "/calculators/marketplace-fees",
  "/calculators/markup-vs-margin-calculator",
  "/calculators/multimodal-payload-estimator",
  "/calculators/negative-gearing-calculator",
  "/calculators/net-promoter-score-calculator",
  "/calculators/paypal-fee-calculator",
  "/calculators/percentage-calculator",
  "/calculators/prompt-caching-discount-estimator",
  "/calculators/revenue-per-lead-calculator",
  "/calculators/roas-calculator",
  "/calculators/seo-tools",
  "/calculators/social-media-engagement-rate-calculator",
  "/calculators/social-media-roi-calculator",
  "/calculators/stamp-duty-calculator",
  "/calculators/stripe-fee-calculator",
  "/calculators/superannuation-calculator",
  "/calculators/tip-calculator",
  "/calculators/website-speed-impact-calculator",
  "/blog/beginners-guide-to-marketing-roi",
  "/blog/cac-vs-ltv-for-startups",
  "/blog/how-to-build-a-marketing-forecast-model",
  "/blog/how-to-calculate-ad-spend-roi",
  "/blog/how-to-calculate-break-even-point",
  "/blog/how-to-calculate-conversion-rate",
  "/blog/how-to-calculate-customer-acquisition-cost",
  "/blog/how-to-calculate-customer-lifetime-value",
  "/blog/how-to-calculate-email-open-rate",
  "/blog/marketing-roi-formula",
  "/blog/roas-vs-profitability",
  "/blog/tax-deductions-australia-2025",
  "/blog/what-is-a-good-roas",
  "/tools/marketing-health-check",
  "/tools/marketing-score",
  "/tools/social-media-character-counter",
  "/tools/social-media-post-length-optimizer",
] as const;

export const FEATURED_TOOLS = [
  {
    title: "Boat Trip Fuel Planner",
    href: "/calculators/boat-fuel-calculator",
    blurb: "Fuel, cost, time and safe range for a real boat trip.",
    pillar: "Marine",
  },
  {
    title: "Towing Fuel Cost",
    href: "/calculators/towing-fuel-cost-calculator",
    blurb: "See what a caravan or trailer adds to trip fuel cost.",
    pillar: "Towing",
  },
  {
    title: "Trip Fuel Cost",
    href: "/calculators/trip-fuel-cost-calculator",
    blurb: "Road trip, commute, return or carpool fuel cost.",
    pillar: "Trip Planning",
  },
  {
    title: "Drive vs Fly",
    href: "/calculators/drive-vs-fly-calculator",
    blurb: "Compare total trip cost — drive or fly.",
    pillar: "Trip Planning",
  },
  {
    title: "Motorcycle Fuel Cost",
    href: "/calculators/motorcycle-fuel-cost-calculator",
    blurb: "Ride or commute fuel cost with bike-class presets.",
    pillar: "Vehicles",
  },
  {
    title: "Fuel Budget Planner",
    href: "/calculators/fuel-budget-planner",
    blurb: "Weekly, monthly and annual household fuel spend.",
    pillar: "Vehicles",
  },
] as const;

function normalizePath(path: string): string {
  if (!path) return "/";
  const bare = path.split("?")[0].split("#")[0];
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare || "/";
}

export function isGonePath(path: string): boolean {
  return (GONE_PATHS as readonly string[]).includes(normalizePath(path));
}

export function isHoldEquityPath(path: string): boolean {
  return (HOLD_EQUITY_PATHS as readonly string[]).includes(normalizePath(path));
}
