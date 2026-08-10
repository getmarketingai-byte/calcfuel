"use client";

import { useEffect, useRef } from "react";
import {
  trackCalculatorStart,
  trackCalculatorView,
  trackResultView,
} from "@/lib/analytics";

/** Fires calculator_view on mount; calculator_start once; result_view when hasResult flips true. */
export default function CalculatorLifecycle({
  calculatorId,
  category,
  hasResult,
  unitSystem,
}: {
  calculatorId: string;
  category: string;
  hasResult: boolean;
  unitSystem?: string;
}) {
  const started = useRef(false);
  const resultSeen = useRef(false);

  useEffect(() => {
    trackCalculatorView(calculatorId, {
      category,
      unit_system: unitSystem ?? "",
    });
  }, [calculatorId, category, unitSystem]);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackCalculatorStart(calculatorId, { category, unit_system: unitSystem ?? "" });
    }
  }, [calculatorId, category, unitSystem]);

  useEffect(() => {
    if (hasResult && !resultSeen.current) {
      resultSeen.current = true;
      trackResultView(calculatorId, { category, unit_system: unitSystem ?? "" });
    }
  }, [hasResult, calculatorId, category, unitSystem]);

  return null;
}
