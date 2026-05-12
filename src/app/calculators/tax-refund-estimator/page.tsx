import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import TaxRefundCalc from "./TaxRefundCalc";

export const metadata: Metadata = {
  title: "Tax Refund Estimator Australia 2025–26 | How Much Will I Get Back?",
  description:
    "Free Australian tax refund calculator for FY2025-26. Enter your PAYG withholding and deductions to estimate your tax refund or amount owing. Updated for EOFY 30 June 2026.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/tax-refund-estimator",
  },
  openGraph: {
    title: "Tax Refund Estimator Australia 2025–26 | How Much Will I Get Back?",
    description:
      "Estimate your Australian tax refund for FY2025-26. Enter income, PAYG withholding, and deductions to see your refund or bill before you lodge.",
    url: "https://calcfuel.com/calculators/tax-refund-estimator",
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
    title: "Work From Home Tax Deduction Calculator",
    slug: "work-from-home-tax-calculator",
    description: "Calculate your WFH deduction using the ATO's fixed rate method (67c/hr) or actual cost method.",
  },
  {
    title: "Salary Sacrifice Calculator",
    slug: "salary-sacrifice-calculator",
    description: "Calculate tax savings from salary sacrificing to super or a novated lease before EOFY.",
  },
  {
    title: "HECS-HELP Repayment Calculator",
    slug: "hecs-help-repayment-calculator",
    description: "See your mandatory HECS-HELP repayment rate and years to pay off for FY2025-26.",
  },
];

const faqs = [
  {
    question: "How does the ATO calculate my tax refund?",
    answer:
      "Your employer withholds tax from your pay each week or fortnight under the Pay As You Go (PAYG) withholding system. The withheld amount is based on your salary alone, but it doesn't account for deductions, multiple income sources, or tax offsets you're entitled to. When you lodge your tax return, the ATO calculates your actual tax liability for the full financial year — including all income, deductions, and offsets. If more tax was withheld than you owe, the difference is refunded. If less was withheld, you owe the difference. This calculator estimates that reconciliation before you lodge.",
  },
  {
    question: "What deductions can I claim to increase my refund?",
    answer:
      "The most common work-related deductions are: vehicle and travel expenses (for work-related travel, not commuting), working from home expenses (67 cents/hour fixed rate under the ATO's revised method), tools, equipment and computers used for work, professional memberships, subscriptions and union fees, self-education expenses related to your current job, and sun protection for outdoor workers. Outside work-related deductions, you can also claim donations to DGR-registered charities, income protection insurance premiums, and interest on investment loans. Personal expenses and the cost of commuting to and from work are not deductible.",
  },
  {
    question: "When should I lodge my tax return to get my refund faster?",
    answer:
      "The ATO opens tax return lodgement from 1 July each year. Most people who lodge early (July–August) receive their refund within 2 weeks if lodging via myTax (ATO's online system) and their return doesn't require manual review. Lodging through a registered tax agent gives you until 31 October, or even later in some circumstances. The ATO processes electronic lodgements faster than paper ones — expect 2 weeks for e-lodge and 10 weeks for paper. If you owe tax, you must pay by 21 November (for self-lodgers) or the date stated in your tax agent's lodgement program.",
  },
  {
    question: "Why might my actual refund differ from this estimate?",
    answer:
      "This calculator uses standard FY2025-26 tax rates and offsets but doesn't account for everything in your personal circumstances. Your actual refund may differ because of: taxable fringe benefits from your employer (reportable fringe benefits amount shown on your payment summary), employer super contributions above the 11.5% SG rate, income from trusts or partnerships, capital gains from investments or property sales, private health insurance rebate adjustments, the Private Health Insurance offset, or any ATO debts (tax debt, HECS-HELP balance). For complex situations, a registered tax agent provides a more accurate estimate.",
  },
  {
    question: "Does having multiple jobs affect my tax refund?",
    answer:
      "Yes — having multiple jobs often results in too much tax being withheld, leading to a refund when you lodge. This happens because each employer applies the tax-free threshold (if claimed) independently, and together the combined income pushes you into a higher marginal bracket. If you claimed the tax-free threshold at both jobs, you'll likely owe tax rather than receive a refund. The correct approach is to claim the tax-free threshold only at your primary (highest-paying) job, and lodge a 'no tax-free threshold' TFN declaration at secondary employers.",
  },
  {
    question: "What is the Medicare Levy Surcharge and how does it affect my refund?",
    answer:
      "The Medicare Levy Surcharge (MLS) is an additional levy of 1%–1.5% of your taxable income if you earn above $93,000 (FY2025-26 singles threshold) and don't have an appropriate level of private hospital insurance. If you don't have private health cover and earn above the threshold, the MLS will reduce your refund or increase your tax bill. The base Medicare Levy (2% of taxable income) applies to most taxpayers regardless of private health insurance status, though low-income earners receive a reduction or exemption.",
  },
  {
    question: "Can I claim a deduction for working from home in FY2025-26?",
    answer:
      "Yes. For FY2025-26, the ATO's revised fixed rate method allows a deduction of 67 cents per work-from-home hour for running costs (energy, stationery, phone, internet, etc.). To use this method, you must keep records showing actual hours worked from home throughout the year — the ATO no longer accepts a 4-week representative diary since March 2023 changes. You can use our Work From Home Tax Deduction Calculator to estimate the deduction amount. If your actual costs exceed the fixed rate, the actual cost method may produce a larger deduction.",
  },
];

export default function TaxRefundEstimatorPage() {
  return (
    <>
      <CalculatorJsonLd
        name="Tax Refund Estimator Australia FY2025-26"
        description="Estimate your Australian tax refund or tax bill for FY2025-26. Enter PAYG withholding, income sources, and deductions."
        url="https://calcfuel.com/calculators/tax-refund-estimator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Tax Refund Estimator", url: "https://calcfuel.com/calculators/tax-refund-estimator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/calculators" className="hover:text-orange-500">Calculators</Link>
          <span className="mx-2">/</span>
          <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link>
          <span className="mx-2">/</span>
          <span>Tax Refund Estimator</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Australian Tax Refund Estimator (FY2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          Enter your income, PAYG withholding, and deductions to estimate your refund before you lodge.
        </p>
        <div className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full mb-8">
          Updated for FY2025–26 — EOFY 30 June 2026
        </div>

        <TaxRefundCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Estimator</h2>
          <ol className="space-y-3">
            {[
              "Enter your gross income and PAYG tax withheld for each employer. You'll find these on your payment summary, PAYG summary, or in myGov under income statements.",
              "Add any other income — interest, dividends, rental income, freelance/ABN income. For freelance work with no withholding, enter $0 in the 'Tax withheld' field.",
              "Enter your work-related deductions. The most common are WFH expenses (use our WFH calculator for this), car expenses, tools, and professional memberships.",
              "Tick the private hospital cover checkbox if you hold an appropriate policy (this avoids the Medicare Levy Surcharge for high earners).",
              "Click 'Estimate My Tax Refund' to see your estimated refund or amount owing, your taxable income, effective tax rate, and full breakdown.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <AdSenseUnit slot="3651327789" className="my-8" />

        <section className="mt-8 prose prose-gray dark:prose-invert max-w-none">
          <h2>How Australian Tax Refunds Work</h2>
          <p>
            Every year, the Australian Taxation Office (ATO) reconciles the tax you actually owe for
            the financial year (1 July to 30 June) against the tax already withheld by your employer(s)
            under the PAYG withholding system. The result is either a refund (overpaid) or a bill (underpaid).
          </p>
          <p>
            PAYG withholding is calculated by your employer on each pay cycle, assuming your salary
            continues at the same rate for the full year. It doesn&apos;t account for:
          </p>
          <ul>
            <li>Work-related deductions you plan to claim</li>
            <li>Income from other sources (investments, rental properties, side income)</li>
            <li>Tax offsets you&apos;re entitled to (Low Income Tax Offset, private health rebate)</li>
            <li>Changes in income partway through the year (e.g. job change, parental leave)</li>
          </ul>
          <p>
            Because most employees&apos; actual tax liability is lower than the withholding amount once
            deductions and offsets are applied, the majority of Australian tax returns result in a refund.
            The ATO reports that around 75% of lodgements each year receive a refund, with an average
            refund of approximately $2,800.
          </p>

          <h3>EOFY 2026: Key Dates and Actions</h3>
          <p>
            The financial year ends on <strong>30 June 2026</strong>. Here are the key dates for
            FY2025-26 tax returns:
          </p>
          <ul>
            <li><strong>1 July 2026</strong>: Tax return lodgement opens on myTax</li>
            <li><strong>Late July 2026</strong>: Most employers finalise income statements in Single Touch Payroll (STP). Wait for this before lodging — the ATO will flag if an employer hasn&apos;t finalised yet.</li>
            <li><strong>31 October 2026</strong>: Deadline for self-lodgers (those not using a tax agent)</li>
            <li><strong>Extended deadline</strong>: If using a registered tax agent, the deadline is typically 31 March 2027 or later depending on the agent&apos;s lodgement program</li>
          </ul>

          <h3>How to Maximise Your Tax Refund Before 30 June</h3>
          <p>
            Before the end of the financial year (30 June 2026), consider these EOFY strategies:
          </p>
          <ul>
            <li>
              <strong>Top up super via salary sacrifice or personal contributions.</strong> Concessional
              contributions are taxed at just 15% inside the super fund versus your marginal rate. The
              FY2025-26 concessional cap is $30,000 (including employer SG).
            </li>
            <li>
              <strong>Prepay work-related expenses.</strong> Professional memberships, subscriptions, and
              courses paid before 30 June are deductible in the current year.
            </li>
            <li>
              <strong>Make a charitable donation.</strong> Gifts to DGR-registered charities made before
              30 June are fully deductible.
            </li>
            <li>
              <strong>Harvest investment losses.</strong> Realising capital losses before 30 June can offset
              capital gains and reduce your CGT liability for the year.
            </li>
            <li>
              <strong>Ensure your WFH records are complete.</strong> You need a full-year record of actual
              hours worked from home to use the 67c/hr fixed rate method.
            </li>
          </ul>
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

        <YMYLDisclaimer type="tax" />
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
