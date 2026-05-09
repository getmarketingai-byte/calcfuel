import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";

export const metadata: Metadata = {
  title: "SEO Tools & Calculators",
  description: "Free SEO tools and calculators: website speed impact, traffic growth, NPS, and marketing health check. Measure what matters for organic growth.",
};

const calculatorTools = [
  { title: "Website Speed Impact Calculator", slug: "website-speed-impact-calculator", description: "See how faster load times increase conversions and monthly revenue.", prefix: "calculators" },
  { title: "Website Traffic Calculator", slug: "website-traffic-calculator", description: "Project organic traffic growth from SEO and content improvements.", prefix: "calculators" },
  { title: "Net Promoter Score Calculator", slug: "net-promoter-score-calculator", description: "Calculate your NPS from promoter and detractor survey responses.", prefix: "calculators" },
  { title: "Marketing Health Check", slug: "marketing-health-check", description: "10-question quiz: score your marketing foundation and get personalised recommendations.", prefix: "tools" },
];

export default function SEOToolsHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>SEO Tools</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SEO Tools & Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free tools to measure and improve your organic marketing performance — from page speed to NPS to marketing health.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {calculatorTools.map(tool => (
          <Link key={tool.slug} href={`/${tool.prefix}/${tool.slug}`}
            className="block p-5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Try it free →</span>
          </Link>
        ))}
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />

      <article className="prose max-w-none">
        <h2>Measuring What Drives Organic Growth</h2>
        <p>SEO is often discussed in terms of keyword rankings and backlinks — but the metrics that translate to revenue are conversion rate, traffic quality, and page experience. This set of tools helps you quantify the business impact of technical and content SEO improvements, so you can prioritise the work that actually moves the needle.</p>

        <h2>Why Page Speed Is Your Highest-ROI SEO Investment</h2>
        <p>Page speed is the only SEO factor that directly affects both your search rankings (via Core Web Vitals) and your conversion rate simultaneously. Google's research shows a 1-second improvement in load time can increase conversions by 7%. For sites with thousands of monthly visitors, this compounds quickly into significant revenue — without increasing ad spend or content volume. Use the Website Speed Impact Calculator to quantify your specific opportunity.</p>

        <h2>NPS and Marketing Health as Growth Indicators</h2>
        <p>Net Promoter Score measures customer satisfaction and loyalty — a leading indicator of organic growth through referrals and word-of-mouth. Businesses with NPS above 50 typically see 2–3× the organic referral traffic of those below 20. Pair NPS tracking with the Marketing Health Check to identify systemic gaps in your marketing foundation that may be suppressing organic growth.</p>
      </article>

      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <ProductCTASection variant="email_social_seo" />
    </div>
  );
}
