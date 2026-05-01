import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Media Marketing Calculators",
  description: "Free social media calculators: ROI, engagement rate, follower growth rate, and more.",
};

const tools = [
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate the ROI of your social media ad campaigns." },
];

export default function SocialMediaHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Social Media Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Social Media Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Measure your social media performance with these free calculators.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
