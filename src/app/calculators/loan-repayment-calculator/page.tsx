import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import LoanCalc from "./LoanCalc";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator — Monthly Payments & Total Interest | calcfuel.com",
  description: "Free loan repayment calculator. Enter your loan amount, interest rate, and term to instantly calculate monthly repayments and total interest payable. Works for personal, car, and business loans.",
  alternates: { canonical: "/calculators/loan-repayment-calculator" },
};

const relatedTools = [
  { title: "Mortgage Repayment Calculator", slug: "mortgage-repayment-calculator", description: "Calculate monthly home loan repayments and amortisation." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "See how your savings or investments grow with compound interest." },
  { title: "GST Calculator Australia", slug: "gst-calculator", description: "Add or remove Australian GST (10%) from any price." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your take-home pay for 2025–26." },
];

const faqs = [
  {
    question: "How is a loan repayment calculated?",
    answer: "Monthly loan repayments use the standard amortisation formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments. Each payment covers interest first, then the remainder reduces the principal.",
  },
  {
    question: "What is the difference between a personal loan and a mortgage?",
    answer: "A personal loan is typically unsecured (no collateral), shorter term (1–7 years), and has a higher interest rate than a mortgage. A mortgage is secured against property, usually runs 25–30 years, and carries a lower interest rate. Use this calculator for personal, car, or business loans; use the Mortgage Repayment Calculator for home loans.",
  },
  {
    question: "How much does a higher interest rate cost over a loan term?",
    answer: "The difference is significant. On a $20,000 personal loan over 5 years: at 7% interest you pay roughly $3,840 in interest; at 12% you pay approximately $6,670. A 5 percentage point difference costs an extra $2,830 on a $20,000 loan.",
  },
  {
    question: "What is the average personal loan interest rate in Australia?",
    answer: "As of 2025, personal loan rates in Australia typically range from approximately 6% to 20% per annum, depending on the lender, your credit score, whether the loan is secured or unsecured, and the loan amount. Comparison sites like Canstar and Finder publish current rate tables.",
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Most Australian personal loans allow early repayment, but some fixed-rate loans charge an early exit fee. Check your loan contract. Making extra repayments reduces your principal faster and significantly reduces total interest paid over the life of the loan.",
  },
  {
    question: "What is an amortisation schedule?",
    answer: "An amortisation schedule shows how each payment splits between interest and principal over the loan term. Early payments are mostly interest; later payments are mostly principal. This is why paying extra at the start of a loan saves more interest than paying extra near the end.",
  },
];

const howToSteps = [
  { name: "Enter the loan amount", text: "Type in the total amount you are borrowing." },
  { name: "Enter the annual interest rate", text: "Use the interest rate as shown in your loan offer (per annum, not per month)." },
  { name: "Enter the loan term", text: "Enter the length of the loan in years and/or months." },
  { name: "Read your results", text: "See your monthly repayment, total repayment, total interest, and the principal vs interest split." },
];

export default function LoanRepaymentCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Loan Repayment Calculator"
        description="Free loan repayment calculator. Calculate monthly repayments and total interest for personal, car, and business loans."
        url="https://calcfuel.com/calculators/loan-repayment-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Loan Repayment Calculator", url: "https://calcfuel.com/calculators/loan-repayment-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Loan Repayment Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Loan Repayment Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your monthly loan repayments and total interest payable. Works for personal loans, car loans, business loans, and any other fixed-rate amortising loan. Enter your loan amount, interest rate, and term to get instant results.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <LoanCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Need to grow revenue to service your loan faster?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          If you have a business loan, the fastest way to improve your repayment position is to grow revenue. Our <strong>50 AI Marketing Prompts</strong> are designed for small business owners who need marketing results without a large budget.
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get 50 AI Marketing Prompts &rarr;
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How Loan Repayments Are Calculated</h2>
        <p>Most standard loans use <strong>amortisation</strong> — a method where each payment covers the interest accrued since the last payment, with the remainder reducing the principal balance. This means early payments are mostly interest, while later payments are mostly principal.</p>
        <p>The formula for a monthly repayment is:</p>
        <p><strong>M = P &times; [r(1+r)&sup2;] / [(1+r)&sup2; &minus; 1]</strong></p>
        <p>Where:</p>
        <ul>
          <li><strong>M</strong> = monthly repayment</li>
          <li><strong>P</strong> = principal (loan amount)</li>
          <li><strong>r</strong> = monthly interest rate (annual rate &divide; 12 &divide; 100)</li>
          <li><strong>n</strong> = total number of monthly payments (years &times; 12)</li>
        </ul>
        <p><strong>Example:</strong> A $25,000 personal loan at 9% per annum over 4 years. r = 9 &divide; 12 &divide; 100 = 0.0075. n = 48. Monthly repayment = $25,000 &times; [0.0075 &times; 1.0075&sup4;&sup8;] / [1.0075&sup4;&sup8; &minus; 1] = approximately <strong>$622/month</strong>.</p>

        <h2>Personal Loan vs Car Loan vs Business Loan</h2>
        <table>
          <thead>
            <tr><th>Loan Type</th><th>Typical Rate (2025)</th><th>Typical Term</th><th>Secured?</th></tr>
          </thead>
          <tbody>
            <tr><td>Personal loan (unsecured)</td><td>8&ndash;20% p.a.</td><td>1&ndash;7 years</td><td>No</td></tr>
            <tr><td>Personal loan (secured)</td><td>5&ndash;12% p.a.</td><td>1&ndash;7 years</td><td>Yes (asset)</td></tr>
            <tr><td>Car loan</td><td>6&ndash;14% p.a.</td><td>1&ndash;7 years</td><td>Yes (vehicle)</td></tr>
            <tr><td>Business loan (unsecured)</td><td>8&ndash;25% p.a.</td><td>1&ndash;5 years</td><td>No</td></tr>
            <tr><td>Business loan (secured)</td><td>5&ndash;15% p.a.</td><td>1&ndash;15 years</td><td>Yes (property)</td></tr>
          </tbody>
        </table>
        <p>Rates shown are indicative. Your actual rate depends on your credit score, income, loan purpose, and lender. Always compare at least three lenders before committing.</p>

        <h2>How to Reduce Total Interest Paid</h2>
        <p>There are four main strategies for reducing the total interest you pay over the life of a loan:</p>
        <ol>
          <li><strong>Negotiate a lower rate:</strong> A difference of even 1&ndash;2% can save thousands over a multi-year loan. Use your credit score as leverage, or use a broker to access wholesale rates.</li>
          <li><strong>Choose a shorter term:</strong> A 3-year loan has higher monthly payments than a 5-year loan but costs substantially less in total interest. If you can afford the higher payment, shorter is better.</li>
          <li><strong>Make extra repayments:</strong> Any extra amount paid reduces the principal immediately and reduces the interest charged in all future periods. Even an extra $50 per month can save hundreds to thousands over a loan term.</li>
          <li><strong>Avoid redrawing:</strong> If your loan has a redraw facility and you have made extra repayments, avoid redrawing unless essential — withdrawing reduces the benefit of those extra payments.</li>
        </ol>

        <h2>Understanding Your Comparison Rate</h2>
        <p>In Australia, lenders are required to advertise a <strong>comparison rate</strong> alongside their headline interest rate. The comparison rate includes most fees and charges in a standardised annual percentage, making it easier to compare the true cost of different loans.</p>
        <p>The comparison rate is calculated on a standardised $30,000 unsecured loan over 5 years. A low headline rate with high fees can have a higher comparison rate than a slightly higher rate loan with no fees — always compare the comparison rate.</p>
        <p>However, note that the comparison rate is a standardised calculation and may not exactly reflect your situation if your loan amount or term differs significantly from $30,000 over 5 years.</p>
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
