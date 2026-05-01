import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import MarketingROICalc from "./MarketingROICalc";

export const metadata: Metadata = {
  title: "Marketing ROI Calculator - Measure Your Marketing Returns",
  description: "Free marketing ROI calculator. Calculate your exact return on marketing investment. Enter spend and revenue to get ROI percentage, profit, and benchmarks.",
};

const relatedTools = [
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Calculate Return on Ad Spend for paid campaigns." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project leads and revenue." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure your email campaign engagement." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Measure the ROI of your social media campaigns." },
];

const faqs = [
  { question: "What is a good marketing ROI?", answer: "A general benchmark is 5:1 (500% ROI). For digital marketing, 3:1 is considered acceptable, 5:1 is good, and anything above 10:1 is excellent." },
  { question: "How do you calculate marketing ROI?", answer: "Marketing ROI = ((Revenue - Marketing Cost) ÷ Marketing Cost) × 100. For example, $10,000 revenue on $2,000 spend = (($10,000 - $2,000) ÷ $2,000) × 100 = 400% ROI." },
  { question: "What should be included in marketing costs?", answer: "Include all campaign spend: ad spend, agency fees, tools/software, staff time attributed to the campaign, content creation, and any other direct costs." },
  { question: "How is marketing ROI different from ROAS?", answer: "ROAS measures revenue divided by ad spend only, while ROI accounts for all marketing costs and subtracts them from revenue. ROI gives a fuller picture of profitability." },
];

export default function MarketingROIPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Marketing ROI Calculator"
        description="Free marketing ROI calculator. Calculate the return on your marketing investment instantly with net profit and ROI percentage."
        url="https://calcfuel.com/calculators/marketing-roi-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial & ROI", url: "https://calcfuel.com/calculators/financial" },
          { name: "Marketing ROI Calculator", url: "https://calcfuel.com/calculators/marketing-roi-calculator" },
        ]}
        faqs={faqs}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link><span className="mx-2">/</span>
        <span>Marketing ROI Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Marketing ROI Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate the return on your marketing investment. Enter your revenue and costs to see your ROI and net profit instantly.</p>
      <AdSenseUnit format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <MarketingROICalc />
      <AdSenseUnit format="rectangle" style={{ minHeight: 250 }} className="my-8" />
      <article className="prose max-w-none mt-4">
        <h2>What Is Marketing ROI?</h2>
        <p>Marketing ROI (Return on Investment) measures how much revenue your marketing activities generate relative to what you spend. It is the fundamental metric for understanding whether your marketing is profitable. Every marketing dollar should be tracked against revenue to calculate true ROI.</p>
        <p>Unlike vanity metrics such as impressions and followers, marketing ROI ties directly to business outcomes. A 200% ROI means for every dollar spent on marketing, you generated three dollars in revenue — a two-dollar net profit per dollar invested.</p>
        <h2>The Marketing ROI Formula</h2>
        <p><strong>Marketing ROI (%) = ((Revenue Generated minus Marketing Cost) divided by Marketing Cost) multiplied by 100</strong></p>
        <p>Example: a campaign generated 50,000 dollars in revenue and cost 10,000 dollars. ROI = ((50,000 minus 10,000) divided by 10,000) multiplied by 100 = <strong>400%</strong>.</p>
        <h2>What Is a Good Marketing ROI?</h2>
        <p>The 5:1 rule — earning five dollars for every dollar spent (400% ROI) — is widely cited as a solid benchmark. Here is a general guide:</p>
        <ul>
          <li><strong>Under 100% ROI:</strong> Below average — review your strategy</li>
          <li><strong>100 to 200% ROI:</strong> Acceptable — positive but could be stronger</li>
          <li><strong>200 to 400% ROI:</strong> Good — healthy return worth scaling</li>
          <li><strong>400%+ ROI:</strong> Excellent — consider doubling down on what is working</li>
        </ul>
        <h2>Why Marketing ROI Is Challenging to Measure</h2>
        <p>The biggest challenge is attribution — figuring out which marketing activity caused a sale. Multi-touch attribution models tell different stories. Best practice: track UTM parameters on all campaigns, connect your CRM to your ad platforms, and review which channels are driving closed revenue, not just leads.</p>
        <h2>How to Improve Your Marketing ROI</h2>
        <ol>
          <li><strong>Cut underperforming channels.</strong> Reallocate budget from low-ROI channels to high-ROI ones. Even a 10% reallocation can meaningfully shift total ROI.</li>
          <li><strong>Improve conversion rates.</strong> A 1% improvement in conversion rate can double your ROI without increasing spend.</li>
          <li><strong>Increase average order value.</strong> Upsells, cross-sells, and bundles lift revenue per customer without increasing acquisition cost.</li>
          <li><strong>Reduce wasted ad spend.</strong> Negative keywords, audience exclusions, and dayparting eliminate impressions that never convert.</li>
        </ol>
      </article>
      <AdSenseUnit format="auto" style={{ minHeight: 100 }} className="my-8" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
