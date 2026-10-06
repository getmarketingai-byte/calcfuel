"use client";

import { useEffect, useState } from "react";
import { daysSincePricesTo, formatDaysAgo } from "@/lib/fuel-price-cadence";

interface RelativeAgeProps {
  /** ISO calendar date the age is measured from, YYYY-MM-DD. */
  iso: string;
  /**
   * Calendar-day age computed on the server at request/ISR time.
   * The browser replaces it after mount so a long-cached page self-corrects.
   */
  initialDays: number;
}

/**
 * Relative age that matches server HTML on hydrate, then recomputes in the browser.
 * suppressHydrationWarning covers a day boundary crossed between the cached HTML and mount.
 */
export default function RelativeAge({ iso, initialDays }: RelativeAgeProps) {
  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    setDays(daysSincePricesTo(iso));
  }, [iso]);

  return <span suppressHydrationWarning>{formatDaysAgo(days)}</span>;
}
