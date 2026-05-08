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

export const outlineArticles: BlogArticleRecord[] = [
  { slug: "cac-vs-ltv-for-startups", title: "CAC vs LTV for Startups: The Ratio That Predicts Survival", description: "Practical framework to calculate and improve CAC:LTV by channel, stage, and payback window.", date: "2026-05-08", readTime: "Outline", category: "Unit Economics", isOutline: true },
  { slug: "how-to-build-a-marketing-forecast-model", title: "How to Build a Marketing Forecast Model in 60 Minutes", description: "Step-by-step demand and revenue forecasting model using conversion and budget assumptions.", date: "2026-05-08", readTime: "Outline", category: "Forecasting", isOutline: true },
  { slug: "roas-vs-profitability", title: "ROAS vs Profitability: When Good Campaigns Still Lose Money", description: "Margin-aware ROAS decisions with worked examples for eCommerce and SaaS.", date: "2026-05-08", readTime: "Outline", category: "Paid Advertising", isOutline: true },
  { slug: "marketing-budget-by-revenue-stage", title: "How Much Should You Spend on Marketing at Each Revenue Stage?", description: "Benchmark-driven budget planning model for new, growth, and mature businesses.", date: "2026-05-08", readTime: "Outline", category: "Budget Planning", isOutline: true },
  { slug: "conversion-rate-benchmark-framework", title: "A Better Conversion Rate Benchmark Framework by Traffic Intent", description: "How to benchmark conversion rates without misleading averages.", date: "2026-05-08", readTime: "Outline", category: "Conversion", isOutline: true },
  { slug: "email-list-growth-playbook", title: "Email List Growth Playbook: Forecasting Subscriber Growth and Revenue", description: "Model list growth, expected open/click rates, and revenue impact from lifecycle campaigns.", date: "2026-05-08", readTime: "Outline", category: "Email Marketing", isOutline: true },
  { slug: "cpa-reduction-prioritization", title: "How to Reduce CPA: A Prioritization Model That Actually Works", description: "A decision matrix for reducing CPA across creative, audience, and landing pages.", date: "2026-05-08", readTime: "Outline", category: "Acquisition", isOutline: true },
  { slug: "lead-to-revenue-math", title: "Lead-to-Revenue Math: From CPL to Revenue Per Lead", description: "Connect lead quality, close rate, and ACV to true acquisition efficiency.", date: "2026-05-08", readTime: "Outline", category: "Pipeline Analytics", isOutline: true },
  { slug: "paid-media-incrementality-guide", title: "Paid Media Incrementality: A Practical Holdout Test Guide", description: "Simple experiment designs to validate paid media lift beyond attributed conversions.", date: "2026-05-08", readTime: "Outline", category: "Measurement", isOutline: true },
  { slug: "ltv-calculation-mistakes", title: "7 LTV Calculation Mistakes That Distort Growth Decisions", description: "Common LTV modeling errors and corrected formulas with practical scenarios.", date: "2026-05-08", readTime: "Outline", category: "Unit Economics", isOutline: true },
  { slug: "channel-mix-efficiency-score", title: "Build a Channel Mix Efficiency Scorecard in GA4", description: "Scoring framework to compare channels on volume, quality, and profitability.", date: "2026-05-08", readTime: "Outline", category: "Analytics", isOutline: true },
  { slug: "nps-to-growth-loop", title: "From NPS to Growth: Turning Promoters into Revenue", description: "How to link NPS changes to retention, referral growth, and LTV outcomes.", date: "2026-05-08", readTime: "Outline", category: "Retention", isOutline: true },
  { slug: "seo-traffic-value-model", title: "How to Estimate the Revenue Value of SEO Traffic", description: "Translate keyword traffic into pipeline and revenue forecasts with confidence ranges.", date: "2026-05-08", readTime: "Outline", category: "SEO", isOutline: true },
  { slug: "ad-budget-scenarios-optimizer", title: "Ad Budget Scenario Planning: Conservative vs Aggressive Growth", description: "Scenario model to forecast CAC, ROAS, and cash impact before scaling spend.", date: "2026-05-08", readTime: "Outline", category: "Budget Planning", isOutline: true },
  { slug: "marketing-kpi-operating-cadence", title: "Marketing KPI Operating Cadence: Weekly, Monthly, Quarterly", description: "A practical KPI cadence and dashboard design for growth teams.", date: "2026-05-08", readTime: "Outline", category: "KPI Measurement", isOutline: true },
];
