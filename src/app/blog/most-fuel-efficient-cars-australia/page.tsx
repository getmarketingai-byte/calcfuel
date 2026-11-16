import { reviewDateFor } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import FuelCostComparer from "@/components/FuelCostComparer";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L, DEFAULT_PETROL_PRICE_AUD_PER_L, SOURCE_REPORT } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

export const metadata: Metadata = createPageMetadata({
  title: "Most Fuel Efficient Cars Australia: 2026 List",
  description: `Most fuel efficient cars in Australia by class — small cars, SUVs, family cars and utes — with L/100km and annual fuel cost at ${perLitre(DEFAULT_PETROL_PRICE_AUD_PER_L)}/L (ACCC). Compare any two.`,
  path: "/blog/most-fuel-efficient-cars-australia",
  type: "article",
});

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
const KM = 15_000;

/** Manufacturer combined figures as published on this page since July 2026; verify against the Green Vehicle Guide. */
interface Car { model: string; power: string; l100: number; fuel: "petrol" | "diesel"; phev?: boolean }
const SMALL: Car[] = [
  { model: "Toyota Corolla Hybrid", power: "Petrol hybrid", l100: 4.2, fuel: "petrol" as const },
  { model: "Toyota Yaris", power: "Petrol", l100: 5.3, fuel: "petrol" as const },
  { model: "Toyota Corolla petrol", power: "Petrol", l100: 6.3, fuel: "petrol" as const },
  { model: "Mazda 3", power: "Petrol", l100: 6.5, fuel: "petrol" as const },
  { model: "Honda Civic", power: "Petrol", l100: 6.4, fuel: "petrol" as const },
  { model: "Hyundai i30", power: "Petrol", l100: 7.1, fuel: "petrol" as const },
  { model: "Kia Cerato", power: "Petrol", l100: 7.4, fuel: "petrol" as const },
  { model: "Volkswagen Golf", power: "Petrol", l100: 6.5, fuel: "petrol" as const },
];
const COMPACT: Car[] = [
  { model: "Toyota Yaris Cross Hybrid", power: "Petrol hybrid", l100: 4.5, fuel: "petrol" as const },
  { model: "Toyota C-HR Hybrid", power: "Petrol hybrid", l100: 4.8, fuel: "petrol" as const },
  { model: "Honda HR-V e:HEV", power: "Petrol hybrid", l100: 5.0, fuel: "petrol" as const },
  { model: "Toyota C-HR petrol", power: "Petrol", l100: 7.5, fuel: "petrol" as const },
  { model: "Mazda CX-3", power: "Petrol", l100: 6.0, fuel: "petrol" as const },
  { model: "Hyundai Kona", power: "Petrol", l100: 7.0, fuel: "petrol" as const },
  { model: "Kia Seltos", power: "Petrol", l100: 7.5, fuel: "petrol" as const },
  { model: "MG ZS", power: "Petrol", l100: 8.1, fuel: "petrol" as const },
];
const MID: Car[] = [
  { model: "Toyota RAV4 Hybrid", power: "Petrol hybrid", l100: 4.7, fuel: "petrol" as const },
  { model: "Hyundai Tucson Hybrid", power: "Petrol hybrid", l100: 5.6, fuel: "petrol" as const },
  { model: "Kia Sportage Hybrid", power: "Petrol hybrid", l100: 5.9, fuel: "petrol" as const },
  { model: "Mitsubishi Outlander PHEV", power: "Plug-in hybrid", l100: 1.9, fuel: "petrol" as const, phev: true },
  { model: "Toyota RAV4 petrol", power: "Petrol", l100: 8.5, fuel: "petrol" as const },
  { model: "Mazda CX-5 petrol", power: "Petrol", l100: 7.4, fuel: "petrol" as const },
  { model: "Mazda CX-5 diesel", power: "Diesel", l100: 5.5, fuel: "diesel" as const },
  { model: "Nissan X-Trail", power: "Petrol", l100: 8.1, fuel: "petrol" as const },
  { model: "Honda CR-V e:HEV", power: "Petrol hybrid", l100: 5.7, fuel: "petrol" as const },
];
const UTES: Car[] = [
  { model: "Toyota HiLux diesel 2WD", power: "2.8L diesel", l100: 8.0, fuel: "diesel" as const },
  { model: "Toyota HiLux diesel 4WD", power: "2.8L diesel", l100: 9.2, fuel: "diesel" as const },
  { model: "Ford Ranger diesel 2WD", power: "2.0L diesel", l100: 7.9, fuel: "diesel" as const },
  { model: "Ford Ranger diesel 4WD", power: "2.0L diesel", l100: 9.0, fuel: "diesel" as const },
  { model: "Mitsubishi Triton diesel", power: "2.4L diesel", l100: 8.5, fuel: "diesel" as const },
  { model: "Isuzu D-Max diesel", power: "3.0L diesel", l100: 8.2, fuel: "diesel" as const },
  { model: "Mazda BT-50 diesel", power: "3.0L diesel", l100: 8.2, fuel: "diesel" as const },
];

const annual = (c: Car) => (KM / 100) * c.l100 * (c.fuel === "diesel" ? DIESEL : PETROL);
const annualText = (c: Car) => (c.phev ? `~${aud(annual(c))} fuel only†` : aud(annual(c)));
const ALL = [...SMALL, ...COMPACT, ...MID, ...UTES];
const car = (model: string) => ALL.find((c) => c.model === model)!;
const PAIRS: [string, string][] = [
  ["Toyota Corolla Hybrid", "Toyota Corolla petrol"],
  ["Toyota RAV4 Hybrid", "Toyota RAV4 petrol"],
  ["Toyota Yaris Cross Hybrid", "Kia Seltos"],
  ["Toyota RAV4 Hybrid", "Nissan X-Trail"],
  ["Mazda CX-5 diesel", "Mazda CX-5 petrol"],
];
const PRESETS = ALL.filter((c) => !c.phev).map((c) => ({ label: c.model, l100: c.l100, fuel: c.fuel }));
const fuelNote = `${KM.toLocaleString("en-AU")} km a year at ${perLitre(PETROL)}/L petrol and ${perLitre(DIESEL)}/L diesel — ACCC five-city averages, ${SOURCE_REPORT.pricesToLabel}`;

const faqs = [
  {
    question: "What is the most fuel efficient car in Australia?",
    answer: `Among cars that are not plug-ins, the Toyota Corolla Hybrid leads this list at 4.2 L/100km combined — about ${aud(annual(car("Toyota Corolla Hybrid")))} a year in fuel at ${KM.toLocaleString("en-AU")} km. The Yaris Cross Hybrid (4.5) leads compact SUVs and the RAV4 Hybrid (4.7) leads mid-size SUVs. For a non-hybrid petrol car, the Toyota Yaris is among the best at 5.3 L/100km.`,
  },
  {
    question: "What are the most fuel efficient family cars?",
    answer: `For five seats and a usable boot, the medium hybrid sedan and mid-size hybrid SUV. The RAV4 Hybrid at 4.7 L/100km costs about ${aud(annual(car("Toyota RAV4 Hybrid")))} a year in fuel against ${aud(annual(car("Toyota RAV4 petrol")))} for the RAV4 petrol at 8.5. Seven-seaters are mostly larger petrol or diesel SUVs that use considerably more.`,
  },
  {
    question: "What is considered good fuel economy in Australia?",
    answer: "As a rough guide for passenger cars: under 6 L/100km is excellent, 6–8 is good, 8–10 is average and over 10 is high (though normal for large SUVs, utes and 4WDs). Hybrids on this list sit between 4.2 and 5.9 L/100km. Lower is better on the L/100km scale.",
  },
  {
    question: "How much do I save per year with a fuel efficient car?",
    answer: `Each 1 L/100km you save is worth about ${aud(150 * PETROL)} a year at 15,000 km and ${perLitre(PETROL)}/L. Going from a 10 L/100km car to a 6 L/100km car saves about ${aud(4 * 150 * PETROL)} a year, or ${aud(20 * 150 * PETROL)} over five years. Use the comparison tool on this page or the Fuel Economy Savings Calculator for your own figures.`,
  },
  {
    question: "Is a hybrid worth it in Australia?",
    answer: `It depends on the price premium and how far you drive. The RAV4 Hybrid saves about ${aud(annual(car("Toyota RAV4 petrol")) - annual(car("Toyota RAV4 Hybrid")))} a year in fuel over the RAV4 petrol at ${KM.toLocaleString("en-AU")} km; divide the actual on-road price difference by that saving to get the payback in years. The Hybrid vs Petrol Calculator does this with your own figures.`,
  },
  {
    question: "Which diesel has the best fuel economy on this list?",
    answer: `The Mazda CX-5 diesel at 5.5 L/100km (about ${aud(annual(car("Mazda CX-5 diesel")))} a year at ${perLitre(DIESEL)}/L diesel). Among utes, the Ford Ranger 2WD (7.9) and Toyota HiLux 2WD (8.0) are the lowest here. Diesel tends to suit high-distance drivers and anyone who tows.`,
  },
  {
    question: "Are official fuel consumption figures accurate?",
    answer: "Official Australian figures come from a standardised laboratory test, so they are useful for comparing cars with each other but are usually lower than what you will see on the road. Real-world use depends on speed, short trips, load, air-conditioning and tyre pressure. The Green Vehicle Guide publishes the official combined, urban and extra-urban figures for each variant.",
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

export default function MostFuelEfficientCarsPage() {
  return (
    <BlogArticleLayout
      title="Most Fuel Efficient Cars in Australia (2026)"
      category="Fuel & Energy"
      readTime="9 min read"
      publishedDate="2026-07-01"
      slug="most-fuel-efficient-cars-australia"
      description="The most fuel efficient petrol, hybrid and diesel cars in Australia, ranked by L/100km within each class, with annual fuel cost at current ACCC prices."
      reviewedOn={reviewDateFor("/blog/most-fuel-efficient-cars-australia")}
      relatedLinks={[
        { href: "/blog/car-running-costs-australia", label: "How Much Does It Cost to Run a Car in Australia?" },
        { href: "/blog/best-time-to-buy-petrol-australia", label: "Best Time to Buy Petrol in Australia" },
        { href: "/calculators/fuel-economy-savings-calculator", label: "Fuel Economy Savings Calculator" },
        { href: "/calculators/hybrid-vs-gas-calculator", label: "Hybrid vs Petrol Calculator" },
        { href: "/calculators/ev-vs-gas-calculator", label: "EV vs Petrol Calculator" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">See how much a more efficient car saves you</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your current fuel economy and a target figure to calculate your exact annual saving.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/fuel-economy-savings-calculator" className="inline-block bg-orange-700 text-white font-semibold px-4 py-2 rounded-xl hover:bg-orange-800 transition-colors text-sm">
            Fuel Economy Savings Calculator →
          </Link>
          <Link href="/calculators/hybrid-vs-gas-calculator" className="inline-block bg-white dark:bg-gray-800 text-orange-500 font-semibold px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-50 transition-colors text-sm">
            Hybrid vs Petrol Calculator →
          </Link>
        </div>
      </div>

      <h2>What is the most fuel efficient car in Australia?</h2>
      <p>The Toyota Corolla Hybrid, at 4.2 L/100km combined, is the most fuel efficient mainstream
      petrol car on sale in Australia. Among cars with the lowest fuel consumption overall, hybrids
      take every top position in their class: the Camry Hybrid matches the Corolla at 4.2 in the
      medium sedan segment, and the RAV4 Hybrid leads mid-size SUVs at 4.7. Plug-in hybrids
      can go lower still if you charge them regularly, and battery EVs use no liquid fuel at all —
      but on petrol consumption alone, 4.2 L/100km is the mainstream benchmark to beat.</p>
      <p>The rankings below are grouped by class, because that is how the decision is actually
      made — a buyer choosing a ute is not cross-shopping a hatchback. Within each class the
      figures are manufacturer combined-cycle ratings; expect real-world consumption to be higher.</p>

      <div className="not-prose my-6">
        <FuelCostComparer
          id="most-fuel-efficient-cars"
          presets={PRESETS}
          initialA={PRESETS.find((c) => c.label === "Toyota RAV4 Hybrid")!}
          initialB={PRESETS.find((c) => c.label === "Toyota RAV4 petrol")!}
          title="Compare any two cars from this list"
        />
      </div>

      <div className="not-prose rounded-xl border border-gray-200 dark:border-gray-700 p-5 my-6 text-sm text-gray-800 dark:text-gray-200">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Key facts, dated</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Lowest combined figure on this list (non-plug-in): {SMALL[0].model}, {SMALL[0].l100} L/100km — {aud(annual(SMALL[0]))} a year in fuel.</li>
          <li>Fuel prices: {fuelNote}.</li>
          <li>Model figures: manufacturer combined ratings as published here in July 2026. The official source is the <a className="underline" href="https://www.greenvehicleguide.gov.au" target="_blank" rel="noopener noreferrer">Green Vehicle Guide</a>.</li>
        </ul>
      </div>

      <h2>Most Fuel Efficient Small Cars in Australia</h2>
      <p>Small cars offer the best fuel efficiency in the petrol segment, and the hybrid variants of popular models lead it. Check the on-road price difference between hybrid and petrol variants and run it through the <Link href="/calculators/hybrid-vs-gas-calculator">hybrid vs petrol calculator</Link> to see the payback.</p>
      <table>
        <thead>
          <tr><th>Model</th><th>Powertrain</th><th>L/100km (combined)</th><th>Annual fuel cost*</th></tr>
        </thead>
        <tbody>
          {SMALL.map((c) => (
            <tr key={c.model}><td>{c.model}</td><td>{c.power}</td><td>{c.l100}{c.phev ? " (PHEV)" : ""}</td><td>{annualText(c)}</td></tr>
          ))}
        </tbody>
      </table>
      <p><em>*Annual fuel cost: {fuelNote}. Manufacturer combined figures — real-world use is usually higher.</em></p>
      <p>The Corolla Hybrid saves approximately <strong>$630/year</strong> in fuel over the petrol Corolla ($1,260 vs $1,890). At an $3,000–$4,000 price premium, payback is 4–6 years for a 15,000 km/year driver — faster for higher annual distance.</p>

      <h2>Most Fuel Efficient Compact SUVs in Australia</h2>
      <p>Compact SUVs are Australia&apos;s most popular vehicle segment. Hybrid variants now dominate the fuel efficiency rankings in this class.</p>
      <table>
        <thead>
          <tr><th>Model</th><th>Powertrain</th><th>L/100km</th><th>Annual fuel cost*</th></tr>
        </thead>
        <tbody>
          {COMPACT.map((c) => (
            <tr key={c.model}><td>{c.model}</td><td>{c.power}</td><td>{c.l100}{c.phev ? " (PHEV)" : ""}</td><td>{annualText(c)}</td></tr>
          ))}
        </tbody>
      </table>
      <p>The Yaris Cross Hybrid at 4.5 L/100km saves <strong>$900/year</strong> over the equivalent MG ZS petrol at 8.1 L/100km — that is $4,500 over 5 years in fuel alone.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>Most Fuel Efficient Mid-Size SUVs in Australia</h2>
      <p>The mid-size SUV class (RAV4, CX-5, Tucson, Sportage) is where hybrid technology has had the biggest impact on running costs. The Toyota RAV4 Hybrid is now the best-selling SUV in Australia — partly because fuel savings close the price gap within 3–5 years.</p>
      <table>
        <thead>
          <tr><th>Model</th><th>Powertrain</th><th>L/100km</th><th>Annual fuel cost*</th></tr>
        </thead>
        <tbody>
          {MID.map((c) => (
            <tr key={c.model}><td>{c.model}</td><td>{c.power}</td><td>{c.l100}{c.phev ? " (PHEV)" : ""}</td><td>{annualText(c)}</td></tr>
          ))}
        </tbody>
      </table>
      <p><em>*{fuelNote}. †PHEV figure is petrol only, assumes frequent charging and excludes the cost of electricity.</em></p>
      <p>The RAV4 Hybrid vs RAV4 petrol: <strong>$1,140/year saving</strong> in fuel ($1,410 vs $2,550). With a $5,000–$7,000 price premium, payback is under 5 years at average mileage and under 4 years for higher-km drivers.</p>

      <h2>Most Fuel Efficient Utes in Australia</h2>
      <p>Dual-cab utes are Australia&apos;s best-selling vehicles, but fuel efficiency is not their strongest suit. The HiLux and Ranger dominate sales despite relatively high consumption figures. Diesel utes offer better economy than petrol equivalents at high annual kilometres.</p>
      <table>
        <thead>
          <tr><th>Model</th><th>Engine</th><th>L/100km</th><th>Annual fuel cost*</th></tr>
        </thead>
        <tbody>
          {UTES.map((c) => (
            <tr key={c.model}><td>{c.model}</td><td>{c.power}</td><td>{c.l100}{c.phev ? " (PHEV)" : ""}</td><td>{annualText(c)}</td></tr>
          ))}
        </tbody>
      </table>
      <p><em>*{fuelNote}.</em></p>
      <p>Mild-hybrid and plug-in hybrid utes have started to reach Australian showrooms. Check the <a href="https://www.greenvehicleguide.gov.au" target="_blank" rel="noopener noreferrer">Green Vehicle Guide</a> for the official figures of any variant you are considering, then compare it with a diesel above.</p>


      <h2>What are the most fuel efficient family cars?</h2>
      <p>For a family that needs five real seats and a boot, the efficient choices cluster in two
      places: the medium hybrid sedan and the mid-size hybrid SUV. The Camry Hybrid at 4.2 L/100km
      and the RAV4 Hybrid at 4.7 are the two that most Australian families end up comparing,
      and both use roughly 40% less fuel than the petrol versions of the same cars.</p>
      <p>If you need seven seats the picture narrows sharply. Most seven-seaters are large petrol
      or diesel SUVs in the 8–11 L/100km band, and the hybrid options are limited and priced
      accordingly. The honest trade is that a third row costs roughly 3 L/100km against an
      equivalent five-seater — about {aud(3 * 150 * PETROL)} a year at 15,000 km and current
      petrol prices.</p>
      <p>One thing worth weighing before you optimise for consumption: a family car doing school
      runs and short trips will sit well above its rating, because a cold engine uses 30–50% more
      fuel for the first few kilometres. A hybrid actually widens its advantage in exactly that
      pattern of driving, which is why the gap between hybrid and petrol is larger for families
      than the combined-cycle figures suggest.</p>

      <h2>How much can you save by choosing a fuel efficient car?</h2>
      <p>The savings compound over a typical ownership period of 5–7 years:</p>
      <table>
        <thead>
          <tr><th>Comparison</th><th>Annual fuel saving*</th><th>5-year saving</th></tr>
        </thead>
        <tbody>
          {PAIRS.map(([x, y]) => {
            const d = annual(car(y)) - annual(car(x));
            return (
              <tr key={x + y}><td>{x} vs {y}</td><td>{aud(d)}</td><td>{aud(d * 5)}</td></tr>
            );
          })}
        </tbody>
      </table>
      <p>*{fuelNote}. These are fuel-only savings; the price premium, servicing and resale value also matter. Use the <Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Petrol Calculator</Link> for a full 5-year comparison.</p>

      <h2>How do you get better fuel economy from any car?</h2>
      <p>Regardless of which car you drive, your driving habits can affect real-world fuel economy by 15–30%:</p>
      <ul>
        <li><strong>Maintain correct tyre pressure:</strong> Underinflation adds 2–4% to fuel consumption. Check monthly.</li>
        <li><strong>Drive smoothly:</strong> Anticipate stops, accelerate gradually, and coast to traffic lights. Aggressive driving adds 15–25% to fuel use.</li>
        <li><strong>Use cruise control on highways:</strong> Maintains a steady speed more efficiently than manual throttle control.</li>
        <li><strong>Reduce speed on highways:</strong> Driving at 100 km/h instead of 120 km/h saves 15–20% fuel (drag increases with the square of speed).</li>
        <li><strong>Remove roof racks and boxes when not in use:</strong> Empty roof racks add 5–15% aerodynamic drag at highway speeds.</li>
        <li><strong>Service the engine regularly:</strong> A clean air filter and fresh engine oil reduce fuel consumption by 1–4%.</li>
      </ul>
      <p>See our <Link href="/blog/how-to-reduce-commute-fuel-costs">7 tips to reduce commute fuel costs</Link> for more strategies.</p>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> — calculate the annual saving from any efficiency improvement</li>
        <li><Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Petrol Calculator</Link> — full 5-year total cost comparison</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Calculator</Link> — compare electric and petrol running costs</li>
        <li><Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> — see what your daily commute really costs</li>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — plan fuel costs for any road trip</li>
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
        <strong>Disclaimer:</strong> Fuel consumption figures are manufacturer combined ratings. Real-world consumption is usually higher depending on driving conditions, load, speed and maintenance. Model availability is as of mid-2026 and may change. Annual fuel costs use the latest ACCC five-city averages and 15,000 km a year; adjust for your own usage. Always verify current figures with the manufacturer or <a href="https://www.greenvehicleguide.gov.au" target="_blank" rel="noopener noreferrer" className="underline">Green Vehicle Guide</a>.
      </aside>
    </BlogArticleLayout>
  );
}
