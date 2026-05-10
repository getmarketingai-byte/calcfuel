import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import BreakEvenCalc from "./BreakEvenCalc";

export const metadata: Metadata = {
  title: "Break-Even Calculator - Find Your Break-Even Point",
  description: "Free break-even calculator. Calculate the number of units and revenue needed to cover all costs. Includes contribution margin analysis and break-even tips.",
  alternates: { canonical: "/calculators/break-even-calculator" },
};

const relatedTools = [
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit margin from revenue and COGS." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your marketing investment." },
  { title: "CPA Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate your cost per customer acquisition." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track and improve your average transaction value." },
];

const faqs = [
  { question: "What is the break-even point?", answer: "The break-even point is the level of sales at which your total revenue equals your total costs — you are making neither a profit nor a loss. Every unit sold beyond the break-even point contributes pure profit (after variable costs). It is the minimum target every business must exceed to be viable." },
  { question: "How do you calculate break-even point?", answer: "Break-Even Units = Fixed Costs ÷ (Price Per Unit − Variable Cost Per Unit). The denominator is called the contribution margin — the amount each unit sale contributes toward covering fixed costs and generating profit. For example: Fixed Costs $20,000, Price $50, Variable Cost $20. Contribution Margin = $30. Break-Even = $20,000 ÷ $30 = 667 units." },
  { question: "What are fixed costs vs variable costs?", answer: "Fixed costs remain constant regardless of how much you sell: rent, salaries, insurance, software subscriptions, loan repayments, and depreciation. Variable costs change with each unit sold: raw materials, direct labour per unit, packaging, and shipping. Accurately separating these is critical for a meaningful break-even analysis." },
  { question: "How do I calculate break-even revenue?", answer: "Break-Even Revenue = Break-Even Units × Price Per Unit. Alternatively: Break-Even Revenue = Fixed Costs ÷ Contribution Margin Ratio, where Contribution Margin Ratio = Contribution Margin Per Unit ÷ Price Per Unit." },
  { question: "How can I lower my break-even point?", answer: "You can lower your break-even point in three ways: reduce fixed costs (cheaper office, renegotiate contracts), increase your price per unit (improve perceived value), or reduce variable costs (better supplier rates, more efficient production). Reducing fixed costs is often the fastest lever for early-stage businesses." },
  { question: "What is contribution margin?", answer: "Contribution margin is the selling price per unit minus the variable cost per unit. It represents the amount each sale contributes toward covering fixed costs. Once total contribution margins exceed total fixed costs, the business is profitable. A high contribution margin means each sale has more leverage toward profitability." },
];

const howToSteps = [
  { name: "Enter your fixed costs", text: "Input the total fixed costs for the period: rent, salaries, insurance, subscriptions, and all other costs that do not change with sales volume." },
  { name: "Enter your price per unit", text: "Enter the selling price for one unit of your product or service." },
  { name: "Enter your variable cost per unit", text: "Enter the direct cost of producing or delivering one unit: materials, direct labour, packaging, and shipping per unit." },
  { name: "Read your break-even point", text: "The calculator shows the number of units you need to sell and the revenue required to cover all costs." },
];

export default function BreakEvenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Break-Even Calculator"
        description="Free break-even calculator. Find the number of units and revenue needed to cover all your costs."
        url="https://calcfuel.com/calculators/break-even-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Break-Even Calculator", url: "https://calcfuel.com/calculators/break-even-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Break-Even Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Break-Even Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate the exact number of units and revenue required to cover all your costs. Enter your fixed costs, price, and variable cost per unit to find your break-even point instantly.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <BreakEvenCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>What Is Break-Even Analysis?</h2>
        <p>Break-even analysis tells you the minimum level of sales your business needs to cover all its costs — the point at which you are neither making money nor losing it. Every unit sold above the break-even point generates profit; every unit below it means you are still covering your fixed cost base.</p>
        <p>For new businesses, break-even analysis is a critical viability check: can you realistically sell enough to cover your costs given your market size and competition? For established businesses, it is a powerful tool for pricing decisions, new product launches, and cost structure reviews. When you raise prices, reduce variable costs, or cut fixed overhead, you can recalculate your break-even to see how much the margin of safety improves.</p>
        <p>Break-even analysis also creates the foundation for financial forecasting. Once you know your break-even, you can set meaningful sales targets: break-even plus your target profit divided by contribution margin per unit gives you your required sales volume.</p>

        <h2>The Break-Even Formula</h2>
        <p><strong>Contribution Margin = Price Per Unit − Variable Cost Per Unit</strong></p>
        <p><strong>Break-Even Units = Fixed Costs ÷ Contribution Margin</strong></p>
        <p><strong>Break-Even Revenue = Break-Even Units × Price Per Unit</strong></p>
        <p><strong>Example:</strong> A software consulting firm has $30,000 in monthly fixed costs (salaries, rent, software). They charge $150 per hour and their direct labour cost is $60 per hour. Contribution Margin = $150 − $60 = $90 per hour. Break-Even = $30,000 ÷ $90 = <strong>334 hours per month</strong>. Break-Even Revenue = 334 × $150 = <strong>$50,100 per month</strong>.</p>

        <h2>Fixed Costs vs. Variable Costs</h2>
        <p>Getting the cost classification right is essential for accurate break-even analysis. Misclassifying a variable cost as fixed (or vice versa) will give you a misleading break-even point.</p>
        <p><strong>Fixed costs</strong> stay the same regardless of sales volume. Common examples: office rent, management salaries, insurance premiums, software subscriptions, loan repayments, and depreciation. These costs exist whether you sell zero units or one thousand.</p>
        <p><strong>Variable costs</strong> change proportionally with output. Common examples: raw materials per unit, direct labour per piece, packaging, per-unit shipping, payment processing fees, and sales commissions. If you sell twice as many units, your variable costs double.</p>
        <p><strong>Semi-variable costs</strong> have both fixed and variable components. For example, electricity has a fixed base charge plus variable usage. For break-even analysis, split these into their fixed and variable components or make a reasonable approximation.</p>

        <h2>How to Use Break-Even Analysis for Business Decisions</h2>
        <p><strong>Pricing decisions:</strong> Test different price points in the calculator. A 10% price increase dramatically reduces your break-even point, since the full price increase flows directly into contribution margin. If you are considering raising prices, break-even analysis shows exactly how much your safety margin improves.</p>
        <p><strong>New product launches:</strong> Before launching a product, model the break-even under conservative, base, and optimistic sales scenarios. If your optimistic scenario barely exceeds break-even, the risk-reward may not justify the investment in inventory, marketing, and operational complexity.</p>
        <p><strong>Cost reduction decisions:</strong> Reducing fixed costs directly lowers your break-even point. A $5,000 reduction in monthly fixed costs with a $30 contribution margin reduces break-even by 167 units per month — meaningful relief in a slow month.</p>
        <p><strong>Margin of safety:</strong> Margin of safety = (Actual Sales − Break-Even Sales) ÷ Actual Sales × 100. This tells you how far sales can fall before you start losing money. A 30% margin of safety means sales can drop 30% before you hit break-even — a useful risk metric in volatile markets.</p>

        <h2>Limitations of Break-Even Analysis</h2>
        <p>Break-even analysis is a powerful planning tool but relies on assumptions that may not hold in practice. It assumes a single product at a constant price, linear cost behaviour (costs scale exactly with volume), and that all production is sold. Multi-product businesses need to calculate a weighted average contribution margin based on their expected sales mix.</p>
        <p>Real businesses also experience step-fixed costs — costs that jump at certain volume thresholds. For example, you may need to hire an additional staff member once sales exceed a certain level, increasing fixed costs and raising the break-even point. Build these step changes into your planning when modelling growth scenarios.</p>
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
