import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BarChart from "@/components/charts/BarChart";

const PATH = "/guides/australia-road-trip-fuel-cost-faq";
const CALCULATOR_HREF = "/calculators/trip-fuel-cost-calculator";

const TITLE = "Australia road trip fuel cost FAQ";
const H1 = "How much will petrol cost for an Australian road trip?";
const DESCRIPTION =
  "Plain answers to real Australian road-trip fuel questions: Brisbane to Cairns, Cairns to Melbourne, campervans and Highway 1, plus a free calculator.";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const faqs = [
  {
    question: "How much will petrol cost Brisbane to Cairns?",
    answer:
      "Rough highway distance is about 1,700 km one way. Example: 10 L/100km diesel/petrol at $1.85/L → ~170 L → about A$315 one way (planning figure only). Heavier campervans and coastal detours push it up. Always replace the price with live local $/L.",
  },
  {
    question: "How much does Cairns to Melbourne cost in fuel?",
    answer:
      "About 2,900–3,000 km one way. At 7 L/100km and $2.00/L → ~210 L → about A$420. At 10 L/100km the same trip is closer to A$600. Fuel alone is usually less than accommodation — still budget a buffer for inland/remote prices.",
  },
  {
    question: "How do I budget fuel for a multi-week AU campervan trip?",
    answer:
      "Sum planned km (or break into legs). Use the campervan’s real L/100km (hire fleets are often thirsty). Use a conservative $/L (remote WA/NT can be far above metro). Multiply, then add 15–25% contingency. Run each leg in the Trip Fuel Cost Calculator.",
  },
  {
    question: "What about a full Highway 1 / around-Australia loop?",
    answer:
      "Minimum driving distance is often cited around 15,000 km. At 5.5 L/100km and a high remote average like $3.15/L, fuel alone can exceed A$2,500 — and many travellers see higher burn or price. Triple-check economy and season; this is a multi-month budget item, not a weekend figure.",
  },
  {
    question: "What’s the formula (metric)?",
    answer:
      "Litres = (L/100km ÷ 100) × km. Cost = litres × price per litre. Return trips: double one-way km (or use the calculator’s return mode).",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-AU",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function AustraliaRoadTripFuelCostFaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Trip Planning", path: "/trip-planning" },
          { name: TITLE, path: PATH },
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/trip-planning" className="hover:text-orange-700 dark:hover:text-orange-400">
          Trip Planning
        </Link>
        <span className="mx-2">/</span>
        <span>Road trip fuel FAQ</span>
      </nav>

      <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
        Last updated: <time dateTime="2026-09-20">20 September 2026</time>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {H1}
      </h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Road-trip fuel cost is distance × economy × price — but AU prices swing hard by
          region, and campervans burn more than a hatch. Below: plain answers to questions
          people actually ask, plus a free calculator to run your own numbers.
        </p>
      </div>

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 my-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">
          Trip Fuel Cost Calculator
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Enter km, L/100km, and $/L. One-way or return. Planning estimate only — not a live
          pump price.
        </p>
        <Link
          href={CALCULATOR_HREF}
          className="inline-flex items-center justify-center min-h-11 px-5 py-3 bg-orange-700 text-white font-semibold rounded-xl hover:bg-orange-800 transition-colors text-sm"
        >
          Open the trip fuel calculator
        </Link>
      </div>

      <BarChart
        title="Planning fuel cost for common AU road trips"
        description="Worked examples from the answers below. Brisbane to Cairns at 10 L/100km and $1.85/L; Cairns to Melbourne at two economy rates and $2.00/L; Highway 1 at 5.5 L/100km and a high remote $3.15/L. Planning figures only."
        data={[
          { label: "BNE–CNS", value: 315 },
          { label: "CNS–MEL 7L", value: 420 },
          { label: "CNS–MEL 10L", value: 600 },
          { label: "Hwy 1 loop", value: 2500, highlight: true },
        ]}
        unitSuffix=" $"
        seriesLabel="Example one-way (or loop) fuel cost, A$"
        precision={0}
      />
      <p className="text-xs text-gray-700 dark:text-gray-300 -mt-4 mb-8">
        Chart uses the worked examples on this page. Highway 1 is a multi-month loop, not a
        weekend trip. Replace every $/L with the price you will actually pay.
      </p>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2>How much will petrol cost Brisbane to Cairns?</h2>
        <p>
          Rough highway distance is about <strong>1,700 km</strong> one way. Example: 10
          L/100km diesel/petrol at <strong>$1.85/L</strong> → ~170 L → about{" "}
          <strong>A$315</strong> one way (planning figure only). Heavier campervans and
          coastal detours push it up. Always replace the price with live local $/L.
        </p>
        <p>
          The working is the same formula every time: (10 ÷ 100) × 1,700 = 170 litres; 170 ×
          1.85 ≈ 315. If you take the coastal tourist route or a loaded hire van, both
          kilometres and litres rise — run the real numbers in the{" "}
          <Link href={CALCULATOR_HREF}>Trip Fuel Cost Calculator</Link>.
        </p>

        <h2>How much does Cairns to Melbourne cost in fuel?</h2>
        <p>
          About <strong>2,900–3,000 km</strong> one way. At 7 L/100km and $2.00/L → ~210 L →
          about <strong>A$420</strong>. At 10 L/100km the same trip is closer to{" "}
          <strong>A$600</strong>. Fuel alone is usually less than accommodation — still
          budget a buffer for inland/remote prices.
        </p>
        <p>
          Mid-range cars on the highway can sit near the 7 L figure; a thirsty SUV or a van
          sits nearer 10. Inland bowsers are often dearer than the $2.00/L used here, so
          treat A$420–A$600 as a planning band, not a quote.
        </p>

        <h2>How do I budget fuel for a multi-week AU campervan trip?</h2>
        <ol>
          <li>Sum planned km (or break into legs).</li>
          <li>Use the campervan’s real L/100km (hire fleets are often thirsty).</li>
          <li>Use a <strong>conservative</strong> $/L (remote WA/NT can be far above metro).</li>
          <li>Multiply, then add 15–25% contingency.</li>
        </ol>
        <p>
          Run each leg in the{" "}
          <Link href={CALCULATOR_HREF}>Trip Fuel Cost Calculator</Link>. A hire van that
          burns more than a hatch is a different budget — do not reuse someone else’s total.
        </p>

        <h2>What about a full Highway 1 / around-Australia loop?</h2>
        <p>
          Minimum driving distance is often cited around <strong>15,000 km</strong>. At 5.5
          L/100km and a high remote average like $3.15/L, fuel alone can exceed{" "}
          <strong>A$2,500</strong> — and many travellers see higher burn or price.
          Triple-check economy and season; this is a multi-month budget item, not a weekend
          figure.
        </p>
        <p>
          (5.5 ÷ 100) × 15,000 = 825 litres; 825 × 3.15 ≈ 2,600. A less efficient vehicle,
          more kilometres, or a dearer remote average all move that number up. Cost the loop
          as a series of legs, not one heroic total.
        </p>

        <h2>What’s the formula (metric)?</h2>
        <p>
          <strong>Litres = (L/100km ÷ 100) × km</strong>
          <br />
          <strong>Cost = litres × price per litre</strong>
        </p>
        <p>
          Return trips: double one-way km (or use the calculator’s return mode). That is the
          whole model. Everything else — hills, load, air-con, speed — shows up as a worse
          L/100km, which is why a conservative economy figure beats a brochure rating.
        </p>

        <h2>Notes / limits</h2>
        <p>
          Planning estimates only — not live pump prices. Terrain, load, AC, and speed
          change burn. No affiliate links. No booking CTAs.
        </p>

        <h2>Sources (questions)</h2>
        <p>
          Public Reddit planning threads (AskAnAustralian, AustraliaTravel) — paraphrased
          answers; we do not scrape private data.
        </p>
      </article>

      <section
        data-boilerplate
        className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Related
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href={CALCULATOR_HREF}
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Trip Fuel Cost Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/trip-planning"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Trip cost planning
            </Link>
          </li>
          <li>
            <Link
              href="/blog/petrol-cost-per-km-australia"
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
            >
              Petrol cost per km in Australia
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
