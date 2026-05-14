import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "How to Calculate Customer Acquisition Cost (CAC)",
  description: "Learn the CAC formula, worked examples by industry, benchmarks, and common mistakes when calculating customer acquisition cost.",
  path: "/blog/how-to-calculate-customer-acquisition-cost",
  type: "article",
});

export default function CACArticlePage() {
  return (
    <BlogArticleLayout
      title="How to Calculate Customer Acquisition Cost (CAC)"
      category="Unit Economics"
      readTime="8 min read"
      publishedDate="2026-05-09"
      slug="how-to-calculate-customer-acquisition-cost"
      description="Customer acquisition cost is the single most important number in your marketing budget. Here is the formula, worked examples across industries, and how to interpret your number against the LTV:CAC benchmark."
      authorName="CalcFuel Editorial Team"
      authorRole="Marketing Measurement Specialists"
      authorBio="Our team builds practical calculators and guides for operators who need reliable marketing math and decision-ready benchmarks."
      relatedLinks={[
        { href: "/blog/cac-vs-ltv-for-startups", label: "CAC vs LTV for Startups: The Ratio That Predicts Survival" },
        { href: "/blog/marketing-roi-formula", label: "Marketing ROI Formula: How to Measure Your Marketing Performance" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is customer acquisition cost (CAC)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Customer acquisition cost (CAC) measures how much it costs your business to acquire one new paying customer. The formula is: CAC = Total Sales & Marketing Spend ÷ Number of New Customers Acquired. If your CAC exceeds your customer lifetime value, you are paying more to acquire customers than they are worth."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good CAC? What is the LTV:CAC ratio benchmark?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The LTV:CAC ratio benchmarks are: below 1:1 means losing money on every customer; 1:1 to 3:1 is marginally viable; 3:1 to 5:1 is healthy and the widely cited benchmark; above 5:1 is very profitable and suggests you should consider increasing spend to acquire more."
                }
              },
              {
                "@type": "Question",
                "name": "What are common mistakes when calculating CAC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Common CAC calculation mistakes include: not including salaries (staff costs can make up 50%+ of true CAC); using total customers instead of new customers (inflates the denominator); blending all channels into one number instead of calculating CAC per channel; and using too-short time periods for businesses with long sales cycles."
                }
              },
              {
                "@type": "Question",
                "name": "What are CAC benchmarks by industry?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical CAC ranges by industry: SaaS/Software $200–$700, eCommerce $30–$80, B2B Professional Services $500–$3,000+, Healthcare $300–$600, Financial Services $500–$1,200, Real Estate $1,000–$5,000."
                }
              }
            ]
          })
        }}
      />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your CAC instantly</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your total sales and marketing spend and number of new customers acquired.</p>
        <Link href="/calculators/customer-acquisition-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
          Open the CAC Calculator →
        </Link>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2>What Is Customer Acquisition Cost?</h2>
        <p>Customer acquisition cost (CAC) measures how much it costs your business to acquire one new paying customer. It combines every dollar spent on sales and marketing and divides it by the number of new customers those dollars produced.</p>
        <p>CAC is not just a marketing metric — it is a business health metric. If your CAC exceeds your customer lifetime value (CLV), you are paying more to acquire customers than they are worth.</p>

        <h2>The CAC Formula</h2>
        <p><strong>CAC = Total Sales &amp; Marketing Spend ÷ Number of New Customers Acquired</strong></p>
        <p>Both figures should cover the same time period — typically a month, quarter, or year. Use new customers only, not total customers.</p>

        <h2>Step-by-Step: How to Calculate CAC</h2>
        <p><strong>Step 1 — Add up your total sales and marketing spend.</strong> This includes:</p>
        <ul>
          <li>Ad spend (Google Ads, Meta, LinkedIn, etc.)</li>
          <li>Salaries and contractor fees for sales and marketing staff</li>
          <li>Software and tools (CRM, email platform, SEO tools)</li>
          <li>Agency fees and creative costs</li>
          <li>Content production costs</li>
        </ul>
        <p><strong>Step 2 — Count only new customers</strong> acquired in the same period. Do not include renewals or upsells.</p>
        <p><strong>Step 3 — Divide.</strong> Spent $36,000 and acquired 200 new customers: CAC = $36,000 ÷ 200 = <strong>$180</strong>.</p>

        <h2>3 Worked Examples</h2>
        <h3>Example 1: SaaS Company</h3>
        <p>Monthly spend: $45,000. New customers: 250.<br /><strong>CAC = $180</strong>. With $35/month × 24 months CLV = $840. LTV:CAC = 4.7:1. Strong.</p>

        <h3>Example 2: eCommerce Store</h3>
        <p>Monthly spend: $9,000. New customers: 200.<br /><strong>CAC = $45</strong>. With $85 AOV × 2.5/year × 2 years, CLV = $425. LTV:CAC = 9.4:1. Excellent.</p>

        <h3>Example 3: B2B Professional Services</h3>
        <p>Quarterly spend: $96,000. New clients: 30.<br /><strong>CAC = $3,200</strong>. With $15,000 ACV × 3-year lifespan, CLV = $45,000. LTV:CAC = 14:1.</p>

        <h2>CAC Benchmarks by Industry</h2>
        <table>
          <thead><tr><th>Industry</th><th>Typical CAC Range</th></tr></thead>
          <tbody>
            <tr><td>SaaS / Software</td><td>$200 – $700</td></tr>
            <tr><td>eCommerce</td><td>$30 – $80</td></tr>
            <tr><td>B2B Professional Services</td><td>$500 – $3,000+</td></tr>
            <tr><td>Healthcare</td><td>$300 – $600</td></tr>
            <tr><td>Financial Services</td><td>$500 – $1,200</td></tr>
            <tr><td>Real Estate</td><td>$1,000 – $5,000</td></tr>
          </tbody>
        </table>

        <h2>Common Mistakes When Calculating CAC</h2>
        <ul>
          <li><strong>Not including salaries.</strong> Staff costs can make up 50%+ of true CAC.</li>
          <li><strong>Using total customers instead of new customers.</strong> Inflates the denominator.</li>
          <li><strong>Blending channels.</strong> Calculate CAC by channel to find what to cut and what to scale.</li>
          <li><strong>Too-short time periods.</strong> Longer sales cycles need longer measurement windows.</li>
        </ul>

        <h2>What Is a Good CAC? The LTV:CAC Ratio</h2>
        <ul>
          <li><strong>Below 1:1</strong> — losing money on every customer.</li>
          <li><strong>1:1 to 3:1</strong> — marginally viable.</li>
          <li><strong>3:1 to 5:1</strong> — healthy. The widely cited benchmark.</li>
          <li><strong>Above 5:1</strong> — very profitable; consider increasing spend to acquire more.</li>
        </ul>
        <p>See <Link href="/blog/cac-vs-ltv-for-startups" className="text-orange-500 hover:text-orange-600">CAC vs LTV for Startups</Link> for the full ratio framework.</p>

        <h2>Related Calculators</h2>
        <ul>
          <li><Link href="/calculators/customer-acquisition-cost-calculator" className="text-orange-500 hover:text-orange-600">Customer Acquisition Cost Calculator</Link></li>
          <li><Link href="/calculators/customer-lifetime-value-calculator" className="text-orange-500 hover:text-orange-600">Customer Lifetime Value Calculator</Link></li>
          <li><Link href="/calculators/marketing-roi-calculator" className="text-orange-500 hover:text-orange-600">Marketing ROI Calculator</Link></li>
        </ul>
        <p>
          <strong>Need help interpreting your CAC?</strong>{" "}
          <a href="https://marketing-ai-psi-nine.vercel.app" className="text-orange-500 hover:text-orange-600">Get a marketing system review</a>{" "}
          — we build the content, outreach, and email systems that lower CAC without adding headcount.
        </p>
      </article>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />
    </BlogArticleLayout>
  );
}