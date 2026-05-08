# CalcFuel Brand Guide

## Logo Assets

All brand assets live in `/public/images/`.

| File | Purpose | Dimensions | Notes |
|------|---------|------------|-------|
| `logo.png` | Primary logo with wordmark | Horizontal | Calculator-rocket icon + "calcfuel.com" text. Use in header, footer, and anywhere the brand name appears with an icon. |
| `icon.png` | Favicon / app icon | Square (circular badge) | Simplified rocket in a blue circle border. Use for favicon, apple-touch-icon, PWA icon, and small square placements. |
| `social-card.png` | Social sharing / OG image | Landscape | Product Hunt launch card. Use as the default Open Graph image for social sharing. Contains promotional copy — suited for launch period. |

## Brand Colors

Extracted from the logo assets:

| Role | Color | Hex (approx) | Usage |
|------|-------|--------------|-------|
| Primary Blue | Dark steel blue | `#1565A0` | "calc" text, rocket body, circle border, headings, primary UI elements |
| Primary Orange | Vibrant orange | `#E8682A` | "fuel.com" text, rocket flame, CTAs, hover states, accent elements |
| White | Background | `#FFFFFF` | Page backgrounds, card backgrounds |
| Dark Gray | Text | `#111827` | Body text (light mode) |
| Light Gray | Secondary text | `#6B7280` | Descriptions, captions |

### Dark Mode
- Background: `#0A0A0A` (current)
- Text: `#F9FAFB`
- Cards: `#111827`

## Typography

- **Font family:** System stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- **Headings:** Bold, gray-900 (light) / white (dark)
- **Body:** Regular, gray-600 (light) / gray-300 (dark)

## Logo Usage

- **Header:** `logo.png` displayed at ~32-40px height, replacing the current emoji + text
- **Footer:** Same logo at ~28px height
- **Favicon:** Generated from `icon.png` — create ICO and apple-touch-icon variants
- **OG/Social:** `social-card.png` as default Open Graph image in metadata

## Brand Voice

- **Tagline:** "Free calculators for smarter decisions"
- **Tone:** Direct, helpful, no-nonsense. The brand is a utility — fast, free, trustworthy.
- **No sign-up messaging:** Always emphasize "free, no sign-up required"

## Color Application in UI

- **Category card borders on hover:** Orange (`border-orange-400`) — keep this pattern
- **CTA text:** Orange-500 — keep this pattern  
- **Navigation hover:** Orange-500 — keep this pattern
- **Primary buttons (if added):** Blue background with white text, or orange background with white text
- **Links:** Orange-500 for action links, blue for informational links

## Do Not

- Stretch or distort the logo
- Use the logo smaller than 24px height
- Place the logo on busy backgrounds without sufficient contrast
- Change the logo colors
- Use the Product Hunt social card as a permanent hero image (it contains launch-specific copy)
