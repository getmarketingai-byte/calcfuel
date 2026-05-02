import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Fuel & Energy Calculators — Gas, EV, Hybrid, Fleet & Commute Tools",
  description: "Free fuel and energy calculators: trip cost, commute cost, EV vs gas, hybrid break-even, drive vs fly, IFTA tax, hydrogen vs gas, marine fuel, emergency rationing, and more. Supports miles/MPG and km/L/100km.",
};

const tools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip based on distance, MPG, and gas price." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "See your daily, weekly, monthly, and annual commuting fuel costs." },
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare 5-year or 10-year total cost of ownership for electric vs gas vehicles." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime, fuel consumption, and outage fuel requirements." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save per year by improving driving habits and vehicle maintenance." },
  { title: "Hybrid vs Gas Calculator", slug: "hybrid-vs-gas-calculator", description: "Find the break-even point where a hybrid car's fuel savings offset the higher purchase price." },
  { title: "Carpool Fuel Cost Calculator", slug: "carpool-fuel-split-calculator", description: "Split gas costs fairly between carpool passengers, with optional driver surcharge." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your monthly and annual household fuel budget across up to 3 vehicles." },
  { title: "Fuel Surcharge Calculator", slug: "fuel-surcharge-calculator", description: "Calculate trucking and freight fuel surcharges using the DOE diesel index formula." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate the annual fuel and dollar cost of engine idling for personal vehicles and fleets." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total cost of driving vs flying for 1–4+ passengers, including time value." },
  { title: "IFTA Fuel Tax Calculator", slug: "ifta-fuel-tax-calculator", description: "Estimate quarterly IFTA fuel tax owed or refund across multiple jurisdictions." },
  { title: "Hydrogen vs Gas Cost Calculator", slug: "hydrogen-vs-gas-calculator", description: "Compare cost per mile for hydrogen fuel cell, gasoline, and electric vehicles." },
  { title: "Emergency Fuel Rationing Calculator", slug: "emergency-fuel-rationing-calculator", description: "Plan fuel usage during a shortage — calculate days of supply and essential trip priorities." },
  { title: "Boat Fuel Calculator", slug: "boat-fuel-calculator", description: "Estimate marine fuel burn rate and plan boat trips by engine HP, hull type, and throttle." },
];

export default function FuelEnergyHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Fuel & Energy Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Fuel & Energy Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free fuel calculators for road trips, daily commutes, EV comparisons, generator planning, and fuel economy improvements. All tools support both imperial and metric units.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <article className="prose max-w-none">
        <h2>Fuel & Energy Calculators for Drivers and Homeowners</h2>
        <p>Whether you are planning a road trip, budgeting your daily commute, deciding between an electric and petrol vehicle, or preparing for a power outage, understanding your fuel costs is essential. These calculators turn complex fuel consumption maths into instant answers — no spreadsheet required.</p>
        <p>All tools support both imperial (miles, MPG, gallons) and metric (km, L/100km, litres) measurement systems, making them useful for drivers in Australia, the US, UK, Canada, New Zealand, and anywhere else in the world.</p>

        <h2>Which Calculator Should I Use?</h2>
        <ul>
          <li><strong>Going on a road trip?</strong> Use the <a href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</a> to estimate total gas cost before you leave.</li>
          <li><strong>Wondering what your commute really costs?</strong> The <a href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</a> shows your annual spend on getting to work.</li>
          <li><strong>Considering an EV purchase?</strong> The <a href="/calculators/ev-vs-gas-calculator">EV vs Gas Calculator</a> compares 5-year and 10-year total cost of ownership side by side.</li>
          <li><strong>Considering a hybrid instead?</strong> The <a href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Gas Calculator</a> finds the exact break-even point where fuel savings offset the hybrid price premium.</li>
          <li><strong>Planning for power outages?</strong> The <a href="/calculators/generator-fuel-calculator">Generator Fuel Calculator</a> tells you how long your generator will run and how much fuel to stockpile.</li>
          <li><strong>Trying to reduce your fuel bills without buying a new car?</strong> The <a href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</a> quantifies the dollar impact of simple driving improvements.</li>
          <li><strong>Splitting a road trip or carpool?</strong> The <a href="/calculators/carpool-fuel-split-calculator">Carpool Fuel Cost Calculator</a> divides gas costs fairly among passengers.</li>
          <li><strong>Budgeting household fuel spend?</strong> The <a href="/calculators/fuel-budget-planner">Fuel Budget Planner</a> tracks monthly and annual costs across up to 3 vehicles.</li>
          <li><strong>Running a trucking or delivery business?</strong> The <a href="/calculators/fuel-surcharge-calculator">Fuel Surcharge Calculator</a> computes the correct surcharge using the DOE diesel index formula.</li>
          <li><strong>Managing a vehicle fleet?</strong> The <a href="/calculators/idling-fuel-waste-calculator">Idling Fuel Waste Calculator</a> shows the annual cost of unnecessary engine idling across your entire fleet.</li>
          <li><strong>Should you drive or fly?</strong> The <a href="/calculators/drive-vs-fly-calculator">Drive vs Fly Calculator</a> compares total costs including fuel, tolls, parking, time value, and flight tickets for 1–4+ passengers.</li>
          <li><strong>Running a trucking business?</strong> The <a href="/calculators/ifta-fuel-tax-calculator">IFTA Fuel Tax Calculator</a> estimates quarterly fuel tax owed or refund across multiple jurisdictions.</li>
          <li><strong>Considering a hydrogen vehicle?</strong> The <a href="/calculators/hydrogen-vs-gas-calculator">Hydrogen vs Gas Cost Calculator</a> compares cost per mile for hydrogen fuel cell, gasoline, and electric vehicles side by side.</li>
          <li><strong>Preparing for a fuel shortage or crisis?</strong> The <a href="/calculators/emergency-fuel-rationing-calculator">Emergency Fuel Rationing Calculator</a> calculates your days of supply and helps prioritise essential trips.</li>
          <li><strong>Planning a boat trip?</strong> The <a href="/calculators/boat-fuel-calculator">Boat Fuel Calculator</a> estimates marine fuel consumption by engine HP and hull type, with trip cost and range calculations.</li>
        </ul>

        <h2>Understanding Fuel Efficiency Units</h2>
        <p>The two most common fuel efficiency measurement systems are MPG (miles per gallon) used in the US and UK, and L/100km (litres per 100 kilometres) used in Australia, Canada, and Europe. These units measure the same thing differently: MPG tells you how far you travel on one unit of fuel, while L/100km tells you how much fuel you consume over a fixed distance.</p>
        <p>To convert: MPG to L/100km = 235.21 ÷ MPG. L/100km to MPG = 235.21 ÷ L/100km. All calculators on this page accept both formats directly — simply select your preferred unit using the toggle on each tool.</p>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
