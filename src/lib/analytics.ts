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

// Existing — kept for backwards compat
export function trackCalculation(calculatorName: string, inputs: Record<string, number | string>) {
  ga("calculation_performed", { calculator_name: calculatorName, ...inputs });
}

export function trackCalculatorView(calculatorName: string, category: string) {
  ga("calculator_view", { calculator_name: calculatorName, calculator_category: category });
}

// Product CTA click — fired when user clicks any Stripe/Gumroad product link
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
