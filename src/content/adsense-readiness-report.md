# CalcFuel AdSense Readiness Report

Date: 2026-05-08

## Readiness Score

- **Overall readiness: 89 / 100**
- **Estimated approval probability: 80-88%**
- **Recommended submission timing: after publishing 3-5 full long-form posts from outlines and rechecking policy center in 7-14 days**

## Severity-ranked remaining items

### Critical
- None identified in current codebase after this sprint.

### High
- Publish additional fully written, original long-form blog posts (not only outlines) to strengthen unique-value signals before review.
- Maintain consistent canonical metadata on any new route added in future (prevent regressions).

### Medium
- Expand author expertise signals with named contributor pages if editorial team scales.
- Add route-level canonical metadata to high-priority calculator pages over time for stricter SEO governance.
- Replace broad static `lastModified` sitemap date with content-specific timestamps once editorial workflow is formalized.

### Low
- Add richer social preview image variants by category/article for higher social CTR.
- Expand accessibility testing with keyboard-only walkthrough and contrast snapshots in CI.

## What was completed

- Legal/trust foundation shipped: Privacy, Terms, About, Contact pages.
- Footer/header trust links integrated sitewide.
- AdSense + GA setup hardened with environment-safe IDs and single global placement.
- Metadata system standardized with canonical, Open Graph, and Twitter defaults.
- Blog architecture upgraded with reusable article layout, author bio, and `BlogPosting` schema.
- Featured article and related-link patterns implemented for internal linking.
- 15 high-value blog article outlines created and exposed in content system.
- Organization/logo/contact schema and breadcrumb schema strengthened.
- Technical SEO and accessibility improvements shipped (`robots.txt`, `sitemap`, skip link, asset cleanup).

## Submission checklist

- [ ] Publish at least 3-5 additional long-form posts from prepared outlines.
- [x] Keep legal pages indexable and linked in footer.
- [x] Confirm `ads.txt` reachable at `/ads.txt` with HTTP 200 in production.
- [x] Confirm AdSense crawler is not blocked in `robots.txt`.
- [x] Confirm GA and AdSense scripts are loaded once in root layout.
- [x] Confirm major templates have canonical and social metadata.
