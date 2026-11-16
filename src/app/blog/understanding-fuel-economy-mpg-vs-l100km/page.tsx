import { reviewDateFor } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import EconomyConverter from "@/components/EconomyConverter";
import EconomyPagesNav from "@/components/EconomyPagesNav";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const K_US = 235.215;
const K_UK = 282.481;
const MPG_ROWS = [20, 25, 30, 35, 40, 50, 60];

export const metadata: Metadata = createPageMetadata({
  title: "MPG to L/100km Converter and Explainer",
  description:
    "Convert MPG (US or UK) and km/L to L/100km instantly, with the formulas, a conversion table and why equal MPG steps are not equal litres saved.",
  path: "/blog/understanding-fuel-economy-mpg-vs-l100km",
  type: "article",
});

const faqs = [
  {
    question: "How do you convert MPG to L/100km?",
    answer: "Divide 235.215 by US MPG, or 282.481 by UK (imperial) MPG. 30 US MPG is 7.8 L/100km; 30 UK MPG is 9.4 L/100km. To go back, divide the same constant by L/100km. For km per litre, L/100km = 100 ÷ km/L.",
  },
  {
    question: "What is the difference between MPG and L/100km?",
    answer: "They measure the same thing in opposite directions. MPG is distance per unit of fuel — higher is better. L/100km is fuel per distance — lower is better. Australia's fuel consumption labels and the Green Vehicle Guide use L/100km; MPG figures usually come from US or UK sources.",
  },
  {
    question: "Is a UK MPG the same as a US MPG?",
    answer: "No. A UK (imperial) gallon is 4.546 litres and a US gallon is 3.785 litres, so the same car shows about 20% more UK MPG than US MPG. Check which gallon a source uses before converting — UK car reviews quote imperial MPG, US sites quote US MPG.",
  },
  {
    question: "Why is L/100km better for working out fuel cost?",
    answer: `Because fuel cost is directly proportional to it: cost = km ÷ 100 × L/100km × price. 500 km at 8 L/100km is 40 litres — ${aud(40 * PETROL)} at the ACCC five-city average of ${perLitre(PETROL)}/L. With MPG you must invert the figure first, which is where most mental-arithmetic mistakes come from.`,
  },
  {
    question: "Why do equal MPG improvements save different amounts of fuel?",
    answer: "Because MPG is an inverse measure. Going from 20 to 25 US MPG cuts consumption from 11.8 to 9.4 L/100km — 2.4 litres per 100 km. Going from 40 to 45 MPG cuts it from 5.9 to 5.2 — just 0.7 litres. The same 5 MPG is worth more than three times as much fuel at the thirsty end.",
  },
  {
    question: "How do I measure my car's real L/100km?",
    answer: "Fill the tank to full and reset the trip meter. At the next fill, divide the litres added by the kilometres driven and multiply by 100. For example, 55 litres over 620 km is 8.9 L/100km. Average three or four fills for a reliable figure.",
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

export default function FuelEconomyArticlePage() {
  return (
    <BlogArticleLayout
      title="MPG to L/100km: Converter and Explainer"
      category="Fuel & Energy"
      readTime="8 min read"
      publishedDate="2026-05-12"
      slug="understanding-fuel-economy-mpg-vs-l100km"
      description="Convert MPG (US or UK) and km/L to L/100km with the converter below, then see why L/100km is the scale to compare and budget with."
      reviewedOn={reviewDateFor("/blog/understanding-fuel-economy-mpg-vs-l100km")}
      relatedLinks={[
        { href: "/blog/how-to-reduce-commute-fuel-costs", label: "How to Reduce Your Commute Fuel Costs: 7 Proven Tips" },
        { href: "/blog/caravan-fuel-consumption-australia", label: "Caravan Fuel Consumption Australia" },
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/calculators/fuel-economy-savings-calculator", label: "Upgrade payback calculator" },
        { href: "/fuel-efficiency-comparison", label: "Two-car fuel cost comparison" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <EconomyConverter />

      <h2>MPG vs L/100km: what is the difference?</h2>
      <p><strong>Miles per gallon (MPG)</strong> is how far a vehicle travels on a gallon of fuel — higher is better. <strong>Litres per 100 kilometres (L/100km)</strong> is how much fuel it uses to cover 100 km — lower is better. They describe the same thing in opposite directions. Australian fuel consumption labels and the federal Green Vehicle Guide report L/100km; MPG figures turn up in US and UK reviews, imported-car listings and older manuals.</p>

      <h2>How do you convert MPG to L/100km?</h2>
      <p><strong>L/100km = 235.215 &divide; US MPG</strong> and <strong>L/100km = 282.481 &divide; UK MPG</strong>. Both come straight from the unit definitions: 100 km is 62.137 miles, a US gallon is 3.785 litres and an imperial gallon is 4.546 litres. The same constants convert the other way: MPG = 235.215 &divide; L/100km. For km per litre (common in Japanese specifications), L/100km = 100 &divide; km/L.</p>

      <h3>Conversion table</h3>
      <table>
        <thead>
          <tr><th>MPG</th><th>L/100km (US gallons)</th><th>L/100km (UK gallons)</th></tr>
        </thead>
        <tbody>
          {MPG_ROWS.map((m) => (
            <tr key={m}><td>{m}</td><td>{(K_US / m).toFixed(1)}</td><td>{(K_UK / m).toFixed(1)}</td></tr>
          ))}
        </tbody>
      </table>
      <p>The same car reads about 20% higher in UK MPG than US MPG, because the imperial gallon is bigger. Getting the gallon wrong is the most common conversion error.</p>

      <h2>Why are equal MPG steps not equal savings?</h2>
      <p>MPG is an inverse measure, so the litres behind each MPG step shrink as the number grows. From 20 to 25 US MPG is {(K_US / 20 - K_US / 25).toFixed(1)} L/100km saved; from 40 to 45 MPG is only {(K_US / 40 - K_US / 45).toFixed(1)} L/100km. At 15,000 km a year and {perLitre(PETROL)}/L, the first is worth {aud(150 * (K_US / 20 - K_US / 25) * PETROL)} a year and the second {aud(150 * (K_US / 40 - K_US / 45) * PETROL)}. Compare in L/100km and the real gap is visible immediately.</p>

      <h2>How do you turn L/100km into dollars?</h2>
      <p><strong>Fuel cost = distance &divide; 100 &times; L/100km &times; price per litre.</strong> A 500 km trip at 8 L/100km uses 40 litres — {aud(40 * PETROL)} at the ACCC five-city petrol average of {perLitre(PETROL)}/L. The <Link href="/calculators/trip-fuel-cost-calculator">trip fuel cost calculator</Link> does this for any route.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>Why is real-world use higher than the label?</h2>
      <p>The L/100km on an Australian fuel consumption label comes from a standardised laboratory test under the Australian Design Rules, so different cars can be compared fairly. Real-world use is usually higher — more so in short trips, heavy traffic, at high speed, with a roof load or towing. Treat the label as a ranking tool, and measure your own car for budgeting.</p>

      <h2>How do you measure your own L/100km?</h2>
      <ol>
        <li>Fill the tank to full and reset the trip meter.</li>
        <li>Drive normally until the tank is low.</li>
        <li>Fill again and note the litres added and kilometres driven.</li>
        <li><strong>L/100km = litres &divide; km &times; 100.</strong> For example, 55 litres over 620 km = 8.9 L/100km.</li>
      </ol>
      <p>Average three or four fills; one tank can be skewed by an unusual week.</p>

      <EconomyPagesNav current="/blog/understanding-fuel-economy-mpg-vs-l100km" />

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — calculate fuel cost for any journey</li>
        <li><Link href="/calculators/trip-fuel-cost-calculator#commute">Trip Fuel Cost Calculator (commute mode)</Link> — weekly and annual commute costs</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Cost Calculator</Link> — compare running costs</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Upgrade payback calculator</Link> — will a more efficient car repay its price?</li>
        <li><Link href="/fuel-efficiency-comparison">Two-car fuel cost comparison</Link> — annual fuel cost of two cars side by side</li>
        <li><Link href="/calculators/towing-fuel-cost-calculator">Towing Fuel Cost Calculator</Link> — fuel costs when towing a caravan or trailer</li>
        <li><Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Petrol Calculator</Link> — compare hybrid and petrol running costs</li>
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
        <strong>Disclaimer:</strong> Conversions are exact to the unit definitions. Your actual fuel use depends on driving conditions, vehicle condition, load, speed and driving style. The constant 235.215 applies to US gallons; for UK (imperial) gallons, use 282.481.
      </aside>
    </BlogArticleLayout>
  );
}
