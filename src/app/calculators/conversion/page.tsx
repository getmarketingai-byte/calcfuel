import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Conversion & Leads Calculators",
  description: "Free conversion and lead generation calculators: conversion rate, cost per lead, cost per acquisition, churn rate, and more.",
};

const tools = [
  { title: "Conversion Rate Calculator", slug: "conversion-rate-calculator", description: "Measure how effectively your pages turn visitors into customers." },
  { title: "Cost Per Lead Calculator", slug: "cost-per-lead-calculator", description: "Calculate your cost per lead and compare across channels." },
  { title: "Cost Per Acquisition Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate your cost to acquire a paying customer." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Find the revenue value of each marketing lead generated." },
  { title: "Churn Rate Calculator", slug: "churn-rate-calculator", description: "Measure how many customers you lose each period." },
];

export default function ConversionHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Conversion &amp; Leads Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Conversion &amp; Leads Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to measure and improve your conversion funnel and lead generation performance.</p>
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

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <article className="prose max-w-none">
        <h2>Why Conversion Metrics Matter</h2>
        <p>Conversion rate is one of the highest-leverage metrics in digital marketing. A 1% improvement in conversion rate can double your revenue without spending an extra dollar on traffic. Yet most marketers focus almost exclusively on acquiring more leads rather than converting the ones they already have.</p>
        <p>The conversion funnel has multiple stages — visitors to leads, leads to qualified prospects, prospects to customers. Each stage has its own conversion rate, and small improvements compound dramatically across the entire funnel.</p>

        <h2>Key Conversion Metrics Explained</h2>
        <h3>Conversion Rate</h3>
        <p>Conversion rate measures what percentage of visitors complete a desired action — filling out a form, making a purchase, or booking a demo. It is calculated by dividing conversions by total visitors and multiplying by 100. Average landing page conversion rates sit between 2 and 5%. Top-performing pages convert at 10% or higher.</p>
        <h3>Cost Per Lead (CPL)</h3>
        <p>CPL measures how much you spend to generate each new lead. It is calculated by dividing total marketing spend by the number of leads generated. Acceptable CPL varies by industry and average deal size — a $50,000 B2B deal can justify a $500 CPL, while a $50 product should target under $5.</p>
        <h3>Cost Per Acquisition (CPA)</h3>
        <p>CPA measures how much it costs to acquire a paying customer, not just a lead. It accounts for your lead-to-customer conversion rate. If your CPL is $20 and 10% of leads become customers, your CPA is $200. CPA must always be compared against customer lifetime value (LTV) — your CPA should be no more than one third of LTV for a healthy unit economics model.</p>
        <h3>Churn Rate</h3>
        <p>Churn rate measures what percentage of customers cancel or stop buying each period. Even a 2% monthly churn rate means losing nearly 22% of your customer base annually. Reducing churn by even 1% has a larger impact on revenue than most acquisition improvements.</p>

        <h2>How to Improve Conversion Performance</h2>
        <ol>
          <li><strong>Optimise your landing pages.</strong> Test headlines, CTA copy, form length, and page layout. Remove friction — every extra field reduces conversion rate by 10–15%.</li>
          <li><strong>Qualify leads earlier.</strong> Better-qualified leads convert at higher rates and have lower CPA even if they cost more per lead upfront.</li>
          <li><strong>Map your full funnel.</strong> Calculate conversion rates at each stage to identify where prospects are dropping off. Fix the leakiest stage first.</li>
          <li><strong>Improve lead nurturing.</strong> Most leads are not ready to buy immediately. A structured email or content nurture sequence can double lead-to-customer conversion rates.</li>
          <li><strong>Reduce churn proactively.</strong> Identify customers at risk of churning using engagement signals and reach out before they cancel.</li>
        </ol>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
