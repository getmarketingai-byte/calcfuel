"use client";

import { useState } from "react";
import Link from "next/link";

const GUMROAD_URL =
  "https://marketgenius4.gumroad.com/l/crtwc?utm_source=calcfuel&utm_medium=banner";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-orange-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm font-medium flex-1 min-w-0 truncate">
          🚀{" "}
          <span className="hidden sm:inline">
            50 AI Marketing Prompts for Australian SMBs —
          </span>{" "}
          <span className="sm:hidden">AI Marketing Prompts — </span>
          <strong>$19 AUD</strong>
          <span className="hidden sm:inline">. Copy. Paste. Grow.</span>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap"
          >
            Get the Prompt Pack →
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
