# CalcFuel AdSense Baseline Audit

Last updated: 2026-05-08

## Critical blockers resolved in this sprint

- Missing legal pages: `privacy-policy`, `terms-of-service`, `about`, `contact`.
- Missing sitewide trust links in footer/navigation.
- Inconsistent canonical/OG/Twitter metadata strategy.
- Weak blog E-E-A-T signals (no author component, no article schema pattern).

## Technical baseline found

- Framework: Next.js App Router (`src/app`).
- AdSense account snippet present in `src/app/layout.tsx`.
- GA gtag present in `src/app/layout.tsx`.
- `public/ads.txt` exists with publisher ID.
- `public/robots.txt` allows crawling and exposes sitemap.
- Sitemap exists in `src/app/sitemap.ts`.

## Risks to monitor after rollout

- Keep all legal content accurate and updated over time.
- Ensure new article pages maintain originality and avoid thin content.
- Keep scripts single-injected (no duplicate GA/AdSense tags in route files).
- Re-check sitemap coverage whenever new pages are added.
