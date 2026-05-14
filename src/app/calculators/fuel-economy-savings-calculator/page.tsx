import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import FuelEconomySavingsCalc from "./FuelEconomySavingsCalc";

export const metadata: Metadata = {
  title: "Fuel Economy Calculator — L/100km & Fuel Savings | CalcFuel",
  description: "Calculate how much you save per year by improving your fuel economy. See the dollar impact of tire pressure, speed reduction, AC use, and weight removal on your annual fuel bill.",
  alternates: { canonical: "/calculators/fuel-economy-savings-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily and annual commute fuel costs." },
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare electric vehicle vs gas car total cost of ownership." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and fuel consumption." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your weekly and monthly fuel budget." },
];

const faqs = [
  { question: "How much money does 1 MPG improvement save per year?", answer: "The savings from 1 MPG improvement depend on your annual mileage and fuel price. At 12,000 miles/year and $3.50/gallon: improving from 25 to 26 MPG saves approximately $64/year. Going from 20 to 21 MPG saves $100/year. The math: Annual Savings = Annual Miles × Gas Price × (1/Current MPG − 1/New MPG). Small MPG gains matter more at lower base efficiency." },
  { question: "Does tire pressure really affect fuel economy?", answer: "Yes. Under-inflated tyres by 10 psi can reduce fuel economy by 1–3%. For a vehicle getting 30 MPG at 12,000 miles/year and $3.50/gallon, that is a $42–$126/year loss. Maintaining correct tyre pressure is one of the cheapest and easiest fuel economy improvements — takes 5 minutes at any petrol station. Check pressure monthly and before long trips." },
  { question: "How much does reducing speed by 10 mph save?", answer: "Reducing highway speed from 75 mph to 65 mph typically improves fuel economy by 2–4 MPG for most vehicles. At 12,000 highway miles/year and $3.50/gallon with a 30 MPG baseline, a 2 MPG gain saves approximately $111/year. Aerodynamic drag increases with the square of velocity — each additional 10 mph increase has an exponentially larger fuel cost." },
  { question: "Does using air conditioning reduce MPG?", answer: "Air conditioning typically reduces fuel economy by 3–25% depending on conditions. At highway speeds the impact is smaller (5–10%) because the engine is already working hard. In stop-and-go traffic with AC running, the impact can reach 20–25%. For short city trips on hot days, consider using ventilation or cracking windows at speeds below 40 mph, then switching to AC at higher speeds where the aerodynamic cost of open windows exceeds the AC cost." },
  { question: "How much does removing weight improve fuel economy?", answer: "Every 100 lbs (45 kg) of extra weight reduces fuel economy by approximately 1–2% (about 0.2–0.4 MPG for an average vehicle). Common weight culprits: roof cargo boxes (30–50 lbs), spare tyres in the boot beyond the standard spare, sports equipment, and tools left permanently in the vehicle. For a 30 MPG vehicle at 12,000 miles/year and $3.50/gallon, removing 200 lbs saves approximately $56–$112/year." },
];

const howToSteps = [
  { name: "Enter your annual mileage", text: "Enter how many miles or kilometres you drive annually. Use your odometer records or estimate based on typical weekly driving." },
  { name: "Enter your current fuel economy", text: "Enter your vehicle's current real-world MPG or L/100km — not the official rated figure. Check your trip computer or calculate from recent fill-ups (distance driven ÷ fuel used)." },
  { name: "Enter your fuel price", text: "Enter the current price per gallon or per litre at your local station." },
  { name: "Select planned improvements", text: "Check all the fuel-saving behaviours you plan to implement. The calculator shows the MPG gain each improvement provides and updates the savings estimate in real time." },
  { name: "Review annual savings", text: "The calculator shows your current annual fuel cost, projected new cost with improvements, and total annual dollar savings." },
];

export default function FuelEconomySavingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Economy Savings Calculator"
        description="Calculate annual fuel savings from improving your MPG through tire pressure, speed reduction, AC minimisation, weight removal, and smoother driving habits."
        url="https://calcfuel.com/calculators/fuel-economy-savings-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Fuel Economy Savings Calculator", url: "https://calcfuel.com/calculators/fuel-economy-savings-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel & Energy</Link><span className="mx-2">/</span>
        <span>Fuel Economy Savings Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Fuel Economy Savings Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">See exactly how much you save per year by improving your driving habits and vehicle maintenance. Select the changes you plan to make and get an instant dollar savings estimate.</p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <FuelEconomySavingsCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>Why Fuel Economy Improvements Add Up Faster Than You Think</h2>
        <p>The relationship between fuel economy and cost savings is non-linear at lower MPG values. Going from 15 MPG to 16 MPG saves more money than going from 30 MPG to 31 MPG — even though both are a 1 MPG gain. This is because fuel consumption is the inverse of fuel economy: a 15 MPG vehicle uses 6.67 gallons per 100 miles while a 16 MPG vehicle uses 6.25 gallons — a saving of 0.42 gallons. A 30 MPG vehicle improving to 31 MPG saves only 0.11 gallons per 100 miles.</p>
        <p>This means low-efficiency vehicle owners (SUVs, trucks, older vehicles) get disproportionately larger dollar savings from the same percentage improvement — making the behaviour changes in this calculator even more valuable for high-fuel-use drivers.</p>

        <p>According to the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" target="_blank" rel="noopener noreferrer">ACCC fuel price monitoring</a>, Australian petrol prices vary significantly by region and day of the week.</p>

        <h2>The Five Most Effective Fuel Economy Improvements</h2>
        <h3>1. Maintain Correct Tyre Pressure</h3>
        <p>Under-inflated tyres flex more with each rotation, generating heat and rolling resistance. Maintaining tyres at the recommended PSI (found on the sticker inside the driver's door, not on the tyre sidewall) reduces rolling resistance and can improve fuel economy by 0.5–3.3%. Check pressure monthly using a quality gauge — digital gauges are more accurate than stick-type gauges. Add approximately 1 PSI for cold weather (tyre pressure drops 1 PSI per 10°F / 6°C drop in temperature).</p>

        <h3>2. Reduce Highway Speed</h3>
        <p>Aerodynamic drag is proportional to the square of vehicle speed. At 75 mph versus 55 mph, a vehicle experiences 85% more aerodynamic drag. Most vehicles achieve peak fuel efficiency at 55–65 mph (88–105 km/h). Reducing highway cruise speed from 80 mph to 65 mph typically improves fuel economy by 15–25% — the single largest behavioural lever available to most drivers. Using cruise control maintains constant speed and avoids the fuel waste of repeated acceleration cycles.</p>

        <h3>3. Minimise Air Conditioning Use</h3>
        <p>Air conditioning compressors draw significant engine power — 3–10% of engine output in mild conditions and up to 15–20% in extreme heat with a cold cabin to chill. The impact is most severe in city driving where engine RPM is lower and the AC load represents a larger fraction of total output. Practical strategies: pre-cool the cabin using ventilation before engaging AC; use recirculation mode to cool already-conditioned air faster; park in shade to reduce initial cooling load; use AC at highway speeds but consider ventilation at low speeds where opening windows has minimal aerodynamic cost.</p>

        <h3>4. Reduce Vehicle Weight</h3>
        <p>Every kilogram reduces fuel economy marginally — but the cumulative effect of eliminating unnecessary cargo is real. Common offenders: permanently-carried sports equipment, tools, sand bags left from winter, and heavy aftermarket accessories. A roof cargo carrier adds 50–70 lbs of weight and significant aerodynamic drag even when empty — remove it when not in use. Lighter vehicles also place less stress on tyres and brakes, reducing wear costs beyond just fuel.</p>

        <h3>5. Smooth Acceleration and Braking</h3>
        <p>Aggressive acceleration forces the engine to operate at high load, consuming fuel rapidly. Anticipating traffic flow and accelerating smoothly to cruising speed — rather than flooring the accelerator to beat adjacent traffic — is one of the most effective fuel-saving behaviours available. Similarly, coasting to a stop rather than braking at the last moment recovers distance from your momentum without additional fuel, reducing both fuel use and brake wear. Hypermiling practitioners achieve 20–40% better fuel economy than the EPA estimate through these techniques alone.</p>
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
