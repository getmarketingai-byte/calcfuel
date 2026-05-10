import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import SuperCalc from "./SuperCalc";

export const metadata: Metadata = {
  title: "Superannuation Calculator Australia — Project Your Super Balance at Retirement",
  description:
    "Free Australian superannuation calculator. Enter your age, salary, and super balance to project how much super you'll have at retirement. Includes employer SG contributions, voluntary top-ups, and year-by-year growth.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/superannuation-calculator",
  },
  openGraph: {
    title: "Superannuation Calculator Australia",
    description:
      "Project your super balance at retirement. Enter your age, salary, current balance, and voluntary contributions to see year-by-year super growth.",
    url: "https://calcfuel.com/calculators/superannuation-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Calculate how savings or investments grow with compound interest.",
  },
  {
    title: "Mortgage Repayment Calculator",
    slug: "mortgage-repayment-calculator",
    description: "Calculate Australian home loan repayments and compare frequencies.",
  },
  {
    title: "Australian GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove 10% GST from any Australian price instantly.",
  },
  {
    title: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    description: "Calculate gross, net, and operating profit margins.",
  },
];

const faqs = [
  {
    question: "What is the Superannuation Guarantee (SG) rate in Australia?",
    answer:
      "The Superannuation Guarantee (SG) is the minimum percentage of your ordinary time earnings that your employer must contribute to your superannuation fund. From 1 July 2024, the SG rate is 11.5% per annum. It will increase to 12% from 1 July 2025 and remain at 12% thereafter. Most employers pay SG quarterly. Self-employed individuals are not required to pay themselves SG, though voluntary contributions are strongly encouraged for retirement savings.",
  },
  {
    question: "What is the preservation age for Australian superannuation?",
    answer:
      "The preservation age is the minimum age at which you can access your superannuation (subject to meeting a condition of release). For anyone born after 1 July 1964, the preservation age is 60. Between age 60 and 65, you can access your super if you have retired or under a Transition to Retirement (TTR) strategy. From age 65, you can access your super regardless of your employment status.",
  },
  {
    question: "How much super should I have at my age?",
    answer:
      "The Association of Superannuation Funds of Australia (ASFA) publishes retirement standard benchmarks. Common Australian super benchmarks by age: age 35: ~$53,000; age 45: ~$120,000; age 55: ~$250,000; age 65: ~$545,000 (for a comfortable retirement as a single person). These are averages — your target depends on your expected lifestyle, home ownership, and other assets. The key is to use this calculator to project your trajectory and identify gaps early.",
  },
  {
    question: "How much will I need to retire comfortably in Australia?",
    answer:
      "ASFA's Retirement Standard (June 2024) estimates that a single person needs approximately $595,000 in super at retirement for a 'comfortable' lifestyle (defined as annual expenditure of ~$51,278/year). A couple needs ~$690,000 (for ~$72,148/year combined). These figures assume you own your home outright and are eligible for a part Age Pension. A modest retirement requires less — around $100,000 for a single person relying more on the Age Pension.",
  },
  {
    question: "What are voluntary super contributions and are they tax-effective?",
    answer:
      "Voluntary contributions fall into two categories: concessional (before-tax) and non-concessional (after-tax). Concessional contributions — made from pre-tax income via salary sacrifice or personal deductible contributions — are taxed at 15% inside super, which is lower than most individuals' marginal tax rates (19–45%). The annual concessional contribution cap is $30,000 (FY2025). Non-concessional contributions (after-tax, no deduction) have a cap of $120,000 per year. Voluntary contributions can significantly boost your retirement balance through the power of compound growth inside a tax-effective structure.",
  },
  {
    question: "What is a Transition to Retirement (TTR) strategy?",
    answer:
      "A Transition to Retirement (TTR) strategy allows Australians who have reached their preservation age (60) but haven't fully retired to draw a pension from their super while still working. You can reduce your working hours and supplement your income with a TTR pension, or continue working full-time and use salary sacrifice to boost super contributions while drawing a TTR pension — potentially improving your tax position. TTR pensions are taxed differently to lump sums and have minimum/maximum drawdown requirements.",
  },
  {
    question: "How does super tax work in Australia?",
    answer:
      "Superannuation is tax-advantaged but not tax-free. Concessional contributions (employer SG + salary sacrifice + personal deductible) are taxed at 15% inside the fund. Investment earnings in the accumulation phase are taxed at up to 15%. Capital gains held for more than 12 months receive a one-third discount (effective CGT rate: 10%). When you retire and start drawing a pension after age 60, pension payments are generally tax-free. This tax treatment makes super one of Australia's most tax-effective investment vehicles. Note: this calculator does not model the 15% contributions tax or 15% earnings tax — projections are pre-tax.",
  },
  {
    question: "Should I choose a balanced or high-growth super fund?",
    answer:
      "Super funds offer multiple investment options ranging from conservative (mostly bonds/cash) to high-growth (mostly shares). A balanced option typically targets ~70% growth assets/30% defensive assets, with a long-term average return of around 7% p.a. A high-growth option (~90% growth) has historically returned ~9% p.a. but with higher short-term volatility. The standard advice is to hold higher-growth options when young (30+ years to retirement) and shift toward balanced/conservative as retirement approaches. Performance fee structures vary significantly between funds — compare total fees when choosing.",
  },
];

const howToSteps = [
  {
    name: "Enter your current age",
    text: "Type your current age. The calculator uses this to determine how many years of growth your super will have before retirement.",
  },
  {
    name: "Set your retirement age",
    text: "Enter the age at which you plan to retire. The standard Age Pension age in Australia is 67. You can access super from age 60 if retired.",
  },
  {
    name: "Enter your current super balance",
    text: "Find your current super balance on your latest member statement, via your fund's app, or through myGov. Enter $0 if you are just starting.",
  },
  {
    name: "Enter your annual salary",
    text: "Enter your annual income before tax. This determines how much your employer contributes via the Superannuation Guarantee.",
  },
  {
    name: "Set the SG rate",
    text: "The default is 11.5% (FY2025 rate). If your employer pays above the minimum, enter that rate.",
  },
  {
    name: "Add voluntary contributions",
    text: "Optional: enter how much extra you contribute each month via salary sacrifice or personal contributions. This is the most powerful lever you control.",
  },
  {
    name: "Set the investment return rate",
    text: "Enter your fund's expected annual return. 7% is a reasonable long-term assumption for a balanced fund. Use your fund's published target return for a more tailored projection.",
  },
];

export default function SuperannuationCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Superannuation Calculator"
        description="Free Australian superannuation calculator. Project your super balance at retirement including employer SG contributions, voluntary top-ups, and investment growth."
        url="https://calcfuel.com/calculators/superannuation-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          {
            name: "Superannuation Calculator",
            url: "https://calcfuel.com/calculators/superannuation-calculator",
          },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">
          Financial Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>Superannuation Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian Superannuation Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Project your super balance at retirement. Enter your age, salary, current balance, and
        voluntary contributions to see exactly how your superannuation grows year by year.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <SuperCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Australian Superannuation Works</h2>
        <p>
          Superannuation is Australia&apos;s compulsory retirement savings system. Introduced in
          1992, it requires employers to contribute a percentage of each employee&apos;s ordinary
          time earnings into a nominated superannuation fund. These contributions — known as the
          Superannuation Guarantee (SG) — accumulate over a working life, invested in a mix of
          shares, property, bonds, and cash, and are generally accessible from age 60 upon
          retirement.
        </p>
        <p>
          Australia&apos;s superannuation system manages approximately $3.9 trillion in assets
          (2024), making it one of the largest pension systems in the world relative to GDP. The
          compulsory nature of super, combined with its tax-advantaged structure, makes it the
          primary retirement savings vehicle for most Australians.
        </p>

        <h2>The Superannuation Guarantee Rate</h2>
        <p>
          The SG rate has been gradually increasing since it was first introduced at 3% in 1992.
          The current and future SG schedule:
        </p>
        <ul>
          <li>FY2024: 11%</li>
          <li>FY2025 (current): 11.5%</li>
          <li>FY2026 onwards: 12% (permanent rate)</li>
        </ul>
        <p>
          Some employers pay above the minimum SG as part of a salary package or enterprise
          agreement. SG is calculated on your ordinary time earnings (OTE), which includes regular
          hours, commissions, and most allowances — but generally excludes overtime.
        </p>

        <h2>Voluntary Super Contributions: The Most Powerful Lever</h2>
        <p>
          While your employer&apos;s SG contributions are automatic, voluntary contributions are
          entirely within your control and are one of the most powerful ways to grow your
          retirement savings.
        </p>
        <p>
          <strong>Salary sacrifice (concessional)</strong> contributions are made from pre-tax
          income. They are taxed at 15% inside your super fund — significantly lower than the
          marginal tax rates of 32.5%, 37%, or 45% that most full-time workers pay. A person on a
          $80,000 salary in the 32.5% bracket who salary sacrifices $10,000 per year saves
          approximately $1,750 in tax annually, while also boosting their super balance.
        </p>
        <p>
          <strong>Personal after-tax contributions (non-concessional)</strong> are made from money
          you have already paid income tax on. While there is no additional tax benefit on the
          contribution itself, investment earnings inside super are taxed at only 15% — lower than
          most investors&apos; marginal rates on share dividends and capital gains.
        </p>
        <p>
          The annual concessional contribution cap for FY2025 is <strong>$30,000</strong>{" "}
          (includes employer SG + salary sacrifice). The non-concessional cap is{" "}
          <strong>$120,000</strong> per year.
        </p>

        <h2>How Super Is Taxed</h2>
        <p>
          Superannuation is tax-advantaged but not tax-free — understanding the tax rules helps you
          plan contributions more effectively:
        </p>
        <ul>
          <li>
            <strong>Contributions tax:</strong> Concessional contributions (employer SG + salary
            sacrifice + personal deductible) are taxed at 15% inside the fund. High earners with
            income above $250,000 pay an additional 15% (the Division 293 tax), making their
            effective contributions tax rate 30%.
          </li>
          <li>
            <strong>Earnings tax:</strong> Investment returns in the accumulation phase are taxed
            at up to 15%. Capital gains on assets held more than 12 months are taxed at 10%
            (one-third discount).
          </li>
          <li>
            <strong>Pension phase:</strong> Once you retire and convert your super to a retirement
            income stream (pension), investment earnings in the pension phase are tax-free (up to
            the Transfer Balance Cap, currently $1.9 million). Pension payments to members aged 60
            and over are also tax-free.
          </li>
        </ul>

        <h2>How Much Super Do You Need to Retire?</h2>
        <p>
          The Association of Superannuation Funds of Australia (ASFA) Retirement Standard provides
          widely-referenced benchmarks for how much super Australians need:
        </p>
        <ul>
          <li>
            <strong>Comfortable single:</strong> ~$595,000 to fund ~$51,278 per year in spending
          </li>
          <li>
            <strong>Comfortable couple:</strong> ~$690,000 to fund ~$72,148 per year combined
          </li>
          <li>
            <strong>Modest single:</strong> ~$100,000 (relies more on the Age Pension)
          </li>
        </ul>
        <p>
          These benchmarks assume home ownership and partial Age Pension eligibility. If you do not
          own your home outright at retirement, you will need substantially more in super to cover
          rent. Many financial planners use a &quot;25 times rule&quot; — save 25 times your annual
          expenses — which aligns with a 4% annual drawdown rate.
        </p>

        <h2>Age Pension and the Super Means Test</h2>
        <p>
          The Australian Age Pension is available from age 67 for those who meet the income and
          assets tests. Super balances count toward the assets test once you reach Age Pension age
          (67). A single homeowner can have up to approximately $314,000 in assets (including super)
          and still receive the full pension; a couple can have up to ~$470,000.
        </p>
        <p>
          Many Australians use a combined strategy: draw down super in early retirement (60–67),
          then supplement remaining super with a part Age Pension from age 67. A financial adviser
          can model the optimal drawdown strategy to maximise your combined super + pension income
          over your retirement.
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
        This calculator is for general information only and does not constitute financial advice.
        Projections assume constant salary, contribution rates, and investment returns over the
        full period. Does not model the 15% superannuation contributions tax, 15% earnings tax,
        insurance premiums, fund management fees, salary increases, inflation, or government
        co-contribution eligibility. Actual superannuation balances will differ. Always seek
        advice from a licensed financial adviser or superannuation specialist before making
        retirement planning decisions.
      </p>
    </div>
  );
}
