"use client";
import { useEffect } from "react";

export default function AdSenseLoader() {
  useEffect(() => {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    const s = document.createElement("script");
    s.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7076137753154472";
    s.async = true;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }, []);
  return null;
}
