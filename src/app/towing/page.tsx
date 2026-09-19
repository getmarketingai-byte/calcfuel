import Link from "next/link";
import HubPage, { hubMetadata } from "@/components/HubPage";
import BarChart from "@/components/charts/BarChart";
import { DIESEL_BY_CITY, FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";

export const metadata = hubMetadata(
  "Towing & Caravan Fuel Costs",
  "What towing does to fuel use: why frontal area beats mass, typical penalties by trailer type, and what a caravan adds to a 2,000 km trip.",
  "/towing",
);

export default function TowingHub() {
  const diesel = FIVE_CITY_AVERAGE.diesel / 100;
  // 2,000 km round trip, tow vehicle at 10.5 L/100km unloaded.
  const base = (2000 / 100) * 10.5;
  const rows = [
    { label: "Unloaded", penalty: 0 },
    { label: "Box trailer", penalty: 15 },
    { label: "Boat on trailer", penalty: 25 },
    { label: "Pop-top van", penalty: 35 },
    { label: "Full-height van", penalty: 55 },
  ].map((r) => ({
    ...r,
    litres: base * (1 + r.penalty / 100),
    cost: base * (1 + r.penalty / 100) * diesel,
  }));

  return (
    <HubPage
      title="Towing & caravans"
      description="Towing does not add a fixed surcharge to a trip — it changes the shape of the fuel curve. This section covers what drives the penalty, why the number people quote is usually too low, and what it costs at today's diesel price."
      lastUpdated="18 September 2026"
      path="/towing"
      tools={[
        {
          href: "/calculators/towing-fuel-cost-calculator",
          label: "Towing Fuel Cost Calculator",
          blurb:
            "The difference between the same trip loaded and unloaded — extra litres, extra dollars, and what a 10 km/h speed change does to both.",
        },
        {
          href: "/calculators/trip-fuel-cost-calculator",
          label: "Trip Fuel Cost Calculator",
          blurb:
            "Establish the unloaded baseline for a route first, then apply a towing penalty to it.",
        },
        {
          href: "/calculators/fuel-budget-planner",
          label: "Fuel Budget Planner",
          blurb:
            "Spread a towing season across a year — several trips, mixed loaded and unloaded driving.",
        },
      ]}
    >
      <h2>Frontal area matters more than mass</h2>
      <p>
        The intuition most people bring to towing is that heavier means thirstier. That is true
        on hills and in stop-start traffic, where you are repeatedly accelerating mass. At a
        steady 100 km/h on a highway it is largely wrong. At that speed most of the engine&rsquo;s
        work goes into pushing air, and aerodynamic drag scales with frontal area, not weight.
      </p>
      <p>
        This is why a 1,200 kg box trailer sitting low in the tow vehicle&rsquo;s slipstream can
        cost you 15% while a 1,200 kg full-height caravan — same mass, roughly three times the
        frontal area, and tall enough to sit in clean air above the car&rsquo;s wake — costs 50%
        or more. If you are choosing between two vans of similar weight, the shorter and narrower
        one will be materially cheaper to tow.
      </p>

      <h2>Typical penalties by trailer type</h2>
      <p>
        The figures below are the starting ranges the calculator uses. They are a place to begin,
        not a substitute for measuring your own combination — the same van behind a dual-cab ute
        and behind a large SUV can differ by 10 percentage points because of how the air leaves
        the tow vehicle.
      </p>
      <BarChart
        title="Typical fuel consumption penalty by trailer type"
        description="Indicative percentage increase in fuel consumption over unloaded highway driving, by trailer type. A full-height caravan typically adds 40 to 70 percent; a low box trailer 10 to 20 percent."
        data={[
          { label: "Box trailer", value: 15 },
          { label: "Boat on trailer", value: 25 },
          { label: "Pop-top van", value: 35 },
          { label: "Full-height van", value: 55, highlight: true },
        ]}
        unitSuffix="%"
        precision={0}
        seriesLabel="Consumption penalty vs unloaded"
      />

      <h2>What that costs on a real trip</h2>
      <p>
        A 2,000 km round trip — Sydney to Byron and back, roughly — in a tow vehicle that uses
        10.5 L/100km unloaded, priced at the five-city average diesel price of{" "}
        {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl:
      </p>
      <div className="overflow-x-auto">
        <table>
          <caption>
            2,000 km round trip, 10.5 L/100km unloaded, diesel at{" "}
            {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl (five-city average,{" "}
            {SOURCE_REPORT.pricesToLabel}).
          </caption>
          <thead>
            <tr>
              <th>Configuration</th>
              <th>Penalty</th>
              <th>Fuel</th>
              <th>Cost</th>
              <th>Extra vs unloaded</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td>{r.penalty ? `+${r.penalty}%` : "—"}</td>
                <td>{r.litres.toFixed(0)} L</td>
                <td>${r.cost.toFixed(0)}</td>
                <td>{r.penalty ? `+$${(r.cost - rows[0].cost).toFixed(0)}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The full-height van adds more to the fuel bill for one trip than most people budget for
        the whole holiday&rsquo;s fuel. It is also the number that changes most if diesel moves:
        every 10 cpl on the pump price adds about $
        {(((base * 1.55) / 100) * 10).toFixed(0)} to that trip. Diesel has been unusually
        volatile in 2026 — see the{" "}
        <Link href="/data/australian-fuel-prices">fuel price data</Link> page for the excise
        timeline behind that.
      </p>

      <h2>Speed is the lever you actually control</h2>
      <p>
        Because the penalty is mostly aerodynamic, it scales with speed in the same way drag does
        — steeply. Dropping from 100 km/h to 90 km/h on a long towing leg typically recovers a
        meaningful share of the penalty, and on a 2,000 km trip costs you about two hours. For
        most caravanners that is the single largest saving available, ahead of tyre pressures,
        weight reduction or fuel additives.
      </p>
      <p>
        Two secondary levers are worth the effort: get the van sitting level, since a nose-up
        attitude presents more area to the airstream, and run the tow vehicle&rsquo;s tyres at the
        pressure specified for a loaded vehicle rather than its unladen figure.
      </p>

      <h2>Diesel prices vary more by city than most people assume</h2>
      <p>
        If your trip crosses state lines, the price you fill at changes. On {SOURCE_REPORT.pricesToLabel} the
        capital-city diesel averages ran from {Math.min(...DIESEL_BY_CITY.map((c) => c.average)).toFixed(1)}{" "}
        cpl to {Math.max(...DIESEL_BY_CITY.map((c) => c.average)).toFixed(1)} cpl, and regional
        averages sat above all of them. Plan fills around the cheaper end of the route where the
        detour is trivial, and expect to pay more once you leave the metropolitan fringe.
      </p>

      <h2>Related sections</h2>
      <p>
        For the boat that goes on the trailer, see{" "}
        <Link href="/marine">marine fuel planning</Link>. For the underlying road-trip maths, see{" "}
        <Link href="/trip-planning">trip planning</Link>. There is also a longer guide on{" "}
        <Link href="/blog/caravan-fuel-consumption-australia">
          caravan fuel consumption in Australia
        </Link>
        .
      </p>
    </HubPage>
  );
}
