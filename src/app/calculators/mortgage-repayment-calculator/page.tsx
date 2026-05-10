import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import MortgageCalc from "./MortgageCalc";

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator Australia — Monthly, Fortnightly & Weekly",
  description:
    "Free Australian mortgage repayment calculator. Calculate your monthly, fortnightly, or weekly home loan repayments. See total interest, compare frequencies, and find out how much you could save.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/mortgage-repayment-calculator",
  },
  openGraph: {
    title: "Mortgage Repayment Calculator Australia",
    description:
      "Calculate your Australian home loan repayments — monthly, fortnightly, or weekly. See total interest paid and compare repayment strategies.",
    url: "https://calcfuel.com/calculators/mortgage-repayment-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove 10% GST from any Australian price instantly.",
  },
  {
    title: "Break-Even Calculator",
    slug: "break-even-calculator",
    description: "Find the sales volume needed to cover your costs.",
  },
  {
    title: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    description: "Calculate gross, net, and operating profit margins.",
  },
  {
    title: "Marketing ROI Calculator",
    slug: "marketing-roi-calculator",
    description: "Measure the return on your marketing investment.",
  },
];

const faqs = [
  {
    question: "How is my mortgage repayment calculated?",
    answer:
      "Your repayment is calculated using the standard amortisation formula: Payment = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan principal, r is the periodic interest rate, and n is the total number of repayments. This calculator uses your annual rate divided by the number of payment periods per year (12 for monthly, 26 for fortnightly, 52 for weekly).",
  },
  {
    question: "Why does paying fortnightly save money?",
    answer:
      "Paying fortnightly instead of monthly results in 26 payments per year — the equivalent of 13 monthly payments instead of 12. That extra payment goes directly to reducing your principal, which reduces the interest charged over the life of the loan. On a $600,000 loan at 6.5% over 30 years, switching to fortnightly repayments can save over $50,000 in interest.",
  },
  {
    question: "What is the current RBA cash rate?",
    answer:
      "The Reserve Bank of Australia (RBA) sets the official cash rate at its monthly board meetings. Variable mortgage rates are loosely tied to the cash rate — when the RBA raises or cuts rates, lenders typically adjust variable home loan rates within days. This calculator lets you enter any interest rate, so you can model your current rate or run scenarios for rate rises or cuts.",
  },
  {
    question: "Should I choose a fixed or variable rate?",
    answer:
      "Fixed-rate loans lock in your interest rate (and repayment) for a set period — typically 1–5 years — giving certainty but limiting flexibility. Variable-rate loans fluctuate with market rates and usually allow unlimited extra repayments, offset accounts, and redraw facilities. Many Australian borrowers use a split loan — part fixed, part variable — to balance certainty and flexibility.",
  },
  {
    question: "What is an offset account and how does it affect my repayments?",
    answer:
      "An offset account is a transaction account linked to your mortgage. The balance in your offset account reduces the principal on which interest is calculated. For example, a $600,000 mortgage with $50,000 in an offset account means you only pay interest on $550,000. This calculator does not model offset accounts — for personalised projections, speak to your lender or a mortgage broker.",
  },
  {
    question: "How much deposit do I need for an Australian home loan?",
    answer:
      "Most Australian lenders require a minimum 5–10% deposit. A 20% deposit avoids Lenders Mortgage Insurance (LMI), which can add tens of thousands of dollars to your loan. First home buyers may access government schemes such as the First Home Guarantee (5% deposit, no LMI) or state-based stamp duty concessions.",
  },
  {
    question: "What is LMI (Lenders Mortgage Insurance)?",
    answer:
      "Lenders Mortgage Insurance (LMI) protects the lender — not you — if you default on a loan with less than 20% equity. LMI is typically a one-off premium added to your loan balance. On a $600,000 property with a 10% deposit, LMI could add $12,000–$20,000 to your loan. Avoiding LMI by saving a 20% deposit can significantly reduce your total mortgage cost.",
  },
  {
    question: "Can I make extra repayments on my mortgage?",
    answer:
      "Most variable-rate and some fixed-rate loans allow extra repayments. Paying extra — even small amounts — reduces your principal faster, cuts the interest you pay over time, and can shorten your loan term significantly. A $200/month extra payment on a $600,000 loan at 6.5% can save over 4 years on a 30-year term.",
  },
];

const howToSteps = [
  {
    name: "Enter your loan amount",
    text: "Type your total home loan amount in Australian dollars. For a new purchase, this is typically the property price minus your deposit.",
  },
  {
    name: "Enter the interest rate",
    text: "Enter your annual interest rate as a percentage. Check your most recent loan statement or contact your lender. For variable loans, use your current rate.",
  },
  {
    name: "Set the loan term",
    text: "Enter how many years remain on your loan. Most Australian home loans are 25–30 years. If you are refinancing, enter the remaining years, not the original term.",
  },
  {
    name: "Choose repayment frequency",
    text: "Select monthly, fortnightly, or weekly. The calculator shows your repayment for each frequency and how much interest you save by paying more frequently.",
  },
  {
    name: "Read your results",
    text: "The calculator instantly shows your repayment amount, total repayments over the loan term, and total interest paid. The comparison table shows how much you save by switching from monthly to fortnightly or weekly repayments.",
  },
];

export default function MortgageRepaymentCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Mortgage Repayment Calculator"
        description="Free Australian mortgage repayment calculator. Calculate monthly, fortnightly, or weekly home loan repayments, total interest paid, and compare repayment frequencies."
        url="https://calcfuel.com/calculators/mortgage-repayment-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          {
            name: "Mortgage Repayment Calculator",
            url: "https://calcfuel.com/calculators/mortgage-repayment-calculator",
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
        <span>Mortgage Repayment Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian Mortgage Repayment Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your home loan repayments — monthly, fortnightly, or weekly. See your total
        interest bill and discover how much you could save by switching repayment frequency.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <MortgageCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How to Calculate Mortgage Repayments in Australia</h2>
        <p>
          Your mortgage repayment is determined by three variables: the loan amount (principal),
          the interest rate, and the loan term. Australian home loans are almost always structured
          as principal-and-interest loans — each repayment covers accrued interest first, with the
          remainder reducing the outstanding balance. Early in the loan, most of each payment is
          interest; as the balance falls, more of each payment goes toward principal.
        </p>
        <p>
          The standard amortisation formula used by Australian lenders is:
        </p>
        <p>
          <strong>Repayment = P × r × (1+r)^n ÷ ((1+r)^n − 1)</strong>
        </p>
        <p>
          Where <strong>P</strong> is the loan principal, <strong>r</strong> is the periodic
          interest rate (annual rate ÷ number of periods per year), and <strong>n</strong> is the
          total number of repayments. This calculator applies this formula for monthly (n = term ×
          12), fortnightly (n = term × 26), and weekly (n = term × 52) frequencies.
        </p>

        <h2>Monthly vs Fortnightly vs Weekly Repayments</h2>
        <p>
          The repayment frequency you choose has a significant impact on the total interest you pay
          over the life of your loan — even though the weekly or fortnightly amount feels smaller.
        </p>
        <p>
          The key is that fortnightly and weekly repayments result in more payments per year.
          Fortnightly repayments produce 26 payments per year — equivalent to 13 monthly payments
          instead of 12. That extra payment each year goes directly to reducing your principal,
          which reduces the interest charged in every subsequent period. Over 30 years, this
          compounding effect can save tens of thousands of dollars.
        </p>
        <p>
          On a typical Australian home loan of $600,000 at 6.50% over 30 years:
        </p>
        <ul>
          <li>Monthly repayment: ~$3,793/month — total interest: ~$765,000</li>
          <li>Fortnightly repayment: ~$1,897/fortnight — total interest: ~$706,000 (save ~$59,000)</li>
          <li>Weekly repayment: ~$948/week — total interest: ~$703,000 (save ~$62,000)</li>
        </ul>

        <h2>How the RBA Cash Rate Affects Your Mortgage</h2>
        <p>
          The Reserve Bank of Australia (RBA) sets the official cash rate at its monthly board
          meetings. The cash rate is the interest rate on overnight loans between banks — it acts
          as a benchmark for the entire lending market. When the RBA raises the cash rate, lenders
          typically increase variable mortgage rates within days; when it cuts, rates follow.
        </p>
        <p>
          Australian variable home loan rates are typically the cash rate plus a lender margin of
          2–3%. Fixed rates are priced differently, based on swap market expectations for future
          rates rather than the current cash rate. Use this calculator to model different rate
          scenarios: try increasing your current rate by 1–2% to stress-test affordability, or
          model what a rate cut would mean for your repayments.
        </p>

        <h2>Offset Accounts and Redraw Facilities</h2>
        <p>
          Two features unique to Australian mortgages can dramatically reduce your interest bill:
          offset accounts and redraw facilities.
        </p>
        <p>
          An <strong>offset account</strong> is a transaction account linked to your mortgage. The
          balance in your offset account reduces the principal on which interest is calculated each
          day. If you have a $600,000 loan and $50,000 in your offset, you only pay interest on
          $550,000. Over a 30-year loan, keeping $50,000 permanently in offset can save over
          $100,000 in interest.
        </p>
        <p>
          A <strong>redraw facility</strong> allows you to access extra repayments you have made.
          Unlike an offset, redraw requires a formal request and may have fees or minimum amounts.
          Both features are usually available on variable loans; fixed loans typically restrict or
          prohibit extra repayments.
        </p>

        <h2>First Home Buyers: Deposits, LMI, and Government Schemes</h2>
        <p>
          Most Australian lenders require a minimum 5–10% deposit. Borrowing more than 80% of the
          property value (Loan-to-Value Ratio above 80%) triggers{" "}
          <strong>Lenders Mortgage Insurance (LMI)</strong> — a one-off premium that protects the
          lender, not you. LMI can cost $10,000–$30,000 on a typical first home purchase and is
          usually added to your loan balance.
        </p>
        <p>
          The federal government&apos;s <strong>First Home Guarantee</strong> allows eligible first
          home buyers to purchase with a 5% deposit and no LMI, with the government guaranteeing
          up to 15% of the loan. State governments also offer stamp duty concessions or exemptions
          for first home buyers — check your state revenue office for current thresholds.
        </p>
        <p>
          APRA (the Australian Prudential Regulation Authority) requires lenders to assess
          borrowers at a serviceability buffer of at least 3% above the loan rate. This means if
          your loan rate is 6.5%, the lender tests whether you can afford repayments at 9.5%.
        </p>

        <h2>Principal and Interest vs Interest Only</h2>
        <p>
          Most owner-occupier loans in Australia are principal-and-interest (P&I) — each repayment
          reduces the loan balance. <strong>Interest-only (IO)</strong> loans, common for
          investment properties, require only interest repayments for a set period (typically 1–5
          years), after which the loan reverts to P&I. IO loans result in lower initial repayments
          but higher repayments once the IO period ends and do not reduce the principal balance
          during the IO phase. This calculator models P&I loans only.
        </p>

        <h2>Strategies to Pay Off Your Mortgage Faster</h2>
        <ul>
          <li>
            <strong>Switch to fortnightly or weekly repayments.</strong> As shown above, this alone
            can save tens of thousands of dollars with no change to your lifestyle.
          </li>
          <li>
            <strong>Make extra repayments.</strong> Even $200 extra per month on a $600,000 loan can
            cut years off your term and save thousands in interest.
          </li>
          <li>
            <strong>Use an offset account.</strong> Park your savings, emergency fund, and everyday
            spending money in an offset to reduce your daily interest charge.
          </li>
          <li>
            <strong>Refinance when rates drop.</strong> If your lender&apos;s variable rate is no longer
            competitive, switching to a lower-rate lender can reduce your repayments and total
            interest immediately.
          </li>
          <li>
            <strong>Round up your repayments.</strong> If your calculated repayment is $3,793/month,
            round up to $4,000. The extra $207/month compounds into significant savings over time.
          </li>
        </ul>
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
        Calculations are estimates based on a fixed interest rate over the full loan term. Actual
        repayments may vary due to interest rate changes, fees, and loan conditions. Always seek
        advice from a licensed mortgage broker or financial adviser before making borrowing
        decisions.
      </p>
    </div>
  );
}
