import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import FuelSurchargeCalc from "./FuelSurchargeCalc";

export const metadata: Metadata = {
  title: "Fuel Surcharge Calculator — Calculate Delivery Surcharges | CalcFuel",
  description:
    "Free fuel surcharge calculator for trucking and freight. Calculate DOE-based fuel surcharge per mile, total FSC, and adjusted invoice amount. Supports both per-mile formula and flat rate methods.",
  alternates: { canonical: "/calculators/fuel-surcharge-calculator" },
};

const relatedTools = [
  {
    title: "Trip Fuel Cost Calculator",
    slug: "trip-fuel-cost-calculator",
    description: "Calculate total fuel cost for any road trip by distance, MPG, and gas price.",
  },
  {
    title: "Generator Fuel Calculator",
    slug: "generator-fuel-calculator",
    description: "Calculate generator runtime and fuel consumption for any wattage and fuel type.",
  },
  {
    title: "Fuel Economy Savings Calculator",
    slug: "fuel-economy-savings-calculator",
    description: "See exactly how much you save annually by improving your vehicle's MPG.",
  },
  {
    title: "Idling Fuel Waste Calculator",
    slug: "idling-fuel-waste-calculator",
    description: "Find out how much fuel and money is wasted by engine idling each day.",
  },
  {
    title: "Commute Fuel Cost Calculator",
    slug: "commute-fuel-cost-calculator",
    description: "Calculate your daily and annual commute fuel costs.",
  },
  {
    title: "Fuel Budget Planner",
    slug: "fuel-budget-planner",
    description: "Plan your weekly and monthly fuel budget.",
  },
];

const faqs = [
  {
    question: "What is a fuel surcharge and how is it calculated?",
    answer:
      "A fuel surcharge (FSC) is an additional fee added to a freight invoice to compensate carriers for fluctuating diesel fuel costs above a set baseline price. The most common calculation method divides the difference between the current DOE diesel price and a baseline trigger price by the vehicle's average MPG to produce a surcharge per mile. That per-mile rate is then multiplied by the total miles driven to produce the total FSC. For example, if diesel is $3.85/gallon, the baseline is $1.25/gallon, and the truck averages 6.5 MPG, the surcharge is ($3.85 − $1.25) ÷ 6.5 = $0.40/mile.",
  },
  {
    question: "What is the DOE diesel baseline price?",
    answer:
      "The U.S. Department of Energy (DOE) publishes weekly average on-highway diesel prices. Most carrier tariffs set a baseline or trigger price — commonly $1.20 to $1.50 per gallon — below which no surcharge applies. This baseline was established years ago when diesel averaged far less than today, so most shipments now carry a surcharge. The American Trucking Associations (ATA) publishes a weekly FSC table based on the DOE index which many brokers and shippers use as a reference.",
  },
  {
    question: "How does the flat rate per mile FSC method work?",
    answer:
      "Some carrier contracts and broker agreements specify a fixed fuel surcharge rate in dollars per mile rather than using the DOE formula. This flat rate is negotiated in advance — for example, $0.12 per mile — and applies regardless of weekly diesel price movements. It provides predictability for both shippers and carriers but may not accurately reflect actual fuel cost changes over time. The flat rate method in this calculator simply multiplies your agreed $/mile rate by total miles driven.",
  },
  {
    question: "Who typically pays the fuel surcharge?",
    answer:
      "In almost all trucking arrangements, the shipper (the party that tenders the freight) pays the fuel surcharge to the carrier. Freight brokers pass the FSC through to their shipper clients while paying it to their carrier partners, sometimes taking a small margin on the spread. Owner-operators working under a motor carrier authority should ensure their fuel surcharges are clearly itemized on invoices to avoid disputes. The FSC is separate from the base linehaul rate on the freight invoice.",
  },
  {
    question: "Can I use this calculator for LTL (less-than-truckload) shipments?",
    answer:
      "Yes, although LTL carriers often apply FSC as a percentage of the base linehaul rate rather than a per-mile calculation. For LTL, the surcharge percentage is looked up in a published FSC table based on the current DOE price. For FTL (full truckload) and owner-operator mileage-based calculations, the per-mile formula in this calculator is the most appropriate method. Enter the LTL base rate and use the flat rate method with an effective per-mile equivalent if your carrier provides a table-based percentage.",
  },
];

const howToSteps = [
  {
    name: "Enter your base freight rate",
    text: "Type the base invoice amount before any surcharge — the linehaul rate agreed between shipper and carrier. This is typically quoted per load or per mile.",
  },
  {
    name: "Choose your calculation method",
    text: "Select 'Per-Mile Formula' if you want to calculate the surcharge based on the DOE diesel index formula, or 'Flat Rate per Mile' if your contract specifies a fixed $/mile FSC rate.",
  },
  {
    name: "Enter diesel prices (formula method)",
    text: "For the formula method, enter the current DOE weekly average diesel price and your baseline (trigger) price. The current DOE price is published every Monday at eia.gov. The baseline is set in your tariff — commonly $1.25/gallon.",
  },
  {
    name: "Enter vehicle MPG and trip miles",
    text: "For the formula method, enter your truck's average fuel economy in MPG (6.5 MPG is typical for a loaded semi-truck) and the total trip distance in miles. For the flat rate method, just enter total miles driven.",
  },
  {
    name: "Review the surcharge breakdown",
    text: "The calculator shows surcharge per mile, total fuel surcharge, total invoice amount, and surcharge as a percentage of the base rate. Use the breakdown card to verify the line items before issuing or paying an invoice.",
  },
];

export default function FuelSurchargePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Surcharge Calculator"
        description="Free trucking and freight fuel surcharge calculator. Calculate DOE-based FSC per mile, total surcharge, and adjusted invoice using the per-mile formula or a flat rate method."
        url="https://calcfuel.com/calculators/fuel-surcharge-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Fuel Surcharge Calculator", url: "https://calcfuel.com/calculators/fuel-surcharge-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link>
        <span className="mx-2">/</span>
        <span>Fuel Surcharge Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel Surcharge Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate trucking and freight fuel surcharges using the standard DOE per-mile formula or a flat $/mile rate. Get surcharge per mile, total FSC, and a complete invoice breakdown instantly.
      </p>
      <CalcReviewedBy />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <FuelSurchargeCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Understanding Fuel Surcharges in Trucking and Freight</h2>
        <p>
          Fuel surcharges — commonly abbreviated FSC — are a standard line item on virtually every
          trucking invoice in North America. They exist because diesel fuel is the single largest
          variable operating cost for a motor carrier, yet base freight rates are typically negotiated
          weeks or months in advance. Without a mechanism to pass on fuel price increases, carriers
          would be forced to either absorb large cost swings or reprice every contract whenever diesel
          moves at the pump. The fuel surcharge solves that problem by tying an additional fee directly
          to published diesel index data.
        </p>

        <h2>How the DOE Per-Mile Fuel Surcharge Formula Works</h2>
        <p>
          The most widely used method in full-truckload (FTL) and owner-operator freight is the
          per-mile DOE formula. It relies on three inputs: the current U.S. Department of Energy
          (DOE/EIA) weekly average on-highway diesel price, a baseline or trigger price set in the
          carrier's tariff, and the truck's average fuel economy in miles per gallon.
        </p>
        <p>
          The formula is: <strong>Surcharge per Mile = (Current Diesel − Baseline Diesel) ÷ MPG</strong>.
          If diesel is at $3.85 per gallon, the baseline is $1.25, and the truck averages 6.5 MPG,
          the surcharge is ($3.85 − $1.25) ÷ 6.5 = <strong>$0.40 per mile</strong>. For a 500-mile
          haul, the total FSC would be $200, added on top of the base linehaul rate.
        </p>
        <p>
          The DOE publishes updated diesel prices every Monday at eia.gov. Most carrier tariffs
          update the fuel surcharge table weekly, so the rate applied to a shipment is typically
          based on the DOE price published on the Monday prior to the shipment's pick-up date.
        </p>

        <h2>Baseline (Trigger) Prices Explained</h2>
        <p>
          The baseline price is the floor below which no surcharge applies. Common baseline values
          in carrier tariffs range from $1.00 to $1.50 per gallon. These were established years ago
          when diesel prices were significantly lower than they are today. As a result, almost every
          current shipment carries a non-trivial surcharge, since diesel has not traded below $2.00
          nationally since 2016.
        </p>
        <p>
          When negotiating freight contracts, shippers should pay close attention to the baseline
          price in the carrier's tariff. A lower baseline means the surcharge kicks in at a lower
          diesel price and generates a higher FSC for the carrier at any given diesel level. Raising
          the baseline shifts more fuel risk back to the carrier.
        </p>

        <h2>Flat Rate FSC vs. the DOE Formula</h2>
        <p>
          Some freight agreements use a flat fuel surcharge rate expressed as a fixed dollar amount
          per mile rather than the variable DOE formula. This approach is common in dedicated
          contract carriage, regional delivery agreements, and some broker-carrier relationships
          where both parties prefer billing predictability over fuel-price accuracy.
        </p>
        <p>
          A flat rate of $0.10–$0.20 per mile is typical for regional and middle-mile freight in
          the current diesel price environment. The flat rate is renegotiated periodically — often
          quarterly or annually — rather than adjusting weekly with DOE data. This calculator
          supports both approaches so you can compare the impact of each on your invoice.
        </p>

        <h2>LTL (Less-Than-Truckload) Fuel Surcharges</h2>
        <p>
          Less-than-truckload carriers typically apply fuel surcharges as a percentage of the base
          linehaul charge rather than a per-mile dollar amount. The percentage is taken from a
          published FSC table — such as the weekly table published by YRC, FedEx Freight, or the
          National Motor Freight Traffic Association (NMFTA) — that maps current DOE diesel prices
          to a surcharge percentage. For example, a DOE price of $3.80–$3.89 per gallon might
          correspond to a 28.0% FSC on the base linehaul charge. LTL shippers should check their
          carrier's specific table, as percentages can vary considerably between carriers.
        </p>

        <p>According to the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" target="_blank" rel="noopener noreferrer">ACCC fuel price monitoring</a>, Australian petrol prices vary significantly by region and day of the week.</p>

        <h2>Fuel Surcharge Best Practices for Shippers and Brokers</h2>
        <ul>
          <li>
            <strong>Lock in the baseline on every contract.</strong> An ambiguous baseline price is
            a common source of invoice disputes. Specify the exact dollar amount (e.g., $1.25/gallon)
            and the data source (DOE/EIA weekly on-highway diesel average) in writing.
          </li>
          <li>
            <strong>Confirm the DOE reference week.</strong> Establish whether the FSC is based on
            the DOE price published the Monday before pickup, the Monday of the week of pickup, or
            some other reference point.
          </li>
          <li>
            <strong>Track weekly DOE prices.</strong> Shippers with high freight volumes should
            monitor the DOE weekly price and pre-calculate FSC exposure so invoice amounts are not
            a surprise. This calculator makes that process quick and repeatable.
          </li>
          <li>
            <strong>Audit invoices against the published rate.</strong> Billing errors related to
            fuel surcharges — whether accidental or intentional — are not uncommon. Cross-checking
            carrier invoices against the published DOE table each week is a straightforward audit
            step that can reveal discrepancies.
          </li>
          <li>
            <strong>Model diesel price scenarios for budgeting.</strong> Use this calculator to run
            high, mid, and low diesel price scenarios when building annual freight budgets. A $0.50
            swing in diesel per gallon can meaningfully change total FSC spend for high-volume
            shippers.
          </li>
        </ul>

        <h2>Typical Fuel Economy for Common Commercial Vehicles</h2>
        <p>
          The MPG assumption used in the DOE formula has a significant impact on the calculated
          surcharge. A lower MPG (less efficient vehicle) produces a higher surcharge per mile.
          Here are representative real-world MPG figures for common commercial vehicles:
        </p>
        <ul>
          <li><strong>Class 8 semi-truck (loaded, highway):</strong> 5.5–7.5 MPG — use 6.5 as a standard assumption</li>
          <li><strong>Class 8 semi-truck (empty, highway):</strong> 7.5–9.5 MPG</li>
          <li><strong>Class 6–7 medium-duty straight truck:</strong> 8–12 MPG</li>
          <li><strong>Class 3–5 delivery truck or sprinter van:</strong> 12–18 MPG</li>
          <li><strong>Refrigerated trailer (reefer unit running):</strong> Add approximately 0.3–0.5 gal/hr for the reefer, reducing effective MPG by 0.5–1.0 on long runs</li>
        </ul>
        <p>
          The American Trucking Associations (ATA) and Federal Motor Carrier Safety Administration
          (FMCSA) publish industry-wide MPG averages that can serve as benchmarks when the actual
          truck's fuel economy is not known.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual fuel costs vary based on current fuel prices, driving conditions, vehicle type, and maintenance. Check current Australian fuel prices via <a href="https://www.fuelwatch.wa.gov.au/" className="underline" target="_blank" rel="noopener noreferrer">FuelWatch (WA)</a> or the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" className="underline" target="_blank" rel="noopener noreferrer">ACCC fuel price guide</a>. This is not financial or professional advice.
      </aside>
      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
