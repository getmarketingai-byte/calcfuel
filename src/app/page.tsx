import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CalcFuel — Free Marketing Calculators",
  description:
    "Over 20 free marketing calculators for ROI, ROAS, email open rates, CAC, CLV, social media metrics, and more. Built for marketers who want results.",
};

const toolCategories = [
  {
    category: "Email Marketing",
    slug: "email-marketing",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    icon: "✉️",
    tools: [
      {
        title: "Email Open Rate Calculator",
        slug: "email-open-rate-calculator",
        description: "Calculate your email open rate from opens and deliveries.",
      },
    ],
  },
  {
    category: "Financial & ROI",
    slug: "financial",
    color: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    icon: "💰",
    tools: [
      {
        title: "Marketing ROI Calculator",
        slug: "marketing-roi-calculator",
        description: "Measure the return on your marketing investment.",
      },
      {
        title: "ROAS Calculator",
        slug: "roas-calculator",
        description: "Calculate your Return on Ad Spend instantly.",
      },
      {
        title: "Ad Spend Calculator",
        slug: "ad-spend-calculator",
        description: "Plan your ad budget: clicks, leads, revenue, and ROI.",
      },
    ],
  },
  {
    category: "Social Media",
    slug: "social-media",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800",
    icon: "📱",
    tools: [
      {
        title: "Social Media ROI Calculator",
        slug: "social-media-roi-calculator",
        description: "Measure the ROI of your social media ad spend.",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Free Marketing Calculators
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stop guessing. Start measuring. CalcFuel gives you instant answers on
          ROI, ROAS, email metrics, social media performance, and more — all
          free, no sign-up required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {toolCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/calculators/${cat.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-all"
            >
              {cat.icon} {cat.category}
            </Link>
          ))}
        </div>
      </div>

      {/* Tool grid by category */}
      {toolCategories.map((cat) => (
        <section key={cat.slug} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cat.icon} {cat.category}
            </h2>
            <Link
              href={`/calculators/${cat.slug}`}
              className="text-sm text-orange-500 hover:underline font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className={`block p-5 rounded-xl border ${cat.color} hover:shadow-lg hover:border-orange-400 transition-all group`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {tool.description}
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-orange-500 group-hover:underline">
                  Calculate now →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <div className="mt-16 text-center bg-orange-50 dark:bg-orange-950 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Want AI-powered marketing for your business?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          CalcFuel is built by the team at MarketingAI — helping Australian
          businesses grow with AI-assisted marketing strategies.
        </p>
        <a
          href="https://marketing-ai-psi-nine.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Learn About MarketingAI →
        </a>
      </div>
    </div>
  );
}
