import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import PricesLastUpdated from "@/components/PricesLastUpdated";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "The formulas behind every CalcFuel tool: fuel use, marine range and reserve, towing penalties, EV and hybrid break-even, and what each model omits.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <LegalPageLayout title="Methodology" path="/methodology" lastUpdated="26 September 2026">
      <p>
        CalcFuel calculation logic lives in a shared domain layer so tools stay consistent. This page
        summarises the main methods. Individual calculators also include an on-page methodology note.
      </p>

      <h2>Fuel used</h2>
      <ul>
        <li>
          <strong>Imperial:</strong> gallons = distance (miles) ÷ MPG.
        </li>
        <li>
          <strong>Metric:</strong> litres = (L/100km ÷ 100) × distance (km).
        </li>
      </ul>
      <p>Fuel cost = fuel volume × price per unit.</p>

      <h2>MPG ↔ L/100km</h2>
      <p>
        We use the standard conversion factor ≈ 235.215 (based on US gallons and kilometres). km/L =
        100 ÷ L/100km.
      </p>

      <h2>Marine trips</h2>
      <p>
        Primary path: burn rate × travel time (distance ÷ speed). Safe range uses usable tank capacity
        after a reserve fraction (default 15%). HP-derived burn is an optional rule of thumb only.
      </p>

      <h2>Towing</h2>
      <p>
        A percentage penalty worsens efficiency (higher L/100km or lower MPG). Extra cost is towing
        fuel cost minus unloaded fuel cost for the same distance.
      </p>

      <h2>Vehicle running cost</h2>
      <p>
        Hybrid comparisons take the annual fuel saving plus any maintenance advantage and divide the
        purchase premium by it to give a break-even in years. EV comparisons add electricity
        (mi/kWh or kWh/100km), maintenance and insurance over a chosen horizon.
      </p>
      <p>
        Two things these models deliberately exclude. <strong>Depreciation</strong> is left out
        because it depends on make, variant, condition and market timing far more than on drivetrain,
        and including a guess would swamp the fuel arithmetic the tool exists to do.{" "}
        <strong>Finance cost</strong> is left out for the same reason — a purchase premium paid in
        cash and one carried on a loan are different problems.
      </p>

      <h2>Generator consumption</h2>
      <p>
        Hourly burn = rated output (kW) × applied load (%) × a fuel-specific consumption rate in
        litres per kilowatt-hour: approximately 0.30 for diesel, 0.42 for petrol and 0.55 for liquid
        propane. Imperial output converts at 3.78541 litres per US gallon.
      </p>
      <p>
        These rates describe a generator working at a reasonable load. Small sets running at very
        light load are materially less efficient per kilowatt-hour than this model assumes, so size
        fuel storage above what it reports rather than to it.
      </p>

      <h2>Fuel prices</h2>
      <PricesLastUpdated className="mb-4" />
      <p>
        Default prices are the five-city daily average from a single named, dated ACCC weekly fuel
        price monitoring report, transcribed without modification. The full dataset, the report it
        came from and the update procedure are published on{" "}
        <Link href="/data/australian-fuel-prices">Australian fuel price data</Link>. In the repo,
        the figures live in <code>src/lib/fuel-prices.ts</code> and the refresh steps are in{" "}
        <code>docs/accc-price-refresh.md</code>. A build-time cadence check fails when that
        snapshot&rsquo;s <code>pricesTo</code> date is 14 days old or older (configurable via{" "}
        <code>ACCC_STALE_AFTER_DAYS</code>; 7 is the tighter same-week option). Prices are always
        overridable — a local pump price beats any city average.
      </p>
      <p>
        Separately,{" "}
        <Link href="/when-to-buy-petrol">when to buy petrol</Link> transcribes ACCC buying tips
        for the five largest cities three times a week and maps the tip language to a cycle
        phase. Those phases are a CalcFuel label for ACCC wording, not a cents or cheap-day
        forecast. The data lives in <code>src/lib/accc-cycle-tips.ts</code>; the refresh steps
        and tip-to-phase table are in <code>docs/accc-cycle-tips-refresh.md</code>. A build
        check fails when the oldest tip is 7 days old or older (override with{" "}
        <code>CYCLE_TIPS_ALLOW_STALE=1</code>). Diesel has no phase — ACCC states it does not
        cycle.
      </p>

      <h2>Worked examples</h2>
      <p>
        Every calculator carries a worked example with the arithmetic shown step by step. Each one is
        produced by running that scenario through the calculator itself, so if a formula changes and
        an example is not updated with it, the two disagree visibly on the page rather than silently
        in the code.
      </p>

      <h2>Limitations</h2>
      <p>
        Every model here is a simplification, and each calculator states the specific simplification
        it makes. The common ones: manufacturer economy ratings run roughly 10–20% optimistic against
        real-world use; aerodynamic effects — which dominate towing and marine consumption — scale
        with speed far faster than intuition suggests; and short trips from cold consume well above a
        vehicle&rsquo;s rated figure for the first few kilometres.
      </p>
      <p>
        None of these tools produce a guarantee, and none should be the only input to a decision with
        real money or real safety margin attached. For anything on the water, plan to the reserve
        rather than to the range. See also our{" "}
        <Link href="/editorial-policy">editorial policy</Link> and{" "}
        <Link href="/corrections">corrections process</Link>.
      </p>
    </LegalPageLayout>
  );
}
