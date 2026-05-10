"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  source?: string; // which page/tool triggered the opt-in
  headline?: string;
  subtext?: string;
}

export default function EmailOptIn({
  source = "calcfuel",
  headline = "Get 10 free AI marketing prompts",
  subtext = "Join 500+ small business owners. Instant delivery, no spam.",
}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("success");
        trackEvent("email_opt_in", { source });
      } else {
        setState("error");
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Connection error. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-6 text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">You&apos;re in!</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Check your inbox for your free prompts. While you wait —
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Get all 50 prompts for $19 →
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-6">
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{headline}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{subtext}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="First name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {state === "error" && (
          <p className="text-xs text-red-500">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={state === "loading" || !email}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {state === "loading" ? "Sending…" : "Send me the free prompts →"}
        </button>
      </form>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-center">
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
