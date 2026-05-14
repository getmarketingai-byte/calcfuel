import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import EmergencyFuelRationingCalc from "./EmergencyFuelRationingCalc";

export const metadata: Metadata = {
  title: "Emergency Fuel Rationing Calculator — Plan Fuel Supply | CalcFuel",
  description: "Plan fuel usage during a shortage or crisis — calculate days of supply, prioritise essential trips, and set a daily fuel budget. Works in miles/gallons and km/litres.",
  alternates: { canonical: "/calculators/emergency-fuel-rationing-calculator" },
};

const relatedTools = [
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and fuel needed for power outages." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Set a weekly or monthly fuel budget and stay on track." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Work out your daily and annual commute fuel spend." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
  { title: "Carpool Fuel Split Calculator", slug: "carpool-fuel-split-calculator", description: "Split fuel costs fairly among carpool passengers." },
];

const faqs = [
  {
    question: "How much fuel should I keep in reserve for emergencies?",
    answer: "Emergency preparedness guidelines from FEMA and the Australian Emergency Management Institute generally recommend maintaining at least a half-tank at all times during normal conditions, and a 2–4 week supply (in approved containers) during declared emergencies or major disruptions. For most passenger vehicles, this means 40–80 litres (10–20 gallons) in addition to your tank. Store fuel in approved, sealed containers away from heat sources, and add a fuel stabiliser if storing for more than 30 days.",
  },
  {
    question: "How long can stored petrol or diesel last?",
    answer: "Regular unleaded petrol degrades within 3–6 months without a fuel stabiliser. With a quality fuel stabiliser (such as STA-BIL or PRI-G), petrol can remain usable for 12–24 months. Diesel is more stable and typically lasts 6–12 months without additives, and 2 years with them. Store fuel in tightly sealed metal or approved HDPE containers, away from sunlight and temperature extremes. Never store fuel in regular plastic containers — vapour pressure and permeation make them dangerous.",
  },
  {
    question: "What is fuel rationing and has it been used before?",
    answer: "Fuel rationing is the controlled distribution of fuel to limit consumption during shortages. Historically, the US and Australia implemented petrol rationing during World War II (1942–1945), and the US imposed limited rationing during the 1973 OPEC oil embargo. More recently, Hurricane Katrina (2005), Hurricane Sandy (2012), and the 2022 Sri Lanka fuel crisis prompted informal or formal rationing. Modern rationing schemes typically use digital licence-plate-based systems (odd/even days), voucher systems, or priority access queues for essential workers.",
  },
  {
    question: "How should I prioritise trips during a fuel shortage?",
    answer: "During a shortage, prioritise: (1) Medical appointments and pharmacy runs — non-negotiable health needs; (2) Work, if working from home is not possible; (3) Essential grocery and food supply runs — consolidate into 1–2 trips per week; (4) School runs if no alternatives exist. Eliminate: recreational driving, multiple short errands (combine into one trip), and any trip under 2 km (walk or cycle instead). Carpooling for work and school can halve your fuel consumption immediately. This calculator's trip table helps you identify which trips consume the most fuel so you can target cuts effectively.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Choose miles/gallons for US drivers or km/litres for Australian and international users. Pre-filled defaults reflect typical values — adjust to match your vehicle.",
  },
  {
    name: "Enter your fuel supply",
    text: "Enter the fuel currently in your tank plus any fuel stored in jerry cans or approved containers. Then enter your vehicle's fuel economy (MPG or L/100km). The calculator will determine your total available range.",
  },
  {
    name: "Add your essential weekly trips",
    text: "Enter up to 5 essential trips per week — work commute, grocery shopping, medical appointments, school runs. For each, enter the one-way or round-trip distance and how many times per week you make it.",
  },
  {
    name: "Review your rationing plan",
    text: "The calculator shows your days of supply, daily fuel budget, and a breakdown of which trips consume the most fuel. Use the 7, 14, and 30-day supply indicators to understand your situation and decide which trips to cut or consolidate.",
  },
];

export default function EmergencyFuelRationingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Emergency Fuel Rationing Calculator"
        description="Plan fuel usage during a shortage or crisis. Calculate days of supply, prioritise essential trips, and set a daily fuel budget."
        url="https://calcfuel.com/calculators/emergency-fuel-rationing-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Emergency Fuel Rationing Calculator", url: "https://calcfuel.com/calculators/emergency-fuel-rationing-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>Emergency Fuel Rationing Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Emergency Fuel Rationing Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Plan your fuel usage during a shortage or crisis. Enter your available fuel supply, vehicle economy, and essential weekly trips to find out how many days your fuel will last and how to prioritise your driving.
      </p>
      <CalcReviewedBy />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <EmergencyFuelRationingCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Preparing for a Fuel Shortage</h2>
        <p>
          Fuel shortages can arise from natural disasters, geopolitical disruptions, infrastructure failures, or sudden demand spikes. While most modern economies maintain strategic petroleum reserves, disruptions at the distribution level — refinery outages, pipeline failures, tanker shortages — can create localised or regional fuel scarcity lasting days to weeks. Having a rationing plan before a shortage occurs dramatically reduces stress and helps you make rational decisions when tensions are high.
        </p>
        <p>
          The first step is understanding your baseline: how much fuel do you currently have, how far will it take you, and how much does your weekly driving consume? This calculator answers all three questions in seconds.
        </p>

        <h2>Government Fuel Rationing: Historical Context</h2>
        <p>
          Formal fuel rationing has been implemented multiple times throughout history. During World War II, both the US and Australia rationed petrol strictly — US civilians received A-class ration books allowing just 3 gallons (11 litres) per week for non-essential driving. The 1973 OPEC oil embargo prompted the US to implement odd/even licence plate rationing at service stations. The 1979 Iranian Revolution triggered a second oil crisis with long queues and informal rationing across Western nations.
        </p>
        <p>
          More recently, natural disasters have created acute localised shortages: Hurricane Katrina (New Orleans, 2005), Hurricane Sandy (New York/New Jersey, 2012), and Cyclone Debbie (Queensland, 2017) each disrupted fuel distribution for 1–3 weeks. The COVID-19 pandemic created brief panic-buying shortages in the UK in 2021. Prudent preparedness means not waiting for official rationing to start managing your fuel supply.
        </p>

        <h2>How Much Fuel to Store</h2>
        <p>
          Standard emergency preparedness guidance recommends maintaining a reserve of at least 2 weeks' normal consumption. For a typical driver covering 15,000 km/year (9,300 miles/year) in a vehicle with 7.5 L/100km fuel economy, weekly consumption is approximately 21.5 litres (5.7 gallons). A 2-week reserve is therefore approximately 43 litres (11.4 gallons) — the equivalent of one full extra tank for most vehicles.
        </p>
        <p>
          Legal storage limits vary by jurisdiction. In most Australian states, households may store up to 250 litres of petrol in approved containers without a special licence. In the US, limits vary by state and municipality but typically allow 25 gallons (95 litres) in safety-approved containers for residential storage. Always check your local regulations and use only UL-listed or Standards Australia-approved fuel containers.
        </p>

        <h2>Prioritising Essential Trips</h2>
        <p>
          When fuel is scarce, not all driving is equal. A rational rationing strategy ranks trips by necessity:
        </p>
        <ul>
          <li><strong>Tier 1 — Non-negotiable:</strong> Medical appointments, dialysis, chemotherapy, emergency pharmacy runs, hospital visits.</li>
          <li><strong>Tier 2 — High priority:</strong> Work travel where remote work is not possible, school runs without alternative transport.</li>
          <li><strong>Tier 3 — Consolidate:</strong> Grocery and supply runs — combine multiple errands into one efficient loop rather than separate trips.</li>
          <li><strong>Tier 4 — Eliminate:</strong> Recreational driving, social visits, non-urgent shopping, any trip walkable or cycleable in under 30 minutes.</li>
        </ul>
        <p>
          Carpooling is one of the highest-leverage strategies: sharing a commute with one neighbour immediately halves both parties' fuel consumption for that trip. The trip table in this calculator shows which trips consume the highest percentage of your total fuel — target those for consolidation first.
        </p>

        <h2>Fuel Economy During a Shortage</h2>
        <p>
          During a shortage, maximising your fuel economy extends your supply. Effective techniques include: maintaining steady speeds between 80–100 km/h on highways (avoiding speeds above 110 km/h where aerodynamic drag increases sharply); ensuring tyres are inflated to maximum recommended pressure; removing roof racks and cargo carriers when not needed; avoiding idling (turn off the engine for stops over 60 seconds); and combining cold starts into one trip rather than making multiple short trips from cold.
        </p>
        <p>
          A driver who normally achieves 10 L/100km can often improve to 7–8 L/100km through disciplined eco-driving — a 20–30% increase in effective supply without refuelling.
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

      <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> This calculator provides estimates only. Actual fuel costs vary based on current fuel prices, driving conditions, vehicle type, and maintenance. Check current Australian fuel prices via <a href="https://www.fuelwatch.wa.gov.au/" className="underline" target="_blank" rel="noopener noreferrer">FuelWatch (WA)</a> or the <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" className="underline" target="_blank" rel="noopener noreferrer">ACCC fuel price guide</a>. This is not financial or professional advice.
      </aside>
      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
