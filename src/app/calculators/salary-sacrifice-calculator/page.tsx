import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import SalarySacrificeCalc from "./SalarySacrificeCalc";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

export const metadata: Metadata = {
  title: "Salary Sacrifice Calculator Australia (2025–26) — Super & Novated Lease",
  description:
    "Free Australian salary sacrifice calculator for FY2025-26. Calculate your tax saving from salary sacrificing to super or a novated lease vehicle. Includes EV FBT exemption and before/after take-home comparison.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/salary-sacrifice-calculator",
  },
  openGraph: {
    title: "Salary Sacrifice Calculator Australia (2025–26) — Super & Novated Lease",
    description:
      "Calculate tax savings from salary sacrifice to super or a novated lease. Includes EV FBT exemption. Updated for FY2025-26.",
    url: "https://calcfuel.com/calculators/salary-sacrifice-calculator",
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
    title: "Work From Home Tax Deduction Calculator",
    slug: "work-from-home-tax-calculator",
    description: "Calculate your WFH deduction using the ATO's fixed rate method (67c/hr) or actual cost method.",
  },
  {
    title: "Capital Gains Tax Calculator",
    slug: "capital-gains-tax-calculator",
    description: "Estimate your Australian CGT liability for property, shares, or other assets.",
  },
];

const faqs = [
  {
    question: "What is salary sacrifice in Australia?",
    answer:
      "Salary sacrifice (also called salary packaging) is an arrangement between you and your employer where you agree to forgo part of your pre-tax salary in exchange for your employer providing you with benefits of a similar value. Because the sacrificed amount reduces your taxable income, you pay less income tax and Medicare levy. Common salary sacrifice items include superannuation contributions, novated lease vehicles, and — for employees of certain public hospitals and charities — meal entertainment and other exempt benefits. The key benefit is that you effectively pay for these items from pre-tax dollars rather than after-tax dollars.",
  },
  {
    question: "What is the concessional super contributions cap for FY2025-26?",
    answer:
      "The concessional contributions cap for FY2025-26 is $30,000. This cap includes all concessional (pre-tax) contributions: your employer's compulsory Superannuation Guarantee (SG) contributions (11.5% in FY2025-26), plus any salary sacrifice contributions you make. If your employer contributes $9,000 in SG, you can salary sacrifice up to $21,000 before hitting the cap. Contributions above the cap are included in your assessable income and taxed at your marginal rate (with a 15% tax offset). From 2024-25, unused concessional cap amounts from prior years can be carried forward (up to 5 years) if your super balance is below $500,000.",
  },
  {
    question: "What is a novated lease and how does salary sacrifice apply?",
    answer:
      "A novated lease is a three-way arrangement between you, your employer, and a finance company. Your employer leases the vehicle on your behalf and deducts the lease payments (and often running costs) from your pre-tax salary. Because the vehicle costs come from your pre-tax income, you pay less tax overall. After the lease term, you can refinance, purchase the vehicle for the residual value, or start a new lease. Novated leases cover all vehicle-related costs including finance, fuel (or charging), insurance, registration, and maintenance — all bundled into a single fortnightly deduction.",
  },
  {
    question: "Are electric vehicles FBT-exempt in Australia?",
    answer:
      "Yes — from 1 July 2022, eligible electric vehicles (EVs) and plug-in hybrid electric vehicles (PHEVs) are exempt from Fringe Benefits Tax (FBT) under the Electric Car Discount Act 2022, provided the vehicle's first retail price is below the luxury car tax threshold ($89,332 for FY2025-26). This makes EVs via novated lease particularly tax-efficient — the entire cost (finance, running costs, charging) can be pre-tax salary packaged with no FBT liability. Note: PHEVs will lose the FBT exemption from 1 April 2025 unless a valid commitment was in place before that date.",
  },
  {
    question: "How much tax can I save by salary sacrificing to super?",
    answer:
      "The tax saving depends on your marginal tax rate. Contributions made via salary sacrifice are taxed at 15% inside the super fund, rather than at your marginal rate. For someone on the 32.5% marginal rate, the saving is approximately 17.5% of the sacrificed amount (32.5% − 15%). For someone on 37%, the saving is 22%. For someone on 45%, the saving is 30%. For example, salary sacrificing $10,000 on a 37% marginal rate saves approximately $2,200 in tax ($3,700 avoided minus $1,500 contributions tax). The money is preserved in super until retirement, so you should factor in your liquidity needs.",
  },
  {
    question: "Does salary sacrifice affect my employer's SG contributions?",
    answer:
      "From 1 January 2020, employers must calculate Superannuation Guarantee (SG) contributions on an employee's ordinary time earnings — which includes the pre-sacrifice base salary, not the reduced post-sacrifice salary. This means salary sacrifice cannot reduce your employer's SG obligations. For example, if you earn $100,000 and sacrifice $10,000, your employer must still pay SG on $100,000 (at 11.5% = $11,500), not on the reduced $90,000. However, some older employment contracts may use a 'total remuneration' model where the employer's SG is part of a fixed total package — in this case, sacrificing to super may reduce your employer's SG payment. Check your employment contract.",
  },
  {
    question: "What are the pros and cons of a novated lease vs buying a car outright?",
    answer:
      "Pros of novated lease: (1) Vehicle costs come from pre-tax income, saving GST and income tax; (2) All costs bundled into one payment — no surprise bills; (3) Access to fleet pricing on vehicles; (4) EV FBT exemption makes EVs highly tax-efficient. Cons: (1) You don't own the vehicle — there's a residual payment at the end; (2) Breaking the lease early incurs exit fees; (3) If you leave your employer, the lease reverts to a personal finance arrangement; (4) The tax benefit only makes sense if you drive regularly — low-km drivers may not benefit enough to justify the structure. The break-even point compared to a personal car loan depends on your marginal tax rate and the vehicle's running costs.",
  },
];

export default function SalarySacrificePage() {
  return (
    <>
      <CalculatorJsonLd
        name="Salary Sacrifice Calculator Australia"
        description="Calculate your tax saving from salary sacrificing to super or a novated lease vehicle. FY2025-26 rates."
        url="https://calcfuel.com/calculators/salary-sacrifice-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Salary Sacrifice Calculator", url: "https://calcfuel.com/calculators/salary-sacrifice-calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Salary Sacrifice Calculator Australia (FY2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
          Calculate your tax saving from salary sacrificing to super or a novated lease vehicle. Includes EV FBT exemption.
        </p>
        <div className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full mb-8">
          Updated for FY2025–26 — EOFY 30 June 2026
        </div>

        <SalarySacrificeCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <ol className="space-y-3">
            {[
              "Select your sacrifice type: Super Salary Sacrifice (reduces taxable income, grows super) or Novated Lease (pre-tax vehicle costs).",
              "Enter your gross annual salary — this is your total pre-tax income before any salary sacrifice.",
              "For super: enter the amount you want to sacrifice each year. The FY2025-26 concessional cap is $30,000 (including your employer's SG contributions).",
              "For novated lease: enter the vehicle price, annual kilometres, and lease term. Tick the EV checkbox if you're leasing an eligible electric vehicle.",
              "Click Calculate to see your tax saving, take-home pay comparison, and full breakdown.",
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
          <h2>Salary Sacrifice in Australia: A Complete Guide (FY2025-26)</h2>
          <p>
            Salary sacrifice is one of the most powerful tax-reduction strategies available to Australian employees.
            By redirecting part of your pre-tax salary to approved benefits, you reduce your taxable income and pay less
            income tax — effectively getting more value for every dollar you earn.
          </p>
          <p>
            With EOFY approaching on 30 June 2026, salary sacrifice decisions made before the end of the financial year
            can significantly reduce your FY2025-26 tax bill. Two of the most common salary sacrifice strategies are
            superannuation top-ups and novated lease vehicles.
          </p>

          <h3>Super Salary Sacrifice: Reduce Tax, Grow Retirement Savings</h3>
          <p>
            The most accessible salary sacrifice option is extra superannuation. Contributions made via salary sacrifice
            are classified as concessional contributions — they&apos;re taxed at just 15% inside the super fund, compared to
            your marginal income tax rate (up to 45% plus Medicare levy).
          </p>
          <p>
            For FY2025-26, the concessional contributions cap is <strong>$30,000</strong>. This cap includes your
            employer&apos;s compulsory Superannuation Guarantee (SG) contributions — now at 11.5% of your ordinary time earnings.
            If your employer pays $9,200 in SG on a $80,000 salary, you can sacrifice up to $20,800 in additional super
            before hitting the cap.
          </p>
          <p>
            The tax saving is calculated as the difference between your marginal tax rate and the 15% contributions tax.
            For a 37% taxpayer, that&apos;s a 22% saving on every dollar sacrificed — very significant over time.
          </p>

          <h3>Novated Lease: Drive Your Next Car From Pre-Tax Salary</h3>
          <p>
            A novated lease lets you bundle the entire cost of a car — finance, fuel (or charging), insurance, rego, and
            maintenance — into a single pre-tax salary deduction. Because these costs come from your pre-tax income, you
            effectively save GST on the vehicle purchase and income tax on all running costs.
          </p>
          <p>
            Historically, novated leases attracted Fringe Benefits Tax (FBT), which reduced their effectiveness for
            higher-income earners. But from 1 July 2022, the Australian Government introduced a full FBT exemption for
            eligible electric vehicles (EVs) under the luxury car tax threshold — making EV novated leases one of the
            most tax-effective ways to acquire a vehicle in Australian history.
          </p>

          <h3>EOFY Deadline: Act Before 30 June 2026</h3>
          <p>
            Salary sacrifice decisions must be made prospectively — you cannot retroactively sacrifice salary you&apos;ve
            already received. To increase your super contributions for FY2025-26, you need to have an arrangement in
            place with your employer before 30 June 2026. Some employers require 2–4 weeks notice to process a change.
          </p>
          <ul>
            <li>Contact your payroll team now to set up or increase salary sacrifice to super before EOFY.</li>
            <li>If you&apos;re considering a novated lease, initiate the application process early — fleet approvals and vehicle orders take time.</li>
            <li>Check your super fund&apos;s website for concessional contributions tracking to avoid exceeding the $30,000 cap.</li>
            <li>Consider carry-forward concessional contributions if your super balance is below $500,000 and you have unused cap from prior years.</li>
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
