import { isGonePath, isHoldEquityPath } from "@/lib/portfolio";

export type BlogArticleRecord = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  calculatorSlug?: string;
  isOutline?: boolean;
};

export const publishedArticles: BlogArticleRecord[] = [
  {
    slug: "diesel-vs-petrol-car-australia",
    title: "Diesel vs Petrol in Australia (2026)",
    description:
      "Real cost comparisons for diesel vs petrol in Australia: fuel cost per km, servicing, towing capacity, DPF risks, resale value, and a clear decision guide for utes, SUVs, and passenger cars.",
    date: "2026-07-17",
    readTime: "10 min read",
    category: "Fuel & Energy",
    calculatorSlug: "trip-fuel-cost-calculator",
  },
  {
    slug: "how-to-save-money-on-petrol-australia",
    title: "How to Save Money on Petrol in Australia (2026)",
    description:
      "18 practical ways to cut your petrol bill in Australia — from when to fill up, to driving habits, apps, and fuel cards that actually work.",
    date: "2026-07-17",
    readTime: "10 min read",
    category: "Fuel & Energy",
    calculatorSlug: "commute-fuel-cost-calculator",
  },
  {
    slug: "most-fuel-efficient-cars-australia",
    title: "Most Fuel Efficient Cars in Australia (2026)",
    description:
      "Ranked: the most fuel efficient small cars, SUVs, hybrids, and utes in Australia by L/100km — with real-world fuel cost comparisons and payback calculators.",
    date: "2026-07-01",
    readTime: "9 min read",
    category: "Fuel & Energy",
    calculatorSlug: "fuel-economy-savings-calculator",
  },
  {
    slug: "car-running-costs-australia",
    title: "Car Running Costs in Australia (2026)",
    description:
      "Full breakdown of Australian car running costs: fuel, registration, insurance, tyres, servicing, and depreciation. Indicative 2026 figures for common vehicle types.",
    date: "2026-07-01",
    readTime: "10 min read",
    category: "Fuel & Energy",
    calculatorSlug: "fuel-economy-savings-calculator",
  },
  {
    slug: "hybrid-vs-petrol-australia",
    title: "Hybrid vs Petrol in Australia (2026)",
    description:
      "Compare hybrid vs petrol cars in Australia with real fuel savings, break-even calculations, and model comparisons.",
    date: "2026-07-01",
    readTime: "8 min read",
    category: "Fuel & Energy",
    calculatorSlug: "hybrid-vs-gas-calculator",
  },
  {
    slug: "petrol-cost-per-km-australia",
    title: "Petrol Cost Per Km in Australia (2026)",
    description:
      "Calculate your petrol cost per km and compare running costs for popular Australian cars.",
    date: "2026-07-01",
    readTime: "7 min read",
    category: "Fuel & Energy",
    calculatorSlug: "trip-fuel-cost-calculator",
  },
  {
    slug: 'best-time-to-buy-petrol-australia',
    title: 'Best Time to Buy Petrol in Australia (2026)',
    description:
      'Australian petrol prices follow a predictable weekly cycle. Find out which day is cheapest in Sydney, Melbourne, Brisbane, Adelaide, and Perth — and which apps track prices in real time.',
    date: '2026-07-01',
    readTime: '7 min read',
    category: 'Fuel & Energy',
    calculatorSlug: 'commute-fuel-cost-calculator',
  },
    {
    slug: "ev-charging-cost-australia",
    title: "EV Charging Cost in Australia (2026)",
    description:
      "Complete 2026 guide to EV charging costs in Australia — home vs public rates, best tariffs, solar charging, and real per-km cost breakdowns for BYD, Tesla, MG, Kia, and more.",
    date: "2026-07-01",
    readTime: "9 min read",
    category: "EV & Electric Vehicles",
    calculatorSlug: "ev-charging-cost-calculator",
  },
  {
    slug: "motorcycle-vs-car-running-costs-australia",
    title: "Motorcycle vs Car Running Costs Australia: Is a Motorbike Actually Cheaper?",
    description:
      "Full cost breakdown: fuel, registration, insurance, tyres, and servicing — with real 2026 figures. A motorcycle commuter saves $1,700–$9,000/year over a car depending on city and parking costs.",
    date: "2026-07-01",
    readTime: "10 min read",
    category: "Fuel & Motorbikes",
    calculatorSlug: "motorcycle-fuel-cost-calculator",
  },
  {
    slug: "caravan-fuel-consumption-australia",
    title: "Caravan Fuel Consumption in Australia (2026)",
    description:
      "Real-world L/100km figures for common tow vehicles, diesel vs petrol breakdown, speed effects, and 8 tips to cut your caravan towing fuel cost on Australian roads.",
    date: "2026-06-30",
    readTime: "9 min read",
    category: "Fuel & Caravan",
    calculatorSlug: "towing-fuel-cost-calculator",
  },
  {
    slug: "understanding-fuel-economy-mpg-vs-l100km",
    title: "Understanding Fuel Economy: MPG vs L/100km Explained",
    description:
      "MPG and L/100km measure the same thing in opposite directions. Learn how to convert between them, calculate your real fuel costs, and what affects your fuel economy.",
    date: "2026-05-12",
    readTime: "8 min read",
    category: "Fuel & Energy",
    calculatorSlug: "trip-fuel-cost-calculator",
  },
  {
    slug: "how-to-reduce-commute-fuel-costs",
    title: "How to Reduce Your Commute Fuel Costs: 7 Proven Tips",
    description:
      "Seven practical strategies to cut your daily commute fuel costs — from driving habits to route optimisation to carpooling — with real savings estimates.",
    date: "2026-05-12",
    readTime: "8 min read",
    category: "Fuel & Energy",
    calculatorSlug: "commute-fuel-cost-calculator",
  },

];

/**
 * Guides that are actually reachable. Anything retired via 410 or held back with
 * noindex is filtered out here so index pages can never link to a dead URL.
 * Enforced by AC1 in `npm run audit:adsense`.
 */
export const liveArticles: BlogArticleRecord[] = publishedArticles.filter(
  (a) => !isGonePath(`/blog/${a.slug}`) && !isHoldEquityPath(`/blog/${a.slug}`),
);
