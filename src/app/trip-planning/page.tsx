import Link from "next/link";
import HubPage, { hubMetadata } from "@/components/HubPage";
import BarChart from "@/components/charts/BarChart";
import { FIVE_CITY_AVERAGE, REGIONAL_AVERAGE } from "@/lib/fuel-prices";

export const metadata = hubMetadata(
  "Trip Cost Planning",
  "Cost a trip before you commit: the three mistakes in every estimate, what common Australian routes cost, and drive versus fly.",
  "/trip-planning",
);

export default function TripPlanningHub() {
  const petrol = FIVE_CITY_AVERAGE.petrol / 100;
  const trip = (km: number, l100: number) => ((km / 100) * l100 * petrol).toFixed(0);

  return (
    <HubPage
      title="Trip cost planning"
      description="A trip's fuel cost is simple arithmetic that almost everyone gets wrong in the same three ways: the wrong economy figure, a one-way distance, and a fuel price from memory. This section fixes all three."
      lastUpdated="21 August 2026"
      path="/trip-planning"
      tools={[
        {
          href: "/calculators/trip-fuel-cost-calculator",
          label: "Trip Fuel Cost Calculator",
          blurb:
            "Fuel and cost for a specific route, one-way or return, with commute and carpool modes for recurring trips.",
        },
        {
          href: "/calculators/drive-vs-fly-calculator",
          label: "Drive vs Fly Calculator",
          blurb:
            "Total cost of both options side by side — fuel and tolls against fares, bags, transfers and parking.",
        },
        {
          href: "/calculators/carpool-fuel-split-calculator",
          label: "Carpool Fuel Split",
          blurb:
            "A defensible per-person figure for a shared trip, including passengers who only ride part of the route.",
        },
        {
          href: "/calculators/commute-fuel-cost-calculator",
          label: "Commute Fuel Cost",
          blurb:
            "What the daily drive costs over a working year — usually a much larger number than people expect.",
        },
        {
          href: "/calculators/fuel-budget-planner",
          label: "Fuel Budget Planner",
          blurb: "Roll several planned trips into a weekly, monthly or annual budget.",
        },
      ]}
    >
      <h2>The three mistakes</h2>
      <p>
        <strong>Using the brochure economy figure.</strong> Manufacturer WLTP ratings are
        measured under laboratory conditions. Real-world consumption typically runs 10–20% above
        them, and further above on short trips, in hills, with a roof box, or with the
        air-conditioning working hard. Your own litres-per-100km, measured across a few full-tank
        fills, is the only figure worth planning from.
      </p>
      <p>
        <strong>Forgetting the return leg.</strong> Mapping apps quote one-way distance. Unless
        you are being collected at the other end, double it before you cost it — and if there is
        a detour to a fuel stop or an airport drop-off, add that too.
      </p>
      <p>
        <strong>Using a remembered fuel price.</strong> Australian pump prices moved unusually
        far in 2026 because fuel excise was cut in April and fully restored in August. A price
        you remember from earlier in the year is not close. Current five-city averages are on the{" "}
        <Link href="/data/australian-fuel-prices">fuel price data</Link> page.
      </p>

      <h2>What common trips cost</h2>
      <p>
        Fuel only, at the five-city average unleaded price of{" "}
        {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl, for a car using 8.0 L/100km. Return distances.
      </p>
      <div className="overflow-x-auto">
        <table>
          <caption>
            Fuel cost only at {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl, 8.0 L/100km, return
            distances. Excludes tolls, parking, food and accommodation.
          </caption>
          <thead>
            <tr>
              <th>Trip</th>
              <th>Return distance</th>
              <th>Fuel</th>
              <th>Cost</th>
              <th>Per head, 4 people</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Sydney – Canberra", km: 580 },
              { name: "Melbourne – Adelaide", km: 1460 },
              { name: "Brisbane – Byron Bay", km: 330 },
              { name: "Perth – Margaret River", km: 540 },
              { name: "Sydney – Melbourne", km: 1760 },
            ].map((t) => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>{t.km.toLocaleString("en-AU")} km</td>
                <td>{((t.km / 100) * 8).toFixed(0)} L</td>
                <td>${trip(t.km, 8)}</td>
                <td>${(Number(trip(t.km, 8)) / 4).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The last column is the one that decides most drive-versus-fly arguments. Fuel is a
        per-vehicle cost, not a per-person one, so a full car is roughly four times cheaper per
        head than a solo driver — and that is usually enough to beat four airfares even before
        you count airport transfers and checked bags.
      </p>

      <h2>Drive or fly</h2>
      <p>
        The comparison is not fare against fuel. A fair comparison puts the full door-to-door
        cost of each option side by side.
      </p>
      <BarChart
        title="Cost components people leave out of a drive-versus-fly comparison"
        description="Typical omitted cost items. On the flying side: airport parking or transfers, checked baggage, and hire car at the destination. On the driving side: tolls, an overnight stop on long routes, and the time cost of the drive."
        data={[
          { label: "Airport transfer", value: 90 },
          { label: "Checked bags ×4", value: 160 },
          { label: "Hire car 3 days", value: 270, highlight: true },
          { label: "Tolls (driving)", value: 40 },
          { label: "Overnight stop", value: 180 },
        ]}
        unitSuffix=" $"
        precision={0}
        seriesLabel="Typical omitted cost"
      />
      <p>
        <em>
          Indicative Australian figures for a family trip; substitute your own. The point is the
          pattern — the items missing from a naive comparison usually favour driving for groups
          and flying for solo travellers.
        </em>
      </p>
      <p>
        Time is the term people weigh least consistently. A 900 km drive is roughly ten hours
        door to door; the flight equivalent is around four once you include getting to the
        airport, security and collecting bags. Whether the six-hour difference is worth several
        hundred dollars depends entirely on the trip — but it should be a stated assumption, not
        an unexamined one.
      </p>

      <h2>Splitting a carpool without an argument</h2>
      <p>
        The defensible basis is cost per passenger-kilometre: total trip fuel divided among the
        people actually in the car for each leg. Someone joining halfway pays for half the
        distance, not half the trip. Whether the driver pays a share is a social question rather
        than an arithmetic one — the common conventions are an equal split including the driver,
        or an equal split of fuel with the driver absorbing wear and tolls.
      </p>
      <p>
        For a recurring carpool it is worth agreeing the rule once, in writing, at the current
        fuel price and revisiting it when the price moves more than about 10%. That single
        decision prevents most of the friction.
      </p>

      <h2>Refuelling on the route</h2>
      <p>
        Regional prices run consistently above capital-city ones — on 19 August 2026 the regional
        aggregate was {REGIONAL_AVERAGE.petrol.toFixed(1)} cpl against{" "}
        {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl in the five largest cities. On a long trip,
        filling at the last metropolitan site before you leave and again on the metropolitan
        fringe on the way back is worth real money for no detour.
      </p>
      <p>
        The spread within a single city is wider still than the gap between cities, so a state
        fuel app is worth a minute before you set off.
      </p>

      <h2>Related sections</h2>
      <p>
        Towing a van on the trip changes the maths substantially — see{" "}
        <Link href="/towing">towing and caravans</Link>. For per-vehicle annual costs rather than
        per-trip, see <Link href="/vehicles">vehicle running costs</Link>. Longer guides:{" "}
        <Link href="/blog/petrol-cost-per-km-australia">petrol cost per km</Link> and{" "}
        <Link href="/blog/how-to-reduce-commute-fuel-costs">reducing commute fuel costs</Link>.
      </p>
    </HubPage>
  );
}
