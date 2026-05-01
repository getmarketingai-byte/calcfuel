import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import HealthCheck from "./HealthCheck";

export const metadata: Metadata = {
  title: "Marketing Health Check Tool - Score Your Marketing in 2 Minutes",
  description: "Free 10-question marketing health check. Get your marketing score and personalised recommendations to improve lead generation, ROI tracking, and growth.",
};

export default function MarketingHealthCheckPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Marketing Health Check</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Marketing Health Check Tool</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Answer 10 questions and get your marketing health score out of 10 — plus specific, actionable recommendations for every gap in your marketing foundation.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <HealthCheck />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <section className="prose max-w-none">
        <h2>What This Tool Checks</h2>
        <p>This health check evaluates the 10 core pillars of a functional marketing system. These are the building blocks that every business — regardless of size or industry — needs to generate leads predictably and grow revenue consistently. Each &ldquo;No&rdquo; answer is a gap that is likely suppressing your marketing results right now.</p>
        <p>The 10 pillars covered are: goal clarity, audience definition, ROI tracking, email list, content consistency, paid advertising, social media presence, CRM usage, testing habits, and planning discipline. Businesses that score 8–10 out of 10 on these fundamentals consistently outperform those that rely on ad-hoc marketing, regardless of their budget size.</p>

        <h2>Why Marketing Fundamentals Matter More Than Tactics</h2>
        <p>Most businesses look for the latest marketing &ldquo;hack&rdquo; — a new platform, a viral content format, or an AI tool — before they have their fundamentals in place. This is a costly mistake. Without a clear ICP, even perfect ads reach the wrong people. Without ROI tracking, you cannot tell which channels are working and end up spreading budget across too many tactics. Without a CRM, leads fall through the cracks and revenue is left on the table.</p>
        <p>The businesses that grow most efficiently are typically not the most innovative marketers — they are the most disciplined ones. They know their numbers, communicate clearly to a defined audience, test systematically, and plan ahead. This health check identifies exactly which of these disciplines you are missing.</p>
      </section>

      <div className="mt-8 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Related Tools</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/calculators/marketing-roi-calculator" className="text-orange-500 hover:underline font-medium">
              Marketing ROI Calculator →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Measure your return on marketing investment</span>
          </li>
          <li>
            <Link href="/calculators/marketing-budget-calculator" className="text-orange-500 hover:underline font-medium">
              Marketing Budget Calculator →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Get a recommended marketing budget for your business</span>
          </li>
          <li>
            <Link href="/calculators/customer-acquisition-cost-calculator" className="text-orange-500 hover:underline font-medium">
              Customer Acquisition Cost Calculator →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Find out what it costs to win each new customer</span>
          </li>
        </ul>
      </div>

      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
