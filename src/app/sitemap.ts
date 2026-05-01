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
];

const categoryPages = [
  { slug: "email-marketing", priority: 0.7 },
  { slug: "financial", priority: 0.7 },
  { slug: "social-media", priority: 0.7 },
  { slug: "conversion", priority: 0.7 },
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
  ];
}
