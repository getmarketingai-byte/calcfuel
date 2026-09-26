import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CycleTipsLastUpdated from "@/components/CycleTipsLastUpdated";
import {
  CITY_CYCLE_TIPS,
  CYCLE_TIPS_SOURCE,
  DIESEL_CYCLE_FACT,
  type CyclePhase,
  phaseDecisionLine,
} from "@/lib/accc-cycle-tips";
import {
  DIESEL_BY_CITY,
  FIVE_CITY_AVERAGE,
  FIVE_LARGEST_CITIES,
  SOURCE_REPORT,
  formatAudPerLitre,
  formatCpl,
} from "@/lib/fuel-prices";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "When should I buy petrol in my city?",
  description:
    "ACCC buying tips mapped to a cycle phase for Sydney, Melbourne, Brisbane, Adelaide and Perth. Not a price forecast. Diesel does not cycle.",
  path: "/when-to-buy-petrol",
});

const PHASE_TONE: Record<CyclePhase, string> = {
  climbing:
    "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/70 dark:text-amber-100 dark:border-amber-700",
  "near peak":
    "bg-red-100 text-red-950 border-red-300 dark:bg-red-950/70 dark:text-red-100 dark:border-red-700",
  falling:
    "bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-100 dark:border-emerald-700",
  "near low":
    "bg-green-100 text-green-950 border-green-300 dark:bg-green-950/70 dark:text-green-100 dark:border-green-700",
  plateau:
    "bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600",
};

const dieselFiveCity = DIESEL_BY_CITY.filter((row) => FIVE_LARGEST_CITIES.includes(row.city));

export default function WhenToBuyPetrolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "When to buy petrol", path: "/when-to-buy-petrol" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "When should I buy petrol in my city?",
            url: "https://calcfuel.com/when-to-buy-petrol",
            dateModified: CYCLE_TIPS_SOURCE.tipUpdated,
            citation: CYCLE_TIPS_SOURCE.url,
            about: "ACCC petrol buying tips for Australia's five largest cities",
            creator: { "@type": "Organization", name: "CalcFuel" },
          }),
        }}
      />

      <nav className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>When to buy petrol</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        When should I buy petrol in my city?
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        A one-look answer for regular unleaded in Australia&rsquo;s five largest cities: where the
        ACCC buying tip sits in the petrol price cycle, and what that means for filling up. This
        is a guide, not a forecast of cents or of the cheap day.
      </p>
      <CycleTipsLastUpdated className="mb-8" />

      <div className="grid grid-cols-1 gap-4 mb-10">
        {CITY_CYCLE_TIPS.map((city) => (
          <article
            key={city.city}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{city.city}</h2>
              <p
                className={`inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-sm font-semibold capitalize ${PHASE_TONE[city.phase]}`}
              >
                Phase: {city.phase}
              </p>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-3">{city.tip}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {phaseDecisionLine(city.phase)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              ACCC buying tip, last updated{" "}
              <time dateTime={city.tipUpdated}>{CYCLE_TIPS_SOURCE.tipUpdatedLabel}</time>
              {" · "}
              <a
                href={city.sourceUrl}
                className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
                rel="noopener noreferrer"
              >
                ACCC petrol price cycles in the 5 largest cities
              </a>
              . {city.cycleLengthNote}
            </p>
          </article>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Diesel does not cycle
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{DIESEL_CYCLE_FACT}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The five-city diesel average on {SOURCE_REPORT.pricesToLabel} was{" "}
          <strong>{formatAudPerLitre(FIVE_CITY_AVERAGE.diesel)}</strong> (
          {formatCpl(FIVE_CITY_AVERAGE.diesel)}). That is a weekly average from the ACCC
          monitoring report, not a phase label. Shop around on a fuel-price app the same way you
          would for petrol; do not wait for a diesel cycle that does not exist.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
              Diesel daily average, cents per litre, five largest cities. Source: ACCC{" "}
              {SOURCE_REPORT.title}, {SOURCE_REPORT.reportDateLabel}. No cycle phase.
            </caption>
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
                <th className="py-2 pr-3 font-semibold">City</th>
                <th className="py-2 pr-3 font-semibold">Average</th>
                <th className="py-2 font-semibold">Phase</th>
              </tr>
            </thead>
            <tbody>
              {dieselFiveCity.map((row) => (
                <tr key={row.city} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 pr-3">{row.city}</td>
                  <td className="py-2 pr-3">{row.average.toFixed(1)} cpl</td>
                  <td className="py-2">None — diesel does not cycle</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 pr-3">5 largest cities</td>
                <td className="py-2 pr-3">{FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl</td>
                <td className="py-2">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to read this</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The ACCC publishes buying tips for regular unleaded in Sydney, Melbourne, Brisbane,
          Adelaide and Perth at least Monday, Wednesday and Friday around midday. We transcribe
          those tips and map the language to one of five phases: climbing, near peak, falling,
          near low, or plateau. The phase is a CalcFuel label for ACCC wording. It is not a
          prediction of the next peak, the next trough, or a price in cents per litre.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Cycles vary from cycle to cycle and by suburb. ACCC says to use the tips as a guide
          only. When a tip says prices have increased, or that cycles are disrupted, we use
          climbing or plateau — we do not invent a cheap day. Canberra, Hobart, Darwin and most
          regional towns do not have petrol price cycles, so they are not on this page.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Since late February 2026 the ACCC has noted that petrol price cycles have mostly not
          occurred in Sydney, Melbourne, Brisbane and Adelaide. That is why a city can sit in
          climbing without a named trough. Perth still often moves on a shorter weekly pattern;
          the live tip, not the 2025 average length, is what the card follows.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Across all fuels, ACCC finds that shopping around with a state price app still saves
          money: FuelCheck in NSW, FuelWatch in WA, and the other apps listed on the ACCC cycle
          page. A city average is not the price on your corner.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Source and limits</h2>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          <li>
            <a
              href={CYCLE_TIPS_SOURCE.url}
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
              rel="noopener noreferrer"
            >
              ACCC, {CYCLE_TIPS_SOURCE.title}
            </a>{" "}
            — buying tips last labelled {CYCLE_TIPS_SOURCE.weekdayLabel}{" "}
            {CYCLE_TIPS_SOURCE.tipUpdatedLabel}. Tips apply to regular unleaded and may also
            apply to PULP95, PULP98 and E10 because those grades tend to move together.
          </li>
          <li>
            <Link
              href="/data/australian-fuel-prices"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Australian fuel prices by city
            </Link>{" "}
            — weekly unleaded and diesel averages from the ACCC {SOURCE_REPORT.edition}, prices
            to {SOURCE_REPORT.pricesToLabel}. That snapshot answers “what did it cost?” This page
            answers “where is the cycle?”
          </li>
          <li>
            In-repo steps, including the tip-to-phase table and the 7-day stale rule, are in{" "}
            <code className="text-xs">docs/accc-cycle-tips-refresh.md</code>. A build check fails
            when the oldest tip is 7 days old or older (override with{" "}
            <code className="text-xs">CYCLE_TIPS_ALLOW_STALE=1</code>). There is no auto-scrape.
          </li>
        </ul>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          Cost the fill, not just the phase
        </h2>
        <ul className="text-sm space-y-1.5">
          <li>
            <Link
              href="/calculators/trip-fuel-cost-calculator"
              className="inline-flex min-h-11 items-center text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Trip fuel cost calculator
            </Link>{" "}
            — a specific drive at this week&rsquo;s prices.
          </li>
          <li>
            <Link
              href="/calculators/fuel-budget-planner"
              className="inline-flex min-h-11 items-center text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Fuel budget planner
            </Link>{" "}
            — weekly and annual household spend.
          </li>
          <li>
            <Link
              href="/calculators/commute-fuel-cost-calculator"
              className="inline-flex min-h-11 items-center text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Commute fuel cost calculator
            </Link>{" "}
            — what a longer drive to work costs in fuel.
          </li>
          <li>
            <Link
              href="/blog/best-time-to-buy-petrol-australia"
              className="inline-flex min-h-11 items-center text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Evergreen cycle guide
            </Link>{" "}
            — background only. Live phase labels live on this page.
          </li>
        </ul>
      </div>
    </div>
  );
}
