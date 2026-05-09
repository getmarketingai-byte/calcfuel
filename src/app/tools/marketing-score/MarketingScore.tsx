"use client";

import { useState } from "react";

type Question = {
  id: string;
  text: string;
  pillar: string;
  options: { label: string; value: number }[];
};

const questions: Question[] = [
  {
    id: "social",
    pillar: "Social Media",
    text: "How consistently do you post on social media?",
    options: [
      { label: "Daily or near-daily across at least one platform", value: 4 },
      { label: "3-4 times per week", value: 3 },
      { label: "Once or twice a week", value: 2 },
      { label: "Occasionally — no set schedule", value: 1 },
      { label: "Rarely or never", value: 0 },
    ],
  },
  {
    id: "email",
    pillar: "Email Marketing",
    text: "Do you have an email list and send regular campaigns?",
    options: [
      { label: "Yes — active list, send at least monthly", value: 4 },
      { label: "Yes — list exists but emails are irregular", value: 2 },
      { label: "I collect emails but rarely send anything", value: 1 },
      { label: "No email list at all", value: 0 },
    ],
  },
  {
    id: "seo",
    pillar: "SEO & Search Visibility",
    text: "Can potential customers find you on Google for your main service or product?",
    options: [
      { label: "Yes — we rank on page 1 for key terms", value: 4 },
      { label: "We appear but mostly on page 2-3", value: 2 },
      { label: "We have a website but minimal organic traffic", value: 1 },
      { label: "No idea — never checked", value: 0 },
    ],
  },
  {
    id: "content",
    pillar: "Content Marketing",
    text: "How often do you publish useful content (blog posts, videos, guides)?",
    options: [
      { label: "Weekly or more often", value: 4 },
      { label: "2-3 times per month", value: 3 },
      { label: "Monthly", value: 2 },
      { label: "Rarely — a few times a year", value: 1 },
      { label: "Never", value: 0 },
    ],
  },
  {
    id: "analytics",
    pillar: "Analytics & Tracking",
    text: "Do you track where your leads and customers come from?",
    options: [
      { label: "Yes — I know exactly which channels drive revenue", value: 4 },
      { label: "Roughly — I have Google Analytics but rarely review it", value: 2 },
      { label: "I have tracking set up but never use the data", value: 1 },
      { label: "No tracking at all", value: 0 },
    ],
  },
  {
    id: "ads",
    pillar: "Paid Advertising",
    text: "Are you running paid ads with a tracked return on investment?",
    options: [
      { label: "Yes — I know my ROAS and optimise regularly", value: 4 },
      { label: "Running ads but not tracking ROI properly", value: 2 },
      { label: "Tried ads briefly, could not make them work", value: 1 },
      { label: "Not running any paid ads", value: 0 },
    ],
  },
  {
    id: "retention",
    pillar: "Customer Retention",
    text: "Do you have a system to follow up with and retain existing customers?",
    options: [
      { label: "Yes — automated follow-ups, loyalty system, or regular check-ins", value: 4 },
      { label: "Occasional follow-up but no real system", value: 2 },
      { label: "I rely on customers to come back on their own", value: 1 },
      { label: "No follow-up or retention strategy at all", value: 0 },
    ],
  },
];

const MAX_SCORE = questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.value)), 0);

const recommendations: Record<string, { low: string; mid: string }> = {
  social: {
    low: "Set a 30-day content calendar and post at least 5 times per week on one platform. Consistency beats perfection.",
    mid: "Increase posting frequency and add at least one Before & After or educational post per week to boost engagement.",
  },
  email: {
    low: "Start building an email list today. A free lead magnet (checklist, guide, or calculator) on your website can capture emails immediately.",
    mid: "Send at least one email per month. A simple monthly update with one useful tip outperforms silence.",
  },
  seo: {
    low: "Claim your Google Business Profile and ensure your website has a clear page for each service you offer. This alone can generate organic leads.",
    mid: "Target 2-3 long-tail keywords and publish one SEO-optimised blog post per month to climb the rankings over 6 months.",
  },
  content: {
    low: "Publish one piece of educational content per week — even a 300-word tip or a 60-second video builds authority over time.",
    mid: "Create a content series (e.g. 5 tips for your niche) that can be repurposed across blog, social, and email.",
  },
  analytics: {
    low: "Install Google Analytics 4 and add UTM parameters to all your marketing links. You cannot improve what you do not measure.",
    mid: "Review your analytics monthly. Focus on traffic sources, conversion events, and which pages lose visitors.",
  },
  ads: {
    low: "Start with a small test budget ($5-20/day) on Google or Meta, targeting a specific audience. Track cost-per-lead from day one.",
    mid: "Review your ad targeting and creative monthly. A/B test headlines and audiences to improve ROAS.",
  },
  retention: {
    low: "Set up a simple post-purchase email sequence: thank them, check in after 7 days, offer a next step at 30 days.",
    mid: "Add a loyalty or referral element: even a 10% discount for repeat purchases significantly increases lifetime value.",
  },
};

function getGrade(score: number): { grade: string; color: string; label: string } {
  if (score >= 80) return { grade: "A", color: "text-green-600", label: "Excellent" };
  if (score >= 65) return { grade: "B", color: "text-blue-600", label: "Good" };
  if (score >= 50) return { grade: "C", color: "text-yellow-600", label: "Average" };
  if (score >= 35) return { grade: "D", color: "text-orange-600", label: "Below Average" };
  return { grade: "F", color: "text-red-600", label: "Needs Work" };
}

function getTopGaps(answers: Record<string, number>): string[] {
  const scored = questions.map((q) => {
    const max = Math.max(...q.options.map((o) => o.value));
    const got = answers[q.id] ?? 0;
    return { id: q.id, gap: max - got };
  });
  scored.sort((a, b) => b.gap - a.gap);
  return scored.slice(0, 3).map((s) => {
    const q = questions.find((q) => q.id === s.id)!;
    const rec = recommendations[s.id];
    const text = s.gap >= 3 ? rec.low : rec.mid;
    return `**${q.pillar}:** ${text}`;
  });
}

export default function MarketingScore() {
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const totalRaw = Object.values(answers).reduce((s, v) => s + v, 0);
  const score = Math.round((totalRaw / MAX_SCORE) * 100);
  const gradeInfo = getGrade(score);
  const gaps = getTopGaps(answers);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      setStep("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const handleBack = () => {
    if (currentQ === 0) return;
    setCurrentQ((q) => q - 1);
    setSelected(answers[questions[currentQ - 1].id] ?? null);
  };

  const handleRestart = () => {
    setStep("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
  };

  const shareUrl = "https://calcfuel.com/tools/marketing-score";
  const shareText = `My marketing health score is ${score}/100 (${gradeInfo.grade}). Test yours:`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "share_copy", { event_category: "marketing_score", value: score });
    }
  };

  const handleShareClick = (platform: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "share_click", { event_category: "marketing_score", event_label: platform, value: score });
    }
  };

  const handleCtaClick = (product: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { event_category: "marketing_score", event_label: product, value: score });
    }
  };

  if (step === "quiz") {
    const progress = ((currentQ) / questions.length) * 100;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-orange-600 bg-orange-50 dark:bg-orange-950 px-3 py-1 rounded-full">
              {question.pillar}
            </span>
            <span className="text-sm text-gray-500">
              {currentQ + 1} / {questions.length}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {question.text}
          </h2>

          <div className="space-y-3 mb-8">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  selected === opt.value
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                    : "border-gray-200 dark:border-gray-600 hover:border-orange-300 text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {currentQ > 0 && (
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                &larr; Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-xl transition-colors"
            >
              {isLast ? "See My Score" : "Next Question"} &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Marketing Health Score</p>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-6xl sm:text-7xl font-extrabold text-gray-900 dark:text-white">
            {score}
          </span>
          <div className="text-left">
            <div className={`text-5xl font-extrabold ${gradeInfo.color}`}>{gradeInfo.grade}</div>
            <div className="text-sm text-gray-500">{gradeInfo.label}</div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-6">out of 100</p>

        {/* Score bar */}
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Share buttons */}
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Share your score</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick("twitter")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.902-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Share on X
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick("linkedin")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg font-semibold text-sm hover:bg-[#006097] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Share on LinkedIn
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your top 3 improvements</h2>
        <div className="space-y-4">
          {gaps.map((gap, i) => {
            const [bold, ...rest] = gap.split(":");
            return (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">{bold.replace(/\*\*/g, "")}:</span>
                  {rest.join(":")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pillar breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pillar breakdown</h2>
        <div className="space-y-3">
          {questions.map((q) => {
            const max = Math.max(...q.options.map((o) => o.value));
            const got = answers[q.id] ?? 0;
            const pct = max > 0 ? Math.round((got / max) * 100) : 0;
            return (
              <div key={q.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{q.pillar}</span>
                  <span className="text-gray-500">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://marketing-ai-psi-nine.vercel.app/prompts"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCtaClick("prompt_pack")}
          className="block bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 transition-colors"
        >
          <div className="text-2xl font-extrabold mb-1">$19</div>
          <div className="font-bold text-lg mb-2">50 AI Marketing Prompts</div>
          <p className="text-orange-100 text-sm">
            Improve your score fast. 50 ready-to-use prompts for social media, email, ads, and content — built for Australian SMBs.
          </p>
          <div className="mt-4 text-sm font-semibold">Get the prompt pack &rarr;</div>
        </a>
        <a
          href="https://buy.stripe.com/aFa6oJgvX7O10YrdS2bsc02"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCtaClick("audit")}
          className="block bg-white dark:bg-gray-800 border-2 border-orange-500 text-gray-900 dark:text-white rounded-2xl p-6 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="text-2xl font-extrabold text-orange-600 mb-1">$49</div>
          <div className="font-bold text-lg mb-2">Full Marketing Audit</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Get a personalised expert review of your marketing. Delivered in 48 hours with a clear action plan.
          </p>
          <div className="mt-4 text-sm font-semibold text-orange-600">Book the audit &rarr;</div>
        </a>
      </div>

      <button
        onClick={handleRestart}
        className="w-full py-3 text-sm text-gray-500 hover:text-orange-600 font-medium transition-colors"
      >
        &larr; Retake the quiz
      </button>
    </div>
  );
}
