"use client";
import { useState, useEffect } from "react";

const ACCOUNT_ID = "2282416";
const FORM_ID = "185339817098216933";
const GROUP_ID = "185339792113796232";
const STORAGE_KEY = "calcfuel_email_banner_dismissed";
const DISMISS_DAYS = 7;

function isDismissed(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (!val) return false;
    const ts = parseInt(val, 10);
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

type BannerState = "hidden" | "visible" | "submitted" | "dismissed";

export default function EmailCaptureBanner() {
  const [state, setState] = useState<BannerState>("hidden");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDismissed()) return;

    let triggered = false;

    // Trigger after 10 seconds
    const timer = setTimeout(() => {
      if (!triggered && !isDismissed()) {
        triggered = true;
        setState("visible");
      }
    }, 10000);

    // Trigger after 50% scroll
    function onScroll() {
      if (triggered || isDismissed()) return;
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.5) {
        triggered = true;
        setState("visible");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    setDismissed();
    setState("dismissed");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    subscribeViaJSONP(trimmed);
  }

  function subscribeViaJSONP(emailAddr: string) {
    const callbackName = "ml_banner_cb_" + Date.now();
    const endpoint = `https://assets.mailerlite.com/jsonp/${ACCOUNT_ID}/forms/${FORM_ID}/subscribe`;
    const params = new URLSearchParams({
      callback: callbackName,
      "fields[email]": emailAddr,
      "groups[]": GROUP_ID,
      "ml-submit": "1",
    });

    (window as Record<string, unknown>)[callbackName] = () => {
      cleanup();
      setLoading(false);
      setState("submitted");
      setDismissed();
    };

    let timeout: ReturnType<typeof setTimeout>;

    function cleanup() {
      clearTimeout(timeout);
      delete (window as Record<string, unknown>)[callbackName];
      const s = document.getElementById(callbackName);
      if (s) s.remove();
    }

    // Fallback: treat as success after 8s (MailerLite may not always fire callback)
    timeout = setTimeout(() => {
      cleanup();
      setLoading(false);
      setState("submitted");
      setDismissed();
    }, 8000);

    const script = document.createElement("script");
    script.id = callbackName;
    script.src = `${endpoint}?${params.toString()}`;
    script.onerror = () => {
      cleanup();
      setLoading(false);
      // Still show success — submission likely went through even if script errored
      setState("submitted");
      setDismissed();
    };
    document.head.appendChild(script);
  }

  if (state === "hidden" || state === "dismissed") return null;

  return (
    <div
      role="dialog"
      aria-label="Email sign-up"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        state === "visible" || state === "submitted"
          ? "translate-y-0"
          : "translate-y-full"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl px-4 py-4 md:py-5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {state === "submitted" ? (
            <>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  You&apos;re in! Check your inbox for a confirmation email.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  We&apos;ll send you free marketing tips and tool updates.
                </p>
              </div>
              <button
                onClick={dismiss}
                className="shrink-0 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
              >
                Close
              </button>
            </>
          ) : (
            <>
              {/* Text */}
              <div className="shrink-0 text-center sm:text-left">
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  Get free marketing tips + tool updates
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto"
                noValidate
              >
                <div className="flex-1 min-w-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                    aria-label="Email address"
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1" role="alert">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {loading ? "Subscribing…" : "Subscribe — Free"}
                </button>
              </form>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                aria-label="Close"
                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none self-start sm:self-center"
              >
                ×
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
