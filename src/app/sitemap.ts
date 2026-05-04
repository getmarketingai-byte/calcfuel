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
  // Batch 1 — Fuel & Energy
  { slug: "trip-fuel-cost-calculator", priority: 0.9 },
  { slug: "commute-fuel-cost-calculator", priority: 0.9 },
  { slug: "ev-vs-gas-calculator", priority: 0.9 },
  { slug: "generator-fuel-calculator", priority: 0.8 },
  { slug: "fuel-economy-savings-calculator", priority: 0.8 },
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...categoryPages.map(({ slug, priority }) => ({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...calculators.map(({ slug, priority }) => ({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...toolPages.map(({ slug, priority }) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}
