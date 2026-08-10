"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function ga(event: string, params?: AnalyticsParams) {
  if (typeof window !== "undefined" && window.gtag) {
    const cleaned: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) cleaned[k] = v;
      }
    }
    window.gtag("event", event, cleaned);
  }
}

function dual(event: string, params?: AnalyticsParams) {
  const cleaned: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) cleaned[k] = v;
    }
  }
  try {
    track(event, cleaned);
  } catch {
    /* ignore */
  }
  ga(event, cleaned);
}

export const CALCULATOR_HUB_PATHS = [
  "/calculators/social-media",
  "/calculators/email-marketing",
  "/calculators/financial",
  "/calculators/conversion",
  "/calculators/seo-tools",
  "/calculators/fuel-energy",
  "/calculators/marketplace-fees",
  "/calculators/ai-developer-tools",
  "/marine",
  "/towing",
  "/vehicles",
  "/trip-planning",
] as const;

export function isCalculatorHubPath(path: string): boolean {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return (CALCULATOR_HUB_PATHS as readonly string[]).includes(normalized);
}

/** @deprecated Prefer trackCalculationPerformed with structured params. */
export function trackCalculation(
  calculatorName: string,
  inputs: Record<string, number | string | boolean>
) {
  dual("calculation_performed", {
    calculator_id: calculatorName,
    calculator_name: calculatorName,
    ...inputs,
  });
}

export function trackCalculationPerformed(
  calculatorId: string,
  params?: AnalyticsParams
) {
  dual("calculation_performed", { calculator_id: calculatorId, ...params });
}

export function trackCalculatorView(calculatorId: string, params?: AnalyticsParams) {
  dual("calculator_view", { calculator_id: calculatorId, ...params });
}

export function trackCalculatorStart(calculatorId: string, params?: AnalyticsParams) {
  dual("calculator_start", { calculator_id: calculatorId, ...params });
}

export function trackResultView(calculatorId: string, params?: AnalyticsParams) {
  dual("result_view", { calculator_id: calculatorId, ...params });
}

export function trackScenarioComparison(calculatorId: string, params?: AnalyticsParams) {
  dual("scenario_comparison", { calculator_id: calculatorId, ...params });
}

export function trackRelatedToolClick(fromId: string, toHref: string) {
  dual("related_tool_click", { calculator_id: fromId, href: toHref });
}

export function trackGuideClick(guideSlug: string, from?: string) {
  dual("guide_click", { guide_slug: guideSlug, ...(from ? { from } : {}) });
}

export function trackCommercialCtaView(kind: string, placement: string) {
  dual("commercial_cta_view", { kind, placement });
}

export function trackCommercialCtaClick(kind: string, placement: string) {
  dual("commercial_cta_click", { kind, placement });
}

export function trackAffiliateImpression(offerId: string) {
  dual("affiliate_impression", { offer_id: offerId });
}

export function trackAffiliateClick(offerId: string) {
  dual("affiliate_click", { offer_id: offerId });
}

export function trackShareResult(calculatorId: string) {
  dual("share_result", { calculator_id: calculatorId });
}

export function trackEmailSignup(source: string) {
  dual("email_signup", { source });
}

export function trackPremiumFeatureClick(feature: string) {
  dual("premium_feature_click", { feature });
}

export function trackHubToolClick(hub: string, toolSlug: string, href: string) {
  dual("hub_tool_click", { hub, tool_slug: toolSlug, href });
}

export function trackProductCTAClick(product: string, price: string, page?: string) {
  dual("product_cta_click", { product, price, ...(page ? { page } : {}) });
}

export function trackQuizComplete(tool: string, score: number) {
  dual("quiz_complete", { tool, score });
}

export function trackEvent(name: string, props?: AnalyticsParams) {
  dual(name, props);
}
