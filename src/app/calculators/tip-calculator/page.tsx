import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import TipCalc from "./TipCalc";
import CalcReviewedBy from "@/components/CalcReviewedBy";

export const metadata: Metadata = {
  title: "Tip Calculator — Split Bills & Calculate Tips Instantly | CalcFuel",
  description: "Free tip calculator. Enter your bill, choose a tip percentage, and split between any number of people. Works for restaurants, taxis, hairdressers, and more.",
  alternates: { canonical: "/calculators/tip-calculator" },
};

const relatedTools = [
  { title: "Percentage Calculator", slug: "percentage-calculator", description: "Calculate any percentage instantly." },
  { title: "GST Calculator Australia", slug: "gst-calculator", description: "Add or remove Australian GST (10%) from any price." },
  { title: "Loan Repayment Calculator", slug: "loan-repayment-calculator", description: "Calculate monthly repayments on any loan." },
  { title: "BMI Calculator", slug: "bmi-calculator", description: "Calculate your Body Mass Index instantly." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Calculate average transaction value for your business." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit margin from revenue and COGS." },
];

const faqs = [
  {
    question: "Is tipping customary in Australia?",
    answer: "Tipping is not mandatory in Australia and service staff receive a minimum wage, unlike the US where tipped workers often rely on gratuity. However, tipping is increasingly common and appreciated at restaurants, cafes, and for personal services like hairdressing. A 10–15% tip for good restaurant service is generally considered generous in Australia.",
  },
  {
    question: "How much should I tip at a restaurant in Australia?",
    answer: "There is no fixed rule. Common amounts: 10% for good service, 15% for excellent service, rounding up the bill for casual meals. It is perfectly acceptable to not tip in Australia, but leaving something for good service is always appreciated. For large groups, some restaurants add a service charge automatically — check your bill.",
  },
  {
    question: "How do I calculate a 10% tip?",
    answer: "To calculate 10% of any amount, move the decimal point one place to the left. For example, 10% of $85.00 = $8.50. For 15%, calculate 10% then add half: $8.50 + $4.25 = $12.75. For 20%, double the 10% amount: $8.50 × 2 = $17.00.",
  },
  {
    question: "How do I split a bill evenly?",
    answer: "Add the tip to the bill total, then divide by the number of people. Example: $120 bill with 15% tip = $120 + $18 = $138 total. Split between 4 people = $138 ÷ 4 = $34.50 each. Our calculator does this automatically when you enter the number of people.",
  },
  {
    question: "Should the tip be calculated on the pre-tax or post-tax amount?",
    answer: "In Australia, prices already include GST (10%), so there is no separate tax line on most bills. Tip on the final amount shown on the bill. In countries like the US where tax is added at checkout, most diners tip on the pre-tax subtotal, though some tip on the total.",
  },
  {
    question: "When is it appropriate to tip in Australia?",
    answer: "Common situations where tipping is appreciated in Australia: sit-down restaurants and cafes, bars (rounding up or leaving change), hairdressers and barbers, food delivery drivers, taxi/rideshare drivers (optional), hotel concierge for exceptional service. Tipping is less common at fast food outlets, supermarkets, and standard retail shops.",
  },
];

const howToSteps = [
  { name: "Enter the bill amount", text: "Type in the total amount on your bill." },
  { name: "Select a tip percentage", text: "Choose from 10%, 12%, 15%, 18%, 20%, or enter a custom percentage." },
  { name: "Enter the number of people", text: "If splitting the bill, enter how many people are sharing." },
  { name: "Read your results", text: "See the tip amount, total bill, and per-person amounts instantly." },
];

export default function TipCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Tip Calculator"
        description="Free tip calculator. Calculate tips and split bills for any group size. Supports custom tip percentages."
        url="https://calcfuel.com/calculators/tip-calculator"
        datePublished="2025-10-01"
        dateModified="2026-05-15"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Tip Calculator", url: "https://calcfuel.com/calculators/tip-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link><span className="mx-2">/</span>
        <span>Tip Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Tip Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate a tip and split the bill in seconds. Enter your bill total, choose a tip percentage (or enter a custom amount), and split between any number of people. Works for restaurants, taxis, hairdressers, and any other service.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <TipCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Own a restaurant, cafe, or hospitality business?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          Our <strong>50 AI Marketing Prompts</strong> include ready-to-use prompts for local business marketing — social media posts, Google reviews, email newsletters, and seasonal promotions.
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get 50 AI Marketing Prompts &rarr;
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Tipping in Australia — What You Need to Know</h2>
        <p>Australia operates differently from the United States when it comes to tipping. Australian workers in hospitality and service roles are covered by minimum wage laws and award rates set by the Fair Work Commission. This means tipping is genuinely optional — not a social expectation underpinning someone&apos;s base income.</p>
        <p>That said, tipping culture has grown significantly in Australia over the past decade, driven partly by the adoption of point-of-sale systems that prompt for a tip at checkout. Many Australians now routinely tip at sit-down restaurants, cafes, and for personal services they value.</p>

        <h2>Standard Tipping Rates in Australia</h2>
        <table>
          <thead>
            <tr><th>Service</th><th>Common Tip Amount</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Restaurant (sit-down)</td><td>10&ndash;15%</td><td>For good to excellent service</td></tr>
            <tr><td>Cafe</td><td>Round up or leave change</td><td>Tipping jars are common</td></tr>
            <tr><td>Bar</td><td>Round up or $1&ndash;$2</td><td>Optional</td></tr>
            <tr><td>Taxi / Rideshare</td><td>Round up or 10%</td><td>Optional; increasingly prompted in-app</td></tr>
            <tr><td>Hairdresser / Barber</td><td>$5&ndash;$10 or 10%</td><td>Appreciated, especially for regular visits</td></tr>
            <tr><td>Food delivery</td><td>$2&ndash;$5</td><td>Optional but appreciated</td></tr>
            <tr><td>Hotel concierge</td><td>$5&ndash;$20</td><td>For exceptional or personalised service</td></tr>
          </tbody>
        </table>

        <h2>How to Calculate a Tip Without a Calculator</h2>
        <p>Mental maths shortcuts make tip calculation easy:</p>
        <ul>
          <li><strong>10%:</strong> Move the decimal one place left. $75.00 &rarr; $7.50</li>
          <li><strong>15%:</strong> Calculate 10%, then add half of that. $7.50 + $3.75 = $11.25</li>
          <li><strong>20%:</strong> Double the 10% amount. $7.50 &times; 2 = $15.00</li>
          <li><strong>Round up:</strong> For bills under $30, simply round up to the nearest $5 or $10.</li>
        </ul>

        <h2>Bill Splitting — The Fair Way</h2>
        <p>When splitting a bill evenly, always include the tip in the total before dividing. A common (but impolite) mistake is for one person to pay less by forgetting the tip, leaving others to cover it.</p>
        <p><strong>Formula:</strong> Per person = (Bill + Tip) &divide; Number of people</p>
        <p><strong>Example:</strong> $240 dinner for 6 people with a 15% tip. Tip = $240 &times; 0.15 = $36. Total = $276. Per person = $276 &divide; 6 = <strong>$46 each</strong>.</p>
        <p>If people ordered very different amounts, consider splitting based on what each person ordered rather than dividing equally. Use our calculator as a starting point and adjust as needed.</p>

        <h2>Tipping on Delivery Apps</h2>
        <p>Delivery platforms like Uber Eats and DoorDash now prompt for tips at checkout. Unlike restaurants where tips typically go to the serving staff, delivery tips go directly to the driver. Many drivers rely on tips to cover fuel and vehicle costs, making tipping on delivery orders more meaningful than in a sit-down restaurant context.</p>
        <p>A $2&ndash;$5 tip on a standard delivery order (or 10% for larger orders) is a reasonable and appreciated amount.</p>
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

      <aside className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200"><strong>Disclaimer:</strong> This calculator provides estimates only and should not be treated as financial advice. Consult a qualified accountant or financial adviser for advice specific to your situation.</aside>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
