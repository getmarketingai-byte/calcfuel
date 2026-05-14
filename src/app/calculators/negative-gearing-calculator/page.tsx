import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import NegativeGearingCalc from "./NegativeGearingCalc";

export const metadata: Metadata = {
  title: "Negative Gearing Calculator Australia 2025–26 | CalcFuel",
  description:
    "Calculate your rental property loss and tax benefit from negative gearing. Enter expenses and rent for an instant 2025–26 ATO-based estimate.",
};

const relatedTools = [
  { title: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", description: "Estimate CGT on property or investment sales for Australian residents." },
  { title: "Stamp Duty Calculator", slug: "stamp-duty-calculator", description: "Calculate stamp duty for property purchases across all Australian states." },
  { title: "Mortgage Repayment Calculator", slug: "mortgage-repayment-calculator", description: "Calculate monthly repayments and total interest on any home loan." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay for 2025–26." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Model the tax benefit of salary sacrificing into super or other benefits." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Project investment growth using compound interest over time." },
];

const faqs = [
  {
    question: "What is negative gearing?",
    answer: "Negative gearing occurs when the expenses associated with owning an investment property exceed the rental income it generates, resulting in a net rental loss. In Australia, this loss is deductible against your other assessable income (such as employment income), reducing your overall tax liability. The tax saving from negative gearing is known as the 'tax benefit' of the investment — but it is important to note that you are still making a cash loss; the tax benefit only partially offsets that loss.",
  },
  {
    question: "Is negative gearing legal in Australia?",
    answer: "Yes, negative gearing is entirely legal and has been a feature of the Australian tax system for decades. The ATO allows investors to deduct rental property losses against other income under the general deduction provisions. However, negative gearing is periodically subject to political debate, and rules around it could change in future budgets. As of 2025–26, the existing rules remain in place. The ATO provides detailed guidance on rental property deductions at its website.",
  },
  {
    question: "What expenses can I claim on a rental property?",
    answer: "You can claim a wide range of rental property expenses as deductions, including: mortgage interest (but not principal repayments), council rates, water charges, land tax, property management fees, insurance (landlord and building), repairs and maintenance (immediate deductions — not capital improvements), strata/body corporate fees, advertising for tenants, pest control, garden maintenance, and depreciation on the building (capital works, at 2.5% per year) and fittings (at ATO effective life rates). Capital improvements are not immediately deductible but are added to the cost base for CGT purposes and may be depreciable over time.",
  },
  {
    question: "What is property depreciation and can I claim it?",
    answer: "Property depreciation covers two categories: Division 43 (capital works deductions, at 2.5% per year on the building cost for properties built after 16 September 1987) and Division 40 (plant and equipment, such as appliances, carpets, blinds, and hot water systems, depreciated at ATO-determined effective life rates). A quantity surveyor can prepare a depreciation schedule for your property, typically costing $500–$800, which is itself tax deductible. For properties purchased after 9 May 2017, investors can only claim Division 40 depreciation on assets they themselves installed — pre-existing plant and equipment in a second-hand property cannot be depreciated.",
  },
  {
    question: "Does negative gearing make financial sense?",
    answer: "Negative gearing only makes financial sense if the expected long-term capital growth of the property exceeds the cumulative after-tax holding costs. In other words, you are making a calculated bet that the property will appreciate in value by enough to justify the ongoing cash outflows. If property prices stagnate or fall, the tax benefit is insufficient to make the strategy profitable. Negative gearing is generally considered a medium-to-long term strategy (10+ years). For the strategy to pay off, you also need a high enough marginal tax rate to generate a meaningful tax benefit — investors in the 32.5% bracket or above typically benefit more than lower-income investors.",
  },
  {
    question: "How does negative gearing affect my tax return?",
    answer: "When you lodge your tax return, you include all rental income as assessable income and claim all allowable expenses as deductions. The net rental loss (total expenses minus rental income) reduces your total taxable income, which in turn reduces your income tax payable. This reduction in tax is the 'tax benefit' shown in our calculator. The ATO requires you to keep records of all rental income and expenses for five years from the date of lodgement of the relevant tax return. A rental property schedule (Schedule of Rental Income and Expenses) is typically attached to your individual tax return.",
  },
];

const howToSteps = [
  { name: "Enter weekly rent and expenses", text: "Enter your weekly rental income, annual mortgage interest, council rates, insurance, management fee percentage, and other expenses." },
  { name: "Enter depreciation", text: "If you have a depreciation schedule from a quantity surveyor, enter the annual depreciation claim. This is a non-cash deduction that can significantly increase your rental loss." },
  { name: "Select your marginal tax rate", text: "Choose the tax rate applicable to the top dollar of your taxable income — this determines the size of your tax benefit from the rental loss." },
  { name: "Read your results", text: "The calculator shows your rental income, itemised expenses, net rental result, tax benefit, and after-tax holding cost per year and month." },
];

export default function NegativeGearingCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Negative Gearing Calculator Australia 2025–26"
        description="Calculate your rental property loss, tax benefit, and after-tax holding cost from negative gearing in Australia."
        url="https://calcfuel.com/calculators/negative-gearing-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Negative Gearing Calculator", url: "https://calcfuel.com/calculators/negative-gearing-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Negative Gearing Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Negative Gearing Calculator Australia 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your rental property loss and tax benefit from negative gearing. Enter your rental income and all expenses to see the net result, tax saving at your marginal rate, and true after-tax holding cost.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <NegativeGearingCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. Actual deductions depend on your individual circumstances, property type, and the specific rules applicable to your investment. Consult a qualified tax professional or financial adviser for advice specific to your situation. See the{" "}
        <a
          href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/rental-properties/rental-expenses-you-can-claim"
          className="text-orange-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ATO — Rental expenses you can claim
        </a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Understanding Negative Gearing in Australia</h2>
        <p>
          Negative gearing is one of the most discussed — and debated — aspects of the Australian property investment landscape. It occurs when the total costs of owning and managing an investment property exceed the rental income the property generates. The resulting net loss is deductible against your other income, effectively subsidising part of the shortfall through the tax system.
        </p>
        <p>
          Australia is one of only a handful of countries that allows unlimited negative gearing losses to be offset against unrelated income (such as salary). Many other countries require losses to be carried forward and only offset against future rental income, or cap the deduction amount. This feature makes negatively geared property particularly attractive to higher-income Australian earners, who benefit from a larger tax offset.
        </p>
        <p>
          According to ATO taxation statistics, over 2 million Australians declare rental income and expenses each year, with approximately 1.3 million recording a net rental loss (i.e., being negatively geared). The total rental losses claimed run to tens of billions of dollars annually.
        </p>

        <h2>How the Tax Benefit Is Calculated</h2>
        <p>
          The tax benefit from negative gearing is simply the rental loss multiplied by your marginal tax rate (including Medicare levy). For example:
        </p>
        <ul>
          <li>Annual rental income: $26,000 (500/week × 52)</li>
          <li>Annual expenses: $38,500 (interest $28,000, rates $1,500, insurance $1,200, management $2,210, maintenance $1,000, depreciation $3,500, strata $1,090)</li>
          <li>Net rental loss: $12,500</li>
          <li>Tax benefit at 37% marginal rate: $12,500 × 37% = $4,625</li>
          <li>After-tax holding cost: $12,500 − $4,625 = $7,875 per year ($656/month)</li>
        </ul>
        <p>
          In this example, the investor is paying $7,875 per year out-of-pocket to hold the property — the equivalent of a "top-up" from their own savings. The strategy is profitable only if the property&apos;s capital value increases by more than the cumulative holding costs over the investment horizon.
        </p>

        <h2>Deductible Rental Expenses</h2>
        <p>
          The ATO distinguishes between immediately deductible expenses and capital expenses (which are either depreciated over time or added to the cost base):
        </p>
        <p><strong>Immediately deductible (in the year incurred):</strong></p>
        <ul>
          <li>Interest on the investment loan (but not principal)</li>
          <li>Council rates and land tax</li>
          <li>Water rates</li>
          <li>Building and landlord insurance premiums</li>
          <li>Property management fees (typically 7–10% of gross rent, plus GST)</li>
          <li>Repairs and maintenance (must be repairs to existing damage, not improvements)</li>
          <li>Pest control and garden maintenance</li>
          <li>Strata / body corporate fees</li>
          <li>Advertising costs for tenants</li>
          <li>Accounting and tax agent fees attributable to the property</li>
        </ul>
        <p><strong>Capital expenses — depreciated over time:</strong></p>
        <ul>
          <li>Building construction costs (2.5% per year, Division 43 capital works)</li>
          <li>Plant and equipment: appliances, carpets, hot water systems, air conditioners (at ATO effective life rates)</li>
          <li>Capital improvements (e.g., new bathroom, kitchen renovation) — added to cost base; may attract Division 43 deductions</li>
        </ul>

        <h2>Depreciation — A Non-Cash Deduction</h2>
        <p>
          One of the most powerful aspects of property investment is the ability to claim depreciation as a tax deduction without spending money in that year. A quantity surveyor&apos;s depreciation schedule typically identifies $3,000–$10,000 in annual depreciation deductions for a typical investment property, effectively increasing the rental loss and the associated tax benefit without additional cash outlay.
        </p>
        <p>
          For properties built after 16 September 1987, the building structure can be depreciated at 2.5% of the original construction cost per year (Division 43). For a property with a construction cost of $300,000, this produces an annual deduction of $7,500 — purely on the building structure, before any plant and equipment depreciation.
        </p>
        <p>
          Note the 2017 rule change: for second-hand properties purchased after 9 May 2017, investors can no longer claim depreciation on pre-existing plant and equipment (e.g., carpets or appliances that were already in the property when they bought it). New plant and equipment installed by the investor themselves can still be depreciated.
        </p>

        <h2>Negative Gearing vs. Positive Gearing</h2>
        <p>
          A property is positively geared when rental income exceeds expenses, producing a taxable rental profit. Positive gearing means the property pays for itself (and then some) from day one — cash flow is positive. However, the profit is assessable income and subject to tax.
        </p>
        <p>
          Negatively geared properties require an ongoing cash contribution from the investor, but this is partially offset by the tax benefit. The strategy fundamentally relies on capital growth to generate a profit over the long term. Our{" "}
          <Link href="/calculators/capital-gains-tax-calculator" className="text-orange-500 underline">Capital Gains Tax Calculator</Link> can help you model the after-CGT proceeds when you eventually sell.
        </p>
        <p>
          If you are buying an investment property, also factor in <Link href="/calculators/stamp-duty-calculator" className="text-orange-500 underline">stamp duty</Link> as an upfront cost, and use our{" "}
          <Link href="/calculators/mortgage-repayment-calculator" className="text-orange-500 underline">Mortgage Repayment Calculator</Link> to model your loan interest. The ATO provides comprehensive guidance on{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/rental-properties/rental-expenses-you-can-claim" target="_blank" rel="noopener noreferrer">rental expenses you can claim</a>.
        </p>

        <h2>Key Risks of Negative Gearing</h2>
        <p>
          Negative gearing is not without risk. Key risks to consider include:
        </p>
        <ul>
          <li><strong>Interest rate risk:</strong> Rising interest rates increase borrowing costs and can significantly increase the rental loss. Many investors who geared heavily at low 2020–2021 rates found their losses blowing out as rates rose sharply in 2022–2023.</li>
          <li><strong>Vacancy risk:</strong> A vacant property generates no rental income but all expenses continue. High vacancy periods can devastate the investment&apos;s cash flow position.</li>
          <li><strong>Policy risk:</strong> Negative gearing rules could be amended in a future federal budget. Any limitation or removal of negative gearing would materially affect after-tax returns.</li>
          <li><strong>Capital growth uncertainty:</strong> Property prices can fall as well as rise. If the property does not appreciate sufficiently, the investor may realise a loss on sale even after accounting for tax benefits.</li>
          <li><strong>Concentration risk:</strong> Property is illiquid and tends to represent a large single exposure — far more concentrated than a diversified share portfolio.</li>
        </ul>
        <p>
          Before investing in property, consult a licensed financial adviser to ensure the strategy aligns with your financial goals, risk tolerance, and cash flow capacity. This calculator is a tool for initial modelling only.
        </p>
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
