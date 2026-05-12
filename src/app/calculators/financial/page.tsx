import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Australian Financial Calculators — Tax, Mortgage, Super & More | CalcFuel",
  description:
    "Free Australian financial calculators for FY2025-26. Income tax, HECS-HELP repayment, work from home deductions, capital gains tax, negative gearing, stamp duty, superannuation, GST, and mortgage repayments.",
  alternates: { canonical: "https://calcfuel.com/calculators/financial" },
  openGraph: {
    title: "Australian Financial Calculators — Tax, Mortgage & Super | CalcFuel",
    description:
      "Free Australian financial calculators: income tax, HECS-HELP, WFH deductions, CGT, negative gearing, stamp duty, superannuation, GST, and more.",
    url: "https://calcfuel.com/calculators/financial",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const tools = [
  {
    title: "Salary Sacrifice Calculator",
    slug: "salary-sacrifice-calculator",
    description: "Calculate tax savings from salary sacrificing to super or a novated lease. Includes EV FBT exemption.",
    badge: "EOFY",
  },
  {
    title: "Australian Income Tax Calculator",
    slug: "australian-income-tax-calculator",
    description: "Calculate your income tax, Medicare levy, and take-home pay for FY2025-26.",
    badge: "EOFY",
  },
  {
    title: "Work From Home Tax Deduction Calculator",
    slug: "work-from-home-tax-calculator",
    description: "Calculate your WFH deduction using the ATO's fixed rate (67c/hr) or actual cost method.",
    badge: "EOFY",
  },
  {
    title: "HECS-HELP Repayment Calculator",
    slug: "hecs-help-repayment-calculator",
    description: "See your mandatory repayment rate, annual amount, years to pay off, and CPI indexation cost.",
    badge: "EOFY",
  },
  {
    title: "Capital Gains Tax Calculator",
    slug: "capital-gains-tax-calculator",
    description: "Estimate your CGT liability for property, shares, or other assets. Includes 50% CGT discount.",
    badge: "EOFY",
  },
  {
    title: "Negative Gearing Calculator",
    slug: "negative-gearing-calculator",
    description: "Calculate rental property tax savings, cash flow, and after-tax return on investment.",
    badge: null,
  },
  {
    title: "Stamp Duty Calculator",
    slug: "stamp-duty-calculator",
    description: "Calculate stamp duty for all Australian states and territories, including first home buyer concessions.",
    badge: null,
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement with employer SG contributions and voluntary top-ups.",
    badge: "EOFY",
  },
  {
    title: "GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove 10% GST from any amount. Calculate GST-inclusive and GST-exclusive prices.",
    badge: null,
  },
  {
    title: "Mortgage Repayment Calculator",
    slug: "mortgage-repayment-calculator",
    description: "Calculate Australian home loan repayments, total interest payable, and compare P&I vs interest-only.",
    badge: null,
  },
  {
    title: "Loan Repayment Calculator",
    slug: "loan-repayment-calculator",
    description: "Calculate monthly repayments for any personal or car loan with an amortisation schedule.",
    badge: null,
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Project investment growth with compound interest, including regular contributions.",
    badge: null,
  },
];

export default function FinancialHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Financial</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Australian Financial Calculators
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        Free calculators for Australian tax, superannuation, mortgages, and investments.
        All updated for FY2025–26.
      </p>
      <div className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full mb-8">
        EOFY 30 June 2026 — tax season tools ready
      </div>

      <AdSenseUnit slot="6564431580" className="mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}`}
            className="block p-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 hover:shadow-lg hover:border-orange-400 transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                {tool.title}
              </h2>
              {tool.badge && (
                <span className="flex-shrink-0 text-xs font-bold bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                  {tool.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {tool.description}
            </p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">
              Calculate now →
            </span>
          </Link>
        ))}
      </div>

      <AdSenseUnit slot="3651327789" className="mb-10" />

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Australian Tax Calculators for EOFY 2026</h2>
        <p>
          The end of the financial year (30 June 2026) is the key date for Australian taxpayers.
          These free calculators are built on the latest ATO rates and thresholds for FY2025–26,
          covering everything from income tax and Medicare levy to WFH deductions, CGT, and super contributions.
        </p>
        <h3>Most-Used Tools This Tax Season</h3>
        <ul>
          <li>
            <strong>Work From Home Tax Deduction</strong> — With millions of Australians still working hybrid,
            the 67c/hr fixed rate method is the simplest way to maximise your WFH claim before 30 June.
          </li>
          <li>
            <strong>HECS-HELP Repayment</strong> — The ATO applies CPI indexation to student debt on 1 June.
            Use this calculator to see whether a voluntary repayment before 1 June saves money.
          </li>
          <li>
            <strong>Capital Gains Tax</strong> — Selling an asset before or after 30 June can significantly
            change your CGT bill. This calculator shows you the 50% discount benefit for assets held over 12 months.
          </li>
          <li>
            <strong>Superannuation</strong> — The concessional contributions cap for FY2025–26 is $30,000.
            Making a super contribution before 30 June can reduce your taxable income significantly.
          </li>
        </ul>
      </section>
    </div>
  );
}
