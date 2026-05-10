import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import GeneratorFuelCalc from "./GeneratorFuelCalc";

export const metadata: Metadata = {
  title: "Generator Fuel Consumption Calculator — Runtime & Fuel Cost",
  description: "Free generator fuel calculator. Calculate fuel consumption rate, runtime on available fuel, and fuel needed for a power outage. Supports gasoline, diesel, propane, and natural gas.",
  alternates: { canonical: "/calculators/generator-fuel-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily and annual commute fuel costs." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your MPG." },
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare electric vehicle vs gas car total cost of ownership." },
];

const faqs = [
  { question: "How much fuel does a generator use per hour?", answer: "A typical 5,000-watt (5 kW) gasoline generator at 50% load consumes approximately 1.25 gallons (4.7 litres) of gasoline per hour. At full load (100%), consumption rises to around 2.5 gallons (9.5 litres) per hour. Diesel generators are 20–25% more fuel-efficient. This calculator adjusts for both generator size and load percentage." },
  { question: "How long will a generator run on 5 gallons of gas?", answer: "A 5,000-watt generator at 50% load (2,500 watts) running on gasoline consumes approximately 1.25 gallons per hour, so 5 gallons provides about 4 hours of runtime. At 25% load (1,250 watts), consumption drops to approximately 0.625 gallons per hour, extending runtime to 8 hours. Enter your specific figures in the calculator for an exact estimate." },
  { question: "Is diesel or gasoline more efficient for generators?", answer: "Diesel generators are typically 20–30% more fuel-efficient than equivalent gasoline generators. A 5 kW diesel generator at 50% load uses approximately 0.9–1.0 gallons per hour versus 1.25 gallons for gasoline. Diesel also stores better for emergency preparedness — up to 12 months with fuel stabiliser versus 3–6 months for gasoline. However, diesel generators typically cost 30–50% more upfront." },
  { question: "How much natural gas does a generator use per hour?", answer: "Natural gas generators consume approximately 9–12 cubic feet (cf) of natural gas per kilowatt per hour at full load. A 10 kW natural gas generator at 50% load (5 kW effective output) uses approximately 45–60 cf/hour. Natural gas home generators are connected directly to the utility supply line, eliminating fuel storage concerns during extended outages." },
  { question: "How much fuel do I need for a 3-day power outage?", answer: "For a 5,000-watt gasoline generator at 50% load running continuously for 3 days (72 hours), you need approximately 90 gallons (340 litres) of fuel — which is impractical for most households. In practice, running a generator for 6–8 hours per day (for essential appliances, refrigerator cycling, and phone charging) requires 8–10 gallons for a 3-day outage. Use this calculator with a partial load to model realistic consumption." },
];

const howToSteps = [
  { name: "Enter generator size in watts", text: "Find your generator's rated wattage on the spec plate or in the owner's manual. Enter the running watts (not peak/surge watts)." },
  { name: "Set load percentage", text: "Generators rarely run at 100% load. 50% is a realistic average for household use with essential appliances. Running below 30% load (light load) can cause wet stacking in diesel generators — avoid prolonged operation below 30%." },
  { name: "Select fuel type", text: "Choose your generator's fuel type: gasoline, diesel, propane (LP), or natural gas. Each fuel has different consumption rates and storage characteristics." },
  { name: "Enter fuel available (optional)", text: "Enter how many gallons or litres of fuel you have on hand. The calculator will show your estimated runtime on that quantity." },
  { name: "Enter outage duration (optional)", text: "Enter the number of days you need to run the generator. The calculator will show total fuel required and estimated cost if you enter a fuel price." },
];

export default function GeneratorFuelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Generator Fuel Consumption Calculator"
        description="Calculate generator fuel consumption rate, runtime on available fuel, and fuel needed for power outages. Supports gasoline, diesel, propane, and natural gas."
        url="https://calcfuel.com/calculators/generator-fuel-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Generator Fuel Calculator", url: "https://calcfuel.com/calculators/generator-fuel-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel & Energy</Link><span className="mx-2">/</span>
        <span>Generator Fuel Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Generator Fuel Consumption & Runtime Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate how much fuel your generator uses per hour, how long it will run on available fuel, and how much fuel you need for a power outage. Supports all common fuel types.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <GeneratorFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>How Generator Fuel Consumption Is Calculated</h2>
        <p>Generator fuel consumption is primarily determined by three variables: generator size (in kilowatts), the percentage of rated load the generator is currently running, and the fuel type. Most manufacturers publish fuel consumption data at 25%, 50%, and full load — the figures in this calculator are based on industry-standard consumption rates at each load level.</p>
        <p>The fundamental formula: <strong>Fuel per Hour = Base Rate (per kW) × Generator kW × Load Fraction</strong>. For a 5 kW gasoline generator at 50% load: 0.5 gal/kW/hr × 5 kW × 0.5 = 1.25 gallons per hour.</p>

        <h2>Fuel Consumption by Type</h2>
        <h3>Gasoline</h3>
        <p>The most common generator fuel in residential applications. A typical portable gasoline generator consumes 0.5–0.6 gallons per kilowatt per hour at full load. Gasoline has a shelf life of 3–6 months without stabiliser (12 months with stabiliser) — critical for emergency preparedness stockpiling. Ethanol-blended fuels (E10, E15) have shorter shelf lives and can cause fuel system corrosion in generators stored for extended periods.</p>

        <h3>Diesel</h3>
        <p>Diesel generators are 20–30% more fuel-efficient than gasoline equivalents. A 5 kW diesel generator at 50% load uses approximately 0.9–1.0 gallons per hour versus 1.25 for gasoline. Diesel stores for up to 12 months with fuel stabiliser and is generally more energy-dense. Most standby generators above 20 kW use diesel. Running diesel generators below 30% rated load for extended periods can cause "wet stacking" — incomplete combustion that deposits unburned fuel in the exhaust system.</p>

        <h3>Propane (LP Gas)</h3>
        <p>Propane generators are popular for their indefinite fuel storage life — propane does not degrade with age like liquid fuels. However, propane has lower energy density than gasoline or diesel, requiring approximately 20–25% more fuel volume for equivalent output. Propane generators are well-suited for homes with existing LP supply (rural properties, areas with unreliable fuel supply chains) and are popular for standby whole-house generator systems.</p>

        <h3>Natural Gas</h3>
        <p>Natural gas generators connect directly to the utility supply line, eliminating fuel storage entirely. This makes them the most convenient option for extended outages — as long as the gas supply remains intact. Natural gas generators are primarily used as permanent standby systems. Consumption is measured in cubic feet (CF) or cubic meters (m³) per hour, and consumption costs vary significantly by utility rate and region.</p>

        <h2>Planning for Extended Power Outages</h2>
        <p>The key insight for emergency preparedness planning is that continuous operation is rarely necessary. Running a generator 6–8 hours per day for essential functions (refrigerator cycling, phone charging, medical equipment, lighting) consumes far less fuel than continuous operation. For a 3-day outage at 8 hours/day with a 5,000-watt generator at 50% load using gasoline: 1.25 gal/hr × 8 hrs × 3 days = 30 gallons — a realistic stockpile for most households.</p>
        <ul>
          <li><strong>Refrigerator:</strong> 150–200 watts average running load; can be cycled on/off every few hours</li>
          <li><strong>Sump pump:</strong> 750–1,250 watts when running (intermittent)</li>
          <li><strong>Window AC unit:</strong> 1,000–1,500 watts (significant load — avoid running continuously)</li>
          <li><strong>LED lighting (6 fixtures):</strong> 60–120 watts total</li>
          <li><strong>Phone/laptop charging:</strong> 100–200 watts total</li>
          <li><strong>Total essential load estimate:</strong> 600–800 watts average (approximately 15–20% of a 5 kW generator)</li>
        </ul>
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
