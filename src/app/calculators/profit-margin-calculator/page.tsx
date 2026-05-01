import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProfitMarginCalc from "./ProfitMarginCalc";

export const metadata: Metadata = {
  title: "Profit Margin Calculator - Calculate Gross Profit Margin",
  description: "Free profit margin calculator. Instantly calculate gross profit and profit margin percentage from revenue and cost of goods sold. Includes benchmarks by industry.",
};

const relatedTools = [
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the point where revenue covers all your costs." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your marketing investment." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Calculate how much revenue each lead generates." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track your average transaction value." },
];

const faqs = [
  { question: "What is a good profit margin?", answer: "It depends on your industry. Retail typically sees 2–5% net margins, SaaS and software 15–30%, professional services 20–40%, and eCommerce 10–20%. Gross margin (which this calculator measures) should be higher — aim for 40–60% in product businesses and 60–80%+ in service or software businesses." },
  { question: "What is the difference between gross profit margin and net profit margin?", answer: "Gross profit margin subtracts only the direct cost of goods sold (COGS) from revenue. Net profit margin subtracts all expenses — COGS, operating expenses, taxes, and interest — from revenue. Gross margin shows your production efficiency; net margin shows your overall business profitability." },
  { question: "How do I calculate profit margin?", answer: "Profit Margin (%) = ((Revenue − COGS) ÷ Revenue) × 100. For example: $100,000 revenue minus $60,000 COGS = $40,000 gross profit. $40,000 ÷ $100,000 × 100 = 40% gross profit margin." },
  { question: "What should I include in COGS?", answer: "COGS (Cost of Goods Sold) includes the direct costs of producing your goods or services: raw materials, direct labour, manufacturing overhead, packaging, and shipping costs. It does NOT include marketing, sales salaries, rent, or administrative expenses — those are operating expenses." },
  { question: "How can I improve my profit margin?", answer: "The two levers are increasing revenue and reducing COGS. On the revenue side: raise prices, upsell higher-margin products, or shift toward higher-value customer segments. On the cost side: negotiate better supplier rates, optimise production processes, reduce waste, or switch to lower-cost inputs without sacrificing quality." },
  { question: "Is a higher profit margin always better?", answer: "Generally yes, but very high margins can attract competition or signal underinvestment in growth. Margin targets should be set in context of your growth stage: early-stage companies often accept thin margins to win market share, while mature businesses focus on margin expansion." },
];

const howToSteps = [
  { name: "Enter your revenue", text: "Input the total revenue for the period you are measuring — monthly, quarterly, or annually." },
  { name: "Enter your cost of goods sold (COGS)", text: "Enter the direct costs of delivering your product or service: materials, direct labour, and production overheads." },
  { name: "Read your results", text: "The calculator instantly shows your gross profit in dollars and your profit margin as a percentage." },
  { name: "Compare to your industry benchmark", text: "Use the benchmarks in the article below to assess whether your margin is healthy for your sector." },
];

export default function ProfitMarginPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Profit Margin Calculator"
        description="Free profit margin calculator. Calculate gross profit and profit margin percentage from revenue and cost of goods sold."
        url="https://calcfuel.com/calculators/profit-margin-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Profit Margin Calculator", url: "https://calcfuel.com/calculators/profit-margin-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Profit Margin Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Profit Margin Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your gross profit and profit margin instantly. Enter your revenue and cost of goods sold to see your margin percentage and dollar profit.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <ProfitMarginCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Is Profit Margin?</h2>
        <p>Profit margin is one of the most fundamental metrics in business — it tells you what percentage of your revenue you actually keep after covering your costs. A business with $1 million in revenue and 20% gross margin keeps $200,000 to cover operating expenses and generate profit. The same business with a 40% margin keeps $400,000 — double the amount to invest in growth, cover overheads, and return to owners.</p>
        <p>This calculator measures gross profit margin: the margin after subtracting the direct cost of goods sold (COGS) from revenue. Gross margin is the starting point for understanding business economics. If your gross margin is thin, no amount of cost-cutting elsewhere will save you — the fundamental unit economics are broken. If your gross margin is healthy, you have room to invest in sales, marketing, and operations to scale.</p>
        <p>Understanding profit margin is essential for pricing decisions, supplier negotiations, product mix strategy, and investor conversations. When you know your margin by product line, customer segment, or channel, you can make data-driven decisions about where to focus growth efforts.</p>

        <h2>The Profit Margin Formula</h2>
        <p><strong>Gross Profit = Revenue − Cost of Goods Sold (COGS)</strong></p>
        <p><strong>Gross Profit Margin (%) = (Gross Profit ÷ Revenue) × 100</strong></p>
        <p><strong>Example:</strong> A product business has $250,000 in quarterly revenue. The cost of goods sold (materials, manufacturing, packaging, shipping) is $150,000. Gross Profit = $250,000 − $150,000 = $100,000. Margin = ($100,000 ÷ $250,000) × 100 = <strong>40%</strong>. This means for every dollar of revenue, 40 cents is available to cover operating expenses and profit.</p>

        <h2>What to Include in COGS</h2>
        <p>Cost of Goods Sold includes only the direct costs of producing your product or delivering your service. Getting this right is critical — understating COGS inflates your apparent margin and leads to poor pricing and investment decisions.</p>
        <ul>
          <li><strong>Physical products:</strong> Raw materials, components, packaging, direct manufacturing labour, quality control, inbound freight, and warehousing directly tied to production.</li>
          <li><strong>Digital products / SaaS:</strong> Hosting, server costs, payment processing fees, third-party APIs directly required to deliver the product, and support costs directly tied to customer success.</li>
          <li><strong>Services:</strong> Billable staff hours, contractor costs, and materials consumed in delivering the service.</li>
          <li><strong>Not in COGS:</strong> Sales salaries, marketing spend, office rent, administrative staff, software tools not directly tied to delivery, and management overhead. These are operating expenses that come out below the gross profit line.</li>
        </ul>

        <h2>Profit Margin Benchmarks by Industry</h2>
        <p>Gross margin benchmarks vary dramatically by industry. Here is a reference guide for Australian businesses:</p>
        <ul>
          <li><strong>SaaS / Software:</strong> 70–85% gross margin. Low COGS because delivery is largely automated; most costs are in sales, marketing, and R&amp;D (operating expenses).</li>
          <li><strong>Professional services / consulting:</strong> 50–70%. Primary COGS is billable labour. Margins compress as you hire junior staff before they reach full utilisation.</li>
          <li><strong>eCommerce / online retail:</strong> 30–50%. Depends heavily on product category, supplier relationships, and whether you hold inventory.</li>
          <li><strong>Physical retail:</strong> 25–50%. Grocery and convenience: 20–30%. Fashion and specialty retail: 40–60%.</li>
          <li><strong>Manufacturing:</strong> 20–40%. Capital-intensive with significant raw material and labour costs.</li>
          <li><strong>Restaurants / hospitality:</strong> 60–70% gross margin (food cost only), but after labour gross margin drops to 30–40%.</li>
          <li><strong>Construction:</strong> 15–25% gross margin. Tight margins with significant subcontractor and materials costs.</li>
        </ul>

        <h2>5 Strategies to Improve Your Profit Margin</h2>
        <ol>
          <li><strong>Raise prices strategically.</strong> Many businesses undercharge. A 10% price increase on a product with 30% margins increases gross profit by 33%. Test price increases in lower-visibility segments first to measure elasticity before rolling out broadly.</li>
          <li><strong>Negotiate supplier costs.</strong> Request volume discounts, extend payment terms, or dual-source to create competitive tension. A 5% reduction in COGS on a $1M revenue business with 40% margins improves gross profit by $50,000 — a significant gain.</li>
          <li><strong>Shift product mix toward higher-margin SKUs.</strong> Analyse margin by product line and actively promote your highest-margin offerings. Retire or price up low-margin products that consume disproportionate operational complexity.</li>
          <li><strong>Reduce waste and improve yield.</strong> In manufacturing and food service, even small improvements in yield (the ratio of usable output to input) compound into meaningful margin improvements at scale.</li>
          <li><strong>Increase average order value.</strong> Upselling and cross-selling increase revenue without proportionally increasing COGS, lifting your margin percentage. Bundling products, offering premium tiers, and training sales teams on upselling are high-ROI margin improvement levers.</li>
        </ol>

        <h2>Gross Margin vs. Net Margin</h2>
        <p>Gross margin (what this calculator measures) is a key operational metric. Net margin — which subtracts all operating expenses, interest, and taxes — is the bottom-line profitability measure. Both are important for different decisions.</p>
        <p>A business can have a healthy gross margin but a poor net margin if operating expenses are excessive: sales team bloat, marketing overspend, excessive software subscriptions, or high rent. Conversely, a thin gross margin creates a structural ceiling on net margin regardless of how efficiently you run operations. Fix gross margin problems at the pricing and COGS level; fix net margin problems at the operating expense level.</p>
        <p>When benchmarking your business or preparing for investment, report both. Investors and acquirers typically focus on gross margin as a signal of business model quality and on EBITDA margin as a proxy for operational efficiency.</p>
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

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
