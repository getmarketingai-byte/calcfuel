"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PROMOS = [
  {
    emoji: "🚀",
    label: "50 AI Marketing Prompts",
    price: "$19 AUD",
    cta: "Get the Prompt Pack →",
    href: "https://marketgenius4.gumroad.com/l/crtwc?utm_source=calcfuel&utm_medium=banner",
  },
  {
    emoji: "📚",
    label: "AI Agent Playbook",
    price: "$15 AUD",
    cta: "Get the Playbook →",
    href: "https://marketing-ai-psi-nine.vercel.app/playbook/download?utm_source=calcfuel&utm_medium=banner",
  },
  {
    emoji: "⚡",
    label: "10 AI Agent Prompts",
    price: "$5 AUD",
    cta: "Get the Prompts →",
    href: "https://marketgenius4.gumroad.com/l/gsgysx?utm_source=calcfuel&utm_medium=banner",
  },
  {
    emoji: "🎁",
    label: "5 Free AI Marketing Prompts",
    price: "Free",
    cta: "Download free →",
    href: "https://marketgenius4.gumroad.com/l/free-ai-prompts?utm_source=calcfuel&utm_medium=banner",
  },
];

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);

  // Rotate promos every 8 seconds
  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setPromoIndex((i) => (i + 1) % PROMOS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const promo = PROMOS[promoIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-orange-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm font-medium flex-1 min-w-0 truncate">
          {promo.emoji}{" "}
          <span className="hidden sm:inline">{promo.label} — </span>
          <strong>{promo.price}</strong>
          {promo.price === "Free" && (
            <span className="hidden sm:inline">. No catch.</span>
          )}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={promo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap"
          >
            {promo.cta}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-white/80 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
