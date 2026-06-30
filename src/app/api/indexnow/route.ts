import { NextResponse } from "next/server";

const KEY = "4ffeb175-8807-4752-b2a9-2055590b5586";
const HOST = "calcfuel.com";
const BASE_URL = `https://${HOST}`;

const ALL_URLS = [
  BASE_URL,
  // Category pages
  `${BASE_URL}/calculators/email-marketing`,
  `${BASE_URL}/calculators/financial`,
  `${BASE_URL}/calculators/social-media`,
  `${BASE_URL}/calculators/conversion`,
  `${BASE_URL}/calculators/seo-tools`,
  `${BASE_URL}/calculators/fuel-energy`,
  // Marketing calculators
  `${BASE_URL}/calculators/email-open-rate-calculator`,
  `${BASE_URL}/calculators/marketing-roi-calculator`,
  `${BASE_URL}/calculators/roas-calculator`,
  `${BASE_URL}/calculators/ad-spend-calculator`,
  `${BASE_URL}/calculators/social-media-roi-calculator`,
  `${BASE_URL}/calculators/customer-acquisition-cost-calculator`,
  `${BASE_URL}/calculators/customer-lifetime-value-calculator`,
  `${BASE_URL}/calculators/conversion-rate-calculator`,
  `${BASE_URL}/calculators/cost-per-lead-calculator`,
  `${BASE_URL}/calculators/click-through-rate-calculator`,
  `${BASE_URL}/calculators/email-list-growth-rate-calculator`,
  `${BASE_URL}/calculators/social-media-engagement-rate-calculator`,
  `${BASE_URL}/calculators/marketing-budget-calculator`,
  `${BASE_URL}/calculators/profit-margin-calculator`,
  `${BASE_URL}/calculators/break-even-calculator`,
  `${BASE_URL}/calculators/revenue-per-lead-calculator`,
  `${BASE_URL}/calculators/average-order-value-calculator`,
  `${BASE_URL}/calculators/cost-per-acquisition-calculator`,
  `${BASE_URL}/calculators/churn-rate-calculator`,
  `${BASE_URL}/calculators/net-promoter-score-calculator`,
  `${BASE_URL}/calculators/website-traffic-calculator`,
  `${BASE_URL}/calculators/website-speed-impact-calculator`,
  `${BASE_URL}/calculators/social-media-follower-growth-rate-calculator`,
  // AI tools
  `${BASE_URL}/calculators/ai-model-router-savings-calculator`,
  `${BASE_URL}/calculators/prompt-caching-discount-estimator`,
  `${BASE_URL}/calculators/multimodal-payload-estimator`,
  `${BASE_URL}/calculators/rag-storage-cost-calculator`,
  // Finance & Tax — High CPM EOFY
  `${BASE_URL}/calculators/australian-income-tax-calculator`,
  `${BASE_URL}/calculators/gst-calculator`,
  `${BASE_URL}/calculators/income-tax-calculator`,
  `${BASE_URL}/calculators/tax-refund-estimator`,
  `${BASE_URL}/calculators/salary-sacrifice-calculator`,
  `${BASE_URL}/calculators/work-from-home-tax-calculator`,
  `${BASE_URL}/calculators/hecs-help-calculator`,
  `${BASE_URL}/calculators/capital-gains-tax-calculator`,
  `${BASE_URL}/calculators/franking-credits-calculator`,
  `${BASE_URL}/calculators/negative-gearing-calculator`,
  `${BASE_URL}/calculators/stamp-duty-calculator`,
  `${BASE_URL}/calculators/superannuation-calculator`,
  `${BASE_URL}/calculators/mortgage-repayment-calculator`,
  `${BASE_URL}/calculators/compound-interest-calculator`,
  // General
  `${BASE_URL}/calculators/percentage-calculator`,
  `${BASE_URL}/calculators/bmi-calculator`,
  `${BASE_URL}/calculators/tip-calculator`,
  `${BASE_URL}/calculators/age-calculator`,
  `${BASE_URL}/calculators/loan-repayment-calculator`,
  `${BASE_URL}/calculators/hecs-help-repayment-calculator`,
  `${BASE_URL}/calculators/ai-developer-tools`,
  // Fuel & Energy
  `${BASE_URL}/calculators/trip-fuel-cost-calculator`,
  `${BASE_URL}/calculators/commute-fuel-cost-calculator`,
  `${BASE_URL}/calculators/ev-vs-gas-calculator`,
  `${BASE_URL}/calculators/generator-fuel-calculator`,
  `${BASE_URL}/calculators/fuel-economy-savings-calculator`,
  `${BASE_URL}/calculators/hybrid-vs-gas-calculator`,
  `${BASE_URL}/calculators/carpool-fuel-split-calculator`,
  `${BASE_URL}/calculators/fuel-budget-planner`,
  `${BASE_URL}/calculators/fuel-surcharge-calculator`,
  `${BASE_URL}/calculators/idling-fuel-waste-calculator`,
  `${BASE_URL}/calculators/drive-vs-fly-calculator`,
  `${BASE_URL}/calculators/ifta-fuel-tax-calculator`,
  `${BASE_URL}/calculators/hydrogen-vs-gas-calculator`,
  `${BASE_URL}/calculators/emergency-fuel-rationing-calculator`,
  `${BASE_URL}/calculators/boat-fuel-calculator`,
  `${BASE_URL}/calculators/towing-fuel-cost-calculator`,
  `${BASE_URL}/calculators/motorcycle-fuel-cost-calculator`,
  // Tools
  `${BASE_URL}/tools/social-media-character-counter`,
  `${BASE_URL}/tools/marketing-health-check`,
  `${BASE_URL}/tools/social-media-post-length-optimizer`,
  `${BASE_URL}/tools/marketing-score`,
  // Blog
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/cac-vs-ltv-for-startups`,
  `${BASE_URL}/blog/how-to-build-a-marketing-forecast-model`,
  `${BASE_URL}/blog/roas-vs-profitability`,
  `${BASE_URL}/blog/how-to-calculate-email-open-rate`,
  `${BASE_URL}/blog/marketing-roi-formula`,
  `${BASE_URL}/blog/what-is-a-good-roas`,
  `${BASE_URL}/blog/how-to-calculate-customer-lifetime-value`,
  `${BASE_URL}/blog/how-to-calculate-ad-spend-roi`,
  `${BASE_URL}/blog/how-to-calculate-conversion-rate`,
  `${BASE_URL}/blog/how-to-calculate-break-even-point`,
  `${BASE_URL}/blog/how-to-calculate-customer-acquisition-cost`,
  `${BASE_URL}/blog/understanding-fuel-economy-mpg-vs-l100km`,
  `${BASE_URL}/blog/how-to-reduce-commute-fuel-costs`,
  `${BASE_URL}/blog/caravan-fuel-consumption-australia`,
  `${BASE_URL}/blog/motorcycle-vs-car-running-costs-australia`,
  `${BASE_URL}/blog/best-time-to-buy-petrol-australia`,
  `${BASE_URL}/blog/beginners-guide-to-marketing-roi`,
  `${BASE_URL}/blog/what-is-a-good-conversion-rate`,
  // Trust pages
  `${BASE_URL}/privacy-policy`,
  `${BASE_URL}/terms-of-service`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
];

export async function GET() {
  return submitToIndexNow();
}

export async function POST() {
  return submitToIndexNow();
}

async function submitToIndexNow() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: ALL_URLS,
  };

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    status: res.status,
    ok: res.ok,
    urlsSubmitted: ALL_URLS.length,
    message: res.ok
      ? `Submitted ${ALL_URLS.length} URLs to IndexNow`
      : `IndexNow returned ${res.status}`,
  });
}
