import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import { FEATURED_TOOLS } from "@/lib/portfolio";

export const metadata: Metadata = createPageMetadata({
  title: "CalcFuel — Transport & Trip Cost Decisions",
  description:
    "Make better real-world transport and trip-cost decisions. Calculate fuel, range, time and operating costs for boats, towing, vehicles and road trips.",
  path: "/",
});

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-orange-100 dark:border-orange-950">
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <p className="text-sm font-semibold tracking-wide text-orange-600 dark:text-orange-400 mb-3">
            CalcFuel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl leading-tight">
            Better transport and trip-cost decisions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Calculate fuel, range, time and operating costs for boats, towing, vehicles and trips —
            then choose the option that makes sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators/boat-fuel-calculator"
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 text-sm transition-colors"
            >
              Plan a boat trip
            </Link>
            <Link
              href="/calculators/trip-fuel-cost-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white font-semibold px-5 py-3 text-sm hover:border-orange-400 transition-colors"
            >
              Estimate trip fuel
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start with a decision</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          Flagship planners for the trips people actually take — not a directory of seventy thin tools.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-orange-400 dark:hover:border-orange-500 transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-2">
                {tool.pillar}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{tool.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 90 }} className="max-w-6xl mx-auto px-4 mb-8" />

      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Marine",
              href: "/marine",
              text: "Boat trip fuel, cost, range and reserve planning.",
            },
            {
              title: "Towing & caravans",
              href: "/towing",
              text: "Fuel penalty and extra cost when you tow.",
            },
            {
              title: "Trip planning",
              href: "/trip-planning",
              text: "Road trips, drive vs fly, and fuel budgets.",
            },
          ].map((pillar) => (
            <Link key={pillar.href} href={pillar.href} className="block group">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{pillar.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How CalcFuel works</h2>
        <ol className="space-y-3 text-gray-600 dark:text-gray-300 list-decimal list-inside max-w-2xl">
          <li>Start from the trip or asset decision you need to make.</li>
          <li>Enter distance, efficiency and price — results update as you type.</li>
          <li>Compare scenarios (speed, mode, drive vs fly) before you commit.</li>
        </ol>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Read our{" "}
          <Link href="/methodology" className="text-orange-600 hover:underline">
            methodology
          </Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="text-orange-600 hover:underline">
            editorial policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
