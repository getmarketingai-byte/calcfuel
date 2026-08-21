import type { Metadata } from "next";
import Link from "next/link";
import BarChart from "@/components/charts/BarChart";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import { createPageMetadata } from "@/lib/seo";
import { FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";

export const metadata: Metadata = createPageMetadata({
  title: "Fuel Efficiency Comparison",
  description:
    "Fuel efficiency compared across cars, SUVs, utes, motorcycles, hybrids and EVs — L/100km, MPG and cost per 100 km at current Australian prices.",
  path: "/fuel-efficiency-comparison",
});

const PETROL = FIVE_CITY_AVERAGE.petrol / 100;
const DIESEL = FIVE_CITY_AVERAGE.diesel / 100;

/** Indicative combined-cycle consumption by class. Sources noted on the page. */
const CLASSES = [
  { label: "Motorcycle, mid-size", l100: 4.6, fuel: "petrol" as const },
  { label: "Hybrid small car", l100: 4.2, fuel: "petrol" as const },
  { label: "Hybrid mid SUV", l100: 5.0, fuel: "petrol" as const },
  { label: "Small petrol car", l100: 6.3, fuel: "petrol" as const },
  { label: "Mid-size sedan", l100: 7.5, fuel: "petrol" as const },
  { label: "Mid-size SUV, petrol", l100: 8.5, fuel: "petrol" as const },
  { label: "Diesel dual-cab ute", l100: 8.6, fuel: "diesel" as const },
  { label: "Large SUV, petrol", l100: 11.5, fuel: "petrol" as const },
  { label: "Heavy 4WD", l100: 14.0, fuel: "diesel" as const },
];

const costPer100 = (l100: number, fuel: "petrol" | "diesel") =>
  l100 * (fuel === "diesel" ? DIESEL : PETROL);

const mpg = (l100: number) => 235.215 / l100;

export default function FuelEfficiencyComparisonPage() {
  const best = CLASSES[0];
  const worst = CLASSES[CLASSES.length - 1];
  const spread = costPer100(worst.l100, worst.fuel) - costPer100(best.l100, best.fuel);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Fuel efficiency comparison", path: "/fuel-efficiency-comparison" },
        ]}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Fuel efficiency comparison</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel efficiency comparison
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Nine vehicle classes compared on the only basis that lets you compare them — what each one
        costs to move 100 kilometres, at this week&rsquo;s Australian fuel prices. Consumption
        figures in L/100km and MPG, energy cost in dollars, and the reason a straight MPG
        comparison misleads you.
      </p>
      <CalcReviewedBy lastUpdated="21 August 2026" />

      <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/40 p-5 mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          The short answer
        </h2>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          A mid-size motorcycle at 4.6 L/100km costs about ${costPer100(best.l100, best.fuel).toFixed(2)}{" "}
          per 100 km. A heavy 4WD at 14 L/100km costs about $
          {costPer100(worst.l100, worst.fuel).toFixed(2)}. That is a spread of $
          {spread.toFixed(2)} per 100 km, or roughly $
          {(spread * 150).toFixed(0)} a year at 15,000 km — before servicing, tyres or
          depreciation. Prices are the five-city average on {SOURCE_REPORT.pricesToLabel}.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        How does fuel efficiency compare across vehicle types?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Efficiency differences between classes are far larger than differences within them. Moving
        from a large SUV to a mid-size one saves more fuel than any driving technique, tyre
        pressure regime or fuel additive will ever recover. The table below gives indicative
        combined-cycle consumption for each class, converted to both scales and priced at current
        Australian averages.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            Indicative combined-cycle consumption by class. Petrol at{" "}
            {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl and diesel at{" "}
            {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl — five-city averages on{" "}
            {SOURCE_REPORT.pricesToLabel}, from{" "}
            <Link
              href="/data/australian-fuel-prices"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              our fuel price data
            </Link>
            . Fuel cost only.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3 font-semibold">Vehicle class</th>
              <th className="py-2 pr-3 font-semibold">L/100km</th>
              <th className="py-2 pr-3 font-semibold">MPG</th>
              <th className="py-2 pr-3 font-semibold">Fuel</th>
              <th className="py-2 pr-3 font-semibold">Per 100 km</th>
              <th className="py-2 font-semibold">15,000 km/yr</th>
            </tr>
          </thead>
          <tbody>
            {CLASSES.map((c) => (
              <tr key={c.label} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-3">{c.label}</td>
                <td className="py-2 pr-3">{c.l100.toFixed(1)}</td>
                <td className="py-2 pr-3">{mpg(c.l100).toFixed(0)}</td>
                <td className="py-2 pr-3 capitalize">{c.fuel}</td>
                <td className="py-2 pr-3">${costPer100(c.l100, c.fuel).toFixed(2)}</td>
                <td className="py-2">
                  ${Math.round(costPer100(c.l100, c.fuel) * 150).toLocaleString("en-AU")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BarChart
        title="Annual fuel cost by vehicle class at 15,000 km"
        description="Annual fuel cost in dollars for nine vehicle classes driving 15,000 kilometres a year, at current Australian five-city average prices. A heavy 4WD costs roughly four times a mid-size motorcycle."
        data={CLASSES.map((c) => ({
          label: c.label.replace(", petrol", "").replace(", mid-size", ""),
          value: Math.round(costPer100(c.l100, c.fuel) * 150),
          highlight: c.label === worst.label,
        }))}
        unitSuffix=""
        precision={0}
        seriesLabel="Annual fuel cost, $"
      />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Why does comparing MPG mislead you?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Because the MPG scale is not linear in fuel used. Going from 20 to 25 MPG saves 2.4 litres
        per 100 km. Going from 40 to 45 MPG — the same five-mile-per-gallon step — saves only 0.8.
        Ranking two vehicles by MPG tells you which is more efficient, but the size of the gap
        between them is systematically distorted, and always in the direction of making
        improvements at the efficient end look bigger than they are.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        L/100km does not have this problem: it is linear in fuel, so a difference of 2 L/100km
        means the same amount of fuel wherever it sits on the scale. This is why Australia, and
        most of the world outside the US and UK, uses it. If you have MPG figures, convert with{" "}
        <strong>L/100km = 235.215 ÷ MPG</strong> before comparing, or use the{" "}
        <Link
          href="/calculators/fuel-economy-savings-calculator"
          className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          fuel economy calculator
        </Link>
        .
      </p>

      <BarChart
        title="Equal MPG steps are not equal fuel savings"
        description="Litres per 100 kilometres at five MPG figures. The gap between 20 and 25 MPG is 2.4 litres per 100 km; the gap between 35 and 40 MPG is only 0.8, despite being the same step in MPG."
        data={[20, 25, 30, 35, 40].map((m) => ({
          label: `${m} MPG`,
          value: Number((235.215 / m).toFixed(1)),
          highlight: m === 20,
        }))}
        unitSuffix=" L/100km"
        seriesLabel="Consumption at each MPG figure"
      />


      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        MPG to L/100km conversion table
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Divide 235.215 by the MPG figure to get L/100km, and divide 235.215 by L/100km to go the
        other way. The same constant works in both directions because the two scales are
        reciprocals. Common values:
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            US gallons. UK (imperial) gallons are about 20% larger, so a UK MPG figure converts
            with 282.481 instead of 235.215.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3 font-semibold">MPG</th>
              <th className="py-2 pr-3 font-semibold">L/100km</th>
              <th className="py-2 pr-3 font-semibold">MPG</th>
              <th className="py-2 font-semibold">L/100km</th>
            </tr>
          </thead>
          <tbody>
            {[
              [20, 45], [25, 50], [30, 54], [35, 58], [40, 60], [45, 64], [50, 70],
            ].map(([a, b]) => (
              <tr key={a} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-3">{a}</td>
                <td className="py-2 pr-3">{(235.215 / a).toFixed(1)}</td>
                <td className="py-2 pr-3">{b}</td>
                <td className="py-2">{(235.215 / b).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        For a value not in the table, the{" "}
        <Link
          href="/calculators/fuel-economy-savings-calculator"
          className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          fuel economy calculator
        </Link>{" "}
        converts either way and prices the result at current Australian fuel prices.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Is a hybrid, an EV or a petrol car cheapest to run?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        On energy cost alone, an EV charged at home off-peak wins comfortably, a hybrid comes
        second, and a petrol or gas car of the same size comes last. At 16 kWh/100 km and a 28
        c/kWh off-peak tariff an EV costs about $4.48 per 100 km, against roughly $
        {costPer100(4.2, "petrol").toFixed(2)} for an efficient hybrid and $
        {costPer100(8.5, "petrol").toFixed(2)} for a mid-size petrol SUV.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        That ranking flips on two conditions. Charge mostly on public DC at 65 c/kWh and the EV
        lands near $10.40 per 100 km — worse than the hybrid. And energy cost is not purchase
        price: a premium of $12,000 takes years of savings to recover, and how many years depends
        almost entirely on your annual distance. The{" "}
        <Link
          href="/calculators/ev-vs-gas-calculator"
          className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          EV vs petrol calculator
        </Link>{" "}
        and the{" "}
        <Link
          href="/calculators/hybrid-vs-gas-calculator"
          className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          hybrid vs petrol calculator
        </Link>{" "}
        work the break-even out at your own numbers.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        How much of the published figure will you actually get?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Expect 10–20% worse than the manufacturer&rsquo;s combined WLTP rating, and worse again in
        specific conditions. The rating is measured on a standardised cycle; your commute is not
        that cycle. Four things move real consumption furthest from the brochure:
      </p>
      <ul className="list-disc list-outside pl-5 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Short trips from cold.</strong> An engine below operating temperature can use
          30–50% more fuel for the first few kilometres. A 5 km commute may never leave that band.
        </li>
        <li>
          <strong>Speed.</strong> Aerodynamic drag rises with the square of speed and the power to
          overcome it with the cube. Highway consumption at 110 km/h is materially worse than at
          90.
        </li>
        <li>
          <strong>Load and shape.</strong> A roof box or a towed trailer changes frontal area,
          which matters far more at highway speed than the weight does.
        </li>
        <li>
          <strong>Tyre pressure.</strong> Under-inflation raises rolling resistance on every
          kilometre you drive, and it is the only item on this list that costs nothing to fix.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        What is a good fuel efficiency figure in Australia?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        For a small car, under 6.5 L/100km is competitive and under 5 is very good. For a mid-size
        SUV, under 8 is competitive and under 6 usually means a hybrid. For a dual-cab ute, under
        8.5 is good and anything under 8 is exceptional. Heavy 4WDs rarely beat 12 in real use
        regardless of the rating.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        The more useful test is not the number but the cost: work out what your current vehicle
        costs per 100 km from the table above, multiply by your annual distance, and compare that
        against the vehicle you are considering. A 2 L/100km improvement at 15,000 km a year is
        worth about ${(2 * 150 * PETROL).toFixed(0)} a year at today&rsquo;s petrol price — useful,
        but rarely enough on its own to justify changing cars.
      </p>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        People usually arrive at this question holding one number — the figure their own car
        returns — and wanting to know where it sits. This table answers that directly.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            Verdict by combined consumption, for a passenger vehicle in Australian conditions.
            Annual fuel cost at 15,000 km and {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3 font-semibold">Consumption</th>
              <th className="py-2 pr-3 font-semibold">MPG</th>
              <th className="py-2 pr-3 font-semibold">Verdict</th>
              <th className="py-2 pr-3 font-semibold">Typical of</th>
              <th className="py-2 font-semibold">15,000 km/yr</th>
            </tr>
          </thead>
          <tbody>
            {[
              { l: 5, v: "Excellent", t: "Hybrid, or a small efficient petrol car" },
              { l: 6, v: "Very good", t: "Small car, or an efficient hybrid SUV" },
              { l: 7, v: "Good", t: "Small to mid-size petrol car" },
              { l: 8, v: "About average", t: "Mid-size sedan or small SUV" },
              { l: 9, v: "Slightly thirsty", t: "Mid-size SUV, or city driving in a smaller car" },
              { l: 10, v: "Thirsty", t: "Large SUV, ute, or heavy stop-start use" },
              { l: 12, v: "Poor for a car", t: "Large 4WD, or a car needing attention" },
              { l: 14, v: "Very poor for a car", t: "Heavy 4WD, towing, or a fault worth checking" },
            ].map((r) => (
              <tr key={r.l} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-3 font-medium">{r.l} L/100km</td>
                <td className="py-2 pr-3">{(235.215 / r.l).toFixed(0)}</td>
                <td className="py-2 pr-3">{r.v}</td>
                <td className="py-2 pr-3">{r.t}</td>
                <td className="py-2">
                  ${Math.round((r.l / 100) * 15000 * PETROL).toLocaleString("en-AU")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Two caveats before you judge your own figure. Read it against your vehicle&rsquo;s class,
        not against the table&rsquo;s midpoint — 9 L/100km is unremarkable in a large SUV and poor
        in a hatchback. And read it against how you drive: a short urban commute will sit two or
        three litres above the same car&rsquo;s highway figure, and that is normal rather than a
        fault.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        If your figure is more than about 20% above the manufacturer&rsquo;s combined rating and
        your driving has not changed, that is worth investigating — tyre pressure first, then air
        filter, then a service. A sudden jump usually has a mechanical cause; a gradual drift
        usually does not.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
        Where these figures come from
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Consumption figures are indicative class midpoints drawn from manufacturer combined-cycle
        ratings for common Australian models, rounded to one decimal. They are a starting point for
        comparison between classes, not a specification for any individual vehicle — for that,
        measure your own litres per 100 km across a few full-tank fills.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Fuel prices are transcribed from a single named ACCC weekly report and republished in full,
        with the retrieval date, on our{" "}
        <Link
          href="/data/australian-fuel-prices"
          className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          Australian fuel price data
        </Link>{" "}
        page. Because fuel excise moved twice in 2026, any comparison built on prices from earlier
        this year understates running costs by a wide margin.
      </p>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 mt-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          Run the comparison on your own numbers
        </h2>
        <ul className="text-sm space-y-1.5">
          <li>
            <Link
              href="/calculators/fuel-economy-savings-calculator"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Fuel economy calculator
            </Link>{" "}
            — convert MPG to L/100km and price an improvement.
          </li>
          <li>
            <Link
              href="/calculators/trip-fuel-cost-calculator"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Trip fuel cost calculator
            </Link>{" "}
            — what a specific journey costs in each vehicle.
          </li>
          <li>
            <Link
              href="/blog/most-fuel-efficient-cars-australia"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Most fuel efficient cars in Australia
            </Link>{" "}
            — named models ranked by L/100km.
          </li>
        </ul>
      </div>
    </div>
  );
}
