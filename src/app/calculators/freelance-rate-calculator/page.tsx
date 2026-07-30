import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import FreelanceRateCalc from "./FreelanceRateCalc";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator Australia — Hourly & Daily Pricing | CalcFuel",
  description:
    "Free freelance rate calculator. Work out hourly and daily rates from income goals, expenses, tax buffer, and billable hours. Optional GST-inclusive quotes for AU.",
  alternates: { canonical: "/calculators/freelance-rate-calculator" },
};

const relatedTools = [
  { title: "Australian GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price instantly." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate income tax and take-home pay for 2025–26." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit and margin percentage." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all costs." },
  { title: "Markup vs Margin Calculator", slug: "markup-vs-margin-calculator", description: "Price from cost using markup or target margin." },
  { title: "PayPal Fee Calculator", slug: "paypal-fee-calculator", description: "Calculate PayPal processing fees on client invoices." },
];

const faqs = [
  {
    question: "How do I calculate my freelance hourly rate?",
    answer:
      "Start with your target annual take-home pay, add annual business expenses, then gross up for tax and super using a buffer percentage: Required revenue = Expenses + (Take-home ÷ (1 − buffer%)). Divide by annual billable hours (hours per week × weeks worked). Example: $80,000 take-home, $5,000 expenses, 30% buffer, 1,440 billable hours → Required revenue ≈ $119,286 → Hourly ≈ $82.84.",
  },
  {
    question: "What tax buffer should I use for Australian freelancing?",
    answer:
      "Many Australian sole traders use 25–35% as a planning buffer to cover income tax, Medicare levy, and superannuation contributions — but your effective rate depends on total income, deductions, and business structure. This calculator defaults to 30%. For precision, run your expected profit through our Australian Income Tax Calculator and add super on top.",
  },
  {
    question: "How many billable hours should I plan per week?",
    answer:
      "Full-time employees work ~38 hours but freelancers rarely bill every hour. A common planning range is 20–30 billable hours per week after accounting for admin, sales, professional development, and holidays. If you bill 30 hours × 48 weeks = 1,440 billable hours per year. Under-estimating non-billable time is a leading cause of undercharging.",
  },
  {
    question: "Should I quote GST-inclusive or ex-GST rates?",
    answer:
      "If you are GST-registered (turnover $75,000+ or voluntary registration), your tax invoice must show GST. Many B2B clients think in ex-GST terms; consumers often see inc-GST prices. Toggle GST in this calculator to see both: ex-GST is your required rate; inc-GST adds 10% for the amount on the invoice. You remit the GST component to the ATO — it is not income.",
  },
  {
    question: "What business expenses should I include?",
    answer:
      "Include software subscriptions, equipment depreciation, insurance, accounting fees, coworking, phone/internet (business portion), professional memberships, and contractor costs. Do not double-count expenses you will also deduct at tax time — here expenses represent cash you must earn before profit. Keep personal drawings separate from business expense planning.",
  },
  {
    question: "How is a daily rate calculated from hourly?",
    answer:
      "Daily rate = Hourly rate × billable hours per day. Default is 7.5 hours — adjust if you offer half-day or full-day packages with different scopes. Some freelancers discount day rates slightly versus 7.5 × hourly to win project work; model both before discounting.",
  },
  {
    question: "Is this calculator financial advice?",
    answer:
      "No. This is a planning estimator using simplified assumptions. Actual tax depends on your total income, deductions, offsets, and structure (sole trader vs company vs trust). Consult a registered tax agent or accountant for advice tailored to your situation.",
  },
];

const howToSteps = [
  { name: "Set your income goal", text: "Choose target take-home (after tax) or gross revenue goal and enter the annual amount." },
  { name: "Add expenses and tax buffer", text: "Enter annual business expenses and your tax/super buffer percentage (default 30%)." },
  { name: "Enter billable capacity", text: "Set billable hours per week, weeks worked per year, and hours per day for daily rates." },
  { name: "Toggle GST if registered", text: "Enable GST to see 10% inclusive quote rates for invoices." },
  { name: "Read your rates", text: "Review required hourly and daily rates — ex-GST and inc-GST if applicable." },
];

export default function FreelanceRateCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Freelance Rate Calculator"
        description="Free freelance rate calculator. Derive hourly and daily rates from income goals, expenses, tax buffer, and billable hours."
        url="https://calcfuel.com/calculators/freelance-rate-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Freelance Rate Calculator", url: "https://calcfuel.com/calculators/freelance-rate-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Freelance Rate Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Freelance Rate Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate the hourly and daily rate you need to hit your income goal after tax, expenses, and non-billable time. Built for Australian freelancers with optional GST-inclusive quote rates.
      </p>
      <CalcReviewedBy lastUpdated="July 2026" />
      <FreelanceRateCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Why Most Freelancers Undercharge</h2>
        <p>
          New freelancers often set rates by looking at what others charge or by dividing their old salary by 2,000 hours. That approach ignores three costly realities: not every hour is billable, tax and super come out of your revenue (not your client&apos;s problem), and running a business has cash expenses that a PAYG employee never sees. The result is a rate that looks competitive but leaves you earning less than minimum wage after tax.
        </p>
        <p>
          This calculator reverses the problem. Start with what you want to take home, add what the business costs to run, gross up for tax and super with a buffer percentage, and divide by the hours you can realistically bill. The output is the hourly and daily rate you need to quote — with an optional GST-inclusive figure if you are registered for GST in Australia.
        </p>

        <h2>The Freelance Rate Formula</h2>
        <p>When you enter a <strong>target take-home</strong> (after tax):</p>
        <ul>
          <li><strong>Required gross revenue = Annual expenses + (Target take-home ÷ (1 − Tax buffer %))</strong></li>
          <li><strong>Annual billable hours = Hours per week × Weeks per year</strong></li>
          <li><strong>Hourly rate = Required gross revenue ÷ Annual billable hours</strong></li>
          <li><strong>Daily rate = Hourly rate × Billable hours per day</strong></li>
        </ul>
        <p>
          The tax buffer is a planning shortcut — not a precise tax calculation. A 30% buffer means you assume 30% of your gross profit (after expenses) goes to tax, Medicare, and super combined. If you want $80,000 in your pocket and use a 30% buffer, you need roughly $114,286 in gross profit before expenses: $80,000 ÷ 0.70. Add $5,000 expenses and required revenue is $119,286.
        </p>
        <p>
          If you switch to <strong>gross revenue goal</strong> mode, the calculator treats your entered figure as the revenue target and adds expenses on top — useful when you are planning from a top-line business budget rather than a personal take-home target.
        </p>

        <h2>Worked Example: Australian Designer</h2>
        <p>
          Maya is a freelance UX designer in Melbourne. She wants <strong>$85,000</strong> take-home, spends <strong>$6,000</strong> per year on tools, insurance, and accounting, plans <strong>28 billable hours per week</strong> over <strong>48 weeks</strong> (allowing four weeks off), and uses a <strong>30%</strong> tax buffer. She is GST-registered.
        </p>
        <ul>
          <li>Gross profit needed: $85,000 ÷ 0.70 = <strong>$121,429</strong></li>
          <li>Required revenue: $121,429 + $6,000 = <strong>$127,429</strong></li>
          <li>Billable hours: 28 × 48 = <strong>1,344 hours</strong></li>
          <li>Hourly rate (ex-GST): $127,429 ÷ 1,344 = <strong>$94.81</strong></li>
          <li>GST-inclusive quote: $94.81 × 1.1 = <strong>$104.29/hr</strong></li>
          <li>Daily rate (7.5 hrs, ex-GST): <strong>$711.08/day</strong></li>
        </ul>
        <p>
          Maya might round to $95/hr ex-GST or $105/hr inc-GST on proposals. If she billed 35 hours per week instead of 28 without raising her rate, she would need the same total revenue in fewer weeks — but burning out on non-billable work is why the 28-hour assumption matters.
        </p>

        <h2>Billable Hours: The Hidden Variable</h2>
        <p>
          A standard full-time job is 38 hours per week, 48–52 weeks per year. Freelancers spend time on proposals, invoicing, client calls, learning new tools, and business development — none of which appear on a timesheet you can charge. Industry rule of thumb: assume 50–70% utilisation of your working hours.
        </p>
        <p>
          If you work 40 hours per week but only bill 25, your effective hourly capacity is 25 — not 40. Enter honest billable hours in the calculator. If you are just starting and spend half your week on sales, use 15–20 billable hours until your pipeline matures.
        </p>

        <h2>GST and Invoicing in Australia</h2>
        <p>
          GST registration is required when turnover reaches $75,000 in a 12-month period (or you can register voluntarily). Registered businesses charge 10% GST on taxable supplies, show it on tax invoices, and report it on BAS. The GST you collect is not yours — you remit it to the ATO (minus input credits on purchases).
        </p>
        <p>
          When quoting, be explicit: &quot;$100/hr + GST&quot; (client pays $110) vs &quot;$110/hr inc GST&quot; (you still remit $10). This calculator&apos;s GST toggle multiplies your required ex-GST rate by 1.1 for the inc-GST quote figure. For BAS math, use our{" "}
          <Link href="/calculators/gst-calculator">GST Calculator</Link>.
        </p>

        <h2>Beyond the Hourly Rate</h2>
        <p>
          Hourly billing is simple but caps your income at hours available. Many freelancers move to project-based or value-based pricing once they understand their floor rate from this calculator. The floor rate answers: &quot;What is the minimum I can charge without losing money?&quot; Value pricing answers: &quot;What is this outcome worth to the client?&quot; — often higher than hours × rate.
        </p>
        <p>
          Also model payment processing: if clients pay via PayPal or card, factor fees using our{" "}
          <Link href="/calculators/paypal-fee-calculator">PayPal Fee Calculator</Link>. For overall business viability, cross-check with the{" "}
          <Link href="/calculators/break-even-calculator">Break-Even Calculator</Link> and{" "}
          <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link>. For precise personal tax, use the{" "}
          <Link href="/calculators/australian-income-tax-calculator">Australian Income Tax Calculator</Link>.
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

      <YMYLDisclaimer type="financial" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
