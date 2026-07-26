"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { SUGGEST_CATEGORIES } from "@/lib/suggest/types";

export const EMAIL_STORAGE_KEY = "calcfuel_suggest_email";

const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400";

type SuggestCalculatorFormProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmitted?: (suggestionId: string) => void;
};

export default function SuggestCalculatorForm({
  email,
  onEmailChange,
  onSubmitted,
}: SuggestCalculatorFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [useCase, setUseCase] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          title,
          description,
          category,
          useCase,
          website,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const normalized = email.trim().toLowerCase();
      onEmailChange(normalized);
      try {
        localStorage.setItem(EMAIL_STORAGE_KEY, normalized);
      } catch {
        // ignore
      }

      trackEvent("calculator_suggestion_submitted", {
        category: category || "unspecified",
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setUseCase("");
      setWebsite("");
      setStatus("success");
      if (data.id) onSubmitted?.(data.id);
      else onSubmitted?.("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/40 p-6"
        role="status"
      >
        <p className="font-semibold text-gray-900 dark:text-white mb-2">
          Thanks — your suggestion is on the board.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We review popular ideas and build the ones that help the most people. You can upvote
          other suggestions below.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          Suggest another calculator
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="suggest-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="suggest-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Used only to limit one vote per person. Not shown publicly.
        </p>
      </div>

      <div>
        <label htmlFor="suggest-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Calculator name
        </label>
        <input
          id="suggest-title"
          type="text"
          required
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="e.g. Podcast Ad ROI Calculator"
        />
      </div>

      <div>
        <label htmlFor="suggest-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          What should it calculate?
        </label>
        <textarea
          id="suggest-description"
          required
          maxLength={2000}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          placeholder="Describe the inputs, formula, or result you need."
        />
      </div>

      <div>
        <label htmlFor="suggest-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <select
          id="suggest-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="">Select a category</option>
          {SUGGEST_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="suggest-usecase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Use case <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          id="suggest-usecase"
          maxLength={1000}
          rows={3}
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          className={inputClass}
          placeholder="Who would use this, and why does it help?"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="suggest-website">Website</label>
        <input
          id="suggest-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium px-5 py-2.5 transition-colors"
      >
        {status === "loading" ? "Submitting…" : "Submit suggestion"}
      </button>
    </form>
  );
}
