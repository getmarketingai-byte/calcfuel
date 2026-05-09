import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import GSTCalc from "./GSTCalc";

export const metadata: Metadata = {
  title: "Australian GST Calculator — Add or Remove GST Instantly",
  description:
    "Free Australian GST calculator. Add 10% GST to any price or remove GST from a GST-inclusive amount. Instant results for invoicing, BAS, and business accounting.",
};

const relatedTools = [
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross, net, and operating profit margins." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all your costs." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure the return on your marketing investment." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project clicks, leads, and revenue." },
];

const faqs = [
  {
    question: "What is the GST rate in Australia?",
    answer:
      "The Goods and Services Tax (GST) rate in Australia is 10%. It applies to most goods, services, and other items sold or consumed in Australia. GST was introduced on 1 July 2000 and is administered by the Australian Taxation Office (ATO).",
  },
  {
    question: "How do I add GST to a price?",
    answer:
      "To add 10% GST to a price: multiply the ex-GST price by 1.1. Example: $100 (ex-GST) × 1.1 = $110 (inc-GST). The GST component is $10. Use the calculator above to get instant results without manual arithmetic.",
  },
  {
    question: "How do I remove GST from a GST-inclusive price?",
    answer:
      "To remove GST from a GST-inclusive price: divide the inc-GST price by 1.1. Example: $110 ÷ 1.1 = $100 (ex-GST). The GST component is $10. Alternatively, divide the inc-GST price by 11 to get the GST amount directly. Use 'Remove GST' mode in the calculator above.",
  },
  {
    question: "Who needs to charge GST in Australia?",
    answer:
      "Australian businesses must register for GST if their annual turnover is $75,000 or more ($150,000 for non-profit organisations). Once registered, you must charge GST on most taxable supplies and lodge a Business Activity Statement (BAS) with the ATO — monthly, quarterly, or annually.",
  },
  {
    question: "What goods and services are GST-free?",
    answer:
      "Some goods and services are exempt from GST in Australia. Key GST-free items include: most basic foods (fresh fruit, vegetables, bread, milk), medical and health services, educational courses, childcare, and exports. Always verify with the ATO or your accountant for specific cases.",
  },
  {
    question: "How do I calculate GST on my BAS?",
    answer:
      "On your Business Activity Statement (BAS): report GST collected on sales (G1 on the form) and GST credits on purchases (G11). The net GST payable is the difference. For each sale, GST = price including GST ÷ 11. For purchases, you claim back the same GST amount as an input tax credit.",
  },
  {
    question: "What is the difference between GST-inclusive and GST-exclusive pricing?",
    answer:
      "GST-exclusive (ex-GST) pricing is the price before tax — what you earn before the ATO takes its 10% cut. GST-inclusive (inc-GST) pricing is the total the customer pays, including the 10% tax. Invoices must clearly show both amounts plus the GST component for registered businesses.",
  },
];

const howToSteps = [
  {
    name: "Choose Add or Remove GST",
    text: "Select 'Add GST' if you have an ex-GST price and want to find the total. Select 'Remove GST' if you have a GST-inclusive price and want to find the base amount.",
  },
  {
    name: "Enter the amount",
    text: "Type the dollar amount in the input field. The calculator accepts any positive number, including cents.",
  },
  {
    name: "Read your results instantly",
    text: "The calculator displays all three values: price ex-GST, the GST amount (10%), and the price inc-GST. No button press required — results appear as you type.",
  },
];

export default function GSTCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian GST Calculator"
        description="Free Australian GST calculator. Add 10% GST to any price or remove GST from a GST-inclusive amount instantly."
        url="https://calcfuel.com/calculators/gst-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Australian GST Calculator", url: "https://calcfuel.com/calculators/gst-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Australian GST Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian GST Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Add or remove 10% GST instantly. Enter any amount to calculate the GST component, ex-GST price, and GST-inclusive total — free, no sign-up required.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <GSTCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Is GST in Australia?</h2>
        <p>
          Goods and Services Tax (GST) is a broad-based tax of 10% on most goods, services, and other items sold or consumed in Australia. Introduced on 1 July 2000, GST replaced a range of state and federal taxes and is administered by the Australian Taxation Office (ATO). Understanding how to add and remove GST is essential for every Australian business owner, freelancer, and accountant.
        </p>
        <p>
          Businesses registered for GST must include it on taxable sales, lodge a Business Activity Statement (BAS), and remit the collected GST to the ATO. In return, they can claim input tax credits for GST paid on business purchases — effectively making GST a pass-through tax at each stage of the supply chain.
        </p>

        <h2>How to Calculate GST</h2>
        <h3>Adding GST to a Price (Ex-GST to Inc-GST)</h3>
        <p>
          <strong>Formula:</strong> Price inc-GST = Price ex-GST × 1.1
        </p>
        <p>
          <strong>Example:</strong> You charge $500 for a consulting service. GST = $500 × 0.10 = $50. Total invoice = $500 + $50 = <strong>$550 (inc-GST)</strong>.
        </p>

        <h3>Removing GST from a Price (Inc-GST to Ex-GST)</h3>
        <p>
          <strong>Formula:</strong> Price ex-GST = Price inc-GST ÷ 1.1 &nbsp;|&nbsp; GST amount = Price inc-GST ÷ 11
        </p>
        <p>
          <strong>Example:</strong> You paid $330 for a business expense (inc-GST). GST component = $330 ÷ 11 = $30. Ex-GST price = $330 − $30 = <strong>$300</strong>. You can claim $30 as an input tax credit on your BAS.
        </p>

        <h2>GST Registration Threshold</h2>
        <p>
          You must register for GST if your business has a GST turnover of <strong>$75,000 or more</strong> per year ($150,000 for non-profit organisations and $75,000 for ride-share and taxi drivers). Once registered, you must:
        </p>
        <ul>
          <li>Charge GST on taxable supplies</li>
          <li>Issue tax invoices for sales over $82.50 (inc-GST)</li>
          <li>Lodge a BAS and remit GST collected to the ATO</li>
          <li>Claim input tax credits for GST on business purchases</li>
        </ul>
        <p>
          Voluntary registration is available for businesses below the threshold — useful if you want to claim GST credits on startup costs.
        </p>

        <h2>GST-Free vs Taxable vs Input-Taxed Supplies</h2>
        <p>
          Not all goods and services attract GST. The ATO classifies supplies into three categories:
        </p>
        <ul>
          <li>
            <strong>Taxable supplies (10% GST):</strong> Most business sales of goods and services, commercial rent, new residential property, and digital products sold to Australian consumers.
          </li>
          <li>
            <strong>GST-free (0% GST):</strong> Basic food (fresh fruit, vegetables, bread, milk, meat), medical services, educational courses, childcare, exports, and certain health goods. You can still claim input tax credits on purchases related to GST-free supplies.
          </li>
          <li>
            <strong>Input-taxed (no GST, no credits):</strong> Financial services (lending, life insurance, residential rent), precious metals, and some donations. You cannot charge GST and cannot claim input tax credits on related purchases.
          </li>
        </ul>

        <h2>BAS Reporting and GST</h2>
        <p>
          Your Business Activity Statement (BAS) is how you report and pay GST to the ATO. The key labels:
        </p>
        <ul>
          <li><strong>G1 — Total sales:</strong> Your total GST-inclusive sales</li>
          <li><strong>G2 — Export sales:</strong> GST-free exports</li>
          <li><strong>G3 — Other GST-free sales:</strong> Other GST-free supplies</li>
          <li><strong>1A — GST on sales:</strong> Total GST collected from customers</li>
          <li><strong>G10 — Capital purchases:</strong> GST-inclusive capital acquisitions</li>
          <li><strong>G11 — Non-capital purchases:</strong> GST-inclusive operating expenses</li>
          <li><strong>1B — GST on purchases:</strong> Input tax credits you are claiming</li>
        </ul>
        <p>
          Net GST payable = 1A (GST collected) − 1B (input tax credits). If your credits exceed your GST collected, the ATO owes you a refund.
        </p>

        <h2>Common GST Mistakes Australian Businesses Make</h2>
        <p>
          <strong>Forgetting to register:</strong> Many new businesses hit $75,000 turnover without realising they must register. Back-paying GST on past sales without being able to recover it from customers is costly.
        </p>
        <p>
          <strong>Charging GST on GST-free items:</strong> Basic food items do not attract GST. Incorrectly charging GST on groceries, fresh food, or medical items creates liability.
        </p>
        <p>
          <strong>Not keeping tax invoices:</strong> You must hold a valid tax invoice for any purchase over $82.50 (inc-GST) to claim an input tax credit. Missing invoices mean lost credits.
        </p>
        <p>
          <strong>Mixing personal and business expenses:</strong> You can only claim input tax credits on business-related purchases. Personal expenses are not eligible, and the ATO takes a dim view of mixed-use claims without clear apportionment.
        </p>
        <p>
          <strong>Rounding errors:</strong> Always round to the nearest cent. The ATO allows rounding on each line item but requires rounding at the total level for BAS reporting.
        </p>
      </article>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
