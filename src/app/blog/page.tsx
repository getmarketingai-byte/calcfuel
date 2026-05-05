import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import MarketingAICTA from "@/components/MarketingAICTA";

export const metadata: Metadata = {
  title: "Marketing Blog — Guides, Formulas & Benchmarks",
  description:
    "Free marketing guides covering email open rates, ROI formulas, ROAS benchmarks, and more. Learn how to measure and improve your marketing performance.",
  openGraph: {
    type: "website",
    title: "Marketing Blog — CalcFuel",
    description:
      "Practical marketing guides with calculators, formulas, and industry benchmarks.",
    url: "https://calcfuel.com/blog",
  },
};

const articles = [
  {
    slug: "how-to-calculate-email-open-rate",
    title: "How to Calculate Email Open Rate (+ Free Calculator)",
    description:
      "Learn the email open rate formula, what counts as a good open rate by industry, and how to diagnose and fix a declining rate.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Email Marketing",
    calculatorSlug: "email-open-rate-calculator",
  },
  {
    slug: "marketing-roi-formula",
    title: "Marketing ROI Formula: How to Measure Your Marketing Performance",
    description:
      "Understand the marketing ROI formula, how to attribute revenue to campaigns, and what a healthy ROI looks like across different channels.",
    date: "2026-05-05",
    readTime: "8 min read",
    category: "ROI & Analytics",
    calculatorSlug: "marketing-roi-calculator",
  },
  {
    slug: "what-is-a-good-roas",
    title: "What Is a Good ROAS? Calculator + Industry Benchmarks",
    description:
      "ROAS benchmarks by industry, how to calculate Return on Ad Spend, and when chasing a higher ROAS can actually hurt your growth.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Paid Advertising",
    calculatorSlug: "roas-calculator",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Blog</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Marketing Blog
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Practical guides on measuring marketing performance — formulas,
        benchmarks, and free calculators.
      </p>

      <AdSenseUnit
        slot="6564431580"
        format="auto"
        style={{ minHeight: 90 }}
        className="mb-8"
      />

      <div className="grid gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{article.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              <Link
                href={`/blog/${article.slug}`}
                className="hover:text-orange-500 transition-colors"
              >
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <time
                dateTime={article.date}
                className="text-xs text-gray-400"
              >
                {new Date(article.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <Link
                href={`/blog/${article.slug}`}
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdSenseUnit
        slot="3651327789"
        format="auto"
        style={{ minHeight: 250 }}
        className="my-8"
      />

      <MarketingAICTA />
    </div>
  );
}
