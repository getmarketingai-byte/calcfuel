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
    slug: "tax-deductions-australia-2025",
    title: "What Can I Claim on Tax in Australia 2025–26? (Complete Guide)",
    description:
      "Everything you can claim on your 2025–26 Australian tax return: work-related deductions, working from home (70c/hr), car expenses, self-education, investments, and what you can't claim.",
    date: "2026-07-17",
    readTime: "12 min read",
    category: "Tax & Finance",
    calculatorSlug: "australian-income-tax-calculator",
  },
  {
    slug: "how-to-save-money-on-petrol-australia",
    title: "How to Save Money on Petrol in Australia (2025 Guide)",
    description:
      "18 practical ways to cut your petrol bill in Australia — from when to fill up, to driving habits, apps, and fuel cards that actually work.",
    date: "2026-07-17",
    readTime: "10 min read",
    category: "Fuel & Energy",
    calculatorSlug: "commute-fuel-cost-calculator",
  },
  {
    slug: "most-fuel-efficient-cars-australia",
    title: "Most Fuel Efficient Cars in Australia 2025 — Full Ranked Guide",
    description:
      "Ranked: the most fuel efficient small cars, SUVs, hybrids, and utes in Australia by L/100km — with real-world fuel cost comparisons and payback calculators.",
    date: "2026-07-01",
    readTime: "9 min read",
    category: "Fuel & Energy",
    calculatorSlug: "fuel-economy-savings-calculator",
  },
  {
    slug: "car-running-costs-australia",
    title: "How Much Does It Cost to Run a Car in Australia? (2025 Guide)",
    description:
      "Full breakdown of Australian car running costs: fuel, registration, insurance, tyres, servicing, and depreciation. Real 2025 figures for common vehicle types.",
    date: "2026-07-01",
    readTime: "10 min read",
    category: "Fuel & Energy",
    calculatorSlug: "fuel-economy-savings-calculator",
  },
  {
    slug: "hybrid-vs-petrol-australia",
    title: "Hybrid vs Petrol Australia 2025 — Is It Worth the Price Premium?",
    description:
      "Compare hybrid vs petrol cars in Australia with real fuel savings, break-even calculations, and model comparisons.",
    date: "2026-07-01",
    readTime: "8 min read",
    category: "Fuel & Energy",
    calculatorSlug: "hybrid-vs-gas-calculator",
  },
  {
    slug: "petrol-cost-per-km-australia",
    title: "Petrol Cost Per Km Australia 2025 — Calculator & Car Comparison",
    description:
      "Calculate your petrol cost per km and compare running costs for popular Australian cars.",
    date: "2026-07-01",
    readTime: "7 min read",
    category: "Fuel & Energy",
    calculatorSlug: "trip-fuel-cost-calculator",
  },
  {
    slug: 'best-time-to-buy-petrol-australia',
    title: 'Best Time to Buy Petrol in Australia (2025 Price Cycle Guide)',
    description:
      'Australian petrol prices follow a predictable weekly cycle. Find out which day is cheapest in Sydney, Melbourne, Brisbane, Adelaide, and Perth — and which apps track prices in real time.',
    date: '2026-07-01',
    readTime: '7 min read',
    category: 'Fuel & Energy',
    calculatorSlug: 'commute-fuel-cost-calculator',
  },
    {
    slug: "ev-charging-cost-australia",
    title: "EV Charging Cost Australia 2026: How Much Does It Cost to Charge an Electric Car?",
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
    title: "Caravan Fuel Consumption Australia: How Much Fuel Does Towing a Caravan Use?",
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
  {
    slug: "beginners-guide-to-marketing-roi",
    title: "A Beginner's Guide to Marketing ROI",
    description:
      "What marketing ROI is, how to calculate it, attribution models explained, and how to use ROI to make smarter budget decisions. Includes channel benchmarks.",
    date: "2026-05-12",
    readTime: "9 min read",
    category: "ROI & Analytics",
    calculatorSlug: "marketing-roi-calculator",
  },
  {
    slug: "what-is-a-good-conversion-rate",
    title: "What Is a Good Conversion Rate? Benchmarks by Industry",
    description:
      "Conversion rate benchmarks by industry for e-commerce, SaaS, lead generation, and landing pages — plus how to interpret and improve yours.",
    date: "2026-05-12",
    readTime: "8 min read",
    category: "Conversion",
    calculatorSlug: "conversion-rate-calculator",
  },
  {
    slug: "how-to-calculate-ad-spend-roi",
    title: "How to Calculate Ad Spend ROI: A Complete Guide",
    description:
      "ROAS vs ROI explained, the ad spend ROI formula, 3 worked examples, attribution models, and when to cut a campaign that is not working.",
    date: "2026-05-09",
    readTime: "10 min read",
    category: "Paid Advertising",
    calculatorSlug: "ad-spend-calculator",
  },
  {
    slug: "how-to-calculate-customer-lifetime-value",
    title: "How to Calculate Customer Lifetime Value (CLV)",
    description:
      "Simple and predictive CLV formulas, worked examples by business model, and why CLV is the most important number in your marketing budget.",
    date: "2026-05-09",
    readTime: "9 min read",
    category: "Unit Economics",
    calculatorSlug: "customer-lifetime-value-calculator",
  },
  {
    slug: "how-to-calculate-conversion-rate",
    title: "How to Calculate Conversion Rate (+ Industry Benchmarks)",
    description:
      "The conversion rate formula, what counts as a conversion, benchmarks by industry, and how to improve your rate.",
    date: "2026-05-09",
    readTime: "7 min read",
    category: "Conversion",
    calculatorSlug: "conversion-rate-calculator",
  },
  {
    slug: "how-to-calculate-break-even-point",
    title: "How to Calculate Break-Even Point for Your Business",
    description:
      "The break-even formula, worked examples for product and service businesses, and how to use break-even analysis for pricing decisions.",
    date: "2026-05-09",
    readTime: "8 min read",
    category: "Profitability",
    calculatorSlug: "break-even-calculator",
  },
  {
    slug: "how-to-calculate-customer-acquisition-cost",
    title: "How to Calculate Customer Acquisition Cost (CAC)",
    description:
      "Learn the CAC formula, worked examples by industry, benchmarks, and common mistakes when calculating customer acquisition cost.",
    date: "2026-05-09",
    readTime: "8 min read",
    category: "Unit Economics",
    calculatorSlug: "customer-acquisition-cost-calculator",
  },
  {
    slug: "cac-vs-ltv-for-startups",
    title: "CAC vs LTV for Startups: The Ratio That Predicts Survival",
    description:
      "A practical framework to calculate and improve CAC:LTV by channel, stage, and payback window.",
    date: "2026-05-08",
    readTime: "11 min read",
    category: "Unit Economics",
    calculatorSlug: "customer-acquisition-cost-calculator",
  },
  {
    slug: "how-to-build-a-marketing-forecast-model",
    title: "How to Build a Marketing Forecast Model in 60 Minutes",
    description:
      "Step-by-step demand and revenue forecasting model using traffic, conversion, and budget assumptions.",
    date: "2026-05-08",
    readTime: "12 min read",
    category: "Forecasting",
    calculatorSlug: "marketing-budget-calculator",
  },
  {
    slug: "roas-vs-profitability",
    title: "ROAS vs Profitability: When Good Campaigns Still Lose Money",
    description:
      "Margin-aware ROAS decisions with worked examples for ecommerce and SaaS operators.",
    date: "2026-05-08",
    readTime: "10 min read",
    category: "Paid Advertising",
    calculatorSlug: "roas-calculator",
  },
  {
    slug: "how-to-calculate-email-open-rate",
    title: "How to Calculate Email Open Rate (+ Free Calculator)",
    description:
      "Learn the email open rate formula, what counts as a good open rate by industry, and how to diagnose and fix a declining rate.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Email Marketing",
    calculatorSlug: "email-open-rate-calculator",
  },
  {
    slug: "marketing-roi-formula",
    title: "Marketing ROI Formula: How to Measure Your Marketing Performance",
    description:
      "Understand the marketing ROI formula, how to attribute revenue to campaigns, and what a healthy ROI looks like across different channels.",
    date: "2026-05-05",
    readTime: "8 min read",
    category: "ROI & Analytics",
    calculatorSlug: "marketing-roi-calculator",
  },
  {
    slug: "what-is-a-good-roas",
    title: "What Is a Good ROAS? Calculator + Industry Benchmarks",
    description:
      "ROAS benchmarks by industry, how to calculate Return on Ad Spend, and when chasing a higher ROAS can actually hurt your growth.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Paid Advertising",
    calculatorSlug: "roas-calculator",
  },
];

