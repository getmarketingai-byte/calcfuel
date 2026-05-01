import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Marketing Calculators",
  description: "Free financial marketing calculators: ROI, ROAS, ad spend, and more. Make data-driven marketing budget decisions.",
};

const tools = [
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your total marketing investment." },
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Measure return on ad spend for your paid campaigns." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project clicks, leads, and revenue." },
];

export default function FinancialHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Financial Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Financial Marketing Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Make smarter budget decisions with these free financial calculators.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
