import { MetadataRoute } from "next";
import { KEEP_CALCULATORS } from "@/lib/portfolio";
import { liveArticles } from "@/content/blog-articles";

export const dynamic = "force-static";

const BASE_URL = "https://calcfuel.com";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
  { path: "/marine", priority: 0.9, changeFrequency: "monthly" },
  { path: "/towing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vehicles", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trip-planning", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/data/australian-fuel-prices", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/editorial-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/methodology", priority: 0.5, changeFrequency: "monthly" },
  { path: "/corrections", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/suggest", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Guides in the sitemap. Derived from the article registry rather than duplicated,
 * so a retired guide cannot survive in the sitemap after being removed from the index.
 */
const KEEP_BLOGS = liveArticles.map((a) => a.slug);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${BASE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  for (const slug of KEEP_CALCULATORS) {
    entries.push({
      url: `${BASE_URL}/calculators/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: slug.includes("boat") || slug.includes("trip") || slug.includes("towing") ? 0.9 : 0.8,
    });
  }

  for (const slug of KEEP_BLOGS) {
    entries.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
