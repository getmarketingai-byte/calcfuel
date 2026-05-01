"use client";
import { useState } from "react";

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

export default function HealthCheck() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter(a => a === "yes").length;

  const handleAnswer = (id: number, answer: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const getScoreLabel = (s: number) => {
    if (s >= 9) return { label: "Excellent — your marketing foundation is strong", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" };
    if (s >= 7) return { label: "Good — a few gaps to close for sustained growth", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" };
    if (s >= 5) return { label: "Fair — solid starting point, prioritise the fundamentals", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800" };
    if (s >= 3) return { label: "Developing — significant opportunity to strengthen your marketing", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" };
    return { label: "Early stage — focus on the foundations before scaling", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" };
  };

  const weakAreas = QUESTIONS.filter(q => answers[q.id] === "no");

  if (submitted && answered === 10) {
    const { label, color, bg } = getScoreLabel(score);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Marketing Health Score</h2>
        <div className={`p-6 rounded-xl border mb-6 ${bg}`}>
          <p className="text-6xl font-bold text-gray-900 dark:text-white mb-2">{score}<span className="text-2xl text-gray-500">/10</span></p>
          <p className={`text-lg font-semibold ${color}`}>{label}</p>
        </div>

        {weakAreas.length > 0 && (
          <div className="mb-6">
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

        {score <= 7 && (
          <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
            <p className="font-bold text-gray-900 dark:text-white mb-2">Want help fixing these gaps?</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              The team at MarketingAI specialises in building the marketing foundations that drive consistent lead generation and revenue growth for Australian businesses.
            </p>
            <a
              href="https://marketing-ai-psi-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
            >
              Learn About MarketingAI →
            </a>
          </div>
        )}

        <button
          onClick={() => { setAnswers({}); setSubmitted(false); }}
          className="mt-6 text-sm text-orange-500 hover:underline"
        >
          ← Retake the quiz
        </button>
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
        onClick={() => setSubmitted(true)}
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
