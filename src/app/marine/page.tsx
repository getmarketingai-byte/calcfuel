import Link from "next/link";
import HubPage, { hubMetadata } from "@/components/HubPage";
import BarChart from "@/components/charts/BarChart";

export const metadata = hubMetadata(
  "Marine Fuel Planning",
  "How boat fuel burn actually behaves — hull type, the speed cube, the one-third rule and reserve margin — plus the planner that turns it into litres, dollars and safe range.",
  "/marine",
);

export default function MarineHub() {
  return (
    <HubPage
      title="Marine fuel planning"
      description="On the water a fuel miscalculation is a safety problem, not a budget problem. This section covers how burn rate behaves, why speed dominates everything else, and how much fuel to leave untouched."
      lastUpdated="21 August 2026"
      tools={[
        {
          href: "/calculators/boat-fuel-calculator",
          label: "Boat Trip Fuel Planner",
          blurb:
            "Fuel required, trip cost, travel time and safe range for a specific passage — from a known burn rate, or an HP estimate when you do not have one.",
        },
        {
          href: "/calculators/emergency-fuel-rationing-calculator",
          label: "Emergency Fuel Rationing",
          blurb:
            "How long a fixed quantity of fuel lasts when supply is uncertain — useful for extended time at anchor or on a remote mooring.",
        },
      ]}
    >
      <h2>Why boat fuel planning is a different problem to car fuel planning</h2>
      <p>
        A car&rsquo;s fuel economy is roughly stable across the speeds you actually drive. A
        planing boat&rsquo;s is not. Hydrodynamic drag on a planing hull rises with roughly the
        square of speed, and the power needed to overcome it with roughly the cube — so a boat
        that burns 20 litres an hour at 18 knots can burn close to 35 at 24 knots while covering
        only a third more distance. The fuel you need is not proportional to how far you are
        going; it is proportional to how fast you insist on getting there.
      </p>
      <p>
        There is also no fuel station between you and the destination. A car that misjudges its
        range coasts to a stop on a verge. A boat that misjudges its range is adrift, usually in
        a rising sea state, often out of VHF range of anyone who can help. Everything in this
        section is built around that asymmetry: plan conservatively, and treat the last third of
        the tank as though it does not exist.
      </p>

      <h2>Hull type sets the shape of the fuel curve</h2>
      <h3>Planing hulls</h3>
      <p>
        Bowriders, centre consoles and sportscruisers lift onto the water surface once they pass
        the transition &ldquo;hump&rdquo;. Fuel consumption spikes hard through that transition,
        then settles once the boat is up and running. Counter-intuitively, dawdling just below
        planing speed is one of the most expensive ways to travel — the hull is pushing water
        aside without the lift that makes planing efficient. If you must go slow, go properly
        slow at displacement speed rather than sitting on the hump.
      </p>
      <h3>Displacement hulls</h3>
      <p>
        Trawlers, full-keel yachts under motor and lobster-style cruisers push through the water
        rather than over it. Their maximum practical speed is set by waterline length — hull
        speed in knots is about 1.34 × √(waterline length in feet) — but within that limit they
        are dramatically more efficient. A 40-foot trawler at 8 knots can achieve fuel economy
        comparable to a planing hull travelling twice as fast, which is why long-range cruising
        boats are almost all displacement designs.
      </p>
      <h3>Pontoons and tritoons</h3>
      <p>
        Parallel-tube hulls carry high drag at speed and are usually most economical in a narrow
        cruise band well below wide-open throttle. Adding a third tube and a larger engine buys
        speed at a steep fuel cost. Where a planing monohull rewards finding the efficient cruise
        RPM, a pontoon punishes leaving it more severely.
      </p>

      <h2>What a speed change costs you</h2>
      <p>
        The chart below shows the pattern the planner models: fuel burn against cruise speed for
        a typical mid-size planing hull. Note that the burn rate keeps climbing after the point
        where the extra speed stops meaningfully shortening the trip.
      </p>

      <BarChart
        title="Indicative fuel burn against cruise speed, planing hull"
        description="Illustrative relationship between cruise speed and hourly fuel burn for a planing hull. Burn rises steeply with speed because required power scales with roughly the cube of speed. Values are indicative of the modelled relationship, not measurements of a specific vessel."
        data={[
          { label: "10 kn", value: 12 },
          { label: "14 kn", value: 17 },
          { label: "18 kn", value: 24 },
          { label: "22 kn", value: 33 },
          { label: "26 kn", value: 45, highlight: true },
        ]}
        unitSuffix=" L/h"
        precision={0}
        seriesLabel="Indicative burn rate"
      />
      <p>
        <em>
          Indicative of the cubic power relationship the planner applies, not a measurement of a
          particular vessel. Your engine&rsquo;s published consumption curve is always the better
          input.
        </em>
      </p>

      <h2>The one-third rule, and why the planner assumes 85% usable</h2>
      <p>
        The long-standing convention is to divide usable fuel into thirds: one to get out, one to
        get back, one untouched. That gives you a genuine reserve for a headwind on the return
        leg, an unexpected detour, a fouled prop or a slower passage than planned.
      </p>
      <p>
        Separately from the one-third rule, tank capacity on the spec sheet is not fuel you can
        actually use. Pickup height, trim angle and the practical impossibility of running a tank
        dry mean the last portion is unavailable. The Boat Trip Fuel Planner applies an 85%
        usable-capacity factor before applying any one-third guidance, so the range it reports is
        already the conservative number rather than the theoretical one.
      </p>

      <h2>Getting a burn rate you can trust</h2>
      <p>
        In descending order of reliability: a flow meter reading at your actual cruise RPM; your
        engine manufacturer&rsquo;s published consumption curve at that RPM; litres burned divided
        by hours run across several logged trips; and — only if you have none of those — a
        horsepower-based estimate. The planner supports the last of these but labels it as
        approximate, because the same horsepower on a different hull with a different load can
        burn materially differently.
      </p>
      <p>
        Whatever source you use, add margin for load. A boat carrying full water tanks, a full
        crew and dive gear needs more power for the same speed and will burn 10–15% more than the
        same hull running light.
      </p>

      <h2>Fuel price at the marina</h2>
      <p>
        Marine fuel is usually dearer than road fuel, and the gap is not constant. Before pricing
        a trip, check what the road price is doing — our{" "}
        <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> page carries
        current capital-city averages and the 2026 excise timeline, which moved pump prices twice
        this year. Then add the marina premium you actually pay locally rather than a generic
        allowance.
      </p>

      <h2>Related sections</h2>
      <p>
        For trailering the boat to the ramp, see <Link href="/towing">towing and caravans</Link>.
        For comparing a boating trip against a driving one, see{" "}
        <Link href="/trip-planning">trip planning</Link>.
      </p>
    </HubPage>
  );
}
