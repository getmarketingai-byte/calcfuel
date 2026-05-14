import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Conversion & Lead Calculators — CAC, CLV, CPA & More",
  description: "Free conversion and lead calculators: customer acquisition cost, lifetime value, CPA, cost per lead, revenue per lead, and churn rate. Instant results.",
  path: "/calculators/conversion",
});

const tools = [
  { title: "Customer Acquisition Cost Calculator", slug: "customer-acquisition-cost-calculator", description: "Calculate how much you spend to acquire each new customer." },
  { title: "Customer Lifetime Value Calculator", slug: "customer-lifetime-value-calculator", description: "Measure the total revenue value of each customer relationship." },
  { title: "Conversion Rate Calculator", slug: "conversion-rate-calculator", description: "Measure how effectively your pages turn visitors into customers." },
  { title: "Cost Per Lead Calculator", slug: "cost-per-lead-calculator", description: "Calculate your cost per lead and compare across channels." },
  { title: "Cost Per Acquisition Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate your cost to acquire a paying customer." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Find the revenue value of each marketing lead generated." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track your average transaction size over any period." },
  { title: "Churn Rate Calculator", slug: "churn-rate-calculator", description: "Measure how many customers you lose each period." },
  { title: "Net Promoter Score Calculator", slug: "net-promoter-score-calculator", description: "Calculate your NPS from promoter and detractor survey responses." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcfuel.com" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://calcfuel.com/calculators" },
    { "@type": "ListItem", "position": 3, "name": "Conversion & Leads Calculators", "item": "https://calcfuel.com/calculators/conversion" },
  ],
};

export default function ConversionHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link><span className="mx-2">/</span>
        <span>Conversion &amp; Leads Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Conversion &amp; Lead Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to measure and improve your conversion funnel — CAC, CLV, CPA, cost per lead, churn rate, and more.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <article className="prose max-w-none mt-12 mb-8">
        <h2>Conversion Funnel Metrics That Drive Growth</h2>
        <p>Conversion rate is one of the highest-leverage metrics in digital marketing. A 1% improvement in conversion rate can double your revenue without spending an extra dollar on traffic. Yet most marketers focus almost exclusively on acquiring more leads rather than converting the ones they already have.</p>
        <p>The conversion funnel has multiple stages — visitors to leads, leads to qualified prospects, prospects to customers. Each stage has its own conversion rate, and small improvements compound dramatically across the entire funnel. These free calculators let you measure every critical metric instantly.</p>

        <h3>The CAC:CLV Ratio — The Most Important Unit Economics Metric</h3>
        <p>Customer Acquisition Cost (CAC) measures how much you spend to win each new customer. Customer Lifetime Value (CLV) measures how much revenue that customer generates over their full relationship with your business. The ratio between them tells you whether your business model is fundamentally healthy. A CLV:CAC ratio of 3:1 or higher indicates a scalable model — you earn at least three dollars for every dollar you spend acquiring customers. Use the <a href="/calculators/customer-acquisition-cost-calculator">CAC Calculator</a> and <a href="/calculators/customer-lifetime-value-calculator">CLV Calculator</a> to measure yours.</p>

        <h3>Conversion Rate Benchmarks by Channel</h3>
        <p>Average landing page conversion rates sit between 2 and 5%. Top-performing pages convert at 10% or higher. But conversion rates vary significantly by traffic source: email traffic typically converts at 4–6%, paid search at 2–4%, organic search at 1–3%, and social traffic at 0.5–2%. Use the <a href="/calculators/conversion-rate-calculator">Conversion Rate Calculator</a> to benchmark your pages against these standards.</p>

        <h3>Cost Per Lead vs Cost Per Acquisition</h3>
        <p>Cost per lead (CPL) and cost per acquisition (CPA) are related but distinct. CPL measures the cost to generate a prospect; CPA measures the cost to convert that prospect into a paying customer. If your CPL is $20 and 10% of leads become customers, your CPA is $200. CPA must always be compared against CLV — your CPA should be no more than one third of CLV for healthy unit economics. Calculate both with the <a href="/calculators/cost-per-lead-calculator">CPL Calculator</a> and <a href="/calculators/cost-per-acquisition-calculator">CPA Calculator</a>.</p>

        <h3>Churn Rate: The Silent Revenue Killer</h3>
        <p>Churn rate measures what percentage of customers cancel or stop buying each period. Even a 2% monthly churn rate means losing nearly 22% of your customer base annually. Reducing churn by even 1% has a larger impact on revenue than most acquisition improvements. Track yours with the <a href="/calculators/churn-rate-calculator">Churn Rate Calculator</a>.</p>

        <h2>How to Improve Conversion Performance</h2>
        <ol>
          <li><strong>Optimise your landing pages.</strong> Test headlines, CTA copy, form length, and page layout. Remove friction — every extra field reduces conversion rate by 10–15%.</li>
          <li><strong>Qualify leads earlier.</strong> Better-qualified leads convert at higher rates and have lower CPA even if they cost more per lead upfront.</li>
          <li><strong>Map your full funnel.</strong> Calculate conversion rates at each stage to identify where prospects are dropping off. Fix the leakiest stage first.</li>
          <li><strong>Improve lead nurturing.</strong> Most leads are not ready to buy immediately. A structured email or content nurture sequence can double lead-to-customer conversion rates.</li>
          <li><strong>Reduce churn proactively.</strong> Identify customers at risk of churning using engagement signals and reach out before they cancel.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <ProductCTASection variant="email_social_seo" />
    </div>
  );
}
