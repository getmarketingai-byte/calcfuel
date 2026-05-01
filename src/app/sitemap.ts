import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://calcfuel.com";

const calculators = [
  { slug: "email-open-rate-calculator", category: "email-marketing", priority: 0.9 },
  { slug: "marketing-roi-calculator", category: "financial", priority: 0.9 },
  { slug: "roas-calculator", category: "financial", priority: 0.9 },
  { slug: "ad-spend-calculator", category: "financial", priority: 0.8 },
  { slug: "social-media-roi-calculator", category: "social-media", priority: 0.8 },
];

const categoryPages = [
  { slug: "email-marketing", priority: 0.7 },
  { slug: "financial", priority: 0.7 },
  { slug: "social-media", priority: 0.7 },
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
