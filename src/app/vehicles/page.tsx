import Link from "next/link";
import HubPage, { hubMetadata } from "@/components/HubPage";
import BarChart from "@/components/charts/BarChart";
import { FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";

export const metadata = hubMetadata(
  "Vehicle Running Costs",
  "What a vehicle costs to run per kilometre in Australia, when a hybrid or EV repays its premium, and the fuel leaks nobody measures.",
  "/vehicles",
);

export default function VehiclesHub() {
  const petrol = FIVE_CITY_AVERAGE.petrol / 100;
  const perKm = (l100: number) => ((l100 / 100) * petrol).toFixed(3);
  const annual = (l100: number) => ((15000 / 100) * l100 * petrol).toFixed(0);

  return (
    <HubPage
      title="Vehicle running costs"
      description="Fuel is the running cost you can change fastest and measure most precisely. This section is about turning a consumption figure into a cost per kilometre, and knowing when a more efficient vehicle actually pays for itself."
      lastUpdated="18 September 2026"
      path="/vehicles"
      tools={[
        {
          href: "/calculators/fuel-economy-savings-calculator",
          label: "Fuel Economy Calculator",
          blurb:
            "Convert between MPG and L/100km, and see what a given improvement in economy is worth per year at your annual distance.",
        },
        {
          href: "/calculators/hybrid-vs-gas-calculator",
          label: "Hybrid vs Petrol",
          blurb:
            "How many years of fuel savings it takes to recover a hybrid's purchase premium, at your distance and price.",
        },
        {
          href: "/calculators/ev-vs-gas-calculator",
          label: "EV vs Petrol",
          blurb:
            "Five- and ten-year total cost including energy, servicing and insurance — not just cents per kilometre.",
        },
        {
          href: "/calculators/ev-charging-cost-calculator",
          label: "EV Charging Cost",
          blurb:
            "What a charge costs at home versus on a public DC charger, including the losses that never reach the battery.",
        },
        {
          href: "/calculators/motorcycle-fuel-cost-calculator",
          label: "Motorcycle Fuel Cost",
          blurb: "Trip and commute fuel with bike-class presets, for riders comparing against a car.",
        },
        {
          href: "/calculators/fuel-budget-planner",
          label: "Fuel Budget Planner",
          blurb: "Household weekly, monthly and annual fuel spend across one or more vehicles.",
        },
        {
          href: "/calculators/idling-fuel-waste-calculator",
          label: "Idling Fuel Waste",
          blurb: "What idle time costs over a year — the leak fleets find first and drivers never notice.",
        },
      ]}
    >
      <h2>Cost per kilometre is the only comparable number</h2>
      <p>
        Fuel economy figures are not directly comparable across the two systems in common use.
        L/100km is a consumption figure — lower is better, and the scale is linear in fuel used.
        MPG is an efficiency figure — higher is better, and the scale is nonlinear, which is why
        going from 20 to 25 MPG saves far more fuel than going from 40 to 45 MPG does. Converting
        both to dollars per kilometre removes the trap.
      </p>
      <p>
        At the five-city average unleaded price of {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl:
      </p>
      <div className="overflow-x-auto">
        <table>
          <caption>
            Fuel cost only, at {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl (five-city average,{" "}
            {SOURCE_REPORT.pricesToLabel}). Excludes registration, insurance, tyres, servicing and
            depreciation.
          </caption>
          <thead>
            <tr>
              <th>Consumption</th>
              <th>Equivalent</th>
              <th>Cost per km</th>
              <th>15,000 km/year</th>
            </tr>
          </thead>
          <tbody>
            {[
              { l: 4.5, note: "Efficient hybrid" },
              { l: 6.5, note: "Small petrol car" },
              { l: 8.5, note: "Mid-size SUV" },
              { l: 11.5, note: "Large SUV / ute" },
              { l: 15.0, note: "Heavy 4WD, towing-capable" },
            ].map((r) => (
              <tr key={r.l}>
                <td>
                  {r.l.toFixed(1)} L/100km
                </td>
                <td>{r.note}</td>
                <td>${perKm(r.l)}</td>
                <td>${Number(annual(r.l)).toLocaleString("en-AU")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The gap between the top and bottom rows is over $3,000 a year in fuel alone. That is the
        number worth holding in mind when a more efficient vehicle carries a purchase premium —
        it is what has to amortise the premium, and it moves whenever the pump price does.
      </p>

      <h2>When a hybrid or EV actually pays back</h2>
      <p>
        Break-even is a function of four things: the purchase premium, your annual distance, the
        consumption difference, and the fuel price you assume. Change any one materially and the
        answer flips. A hybrid premium that pays back in four years at 20,000 km a year takes
        eight at 10,000 km — and low-distance drivers are exactly the people most often sold on
        fuel savings.
      </p>
      <p>
        The same arithmetic applies to EVs, with two extra terms. Charging at home on a
        controlled-load or off-peak tariff is far cheaper per kilometre than public DC fast
        charging, so your charging mix matters as much as the car. And roughly 10–15% of the
        energy you are billed for at the wall never reaches the battery, which most cost
        comparisons quietly omit.
      </p>
      <BarChart
        title="Indicative energy cost per 100 km by drivetrain"
        description="Approximate energy cost per 100 kilometres: petrol at the five-city average, a hybrid at the same price, home EV charging on an off-peak tariff, and public DC fast charging. Home charging is the cheapest and public fast charging roughly triples it."
        data={[
          { label: "Petrol 8.5 L", value: 8.5 * petrol },
          { label: "Hybrid 4.5 L", value: 4.5 * petrol },
          { label: "EV home", value: 16 * 0.28 },
          { label: "EV public DC", value: 16 * 0.65, highlight: true },
        ]}
        unitSuffix=" $"
        precision={2}
        seriesLabel="Energy cost per 100 km"
      />
      <p>
        <em>
          EV figures assume 16 kWh/100 km, an off-peak home rate of 28c/kWh and a public DC rate
          of 65c/kWh. Substitute your own tariff — the ranking holds but the margins do not.
        </em>
      </p>

      <h2>The leaks nobody measures</h2>
      <p>
        Three costs are invisible on a fuel receipt and material over a year. Idling burns fuel
        at zero kilometres per litre; a delivery vehicle idling an hour a day can waste hundreds
        of litres annually. Under-inflated tyres raise rolling resistance across every kilometre
        you drive. And short trips from cold never let the engine reach operating temperature,
        where consumption can run 30–50% above the rated figure for the first few kilometres.
      </p>
      <p>
        None of these show up in a manufacturer&rsquo;s WLTP number, which is one reason real
        consumption typically runs 10–20% above the rating. If you are budgeting from a
        brochure figure, add that margin before you commit to anything.
      </p>

      <h2>Price assumptions and where they come from</h2>
      <p>
        Every figure on this page uses the current five-city average from our{" "}
        <Link href="/data/australian-fuel-prices">Australian fuel price data</Link>, transcribed
        weekly from the ACCC monitoring report. Fuel excise moved twice in 2026, so any running
        cost calculated earlier this year is now wrong by a material margin — check the date on
        any figure before you rely on it, including ours.
      </p>

      <h2>Related sections</h2>
      <p>
        For per-trip costs rather than annual ones, see{" "}
        <Link href="/trip-planning">trip planning</Link>. Longer guides:{" "}
        <Link href="/blog/car-running-costs-australia">car running costs in Australia</Link>,{" "}
        <Link href="/blog/hybrid-vs-petrol-australia">hybrid vs petrol</Link> and{" "}
        <Link href="/blog/most-fuel-efficient-cars-australia">most fuel efficient cars</Link>.
      </p>
    </HubPage>
  );
}
