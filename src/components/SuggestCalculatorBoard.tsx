"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { PublicSuggestion } from "@/lib/suggest/types";
import SuggestCalculatorForm, { EMAIL_STORAGE_KEY } from "./SuggestCalculatorForm";

const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function SuggestCalculatorBoard() {
  const [suggestions, setSuggestions] = useState<PublicSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [email, setEmail] = useState("");
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [votingId, setVotingId] = useState<string | null>(null);
  const [voteError, setVoteError] = useState("");
  const [voteWebsite, setVoteWebsite] = useState("");

  const loadSuggestions = useCallback(async () => {
    setLoadError("");
    try {
      const res = await fetch("/api/suggest");
      const data = (await res.json()) as {
        suggestions?: PublicSuggestion[];
        error?: string;
      };
      if (!res.ok) {
        setLoadError(data.error || "Unable to load suggestions.");
        return;
      }
      setSuggestions(data.suggestions ?? []);
    } catch {
      setLoadError("Unable to load suggestions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSuggestions();
    try {
      const saved = localStorage.getItem(EMAIL_STORAGE_KEY);
      if (saved) setEmail(saved);
      const votedRaw = localStorage.getItem("calcfuel_suggest_voted");
      if (votedRaw) {
        const parsed = JSON.parse(votedRaw) as string[];
        if (Array.isArray(parsed)) setVotedIds(new Set(parsed));
      }
    } catch {
      // ignore
    }
  }, [loadSuggestions]);

  function persistVoted(next: Set<string>) {
    setVotedIds(next);
    try {
      localStorage.setItem("calcfuel_suggest_voted", JSON.stringify([...next]));
    } catch {
      // ignore
    }
  }

  async function handleVote(e: FormEvent, id: string) {
    e.preventDefault();
    setVoteError("");

    if (!email.trim()) {
      setVoteError("Enter your email to upvote.");
      return;
    }

    setVotingId(id);
    try {
      const res = await fetch("/api/suggest/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email, website: voteWebsite }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        votes?: number;
        error?: string;
      };

      if (res.status === 409) {
        const next = new Set(votedIds);
        next.add(id);
        persistVoted(next);
        setVoteError("You have already voted for this suggestion.");
        return;
      }

      if (!res.ok || !data.ok) {
        setVoteError(data.error || "Unable to record vote.");
        return;
      }

      try {
        localStorage.setItem(EMAIL_STORAGE_KEY, email.trim().toLowerCase());
      } catch {
        // ignore
      }

      const next = new Set(votedIds);
      next.add(id);
      persistVoted(next);

      setSuggestions((prev) =>
        [...prev]
          .map((s) => (s.id === id ? { ...s, votes: data.votes ?? s.votes + 1 } : s))
          .sort((a, b) => b.votes - a.votes)
      );

      trackEvent("calculator_suggestion_upvoted");
    } catch {
      setVoteError("Unable to record vote.");
    } finally {
      setVotingId(null);
    }
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Community suggestions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upvote ideas you want us to build next. One vote per email per suggestion.
            </p>
          </div>
          <div className="sm:w-72">
            <label htmlFor="board-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your email (for voting)
            </label>
            <input
              id="board-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Honeypot shared for vote forms */}
        <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="vote-website">Website</label>
          <input
            id="vote-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={voteWebsite}
            onChange={(e) => setVoteWebsite(e.target.value)}
          />
        </div>

        {voteError && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">
            {voteError}
          </p>
        )}

        {loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading suggestions…</p>
        )}

        {!loading && loadError && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {loadError}
          </p>
        )}

        {!loading && !loadError && suggestions.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No suggestions yet. Be the first to request a calculator below.
            </p>
          </div>
        )}

        {!loading && suggestions.length > 0 && (
          <ul className="space-y-4">
            {suggestions.map((s) => {
              const alreadyVoted = votedIds.has(s.id);
              return (
                <li
                  key={s.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex gap-4 items-start"
                >
                  <form
                    onSubmit={(e) => handleVote(e, s.id)}
                    className="flex flex-col items-center shrink-0 w-16"
                  >
                    <button
                      type="submit"
                      disabled={alreadyVoted || votingId === s.id}
                      className={`w-full rounded-lg border px-2 py-2 text-center transition-colors ${
                        alreadyVoted
                          ? "border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400"
                          : "border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-gray-700 dark:text-gray-200"
                      } disabled:opacity-70`}
                      aria-label={alreadyVoted ? `Voted, ${s.votes} votes` : `Upvote, ${s.votes} votes`}
                    >
                      <span className="block text-lg leading-none" aria-hidden="true">
                        ▲
                      </span>
                      <span className="block text-sm font-semibold mt-1">{s.votes}</span>
                    </button>
                    <span className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
                      {alreadyVoted ? "Voted" : "Upvote"}
                    </span>
                  </form>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {s.title}
                      </h3>
                      {s.category && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {s.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {s.description}
                    </p>
                    {s.useCase && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          Use case:{" "}
                        </span>
                        {s.useCase}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Suggest a calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tell us what tool you need. Popular requests go on our build list.
        </p>
        <SuggestCalculatorForm
          email={email}
          onEmailChange={setEmail}
          onSubmitted={(id) => {
            if (id) {
              setVotedIds((prev) => {
                const next = new Set(prev);
                next.add(id);
                try {
                  localStorage.setItem("calcfuel_suggest_voted", JSON.stringify([...next]));
                } catch {
                  // ignore
                }
                return next;
              });
            }
            loadSuggestions();
          }}
        />
      </section>
    </div>
  );
}
