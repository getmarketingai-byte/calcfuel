import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import HecsHelpCalc from "./HecsHelpCalc";

export const metadata: Metadata = {
  title: "HECS-HELP Repayment Calculator Australia (2025–26)",
  description:
    "Free Australian HECS-HELP repayment calculator. Enter your income and debt balance to see your mandatory repayment rate, annual repayment amount, years to repay, and a year-by-year schedule including CPI indexation.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/hecs-help-repayment-calculator",
  },
  openGraph: {
    title: "HECS-HELP Repayment Calculator Australia (2025–26)",
    description:
      "Calculate your HECS-HELP repayment for FY2025-26. See your repayment rate, annual amount, years to pay off, and total indexation cost.",
    url: "https://calcfuel.com/calculators/hecs-help-repayment-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Australian Income Tax Calculator",
    slug: "australian-income-tax-calculator",
    description: "Calculate your income tax, Medicare levy, and take-home pay for FY2025-26.",
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement with employer SG and voluntary contributions.",
  },
  {
    title: "Mortgage Repayment Calculator",
    slug: "mortgage-repayment-calculator",
    description: "Calculate Australian home loan repayments and compare P&I vs interest-only.",
  },
  {
    title: "Negative Gearing Calculator",
    slug: "negative-gearing-calculator",
    description: "Calculate rental property tax savings and after-tax cash flow.",
  },
];

const faqs = [
  {
    question: "How is HECS-HELP repayment calculated in Australia?",
    answer:
      "HECS-HELP repayment is calculated as a percentage of your repayment income (broadly, your taxable income plus any reportable fringe benefits and reportable employer super contributions). The ATO sets repayment thresholds and rates each financial year — for FY2025-26, the threshold starts at $54,435. Below this amount, no compulsory repayment is required. Above the threshold, you pay between 1% and 10% of your total income, depending on which bracket you fall into. The repayment is automatically calculated in your tax return and withheld via PAYG if you tick the HECS-HELP box on your tax file number declaration.",
  },
  {
    question: "What is HECS-HELP indexation and how does it work?",
    answer:
      "HECS-HELP indexation is an annual adjustment to your outstanding debt based on the Consumer Price Index (CPI). It is applied on 1 June each year to the balance outstanding as at 1 June. The indexation rate has varied significantly — it was 3.9% in FY2023-24 and has been proposed to be capped in some years. Importantly, indexation is applied to the full balance before any repayments made during the year are credited — this can feel counterintuitive. The practical effect is that if your income is close to the threshold and your repayments are small, your debt can grow faster than you pay it off in high-inflation years.",
  },
  {
    question: "Should I make voluntary extra repayments on my HECS-HELP debt?",
    answer:
      "Since 1 January 2017, voluntary HECS-HELP repayments are no longer tax-deductible and you no longer receive a discount for paying early. Whether to make extra repayments depends on the indexation rate vs what you could earn investing that money. In low-inflation years (indexation <3%), most financial advisers suggest investing any surplus rather than paying down HECS early, since the debt is essentially interest-free in real terms. In high-inflation years (indexation >5%), the calculation changes. It also depends on your income — if you are below the threshold, your debt grows at the full indexation rate, which can be compelling to reduce.",
  },
  {
    question: "What is the HECS-HELP repayment threshold for FY2025-26?",
    answer:
      "The minimum repayment threshold for FY2025-26 is $54,435. Below this amount, no compulsory HECS-HELP repayment is required. At income just above the threshold, the repayment rate is 1% of total income. The rate increases incrementally through 19 brackets, reaching a maximum of 10% of income for those earning $159,663 or more. These thresholds are adjusted annually by the ATO — check the ATO website for the most current figures.",
  },
  {
    question: "Does my HECS debt affect my ability to get a home loan?",
    answer:
      "Yes — HECS-HELP debt affects your borrowing capacity, even though it is not listed as a traditional liability. Lenders assess your HECS repayment obligation as a recurring commitment that reduces your disposable income, similar to any other ongoing expense. For example, if you earn $100,000 and have a HECS repayment rate of 6%, lenders will factor in $6,000 per year ($500/month) as a reduction to your borrowable income. The larger your debt and the closer your income is to higher brackets, the more it affects your borrowing power.",
  },
  {
    question: "Can I pay off my HECS debt in a lump sum?",
    answer:
      "Yes. You can make voluntary lump sum repayments directly to the ATO at any time via your myGov account (linked to the ATO) or via BPAY. There is no penalty for paying early and no minimum amount for voluntary repayments. However, as noted above, the 10% bonus for early repayment was removed in 2017. Payments made voluntarily are applied to your debt balance and reduce future indexation, but there is no additional discount. Many people make voluntary repayments near the end of the financial year, before 1 June indexation is applied, to reduce the balance on which indexation is calculated.",
  },
  {
    question: "What happens to HECS debt if I move overseas?",
    answer:
      "Since 2017, Australians living overseas must make compulsory HECS-HELP repayments if their worldwide income exceeds the repayment threshold. You self-assess your repayment obligation and lodge an 'overseas levy assessment' with the ATO. Previously, debt could be left unpaid while living abroad indefinitely. The current rules mean that if you are earning above the threshold overseas and not making repayments, interest and penalties may accrue. The indexation continues to apply regardless of where you live.",
  },
];

export default function HecsHelpPage() {
  return (
    <>
      <CalculatorJsonLd
        name="HECS-HELP Repayment Calculator Australia"
        description="Calculate your mandatory HECS-HELP repayment for FY2025-26. Includes repayment schedule with CPI indexation."
        url="https://calcfuel.com/calculators/hecs-help-repayment-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "HECS-HELP Repayment Calculator", url: "https://calcfuel.com/calculators/hecs-help-repayment-calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          HECS-HELP Repayment Calculator Australia (2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Calculate your mandatory repayment, see a year-by-year payoff schedule, and understand the true cost of CPI indexation on your student debt.
        </p>

        <HecsHelpCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        {/* How it works */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <ol className="space-y-3">
            {[
              "Enter your current HECS-HELP debt balance. Find this in your myGov account (ATO section) or on your latest Notice of Assessment.",
              "Enter your annual taxable income — this is your income before deductions but including any reportable fringe benefits.",
              "Add any extra voluntary repayments you plan to make each year to see how they reduce your repayment period.",
              "Toggle the CPI indexation option to see the real cost of leaving your debt unpaid vs paying it down faster.",
              "Click Calculate to see your repayment rate, annual amount, years to pay off, and a full year-by-year schedule.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <AdSenseUnit slot="3651327789" className="my-8" />

        <section className="mt-8 prose prose-gray dark:prose-invert max-w-none">
          <h2>Understanding HECS-HELP Repayment in Australia</h2>
          <p>
            More than 3 million Australians carry HECS-HELP debt — the government loan scheme that covers university and approved higher education fees. Unlike a standard loan, HECS-HELP has no interest rate. Instead, the outstanding balance is adjusted annually by the Consumer Price Index (CPI), and repayments are calculated as a percentage of your income rather than a fixed monthly amount.
          </p>
          <p>
            The system is designed to be manageable: you only repay when your income exceeds a threshold, and the repayment rate is low at the bottom of the scale. But the interaction between CPI indexation and gradual repayments means the total cost — and time to pay off — can surprise many borrowers.
          </p>

          <h3>The Repayment Rate System</h3>
          <p>
            HECS-HELP repayments are calculated using a <strong>tiered rate system</strong> applied to your total repayment income. For FY2025-26, the threshold is $54,435. Below this, no repayment is required. Above it, the rate starts at 1% and increases through 19 brackets up to 10% for incomes above $159,663.
          </p>
          <p>
            Critically, the percentage applies to your <strong>entire income</strong>, not just the amount above the threshold. This means crossing a threshold boundary causes a jump in your total repayment obligation. For example, moving from $79,345 to $79,346 income doesn't add $0.035 to your repayment — it changes your rate from 3% to 3.5% applied to the full income amount, adding roughly $395 in repayments.
          </p>

          <h3>CPI Indexation: The Hidden Cost</h3>
          <p>
            Every year on 1 June, the ATO applies CPI indexation to your outstanding HECS-HELP balance. The rate is set based on the All Groups CPI for the 12 months to March of the same year. It has ranged from near 0% (2020-21) to 7.1% (2023-24) in recent years.
          </p>
          <p>
            The key thing to understand is that indexation is calculated on the balance <strong>before</strong> PAYG withholding credits are applied. If you've had HECS withheld from your salary throughout the year, those payments don't reduce your June 1 balance — they are credited after your tax return is lodged. This means your debt can grow by the full indexation amount even if you've been making withholdings all year.
          </p>
          <p>
            In practice, for someone with a $30,000 balance in a 7% indexation year, that's an extra $2,100 added before any repayments are credited. For many graduates on lower incomes, their compulsory repayments may be less than the indexation applied — meaning the debt grows despite making payments.
          </p>

          <h3>Voluntary Repayments: Do They Make Sense?</h3>
          <p>
            Since January 2017, there is no bonus or discount for voluntary repayments. The decision comes down to a simple comparison: the indexation rate vs your expected after-tax investment return.
          </p>
          <ul>
            <li>If indexation is 3% and you can earn 7% investing, keeping the debt and investing makes financial sense.</li>
            <li>If indexation is 7% and you're in a savings account at 4%, paying down debt is better.</li>
            <li>One often-overlooked benefit of paying early: making a lump sum payment <strong>before 1 June</strong> reduces the balance on which indexation is calculated, saving you the indexation on that amount for that year.</li>
          </ul>

          <h3>HECS and Borrowing Capacity</h3>
          <p>
            If you're planning to apply for a mortgage, your HECS-HELP debt affects your borrowing capacity even though it's not a traditional liability. Lenders treat your compulsory repayment as a reduction to your disposable income. On an $85,000 income with a 4.5% repayment rate, that's $3,825 per year ($318/month) the bank counts against you when calculating how much you can borrow. The larger your debt and the higher your income, the more significant this effect.
          </p>
          <p>
            Some borrowers choose to pay down HECS debt before applying for a home loan specifically to increase their borrowing capacity — particularly if their HECS repayments are keeping them below the lending threshold for the property they want.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
