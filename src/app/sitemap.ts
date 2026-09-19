import { MetadataRoute } from "next";
import { KEEP_CALCULATORS } from "@/lib/portfolio";
import { liveArticles } from "@/content/blog-articles";
import { SOURCE_REPORT } from "@/lib/fuel-prices";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Apex only. www is a redirect host, never a sitemap loc. */
const BASE_URL = SITE_URL;

/**
 * Real content-change dates, not the build timestamp.
 *
 * Stamping every URL with `new Date()` — which this file did until 2026-08-21 —
 * tells Google that all 45 pages changed at the same millisecond on every deploy.
 * Google's sitemap documentation is explicit that it uses `lastmod` only where it is
 * consistently accurate and ignores it otherwise, and Bing weights it more heavily
 * still. A date here must correspond to an actual edit.
 *
 * `priority` is deliberately absent: both engines ignore it.
 */
const REALIGNED = "2026-08-10"; // transport realignment
const REMEDIATED = "2026-08-21"; // AdSense + search remediation
const INDEX_HYGIENE = "2026-09-19"; // hub → boat discovery links

/** Pages rewritten or created in the 2026-08-21 pass. */
const REWRITTEN = new Set([
  "/",
  "/calculators",
  "/blog",
  "/marine",
  "/towing",
  "/vehicles",
  "/trip-planning",
  "/about",
  "/editorial-policy",
  "/methodology",
  "/data/australian-fuel-prices",
  "/fuel-efficiency-comparison",
]);

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "/", changeFrequency: "weekly" },
  { path: "/calculators", changeFrequency: "monthly" },
  { path: "/marine", changeFrequency: "monthly" },
  { path: "/towing", changeFrequency: "monthly" },
  { path: "/vehicles", changeFrequency: "monthly" },
  { path: "/trip-planning", changeFrequency: "monthly" },
  { path: "/blog", changeFrequency: "monthly" },
  { path: "/data/australian-fuel-prices", changeFrequency: "weekly" },
  { path: "/fuel-efficiency-comparison", changeFrequency: "monthly" },
  { path: "/about", changeFrequency: "yearly" },
  { path: "/contact", changeFrequency: "yearly" },
  { path: "/editorial-policy", changeFrequency: "yearly" },
  { path: "/methodology", changeFrequency: "yearly" },
  { path: "/corrections", changeFrequency: "yearly" },
  { path: "/privacy-policy", changeFrequency: "yearly" },
  { path: "/terms-of-service", changeFrequency: "yearly" },
  { path: "/suggest", changeFrequency: "yearly" },
];

function lastModFor(path: string): string {
  // The fuel price dataset changes whenever a new ACCC report is transcribed.
  if (path === "/data/australian-fuel-prices") return SOURCE_REPORT.reportDate;
  if (path === "/calculators" || path === "/marine") return INDEX_HYGIENE;
  return REWRITTEN.has(path) ? REMEDIATED : REALIGNED;
}

function apexLoc(path: string): string {
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  if (url.includes("://www.")) {
    throw new Error(`Sitemap loc must be apex, got ${url}`);
  }
  return url;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: apexLoc(p.path),
    lastModified: lastModFor(p.path),
    changeFrequency: p.changeFrequency,
  }));

  for (const slug of KEEP_CALCULATORS) {
    // Every calculator gained a worked example and a corrected disclaimer on 2026-08-21.
    entries.push({
      url: apexLoc(`/calculators/${slug}`),
      lastModified: REMEDIATED,
      changeFrequency: "monthly",
    });
  }

  for (const article of liveArticles) {
    // Guides gained a chart and a single byline on 2026-08-21; the body text is older.
    entries.push({
      url: apexLoc(`/blog/${article.slug}`),
      lastModified: REMEDIATED,
      changeFrequency: "yearly",
    });
  }

  return entries;
}
