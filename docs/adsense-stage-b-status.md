# AdSense readiness — post-realignment status

**Updated:** 2026-08-10  
**Prior baseline:** [adsense-readiness-audit.md](adsense-readiness-audit.md)

## Stage

Moved from **A (rebuild)** → **B (readiness re-audit)** with Stage **C apply** items largely implemented in-product. Live AdSense approval remains a human/Google process — do not treat this as an approval guarantee.

## Applied in codebase

| Item | Status |
|------|--------|
| Transport thesis nav + homepage | Done |
| Editorial / methodology / corrections | Done |
| About rewrite | Done |
| Sitemap limited to keep portfolio | Done |
| 410 middleware for retired URLs | Done |
| HOLD-EQUITY noindex (X-Robots-Tag) | Done |
| CommercialPlacement disclosure labels | Done |
| Privacy: localStorage, retention, AU, affiliate | Done |
| Technical Editor attribution | Done |
| Analytics funnel event helpers | Done |
| llms.txt repositioned | Done |

## Still verify live before / after AdSense apply

- Funding Choices CMP messaging configured in AdSense UI
- GA4 Key Events for `calculation_performed`
- Crawl sample of 410 and HOLD URLs in production
- Lighthouse / CWV baseline on flagship calculators
- Confirm no ad units inside calculator input controls (pattern already followed)

## Monetisation hierarchy (unchanged)

1. High-intent commercial opportunities  
2. Affiliate / referral  
3. Direct sponsorship  
4. Premium functionality  
5. AdSense (baseline layer)

Optimise for **completed calculations per 1,000 organic visitors** and revenue per qualified user — not max ad density.
