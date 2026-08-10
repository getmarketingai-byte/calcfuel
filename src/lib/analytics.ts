"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function ga(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

/**
 * Category hub paths under /calculators/* that list tools but do not
 * themselves run a calculation. Exclude these from GA4 "pages visited
 * without calculation" reports — sessions here cannot fire
 * calculation_performed unless a mini-calc is embedded on the hub.
 */
export const CALCULATOR_HUB_PATHS = [
  "/calculators/social-media",
  "/calculators/email-marketing",
  "/calculators/financial",
  "/calculators/conversion",
  "/calculators/seo-tools",
  "/calculators/fuel-energy",
  "/calculators/marketplace-fees",
  "/calculators/ai-developer-tools",
] as const;

export function isCalculatorHubPath(path: string): boolean {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return (CALCULATOR_HUB_PATHS as readonly string[]).includes(normalized);
}

// Existing — kept for backwards compat
export function trackCalculation(
  calculatorName: string,
  inputs: Record<string, number | string | boolean>
) {
  ga("calculation_performed", { calculator_name: calculatorName, ...inputs });
}

export function trackCalculatorView(calculatorName: string, category: string) {
  ga("calculator_view", { calculator_name: calculatorName, calculator_category: category });
}

/** Hub card click — use instead of treating hub pageviews as calc drop-off */
export function trackHubToolClick(hub: string, toolSlug: string, href: string) {
  const props = { hub, tool_slug: toolSlug, href };
  try { track("hub_tool_click", props); } catch {}
  ga("hub_tool_click", props);
}

// Generic event tracker — used by interactive components
export function trackProductCTAClick(product: string, price: string, page?: string) {
  const props = { product, price, ...(page ? { page } : {}) };
  try { track("product_cta_click", props); } catch {}
  ga("product_cta_click", props);
}

// Quiz / health check completion
export function trackQuizComplete(tool: string, score: number) {
  const props = { tool, score };
  try { track("quiz_complete", props); } catch {}
  ga("quiz_complete", props);
}

// Generic event tracker — used by EmailOptIn and other components
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  try { track(name, props); } catch {}
  ga(name, props);
}
