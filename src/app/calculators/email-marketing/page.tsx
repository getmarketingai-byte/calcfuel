import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Marketing Calculators",
  description: "Free email marketing calculators: open rate, list growth rate, and more. Measure and improve your email marketing performance.",
};

const tools = [
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Calculate your email open rate." },
];

export default function EmailMarketingHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Email Marketing Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Email Marketing Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to measure your email marketing performance.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
