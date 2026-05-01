import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import ROASCalc from "./ROASCalc";

export const metadata: Metadata = {
  title: "ROAS Calculator — Return on Ad Spend",
  description: "Free ROAS calculator. Calculate your Return on Ad Spend instantly. Includes ROAS benchmarks by industry and tips to improve ad performance.",
};

const relatedTools = [
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total return on marketing investment." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from your ad budget." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate ROI from social media campaigns." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure engagement with your email campaigns." },
];

export default function ROASPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link><span className="mx-2">/</span>
        <span>ROAS Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">ROAS Calculator — Return on Ad Spend</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your Return on Ad Spend. Enter revenue from ads and total ad spend to instantly see your ROAS ratio.</p>
      <AdSenseUnit format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <ROASCalc />
      <AdSenseUnit format="rectangle" style={{ minHeight: 250 }} className="my-8" />
      <article className="prose max-w-none mt-4">
        <h2>What Is ROAS?</h2>
        <p>ROAS stands for Return on Ad Spend. It measures how much revenue you earn for every dollar you spend on advertising. Unlike ROI, which measures overall profitability after all costs, ROAS specifically isolates the performance of your paid advertising spend.</p>
        <p>ROAS is expressed as a ratio — a ROAS of 4x means for every dollar spent on ads, you generated four dollars in revenue. It is one of the most widely used KPIs in digital advertising, used by Google Ads, Meta Ads, TikTok Ads, and most other platforms.</p>
        <h2>The ROAS Formula</h2>
        <p><strong>ROAS = Revenue from Ads divided by Ad Spend</strong></p>
        <p>Example: if your Facebook Ads campaign generated $20,000 in sales and cost $5,000 to run, your ROAS = $20,000 / $5,000 = <strong>4x</strong>.</p>
        <h2>ROAS vs ROI — What Is the Difference?</h2>
        <p>ROAS only considers ad spend in the denominator. ROI considers all costs including product costs, salaries, agency fees, and overheads. A ROAS of 4x might still be unprofitable if margins are thin. Calculate your break-even ROAS using: 1 divided by Gross Margin. A business with 30% gross margins needs a minimum ROAS of 3.33x to break even on ad spend.</p>
        <h2>ROAS Benchmarks by Platform and Industry</h2>
        <ul>
          <li><strong>Google Search Ads:</strong> 3 to 5x average, 8x or higher is excellent</li>
          <li><strong>Meta Ads (Facebook and Instagram):</strong> 2 to 4x average</li>
          <li><strong>eCommerce retail:</strong> 3 to 4x is the typical minimum viable</li>
          <li><strong>B2B Lead Generation:</strong> 2 to 3x measured on closed deal revenue</li>
          <li><strong>SaaS and Subscriptions:</strong> 1.5 to 3x adjusted for lifetime value</li>
        </ul>
        <h2>How to Improve Your ROAS</h2>
        <ol>
          <li><strong>Improve ad creative and copy.</strong> Higher click-through rate and conversion rate directly lift ROAS without increasing spend.</li>
          <li><strong>Tighten targeting.</strong> Exclude audiences unlikely to convert. Negative audience lists reduce wasted impressions.</li>
          <li><strong>Optimise your landing page.</strong> A page that converts at 5% versus 2% triples your effective ROAS from the same ad spend.</li>
          <li><strong>Use revenue-aligned bid strategies.</strong> Target ROAS bidding on Google and Advantage+ on Meta optimise toward revenue events.</li>
          <li><strong>Increase average order value.</strong> Upsell and cross-sell on the checkout page to lift revenue per conversion without changing spend.</li>
        </ol>
      </article>
      <AdSenseUnit format="auto" style={{ minHeight: 100 }} className="my-8" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
