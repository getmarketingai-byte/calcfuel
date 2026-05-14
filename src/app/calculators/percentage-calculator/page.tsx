import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import PercentageCalc from "./PercentageCalc";
import CalcReviewedBy from "@/components/CalcReviewedBy";

export const metadata: Metadata = {
  title: "Percentage Calculator — Fast, Free & Accurate | CalcFuel",
  description: "Free percentage calculator. Find what percent X is of Y, calculate percentage change, percentage difference, and more. Instant results, no sign-up.",
  alternates: { canonical: "/calculators/percentage-calculator" },
};

const relatedTools = [
  { title: "GST Calculator Australia", slug: "gst-calculator", description: "Add or remove Australian GST (10%) from any price." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross, net, and operating profit margins instantly." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your take-home pay for 2025–26." },
  { title: "Tip Calculator", slug: "tip-calculator", description: "Calculate tips and split bills for any group size." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all your costs." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track and improve your average transaction value." },
];

const faqs = [
  {
    question: "How do I calculate a percentage of a number?",
    answer: "To find X% of a number Y, multiply Y by X and divide by 100. For example, 15% of 200 = (15 × 200) ÷ 100 = 30. You can also multiply by the decimal: 0.15 × 200 = 30.",
  },
  {
    question: "How do I find what percentage one number is of another?",
    answer: "Divide the part by the whole, then multiply by 100. For example, what percentage is 30 of 200? (30 ÷ 200) × 100 = 15%. So 30 is 15% of 200.",
  },
  {
    question: "How do I calculate percentage change?",
    answer: "Percentage change = ((New Value − Old Value) ÷ |Old Value|) × 100. If the result is positive, it is an increase. If negative, it is a decrease. Example: from $80 to $100 is ((100 − 80) ÷ 80) × 100 = 25% increase.",
  },
  {
    question: "What is the difference between percentage change and percentage difference?",
    answer: "Percentage change compares a new value to an original value (direction matters). Percentage difference compares two values without implying one came first — it uses the average of the two values as the denominator.",
  },
  {
    question: "How do I add or subtract a percentage from a number?",
    answer: "To add X% to a number Y: Y × (1 + X/100). Example: add 10% to 250 = 250 × 1.10 = 275. To subtract X% from Y: Y × (1 − X/100). Example: subtract 20% from 150 = 150 × 0.80 = 120.",
  },
  {
    question: "How do I reverse a percentage increase?",
    answer: "If a price increased by X%, divide the new price by (1 + X/100) to find the original. Example: a price rose 25% to $125. Original = $125 ÷ 1.25 = $100. Do not simply subtract X% from the new price — that gives the wrong answer.",
  },
];

const howToSteps = [
  { name: "Choose a calculation type", text: "Select from: % of a number, what % is X of Y, % change, or % difference." },
  { name: "Enter your values", text: "Type in the two numbers you want to work with." },
  { name: "Read the result", text: "Your answer appears instantly — no button to press." },
];

export default function PercentageCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Percentage Calculator"
        description="Free percentage calculator. Find percentages of numbers, calculate percentage change and difference, instantly."
        url="https://calcfuel.com/calculators/percentage-calculator"
        datePublished="2025-10-01"
        dateModified="2026-05-15"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Percentage Calculator", url: "https://calcfuel.com/calculators/percentage-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link><span className="mx-2">/</span>
        <span>Percentage Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Percentage Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate percentages instantly — find X% of a number, work out what percentage one number is of another, or calculate percentage change between two values. Free and no sign-up required.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <PercentageCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Want to improve your marketing numbers?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          Understanding percentages is one thing — knowing which marketing metrics to move is another. Our <strong>50 AI Marketing Prompts</strong> help small business owners improve conversion rates, open rates, and ROI using AI.
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get 50 AI Marketing Prompts — from $19 &rarr;
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How to Calculate Percentages</h2>
        <p>Percentages are one of the most frequently used calculations in everyday life. Whether you are working out a discount at the shops, calculating interest on a loan, interpreting a change in your website traffic, or understanding a pay rise, percentages appear everywhere. This guide covers the four most common percentage calculations in plain English.</p>

        <h2>1. Finding X% of a Number</h2>
        <p>The most basic percentage calculation: &quot;What is 15% of 200?&quot;</p>
        <ul>
          <li><strong>Formula:</strong> Result = (Percentage &divide; 100) &times; Number</li>
          <li><strong>Example:</strong> 15% of 200 = (15 &divide; 100) &times; 200 = 0.15 &times; 200 = <strong>30</strong></li>
        </ul>
        <p>This calculation is used constantly: calculating tips, finding discounts, working out tax amounts, determining commission on a sale, or figuring out how much of your budget goes to a particular category.</p>

        <h2>2. What Percentage Is X of Y?</h2>
        <p>This is the reverse of the above — &quot;30 is what percentage of 200?&quot;</p>
        <ul>
          <li><strong>Formula:</strong> Percentage = (Part &divide; Whole) &times; 100</li>
          <li><strong>Example:</strong> 30 &divide; 200 &times; 100 = <strong>15%</strong></li>
        </ul>
        <p>Use this to find market share, conversion rates, test scores, or survey response proportions. If 340 of your 2,000 email subscribers opened a campaign, your open rate is (340 &divide; 2000) &times; 100 = 17%.</p>

        <h2>3. Percentage Change</h2>
        <p>Percentage change tells you how much something has grown or shrunk relative to its original value.</p>
        <ul>
          <li><strong>Formula:</strong> % Change = ((New &minus; Old) &divide; |Old|) &times; 100</li>
          <li><strong>Positive result</strong> = increase; <strong>negative result</strong> = decrease</li>
          <li><strong>Example (increase):</strong> Revenue went from $80,000 to $100,000. Change = ((100,000 &minus; 80,000) &divide; 80,000) &times; 100 = <strong>+25%</strong></li>
          <li><strong>Example (decrease):</strong> Traffic dropped from 5,000 to 3,500 visits. Change = ((3,500 &minus; 5,000) &divide; 5,000) &times; 100 = <strong>&minus;30%</strong></li>
        </ul>
        <p>Always use the original value as the denominator. A common mistake is to use the wrong base — if something increases 50% then decreases 50%, you do not end up where you started (you end up at 75% of the original).</p>

        <h2>4. Percentage Difference</h2>
        <p>Unlike percentage change, percentage difference is symmetric. It answers: &quot;How different are these two values relative to their average?&quot;</p>
        <ul>
          <li><strong>Formula:</strong> % Difference = (|A &minus; B| &divide; ((A + B) &divide; 2)) &times; 100</li>
          <li><strong>Example:</strong> Comparing $90 and $110. |90 &minus; 110| = 20. Average = 100. % Difference = 20%</li>
        </ul>

        <h2>Common Percentage Mistakes</h2>
        <p><strong>Reversing an increase incorrectly:</strong> If a price increases 20%, you cannot subtract 20% from the new price to get back to the original. If the original was $100, 20% increase = $120. To reverse: $120 &divide; 1.20 = $100. Subtracting 20% from $120 gives $96 — wrong.</p>
        <p><strong>Confusing percentage points with percentages:</strong> If interest rates rise from 2% to 3%, that is an increase of 1 percentage point, but a 50% increase in the rate itself.</p>
        <p><strong>Adding percentages of different bases:</strong> A 10% increase followed by a 10% decrease is not flat — it results in a 1% net loss. Each percentage is applied to a different base.</p>

        <h2>Percentages in Business</h2>
        <table>
          <thead>
            <tr><th>Metric</th><th>Formula</th><th>What it tells you</th></tr>
          </thead>
          <tbody>
            <tr><td>Profit margin</td><td>(Profit &divide; Revenue) &times; 100</td><td>Profitability per dollar of revenue</td></tr>
            <tr><td>Conversion rate</td><td>(Conversions &divide; Visitors) &times; 100</td><td>% of visitors who take action</td></tr>
            <tr><td>Email open rate</td><td>(Opens &divide; Delivered) &times; 100</td><td>How engaging your subject lines are</td></tr>
            <tr><td>Churn rate</td><td>(Lost customers &divide; Starting customers) &times; 100</td><td>Customer retention over a period</td></tr>
            <tr><td>YoY growth</td><td>((This year &minus; Last year) &divide; Last year) &times; 100</td><td>Annual growth rate</td></tr>
          </tbody>
        </table>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200"><strong>Disclaimer:</strong> This calculator provides estimates only and should not be treated as financial advice. Consult a qualified accountant or financial adviser for advice specific to your situation.</aside>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
