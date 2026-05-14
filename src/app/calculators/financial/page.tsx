import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Australian Financial Calculators 2025–26 — Tax, Super & Business",
  description: "Free Australian financial and tax calculators: income tax, salary sacrifice, HECS, CGT, GST, stamp duty, superannuation, and more. Based on 2025–26 ATO rates.",
  path: "/calculators/financial",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcfuel.com" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://calcfuel.com/calculators" },
    { "@type": "ListItem", "position": 3, "name": "Financial Calculators", "item": "https://calcfuel.com/calculators/financial" },
  ],
};

const tools = [
  // Australian Tax Calculators
  { title: "Australian Income Tax Calculator 2025–26", slug: "australian-income-tax-calculator", description: "Calculate income tax, Medicare levy, LITO, and take-home pay for the 2025–26 tax year." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "See how much tax you save by sacrificing salary into superannuation." },
  { title: "HECS-HELP Repayment Calculator", slug: "hecs-help-calculator", description: "Find your repayment rate, annual amount, and years to pay off student debt." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance and retirement income." },
  { title: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", description: "Calculate CGT on shares, property, or crypto — includes 50% discount for 12+ month holds." },
  { title: "Work From Home Tax Calculator", slug: "work-from-home-tax-calculator", description: "Calculate your WFH tax deduction using the ATO 70c/hour fixed rate method." },
  { title: "Tax Refund Estimator", slug: "tax-refund-estimator", description: "Estimate your 2025–26 tax refund or tax bill based on your income and deductions." },
  { title: "Australian GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price — instant results for invoicing and BAS." },
  { title: "Stamp Duty Calculator", slug: "stamp-duty-calculator", description: "Estimate stamp duty for NSW, VIC, QLD, WA, SA, ACT and more." },
  { title: "Negative Gearing Calculator", slug: "negative-gearing-calculator", description: "Calculate your rental property loss and tax benefit from negative gearing." },
  { title: "Franking Credits Calculator", slug: "franking-credits-calculator", description: "Calculate franking credits on dividends and your net tax position." },
  // Business & Marketing Finance
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your total marketing investment." },
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Measure return on ad spend for your paid campaigns." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project clicks, leads, and revenue." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross, net, and operating profit margins." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all costs." },
];

export default function FinancialHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link><span className="mx-2">/</span>
        <span>Financial Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Australian Financial Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free Australian tax, super, and business finance calculators — all based on 2025–26 ATO rates.</p>
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
      <article className="prose max-w-none mt-4">
        <h2>Australian Financial Calculators for Tax, Super, and Business</h2>
        <p>Whether you are filing your tax return, planning your retirement savings, or running a business, having accurate financial figures saves you time and money. These free Australian financial calculators cover the full range of personal and business finance — from <a href="/calculators/australian-income-tax-calculator">income tax</a> and <a href="/calculators/superannuation-calculator">superannuation</a> to <a href="/calculators/marketing-roi-calculator">marketing ROI</a> and <a href="/calculators/break-even-calculator">break-even analysis</a>. All calculators are based on the 2025–26 ATO tax rates and current Australian legislation.</p>

        <h2>Australian Tax Calculators</h2>
        <h3>Income Tax and Take-Home Pay</h3>
        <p>The most commonly used financial calculator for Australians is the income tax calculator. The ATO applies a progressive tax system across five brackets for the 2025–26 financial year, with rates ranging from 0% (under $18,200) to 45% (over $180,000). On top of marginal tax, most Australians pay the 2% Medicare Levy. Our <a href="/calculators/australian-income-tax-calculator">Australian Income Tax Calculator</a> calculates your tax, Medicare Levy, Low Income Tax Offset (LITO), and actual take-home pay in seconds.</p>
        <h3>Salary Sacrifice and Super</h3>
        <p>Salary sacrificing into superannuation is one of the most effective legal tax strategies available to Australian employees. By directing pre-tax salary into super, you reduce your taxable income — paying just 15% contributions tax instead of your marginal rate, which may be 32.5%, 37%, or 45%. Use the <a href="/calculators/salary-sacrifice-calculator">Salary Sacrifice Calculator</a> to see exactly how much you would save, and the <a href="/calculators/superannuation-calculator">Superannuation Calculator</a> to project your balance at retirement.</p>
        <h3>HECS-HELP Student Debt</h3>
        <p>HECS-HELP repayments are automatically deducted from your salary once your income exceeds $51,550 (2025–26 threshold). Repayment rates range from 1% at lower incomes to 10% at the highest bracket. If you have student debt, the <a href="/calculators/hecs-help-calculator">HECS-HELP Repayment Calculator</a> shows your annual repayment amount and estimated years to full repayment based on your current income and debt balance.</p>
        <h3>Capital Gains Tax (CGT)</h3>
        <p>When you sell shares, investment property, or crypto assets held for more than 12 months, you are eligible for the 50% CGT discount — meaning only half the gain is added to your assessable income. The <a href="/calculators/capital-gains-tax-calculator">Capital Gains Tax Calculator</a> handles both short-term and long-term gains, applying the discount where applicable and computing your actual CGT liability at your marginal rate.</p>
        <h3>GST and Stamp Duty</h3>
        <p>For business owners, the <a href="/calculators/gst-calculator">GST Calculator</a> makes it easy to add or remove 10% GST from any price — useful for invoicing, BAS preparation, and quoting. For property purchases, the <a href="/calculators/stamp-duty-calculator">Stamp Duty Calculator</a> covers all Australian states and territories, including first home buyer concessions where applicable.</p>

        <h2>Business and Marketing Finance Calculators</h2>
        <p>Beyond personal tax, this hub also includes the core business finance tools every Australian small business owner should know. The <a href="/calculators/profit-margin-calculator">Profit Margin Calculator</a> helps you understand gross and net profitability. The <a href="/calculators/break-even-calculator">Break-Even Calculator</a> tells you the exact sales volume needed to cover fixed and variable costs. For marketing spend, use the <a href="/calculators/marketing-roi-calculator">Marketing ROI Calculator</a> and <a href="/calculators/roas-calculator">ROAS Calculator</a> to measure return on investment before and after campaigns.</p>

        <h2>2025–26 Australian Tax Rates at a Glance</h2>
        <ul>
          <li><strong>$0 – $18,200:</strong> Nil (plus LITO reduces effective rate further)</li>
          <li><strong>$18,201 – $45,000:</strong> 19 cents for each $1 over $18,200</li>
          <li><strong>$45,001 – $120,000:</strong> $5,092 + 32.5 cents for each $1 over $45,000</li>
          <li><strong>$120,001 – $180,000:</strong> $29,467 + 37 cents for each $1 over $120,000</li>
          <li><strong>$180,001+:</strong> $51,667 + 45 cents for each $1 over $180,000</li>
          <li><strong>Medicare Levy:</strong> 2% of taxable income (reduced for low incomes)</li>
          <li><strong>Super Guarantee Rate:</strong> 11.5% from 1 July 2024</li>
        </ul>

        <h2>How to Use These Calculators</h2>
        <ol>
          <li><strong>Start with your income tax.</strong> Use the <a href="/calculators/australian-income-tax-calculator">Income Tax Calculator</a> to get a clear picture of your tax position for 2025–26 before you file or adjust your PAYG withholding.</li>
          <li><strong>Check your HECS repayments.</strong> If you have student debt, the <a href="/calculators/hecs-help-calculator">HECS-HELP Calculator</a> shows how much you are repaying automatically and how long until it is cleared.</li>
          <li><strong>Explore salary sacrifice.</strong> If your employer offers salary sacrifice, the <a href="/calculators/salary-sacrifice-calculator">Salary Sacrifice Calculator</a> shows the exact tax saving at your income level — it is often more significant than expected.</li>
          <li><strong>Model your business financials.</strong> Use the <a href="/calculators/break-even-calculator">Break-Even Calculator</a> before launching a product or service, and the <a href="/calculators/profit-margin-calculator">Profit Margin Calculator</a> to review pricing regularly.</li>
          <li><strong>Measure marketing returns.</strong> After any campaign, run your figures through the <a href="/calculators/marketing-roi-calculator">Marketing ROI</a> and <a href="/calculators/roas-calculator">ROAS</a> calculators to confirm whether the spend was justified.</li>
        </ol>

        <p><em>Disclaimer: These calculators provide estimates only and should not be treated as tax or financial advice. Consult a qualified tax professional or financial adviser for advice specific to your situation.</em></p>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
