import type { Metadata } from "next";
import Link from "next/link";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import BarChart from "@/components/charts/BarChart";
import { createPageMetadata } from "@/lib/seo";
import {
  CURRENT_EXCISE_CPL,
  DIESEL_BY_CITY,
  EXCISE_RESTORATION_PUMP_IMPACT_CPL,
  EXCISE_TIMELINE,
  FIVE_CITY_AVERAGE,
  PETROL_BY_CITY,
  REGIONAL_AVERAGE,
  SOURCE_REPORT,
  formatAudPerLitre,
} from "@/lib/fuel-prices";

export const metadata: Metadata = createPageMetadata({
  title: "Australian Fuel Prices by City",
  description:
    "Current average unleaded and diesel prices for every Australian capital city, the site-level price spread, and the 2026 fuel excise timeline — transcribed from the ACCC weekly monitoring report and used as the default price in every CalcFuel calculator.",
  path: "/data/australian-fuel-prices",
});

const spread = (c: { lowestSite: number; highestSite: number }) =>
  (c.highestSite - c.lowestSite).toFixed(1);

export default function FuelPriceDataPage() {
  const petrolSorted = [...PETROL_BY_CITY].sort((a, b) => b.average - a.average);
  const widestSpread = [...PETROL_BY_CITY].sort(
    (a, b) => b.highestSite - b.lowestSite - (a.highestSite - a.lowestSite),
  )[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "Australian capital city retail fuel prices",
            description:
              "Daily average retail unleaded and diesel prices for eight Australian capital cities, with the cheapest and dearest monitored site in each city.",
            url: "https://calcfuel.com/data/australian-fuel-prices",
            temporalCoverage: `2026-02-20/${SOURCE_REPORT.pricesTo}`,
            spatialCoverage: "Australia",
            isBasedOn: SOURCE_REPORT.url,
            creator: { "@type": "Organization", name: "ACCC" },
            dateModified: SOURCE_REPORT.reportDate,
            license: "https://creativecommons.org/licenses/by/4.0/",
          }),
        }}
      />

      <nav className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Fuel price data</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian fuel prices by city
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Every calculator on this site needs a fuel price, and a wrong default quietly makes
        every result wrong. This page is the single figure those defaults come from — what
        unleaded and diesel actually cost in each capital city on{" "}
        <strong>{SOURCE_REPORT.pricesToLabel}</strong>, transcribed from the ACCC&rsquo;s weekly
        monitoring report rather than estimated.
      </p>
      <CalcReviewedBy lastUpdated="21 August 2026" />

      <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/40 p-5 mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          The number this site uses
        </h2>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          Unleaded <strong>{formatAudPerLitre(FIVE_CITY_AVERAGE.petrol)}</strong> · diesel{" "}
          <strong>{formatAudPerLitre(FIVE_CITY_AVERAGE.diesel)}</strong> — the five-city daily
          average on {SOURCE_REPORT.pricesToLabel}. Change it to your own local price before you
          trust a result; the spread between the cheapest and dearest site in a single city is
          wider than the gap between cities.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Unleaded petrol — capital city averages
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Daily average retail price for regular unleaded, in cents per litre, alongside the same
        city in February 2026 before the escalation in the Middle East pushed international
        refined petrol benchmarks up.
      </p>

      <BarChart
        title="Average unleaded price by capital city"
        description={`Daily average retail unleaded prices in cents per litre on ${SOURCE_REPORT.pricesToLabel}, compared with 20 February 2026. Perth is highest at 206.9 and Sydney lowest at 197.2.`}
        data={petrolSorted.map((c) => ({
          label: c.city,
          value: c.average,
          compare: c.preConflict,
          highlight: c.average === Math.max(...PETROL_BY_CITY.map((x) => x.average)),
        }))}
        unitSuffix=" cpl"
        seriesLabel={SOURCE_REPORT.pricesToLabel}
        compareLabel="20 February 2026"
      />

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            Unleaded, cents per litre. Site range measured at 11am on{" "}
            {SOURCE_REPORT.pricesToLabel}. Source: ACCC {SOURCE_REPORT.title},{" "}
            {SOURCE_REPORT.reportDateLabel}, table 1.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3 font-semibold">City</th>
              <th className="py-2 pr-3 font-semibold">Average</th>
              <th className="py-2 pr-3 font-semibold">Cheapest site</th>
              <th className="py-2 pr-3 font-semibold">Dearest site</th>
              <th className="py-2 pr-3 font-semibold">Spread</th>
              <th className="py-2 font-semibold">20 Feb 2026</th>
            </tr>
          </thead>
          <tbody>
            {PETROL_BY_CITY.map((c) => (
              <tr key={c.city} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-3">{c.city}</td>
                <td className="py-2 pr-3">{c.average.toFixed(1)}</td>
                <td className="py-2 pr-3">{c.lowestSite.toFixed(1)}</td>
                <td className="py-2 pr-3">{c.highestSite.toFixed(1)}</td>
                <td className="py-2 pr-3">{spread(c)}</td>
                <td className="py-2">{c.preConflict.toFixed(1)}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="py-2 pr-3">5 largest cities</td>
              <td className="py-2 pr-3">{FIVE_CITY_AVERAGE.petrol.toFixed(1)}</td>
              <td className="py-2 pr-3">—</td>
              <td className="py-2 pr-3">—</td>
              <td className="py-2 pr-3">—</td>
              <td className="py-2">{FIVE_CITY_AVERAGE.petrolPreConflict.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Diesel — capital city averages
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Diesel does not follow the weekly price cycle that unleaded does in the five largest
        cities, so a diesel figure is stable for longer — but it has moved much further from its
        February level than petrol has. The five-city diesel average is{" "}
        {(FIVE_CITY_AVERAGE.diesel - FIVE_CITY_AVERAGE.dieselPreConflict).toFixed(1)} cpl above
        20 February, against {(FIVE_CITY_AVERAGE.petrol - FIVE_CITY_AVERAGE.petrolPreConflict).toFixed(1)}{" "}
        cpl for unleaded. If you run a diesel vehicle, a fuel budget built on last summer&rsquo;s
        numbers is understating your cost by roughly a third.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            Diesel, cents per litre. Source: ACCC {SOURCE_REPORT.title},{" "}
            {SOURCE_REPORT.reportDateLabel}, table 2.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3 font-semibold">City</th>
              <th className="py-2 pr-3 font-semibold">Average</th>
              <th className="py-2 pr-3 font-semibold">Cheapest site</th>
              <th className="py-2 pr-3 font-semibold">Dearest site</th>
              <th className="py-2 font-semibold">20 Feb 2026</th>
            </tr>
          </thead>
          <tbody>
            {DIESEL_BY_CITY.map((c) => (
              <tr key={c.city} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-3">{c.city}</td>
                <td className="py-2 pr-3">{c.average.toFixed(1)}</td>
                <td className="py-2 pr-3">{c.lowestSite.toFixed(1)}</td>
                <td className="py-2 pr-3">{c.highestSite.toFixed(1)}</td>
                <td className="py-2">{c.preConflict.toFixed(1)}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="py-2 pr-3">5 largest cities</td>
              <td className="py-2 pr-3">{FIVE_CITY_AVERAGE.diesel.toFixed(1)}</td>
              <td className="py-2 pr-3">—</td>
              <td className="py-2 pr-3">—</td>
              <td className="py-2">{FIVE_CITY_AVERAGE.dieselPreConflict.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Shopping around beats moving city
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The headline city averages sit within about 10 cpl of each other. The spread{" "}
        <em>inside</em> a single city is far larger: {widestSpread.city} ran from{" "}
        {widestSpread.lowestSite.toFixed(1)} to {widestSpread.highestSite.toFixed(1)} cpl at the
        same moment on {SOURCE_REPORT.pricesToLabel} — a {spread(widestSpread)} cpl gap between
        the cheapest and dearest monitored site. On a 60-litre fill that is $
        {(((widestSpread.highestSite - widestSpread.lowestSite) / 100) * 60).toFixed(2)}{" "}
        difference for the same fuel on the same day.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        This is why the calculators here take a price you type in rather than assuming one. Use
        a state price app — FuelCheck in NSW and Tasmania, FuelWatch in WA, MyFuelNT in the NT —
        and enter what you will actually pay.
      </p>

      <BarChart
        title="Price spread between cheapest and dearest site, by city"
        description="Difference in cents per litre between the cheapest and the dearest monitored unleaded site within each capital city, measured at the same time on 19 August 2026."
        data={[...PETROL_BY_CITY]
          .map((c) => ({
            label: c.city,
            value: Number((c.highestSite - c.lowestSite).toFixed(1)),
            highlight: c.city === widestSpread.city,
          }))
          .sort((a, b) => b.value - a.value)}
        unitSuffix=" cpl"
        seriesLabel="Within-city spread"
      />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Regional prices
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Across the 190-plus regional locations the ACCC monitors, the aggregate daily average on{" "}
        {SOURCE_REPORT.pricesToLabel} was <strong>{REGIONAL_AVERAGE.petrol.toFixed(1)} cpl</strong>{" "}
        for unleaded and <strong>{REGIONAL_AVERAGE.diesel.toFixed(1)} cpl</strong> for diesel —
        {" "}
        {(REGIONAL_AVERAGE.petrol - FIVE_CITY_AVERAGE.petrol).toFixed(1)} cpl and{" "}
        {(REGIONAL_AVERAGE.diesel - FIVE_CITY_AVERAGE.diesel).toFixed(1)} cpl above the
        respective five-city averages. Regional prices also moved further after the excise
        restoration than city prices did.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        If you are planning a trip that leaves a capital city, budgeting at the city average
        will understate the cost of the fuel you buy on the way. Add roughly 8 cpl for unleaded
        and 6 cpl for diesel to the legs you expect to refuel regionally, or plan your fill-ups
        around the last metropolitan site on the route.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        The 2026 fuel excise timeline
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Fuel excise is a flat per-litre tax, so a change to it moves pump prices almost
        one-for-one. Australia moved the rate twice in 2026, which is the main reason any fuel
        figure published earlier this year is now wrong.
      </p>
      <ul className="space-y-3 mb-4">
        {EXCISE_TIMELINE.map((e) => (
          <li
            key={e.from}
            className="rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {new Date(e.from).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              — {e.rateCpl} cpl
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{e.label}</p>
          </li>
        ))}
      </ul>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The current rate is <strong>{CURRENT_EXCISE_CPL} cpl</strong>. Because GST applies on top
        of excise, the ACCC put the total tax effect of the 3 August restoration at up to{" "}
        {EXCISE_RESTORATION_PUMP_IMPACT_CPL} cpl at the pump. Actual retail increases in the
        capital cities came in at or below that — between 11.4 cpl in Sydney and 18.1 cpl in
        Perth — partly because international refined benchmarks fell over the same fortnight.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        How this page is maintained
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The ACCC publishes a fuel price monitoring report every Friday under a Ministerial
        Direction that currently runs to 30 September 2026. Each week we transcribe tables 1 and
        2 of the latest report into a single data module, which is what the tables and charts
        above and the default prices in every calculator read from. No figure on this page is
        modelled, smoothed or carried forward from a previous week — if the ACCC did not publish
        it, it is not here.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Where a previously published figure turns out to have been transcribed wrongly, the
        correction is recorded on our{" "}
        <Link href="/corrections" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
          corrections page
        </Link>{" "}
        rather than silently edited. The full approach to sourcing is set out in our{" "}
        <Link href="/methodology" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
          methodology
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">Source</h2>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-8">
        <li>
          <a
            href={SOURCE_REPORT.url}
            className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            rel="noopener noreferrer"
          >
            ACCC, {SOURCE_REPORT.title}, {SOURCE_REPORT.reportDateLabel} (PDF)
          </a>{" "}
          — the {SOURCE_REPORT.edition}, carrying prices to {SOURCE_REPORT.pricesToLabel}. Tables
          1 and 2 supply every city figure above; the key messages section supplies the five-city
          and regional aggregates and the excise timeline.
        </li>
        <li>
          <a
            href={SOURCE_REPORT.indexUrl}
            className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            rel="noopener noreferrer"
          >
            ACCC weekly fuel price monitoring update index
          </a>{" "}
          — where each new week&rsquo;s report is published.
        </li>
        <li>
          Underlying price feeds named by the ACCC: {SOURCE_REPORT.underlyingSources}
        </li>
      </ul>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          Use these prices
        </h2>
        <ul className="text-sm space-y-1.5">
          <li>
            <Link
              href="/calculators/trip-fuel-cost-calculator"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Trip fuel cost calculator
            </Link>{" "}
            — cost of a specific drive at these prices.
          </li>
          <li>
            <Link
              href="/calculators/fuel-budget-planner"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Fuel budget planner
            </Link>{" "}
            — what the August excise restoration does to a household&rsquo;s annual spend.
          </li>
          <li>
            <Link
              href="/calculators/towing-fuel-cost-calculator"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Towing fuel cost calculator
            </Link>{" "}
            — the extra litres a caravan adds, priced at the diesel average.
          </li>
        </ul>
      </div>
    </div>
  );
}
