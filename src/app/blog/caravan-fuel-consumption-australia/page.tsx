import { reviewDateFor } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import BarChart from "@/components/charts/BarChart";
import { TOWING_SOURCES, TRAILER_PENALTIES } from "@/domain/models/towingTrip";

const SRC = TOWING_SOURCES;
import { DEFAULT_DIESEL_PRICE_AUD_PER_L, REGIONAL_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so the diesel figures follow the latest ACCC transcription. */
export const revalidate = 3600;

const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
const REGIONAL_DIESEL = REGIONAL_AVERAGE.diesel / 100;
const pen = (id: string) => TRAILER_PENALTIES.find((t) => t.id === id)!.penaltyPercent;
const CARAVAN = pen("caravan");
const HEAVY = pen("large");
/** Illustrative diesel 4WD or dual-cab ute, unhitched highway figure. */
const SOLO = 10.5;
const towed = (pct: number) => SOLO * (1 + pct / 100);
const tripCost = (km: number, l100: number, price = DIESEL) => (km / 100) * l100 * price;

const ROUTES = [
  { route: "Melbourne → Adelaide", km: 730 },
  { route: "Sydney → Melbourne (Hume)", km: 880 },
  { route: "Sydney → Gold Coast (Pacific)", km: 900 },
  { route: "Brisbane → Cairns (Bruce)", km: 1700 },
  { route: "Perth → Darwin (coastal)", km: 4000 },
];

export const metadata: Metadata = createPageMetadata({
  title: "Caravan Fuel Consumption in Australia (2026)",
  description: `How much more fuel a caravan uses: published Australian sources range from +30% to roughly double. A ${SOLO} L/100km ute at +${CARAVAN}% uses ${towed(CARAVAN).toFixed(1)} L/100km.`,
  path: "/blog/caravan-fuel-consumption-australia",
  type: "article",
});

const faqs = [
  {
    question: "How much extra fuel does towing a caravan use?",
    answer: `Published Australian sources range widely. Practical Motoring says towing can lift consumption more than 30%; Austrack Campers puts a caravan at 30–50%. Measured magazine tow tests of 1,600–2,400 kg vans at highway speed found consumption roughly doubled — a Subaru Outback 3.6R around 19 L/100km, a Mitsubishi Pajero diesel 21–24 L/100km against 10–11 solo. CalcFuel's towing calculator uses +${CARAVAN}% for a caravan and +${HEAVY}% for a heavy van at highway speed.`,
  },
  {
    question: "What does a caravan trip cost in diesel?",
    answer: `Sydney to Melbourne is about 880 km. A diesel ute using ${SOLO} L/100km solo and ${towed(CARAVAN).toFixed(1)} L/100km towing (+${CARAVAN}%) uses ${((880 / 100) * towed(CARAVAN)).toFixed(0)} litres — ${aud(tripCost(880, towed(CARAVAN)))} at the ACCC five-city diesel average of ${perLitre(DIESEL)}/L, or ${aud(tripCost(880, towed(CARAVAN), REGIONAL_DIESEL))} at the regional average of ${perLitre(REGIONAL_DIESEL)}/L.`,
  },
  {
    question: "Does a pop-top use less fuel than a full-height caravan?",
    answer: "Slightly. Caravan World towed otherwise-identical 5.95 m Coronet vans over the same route: the full-height averaged 15.07 L/100km and the pop-top 14.37 L/100km, about 0.7 L/100km or 5% apart. Speed and the tow vehicle made a bigger difference than the roof.",
  },
  {
    question: "Does speed affect caravan fuel consumption?",
    answer: "More than anything else you control. RACV notes that dropping from 110 km/h to 90 km/h can save several litres per 100 km when towing. In caravancampingsales.com.au's Outback tow test, consumption that touched 22 L/100km at higher speed settled around 19 L/100km at 80–90 km/h.",
  },
  {
    question: "How do I work out my own towing fuel use?",
    answer: "Fill the tank before you hitch up, reset the trip meter, and at the next fill divide litres by kilometres towed and multiply by 100. Compare with your solo figure from normal driving to get your own penalty percentage, then use it as a custom penalty in the towing calculator.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function CaravanFuelConsumptionPage() {
  return (
    <BlogArticleLayout
      title="Caravan Fuel Consumption in Australia (2026)"
      description="How much more fuel a caravan really uses, according to the published Australian tests and guidance — why the range is so wide, what moves it, and what common trips cost in diesel this week."
      publishedDate="2026-06-30"
      readTime="7 min read"
      category="Fuel & Caravan"
      slug="caravan-fuel-consumption-australia"
      reviewedOn={reviewDateFor("/blog/caravan-fuel-consumption-australia")}
      relatedLinks={[
        { href: "/calculators/towing-fuel-cost-calculator", label: "Towing Fuel Cost Calculator" },
        { href: "/towing", label: "Towing & caravans guide" },
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/calculators/fuel-budget-planner", label: "Fuel Budget Planner" },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Fuel is the biggest variable cost of a caravan trip, and the figure people quote for how much a van adds
        is usually a guess. This guide sets out what published Australian tests and guidance actually say, why
        they disagree, and what that means in litres and dollars at this week&rsquo;s ACCC diesel price.
      </p>

      <h2>How much more fuel does a caravan use?</h2>
      <p>
        General guidance clusters around 30–50%: Practical Motoring says towing can lift consumption more than
        30%, and Austrack Campers puts a caravan at 30–50%. Measured tow tests of heavier vans at highway speed
        come in higher — two published tests of 1,600–2,400 kg vans found consumption roughly doubled. A diesel
        4WD that uses {SOLO} L/100km solo could therefore use anywhere from about {towed(30).toFixed(1)} to{" "}
        {towed(HEAVY).toFixed(0)} L/100km with a van behind it, depending on the van, the speed and the road.
      </p>
      <ul>
        <li><a href={SRC.practicalMotoring.url} target="_blank" rel="noopener noreferrer">Practical Motoring</a> ({SRC.practicalMotoring.date}): towing consumption can run more than 30% above solo, depending on vehicle, trailer and conditions.</li>
        <li><a href={SRC.austrack.url} target="_blank" rel="noopener noreferrer">Austrack Campers</a>: a caravan typically adds 30–50%.</li>
        <li><a href={SRC.ccsOutback.url} target="_blank" rel="noopener noreferrer">caravancampingsales.com.au Outback tow test</a> ({SRC.ccsOutback.date}): about 19 L/100km with a ~1,600 kg van at 80–90 km/h, around double the car&rsquo;s solo use.</li>
        <li><a href={SRC.cwPajero.url} target="_blank" rel="noopener noreferrer">Caravan World Pajero tow test</a> ({SRC.cwPajero.date}): 21–24 L/100km with a 2,400 kg van on the Stuart Highway, against 10–11 unhitched.</li>
        <li><a href={SRC.cwPopTop.url} target="_blank" rel="noopener noreferrer">Caravan World pop-top test</a> ({SRC.cwPopTop.date}): a full-height van used about 5% more than an otherwise-identical pop-top.</li>
      </ul>
      <p>
        The <Link href="/towing">towing guide</Link> lists every source with the preset it supports, including box
        and boat trailers.
      </p>

      <h2>Why do the published figures range so widely?</h2>
      <p>
        At highway speed most of the extra fuel goes into pushing air, and aerodynamic drag rises with the square
        of speed. A van towed at 100–110 km/h into a headwind sits at the top of the range; the same van at
        80–90 km/h on a calm day sits much lower. Weight matters most on hills and when accelerating. The tow
        vehicle matters too: a petrol engine working near its limit uses proportionally more than a large diesel.
      </p>
      <p>
        Van height matters less than most people expect. In {TOWING_SOURCES.cwPopTop.name.split(",")[0]}&rsquo;s
        back-to-back test of otherwise-identical 5.95 m vans, the full-height van used about 0.7 L/100km (5%) more
        than the pop-top.
      </p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>What do common caravan trips cost in diesel?</h2>
      <p>
        One-way diesel cost for a tow vehicle using {SOLO} L/100km solo, at the caravan preset (+{CARAVAN}%,{" "}
        {towed(CARAVAN).toFixed(1)} L/100km) and at the heavy-van figure (+{HEAVY}%,{" "}
        {towed(HEAVY).toFixed(0)} L/100km), priced at the ACCC five-city diesel average of {perLitre(DIESEL)}/L
        (prices to {SOURCE_REPORT.pricesToLabel}).
      </p>
      <table>
        <thead>
          <tr><th>Route</th><th>Distance</th><th>Solo</th><th>Caravan (+{CARAVAN}%)</th><th>Heavy van (+{HEAVY}%)</th></tr>
        </thead>
        <tbody>
          {ROUTES.map((r) => (
            <tr key={r.route}>
              <td>{r.route}</td>
              <td>{r.km.toLocaleString("en-AU")} km</td>
              <td>{aud(tripCost(r.km, SOLO))}</td>
              <td>{aud(tripCost(r.km, towed(CARAVAN)))}</td>
              <td>{aud(tripCost(r.km, towed(HEAVY)))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BarChart
        title="Sydney to Melbourne in diesel: solo vs towing"
        description={`One-way diesel cost for 880 km in a ${SOLO} L/100km tow vehicle, solo, at the +${CARAVAN}% caravan preset and at +${HEAVY}%, at ${perLitre(DIESEL)} per litre.`}
        data={[
          { label: "Solo", value: tripCost(880, SOLO) },
          { label: `Caravan +${CARAVAN}%`, value: tripCost(880, towed(CARAVAN)), highlight: true },
          { label: `Heavy van +${HEAVY}%`, value: tripCost(880, towed(HEAVY)) },
        ]}
        unitSuffix=" AUD"
        precision={0}
        seriesLabel="One-way diesel cost"
      />
      <p>
        Long trips pass through regional towns where diesel usually costs more: the ACCC&rsquo;s regional average
        was {perLitre(REGIONAL_DIESEL)}/L in the same report. Pricing a long tour at the regional average is a
        sensible buffer. The <Link href="/calculators/towing-fuel-cost-calculator">towing fuel cost calculator</Link>{" "}
        does the sum for your own vehicle, van and route.
      </p>

      <h2>How can you cut the towing fuel bill?</h2>
      <ul>
        <li><strong>Slow down.</strong> The single biggest lever. RACV says dropping from 110 to 90 km/h can save several litres per 100 km.</li>
        <li><strong>Get the van level.</strong> A nose-up van presents more frontal area and handles worse.</li>
        <li><strong>Run the right tyre pressures</strong> on both the tow vehicle and the van, set for the load.</li>
        <li><strong>Travel light.</strong> Carry water only where you need it and leave unused gear at home; weight costs fuel on every hill.</li>
        <li><strong>Plan fuel stops.</strong> Fill in larger towns before remote stretches and check prices on your state&rsquo;s fuel price app or website where one exists.</li>
      </ul>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <section className="not-prose mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="not-prose mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
        <strong>Note:</strong> Towing penalties are drawn from the published sources listed above and vary with
        vehicle, van, speed and terrain; measure your own. The {SOLO} L/100km tow vehicle is illustrative. Diesel prices
        are ACCC averages to {SOURCE_REPORT.pricesToLabel}.
      </aside>
    </BlogArticleLayout>
  );
}
