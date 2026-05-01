"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCalculation(calculatorName: string, inputs: Record<string, number | string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "calculation_performed", {
      calculator_name: calculatorName,
      ...inputs,
    });
  }
}

export function trackCalculatorView(calculatorName: string, category: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "calculator_view", {
      calculator_name: calculatorName,
      calculator_category: category,
    });
  }
}
