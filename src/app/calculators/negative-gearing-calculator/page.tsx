import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import NegativeGearingCalc from "./NegativeGearingCalc";

export const metadata: Metadata = {
  title: "Negative Gearing Calculator Australia (2025) — Tax Saving & Cash Flow",
  description:
    "Free Australian negative gearing calculator. Enter your investment property details to see your annual rental loss, tax deduction, tax saving, and true after-tax weekly cash flow. Updated for FY2025-26 tax rates.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/negative-gearing-calculator",
  },
  openGraph: {
    title: "Negative Gearing Calculator Australia",
    description:
      "Calculate how much you save on tax through negative gearing. See your annual rental loss, tax benefit, and true after-tax weekly cost of holding an investment property.",
    url: "https://calcfuel.com/calculators/negative-gearing-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Mortgage Repayment Calculator",
    slug: "mortgage-repayment-calculator",
    description: "Calculate Australian home loan repayments and compare P&I vs interest-only.",
  },
  {
    title: "Stamp Duty Calculator",
    slug: "stamp-duty-calculator",
    description: "Calculate stamp duty costs by state for residential and investment properties.",
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement with employer SG and voluntary contributions.",
  },
  {
    title: "Australian Income Tax Calculator",
    slug: "australian-income-tax-calculator",
    description: "Calculate your Australian income tax, Medicare levy, and take-home pay.",
  },
];

const faqs = [
  {
    question: "What is negative gearing in Australia?",
    answer:
      "Negative gearing occurs when the costs of owning an investment property (primarily mortgage interest, but also rates, insurance, maintenance, and property management fees) exceed the rental income it generates. The net rental loss — the amount by which costs exceed income — is 'negatively geared.' Under Australian tax law, this loss can be offset against other income (such as your salary), reducing your taxable income and therefore your income tax. This tax deduction is the financial benefit that makes negative gearing attractive to investors, particularly those on higher marginal tax rates.",
  },
  {
    question: "How does negative gearing reduce my tax?",
    answer:
      "The mechanism is straightforward: if your investment property produces a net rental loss of $10,000 in a financial year, that $10,000 is deducted from your other assessable income (usually your salary). If you earn $100,000 in salary, your taxable income becomes $90,000. The tax saving depends on your marginal rate. At the 32.5% marginal rate (applying to income $45,001–$120,000), a $10,000 rental loss saves $3,250 in income tax (plus 2% Medicare levy = $3,450 total). At 37%, the same loss saves $3,700 in tax ($3,900 including Medicare levy). This is why negative gearing is more beneficial for higher-income earners.",
  },
  {
    question: "Is negative gearing still allowed in Australia in 2025?",
    answer:
      "Yes. Negative gearing remains legal and unchanged in Australia as of 2025. The Australian Labor government, elected in 2022, did not proceed with the 2019 election policy to limit negative gearing to new properties. Current rules allow taxpayers to deduct rental losses on both new and existing properties against their other income. There is ongoing political debate about negative gearing reform, but no changes have been legislated as of FY2025-26.",
  },
  {
    question: "What costs can I claim on a negatively geared property?",
    answer:
      "Deductible expenses for investment properties in Australia include: mortgage interest (the main deduction); council rates and water charges; landlord insurance and building insurance; property management fees (typically 7–12% of rent); repairs and maintenance (not capital improvements); body corporate / strata fees; depreciation on the building (2.5% p.a. for post-1987 properties) and plant and equipment; pest control and cleaning; advertising for tenants; and travel to the property for inspections (limited). Capital improvements are not immediately deductible — they are added to the property's cost base and reduce capital gains tax when the property is sold.",
  },
  {
    question: "What is the difference between negative gearing and positive gearing?",
    answer:
      "A property is negatively geared when its rental income is less than its deductible expenses — you are making a loss on the investment, which you can deduct from your taxable income. A property is positively geared (or 'cash flow positive') when rental income exceeds all expenses — the property makes a profit, which is added to your taxable income. A property can also be neutrally geared, where rental income exactly covers all costs. Most investors in high-cost cities like Sydney and Melbourne hold negatively geared properties because of high purchase prices relative to rents, relying on capital growth to deliver overall returns.",
  },
  {
    question: "What is gross rental yield vs net rental yield?",
    answer:
      "Gross rental yield is calculated as: (annual rent ÷ purchase price) × 100. It measures how much rental income a property generates relative to its price, before deducting any costs. Net rental yield is: ((annual rent − all annual expenses) ÷ purchase price) × 100. It reflects the actual return after costs. A gross yield of 4% might become a net yield of 1.5% or even negative after deducting interest, rates, insurance, and management fees. Net yield is the more meaningful metric — if it is negative, the property is negatively geared.",
  },
  {
    question: "Should I choose interest-only or principal-and-interest for an investment loan?",
    answer:
      "This is a common strategic question for investment property owners. Interest-only (IO) loans maximise your deductible interest expense (since you are not repaying principal, the full payment is interest and therefore deductible), and minimise your cash outflow — improving cash flow while the property is held. However, IO loans typically have higher interest rates than P&I loans, and you are not building equity through repayments. Principal-and-interest (P&I) loans reduce your deductible interest each year as the loan balance falls, but you build equity and your total interest cost over the loan term is lower. Many investors use IO during the holding period and convert to P&I when they plan to reduce debt.",
  },
  {
    question: "What is Capital Gains Tax on an investment property in Australia?",
    answer:
      "When you sell an investment property in Australia, the capital gain (sale price minus purchase price and capital costs) is included in your assessable income and taxed at your marginal rate. If you have owned the property for more than 12 months, you are entitled to a 50% CGT discount — only half the capital gain is taxed. For example: a $200,000 capital gain after the discount becomes $100,000 added to your income, taxed at your marginal rate. The cost base of the property includes the purchase price, stamp duty, legal fees, and capital improvements (renovations that add lasting value, not repairs). Negative gearing losses reduce your taxable income each year but do not directly reduce capital gains — they are separate tax treatments.",
  },
];

const howToSteps = [
  {
    name: "Enter the property purchase price",
    text: "Enter the full purchase price of the investment property. This is used to calculate rental yields.",
  },
  {
    name: "Enter the loan amount",
    text: "Enter the mortgage amount (not the purchase price). For an 80% LVR on a $650,000 property, enter $520,000. The calculator assumes an interest-only loan, so the full loan amount accrues interest each year.",
  },
  {
    name: "Enter the interest rate",
    text: "Enter your current investment loan interest rate as a percentage. Investment loan rates in Australia are typically 0.2–0.5% higher than owner-occupier rates. Check your most recent mortgage statement.",
  },
  {
    name: "Enter weekly rental income",
    text: "Enter the weekly rent charged to tenants. The calculator multiplies by 52 to calculate annual rental income. If the property is sometimes vacant, consider using a realistic occupancy-adjusted figure (e.g., 48–50 weeks).",
  },
  {
    name: "Enter annual property costs",
    text: "Include all recurring annual costs except the mortgage interest: council rates, water rates, landlord insurance, property management fees, strata/body corporate fees, maintenance and repairs, and any other recurring costs.",
  },
  {
    name: "Select your marginal tax rate",
    text: "Select the income tax bracket that applies to your salary or other income. Your marginal rate is the rate you pay on each additional dollar of income — and the rate at which your rental loss reduces your tax bill.",
  },
];

export default function NegativeGearingCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Negative Gearing Calculator Australia"
        description="Free Australian negative gearing calculator. Calculate annual rental loss, tax deduction, tax saving, and after-tax cash flow for investment properties."
        url="https://calcfuel.com/calculators/negative-gearing-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          {
            name: "Negative Gearing Calculator",
            url: "https://calcfuel.com/calculators/negative-gearing-calculator",
          },
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
        Negative Gearing Calculator Australia
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your investment property&apos;s annual rental loss, tax deduction, and true
        after-tax weekly cost. Enter your property details to see whether you are negatively or
        positively geared — and exactly how much you save on tax.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <NegativeGearingCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Is Negative Gearing?</h2>
        <p>
          Negative gearing is a property investment strategy where the annual costs of owning an
          investment property — primarily mortgage interest, plus rates, insurance, maintenance, and
          property management fees — exceed the rental income the property generates. The shortfall
          (the &quot;loss&quot;) is tax-deductible against other income, such as your salary.
        </p>
        <p>
          Australia&apos;s tax system has allowed negative gearing since the income tax legislation
          was first enacted. It remains unchanged in 2025 and applies to both new and existing
          residential properties, as well as commercial property and shares. The key provision is
          found in section 8-1 of the <em>Income Tax Assessment Act 1997</em>, which allows
          deductions for losses incurred in gaining or producing assessable income.
        </p>

        <h2>How the Tax Benefit Works</h2>
        <p>
          The tax benefit of negative gearing is often misunderstood. The property does not become
          &quot;free&quot; — you still have a real cash outflow each week. What negative gearing
          does is <em>reduce your tax bill</em>, which partially offsets that cash outflow.
        </p>
        <p>
          Example: Property purchased for $700,000. Loan: $560,000 (80% LVR) at 6.5% interest only
          = $36,400/year interest. Weekly rent: $550 = $28,600/year. Annual costs (rates, insurance,
          management, maintenance): $9,000. Net rental loss: $28,600 − ($36,400 + $9,000) = −$16,800.
        </p>
        <p>
          At the 37% marginal tax rate (income $120,001–$180,000), the tax saving is:
          $16,800 × 37% = $6,216/year ($119/week). After the tax benefit, the true weekly
          cash outflow drops from $323/week to $204/week.
        </p>

        <h2>The Real Cost of Holding a Negatively Geared Property</h2>
        <p>
          Many investors focus on the tax saving without calculating their true cash position. Use
          this calculator to find your &quot;after-tax weekly cost&quot; — the real amount you need
          to fund from your salary each week to hold the property. For the example above, $204/week
          is the true cost: it&apos;s a real cash expense, not zero.
        </p>
        <p>
          Investors typically accept this ongoing cost because they expect the property to appreciate
          in value over time (capital growth), producing a profit when sold. The negative gearing
          strategy works best when: (1) the property is in a high-growth location, (2) the investor
          is in a high marginal tax bracket, and (3) the investor can comfortably service the weekly
          cash shortfall from salary without financial stress.
        </p>

        <h2>Negative Gearing vs Positive Gearing</h2>
        <p>
          A positively geared property (rental income exceeds all costs) generates taxable income.
          While it is cash-flow positive, the profit is added to your assessable income and taxed at
          your marginal rate. Positive gearing is more common in regional areas, smaller towns, or
          high-yield commercial properties where purchase prices are lower relative to rents.
        </p>
        <p>
          In Australia&apos;s major cities — Sydney, Melbourne, and Brisbane — residential property
          gross rental yields of 2–4% are typical, while mortgage costs at 6%+ make negative gearing
          the norm for investors with standard LVRs.
        </p>

        <h2>Deductible Expenses for Investment Properties</h2>
        <p>The ATO allows deductions for the following ongoing costs:</p>
        <ul>
          <li>
            <strong>Mortgage interest</strong> — the largest deduction for most investors. Only the
            interest component of repayments is deductible (not principal repayments). Interest-only
            loans maximise the annual deduction.
          </li>
          <li>
            <strong>Council rates and water charges</strong> — deductible in the year paid.
          </li>
          <li>
            <strong>Insurance premiums</strong> — landlord insurance, building insurance, and
            contents insurance for furnished properties.
          </li>
          <li>
            <strong>Property management fees</strong> — charged by the property manager, typically
            7–12% of gross rent plus letting fees.
          </li>
          <li>
            <strong>Strata levies / body corporate fees</strong> — for apartments, townhouses, and
            units in strata schemes.
          </li>
          <li>
            <strong>Repairs and maintenance</strong> — work that restores the property to its
            original condition. Capital improvements (which add new value) are not immediately
            deductible but can be claimed via depreciation.
          </li>
          <li>
            <strong>Depreciation</strong> — building depreciation (2.5% p.a. on post-September 1987
            construction costs) and depreciation on plant and equipment (ovens, carpet, air
            conditioning) can be claimed annually. A quantity surveyor&apos;s depreciation schedule
            costs $500–$800 and typically produces thousands of dollars in annual deductions.
          </li>
          <li>
            <strong>Advertising and letting costs</strong> — advertising for tenants, lease
            preparation fees.
          </li>
        </ul>

        <h2>Capital Gains Tax When You Sell</h2>
        <p>
          When you sell the property, capital gains tax applies to the net capital gain (sale price
          minus cost base). The cost base includes the purchase price, stamp duty, legal fees, and
          the cost of any capital improvements. Depreciation claimed during the holding period may
          reduce the cost base of depreciable assets.
        </p>
        <p>
          If held for more than 12 months, a 50% CGT discount applies to individuals — only half
          the gain is added to taxable income. For a $300,000 gain, only $150,000 is taxed, saving
          $55,500 in tax for someone in the 37% bracket compared to the full gain being taxed.
        </p>

        <h2>Is Negative Gearing a Good Investment Strategy?</h2>
        <p>
          Negative gearing is a tax strategy, not an investment strategy by itself. Whether
          it is &quot;good&quot; depends on:
        </p>
        <ul>
          <li>
            <strong>Capital growth:</strong> The total return must be positive (capital gain +
            cumulative rental income − cumulative costs). Strong capital growth is needed to justify
            the ongoing cash outflow.
          </li>
          <li>
            <strong>Your marginal tax rate:</strong> The higher your rate (37% or 45%), the more
            valuable the tax deduction. At 19% (lower income earners), the benefit is modest.
          </li>
          <li>
            <strong>Serviceability:</strong> You must be able to fund the weekly shortfall from your
            income without financial stress, especially if interest rates rise or the property is
            vacant.
          </li>
          <li>
            <strong>Property selection:</strong> High-growth locations with strong rental demand
            are essential. A negatively geared property in a declining market destroys wealth.
          </li>
        </ul>
        <p>
          Always obtain advice from a qualified property investment adviser, tax accountant, and
          mortgage broker before making any investment property decision. This calculator provides
          general estimates only.
        </p>
      </article>

      <ProductCTASection variant="showcase" />

      <RelatedTools tools={relatedTools} />

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white text-sm list-none flex items-center justify-between">
                {faq.question}
                <span className="ml-4 text-orange-500 shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-6">
        This calculator is for general information purposes only and does not constitute financial,
        tax, or investment advice. Results are estimates based on the inputs provided. Tax saving
        calculations assume a simple offset of rental loss against other income at the selected
        marginal rate and do not account for the Medicare Levy Surcharge, HECS/HELP debt repayments,
        Division 293 tax for high earners, or the low-income tax offset. Consult a registered tax
        agent and licensed financial adviser before making any investment or tax decisions.
      </p>
    </div>
  );
}
