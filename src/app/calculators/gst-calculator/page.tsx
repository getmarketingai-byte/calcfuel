import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import GSTCalc from "./GSTCalc";

export const metadata: Metadata = {
  title: "GST Calculator Australia - Add or Remove GST Instantly | calcfuel.com",
  description: "Free Australian GST calculator. Add GST to a price or remove GST from a GST-inclusive amount. Instant results for the standard 10% rate. No sign-up required.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate income tax, Medicare levy, LITO, and take-home pay for 2025-26." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit margin from revenue and COGS." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover your fixed costs." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure the return on your marketing investment." },
];

const faqs = [
  {
    question: "What is the GST rate in Australia?",
    answer: "The standard Goods and Services Tax (GST) rate in Australia is 10%. It applies to most goods and services sold in Australia. Some items are GST-free, including most fresh food, many health and medical services, and some education services.",
  },
  {
    question: "How do I add GST to a price?",
    answer: "Multiply the ex-GST price by 1.10. For example, a $100 ex-GST price becomes $110 including GST. The GST amount alone is $100 x 0.10 = $10.",
  },
  {
    question: "How do I remove GST from a price?",
    answer: "Divide the inc-GST price by 1.10. For example, a $110 inc-GST price has an ex-GST component of $100 and a GST amount of $10. Do NOT multiply the inc-GST price by 10% - that gives the wrong answer.",
  },
  {
    question: "What does ex-GST and inc-GST mean?",
    answer: "Ex-GST means the price does not include GST. Inc-GST means the GST is already included in the price. Under Australian Consumer Law, prices advertised to consumers must show the total inc-GST price.",
  },
  {
    question: "Who needs to register for GST in Australia?",
    answer: "You must register when annual GST turnover reaches $75,000 (or $150,000 for not-for-profits). You have 21 days to register after crossing the threshold. Taxi and rideshare operators must register regardless of turnover.",
  },
  {
    question: "What is a Business Activity Statement (BAS)?",
    answer: "A BAS is submitted to the ATO to report and reconcile your GST obligations. You report GST collected on sales (1A) minus GST paid on business purchases (1B). Pay the difference to the ATO, or receive a refund if 1B exceeds 1A. Most businesses lodge quarterly.",
  },
  {
    question: "Do I charge GST on all my sales?",
    answer: "No. Sales can be taxable (10% GST), GST-free (0%, but you still claim input tax credits), or input-taxed (no GST charged, no input credits). GST-free examples include basic food, exports, and some health services. Input-taxed examples include residential rent and financial services.",
  },
];

const howToSteps = [
  { name: "Choose your mode", text: "Select Add GST if you have a GST-exclusive price and want the inc-GST total. Select Remove GST if you have a GST-inclusive price and need to find the ex-GST component." },
  { name: "Enter the amount", text: "Type the price in Australian dollars." },
  { name: "Confirm the GST rate", text: "The standard Australian GST rate is 10%. Update the rate field if you need to calculate at a different rate." },
  { name: "Read your results", text: "The calculator instantly shows the ex-GST price, the GST amount, and the inc-GST total." },
];

export default function GSTCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="GST Calculator Australia"
        description="Free Australian income tax calculator. Calculate income tax, Medicare levy, LITO, take-home pay, and effective tax rate for 2025–26."
        url="https://calcfuel.com/calculators/gst-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "GST Calculator", url: "https://calcfuel.com/calculators/gst-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>GST Calculator Australia</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        GST Calculator Australia
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Add GST to a price or remove GST from a GST-inclusive amount. Free, instant, and based on the standard Australian 10% GST rate. No sign-up required.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <GSTCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Running a small business in Australia?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          Understanding your tax position is just one piece of the puzzle. If your marketing isn&apos;t generating enough taxable income to worry about, a <strong>$49 Marketing Audit</strong> could be the highest-ROI investment you make this year.
        </p>
        <a
          href="https://buy.stripe.com/aFa6oJgvX7O10YrdS2bsc02"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get a $49 Marketing Audit →
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is GST in Australia?</h2>
        <p>Goods and Services Tax (GST) is a 10% tax on most goods and services sold in Australia. Introduced on 1 July 2000, it replaced state-level wholesale sales taxes. GST-registered businesses collect it from customers and remit it to the ATO via the Business Activity Statement (BAS) process.</p>

        <h2>How to Calculate GST: The Two Methods</h2>

        <h3>Adding GST to a price</h3>
        <p>When you know the ex-GST price and need the inc-GST total:</p>
        <ul>
          <li><strong>Inc-GST price = Ex-GST price x 1.10</strong></li>
          <li><strong>GST amount = Ex-GST price x 0.10</strong></li>
        </ul>
        <p><strong>Example:</strong> A contractor quotes $500 ex-GST. Inc-GST = $500 x 1.10 = <strong>$550</strong>. The GST component is $50.</p>

        <h3>Removing GST from a price</h3>
        <p>When you have an inc-GST price and need the ex-GST breakdown:</p>
        <ul>
          <li><strong>Ex-GST price = Inc-GST price / 1.10</strong></li>
          <li><strong>GST amount = Inc-GST price / 11</strong></li>
        </ul>
        <p><strong>Example:</strong> You pay $660 for a service including GST. Ex-GST = $660 / 1.10 = <strong>$600</strong>. GST = $60.</p>
        <p><strong>Common mistake:</strong> Many people multiply the inc-GST price by 10% to find the GST. This is wrong. $110 x 10% = $11, but the actual GST is $10. Always divide by 1.10.</p>

        <h2>GST Registration: When Is It Mandatory?</h2>
        <p>You must register for GST once annual turnover reaches <strong>$75,000</strong> ($150,000 for not-for-profits). Turnover means total sales revenue, not profit. You have 21 days after crossing the threshold to register. Taxi and rideshare operators must register regardless of turnover.</p>

        <h2>GST-Free vs. Taxable vs. Input-Taxed</h2>
        <p>Not all sales carry GST. The three categories are:</p>
        <table>
          <thead>
            <tr><th>Category</th><th>GST Charged?</th><th>Input Tax Credits?</th><th>Examples</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Taxable</strong></td><td>Yes (10%)</td><td>Yes</td><td>Most services, software, consulting, retail</td></tr>
            <tr><td><strong>GST-Free</strong></td><td>No (0%)</td><td>Yes</td><td>Basic food, exports, some health and education</td></tr>
            <tr><td><strong>Input-Taxed</strong></td><td>No</td><td>No (generally)</td><td>Residential rent, interest, financial services</td></tr>
          </tbody>
        </table>

        <h2>Quoting Prices: Inc-GST or Ex-GST?</h2>
        <p>Under Australian Consumer Law, prices advertised to consumers must show the total price including GST. For B2B invoicing and quotes, you can show either price but must clearly label which it is. Ambiguous quotes cause payment delays and disputes.</p>

        <h2>The BAS and Input Tax Credits</h2>
        <p>Every quarter (or monthly/annually for some businesses), GST-registered businesses lodge a BAS with the ATO. The BAS reports:</p>
        <ul>
          <li><strong>1A:</strong> GST you collected on sales (payable to ATO)</li>
          <li><strong>1B:</strong> GST you paid on business purchases (input tax credits)</li>
        </ul>
        <p>You pay 1A minus 1B to the ATO. If 1B exceeds 1A (common for capital-intensive businesses), you receive a GST refund.</p>

        <h2>Tax Invoices: What Must They Include?</h2>
        <p>For any taxable sale of $82.50 or more (inc-GST), you must provide a tax invoice on request. A valid tax invoice must include: your ABN, the words &quot;Tax Invoice&quot;, the date, a description of the supply, the total amount, and either the GST amount or a statement that the price includes GST.</p>
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
