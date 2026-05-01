import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import AdSpendCalc from "./AdSpendCalc";

export const metadata: Metadata = {
  title: "Ad Spend Calculator — Project Clicks, Leads and Revenue",
  description: "Free ad spend calculator. Enter your budget, CPC, conversion rate, and deal value to project clicks, leads, revenue, ROI, and ROAS. Plan your ad campaigns with confidence.",
};

const relatedTools = [
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Calculate your Return on Ad Spend." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total return on marketing investment." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate ROI from social media advertising." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure email campaign engagement." },
];

export default function AdSpendPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link><span className="mx-2">/</span>
        <span>Ad Spend Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Ad Spend Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Enter your ad budget, CPC, conversion rate, and deal value to project your expected clicks, leads, revenue, ROI, and ROAS before you spend a dollar.</p>
      <AdSenseUnit format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <AdSpendCalc />
      <AdSenseUnit format="rectangle" style={{ minHeight: 250 }} className="my-8" />
      <article className="prose max-w-none mt-4">
        <h2>How to Use the Ad Spend Calculator</h2>
        <p>Planning a paid advertising campaign without projections is flying blind. This ad spend calculator lets you model your expected outcomes — clicks, leads, revenue, ROI, and ROAS — before you commit your budget. It works for Google Ads, Meta Ads, LinkedIn Ads, and any CPC-based platform.</p>
        <h2>Understanding the Four Key Inputs</h2>
        <ul>
          <li><strong>Ad Budget:</strong> Your total planned spend for the campaign period. Typically set monthly for ongoing campaigns or as a fixed amount for one-off promotions.</li>
          <li><strong>Cost Per Click (CPC):</strong> The average amount you pay each time someone clicks your ad. CPC varies widely — Google Search averages $1 to $5 for most industries, but legal, finance, and SaaS keywords can exceed $50 per click.</li>
          <li><strong>Conversion Rate:</strong> The percentage of visitors who take your desired action (sign up, purchase, book a call). Industry average landing page conversion rates are 2 to 5%, but well-optimised pages can reach 10 to 20%.</li>
          <li><strong>Average Deal Value:</strong> How much revenue a single conversion generates. For eCommerce, use average order value. For B2B, use your typical contract or deal size.</li>
        </ul>
        <h2>CPC Benchmarks by Platform (2024)</h2>
        <ul>
          <li><strong>Google Search Ads:</strong> $1 to $5 average (varies hugely by keyword and industry)</li>
          <li><strong>Facebook and Instagram Ads:</strong> $0.50 to $3.00 per click</li>
          <li><strong>LinkedIn Ads:</strong> $5 to $15 per click (higher intent, higher CPC)</li>
          <li><strong>TikTok Ads:</strong> $0.20 to $1.00 per click</li>
          <li><strong>Display and Programmatic:</strong> $0.10 to $0.80 per click</li>
        </ul>
        <h2>How to Improve Your Ad Spend Efficiency</h2>
        <ol>
          <li><strong>Lower your CPC.</strong> Better Quality Scores on Google, more relevant targeting on Meta, and strong ad creative all reduce what you pay per click.</li>
          <li><strong>Improve your conversion rate.</strong> A 2% to 4% lift doubles your leads without changing spend. Test headlines, CTAs, social proof, and offer clarity.</li>
          <li><strong>Increase average deal value.</strong> Upsells, bundles, and premium tiers lift revenue per conversion, making your ad spend go further.</li>
          <li><strong>Eliminate low-performing ad sets.</strong> Regularly pause ad sets with high CPC and low conversion rates. Concentrate budget on proven performers.</li>
          <li><strong>Use retargeting.</strong> Retargeted visitors convert 3 to 5 times higher than cold traffic at a fraction of the CPC. Allocate 20 to 30% of budget to retargeting.</li>
        </ol>
        <h2>What Is a Good Ad Spend to Revenue Ratio?</h2>
        <p>A common rule of thumb is to aim for at least a 3:1 revenue-to-ad-spend ratio (ROAS of 3x). For businesses with gross margins above 50%, a 2x ROAS may still be profitable after cost of goods. For thin-margin businesses, you may need 5x or higher ROAS to generate meaningful net profit. Always calculate your break-even ROAS (1 divided by gross margin percent) before setting campaign targets.</p>
      </article>
      <AdSenseUnit format="auto" style={{ minHeight: 100 }} className="my-8" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
