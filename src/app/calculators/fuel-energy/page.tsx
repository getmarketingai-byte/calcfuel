import type { Metadata } from "next";
import Link from "next/link";
import HubToolGrid from "@/components/HubToolGrid";
import { CommercialPlacement } from "@/components/calc";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fuel & Energy Calculators — Trip Cost, Marine, Towing & Vehicles",
  description:
    "Transport fuel calculators: boat trip planning, towing, trip fuel, drive vs fly, hybrid/EV running cost, motorcycle and fuel budgets.",
  path: "/calculators/fuel-energy",
});

const tools = [
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Marine fuel, cost, time and safe range." },
  { title: "Towing Fuel Cost", slug: "towing-fuel-cost-calculator", description: "Extra fuel when towing a trailer or caravan." },
  { title: "Trip Fuel Cost", slug: "trip-fuel-cost-calculator", description: "Road trip, return, commute and carpool modes." },
  { title: "Drive vs Fly", slug: "drive-vs-fly-calculator", description: "Total trip cost comparison." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Weekly, monthly and annual fuel spend." },
  { title: "Motorcycle Fuel Cost", slug: "motorcycle-fuel-cost-calculator", description: "Ride or commute with bike-class presets." },
  { title: "Fuel Economy & Consumption", slug: "fuel-economy-savings-calculator", description: "MPG ↔ L/100km and improvement savings." },
  { title: "Hybrid vs Petrol", slug: "hybrid-vs-gas-calculator", description: "Running-cost break-even." },
  { title: "EV vs Petrol", slug: "ev-vs-gas-calculator", description: "Multi-year energy and ownership cost." },
  { title: "Idling Fuel Waste", slug: "idling-fuel-waste-calculator", description: "Cost of engine idle time." },
  { title: "Fuel Surcharge", slug: "fuel-surcharge-calculator", description: "Freight fuel surcharge (demoted tool)." },
  { title: "Generator Fuel", slug: "generator-fuel-calculator", description: "Generator runtime and fuel (demoted tool)." },
];

export default function FuelEnergyHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculate</Link>
        <span className="mx-2">/</span>
        <span>Fuel &amp; Energy</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Fuel &amp; Energy Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Decision tools for real-world transport fuel costs — marine, towing, vehicles and trips. Prefer topical hubs:{" "}
        <Link href="/marine" className="text-orange-600 hover:underline">Marine</Link>,{" "}
        <Link href="/towing" className="text-orange-600 hover:underline">Towing</Link>,{" "}
        <Link href="/vehicles" className="text-orange-600 hover:underline">Vehicles</Link>,{" "}
        <Link href="/trip-planning" className="text-orange-600 hover:underline">Trip Planning</Link>.
      </p>
      <HubToolGrid
        hub="fuel-energy"
        tools={tools}
        cardClassName="block p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 hover:shadow-lg hover:border-orange-400 transition-all group"
      />
      <CommercialPlacement kind="adsense" slot="3651327789" className="my-8" />
    </div>
  );
}
