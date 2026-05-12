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

