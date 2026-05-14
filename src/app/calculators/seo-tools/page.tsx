import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "SEO Tools & Calculators — Website Traffic, Speed Impact & More",
  description: "Free SEO calculators and tools: website traffic estimator, speed impact calculator, and more. Optimise your search and organic performance.",
  path: "/calculators/seo-tools",
});

const calculatorTools = [
  { title: "Website Speed Impact Calculator", slug: "website-speed-impact-calculator", description: "See how faster load times increase conversions and monthly revenue.", prefix: "calculators" },
  { title: "Website Traffic Calculator", slug: "website-traffic-calculator", description: "Project organic traffic growth from SEO and content improvements.", prefix: "calculators" },
  { title: "Net Promoter Score Calculator", slug: "net-promoter-score-calculator", description: "Calculate your NPS from promoter and detractor survey responses.", prefix: "calculators" },
  { title: "Marketing Health Check", slug: "marketing-health-check", description: "10-question quiz: score your marketing foundation and get personalised recommendations.", prefix: "tools" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcfuel.com" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://calcfuel.com/calculators" },
    { "@type": "ListItem", "position": 3, "name": "SEO Tools & Calculators", "item": "https://calcfuel.com/calculators/seo-tools" },
  ],
};

export default function SEOToolsHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link><span className="mx-2">/</span>
        <span>SEO Tools</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SEO Tools &amp; Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free tools to measure and improve your organic marketing performance — website traffic, page speed impact, NPS, and marketing health.</p>
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

      <article className="prose max-w-none mt-12 mb-8">
        <h2>Measuring What Drives Organic Growth</h2>
        <p>SEO is often discussed in terms of keyword rankings and backlinks — but the metrics that translate to revenue are conversion rate, traffic quality, and page experience. This set of tools helps you quantify the business impact of technical and content SEO improvements, so you can prioritise the work that actually moves the needle.</p>

        <h3>Website Traffic: Estimating Your Organic Opportunity</h3>
        <p>Organic traffic is one of the most valuable and sustainable sources of visitors for any website. Unlike paid traffic, which stops the moment you stop spending, organic traffic compounds over time as you publish more content and earn more links. The <a href="/calculators/website-traffic-calculator">Website Traffic Calculator</a> helps you model what your organic traffic could look like as you improve your SEO — so you can set realistic targets and justify content investment decisions.</p>

        <h3>Why Page Speed Is Your Highest-ROI SEO Investment</h3>
        <p>Page speed is the only SEO factor that directly affects both your search rankings (via Core Web Vitals) and your conversion rate simultaneously. Google&rsquo;s research shows a 1-second improvement in load time can increase conversions by 7%. For sites with thousands of monthly visitors, this compounds quickly into significant revenue — without increasing ad spend or content volume. Core Web Vitals — Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) — are now direct Google ranking signals. Use the <a href="/calculators/website-speed-impact-calculator">Website Speed Impact Calculator</a> to quantify your specific revenue opportunity from faster load times.</p>

        <h3>NPS and Marketing Health as Growth Indicators</h3>
        <p>Net Promoter Score measures customer satisfaction and loyalty — a leading indicator of organic growth through referrals and word-of-mouth. Businesses with NPS above 50 typically see 2–3× the organic referral traffic of those below 20. A high NPS means your existing customers are actively recommending you, which drives word-of-mouth traffic that Google cannot easily track or replicate with paid ads. Use the <a href="/calculators/net-promoter-score-calculator">NPS Calculator</a> to score your latest survey results instantly.</p>

        <h3>Marketing Health Check: Your Foundation Audit</h3>
        <p>Many businesses invest in SEO tactics before addressing gaps in their marketing foundation — and then wonder why results are slow. The <a href="/tools/marketing-health-check">Marketing Health Check</a> is a 10-question quiz that scores your marketing foundation across tracking, messaging, channel mix, and conversion infrastructure. Identifying and fixing these foundational gaps often delivers more organic growth than any specific SEO tactic.</p>

        <h2>How to Prioritise Your SEO Work</h2>
        <ol>
          <li><strong>Fix technical issues first.</strong> Crawl errors, broken links, slow load times, and missing canonical tags undermine all other SEO work. Use the Website Speed Impact Calculator to quantify the revenue impact of speed improvements.</li>
          <li><strong>Focus on high-intent keywords.</strong> Commercial and transactional keywords convert better than informational ones. Prioritise content that addresses specific problems your customers are actively searching to solve.</li>
          <li><strong>Build content depth.</strong> Google rewards pages that comprehensively answer a topic. A single 2,000-word pillar page often outranks five 400-word pages on related subtopics.</li>
          <li><strong>Earn links through useful content.</strong> Calculators, data-driven research, and original tools attract natural backlinks. Publishing tools like these is one of the most reliable organic link-building strategies.</li>
          <li><strong>Measure what matters.</strong> Track organic sessions, keyword rankings, conversion rate from organic traffic, and revenue attributed to organic search — not just raw traffic numbers.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <ProductCTASection variant="email_social_seo" />
    </div>
  );
}
