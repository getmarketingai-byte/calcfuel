# CalcFuel AdSense Readiness Audit

**Status:** Phase 0 deliverable — pre-rebuild baseline  
**Date:** 2026-08-10  
**Context:** Audit before strategic realignment. AdSense is a monetisation *layer*, not the product definition. Do not apply for AdSense until Stage C criteria are met after the rebuild.

**Prior report:** [`src/content/adsense-readiness-report.md`](../src/content/adsense-readiness-report.md) (2026-05-08, score 89/100) — still useful historically; this document reflects current codebase state against the locked transport/trip-cost thesis.

## Summary

| Dimension | Assessment |
|-----------|------------|
| Legal/trust pages | Present (Privacy, Terms, About, Contact) with gaps |
| Ads plumbing | AdSense client, `ads.txt`, CMP script, robots allowlist present |
| Topical coherence | **Weak** — marketing-first nav + ~75 mixed calculators = high thin/low-value inventory risk |
| Editorial system | **Missing** dedicated `/editorial-policy`, `/methodology`, `/corrections` |
| Indexation hygiene | Broad sitemap; hubs without calculators; unrelated clusters still indexable |
| Recommendation | Stay in **Stage A (no ads optimisation / rebuild first)** → complete Phase 0–2 gate → rebuild → Stage B re-audit → Stage C apply |

### AdSense stages (locked)

| Stage | State |
|-------|--------|
| **A** | No ads focus — rebuild product |
| **B** | Readiness re-audit after rebuild |
| **C** | Apply — only when quality/nav/legal/sitemap clean |
| **D** | Conservative ads after approval |
| **E** | Optimise revenue / completed calculation |

---

## Audit matrix

| Area | Status | Risk | Fix | Priority |
|------|--------|------|-----|----------|
| Privacy Policy exists | Pass | Low | Keep; expand gaps below | P1 |
| Privacy — Google advertising cookies | Pass | Low | Section present with AdSense disclosure | — |
| Privacy — third-party ad vendors | Partial | Medium | Explicitly name “Google and partners / authorized buyers”; link partner-sites policy already present | P1 |
| Privacy — personalized advertising | Pass | Low | Opt-out links to Ad Settings + aboutads.info | — |
| Privacy — opt-out mechanism | Pass | Low | Browser + GA opt-out + Ad Settings documented | — |
| Privacy — analytics (GA + Vercel) | Pass | Low | Sections present | — |
| Privacy — cookies / consent | Pass | Low | CMP mentioned for EEA/UK/CH | — |
| Privacy — localStorage | Fail | Medium | Unit/currency prefs planned; disclose local storage use when shipped | P1 |
| Privacy — contact / suggest forms | Partial | Medium | Suggest emails hashed — good; clarify retention period for hashed emails | P1 |
| Privacy — affiliate tracking | Fail | Medium | No affiliate disclosure yet; add before any affiliate links | P1 |
| Privacy — data retention | Fail | Medium | Add retention periods for analytics, suggest votes, logs | P1 |
| Privacy — Australian Privacy Principles / AU obligations | Fail | Medium | Operator AU-facing; add APP-oriented language + contact for AU rights | P1 |
| Terms of Service | Pass | Low | Present at `/terms-of-service` | — |
| About page | Partial | High | Still positions marketing/social as primary audience — rewrite for trip-cost thesis | P0 |
| Contact page | Pass | Low | Present | — |
| Editorial Policy page | Fail | High | Missing `/editorial-policy` — required for trust + AdSense narrative | P0 |
| Methodology page | Fail | High | Missing `/methodology` | P0 |
| Corrections page | Fail | High | Missing `/corrections` (contact mentions corrections only) | P0 |
| Advertising disclosures on pages | Partial | Medium | Privacy covers AdSense; no on-page “Advertisement” labeling standard; no affiliate disclosure | P1 |
| Analytics disclosure | Pass | Low | In Privacy | — |
| Cookie/storage disclosure | Partial | Medium | Cookies yes; localStorage no | P1 |
| Google advertising requirements | Partial | Medium | Meta `google-adsense-account`, adsbygoogle script, ads.txt present | P1 |
| CMP / Funding Choices | Partial | Medium | `GoogleCmp` loads Funding Choices script — verify messaging configured live in AdSense Privacy & messaging | P0 |
| Navigation quality | Fail | High | Header: Social Media / Marketing first — incoherent for transport product; hurts UX & publisher quality signals | P0 |
| Mobile UX | Partial | Medium | Calculators generally responsive; long SEO pages; no sticky calc CTA standard | P2 |
| Broken links | Unknown | Medium | No automated link crawl in CI — run crawl before Apply | P1 |
| 404 / 500 handling | Partial | Medium | Next.js defaults; no custom branded 404 audited in this pass — verify | P1 |
| Sitemap | Partial | High | Includes unrelated clusters + hubs; will over-expose thin/off-topic inventory | P0 |
| robots.txt | Pass | Low | Allows AdSense crawlers; sitemap declared; ads.txt allowed | — |
| Canonical URLs | Partial | Medium | Mix of `createPageMetadata` and inline Metadata; aliases exist | P1 |
| Structured data | Partial | Medium | WebSite/Organization + CalculatorJsonLd on many tools; descriptions still marketing-skewed | P1 |
| Indexation control | Fail | High | No per-URL INDEX/NOINDEX/410 policy enforced; hubs without calcs indexable | P0 |
| Abandoned / unfinished pages | Partial | High | Soft-retire notices not used (good); but large off-topic inventory is low-value publisher risk | P0 |
| Thin / low-value inventory | Fail | **Critical** | ~60+ unrelated calculators (social/email/AI/marketing/tax/generic) + commodity pages — conflicts with publisher policies on low-value content | P0 |
| Intrusive popups | Pass | Low | No observed interstitial/popup layer beyond CMP | — |
| Ad placement UX | Partial | Medium | `AdSenseUnit` below calc on many pages (good pattern); homepage/meta still “70+ calculators” framing | P1 |
| Ad-heavy layouts | Pass | Low | Ads not inside calculator controls | — |
| Placeholder commercial content | Pass | Low | No fake affiliate fills | — |
| Affiliate disclosure architecture | Fail | Medium | No `CommercialPlacement` / disclosure component yet | P2 |
| ads.txt readiness | Pass | Low | `public/ads.txt` → `google.com, pub-7076137753154472, DIRECT, f08c47fec0942fa0` | — |
| Reviewer attribution | Partial | Medium | `CalcReviewedBy` uses generic `neutrino.au` — replace with CalcFuel Technical Editor + editorial policy | P1 |
| Page speed / CWV | Unknown | Medium | Vercel Speed Insights present; no Lighthouse baseline captured this audit | P2 |
| Construction / under-construction pages | Pass | Low | None identified | — |
| Topical sprawl vs AdSense | Fail | **Critical** | Mixed verticals weaken “useful content” and site purpose signals | P0 |

---

## Critical findings (P0)

1. **Low-value / off-topic inventory** — Do not monetize a farm of social/AI/tax/generic calculators while claiming a transport decision product. Complete migration gate before Apply.
2. **Navigation / homepage positioning** — Still marketing-first; About page still describes social/marketing as primary.
3. **Missing editorial stack** — `/editorial-policy`, `/methodology`, `/corrections`.
4. **Sitemap hygiene** — Must exclude retired/thin/unfinished pages after disposition.
5. **CMP live configuration** — Script present; confirm AdSense Privacy & messaging is active in production for required regions.

---

## Privacy gap checklist (explicit)

Verify / add before Stage C:

- [x] Google advertising cookies
- [x] Personalized advertising + opt-out
- [x] Analytics
- [ ] Local storage / preferences
- [ ] Affiliate tracking (when introduced)
- [ ] Data retention periods
- [ ] Australian privacy obligations (APP-oriented)
- [ ] Clearer third-party vendor wording

---

## Publisher policy risk notes

Google expects original, high-quality content and usable navigation; it restricts monetizing pages with little/no publisher value. Current site risks:

- Indexable hubs that cannot perform a calculation (e.g. `/calculators/social-media` historically counted as “no calc” sessions).
- Large unrelated clusters diluting site purpose.
- Generic reviewer label without transparent methodology pages.

Mitigation is the locked plan: consolidate via MERGE, retire off-topic via approved 410/301, rebuild 5–10 decision engines with the hard content standard.

---

## Recommended sequence (do not skip)

1. Finish Human Approval Gate on [`url-migration-map.md`](url-migration-map.md).
2. Rebuild IA + flagships (Phases 3–7) with content quality standard.
3. Clean sitemap/indexation (Phase 8).
4. Re-run this audit as Stage B → only then Stage C Apply.
5. After approval, Stage D conservative ads via `CommercialPlacement` abstraction — never maximise impressions over UX.

**No calculator deletions or AdSense application in this Phase 0 deliverable.**
