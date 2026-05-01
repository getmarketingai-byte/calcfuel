"use client";
import { useEffect } from "react";

interface AdSenseUnitProps {
  slot: string;
  format?: string;
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

export default function AdSenseUnit({ slot, format = "auto", layout, style, className = "" }: AdSenseUnitProps) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* not loaded */ }
  }, []);
  return (
    <div className={`overflow-hidden ${className}`}>
      <ins className="adsbygoogle" style={{ display: "block", ...style }}
        data-ad-client="ca-pub-7076137753154472"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : { "data-full-width-responsive": "true" })} />
    </div>
  );
}
