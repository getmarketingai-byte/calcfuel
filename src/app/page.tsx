import type { Metadata } from "next";
import Link from "next/link";
import BarChart from "@/components/charts/BarChart";
import { createPageMetadata } from "@/lib/seo";
import { FEATURED_TOOLS } from "@/lib/portfolio";
import PricesLastUpdated from "@/components/PricesLastUpdated";
import {
  FIVE_CITY_AVERAGE,
  PETROL_BY_CITY,
  SOURCE_REPORT,
  formatAudPerLitre,
} from "@/lib/fuel-prices";

export const metadata: Metadata = createPageMetadata({
  title: "CalcFuel — Transport & Trip Cost Decisions",
  description:
    "What a trip, tow or vehicle really costs to run in Australia. 17 calculators priced on this week's ACCC fuel data, formulas shown.",
  path: "/",
});

export default function HomePage() {
  const dearest = [...PETROL_BY_CITY].sort((a, b) => b.average - a.average)[0];
  const cheapest = [...PETROL_BY_CITY].sort((a, b) => a.average - b.average)[0];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-orange-100 dark:border-orange-950">
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
          <p className="text-sm font-semibold tracking-wide text-orange-700 dark:text-orange-400 mb-3">
            CalcFuel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl leading-tight">
            What will this trip actually cost?
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            Fuel, range, time and running costs for boats, caravans, cars and road trips —
            calculated from current Australian prices, with the formula and its assumptions shown
            on every page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators/trip-fuel-cost-calculator"
              className="inline-flex items-center justify-center rounded-lg bg-orange-700 hover:bg-orange-800 text-white font-semibold px-5 py-3 text-sm transition-colors"
            >
              Cost a trip
            </Link>
            <Link
              href="/data/australian-fuel-prices"
              className="inline-flex items-center justify-center rounded-lg border border-gray-400 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white font-semibold px-5 py-3 text-sm hover:border-orange-500 transition-colors"
            >
              Today&rsquo;s fuel prices
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              value: formatAudPerLitre(FIVE_CITY_AVERAGE.petrol),
              label: "Unleaded, five-city average",
            },
            {
              value: formatAudPerLitre(FIVE_CITY_AVERAGE.diesel),
              label: "Diesel, five-city average",
            },
            { value: dearest.city, label: `Dearest capital, ${dearest.average.toFixed(1)} cpl` },
            { value: cheapest.city, label: `Cheapest capital, ${cheapest.average.toFixed(1)} cpl` },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-6">
          <PricesLastUpdated className="mb-3" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Daily averages on {SOURCE_REPORT.pricesToLabel}, from the ACCC weekly fuel price
            monitoring report.{" "}
            <Link
              href="/data/australian-fuel-prices"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Per-city figures and the 2026 excise timeline
            </Link>
            . For the live ACCC cycle phase in the five largest cities, see{" "}
            <Link
              href="/when-to-buy-petrol"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              when to buy petrol
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          What unleaded costs, city by city
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2 max-w-2xl">
          Daily averages on {SOURCE_REPORT.pricesToLabel}, against the same cities on 20 February
          2026 — before the Middle East conflict and two changes to fuel excise moved the whole
          curve.
        </p>
        <BarChart
          title="Average unleaded price by Australian capital city"
          description={`Daily average retail unleaded prices in cents per litre on ${SOURCE_REPORT.pricesToLabel}, compared with 20 February 2026, for eight Australian capital cities.`}
          data={[...PETROL_BY_CITY]
            .sort((a, b) => b.average - a.average)
            .map((c) => ({
              label: c.city,
              value: c.average,
              compare: c.preConflict,
              highlight: c.city === dearest.city,
            }))}
          unitSuffix=" cpl"
          seriesLabel={SOURCE_REPORT.pricesToLabel}
          compareLabel="20 February 2026"
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Start with the decision
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
          Each of these is built around a question someone has to answer before committing money
          or fuel — not around a formula.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-orange-500 transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-400 mb-2">
                {tool.pillar}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{tool.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Marine",
              href: "/marine",
              text: "Why burn rate rises with roughly the cube of speed, what the one-third rule actually reserves, and how to get a burn figure you can trust.",
            },
            {
              title: "Towing & caravans",
              href: "/towing",
              text: "Why frontal area beats mass, what each trailer type typically adds, and the one lever — speed — that recovers most of it.",
            },
            {
              title: "Trip planning",
              href: "/trip-planning",
              text: "The three mistakes in every trip estimate, what common Australian routes cost, and how to split a carpool without an argument.",
            },
          ].map((pillar) => (
            <Link key={pillar.href} href={pillar.href} className="block group">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{pillar.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            How CalcFuel works
          </h2>
          <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-outside pl-5">
            <li>
              Start from the decision — a passage, a tow, a commute, a vehicle you are weighing up.
            </li>
            <li>
              Enter distance, efficiency and price. Results update as you type; nothing is stored
              and nothing is sent to a server.
            </li>
            <li>
              Compare scenarios — a different cruise speed, driving instead of flying, this vehicle
              against that one — before you commit.
            </li>
            <li>
              Check the assumptions. Every calculator states the formula it uses and what it
              deliberately leaves out.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Why every price here carries a date
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Australian fuel excise was cut by 32 cpl in April 2026, reduced to a 16 cpl discount in
            July, and fully restored to 53.7 cpl on 3 August. Any running cost calculated earlier
            this year is now wrong by a wide margin.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            So every price on this site is transcribed from a named ACCC report and carries the
            date it applies to, rather than being estimated. When the report changes, the defaults
            change. The dataset, its sources and how it is maintained are on the{" "}
            <Link
              href="/data/australian-fuel-prices"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              fuel price data
            </Link>{" "}
            page.
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            Read our{" "}
            <Link href="/methodology" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
              methodology
            </Link>
            ,{" "}
            <Link
              href="/editorial-policy"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              editorial policy
            </Link>{" "}
            and{" "}
            <Link href="/corrections" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
              corrections process
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
