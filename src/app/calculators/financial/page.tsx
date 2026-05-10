import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Financial Calculators",
  description: "Free financial calculators: ROI, ROAS, ad spend, and more. Make data-driven budget decisions.",
};

const tools = [
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your total marketing investment." },
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Measure return on ad spend for your paid campaigns." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project clicks, leads, and revenue." },
  { title: "Australian GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price — instant results for invoicing and BAS." },
  { title: "Mortgage Repayment Calculator", slug: "mortgage-repayment-calculator", description: "Calculate Australian home loan repayments monthly, fortnightly, or weekly. Compare frequencies and see total interest." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Calculate how savings or investments grow with compound interest. Includes regular contributions and year-by-year breakdown." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement. Includes employer SG, voluntary contributions, and year-by-year growth." },
];

export default function FinancialHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Financial Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Financial Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Make smarter budget decisions with these free financial calculators.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <article className="prose max-w-none">
        <h2>Why Financial Metrics Are the Foundation of Marketing</h2>
        <p>Marketing without financial measurement is guesswork. Every campaign you run, every dollar you spend, and every channel you invest in should be tied back to measurable financial outcomes. The most successful marketing teams treat their budgets like investments — tracking ROI, ROAS, and ad spend efficiency the same way a CFO tracks business performance.</p>
        <p>These free financial calculators give you instant answers on the metrics that matter most: how much your marketing is returning, how efficiently your ad spend is converting to revenue, and how to model campaign outcomes before committing budget. Use them to make data-driven decisions, justify spend to stakeholders, and identify underperforming channels before they drain your budget.</p>

        <h2>The Three Core Financial Marketing Metrics</h2>
        <h3>Marketing ROI (Return on Investment)</h3>
        <p>Marketing ROI measures the total return on your marketing investment across all channels — including salaries, agency fees, tools, and ad spend. The formula is: ((Revenue Generated minus Total Marketing Cost) divided by Total Marketing Cost) multiplied by 100. A positive ROI means your marketing is generating more revenue than it costs. The benchmark to beat is a 5:1 ratio — five dollars earned for every dollar spent — which equates to a 400% ROI.</p>
        <h3>ROAS (Return on Ad Spend)</h3>
        <p>ROAS specifically measures the return on paid advertising spend. Unlike marketing ROI, it excludes non-ad costs and focuses purely on how much revenue each ad dollar generates. ROAS is expressed as a multiple: a ROAS of 4x means $4 in revenue for every $1 in ad spend. Most businesses need a minimum of 3x ROAS to remain profitable after accounting for cost of goods and operational overheads.</p>
        <h3>Ad Spend Efficiency</h3>
        <p>Ad spend efficiency looks at how effectively your budget converts into business outcomes — clicks, leads, and revenue. By modelling your CPC (cost per click), conversion rate, and average deal value, you can project campaign outcomes before spending a single dollar. This enables better budget allocation across channels and prevents over-investment in low-performing campaigns.</p>

        <h2>Financial Benchmarks for Marketing</h2>
        <ul>
          <li><strong>Marketing ROI target:</strong> 400%+ (5:1 revenue-to-cost ratio)</li>
          <li><strong>ROAS minimum:</strong> 3x for most businesses; 2x for high-margin businesses</li>
          <li><strong>Google Search average CPC:</strong> $1–$5 (varies heavily by industry)</li>
          <li><strong>Landing page conversion rate:</strong> 2–5% average; 10%+ for optimised pages</li>
          <li><strong>Marketing budget as % of revenue:</strong> 5–10% for established businesses; 10–20% for growth-stage companies</li>
        </ul>

        <h2>How to Use These Financial Calculators</h2>
        <ol>
          <li><strong>Benchmark your current performance.</strong> Enter your actual revenue and cost figures to see your current ROI and ROAS. Compare against benchmarks to identify gaps.</li>
          <li><strong>Model new campaigns before launch.</strong> Use the Ad Spend Calculator to project expected outcomes from a new campaign. If the projected ROI is negative at realistic conversion rates, reconsider the channel or offer before committing budget.</li>
          <li><strong>Set performance targets.</strong> Work backwards from your revenue goals. If you need $50,000 in revenue and your average ROAS is 4x, you need $12,500 in ad spend. Use this to build accurate budget proposals.</li>
          <li><strong>Track and iterate.</strong> Compare projected versus actual results monthly. Consistent underperformance against projections signals problems with targeting, creative, landing pages, or offer — each of which can be fixed independently.</li>
        </ol>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
