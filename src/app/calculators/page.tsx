import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Free Online Calculators — CalcFuel",
  description:
    "Free online calculators for marketing, finance, fuel, social media, SEO, and more. 60+ tools built for small business owners, marketers, and investors.",
  alternates: { canonical: "https://calcfuel.com/calculators" },
  openGraph: {
    title: "Free Online Calculators — CalcFuel",
    description:
      "60+ free calculators for marketing ROI, Australian tax, fuel costs, social media, and more.",
    url: "https://calcfuel.com/calculators",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const categories = [
  {
    slug: "financial",
    title: "Financial Calculators",
    description:
      "ROI, ROAS, mortgage repayments, GST, stamp duty, negative gearing, capital gains tax, superannuation — free Australian financial calculators.",
    color: "green",
    tools: [
      "Tax Refund Estimator",
      "Income Tax",
      "Salary Sacrifice",
      "Work From Home Tax",
      "HECS-HELP Repayment",
      "Capital Gains Tax",
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing Calculators",
    description:
      "Calculate open rates, click-through rates, list growth, and campaign ROI to optimise your email marketing performance.",
    color: "blue",
    tools: [
      "Email Open Rate",
      "Click-Through Rate",
      "Email List Growth",
      "Cost Per Lead",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Calculators",
    description:
      "Measure engagement rates, follower growth, and social ROI across Instagram, LinkedIn, TikTok, and more.",
    color: "purple",
    tools: [
      "Engagement Rate",
      "Follower Growth Rate",
      "Social Media ROI",
    ],
  },
  {
    slug: "conversion",
    title: "Conversion & Revenue Calculators",
    description:
      "Track customer acquisition costs, lifetime value, conversion rates, and marketing budget performance.",
    color: "orange",
    tools: [
      "Customer Acquisition Cost",
      "Customer Lifetime Value",
      "Conversion Rate",
      "Revenue Per Lead",
    ],
  },
  {
    slug: "fuel-energy",
    title: "Fuel & Energy Calculators",
    description:
      "Fuel cost estimators for road trips, commutes, fleets, and off-grid power — plus EV vs petrol comparisons.",
    color: "yellow",
    tools: [
      "Trip Fuel Cost",
      "Commute Fuel Cost",
      "EV vs Petrol",
      "Generator Fuel",
    ],
  },
  {
    slug: "seo-tools",
    title: "SEO & Web Tools",
    description:
      "Website speed impact, traffic projections, NPS calculator, and other tools to grow organic reach.",
    color: "teal",
    tools: [
      "Website Speed Impact",
      "Website Traffic",
      "Net Promoter Score",
    ],
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
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        60+ free calculators for marketing, finance, fuel, social media, and more. No sign-up required.
      </p>

      <AdSenseUnit slot="6564431580" className="mb-10" />

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

      <AdSenseUnit slot="3651327789" className="mb-10" />

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2>About CalcFuel Calculators</h2>
        <p>
          CalcFuel is a free collection of online calculators built for small business owners,
          marketers, investors, and anyone who needs quick, accurate numbers without a spreadsheet.
          All calculators are free, run in your browser, and require no sign-up.
        </p>
        <p>
          Our most popular tools include the{" "}
          <Link href="/calculators/australian-income-tax-calculator">Income Tax Calculator</Link>,{" "}
          <Link href="/calculators/work-from-home-tax-calculator">Work From Home Tax Calculator</Link>,{" "}
          <Link href="/calculators/hecs-help-repayment-calculator">HECS-HELP Repayment Calculator</Link>, and{" "}
          <Link href="/calculators/capital-gains-tax-calculator">Capital Gains Tax Calculator</Link>.
        </p>
      </section>
    </div>
  );
}
