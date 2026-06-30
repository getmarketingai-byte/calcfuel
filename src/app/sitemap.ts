import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://calcfuel.com";

const calculators = [
  { slug: "email-open-rate-calculator", priority: 0.9 },
  { slug: "marketing-roi-calculator", priority: 0.9 },
  { slug: "roas-calculator", priority: 0.9 },
  { slug: "ad-spend-calculator", priority: 0.8 },
  { slug: "social-media-roi-calculator", priority: 0.8 },
  { slug: "customer-acquisition-cost-calculator", priority: 0.8 },
  { slug: "customer-lifetime-value-calculator", priority: 0.8 },
  { slug: "conversion-rate-calculator", priority: 0.8 },
  { slug: "cost-per-lead-calculator", priority: 0.8 },
  { slug: "click-through-rate-calculator", priority: 0.8 },
  { slug: "email-list-growth-rate-calculator", priority: 0.8 },
  { slug: "social-media-engagement-rate-calculator", priority: 0.8 },
  { slug: "marketing-budget-calculator", priority: 0.8 },
  { slug: "profit-margin-calculator", priority: 0.8 },
  { slug: "break-even-calculator", priority: 0.8 },
  { slug: "revenue-per-lead-calculator", priority: 0.8 },
  { slug: "average-order-value-calculator", priority: 0.8 },
  { slug: "cost-per-acquisition-calculator", priority: 0.8 },
  { slug: "churn-rate-calculator", priority: 0.8 },
  { slug: "net-promoter-score-calculator", priority: 0.8 },
  { slug: "website-traffic-calculator", priority: 0.8 },
  // Batch 4 — new calculators
  { slug: "website-speed-impact-calculator", priority: 0.8 },
  { slug: "social-media-follower-growth-rate-calculator", priority: 0.8 },
  // AI Tools
  { slug: "ai-model-router-savings-calculator", priority: 0.9 },
  { slug: "prompt-caching-discount-estimator", priority: 0.9 },
  { slug: "multimodal-payload-estimator", priority: 0.9 },
  { slug: "rag-storage-cost-calculator", priority: 0.9 },
  // Finance & Tax — High CPM Australian Tax Calculators
  { slug: "australian-income-tax-calculator", priority: 0.9 },
  { slug: "income-tax-calculator", priority: 0.9 },
  { slug: "gst-calculator", priority: 0.9 },
  { slug: "salary-sacrifice-calculator", priority: 0.9 },
  { slug: "superannuation-calculator", priority: 0.9 },
  { slug: "hecs-help-calculator", priority: 0.9 },
  { slug: "capital-gains-tax-calculator", priority: 0.9 },
  { slug: "work-from-home-tax-calculator", priority: 0.9 },
  { slug: "tax-refund-estimator", priority: 0.9 },
  { slug: "stamp-duty-calculator", priority: 0.9 },
  { slug: "negative-gearing-calculator", priority: 0.9 },
  { slug: "franking-credits-calculator", priority: 0.9 },
  // Batch 1 — Fuel & Energy
  { slug: "trip-fuel-cost-calculator", priority: 0.9 },
  { slug: "commute-fuel-cost-calculator", priority: 0.9 },
  { slug: "ev-vs-gas-calculator", priority: 0.9 },
  { slug: "generator-fuel-calculator", priority: 0.8 },
  { slug: "fuel-economy-savings-calculator", priority: 0.8 },
  // Batch 2 — Fuel & Energy
  { slug: "hybrid-vs-gas-calculator", priority: 0.8 },
  { slug: "carpool-fuel-split-calculator", priority: 0.8 },
  { slug: "fuel-budget-planner", priority: 0.8 },
  { slug: "fuel-surcharge-calculator", priority: 0.8 },
  { slug: "idling-fuel-waste-calculator", priority: 0.8 },
  // Batch 3 — Fuel & Energy
  { slug: "drive-vs-fly-calculator", priority: 0.9 },
  { slug: "ifta-fuel-tax-calculator", priority: 0.8 },
  { slug: "hydrogen-vs-gas-calculator", priority: 0.8 },
  { slug: "emergency-fuel-rationing-calculator", priority: 0.8 },
  { slug: "boat-fuel-calculator", priority: 0.8 },
  { slug: "towing-fuel-cost-calculator", priority: 0.8 },
  { slug: "motorcycle-fuel-cost-calculator", priority: 0.8 },
  // General / high-volume calculators
  { slug: "age-calculator", priority: 0.9 },
  { slug: "bmi-calculator", priority: 0.9 },
  { slug: "percentage-calculator", priority: 0.9 },
  { slug: "tip-calculator", priority: 0.9 },
  { slug: "compound-interest-calculator", priority: 0.9 },
  { slug: "loan-repayment-calculator", priority: 0.9 },
  { slug: "mortgage-repayment-calculator", priority: 0.9 },
  // AI tools
  { slug: "ai-developer-tools", priority: 0.8 },
  // Finance — additional
  { slug: "hecs-help-repayment-calculator", priority: 0.9 },
];

const categoryPages = [
  { slug: "email-marketing", priority: 0.7 },
  { slug: "financial", priority: 0.7 },
  { slug: "social-media", priority: 0.7 },
  { slug: "conversion", priority: 0.7 },
  { slug: "seo-tools", priority: 0.7 },
  { slug: "fuel-energy", priority: 0.7 },
];

const toolPages = [
  { slug: "social-media-character-counter", priority: 0.8 },
  { slug: "marketing-health-check", priority: 0.8 },
  { slug: "social-media-post-length-optimizer", priority: 0.8 },
  { slug: "marketing-score", priority: 0.8 },
];

const blogArticles = [
  { slug: "", priority: 0.8 },
  { slug: "cac-vs-ltv-for-startups", priority: 0.8 },
  { slug: "how-to-build-a-marketing-forecast-model", priority: 0.8 },
  { slug: "roas-vs-profitability", priority: 0.8 },
  { slug: "how-to-calculate-email-open-rate", priority: 0.9 },
  { slug: "marketing-roi-formula", priority: 0.9 },
  { slug: "what-is-a-good-roas", priority: 0.9 },
  { slug: "beginners-guide-to-marketing-roi", priority: 0.8 },
  { slug: "how-to-calculate-ad-spend-roi", priority: 0.8 },
  { slug: "how-to-calculate-break-even-point", priority: 0.8 },
  { slug: "how-to-calculate-conversion-rate", priority: 0.9 },
  { slug: "how-to-calculate-customer-acquisition-cost", priority: 0.8 },
  { slug: "how-to-calculate-customer-lifetime-value", priority: 0.8 },
  { slug: "how-to-reduce-commute-fuel-costs", priority: 0.8 },
  { slug: "understanding-fuel-economy-mpg-vs-l100km", priority: 0.8 },
  { slug: "caravan-fuel-consumption-australia", priority: 0.9 },
  { slug: "motorcycle-vs-car-running-costs-australia", priority: 0.9 },
  { slug: "what-is-a-good-conversion-rate", priority: 0.9 },
];

const trustPages = [
  { slug: "privacy-policy", priority: 0.6 },
  { slug: "terms-of-service", priority: 0.6 },
  { slug: "about", priority: 0.7 },
  { slug: "contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-30T00:00:00.000Z");

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...categoryPages.map(({ slug, priority }) => ({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...calculators.map(({ slug, priority }) => ({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...toolPages.map(({ slug, priority }) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...blogArticles.map(({ slug, priority }) => ({
      url: slug ? `${BASE_URL}/blog/${slug}` : `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...trustPages.map(({ slug, priority }) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}