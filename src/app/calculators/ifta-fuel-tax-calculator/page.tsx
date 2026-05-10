import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import IftaFuelTaxCalc from "./IftaFuelTaxCalc";

export const metadata: Metadata = {
  title: "IFTA Fuel Tax Calculator — Quarterly Fuel Tax Compliance Tool",
  description:
    "Estimate your quarterly IFTA fuel tax owed or refund across jurisdictions. A simplified tool for owner-operators and small fleets to check their IFTA balance before filing.",
  alternates: { canonical: "/calculators/ifta-fuel-tax-calculator" },
};

const relatedTools = [
  { title: "Fuel Surcharge Calculator", slug: "fuel-surcharge-calculator", description: "Calculate fuel surcharges for freight and transport billing." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan and track your monthly fuel spending." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate fuel and money wasted from engine idling." },
];

const faqs = [
  {
    question: "What is IFTA and who needs to file?",
    answer:
      "The International Fuel Tax Agreement (IFTA) is an agreement among US states and Canadian provinces that simplifies fuel tax reporting for commercial carriers operating in multiple jurisdictions. You need an IFTA licence if your vehicle has two axles and a gross vehicle weight over 26,000 lbs, or has three or more axles regardless of weight, and travels in more than one IFTA jurisdiction. Owner-operators and small fleets must file quarterly IFTA returns — typically by January 31, April 30, July 31, and October 31.",
  },
  {
    question: "How does IFTA fuel tax work?",
    answer:
      "IFTA calculates fuel tax based on where you drive, not where you buy fuel. Each quarter, you calculate your total miles driven in each jurisdiction and your fleet-wide fuel consumption. Your average fuel economy (total miles / total gallons) determines the theoretical gallons consumed in each jurisdiction. You owe tax to each jurisdiction based on those gallons at that jurisdiction's tax rate. If you purchased fuel in a jurisdiction, those taxes are credited. The net result is either additional tax owed to some states or a refund from others — but it all flows through your home base state.",
  },
  {
    question: "What is the difference between fuel purchased and fuel consumed by jurisdiction?",
    answer:
      "IFTA does not care where you physically fill up your tank. It calculates how much fuel you theoretically consumed in each state based on your miles driven there and your average fleet fuel economy. If you drove 2,000 miles in Texas at your fleet average of 6 MPG, IFTA treats that as 333 gallons consumed in Texas — regardless of whether you filled up in Texas or not. Taxes paid when you bought fuel in Texas are then credited against the tax owed.",
  },
  {
    question: "Is this calculator suitable for filing my actual IFTA return?",
    answer:
      "No — this is a simplified estimator designed to give you a ballpark of your IFTA position before you complete your official quarterly return. A complete IFTA return requires per-trip odometer records, fuel receipts with jurisdiction, date, gallons, and amount, and the current tax rate for every jurisdiction you operated in (rates change quarterly). Always use your state's official IFTA reporting software or a certified IFTA service to prepare and file your actual quarterly return.",
  },
];

const howToSteps = [
  {
    name: "Select unit system",
    text: "Choose imperial (miles, gallons) for US operations or metric (km, litres) for Canadian or international operations.",
  },
  {
    name: "Enter fleet totals",
    text: "Enter the total miles or km driven across all jurisdictions this quarter, and the total gallons or litres of fuel purchased across all jurisdictions. These numbers come from your trip and fuel purchase logs.",
  },
  {
    name: "Add jurisdiction breakdown",
    text: "Add up to 3 jurisdictions where you operated. For each, enter the miles or km driven and the current fuel tax rate (cents per gallon or litre) for that state or province. IFTA tax rates are published quarterly by each jurisdiction.",
  },
  {
    name: "Review your estimated IFTA balance",
    text: "The calculator shows your average fleet fuel economy, estimated fuel consumed per jurisdiction, tax owed per jurisdiction, and your net IFTA balance — whether you owe additional tax or are owed a refund.",
  },
];

export default function IftaFuelTaxPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="IFTA Fuel Tax Calculator"
        description="Estimate your quarterly IFTA fuel tax owed or refund across jurisdictions. A simplified tool for owner-operators and small fleets."
        url="https://calcfuel.com/calculators/ifta-fuel-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "IFTA Fuel Tax Calculator", url: "https://calcfuel.com/calculators/ifta-fuel-tax-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>IFTA Fuel Tax Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">IFTA Fuel Tax Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Estimate your quarterly IFTA fuel tax balance across jurisdictions. Enter your total miles and fuel purchases, then add your jurisdiction breakdown to see whether you owe tax or are owed a refund.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <IftaFuelTaxCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>IFTA Explained: How Quarterly Fuel Tax Filing Works</h2>
        <p>
          The International Fuel Tax Agreement (IFTA) was created in the 1980s to simplify fuel tax compliance for interstate commercial trucking.
          Before IFTA, carriers had to purchase fuel permits in every state they entered and file separate tax returns with each jurisdiction.
          IFTA replaced this system with a single quarterly filing submitted to your base jurisdiction (your home state or province), which then
          redistributes taxes to the other jurisdictions you operated in.
        </p>
        <p>
          IFTA covers 48 contiguous US states and 10 Canadian provinces. Hawaii, Alaska, and the Yukon, Northwest Territories, and Nunavut are
          not IFTA members. Mexico is also not part of IFTA. If your commercial vehicle (two-axle, over 26,000 lbs GVWR, or three or more axles)
          crosses state or provincial lines, you almost certainly need an IFTA licence.
        </p>

        <h2>The IFTA Calculation Logic</h2>
        <p>
          IFTA operates on a simple but elegant principle: tax is owed based on where fuel is consumed, not where it is purchased. The calculation
          works as follows:
        </p>
        <ol>
          <li>
            <strong>Calculate fleet average fuel economy:</strong> Total miles driven (all jurisdictions) divided by total gallons purchased (all jurisdictions).
          </li>
          <li>
            <strong>Calculate fuel consumed per jurisdiction:</strong> Miles driven in each jurisdiction divided by fleet average MPG.
          </li>
          <li>
            <strong>Calculate tax owed per jurisdiction:</strong> Gallons consumed in each jurisdiction multiplied by that jurisdiction&apos;s tax rate.
          </li>
          <li>
            <strong>Apply fuel purchase credits:</strong> Gallons purchased in each jurisdiction (and taxes paid at the pump) are credited against the tax owed. This simplified calculator assumes all fuel was purchased in your home jurisdiction for illustration purposes.
          </li>
          <li>
            <strong>Net result:</strong> If you drove more in high-tax states than where you bought fuel, you owe additional tax. If you bought more fuel in high-tax states than you consumed there, you receive a credit.
          </li>
        </ol>

        <h2>Quarterly Filing Deadlines</h2>
        <p>IFTA returns are due quarterly. The standard due dates are:</p>
        <ul>
          <li><strong>Q1 (Jan–Mar):</strong> Due April 30</li>
          <li><strong>Q2 (Apr–Jun):</strong> Due July 31</li>
          <li><strong>Q3 (Jul–Sep):</strong> Due October 31</li>
          <li><strong>Q4 (Oct–Dec):</strong> Due January 31</li>
        </ul>
        <p>
          Late filings incur penalties — typically $50 or 10% of net tax owed, whichever is greater, in most US jurisdictions. Some states
          suspend IFTA licences for repeated late filings, which prevents legal operation of your commercial vehicle. Always file on time,
          even if you have no miles to report (a zero return is still required each quarter).
        </p>

        <h2>Record-Keeping Requirements</h2>
        <p>
          IFTA requires you to maintain records for four years from the filing due date or the date filed, whichever is later. Required records
          include:
        </p>
        <ul>
          <li>Trip reports showing dates, routes, and odometer readings at each jurisdiction border crossing</li>
          <li>Fuel purchase receipts showing date, location, vehicle unit number, gallons purchased, and amount paid</li>
          <li>Vehicle identification records linking each trip and fuel receipt to a specific licensed vehicle</li>
        </ul>
        <p>
          Many owner-operators use ELD (Electronic Logging Device) systems that automatically track mileage by jurisdiction, significantly
          simplifying record-keeping. Several trucking software platforms — including TruckingOffice, KeepTruckin (now Motive), and Rigbooks
          — offer integrated IFTA reporting that calculates your quarterly liability automatically from your GPS and fuel receipt data.
        </p>

        <h2>Understanding Your IFTA Balance</h2>
        <p>
          A positive IFTA balance (tax owed) means you drove more in jurisdictions than you purchased fuel in. This is common for carriers
          who fill up primarily in low-tax states (Montana, New Mexico, Oklahoma) but operate heavily in high-tax states (Pennsylvania,
          California, Connecticut). You will owe the difference when you file.
        </p>
        <p>
          A negative IFTA balance (refund owed to you) means you purchased more fuel — and therefore paid more in fuel taxes — than you
          consumed in any jurisdiction. Refunds are processed through your base jurisdiction within 30 days of filing in most states.
        </p>
        <p>
          The most common IFTA audit trigger is a suspiciously high or low average MPG compared to the declared vehicle type. If your reported
          MPG is significantly lower than the manufacturer&apos;s specification or significantly higher (suggesting odometer manipulation), expect
          increased audit scrutiny.
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

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
