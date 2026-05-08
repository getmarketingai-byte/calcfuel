import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "How to Calculate Ad Spend ROI: A Complete Guide",
  description: "ROAS vs ROI explained, the ad spend ROI formula, 3 worked examples, attribution models, and when to cut a campaign.",
  path: "/blog/how-to-calculate-ad-spend-roi",
  type: "article",
});

export default function AdSpendROIArticlePage() {
  return (
    <BlogArticleLayout
      title="How to Calculate Ad Spend ROI: A Complete Guide"
      category="Paid Advertising"
      readTime="10 min read"
      publishedDate="2026-05-09"
      slug="how-to-calculate-ad-spend-roi"
      description="Most advertisers track ROAS. Fewer track actual ROI. The formula, three worked examples, and when to cut a campaign."
      authorName="CalcFuel Editorial Team"
      authorRole="Marketing Measurement Specialists"
      authorBio="Our team builds practical calculators and guides for operators who need reliable marketing math and decision-ready benchmarks."
      relatedLinks={[
        { href: "/blog/roas-vs-profitability", label: "ROAS vs Profitability: When Good Campaigns Still Lose Money" },
        { href: "/blog/what-is-a-good-roas", label: "What Is a Good ROAS? Calculator + Industry Benchmarks" },
      ]}
    >
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your ad spend ROI instantly</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your ad spend, revenue, and gross margin to get your true ROI.</p>
        <Link href="/calculators/ad-spend-calculator" className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
          Open the Ad Spend Calculator
        </Link>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2>ROAS vs ROI: What Is the Difference?</h2>
        <p><strong>ROAS</strong> = Revenue from Ads divided by Ad Spend. Revenue per dollar of ad spend. Platform default metric.</p>
        <p><strong>ROI</strong> = ((Revenue minus Total Cost) divided by Total Cost) times 100. Actual profit after all costs including COGS.</p>
        <p>A 4x ROAS campaign can still be unprofitable. A 30 percent margin retailer needs 3.3x ROAS just to break even on ad spend before other operating costs.</p>
        <h2>The Ad Spend ROI Formula</h2>
        <p><strong>Ad Spend ROI percent = ((Gross Profit from Ads minus Ad Spend) divided by Ad Spend) times 100</strong></p>
        <p>Where: Gross Profit = Revenue times Gross Margin percent</p>
        <h2>3 Worked Examples</h2>
        <h3>Example 1: Google Search Ads (eCommerce)</h3>
        <p>Ad spend: $2,000. Revenue: $8,000. 45 percent gross margin. Gross profit = $3,600. <strong>ROI = 80 percent</strong>. ROAS = 4x. Profitable but margin-constrained.</p>
        <h3>Example 2: Facebook Retargeting</h3>
        <p>Ad spend: $500. Revenue: $2,500. 45 percent gross margin. Gross profit = $1,125. <strong>ROI = 125 percent</strong>. ROAS = 5x. Retargeting captures pre-existing intent.</p>
        <h3>Example 3: LinkedIn B2B Ads</h3>
        <p>Monthly spend: $3,000. 15 leads at 20 percent close = 3 clients at $5,000 ACV = $15,000. 70 percent GM. Gross profit = $10,500. <strong>ROI = 250 percent</strong>. High CPL justified by high CLV.</p>
        <h2>Attribution Models and How They Affect ROI</h2>
        <table>
          <thead><tr><th>Model</th><th>How It Works</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td>Last-click</td><td>100 percent credit to final touchpoint</td><td>Simple funnels</td></tr>
            <tr><td>First-click</td><td>100 percent credit to first touchpoint</td><td>Awareness campaigns</td></tr>
            <tr><td>Linear</td><td>Equal credit across all touchpoints</td><td>Multi-touch B2B journeys</td></tr>
            <tr><td>Data-driven</td><td>ML assigns credit by conversion patterns</td><td>High-volume Google Ads accounts</td></tr>
          </tbody>
        </table>
        <p>Last-click (platform default) overstates bottom-of-funnel channels. Use consistent attribution when comparing ROI across channels.</p>
        <h2>When to Kill a Campaign</h2>
        <ol>
          <li><strong>Negative ROI after 3-5x target CPA spend.</strong> The data is clear — cut it.</li>
          <li><strong>Payback period exceeds cash flow capacity.</strong> ROI-positive on paper but cash-negative for months is unsustainable.</li>
          <li><strong>Opportunity cost too high.</strong> Redeploy if same budget delivers 3x the ROI elsewhere.</li>
          <li><strong>Volume ceiling reached.</strong> More spend only increases CPCs — find a new channel.</li>
        </ol>
        <h2>What Is a Good Ad Spend ROI?</h2>
        <table>
          <thead><tr><th>Channel</th><th>Typical ROI Range</th></tr></thead>
          <tbody>
            <tr><td>Google Search</td><td>100-300 percent</td></tr>
            <tr><td>Google Shopping</td><td>80-250 percent</td></tr>
            <tr><td>Facebook / Instagram</td><td>50-200 percent</td></tr>
            <tr><td>LinkedIn Ads</td><td>50-300 percent (high CPL, high CLV in B2B)</td></tr>
          </tbody>
        </table>
        <p>For paid channels, ROI above 100 percent is the minimum viable threshold. Below that, you are destroying value.</p>
        <h2>Related Calculators</h2>
        <ul>
          <li><Link href="/calculators/ad-spend-calculator" className="text-orange-500 hover:text-orange-600">Ad Spend Calculator</Link></li>
          <li><Link href="/calculators/roas-calculator" className="text-orange-500 hover:text-orange-600">ROAS Calculator</Link></li>
          <li><Link href="/calculators/marketing-roi-calculator" className="text-orange-500 hover:text-orange-600">Marketing ROI Calculator</Link></li>
        </ul>
        <p>
          <strong>Is your ad spend actually profitable?</strong>{" "}
          <a href="https://marketing-ai-psi-nine.vercel.app" className="text-orange-500 hover:text-orange-600">Get a marketing system review</a>{" "}
          — we build the content and outreach systems that reduce reliance on paid acquisition and improve overall marketing ROI.
        </p>
      </article>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />
    </BlogArticleLayout>
  );
}
