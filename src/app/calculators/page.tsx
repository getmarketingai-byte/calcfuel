import type { Metadata } from "next";
import Link from "next/link";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { KEEP_CALCULATORS } from "@/lib/portfolio";
import { FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";

export const metadata: Metadata = {
  title: "Fuel & Trip Cost Calculators",
  description:
    "Seventeen fuel and trip cost calculators for boats, caravans, cars and fleets. Each shows its formula, assumptions and a worked example.",
  alternates: { canonical: "/calculators" },
};

type Tool = { slug: string; label: string; answers: string };

const GROUPS: { title: string; href: string; intro: string; tools: Tool[] }[] = [
  {
    title: "Marine",
    href: "/marine",
    intro:
      "Fuel on the water is a safety calculation before it is a budget one. These apply a reserve margin by default rather than reporting theoretical range.",
    tools: [
      {
        slug: "boat-fuel-calculator",
        label: "Boat Trip Fuel Planner",
        answers: "Can I make this passage and back on what the tank holds, and what will it cost?",
      },
      {
        slug: "emergency-fuel-rationing-calculator",
        label: "Emergency Fuel Rationing",
        answers: "How long does the fuel I have left last if I cannot resupply?",
      },
    ],
  },
  {
    title: "Towing & caravans",
    href: "/towing",
    intro:
      "Towing changes consumption by a percentage, not a fixed amount, and the percentage is driven by frontal area far more than mass.",
    tools: [
      {
        slug: "towing-fuel-cost-calculator",
        label: "Towing Fuel Cost",
        answers: "What does hitching up add to this trip compared with driving unloaded?",
      },
    ],
  },
  {
    title: "Trip planning",
    href: "/trip-planning",
    intro:
      "Per-trip costs, one-off or recurring. All of these take a fuel price you can override — the default is the current five-city average.",
    tools: [
      {
        slug: "trip-fuel-cost-calculator",
        label: "Trip Fuel Cost",
        answers: "What will this specific drive cost in fuel, there and back?",
      },
      {
        slug: "drive-vs-fly-calculator",
        label: "Drive vs Fly",
        answers: "For this group and this distance, is driving actually cheaper than flying?",
      },
      {
        slug: "fuel-budget-planner",
        label: "Fuel Budget Planner",
        answers: "What should I set aside for fuel each week, month and year?",
      },
      {
        slug: "commute-fuel-cost-calculator",
        label: "Commute Fuel Cost",
        answers: "What is the daily drive costing me over a working year?",
      },
      {
        slug: "carpool-fuel-split-calculator",
        label: "Carpool Fuel Split",
        answers: "What is each passenger's fair share, including partial legs?",
      },
    ],
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    intro:
      "Running-cost comparisons. Break-even answers here depend heavily on annual distance — enter yours rather than accepting a default.",
    tools: [
      {
        slug: "motorcycle-fuel-cost-calculator",
        label: "Motorcycle Fuel Cost",
        answers: "What does riding this instead of driving save on fuel?",
      },
      {
        slug: "fuel-economy-savings-calculator",
        label: "Fuel Economy & Consumption",
        answers: "What is a given improvement in L/100km actually worth per year?",
      },
      {
        slug: "hybrid-vs-gas-calculator",
        label: "Hybrid vs Petrol",
        answers: "How long does it take fuel savings to repay the hybrid premium?",
      },
      {
        slug: "ev-vs-gas-calculator",
        label: "EV vs Petrol",
        answers: "Over five or ten years, which is cheaper once servicing and insurance are in?",
      },
      {
        slug: "ev-charging-cost-calculator",
        label: "EV Charging Cost",
        answers: "What does a charge cost at home versus on a public DC charger?",
      },
      {
        slug: "hydrogen-vs-gas-calculator",
        label: "Hydrogen vs Petrol",
        answers: "At current hydrogen pricing, how does a fuel-cell vehicle compare?",
      },
      {
        slug: "idling-fuel-waste-calculator",
        label: "Idling Fuel Waste",
        answers: "What is idle time costing across a year or a fleet?",
      },
    ],
  },
  {
    title: "Commercial & fleet",
    href: "/calculators",
    intro:
      "Operator-side tools for people who buy fuel as a business input rather than a household one.",
    tools: [
      {
        slug: "fuel-surcharge-calculator",
        label: "Fuel Surcharge",
        answers: "Is the surcharge on this invoice consistent with the schedule it claims to use?",
      },
      {
        slug: "generator-fuel-calculator",
        label: "Generator Fuel",
        answers: "How much fuel does this generator need to cover an outage of this length?",
      },
    ],
  },
];

const keepSet = new Set<string>(KEEP_CALCULATORS);

export default function CalculatorsIndex() {
  const total = GROUPS.flatMap((g) => g.tools).filter((t) => keepSet.has(t.slug)).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel &amp; trip cost calculators
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        {total} calculators, each built around a decision someone actually has to make rather than
        a formula someone might want to look up.
      </p>
      <CalcReviewedBy lastUpdated="21 August 2026" />

      <div className="prose prose-gray dark:prose-invert max-w-none mb-10 prose-a:text-orange-700 dark:prose-a:text-orange-400">
        <p>
          Three things are consistent across all of them. Every calculator shows the formula it
          applies and states its assumptions on the page, so you can check whether the model fits
          your situation before trusting the number. Every one defaults to the current Australian
          five-city fuel price — {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl for unleaded and{" "}
          {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl for diesel as at {SOURCE_REPORT.pricesToLabel},
          from our <Link href="/data/australian-fuel-prices">fuel price data</Link> — and every one
          lets you override it, which you should. And all of them run in the browser with nothing
          stored on a server and no sign-up.
        </p>
        <p>
          If you are unsure which to start with: use{" "}
          <Link href="/calculators/trip-fuel-cost-calculator">trip fuel cost</Link> for a specific
          journey, <Link href="/calculators/fuel-budget-planner">fuel budget planner</Link> for
          recurring spend, and the comparison tools under Vehicles when you are deciding between
          two vehicles rather than costing one you already own.
        </p>
      </div>

      <div className="space-y-10">
        {GROUPS.map((group) => {
          const tools = group.tools.filter((t) => keepSet.has(t.slug));
          if (tools.length === 0) return null;
          return (
            <section key={group.title}>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {group.title}
                </h2>
                {group.href !== "/calculators" ? (
                  <Link
                    href={group.href}
                    className="text-sm text-orange-700 dark:text-orange-400 underline underline-offset-2 whitespace-nowrap"
                  >
                    Read the {group.title.toLowerCase()} guide
                  </Link>
                ) : null}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{group.intro}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/calculators/${t.slug}`}
                      className="flex h-full flex-col rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 hover:border-orange-500"
                    >
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t.label}
                      </span>
                      <span className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                        {t.answers}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
