import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "How to Calculate Customer Lifetime Value (CLV)",
  description: "Simple and predictive CLV formulas, worked examples by business model, and why CLV is the most important number in your marketing budget.",
  path: "/blog/how-to-calculate-customer-lifetime-value",
  type: "article",
});

export default function CLVArticlePage() {
  return (
    <BlogArticleLayout
      title="How to Calculate Customer Lifetime Value (CLV)"
      category="Unit Economics"
      readTime="9 min read"
      publishedDate="2026-05-09"
      slug="how-to-calculate-customer-lifetime-value"
      description="Customer lifetime value tells you how much a customer is worth over their entire relationship with your business. Here is the simple and predictive CLV formula, worked examples by business model, and how to use CLV to justify your marketing spend."
      authorName="CalcFuel Editorial Team"
      authorRole="Marketing Measurement Specialists"
      authorBio="Our team builds practical calculators and guides for operators who need reliable marketing math and decision-ready benchmarks."
      relatedLinks={[
        { href: "/blog/cac-vs-ltv-for-startups", label: "CAC vs LTV for Startups: The Ratio That Predicts Survival" },
        { href: "/blog/how-to-calculate-customer-acquisition-cost", label: "How to Calculate Customer Acquisition Cost (CAC)" },
      ]}
    >
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your customer lifetime value instantly</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your average order value, purchase frequency, and customer lifespan.</p>
        <Link href="/calculators/customer-lifetime-value-calculator" className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
          Open the CLV Calculator →
        </Link>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2>What Is Customer Lifetime Value?</h2>
        <p>Customer lifetime value (CLV, also written LTV) is the total revenue a business can expect to earn from a single customer throughout their entire relationship. Without CLV, CAC is meaningless — you cannot judge whether $200 to acquire a customer is cheap or ruinous without knowing how much that customer will spend over time.</p>

        <h2>The Simple CLV Formula</h2>
        <p><strong>CLV = Average Order Value × Purchase Frequency (per year) × Customer Lifespan (in years)</strong></p>
        <p>To get profit-based CLV, multiply by your gross margin percentage.</p>

        <h2>Step-by-Step Worked Example</h2>
        <p>A skincare eCommerce store: $65 AOV × 4 purchases/year × 3-year lifespan = <strong>CLV = $780</strong>.<br />
        At 55% gross margin: profit CLV = $429. Maximum justified CAC for 3:1 ratio = $143.</p>

        <h2>Predictive CLV: The More Accurate Method</h2>
        <p><strong>Predictive CLV = (Average Revenue per Period × Gross Margin %) ÷ (Churn Rate + Discount Rate)</strong></p>
        <p>Example: SaaS, $120/month MRR, 75% GM, 3% monthly churn, 0.83% monthly discount rate.<br />
        CLV = ($120 × 0.75) ÷ (0.03 + 0.0083) = $90 ÷ 0.0383 = <strong>$2,349</strong>.</p>

        <h2>CLV by Business Model</h2>
        <table>
          <thead><tr><th>Business Model</th><th>Key Variables</th><th>Typical CLV Range</th></tr></thead>
          <tbody>
            <tr><td>eCommerce (consumer goods)</td><td>AOV × frequency × lifespan</td><td>$100 – $500</td></tr>
            <tr><td>SaaS (SMB)</td><td>MRR × avg months retained</td><td>$500 – $5,000</td></tr>
            <tr><td>SaaS (Enterprise)</td><td>ACV × contract years + renewals</td><td>$20,000 – $200,000+</td></tr>
            <tr><td>Professional services</td><td>Avg project value × repeat engagements</td><td>$2,000 – $50,000</td></tr>
          </tbody>
        </table>

        <h2>Why CLV Matters for Marketing Budgets</h2>
        <ol>
          <li><strong>Set your maximum CAC.</strong> CLV ÷ 3 = your target CAC ceiling. Channels exceeding this are destroying value.</li>
          <li><strong>Prioritise channels by customer quality, not volume.</strong> A channel sending 200 customers with $800 CLV beats one sending 1,000 at $200 CLV.</li>
          <li><strong>Justify retention investment.</strong> Increasing average lifespan from 2 to 3 years increases CLV by 50% — no new acquisition required.</li>
        </ol>

        <h2>How to Increase Customer Lifetime Value</h2>
        <ul>
          <li><strong>Reduce churn.</strong> The highest-leverage CLV improvement. Fix onboarding gaps, feature gaps, support failures.</li>
          <li><strong>Increase purchase frequency.</strong> Email sequences, loyalty programmes, and timely re-engagement campaigns.</li>
          <li><strong>Increase average order value.</strong> Upsells, cross-sells, bundles, minimum order thresholds.</li>
          <li><strong>Serve your highest-CLV customers better.</strong> Top 20% by CLV often generate 80% of profit.</li>
        </ul>

        <h2>Related Calculators</h2>
        <ul>
          <li><Link href="/calculators/customer-lifetime-value-calculator" className="text-orange-500 hover:text-orange-600">Customer Lifetime Value Calculator</Link></li>
          <li><Link href="/calculators/customer-acquisition-cost-calculator" className="text-orange-500 hover:text-orange-600">CAC Calculator</Link></li>
          <li><Link href="/calculators/churn-rate-calculator" className="text-orange-500 hover:text-orange-600">Churn Rate Calculator</Link></li>
        </ul>
        <p>
          <strong>Want to know if your marketing spend is justified by CLV?</strong>{" "}
          <a href="https://marketing-ai-psi-nine.vercel.app" className="text-orange-500 hover:text-orange-600">Get a marketing system review</a>{" "}
          — we build the measurement framework and content systems that help small businesses acquire better customers at lower cost.
        </p>
      </article>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />
    </BlogArticleLayout>
  );
}