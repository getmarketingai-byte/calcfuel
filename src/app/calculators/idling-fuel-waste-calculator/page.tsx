import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import IdlingFuelWasteCalc from "./IdlingFuelWasteCalc";

export const metadata: Metadata = {
  title: "Idling Fuel Waste Calculator — Cost of Engine Idling for Cars & Fleets",
  description: "Calculate how much fuel and money is wasted by engine idling every day, week, and year. Supports personal vehicles and commercial fleets. Imperial and metric units.",
  alternates: { canonical: "/calculators/idling-fuel-waste-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip using distance and MPG." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Find out your daily, weekly, and annual commute fuel costs." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by upgrading to a more fuel-efficient vehicle." },
  { title: "Fuel Surcharge Calculator", slug: "fuel-surcharge-calculator", description: "Calculate fuel surcharges for freight and delivery operations." },
];

const faqs = [
  {
    question: "How much fuel does an idling car waste per hour?",
    answer: "A typical passenger car burns approximately 0.6–1.0 gallons (2.3–3.8 litres) of fuel per hour while idling, depending on engine size, age, and whether the air conditioning is running. A large pickup truck or SUV can burn 0.8–1.5 gallons (3.0–5.7 litres) per hour. Commercial diesel trucks idle at roughly 0.8–1.0 gallons per hour. This calculator uses a default of 0.8 gal/hr for cars — adjust it to match your specific vehicle for an accurate result."
  },
  {
    question: "Is it better to turn off the engine than to idle?",
    answer: "Yes — almost always. Modern fuel-injected engines use very little extra fuel to restart, typically less than 10 seconds worth of idling fuel. Any idle lasting longer than 10–30 seconds burns more fuel than turning off and restarting. The old advice about warm-up idling is outdated; modern engines reach operating temperature faster when driven gently than when sitting at idle. The exception is extreme cold weather (below -20°C / -4°F), where a brief warm-up of 30–60 seconds is acceptable."
  },
  {
    question: "How much does idling cost a fleet per year?",
    answer: "A fleet of 10 vehicles, each idling 15 minutes per day at 0.8 gal/hr and $3.50/gallon over 250 working days, wastes approximately $2,188 per year. Scale that up to 100 vehicles and the annual waste exceeds $21,000. Fleets with high idle times — service vans, delivery trucks, and utility vehicles — can see idling account for 5–10% of their total fuel budget. Anti-idling policies and GPS monitoring systems typically pay for themselves within 6–12 months."
  },
  {
    question: "What are idle reduction strategies for fleets?",
    answer: "The most effective idle-reduction strategies include: (1) Implementing and enforcing a written no-idle policy with a 5-minute maximum; (2) Installing auxiliary power units (APUs) for HVAC in long-haul trucks; (3) Using telematics and GPS systems to monitor and report idle time in real time; (4) Driver training programmes highlighting the fuel and environmental cost of unnecessary idling; (5) Fitting automatic engine shut-off timers that cut the engine after a configurable idle period; (6) Electrifying short-haul delivery fleets where stop-and-idle time is highest."
  },
  {
    question: "How much CO2 does engine idling produce?",
    answer: "Burning one US gallon of gasoline produces approximately 8.887 kg of CO2 (EPA figure). One litre produces around 2.346 kg. A single car idling 10 minutes per day for 250 working days burns roughly 33 gallons (125 litres) per year, producing approximately 293 kg (646 lbs) of CO2 — equivalent to driving an extra 700–900 miles. A fleet of 50 vehicles idling at this rate generates over 14,600 kg (32,000 lbs) of CO2 annually from idling alone."
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Click 'Imperial (gal)' for US measurements with gallons, or 'Metric (L)' for litres used in Australia, Canada, and Europe. The fuel burn rate and price defaults will update automatically."
  },
  {
    name: "Enter daily idling time",
    text: "Type the average number of minutes per day each vehicle spends idling. Include warm-up time, loading/unloading waits, drive-through queues, and any other stationary running time."
  },
  {
    name: "Set the fuel burn rate",
    text: "Enter how much fuel your vehicle or fleet burns per hour while idling. Passenger cars typically use 0.6–1.0 gal/hr (2.3–3.8 L/hr). Trucks and larger engines use more. Check your vehicle manual or use a fuel flow meter for precision."
  },
  {
    name: "Enter fuel price and fleet size",
    text: "Input your current local fuel price per gallon or litre, then enter the number of vehicles in your fleet. Use 1 for a single personal vehicle. The calculator will show both per-vehicle and total fleet figures."
  },
  {
    name: "Review results and CO2 savings",
    text: "The calculator shows daily, weekly, monthly, and annual waste per vehicle plus fleet totals. The CO2 panel shows the environmental benefit of eliminating the idling. Use these figures to build a business case for an idle-reduction programme."
  },
];

export default function IdlingFuelWastePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Idling Fuel Waste Calculator"
        description="Calculate how much fuel and money is wasted by engine idling every day, week, and year. Supports personal vehicles and commercial fleets with metric and imperial units."
        url="https://calcfuel.com/calculators/idling-fuel-waste-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Idling Fuel Waste Calculator", url: "https://calcfuel.com/calculators/idling-fuel-waste-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link>
        <span className="mx-2">/</span>
        <span>Idling Fuel Waste Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Idling Fuel Waste Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Find out exactly how much fuel and money your vehicle or fleet wastes through engine idling — daily, weekly, monthly, and annually. Includes CO₂ impact. Supports imperial (gallons) and metric (litres).
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <IdlingFuelWasteCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>The Hidden Cost of Engine Idling</h2>
        <p>Engine idling — running a vehicle engine while stationary — is one of the most overlooked sources of wasted fuel in both personal and commercial transport. While idling feels free because the vehicle is not moving, the engine is still consuming fuel at roughly 50–70% of its cruising rate. For a passenger car idling at 0.8 gallons per hour, just 10 minutes of daily idling adds up to more than 30 gallons of fuel per year — burned without moving an inch.</p>
        <p>The financial impact becomes most apparent in fleet operations. A company running 20 delivery vehicles, each idling an average of 20 minutes per day at $3.50/gallon over 250 working days, wastes over $5,800 per year on idling alone. Larger fleets of 100 or more vehicles can have annual idle-waste figures exceeding $50,000 — a significant, avoidable operating cost.</p>

        <h2>Why Vehicles Idle — and When It Is Unnecessary</h2>
        <p>Common causes of unnecessary idling include:</p>
        <ul>
          <li><strong>Warm-up idling:</strong> Many drivers idle for 5–10 minutes to warm up their engine, particularly in winter. Modern fuel-injected engines do not need more than 30–60 seconds of warm-up in most conditions. Driving gently brings the engine to operating temperature faster than idling.</li>
          <li><strong>Drive-through queues:</strong> Fast food, coffee, and bank drive-throughs can add 3–8 minutes of idle time per visit. For daily commuters, this alone can account for significant annual waste.</li>
          <li><strong>Loading and unloading:</strong> Delivery drivers, tradespeople, and service technicians often leave vehicles running while attending to jobs — sometimes for 10–30 minutes at each stop.</li>
          <li><strong>Climate control:</strong> Keeping the cabin cool in summer or warm in winter is a primary reason for extended idling. Auxiliary power units (APUs) and battery-electric HVAC systems are available alternatives for commercial fleets.</li>
          <li><strong>Waiting in traffic or parking:</strong> School drop-offs, level crossing waits, and informal parking all contribute to cumulative idle time.</li>
        </ul>

        <h2>Fleet Management and Idle Reduction</h2>
        <p>For commercial fleet operators, reducing idle time is one of the fastest ways to cut fuel costs and meet sustainability targets. The first step is measurement: telematics systems integrated with GPS and engine control units (ECUs) can report idle time per vehicle, per driver, and per day in real time. This data makes it possible to identify the vehicles and routes with the worst idle behaviour and target interventions precisely.</p>
        <p>A structured idle reduction programme typically starts with a written policy — commonly a five-minute maximum idle rule — communicated to all drivers. Driver scorecards that include idle time as a metric create accountability. When combined with telematics alerts that notify drivers when they exceed the idle limit, fleets routinely reduce idling by 30–50% within the first 90 days.</p>
        <p>For long-haul trucking and overnight cab-over operations, auxiliary power units (APUs) are the gold-standard solution. An APU runs a small secondary engine or battery system to power HVAC and electronics without running the main engine, typically burning only 0.1–0.2 gallons per hour versus 0.8–1.0 gal/hr for the main engine. The fuel savings alone can recover the APU's cost within 12–24 months.</p>

        <h2>Environmental Impact of Idling</h2>
        <p>Beyond the financial cost, idling produces real and measurable air quality impacts. A gallon of gasoline burned releases approximately 8.887 kg of CO2, along with nitrogen oxides (NOx), particulate matter, and volatile organic compounds (VOCs). In urban areas, school zones, and hospital precincts — where idling is common — these emissions contribute to localised air pollution that disproportionately affects children and people with respiratory conditions.</p>
        <p>Many jurisdictions have introduced anti-idling laws with fines ranging from $50 to several hundred dollars for idling beyond a set limit (typically 3–5 minutes). In New York City, fines for unnecessary idling start at $350 for commercial vehicles. California, British Columbia, and many European countries have similar or stricter regulations. Compliance is both a legal and reputational issue for fleet operators.</p>
        <p>The CO2 savings from eliminating unnecessary idling across a medium-sized fleet of 50 vehicles can exceed 15,000 kg per year — equivalent to planting several hundred trees or removing a car from the road for more than a year. This calculator's CO2 readout lets you quantify that environmental benefit and include it in sustainability reporting.</p>

        <h2>Idling Fuel Burn by Vehicle Type (Reference)</h2>
        <ul>
          <li><strong>Small passenger car (1.2–1.6L):</strong> 0.5–0.7 gal/hr (1.9–2.6 L/hr)</li>
          <li><strong>Mid-size sedan (2.0–2.5L):</strong> 0.6–0.9 gal/hr (2.3–3.4 L/hr)</li>
          <li><strong>Large SUV or pickup truck (3.5–6.2L):</strong> 0.9–1.5 gal/hr (3.4–5.7 L/hr)</li>
          <li><strong>Light commercial van (diesel):</strong> 0.5–0.8 gal/hr (1.9–3.0 L/hr)</li>
          <li><strong>Heavy-duty diesel truck:</strong> 0.8–1.2 gal/hr (3.0–4.5 L/hr)</li>
          <li><strong>Diesel bus:</strong> 0.8–1.5 gal/hr (3.0–5.7 L/hr)</li>
        </ul>
        <p>These are general reference figures. Actual idle fuel consumption depends on engine size, age, tune, load (accessories, AC), and ambient temperature. Use a fuel flow meter or your vehicle's onboard trip computer for precise figures.</p>
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
