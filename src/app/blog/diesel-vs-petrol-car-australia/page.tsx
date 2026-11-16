import { reviewDateFor } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import BarChart from "@/components/charts/BarChart";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L, DEFAULT_PETROL_PRICE_AUD_PER_L, DIESEL_BY_CITY, PETROL_BY_CITY, SOURCE_REPORT } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
/** Diesel must use this fraction fewer litres than petrol to cost the same per km. */
const BREAK_EVEN = 1 - PETROL / DIESEL;
const cpk = (l100: number, price: number) => (l100 / 100) * price * 100; // cents per km
const year = (l100: number, price: number, km = 15000) => (km / 100) * l100 * price;
/** Example pairs: same vehicle size, petrol vs diesel consumption (illustrative, not a named model). */
const PAIRS = [
  { label: "Mid-size SUV", petrol: 8.5, diesel: 6.5 },
  { label: "Large SUV", petrol: 11.0, diesel: 8.0 },
  { label: "Dual-cab ute", petrol: 12.0, diesel: 8.5 },
];

export const metadata: Metadata = createPageMetadata({
  title: "Diesel vs Petrol in Australia (2026)",
  description:
    `Diesel vs petrol at today's ACCC prices: diesel ${perLitre(DIESEL)}/L, petrol ${perLitre(PETROL)}/L. Diesel must use ${Math.round(BREAK_EVEN * 100)}% fewer litres to cost less per km.`,
  path: "/blog/diesel-vs-petrol-car-australia",
  type: "article",
});

const faqs = [
  {
    question: "Is diesel or petrol cheaper to run in Australia?",
    answer: `It depends on how much less fuel the diesel uses. In the ACCC's latest report (prices to ${SOURCE_REPORT.pricesToLabel}) the five-city average was ${perLitre(DIESEL)}/L for diesel and ${perLitre(PETROL)}/L for regular unleaded, so a diesel must use at least ${Math.round(BREAK_EVEN * 100)}% fewer litres per 100 km just to match petrol on fuel cost. A diesel SUV at 6.5 L/100km costs ${cpk(6.5, DIESEL).toFixed(1)}c/km; a petrol one at 8.5 L/100km costs ${cpk(8.5, PETROL).toFixed(1)}c/km.`,
  },
  {
    question: "Why is diesel more expensive than petrol right now?",
    answer: "Diesel and petrol prices follow different international benchmarks, and diesel demand from freight, mining and farming is less flexible. The ACCC's fuel price monitoring reports explain each quarter's movements; the gap between the two fuels has varied a great deal over 2026.",
  },
  {
    question: "Is diesel better for towing?",
    answer: "Usually. Diesel engines make their peak torque at low revs, which suits pulling a heavy caravan or boat, and most dual-cab utes such as the Toyota HiLux and Ford Ranger reach their 3,500 kg braked tow ratings with diesel engines. Towing also widens diesel's fuel-use advantage, because the petrol engine has to work harder to make the same torque.",
  },
  {
    question: "What are the downsides of a diesel for city driving?",
    answer: "Modern diesels have a diesel particulate filter (DPF) that needs regular hot running to burn off trapped soot. Mostly short, slow trips can stop it regenerating, triggering a warning light and a dealer visit. Most also need AdBlue, a urea solution that is topped up separately from the fuel.",
  },
  {
    question: "Should I consider a hybrid instead of diesel?",
    answer: "If you are choosing diesel only for fuel economy and you do not tow heavy loads, yes. A petrol hybrid SUV using around 5 L/100km costs less per km than a diesel at today's prices, with no DPF or AdBlue. Diesel still has the edge for heavy towing and sustained high-load work.",
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

export default function DieselVsPetrolPage() {
  return (
    <BlogArticleLayout
      title="Diesel vs Petrol in Australia (2026)"
      category="Fuel & Energy"
      readTime="10 min read"
      publishedDate="2026-07-17"
      slug="diesel-vs-petrol-car-australia"
      description="What diesel and petrol cost per kilometre at this week's ACCC prices, when diesel's efficiency outweighs its higher pump price, and where towing and city driving change the answer."
      reviewedOn={reviewDateFor("/blog/diesel-vs-petrol-car-australia")}
      relatedLinks={[
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/fuel-efficiency-comparison", label: "Two-car fuel cost comparison" },
        { href: "/calculators/towing-fuel-cost-calculator", label: "Towing Fuel Cost Calculator" },
        { href: "/blog/most-fuel-efficient-cars-australia", label: "Most Fuel Efficient Cars in Australia" },
        { href: "/blog/car-running-costs-australia", label: "How Much Does It Cost to Run a Car in Australia?" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p>
        Diesel or petrol is usually framed as &ldquo;diesel costs more per litre but uses less&rdquo;. Whether that
        nets out in diesel&rsquo;s favour depends entirely on the gap between the two pump prices — and in 2026
        that gap has been unusually wide. This guide uses the ACCC&rsquo;s latest five-city averages (prices to{" "}
        {SOURCE_REPORT.pricesToLabel}), which update when a new report is published.
      </p>

      <h2>How much more efficient must a diesel be?</h2>
      <p>
        Diesel is cheaper to run only if it uses proportionally fewer litres than the price gap. At{" "}
        {perLitre(DIESEL)}/L diesel and {perLitre(PETROL)}/L petrol, a diesel must use at least{" "}
        <strong>{Math.round(BREAK_EVEN * 100)}% fewer litres per 100 km</strong> to cost the same per kilometre:
        1 − {PETROL.toFixed(3)} ÷ {DIESEL.toFixed(3)} = {(BREAK_EVEN * 100).toFixed(1)}%. Many diesel and petrol
        versions of the same SUV or ute differ by about that much on paper, so at current prices the fuel saving
        is often small or gone.
      </p>

      <h2>What do diesel and petrol cost per kilometre this week?</h2>
      <p>
        Illustrative pairs of the same vehicle size with typical petrol and diesel consumption — not named models.
        Use your own figures in the <Link href="/fuel-efficiency-comparison">two-car comparison</Link>.
      </p>
      <table>
        <thead>
          <tr><th>Vehicle</th><th>Petrol L/100km</th><th>Diesel L/100km</th><th>Petrol c/km</th><th>Diesel c/km</th><th>Diesel saving, 15,000 km</th></tr>
        </thead>
        <tbody>
          {PAIRS.map((p) => (
            <tr key={p.label}>
              <td>{p.label}</td>
              <td>{p.petrol}</td>
              <td>{p.diesel}</td>
              <td>{cpk(p.petrol, PETROL).toFixed(1)}c</td>
              <td>{cpk(p.diesel, DIESEL).toFixed(1)}c</td>
              <td>{aud(year(p.petrol, PETROL) - year(p.diesel, DIESEL))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <em>Prices: ACCC five-city averages, {SOURCE_REPORT.pricesToLabel}. Consumption figures are illustrative;
        official figures come from a laboratory test under the Australian Design Rules and real-world use is
        usually higher.</em>
      </p>
      <BarChart
        title="Diesel minus petrol price by city"
        description={`Average diesel price minus average regular unleaded petrol price in each capital city, cents per litre, ACCC data to ${SOURCE_REPORT.pricesToLabel}.`}
        data={DIESEL_BY_CITY.map((d) => {
          const p = PETROL_BY_CITY.find((x) => x.city === d.city);
          return { label: d.city, value: p ? d.average - p.average : 0 };
        })}
        unitSuffix=" cpl"
        precision={1}
        seriesLabel="Diesel premium over petrol"
      />
      <p>
        The diesel premium varies by city, so the break-even shifts depending on where you fill up. Check the
        latest prices on our <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> page.
      </p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>When does diesel still make sense?</h2>
      <ul>
        <li><strong>Heavy towing.</strong> Diesel&rsquo;s low-rev torque suits caravans and boats, most dual-cab utes such as the HiLux and Ranger reach their 3,500 kg braked ratings with diesel engines, and towing widens diesel&rsquo;s consumption advantage. The <Link href="/calculators/towing-fuel-cost-calculator">towing fuel cost calculator</Link> shows what a van adds.</li>
        <li><strong>Sustained highway and load work.</strong> Long regional runs keep a diesel in its most efficient range and give the particulate filter the hot running it needs.</li>
        <li><strong>Remote touring.</strong> Diesel 4WDs dominate outback touring for range per tank, parts support and torque.</li>
      </ul>

      <h2>When is petrol or hybrid the better choice?</h2>
      <ul>
        <li><strong>Mostly short city trips.</strong> A diesel particulate filter needs regular hot running; short, slow trips can leave it unable to regenerate.</li>
        <li><strong>Modest annual distance.</strong> With diesel dearer at the pump, a low-km driver may never recover a diesel price premium.</li>
        <li><strong>No heavy towing.</strong> A petrol hybrid SUV using around 5 L/100km costs {cpk(5, PETROL).toFixed(1)}c/km at {perLitre(PETROL)}/L — less than a 6.5 L/100km diesel at {cpk(6.5, DIESEL).toFixed(1)}c/km, without AdBlue or a DPF. See <Link href="/blog/hybrid-vs-petrol-australia">hybrid vs petrol</Link>.</li>
      </ul>

      <h2>What running costs are there beyond fuel?</h2>
      <p>
        Most modern diesels need AdBlue topped up between services and have a particulate filter that petrol cars
        do not, and diesel versions of the same model often carry a higher list price. Compare the capped-price
        servicing schedules manufacturers publish for the exact variants you are considering, and check the
        purchase price difference, before deciding fuel alone justifies a diesel.
      </p>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>Decision guide</h2>
      <table>
        <thead>
          <tr><th>Your situation</th><th>Usually the better fit</th></tr>
        </thead>
        <tbody>
          <tr><td>Tow a caravan or heavy trailer</td><td>Diesel</td></tr>
          <tr><td>Long regional or outback driving</td><td>Diesel</td></tr>
          <tr><td>Mostly short city trips</td><td>Petrol or hybrid</td></tr>
          <tr><td>Want lowest fuel cost, no heavy towing</td><td>Hybrid</td></tr>
          <tr><td>Work ute carrying loads</td><td>Diesel</td></tr>
        </tbody>
      </table>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — compare fuel cost for diesel vs petrol on any route</li>
        <li><Link href="/calculators/towing-fuel-cost-calculator">Towing Fuel Cost Calculator</Link> — estimate how much towing increases your fuel bill</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Upgrade payback calculator</Link> — does a more efficient car repay its price?</li>
        <li><Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Petrol Calculator</Link> — full 5-year total cost comparison</li>
        <li><Link href="/calculators/trip-fuel-cost-calculator#commute">Trip Fuel Cost Calculator (commute mode)</Link> — daily commute fuel cost by vehicle</li>
      </ul>

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
        <strong>Note:</strong> Fuel prices are the ACCC five-city averages to {SOURCE_REPORT.pricesToLabel} and change weekly. Consumption figures in the tables are illustrative, not specific models; check the official figure for the exact variant on the Green Vehicle Guide, and your own real-world use. Verify prices and specifications with the dealer before you buy.
      </aside>
    </BlogArticleLayout>
  );
}
