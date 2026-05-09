import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "CalcFuel - 35+ Free Marketing Calculators | Product Hunt",
  description: "35+ free marketing calculators for Australian SMBs. ROI, CAC, ROAS, CLV and more.",
};

const CALCS = [
  { t: "Marketing ROI Calculator", d: "Are you making more than you spend?", s: "marketing-roi-calculator" },
  { t: "Customer Acquisition Cost", d: "Cost to win one new customer?", s: "customer-acquisition-cost-calculator" },
  { t: "ROAS Calculator", d: "Is your paid traffic profitable?", s: "roas-calculator" },
  { t: "Customer Lifetime Value", d: "What is each customer worth over time?", s: "customer-lifetime-value-calculator" },
  { t: "Conversion Rate Calculator", d: "What percentage of visitors convert?", s: "conversion-rate-calculator" },
  { t: "Email Open Rate Calculator", d: "Are your subject lines working?", s: "email-open-rate-calculator" },
  { t: "Break-Even Calculator", d: "How many sales to cover costs?", s: "break-even-calculator" },
  { t: "Ad Spend Calculator", d: "Plan clicks, leads, revenue, ROI.", s: "ad-spend-calculator" },
];

export default function ProductHuntPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-8">
            <a href="https://www.producthunt.com/posts/calcfuel" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ff6154] hover:bg-[#e5574b] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Featured on Product Hunt
            </a>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            35+ Free Marketing<br /><span className="text-orange-600">Calculators</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
            For Australian small businesses who want to know what their marketing is actually doing.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
            Free forever. No sign-up. Instant results. ROI, CAC, ROAS, CLV, conversion rate, and 30 more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-xl transition-colors">
              Browse All 35+ Calculators
            </Link>
            <a href="https://www.producthunt.com/posts/calcfuel" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-bold text-lg rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
              Upvote on Product Hunt
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-10" />

        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">The calculators you will use every week</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">These 8 cover 90% of marketing maths decisions a small business makes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CALCS.map((c) => (
              <Link key={c.s} href={"/calculators/" + c.s}
                className="group block p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-300 hover:shadow-md transition-all">
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{c.t}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{c.d}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why we built CalcFuel</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Most small business owners make marketing decisions based on gut feel. The maths is not hard, but doing it mid-meeting is annoying enough that most people skip it.</p>
          <p className="text-gray-600 dark:text-gray-300">We started with 6 core metrics and kept going until we had 35+. All free, no sign-up, instant results.</p>
        </section>

        <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="mb-14" />

        <section className="mb-14 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need more than calculators?</h2>
          <p className="text-orange-100 text-lg mb-6 max-w-2xl">CalcFuel tells you what your numbers mean. MarketingAI builds the actual marketing system for you in 3 to 5 business days.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://marketing-ai-psi-nine.vercel.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors">
              See MarketingAI
            </a>
            <a href="https://marketing-ai-psi-nine.vercel.app/audit" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500/30 text-white font-semibold rounded-lg border border-orange-400/40 hover:bg-orange-500/40 transition-colors">
              49 AUD Marketing Audit
            </a>
          </div>
        </section>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">See all 35+ calculators across 8 categories</p>
          <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-xl transition-colors">
            Browse All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
