import Link from "next/link";
import HubPage, { hubMetadata } from "@/components/HubPage";
import BarChart from "@/components/charts/BarChart";
import { DIESEL_BY_CITY, FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";
import { TRAILER_PENALTIES } from "@/domain/models/towingTrip";
import TowingEvidence from "@/components/TowingEvidence";

export const metadata = hubMetadata(
  "Towing & Caravan Fuel Costs",
  "Towing fuel use in Australia: published penalties by trailer type (+20% to +100%), why speed matters most, and what a caravan adds to a 2,000 km trip.",
  "/towing",
);

export default function TowingHub() {
  const diesel = FIVE_CITY_AVERAGE.diesel / 100;
  // 2,000 km round trip, tow vehicle at 10.5 L/100km unloaded.
  const base = (2000 / 100) * 10.5;
  const rows = [
    { label: "Unloaded", penalty: 0 },
    ...TRAILER_PENALTIES.map((t) => ({ label: t.label, penalty: t.penaltyPercent })),
  ].map((r) => ({
    ...r,
    litres: base * (1 + r.penalty / 100),
    cost: base * (1 + r.penalty / 100) * diesel,
  }));
  const caravan = TRAILER_PENALTIES.find((t) => t.id === "caravan")!.penaltyPercent;

  return (
    <HubPage
      title="Towing & caravans"
      description="Towing does not add a fixed surcharge to a trip — it changes the shape of the fuel curve. This section covers what drives the penalty, what published Australian tests and guidance actually say, and what it costs at today's diesel price."
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
      <h2>Speed and shape matter more than people expect</h2>
      <p>
        Heavier is thirstier on hills and in stop-start traffic, where you keep accelerating mass.
        At a steady highway speed most of the engine&rsquo;s work goes into pushing air, and drag
        rises with the square of speed. RACV&rsquo;s towing guide lists caravan size and shape,
        speed, weight, terrain and wind as the factors, and notes that dropping from 110 km/h to
        90 km/h can save several litres per 100 km.
      </p>
      <p>
        One result surprises most people: roof height matters less than you would think. In a
        Caravan World back-to-back test of otherwise-identical 5.95 m vans, the full-height version
        used about 0.7 L/100km (5%) more than the pop-top. The tow vehicle made a bigger
        difference than the roof.
      </p>

      <h2>What published sources say, by trailer type</h2>
      <p>
        There is no single official Australian towing figure, and the published numbers range
        widely — from about +20% for a small box trailer to roughly double for a heavy van at
        highway speed. The calculator&rsquo;s presets sit inside that range, and each one names its
        source. They are a starting point, not a substitute for measuring your own combination.
      </p>
      <BarChart
        title="Towing fuel penalty presets by trailer type"
        description="Percentage increase in fuel consumption over unloaded driving used by the CalcFuel towing calculator for each trailer type, drawn from published Australian sources ranging from about 20 percent to about 100 percent."
        data={TRAILER_PENALTIES.map((t) => ({ label: t.label, value: t.penaltyPercent, highlight: t.id === "caravan" }))}
        unitSuffix="%"
        precision={0}
        seriesLabel="Consumption penalty vs unloaded"
      />
      <TowingEvidence />

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
        At the caravan preset the van alone adds about ${(base * (caravan / 100) * diesel).toFixed(0)} to
        that trip; at the +100% measured in heavy-van tow tests, about ${(base * diesel).toFixed(0)}. Every
        10 cpl on the pump price adds about ${(((base * (1 + caravan / 100)) / 100) * 10).toFixed(0)} to the
        towing trip at the caravan preset. Diesel has been unusually
        volatile in 2026 — see the{" "}
        <Link href="/data/australian-fuel-prices">fuel price data</Link> page for the excise
        timeline behind that.
      </p>

      <h2>Speed is the lever you actually control</h2>
      <p>
        Because the penalty is mostly aerodynamic, it scales with speed in the same way drag does
        — steeply. In the caravancampingsales.com.au Outback test, consumption that touched
        22 L/100km at higher speed settled around 19 L/100km at 80–90 km/h. Dropping from 100 to
        90 km/h costs about two hours over 2,000 km; for most caravanners it is the largest saving
        available.
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
