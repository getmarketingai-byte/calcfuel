import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import WfhTaxCalc from "./WfhTaxCalc";

export const metadata: Metadata = {
  title: "Work From Home Tax Deduction Calculator Australia (2025–26)",
  description:
    "Free Australian work from home tax deduction calculator for FY2025-26. Calculate your WFH deduction using the ATO's fixed rate method (70c/hr) or the actual cost method. See your total deduction and tax saving.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/work-from-home-tax-calculator",
  },
  openGraph: {
    title: "Work From Home Tax Deduction Calculator Australia (2025–26)",
    description:
      "Calculate your WFH tax deduction for FY2025-26. Fixed rate 70c/hr or actual cost method. See total deduction and estimated tax saving.",
    url: "https://calcfuel.com/calculators/work-from-home-tax-calculator",
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
    title: "HECS-HELP Repayment Calculator",
    slug: "hecs-help-repayment-calculator",
    description: "Calculate your mandatory HECS repayment and years to pay off your student debt.",
  },
  {
    title: "Capital Gains Tax Calculator",
    slug: "capital-gains-tax-calculator",
    description: "Estimate your Australian CGT liability for property, shares, or other assets.",
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement with employer SG and voluntary contributions.",
  },
];

const faqs = [
  {
    question: "What is the ATO fixed rate method for working from home in FY2025-26?",
    answer:
      "The ATO's revised fixed rate method allows you to claim 70 cents per hour for every hour you work from home during the financial year. This rate covers electricity and gas, internet expenses, phone expenses, and stationery and computer consumables. It does not cover depreciation of furniture and equipment — you can still claim these separately. The 70c rate applies from FY2024-25 onwards (updated from 67c which applied from FY2022-23). To use this method, you must keep a record of actual hours worked from home — a timesheet, diary, or roster. From 1 March 2023, the ATO no longer accepts a representative 4-week sample; you must have records for the whole year.",
  },
  {
    question: "What is the actual cost method and when should I use it?",
    answer:
      "The actual cost method allows you to claim the actual expenses you incur from working at home, apportioned by the floor space your home office occupies relative to your total home area, and further apportioned by the time you use it for work. Expenses that can be claimed include rent or mortgage interest, electricity and gas, internet, phone, cleaning, and home office furniture depreciation. The actual cost method requires more detailed record-keeping but often produces a higher deduction for people who have a dedicated home office in a large home with high running costs. If your home office is more than 10–15% of your total home area, or your rent/mortgage is high, the actual cost method is usually worth calculating.",
  },
  {
    question: "Do I need a dedicated home office to claim WFH deductions?",
    answer:
      "For the fixed rate method (70c/hr), you do not need a dedicated home office — you can work at a kitchen table or in any area of the home. You simply need to be genuinely working and keep records of your hours. For the actual cost method, the ATO requires that you have a dedicated space set aside for work — an area of your home used exclusively or almost exclusively for income-producing activities. Using the kitchen table or a shared living area does not qualify for the actual cost method's area-based apportionment.",
  },
  {
    question: "What records do I need to keep for WFH deductions?",
    answer:
      "For the fixed rate method, you must keep a record of the number of hours you worked from home for the full financial year. Acceptable records include: a timesheet or log (the simplest), a diary entry for each WFH day showing start and finish times, or a roster from your employer showing your WFH schedule. A representative 4-week diary is no longer sufficient for claims from 1 March 2023 onwards. For the actual cost method, you need records of all the expenses claimed (invoices, receipts, bills), floor plan measurements or evidence of the dedicated workspace, and a diary showing working patterns.",
  },
  {
    question: "Can I claim both the fixed rate method and depreciation on equipment?",
    answer:
      "Yes. The fixed rate 70c/hr covers running costs (electricity, gas, phone, internet, stationery) but does not include depreciation on equipment or furniture. You can claim the 70c/hr under the fixed rate method AND separately claim depreciation on work-related equipment such as a laptop, monitor, desk, or chair. The depreciation claim is made separately under the work-related equipment section of your tax return, either as an immediate deduction (for items under $300) or as a depreciation deduction for the effective life of the asset.",
  },
  {
    question: "What about working from home as a sole trader or small business owner?",
    answer:
      "Self-employed people, sole traders, and those running a small business from home can also claim home office expenses, but the rules are slightly different. If you use part of your home exclusively for business purposes, you can claim the actual cost of that space. There are also implications for capital gains tax if you own your home — using part of it for business can partially reduce your main residence CGT exemption when you sell. It is strongly recommended that self-employed individuals get specific tax advice rather than relying solely on the employee WFH rules.",
  },
  {
    question: "How does the WFH deduction compare between the two methods?",
    answer:
      "For most employees working 2–4 days per week from home in a typical apartment or house, the fixed rate method (70c/hr) is simpler and often produces a comparable deduction to the actual cost method. For example, 3 hours per day × 240 working days = 720 hours × $0.70 = $482 deduction. Under the actual cost method for someone with a 10sqm home office in a 100sqm home paying $20,000/year rent: 10% × time fraction × $20,000 = roughly $200–$400 in rent alone, plus utilities. The actual cost method becomes significantly better when your home office is a larger proportion of your home and you have high running costs — typically for people with a dedicated study in a large house.",
  },
];

export default function WfhTaxPage() {
  return (
    <>
      <CalculatorJsonLd
        name="Work From Home Tax Deduction Calculator Australia"
        description="Calculate your WFH tax deduction for FY2025-26 using the fixed rate (70c/hr) or actual cost method."
        url="https://calcfuel.com/calculators/work-from-home-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Work From Home Tax Calculator", url: "https://calcfuel.com/calculators/work-from-home-tax-calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Work From Home Tax Deduction Calculator (FY2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
          Calculate your WFH deduction using the ATO&apos;s fixed rate method (70c/hr) or the actual cost method.
        </p>
        <div className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full mb-8">
          Updated for FY2025–26 — EOFY 30 June 2026
        </div>

        <WfhTaxCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <ol className="space-y-3">
            {[
              "Choose your method: the Fixed Rate Method (70c/hr) is simpler and requires only a record of hours. The Actual Cost Method requires more inputs but can produce a higher deduction.",
              "Enter the average hours you work from home each week. Include only genuine work hours — not lunch breaks or personal time.",
              "Enter the number of weeks you worked from home this financial year (maximum 52).",
              "Select your marginal tax rate to see the estimated tax saving — the actual cash benefit from the deduction.",
              "For the Actual Cost Method, enter your home office area, total home area, and annual running costs. The calculator apportions each expense by area and time.",
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
          <h2>Work From Home Tax Deductions in Australia: A Complete Guide (FY2025-26)</h2>
          <p>
            With millions of Australians working from home — either full-time, part-time, or on a hybrid basis — the work from home tax deduction is one of the most widely applicable deductions in the Australian tax system. Yet it remains one of the most misunderstood and under-claimed.
          </p>
          <p>
            The ATO overhauled the WFH deduction rules in 2022-23, introducing a revised fixed rate of 70 cents per hour that replaced both the previous 52c rate and the shortcut method (80c/hr) that had been available during COVID. Understanding the current rules — and keeping the right records — is essential before lodging your return.
          </p>

          <h3>The 70c Fixed Rate: What It Covers and What It Doesn&apos;t</h3>
          <p>
            The 70c fixed rate covers all of the following in a single rate:
          </p>
          <ul>
            <li>Electricity and gas for heating, cooling, and lighting your workspace</li>
            <li>Internet expenses (the work-related portion)</li>
            <li>Phone expenses (the work-related portion)</li>
            <li>Stationery and computer consumables (paper, printer ink, etc.)</li>
          </ul>
          <p>
            It does <strong>not</strong> cover:
          </p>
          <ul>
            <li>Depreciation on office furniture (desk, chair, shelving)</li>
            <li>Depreciation on computer equipment (laptop, monitor, keyboard, webcam)</li>
            <li>Occupancy costs (rent, mortgage interest) — these can only be claimed under the actual cost method</li>
            <li>Repairs and maintenance to the home office</li>
          </ul>
          <p>
            Equipment depreciation is claimed separately under the work-related expenses section of your tax return. Items costing $300 or less can be claimed as an immediate deduction; more expensive items are depreciated over their effective life.
          </p>

          <h3>The Critical Record-Keeping Change from March 2023</h3>
          <p>
            The most important rule change that many people are unaware of: from 1 March 2023, the ATO requires a <strong>full year record</strong> of hours worked from home. You can no longer use a representative 4-week diary and extrapolate it.
          </p>
          <p>
            Your record must cover the entire period of your WFH claim and show the actual hours you worked. Acceptable records include:
          </p>
          <ul>
            <li>A timesheet or electronic time-tracking log</li>
            <li>A diary or calendar with daily WFH hours</li>
            <li>An employer roster showing WFH days</li>
            <li>Timesheets lodged through your workplace system</li>
          </ul>
          <p>
            If you don&apos;t have this record, you risk having your claim disallowed in an ATO audit. Start keeping records now if you haven&apos;t already — and for next year, consider using a simple spreadsheet or time-tracking app.
          </p>

          <h3>EOFY Checklist: Maximising Your WFH Deduction Before 30 June</h3>
          <ol>
            <li><strong>Compile your hours record.</strong> Calculate total hours worked from home this financial year. Reconstruct from calendar events, email records, or workplace systems if you haven&apos;t been keeping a log.</li>
            <li><strong>List equipment purchased.</strong> Any work-related equipment bought this year (laptop, monitor, standing desk, webcam) can be claimed. Items under $300 are an instant deduction; items over $300 are depreciated.</li>
            <li><strong>Consider the actual cost method</strong> if you have a dedicated home office that takes up significant floor space. Compare both methods before choosing.</li>
            <li><strong>Keep all receipts.</strong> Utility bills, internet bills, and equipment receipts should be retained for 5 years in case of an audit.</li>
            <li><strong>Don&apos;t double-count.</strong> If you use the 70c fixed rate, you cannot also separately claim internet or phone expenses — they are already included in the rate.</li>
          </ol>
          <p className="mt-4">
            Related calculators:{" "}
            <Link href="/calculators/australian-income-tax-calculator" className="text-orange-600 dark:text-orange-400 underline">Australian Income Tax Calculator</Link>
            {" · "}
            <Link href="/calculators/tax-refund-estimator" className="text-orange-600 dark:text-orange-400 underline">Tax Refund Estimator</Link>
            {" · "}
            <Link href="/calculators/salary-sacrifice-calculator" className="text-orange-600 dark:text-orange-400 underline">Salary Sacrifice Calculator</Link>
            {" · "}
            <Link href="/calculators/hecs-help-repayment-calculator" className="text-orange-600 dark:text-orange-400 underline">HECS-HELP Repayment Calculator</Link>
            {" · "}
            <Link href="/calculators/superannuation-calculator" className="text-orange-600 dark:text-orange-400 underline">Superannuation Calculator</Link>
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

        <YMYLDisclaimer type="tax" />
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
