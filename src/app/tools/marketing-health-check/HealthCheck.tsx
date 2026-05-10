"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trackQuizComplete } from "@/lib/analytics";

const QUESTIONS = [
  {
    id: 1,
    question: "Do you have clearly defined marketing goals tied to business outcomes (e.g., revenue targets, lead volume)?",
    yes: "Great — goal clarity is the foundation of effective marketing measurement.",
    no: "Define 2–3 SMART marketing goals tied directly to revenue or growth targets.",
  },
  {
    id: 2,
    question: "Do you have a documented Ideal Customer Profile (ICP) or buyer persona?",
    yes: "Solid foundation — knowing your audience drives better targeting and messaging.",
    no: "Document your top 1–2 customer types with demographics, pain points, and buying triggers.",
  },
  {
    id: 3,
    question: "Do you track marketing ROI or cost per acquisition across your main channels?",
    yes: "ROI tracking puts you ahead of most businesses — keep refining attribution.",
    no: "Start with simple UTM tracking and connect your ad spend to revenue data in your CRM.",
  },
  {
    id: 4,
    question: "Do you have an email list of at least 100 opted-in subscribers?",
    yes: "Email is your highest-ROI owned channel — keep growing and nurturing it.",
    no: "Add an email capture form to your website and offer a lead magnet to start building your list.",
  },
  {
    id: 5,
    question: "Do you publish content consistently (blog posts, social media, or video at least once per week)?",
    yes: "Consistency is the key driver of long-term organic growth — well done.",
    no: "Create a simple content calendar and commit to one piece of content per week to build momentum.",
  },
  {
    id: 6,
    question: "Do you run any form of paid advertising (Google Ads, Meta Ads, LinkedIn, etc.)?",
    yes: "Paid channels accelerate growth when ROI is positive — ensure you are measuring it.",
    no: "Consider starting with a small test budget ($10–20/day) on the platform your customers use most.",
  },
  {
    id: 7,
    question: "Do you have an active presence on at least one social media platform relevant to your audience?",
    yes: "Social proof and organic reach are valuable — focus on depth on one platform over breadth across many.",
    no: "Choose the single platform where your ideal customer spends the most time and post consistently there.",
  },
  {
    id: 8,
    question: "Do you use a CRM or contact management system to track leads and customer interactions?",
    yes: "A CRM is the backbone of scalable marketing — use it to measure and improve your sales process.",
    no: "Start with a free CRM (HubSpot or Notion) to track leads from first contact to closed deal.",
  },
  {
    id: 9,
    question: "Have you A/B tested any marketing element (email subject lines, ad creative, landing page headlines) in the past 6 months?",
    yes: "Testing culture is a significant competitive advantage — scale your testing cadence.",
    no: "Run one A/B test this month — start with email subject lines or your homepage headline.",
  },
  {
    id: 10,
    question: "Do you have a documented marketing plan or calendar for the next 90 days?",
    yes: "Planning ahead prevents reactive marketing — review and update quarterly.",
    no: "Block 2 hours to map out your marketing activities for the next 90 days. Even a simple spreadsheet beats no plan.",
  },
];

type Answer = "yes" | "no" | null;

const PRODUCT_CTAS = {
  low: {
    emoji: "🚀",
    headline: "Get our 50 Marketing Prompts to fix your marketing",
    body: "50 AI marketing prompts across 7 categories — email, social, SEO, ads, content, and more. Fix the gaps fast.",
    cta: "Get the 50 Prompts — $19 AUD →",
    href: "https://buy.stripe.com/00wcN77Zr2tH36z15gbsc0c",
    bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    btnClass: "bg-red-500 hover:bg-red-600",
  },
  medium: {
    emoji: "📚",
    headline: "Level up with the AI Agent Playbook",
    body: "15-page guide covering AI agent archetypes, prompts, tool config, model selection, and a 30-day launch plan.",
    cta: "Get the Playbook — $15 AUD →",
    href: "https://buy.stripe.com/5kQeVfcfH0lzgXp01cbsc0f",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    btnClass: "bg-blue-500 hover:bg-blue-600",
  },
  high: {
    emoji: "🎯",
    headline: "Ready for advanced tactics? Get the Everything Bundle",
    body: "All three products: AI Agent Prompts, AI Agent Playbook, and 50 Marketing Prompts. Everything you need to scale.",
    cta: "Get Everything — $39 AUD →",
    href: "https://buy.stripe.com/9B6aEZ93v1pDdLddS2bsc0j",
    bg: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    btnClass: "bg-green-600 hover:bg-green-700",
  },
};

const PAGE_URL = "https://calcfuel.com/tools/marketing-health-check";

function getProductCTA(scorePct: number) {
  if (scorePct <= 40) return PRODUCT_CTAS.low;
  if (scorePct <= 70) return PRODUCT_CTAS.medium;
  return PRODUCT_CTAS.high;
}

function getScoreLabel(s: number) {
  if (s >= 9) return { label: "Excellent — your marketing foundation is strong", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" };
  if (s >= 7) return { label: "Good — a few gaps to close for sustained growth", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" };
  if (s >= 5) return { label: "Fair — solid starting point, prioritise the fundamentals", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800" };
  if (s >= 3) return { label: "Developing — significant opportunity to strengthen your marketing", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" };
  return { label: "Early stage — focus on the foundations before scaling", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" };
}

function ShareButtons({ scorePct }: { scorePct: number }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${PAGE_URL}?score=${scorePct}`;
  const shareText = `I scored ${scorePct}/100 on my Marketing Health Score! Check yours: ${shareUrl}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${scorePct}/100 on my Marketing Health Score! Check yours:`)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Share your score</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X / Twitter
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a
          href={blueskyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>
          Bluesky
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2-2v8a2 2 0 002 2z" /></svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function HealthCheck() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sharedScore, setSharedScore] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("score");
    if (s !== null) {
      const n = parseInt(s, 10);
      if (!isNaN(n) && n >= 0 && n <= 100) {
        setSharedScore(n);
      }
    }
  }, []);

  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter(a => a === "yes").length; // 0-10
  const scorePct = score * 10; // 0-100

  const handleAnswer = (id: number, answer: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.history.replaceState({}, "", `?score=${scorePct}`);
    trackQuizComplete("marketing_health_check", scorePct);
  };

  const weakAreas = QUESTIONS.filter(q => answers[q.id] === "no");

  // Show results: own quiz OR viewing shared link
  const isViewingShared = sharedScore !== null && !submitted;
  const showResults = (submitted && answered === 10) || isViewingShared;

  if (showResults) {
    const displayPct = submitted ? scorePct : sharedScore!;
    const displayScore10 = Math.round(displayPct / 10); // back to /10 for label
    const { label, color, bg } = getScoreLabel(displayScore10);
    const cta = getProductCTA(displayPct);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Marketing Health Score</h2>

        {isViewingShared && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200">
            You are viewing a shared result. <Link href="/tools/marketing-health-check" className="font-semibold underline">Take the quiz yourself →</Link>
          </div>
        )}

        <div className={`p-6 rounded-xl border mb-6 ${bg}`}>
          <p className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {displayPct}<span className="text-2xl text-gray-500">/100</span>
          </p>
          <p className={`text-lg font-semibold ${color}`}>{label}</p>
        </div>

        {/* Share buttons */}
        <ShareButtons scorePct={displayPct} />

        {/* Product CTA */}
        <div className={`mt-6 p-5 rounded-xl border ${cta.bg}`}>
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{cta.emoji} {cta.headline}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cta.body}</p>
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors ${cta.btnClass}`}
          >
            {cta.cta}
          </a>
        </div>

        {/* Weak areas (own quiz only) */}
        {!isViewingShared && weakAreas.length > 0 && (
          <div className="mt-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Priority Recommendations</h3>
            <div className="space-y-3">
              {weakAreas.map(q => (
                <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-orange-400">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Q{q.id}: {q.question}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{q.no}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {displayPct <= 70 && (
          <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="font-bold text-gray-900 dark:text-white mb-3">Explore related calculators</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/calculators/marketing-roi-calculator" className="text-orange-500 hover:underline">Marketing ROI Calculator</a></li>
              <li><a href="/calculators/email-open-rate-calculator" className="text-orange-500 hover:underline">Email Open Rate Calculator</a></li>
              <li><a href="/calculators/roas-calculator" className="text-orange-500 hover:underline">ROAS Calculator</a></li>
              <li><a href="/calculators/social-media-roi-calculator" className="text-orange-500 hover:underline">Social Media ROI Calculator</a></li>
            </ul>
          </div>
        )}

        {!isViewingShared && (
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); window.history.replaceState({}, "", window.location.pathname); }}
            className="mt-6 text-sm text-orange-500 hover:underline"
          >
            ← Retake the quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Marketing Health Check</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Answer 10 questions to get your marketing health score and personalised recommendations.</p>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{answered} of 10 answered</span>
          <span>{Math.round((answered / 10) * 100)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="h-2 rounded-full bg-orange-500 transition-all duration-200" style={{ width: `${(answered / 10) * 100}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, i) => (
          <div key={q.id} className={`p-4 rounded-xl border transition-all ${answers[q.id] ? "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/30" : "border-gray-200 dark:border-gray-700"}`}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <span className="inline-block w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold text-center leading-6 mr-2">{i + 1}</span>
              {q.question}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleAnswer(q.id, "yes")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  answers[q.id] === "yes"
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(q.id, "no")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  answers[q.id] === "no"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-red-400"
                }`}
              >
                No
              </button>
            </div>
            {answers[q.id] && (
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
                {answers[q.id] === "yes" ? q.yes : q.no}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={answered < 10}
        className={`mt-8 w-full py-3 rounded-xl font-semibold text-white transition-all ${
          answered === 10
            ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500"
        }`}
      >
        {answered === 10 ? "See My Health Score →" : `Answer all questions (${10 - answered} remaining)`}
      </button>
    </div>
  );
}
