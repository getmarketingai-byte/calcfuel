import { reviewDateFor } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import BarChart from "@/components/charts/BarChart";
import { DEFAULT_PETROL_PRICE_AUD_PER_L, SOURCE_REPORT } from "@/lib/fuel-prices";
import { DMO_2026_27, DMO_RANGE, DMO_SOURCE, PUBLIC_DC_EXAMPLE, dmoCentsPerKwh } from "@/lib/electricity-prices";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so the petrol comparison follows the latest ACCC transcription. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
/** Illustrative mid-size EV consumption at the wall, including charging losses. */
const EV_KWH_100 = 17;
const PETROL_L_100 = 7.5;
const evPer100 = (rate: number) => EV_KWH_100 * rate;
const PETROL_100 = PETROL_L_100 * PETROL;
/** Electricity price at which an EV costs the same per 100 km as the petrol car. */
const PARITY_RATE = PETROL_100 / EV_KWH_100;
const DC = PUBLIC_DC_EXAMPLE.pricePerKwh;

export const metadata: Metadata = createPageMetadata({
  title: "EV Charging Cost in Australia (2026)",
  description: `What charging an EV costs in Australia: about ${aud(evPer100(DMO_RANGE.low), 2)}–${aud(evPer100(DMO_RANGE.high), 2)} per 100 km at AER reference prices vs ${aud(PETROL_100, 2)} for petrol (ACCC).`,
  path: "/blog/ev-charging-cost-australia",
  type: "article",
});

const faqs = [
  {
    question: "How much does it cost to charge an EV at home in Australia?",
    answer: `Multiply the car's kWh per 100 km by your electricity price. Using the AER's 2026–27 Default Market Offer reference bills, the all-in average price (including the daily supply charge) ranges from ${(DMO_RANGE.low * 100).toFixed(1)}c to ${(DMO_RANGE.high * 100).toFixed(1)}c per kWh across the regions it covers. A mid-size EV using ${EV_KWH_100} kWh/100km at the wall costs ${aud(evPer100(DMO_RANGE.low), 2)}–${aud(evPer100(DMO_RANGE.high), 2)} per 100 km at those prices. Off-peak, EV and solar charging can cost much less.`,
  },
  {
    question: "Is charging an EV cheaper than petrol?",
    answer: `At home, almost always. A ${PETROL_L_100} L/100km petrol car costs ${aud(PETROL_100, 2)} per 100 km at the ACCC five-city average of ${perLitre(PETROL)}/L. An EV using ${EV_KWH_100} kWh/100km only matches that if electricity costs ${(PARITY_RATE * 100).toFixed(0)}c per kWh — well above every Default Market Offer average. Public fast charging can approach or exceed that price.`,
  },
  {
    question: "How much does public fast charging cost?",
    answer: `Each network sets its own per-kWh price, and it is usually far above home rates. One published example: Viva Energy's 350 kW chargers at its Geelong hub charge $${DC.toFixed(2)}/kWh — ${aud(evPer100(DC), 2)} per 100 km for a ${EV_KWH_100} kWh/100km EV, against ${aud(PETROL_100, 2)} for a ${PETROL_L_100} L/100km petrol car. Check the price in the network's app before you plug in.`,
  },
  {
    question: "What electricity price should I use for EV charging?",
    answer: "The usage rate on your own bill for the time you charge — not the all-in average. The daily supply charge is paid whether or not you own an EV, so the extra cost of charging is just the usage rate. If you charge overnight on a time-of-use plan, use the off-peak rate. Compare plans on the AER's Energy Made Easy site (Victorian Energy Compare in Victoria).",
  },
  {
    question: "Does charging an EV from solar cost nothing?",
    answer: "Not quite. Each kWh you put into the car is a kWh you do not export, so its cost is the feed-in tariff you give up. That is usually far lower than the price you pay for grid electricity, which makes daytime solar charging the cheapest option for most owners with panels.",
  },
  {
    question: "How much energy is lost when charging?",
    answer: "Some energy is lost as heat in the charger and battery, so the kWh drawn from the wall is higher than the kWh the car reports using. Losses are generally larger on slow charging from a standard power point than on a dedicated wall charger. Use kWh measured at the wall if you can; the calculator lets you add a loss percentage.",
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

export default function EvChargingCostArticlePage() {
  return (
    <BlogArticleLayout
      title="EV Charging Cost in Australia (2026)"
      description="What it costs to charge an electric car in Australia per 100 km — at the AER's reference electricity prices, on off-peak and solar, and at a public fast charger — against petrol at this week's ACCC price."
      publishedDate="2026-07-01"
      readTime="7 min read"
      category="EV & Electric Vehicles"
      slug="ev-charging-cost-australia"
      reviewedOn={reviewDateFor("/blog/ev-charging-cost-australia")}
      relatedLinks={[
        { href: "/calculators/ev-charging-cost-calculator", label: "EV Charging Cost Calculator" },
        { href: "/calculators/ev-vs-gas-calculator", label: "EV vs Petrol Cost Calculator (5-year TCO)" },
        { href: "/calculators/hybrid-vs-gas-calculator", label: "Hybrid vs Petrol Calculator" },
        { href: "/blog/car-running-costs-australia", label: "How Much Does It Cost to Run a Car in Australia?" },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Work out your own charging cost</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your car&rsquo;s kWh/100km, your tariff and your kilometres.</p>
        <Link href="/calculators/ev-charging-cost-calculator" className="inline-block bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-800 transition-colors text-sm">
          Open the EV Charging Cost Calculator →
        </Link>
      </div>

      <p>
        An EV&rsquo;s running cost comes down to one sum: <strong>kWh per 100 km × price per kWh</strong>. The
        consumption figure varies less between cars than the price varies between tariffs and chargers, so where
        and when you charge matters more than which EV you drive. This guide prices charging with published
        Australian figures: the AER&rsquo;s Default Market Offer for household electricity and the ACCC&rsquo;s
        five-city average for petrol.
      </p>

      <h2>What does home charging cost at reference electricity prices?</h2>
      <p>
        The AER sets a Default Market Offer (DMO) each financial year for households on standing offers in NSW,
        south-east Queensland and South Australia, expressed as an annual bill at a benchmark usage. Dividing the
        bill by the usage gives an all-in average price per kWh, including the daily supply charge. That makes it
        an upper reference for charging: the supply charge is paid regardless, and most EV owners charge on
        cheaper off-peak or solar power.
      </p>
      <table>
        <thead>
          <tr><th>Network area</th><th>DMO 2026–27 annual bill</th><th>Usage</th><th>All-in c/kWh</th><th>EV per 100 km*</th></tr>
        </thead>
        <tbody>
          {DMO_2026_27.map((r) => (
            <tr key={r.network}>
              <td>{r.network} — {r.region}</td>
              <td>{aud(r.annualBill)}</td>
              <td>{r.usageKwh.toLocaleString("en-AU")} kWh</td>
              <td>{dmoCentsPerKwh(r).toFixed(1)}c</td>
              <td>{aud(evPer100(dmoCentsPerKwh(r) / 100), 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <em>*{EV_KWH_100} kWh/100km at the wall, an illustrative mid-size EV including charging losses. Source:{" "}
        <a href={DMO_SOURCE.url} target="_blank" rel="noopener noreferrer">{DMO_SOURCE.name}</a>, published{" "}
        {DMO_SOURCE.published}. Victoria sets its own Victorian Default Offer, and the other states and territories
        set their own reference or regulated prices.</em>
      </p>

      <BarChart
        title="Energy cost per 100 km: EV vs petrol"
        description={`Cost per 100 km for an EV using ${EV_KWH_100} kWh/100km at the lowest and highest AER Default Market Offer all-in average and at a published public fast-charging price, against a ${PETROL_L_100} L/100km petrol car at the ACCC five-city average.`}
        data={[
          { label: "EV, lowest DMO average", value: evPer100(DMO_RANGE.low) },
          { label: "EV, highest DMO average", value: evPer100(DMO_RANGE.high) },
          { label: `EV, public DC at $${DC.toFixed(2)}/kWh`, value: evPer100(DC) },
          { label: `Petrol, ${PETROL_L_100} L/100km`, value: PETROL_100, highlight: true },
        ]}
        unitSuffix=" $/100 km"
        precision={2}
        seriesLabel="Dollars per 100 km"
      />

      <h2>How much cheaper are off-peak, EV plans and solar?</h2>
      <p>
        Most households can do better than the reference price. Time-of-use plans charge less overnight, some
        retailers offer plans with a dedicated EV charging window, and rooftop solar lets you charge during the day
        for the cost of the feed-in tariff you forgo. The marginal cost of charging is the usage rate for the hours
        you charge — not the all-in average above. Compare current plans for your address on the AER&rsquo;s
        Energy Made Easy site, or Victorian Energy Compare in Victoria, and read the off-peak usage rate from the
        plan&rsquo;s fact sheet.
      </p>
      <p>
        Whatever the tariff, the break-even is simple: an EV using {EV_KWH_100} kWh/100km matches a{" "}
        {PETROL_L_100} L/100km petrol car at {perLitre(PETROL)}/L only when electricity costs{" "}
        <strong>{(PARITY_RATE * 100).toFixed(0)}c per kWh</strong>. Every Default Market Offer average sits well below that.
      </p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>What does public fast charging cost?</h2>
      <p>
        DC fast chargers are priced by each network per kWh, sometimes with idle fees, and they cost much more than
        home power. One published example is Viva Energy&rsquo;s Geelong hub, where 350 kW CCS2 chargers cost{" "}
        ${DC.toFixed(2)}/kWh — {aud(evPer100(DC), 2)} per 100 km for a {EV_KWH_100} kWh/100km car, against{" "}
        {aud(PETROL_100, 2)} for the petrol comparison. A road trip charged entirely at fast chargers can cost close
        to petrol; a commute charged at home costs a fraction of it. Check the price in the network&rsquo;s app before
        plugging in.
      </p>

      <h2>What does a daily commute cost to charge?</h2>
      <p>
        A 50 km round trip, five days a week for about 230 working days, is 11,500 km a year. In a{" "}
        {EV_KWH_100} kWh/100km EV that is {(115 * EV_KWH_100).toLocaleString("en-AU")} kWh — {aud(115 * evPer100(DMO_RANGE.low))}{" "}
        at the lowest DMO average or {aud(115 * evPer100(DMO_RANGE.high))} at the highest. The same distance in a{" "}
        {PETROL_L_100} L/100km petrol car costs {aud(115 * PETROL_100)} at {perLitre(PETROL)}/L. Charging off-peak or from
        solar widens the gap further.
      </p>

      <h2>How do you work out your own charging cost?</h2>
      <p>
        <strong>Cost per 100 km = kWh/100km at the wall × price per kWh.</strong> Use the car&rsquo;s trip-computer
        figure plus an allowance for charging losses, or better, the kWh measured at a smart charger. For the price,
        use the usage rate for the hours you charge. The{" "}
        <Link href="/calculators/ev-charging-cost-calculator">EV charging cost calculator</Link> does this with your
        own figures, and the <Link href="/calculators/ev-vs-gas-calculator">EV vs petrol calculator</Link> adds purchase
        price and a multi-year comparison.
      </p>

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
        <strong>Note:</strong> Electricity figures are the AER Default Market Offer 2026–27 reference bills divided by
        benchmark usage (all-in averages including supply charges). Petrol is the ACCC five-city average to{" "}
        {SOURCE_REPORT.pricesToLabel}. EV consumption is illustrative; use your own car&rsquo;s figure.
      </aside>
    </BlogArticleLayout>
  );
}
