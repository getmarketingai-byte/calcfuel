import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import BoatFuelCalc from "./BoatFuelCalc";

export const metadata: Metadata = {
  title: "Boat Fuel Calculator — Marine Fuel Cost Estimator | CalcFuel",
  description: "Calculate marine fuel burn rate by engine HP, hull type, and throttle. Plan boat trips with fuel needed, cost, and range estimates. Supports nautical miles, gallons, and litres.",
  alternates: { canonical: "/calculators/boat-fuel-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and fuel needs for outages." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your monthly fuel budget across multiple vehicles." },
  { title: "Emergency Fuel Rationing Calculator", slug: "emergency-fuel-rationing-calculator", description: "Plan fuel usage during shortages — calculate days of supply." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily and annual commute fuel costs." },
];

const faqs = [
  {
    question: "How much fuel does a boat use per hour?",
    answer: "Fuel consumption depends heavily on engine size, hull type, throttle level, and load. A general rule of thumb is 0.5 gallons per hour per 10 horsepower at full throttle. A 150 HP outboard at 75% throttle burns approximately 5–7 gallons per hour. Displacement hull boats (trawlers, sailboats with engine assist) are significantly more efficient — typically 1–3 gallons per hour for the same distance covered. Always consult your owner's manual for manufacturer specifications."
  },
  {
    question: "What is the one-third rule for boat fuel?",
    answer: "The one-third rule is a fundamental marine safety guideline: use the first third of your fuel to travel out, the second third to return, and keep the final third as a reserve for unexpected conditions, headwinds, detours, or emergencies. This means your usable range is approximately two-thirds of what a full tank would theoretically provide. The calculator applies an 85% safety factor to range estimates, which aligns with conservative one-third rule application."
  },
  {
    question: "How do I convert boat fuel consumption to miles per gallon?",
    answer: "Divide your speed in knots (nautical miles per hour) by your fuel burn rate in gallons per hour. For example, at 25 knots burning 10 gallons per hour, your fuel economy is 2.5 nautical miles per gallon. Note that boat fuel economy is dramatically lower than cars — 2–5 NM/gal is typical for planing hulls, while displacement hulls may achieve 5–10+ NM/gal at lower speeds. Speed is the biggest factor: doubling speed roughly quadruples fuel consumption for planing hulls."
  },
  {
    question: "How much does it cost to fill up a boat?",
    answer: "Fuel costs depend on tank size and current marine diesel or petrol prices. A typical recreational powerboat has a 60–120 gallon tank. At $4.50/gallon for marine fuel, that is $270–$540 to fill from empty. Larger sportfishing boats with 300+ gallon tanks can cost $1,350+ per fill. Many marinas charge a premium over pump prices — factor in 10–20 cents/gallon for marina convenience pricing when budgeting trips."
  },
];

const howToSteps = [
  {
    name: "Select hull type",
    text: "Choose the hull type that best matches your vessel. Planing hulls (speedboats, bowriders) have higher fuel consumption at speed. Displacement hulls (trawlers, sailboats) are more efficient. This affects the burn rate calculation."
  },
  {
    name: "Enter engine horsepower and count",
    text: "Enter the horsepower rating per engine from your owner's manual or engine label. Select the number of engines. Total power determines your baseline fuel consumption rate."
  },
  {
    name: "Set throttle level and cruising speed",
    text: "Enter your typical cruising throttle percentage and speed in knots. Cruise throttle is usually 60–75%. Wide-open throttle (WOT) is 100%. Speed and throttle dramatically affect fuel burn — reducing throttle from 100% to 75% can cut fuel use by 40–50%."
  },
  {
    name: "Enter trip distance and fuel price for cost estimate",
    text: "Optionally enter your planned trip distance in nautical miles and the current marina fuel price per gallon or litre. The calculator will show total fuel needed and estimated trip cost. Enter tank capacity to see your safe range (applying the one-third reserve rule)."
  },
];

export default function BoatFuelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Boat Fuel Calculator"
        description="Calculate marine fuel consumption by engine HP, hull type, and throttle. Plan boat trips with fuel needed, estimated cost, and range."
        url="https://calcfuel.com/calculators/boat-fuel-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Boat Fuel Calculator", url: "https://calcfuel.com/calculators/boat-fuel-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel & Energy</Link><span className="mx-2">/</span>
        <span>Boat Fuel Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Boat Fuel Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Estimate marine fuel consumption by engine horsepower, hull type, and throttle. Calculate fuel needed and cost for any boat trip, and check your safe cruising range.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <BoatFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Marine Fuel Consumption Works</h2>
        <p>Unlike car fuel economy, which is relatively predictable at highway speeds, boat fuel consumption varies dramatically based on hull design, engine configuration, throttle position, and sea conditions. Understanding these variables is essential for safe trip planning — running out of fuel on water is far more dangerous than on land.</p>
        <p>The most important principle in marine fuel planning is the <strong>one-third rule</strong>: allocate one-third of your fuel for the outbound leg, one-third for the return, and keep one-third as an emergency reserve. This calculator applies a conservative 85% factor to range estimates, reflecting this safety margin.</p>

        <h2>Hull Type and Its Effect on Fuel Burn</h2>
        <h3>Planing Hulls</h3>
        <p>Planing hulls (speedboats, bowriders, centre consoles) ride on top of the water at speed, which is efficient at high speeds but inefficient at low speeds when the hull is pushing through water. Fuel consumption rises steeply as you accelerate through the &ldquo;hump&rdquo; — the point where the boat transitions from displacement to planing mode — but then levels off at cruise. Most recreational planing hull boats consume 5–15 gallons per hour at cruise.</p>

        <h3>Displacement Hulls</h3>
        <p>Displacement hulls (trawlers, full-keel sailboats, lobster-style cruisers) push through water rather than riding on top of it. Speed is limited by hull length (hull speed = 1.34 × √(waterline length in feet) in knots), but fuel efficiency is excellent. A 40-foot trawler might cruise at 8 knots on 3–4 gallons per hour, achieving 2 nautical miles per gallon — comparable to some planing hulls going twice as fast.</p>

        <h3>Pontoon Boats</h3>
        <p>Pontoon boats have unique hydrodynamics — their parallel tube hull design creates significant drag at higher speeds. Smaller pontoons (20–22 ft with 115–150 HP) typically burn 5–8 gallons per hour. Tritoon configurations with larger engines (250+ HP) can burn 15–20 gallons per hour at full throttle. Pontoons are typically most fuel-efficient at 15–20 mph cruise.</p>

        <h2>The HP-Based Fuel Consumption Formula</h2>
        <p>Marine engineers use a simplified rule of thumb: <strong>0.5 gallons per hour per 10 horsepower at full throttle</strong> for typical 4-stroke gasoline outboards. This calculator implements this as 0.05 gal/hr per HP, adjusted for throttle position using a cubic throttle-to-load relationship (since fuel consumption does not scale linearly with throttle) and a hull efficiency factor.</p>
        <p>For exact fuel consumption data, consult your engine manufacturer's fuel consumption curves, which are included in most owner's manuals and are published for popular engines like Yamaha, Mercury, Honda, and Evinrude/BRP. These curves show actual gal/hr at various RPM settings, which you can cross-reference with your tachometer.</p>

        <p>According to the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" target="_blank" rel="noopener noreferrer">ACCC fuel price monitoring</a>, Australian petrol prices vary significantly by region and day of the week.</p>

        <h2>Fuel Planning for Overnight and Offshore Passages</h2>
        <p>For passages beyond day-trip range, fuel planning becomes critical. Key considerations:</p>
        <ul>
          <li><strong>Headwinds and current:</strong> Fighting a 15-knot headwind or 2-knot adverse current can increase fuel consumption by 20–40%. Plan for worst-case conditions.</li>
          <li><strong>Load:</strong> A heavily loaded boat — full water tanks, guests, dive gear — requires more power and burns more fuel. Add 10–15% for heavy loads.</li>
          <li><strong>Sea state:</strong> Rough conditions (2–4 foot chop) significantly increase fuel consumption as the engine works harder to maintain speed.</li>
          <li><strong>Jerrycan reserves:</strong> For offshore passages, many experienced cruisers carry additional fuel in portable jerrycans — typically 20–40 gallons of reserve beyond the main tank.</li>
          <li><strong>Fuel availability:</strong> Research fuel dock availability at your destination and along your route. Remote anchorages and small island marinas may not have fuel or may charge significant premiums.</li>
        </ul>

        <h2>Marine Fuel Types and Prices</h2>
        <p>Most recreational powerboats use regular unleaded petrol (87–89 octane) from marine fuel docks. Many newer four-stroke outboards and all diesel inboards require E0 (ethanol-free) fuel, which is available at most marine fuel docks and priced 10–30 cents per gallon above regular pump prices. Ethanol can damage rubber fuel components and absorb water, creating phase separation in tanks — always verify your engine's ethanol compatibility.</p>
        <p>Diesel inboards (common on larger cruisers and sailboats) typically consume diesel at significantly lower rates than gasoline outboards of equivalent power. Diesel also has higher energy density, providing more power per litre. However, diesel marina prices vary widely — budget $4.50–$6.00/gallon in most US coastal areas, and $1.80–$2.50/litre in Australia.</p>
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

      <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual fuel costs vary based on current fuel prices, driving conditions, vehicle type, and maintenance. Check current Australian fuel prices via <a href="https://www.fuelwatch.wa.gov.au/" className="underline" target="_blank" rel="noopener noreferrer">FuelWatch (WA)</a> or the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" className="underline" target="_blank" rel="noopener noreferrer">ACCC fuel price guide</a>. This is not financial or professional advice.
      </aside>
      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
