"use client";
import { useEffect } from "react";

interface AdSenseUnitProps {
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

export default function AdSenseUnit({ format = "auto", style, className = "" }: AdSenseUnitProps) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* not loaded */ }
  }, []);
  return (
    <div className={`overflow-hidden ${className}`}>
      <ins className="adsbygoogle" style={{ display: "block", ...style }}
        data-ad-client="ca-pub-7076137753154472"
        data-ad-slot="auto"
        data-ad-format={format}
        data-full-width-responsive="true" />
    </div>
  );
}
