import type { Metadata } from "next";
import Link from "next/link";
import { KEEP_CALCULATORS } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Transport & Trip Cost Calculators",
  description:
    "Browse CalcFuel decision tools for marine, towing, vehicles and trip planning — fuel, range, time and operating costs.",
  alternates: { canonical: "/calculators" },
};

const GROUPS: { title: string; href: string; tools: { slug: string; label: string }[] }[] = [
  {
    title: "Marine",
    href: "/marine",
    tools: [{ slug: "boat-fuel-calculator", label: "Boat Trip Fuel Planner" }],
  },
  {
    title: "Towing & caravans",
    href: "/towing",
    tools: [{ slug: "towing-fuel-cost-calculator", label: "Towing Fuel Cost" }],
  },
  {
    title: "Trip planning",
    href: "/trip-planning",
    tools: [
      { slug: "trip-fuel-cost-calculator", label: "Trip Fuel Cost" },
      { slug: "drive-vs-fly-calculator", label: "Drive vs Fly" },
      { slug: "fuel-budget-planner", label: "Fuel Budget Planner" },
      { slug: "commute-fuel-cost-calculator", label: "Commute Fuel Cost" },
      { slug: "carpool-fuel-split-calculator", label: "Carpool Fuel Split" },
    ],
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    tools: [
      { slug: "motorcycle-fuel-cost-calculator", label: "Motorcycle Fuel Cost" },
      { slug: "fuel-economy-savings-calculator", label: "Fuel Economy & Consumption" },
      { slug: "hybrid-vs-gas-calculator", label: "Hybrid vs Petrol" },
      { slug: "ev-vs-gas-calculator", label: "EV vs Petrol" },
      { slug: "idling-fuel-waste-calculator", label: "Idling Fuel Waste" },
    ],
  },
  {
    title: "More fuel tools",
    href: "/calculators/fuel-energy",
    tools: [
      { slug: "fuel-surcharge-calculator", label: "Fuel Surcharge" },
      { slug: "generator-fuel-calculator", label: "Generator Fuel" },
      { slug: "hydrogen-vs-gas-calculator", label: "Hydrogen vs Petrol" },
      { slug: "ev-charging-cost-calculator", label: "EV Charging Cost" },
      { slug: "ifta-fuel-tax-calculator", label: "IFTA Fuel Tax" },
      { slug: "fuel-tax-credit-calculator", label: "Fuel Tax Credit" },
      { slug: "emergency-fuel-rationing-calculator", label: "Emergency Fuel Rationing" },
    ],
  },
];

const keepSet = new Set<string>(KEEP_CALCULATORS);

export default function CalculatorsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Calculate
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Decision tools for real-world transport and trip costs — not a general calculator directory.
      </p>

      <div className="space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{group.title}</h2>
              <Link href={group.href} className="text-sm text-orange-600 hover:underline">
                View hub
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.tools
                .filter((t) => keepSet.has(t.slug))
                .map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/calculators/${t.slug}`}
                      className="block rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white hover:border-orange-400"
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
