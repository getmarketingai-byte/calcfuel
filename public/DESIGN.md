---
version: alpha
name: CalcFuel
description: Design system for CalcFuel — Australian transport and trip-cost calculators. Plain-text tokens for AI design agents (Stitch, coding agents). Not a crawl map; see llms.txt for URL inventory.
colors:
  primary: "#c2410c"
  primary-hover: "#9a3412"
  primary-soft: "#f97316"
  primary-muted: "#fb923c"
  on-primary: "#ffffff"
  secondary: "#0369a1"
  secondary-soft: "#f0f9ff"
  secondary-border: "#bae6fd"
  background: "#ffffff"
  background-muted: "#f9fafb"
  surface: "#ffffff"
  surface-elevated: "#ffffff"
  hero-from: "#fffbeb"
  hero-via: "#ffffff"
  hero-to: "#f0f9ff"
  foreground: "#111827"
  foreground-muted: "#374151"
  foreground-subtle: "#4b5563"
  border: "#e5e7eb"
  border-strong: "#d1d5db"
  focus-ring: "#fb923c"
  dark-background: "#030712"
  dark-surface: "#111827"
  dark-surface-elevated: "#1f2937"
  dark-foreground: "#ffffff"
  dark-foreground-muted: "#e5e7eb"
  dark-border: "#1f2937"
  logo-mark: "#f97316"
  logo-field: "#111827"
typography:
  h1:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.25
  h3:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  eyebrow:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.025em
  nav:
    fontFamily: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  page-x: 16px
  section-y: 48px
  content-max: 72rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    typography: label
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.8)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skip-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
---

# CalcFuel DESIGN.md

> Product design intent for AI design / coding agents. Site: https://calcfuel.com  
> Companion crawl maps: [llms.txt](https://calcfuel.com/llms.txt) · [llms-full.txt](https://calcfuel.com/llms-full.txt)

## Overview

CalcFuel is a practical Australian transport and trip-cost product. The UI should feel **clear, trustworthy, and calculator-first** — not marketing-agency flashy, not fintech neon, not dark-mode-only. Light surfaces dominate; orange is the action accent; sky/amber appear only as soft hero and info washes.

Users arrive to answer a real cost question (boat trip fuel, tow penalty, commute spend, EV vs petrol). Layouts prioritise: (1) short problem statement, (2) a focused input card, (3) readable numeric results with units (L, km, A$), (4) methodology / assumptions nearby — never buried.

Locale defaults: **en-AU**, litres per 100 km, kilometres, Australian dollars. Prefer plain language over jargon. Dark mode mirrors the same hierarchy with gray-950 / gray-900 surfaces and orange-400 accents.

Brand mark: dark charcoal field (`#111827`) with an orange circle (`#f97316`) and white wordmark — use sparingly in headers, not as page wallpaper.

## Colors

### Foundation
- **Background** `{colors.background}` — default page canvas.
- **Muted band** `{colors.background-muted}` — stats strips, soft section bands.
- **Foreground** `{colors.foreground}` — headings and primary numbers.
- **Muted text** `{colors.foreground-muted}` / `{colors.foreground-subtle}` — body, captions, nav.
- **Borders** `{colors.border}` / `{colors.border-strong}` — cards, inputs, sticky header rule.

### Accent & interactive
- **Primary action** `{colors.primary}` (`orange-700`) — primary buttons, active segmented controls, key chart fills.
- **Primary hover** `{colors.primary-hover}` (`orange-800`).
- **Soft orange** `{colors.primary-soft}` — logo mark, selected chip borders.
- **Focus ring** `{colors.focus-ring}` (`orange-400`) — inputs `focus:ring-2`.
- **Info / secondary** `{colors.secondary}` + soft sky surfaces for notices and data callouts (not CTAs).

### Hero wash
Hero backgrounds use a gentle diagonal wash: amber-50 → white → sky-50 (dark: gray-950 → gray-900 → slate). Keep saturation low so calculator CTAs remain the loudest orange on the page.

### Dark mode
Background `{colors.dark-background}`, sticky header/surface `{colors.dark-surface}`, cards `{colors.dark-surface-elevated}`, text white / gray-200, borders gray-800. Replace orange-700 accents with orange-400 for links and hovers.

## Typography

System UI sans stack only — no display or serif faces. Hierarchy is weight + size, not font swaps.

| Role | Size | Weight | Use |
|---|---|---|---|
| H1 | ~3rem (md: 3rem / mobile slightly smaller) | 700 | Homepage / hub titles |
| Page H1 | ~2.25–2.5rem | 700 | Calculator and guide titles |
| H2 | 1.5rem | 700 | Section heads |
| H3 / card title | 1.25rem | 700 | Tool cards, result blocks |
| Body large | 1.125rem | 400 | Hero subcopy |
| Body | 1rem | 400 | Prose, results notes |
| Label / nav | 0.875rem | 500–600 | Form labels, nav links, eyebrows |

Eyebrow labels above heroes use semibold orange text (`text-orange-700` / dark `orange-400`), tracking slightly wide. Prose pages may use a gray prose class; keep line length comfortable inside `max-w-4xl` for articles and `max-w-6xl` for app chrome.

## Layout

- **Content width:** `max-w-6xl` (~72rem) for app shell; `max-w-4xl` for long-form.
- **Horizontal padding:** `px-4` (16px) everywhere.
- **Sticky header:** white / dark-gray surface, bottom border, logo left, text nav right (lg+); compact menu button on small screens.
- **Page rhythm:** hero → trust/stats strip → tool grid or calculator card → related hubs → footer.
- **Calculator pages:** title + short description → mode chips → single elevated input card (`rounded-2xl`, border, padding 24–32px) → results below or beside on wide screens.
- **Grids:** 2-col mobile, 4-col md for homepage stats; tool cards wrap with generous gap.
- **Skip link:** visually hidden until focus; fixed top-left, bordered white chip.

## Elevation & Depth

Flat product UI. Depth comes from **1px borders** and light surface shifts, not heavy shadows.

- Cards: border + white/dark elevated fill; optional soft shadow only if needed for floating panels.
- Sticky header sits above content (`z-50`); skip link higher (`z-[100]`).
- Hero depth is gradient wash only — no photo backgrounds required for core pages.

## Shapes

- Buttons / inputs / chips: `{rounded.md}` (8px) to `{rounded.lg}` (12px).
- Calculator cards: `{rounded.xl}` (16px).
- Logo field: 16px corner radius on the SVG mark.
- Avoid pill-only UIs except optional full-round badges; primary CTAs are rounded-lg rectangles, not capsules.

## Components

### Buttons
- **Primary:** orange-700 fill, white text, semibold, px-5 py-3, hover orange-800.
- **Secondary:** translucent white / dark gray fill, gray border, hover border shifts toward orange.
- **Segmented / chip active:** orange-700 fill + white text; inactive: gray text, gray border, hover muted fill.

### Inputs
- Full width inside cards; gray border; rounded-lg; px-4 py-2.
- Dark: dark-gray fill, light text.
- Focus: orange-400 ring, no thick browser outline.
- Labels above fields: 0.875rem medium gray.

### Cards & calculator shell
- White (dark: gray-800) panel, gray border, rounded-2xl, internal stacking of title → helper text → controls → compute.

### Navigation
- Text links, not buttons; medium weight; hover to orange.
- Mobile: bordered “Menu” control instead of icon-only hamburger if that matches live chrome.

### Notices
- Sky-tinted info banners for data freshness / methodology pointers.
- Do not style ads or affiliate disclosures as primary CTAs.

### Results
- Large bold numerals for costs and litres; unit labels in muted text.
- Charts: orange and sky fills on gray axes; keep legends readable.

## Do's and Don'ts

**Do**
- Lead with the decision the calculator answers.
- Show units and AU assumptions near inputs and outputs.
- Keep primary orange reserved for actions and key highlights.
- Support light + dark with the same structure.
- Link related hubs (Marine, Towing, Vehicles, Trip Planning) with quiet text links.

**Don't**
- Introduce third-party agency, “book a call”, free-audit, or cross-sell CTAs — this surface is CalcFuel product only.
- Use pure black (#000) large fills or neon gradients.
- Overload pages with multiple competing primary buttons.
- Invent a second brand palette (purple/green fintech) for experiments.
- Replace system sans with decorative display fonts for body UI.
- Hide methodology; fuel maths should feel inspectable.

## Agent generation notes

When generating a new CalcFuel page or component:

1. Start from white (or dark-950) canvas, `max-w-6xl` shell, sticky header pattern.
2. One primary orange CTA per view; secondary outline for alternates.
3. Put interactive inputs inside a single bordered rounded-2xl card.
4. Use en-AU copy; prefer “petrol”, “litres”, “kilometres”, “A$”.
5. After layout, verify focus rings and skip link remain keyboard-visible.
6. For crawl/context files use `llms.txt` / `llms-full.txt`; this file is **visual intent only**.
