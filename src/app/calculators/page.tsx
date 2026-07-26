import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Free Online Calculators — CalcFuel",
  description:
    "Browse 70+ free online calculators for social media, marketing, finance, fuel costs, SEO, and AI developer tools. No sign-up required.",
  alternates: { canonical: "https://calcfuel.com/calculators" },
  openGraph: {
    title: "Free Online Calculators — CalcFuel",
    description:
      "70+ free calculators for marketing ROI, social media metrics, fuel costs, and more.",
    url: "https://calcfuel.com/calculators",
    siteName: "CalcFuel",
    locale: "en_US",
    type: "website",
  },
};

const categories = [
  {
    slug: "social-media",
    title: "Social Media Calculators",
    description:
      "Engagement rate, follower growth, ROI, character counting, and post length tools for Instagram, LinkedIn, TikTok, and X.",
    color: "purple",
    tools: ["Character Counter", "Engagement Rate", "Follower Growth", "Social ROI"],
  },
  {
    slug: "email-marketing",
    title: "Marketing & Email Calculators",
    description:
      "Open rate, CTR, list growth, ROAS, CAC, and campaign ROI calculators for marketers worldwide.",
    color: "blue",
    tools: ["Email Open Rate", "ROAS", "Marketing ROI", "Click-Through Rate"],
  },
  {
    slug: "financial",
    title: "Financial & ROI Calculators",
    description:
      "Marketing ROI, profit margins, break-even, mortgages, loans, and compound interest — plus Australia-specific tax tools.",
    color: "green",
    tools: ["Marketing ROI", "Profit Margin", "Mortgage Repayment", "Income Tax (AU)"],
  },
  {
    slug: "conversion",
    title: "Conversion & Revenue Calculators",
    description:
      "Conversion rate, CAC, CLV, CPL, churn, and revenue-per-lead tools to measure funnel performance.",
    color: "orange",
    tools: ["Conversion Rate", "Customer Acquisition Cost", "Customer Lifetime Value", "Churn Rate"],
  },
  {
    slug: "fuel-energy",
    title: "Fuel & Energy Calculators",
    description:
      "Trip fuel costs, commute budgets, EV vs petrol comparisons, boat fuel, and fleet surcharge tools.",
    color: "yellow",
    tools: ["Trip Fuel Cost", "Commute Fuel Cost", "EV vs Petrol", "Drive vs Fly"],
  },
  {
    slug: "seo-tools",
    title: "SEO & Web Tools",
    description:
      "Website speed impact, traffic projections, NPS, and marketing health assessments.",
    color: "teal",
    tools: ["Website Speed Impact", "Website Traffic", "Net Promoter Score", "Marketing Health Check"],
  },
  {
    slug: "ai-developer-tools",
    title: "AI Developer Tools",
    description:
      "Model routing savings, prompt caching discounts, multimodal payload costs, and RAG storage estimators.",
    color: "purple",
    tools: ["Model Router Savings", "Prompt Caching", "Multimodal Payload", "RAG Storage Cost"],
  },
];

const colorMap: Record<string, string> = {
  green: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950",
  blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950",
  purple: "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950",
  orange: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950",
  yellow: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950",
  teal: "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950",
};

export default function CalculatorsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Calculators</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Free Online Calculators
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Browse CalcFuel&apos;s full library of free calculators — social media metrics, marketing
        ROI, fuel and travel costs, finance, and developer tools. Every page explains the formula
        and includes practical examples.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-10">
        Not sure where to start? Try the{" "}
        <Link href="/tools/social-media-character-counter" className="text-orange-500 hover:underline">
          Social Media Character Counter
        </Link>
        ,{" "}
        <Link href="/calculators/roas-calculator" className="text-orange-500 hover:underline">
          ROAS Calculator
        </Link>
        , or{" "}
        <Link href="/calculators/social-media-follower-growth-rate-calculator" className="text-orange-500 hover:underline">
          Follower Growth Rate Calculator
        </Link>
        .
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/calculators/${cat.slug}`}
            className={`block p-6 rounded-xl border ${colorMap[cat.color]} hover:shadow-lg hover:border-orange-400 transition-all group`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-2">
              {cat.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {cat.description}
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-4">
              {cat.tools.map((t) => (
                <li key={t} className="flex items-center gap-1">
                  <span className="text-orange-400">›</span> {t}
                </li>
              ))}
            </ul>
            <span className="text-sm font-medium text-orange-500 group-hover:underline">
              Browse {cat.title} →
            </span>
          </Link>
        ))}
      </div>

      <section className="mb-12 rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Don&apos;t see what you need?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Suggest a calculator or upvote community ideas — we build what people ask for most.
        </p>
        <Link
          href="/suggest"
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 transition-colors"
        >
          Suggest a calculator
        </Link>
      </section>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="mb-10" />

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2>How to Choose the Right Calculator</h2>
        <p>
          CalcFuel groups tools by the decision you are trying to make. If you are optimising social
          content, start in the Social Media hub. If you are planning ad spend or measuring campaign
          returns, use Marketing &amp; Email or Financial calculators. For trip planning or fleet
          costs, browse Fuel &amp; Energy.
        </p>
        <p>
          Some calculators are region-specific — for example Australian income tax, HECS-HELP, and
          stamp duty — and are clearly labeled. Global tools like ROAS, engagement rate, and fuel
          cost estimators work anywhere.
        </p>
        <h2>Popular Tools</h2>
        <ul>
          <li>
            <Link href="/tools/social-media-character-counter">Social Media Character Counter</Link> — live counts for X, LinkedIn, Instagram, and Facebook
          </li>
          <li>
            <Link href="/calculators/social-media-follower-growth-rate-calculator">Follower Growth Rate Calculator</Link> — track audience growth month over month
          </li>
          <li>
            <Link href="/calculators/roas-calculator">ROAS Calculator</Link> — measure return on ad spend
          </li>
          <li>
            <Link href="/calculators/boat-fuel-calculator">Boat Fuel Calculator</Link> — estimate marine fuel costs
          </li>
          <li>
            <Link href="/calculators/australian-income-tax-calculator">Australian Income Tax Calculator</Link> — FY2025–26 estimates (Australia only)
          </li>
        </ul>
      </section>
    </div>
  );
}
