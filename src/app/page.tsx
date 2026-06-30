import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";
import EmailOptIn from "@/components/EmailOptIn";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Calculators — Finance, Marketing, Tax & Fuel",
  description:
    "Free Australian online calculators for finance, tax, marketing ROI, fuel costs, and more. 70+ tools. Instant results, no sign-up required.",
  path: "/",
});

type Tool = { title: string; slug: string; description: string; path?: string };

const toolCategories: {
  category: string;
  slug: string;
  color: string;
  icon: string;
  tools: Tool[];
}[] = [
  {
    category: "Email Marketing",
    slug: "email-marketing",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    icon: "✉️",
    tools: [
      {
        title: "Email Open Rate Calculator",
        slug: "email-open-rate-calculator",
        description: "Calculate your email open rate from opens and deliveries.",
      },
      {
        title: "Email List Growth Rate Calculator",
        slug: "email-list-growth-rate-calculator",
        description: "Track net subscriber growth as a percentage of your list size.",
      },
      {
        title: "Click-Through Rate Calculator",
        slug: "click-through-rate-calculator",
        description: "Calculate CTR for ads, emails, and organic search listings.",
      },
    ],
  },
  {
    category: "Financial & ROI",
    slug: "financial",
    color: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    icon: "💰",
    tools: [
      {
        title: "Marketing ROI Calculator",
        slug: "marketing-roi-calculator",
        description: "Measure the return on your marketing investment.",
      },
      {
        title: "ROAS Calculator",
        slug: "roas-calculator",
        description: "Calculate your Return on Ad Spend instantly.",
      },
      {
        title: "Ad Spend Calculator",
        slug: "ad-spend-calculator",
        description: "Plan your ad budget: clicks, leads, revenue, and ROI.",
      },
      {
        title: "Customer Acquisition Cost Calculator",
        slug: "customer-acquisition-cost-calculator",
        description: "Calculate how much you spend to acquire each new customer.",
      },
      {
        title: "Customer Lifetime Value Calculator",
        slug: "customer-lifetime-value-calculator",
        description: "Measure the total revenue value of each customer relationship.",
      },
      {
        title: "Marketing Budget Calculator",
        slug: "marketing-budget-calculator",
        description: "Get a recommended marketing budget based on revenue and industry.",
      },
      {
        title: "Australian Income Tax Calculator",
        slug: "australian-income-tax-calculator",
        description: "Calculate income tax, Medicare levy, LITO, and take-home pay for 2025-26.",
      },
      {
        title: "GST Calculator",
        slug: "gst-calculator",
        description: "Add or remove GST from any Australian price. Standard 10% rate.",
      },
      {
        title: "Profit Margin Calculator",
        slug: "profit-margin-calculator",
        description: "Calculate gross, net, and operating profit margins instantly.",
      },
      {
        title: "Break-Even Calculator",
        slug: "break-even-calculator",
        description: "Find the sales volume needed to cover your fixed costs.",
      },
      {
        title: "Average Order Value Calculator",
        slug: "average-order-value-calculator",
        description: "Track your average transaction size over any period.",
      },
    ],
  },
  {
    category: "Social Media",
    slug: "social-media",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800",
    icon: "📱",
    tools: [
      {
        title: "Social Media ROI Calculator",
        slug: "social-media-roi-calculator",
        description: "Measure the ROI of your social media ad spend.",
      },
      {
        title: "Social Media Engagement Rate Calculator",
        slug: "social-media-engagement-rate-calculator",
        description: "Calculate engagement rate for Instagram, LinkedIn, TikTok, and more.",
      },
      {
        title: "Follower Growth Rate Calculator",
        slug: "social-media-follower-growth-rate-calculator",
        description: "Track your social media audience growth rate over any period.",
      },
      {
        title: "Social Media Character Counter",
        slug: "social-media-character-counter",
        path: "/tools/social-media-character-counter",
        description: "Live character count for Twitter/X, LinkedIn, Instagram, and Facebook.",
      },
      {
        title: "Post Length Optimizer",
        slug: "social-media-post-length-optimizer",
        path: "/tools/social-media-post-length-optimizer",
        description: "Get optimal length recommendations for every social platform.",
      },
    ],
  },
  {
    category: "Conversion & Leads",
    slug: "conversion",
    color: "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
    icon: "🎯",
    tools: [
      {
        title: "Conversion Rate Calculator",
        slug: "conversion-rate-calculator",
        description: "Measure how effectively your pages turn visitors into customers.",
      },
      {
        title: "Cost Per Lead Calculator",
        slug: "cost-per-lead-calculator",
        description: "Calculate your cost per lead and compare across channels.",
      },
      {
        title: "Cost Per Acquisition Calculator",
        slug: "cost-per-acquisition-calculator",
        description: "Calculate your cost to acquire a paying customer.",
      },
      {
        title: "Revenue Per Lead Calculator",
        slug: "revenue-per-lead-calculator",
        description: "Find the revenue value of each marketing lead generated.",
      },
      {
        title: "Churn Rate Calculator",
        slug: "churn-rate-calculator",
        description: "Measure how many customers you lose each period.",
      },
    ],
  },
  {
    category: "SEO Tools",
    slug: "seo-tools",
    color: "bg-teal-50 border-teal-200 dark:bg-teal-950 dark:border-teal-800",
    icon: "🔍",
    tools: [
      {
        title: "Website Speed Impact Calculator",
        slug: "website-speed-impact-calculator",
        description: "See how faster load times increase conversions and revenue.",
      },
      {
        title: "Website Traffic Calculator",
        slug: "website-traffic-calculator",
        description: "Project organic traffic growth from SEO improvements.",
      },
      {
        title: "Net Promoter Score Calculator",
        slug: "net-promoter-score-calculator",
        description: "Calculate your NPS from promoter and detractor responses.",
      },
      {
        title: "Marketing Health Check",
        slug: "marketing-health-check",
        path: "/tools/marketing-health-check",
        description: "10-question quiz: score your marketing foundation and get recommendations.",
      },
    ],
  },
  {
    category: "AI Developer Tools",
    slug: "ai-developer-tools",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800",
    icon: "🤖",
    tools: [
      {
        title: "AI Model Router Savings Calculator",
        slug: "ai-model-router-savings-calculator",
        description: "See how much you save routing easy queries to cheaper models.",
      },
      {
        title: "Prompt Caching Discount Estimator",
        slug: "prompt-caching-discount-estimator",
        description: "Calculate exact savings from caching system prompts with Claude, GPT-4o, or Gemini.",
      },
      {
        title: "Multimodal Payload Estimator",
        slug: "multimodal-payload-estimator",
        description: "Estimate token counts and costs for images, video, and audio across GPT-4o, Claude, and Gemini.",
      },
    ],
  },
  {
    category: "Fuel & Energy",
    slug: "fuel-energy",
    color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
    icon: "⛽",
    tools: [
      {
        title: "Trip Fuel Cost Calculator",
        slug: "trip-fuel-cost-calculator",
        description: "Calculate total fuel cost for any road trip.",
      },
      {
        title: "Commute Fuel Cost Calculator",
        slug: "commute-fuel-cost-calculator",
        description: "See your daily, weekly, and annual commute fuel costs.",
      },
      {
        title: "Towing Fuel Cost Calculator",
        slug: "towing-fuel-cost-calculator",
        description: "Calculate caravan and trailer fuel penalty for towing trips.",
      },
      {
        title: "EV vs Gas Calculator",
        slug: "ev-vs-gas-calculator",
        description: "Compare 5-year or 10-year total cost of ownership.",
      },
      {
        title: "Hybrid vs Petrol Calculator",
        slug: "hybrid-vs-gas-calculator",
        description: "Compare running costs between hybrid and petrol vehicles.",
      },
      {
        title: "Hydrogen vs Petrol Calculator",
        slug: "hydrogen-vs-gas-calculator",
        description: "Compare hydrogen and petrol fuel costs side by side.",
      },
      {
        title: "Drive vs Fly Calculator",
        slug: "drive-vs-fly-calculator",
        description: "Compare the true cost of driving versus flying.",
      },
      {
        title: "Boat Fuel Calculator",
        slug: "boat-fuel-calculator",
        description: "Estimate marine fuel costs for any boat trip.",
      },
      {
        title: "Carpool Fuel Split Calculator",
        slug: "carpool-fuel-split-calculator",
        description: "Split fuel costs fairly among passengers.",
      },
      {
        title: "Fuel Budget Planner",
        slug: "fuel-budget-planner",
        description: "Plan your monthly fuel spend and stay on budget.",
      },
      {
        title: "Fuel Economy Savings Calculator",
        slug: "fuel-economy-savings-calculator",
        description: "Quantify savings from improving your driving habits and MPG.",
      },
      {
        title: "Generator Fuel Calculator",
        slug: "generator-fuel-calculator",
        description: "Calculate generator runtime and fuel needed for outages.",
      },
      {
        title: "Fuel Surcharge Calculator",
        slug: "fuel-surcharge-calculator",
        description: "Calculate delivery fuel surcharges for freight and shipping.",
      },
      {
        title: "Idling Fuel Waste Calculator",
        slug: "idling-fuel-waste-calculator",
        description: "See how much fuel and money you waste idling your engine.",
      },
      {
        title: "Emergency Fuel Rationing Calculator",
        slug: "emergency-fuel-rationing-calculator",
        description: "Plan your fuel supply during shortages or emergencies.",
      },
      {
        title: "IFTA Fuel Tax Calculator",
        slug: "ifta-fuel-tax-calculator",
        description: "Calculate interstate fuel tax for commercial trucking.",
      },
    ],
  },
  {
    category: "Australian Tax & Super",
    slug: "financial",
    color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
    icon: "🇦🇺",
    tools: [
      {
        title: "Income Tax Calculator",
        slug: "income-tax-calculator",
        description: "Calculate Australian income tax for 2025–26.",
      },
      {
        title: "Capital Gains Tax Calculator",
        slug: "capital-gains-tax-calculator",
        description: "Calculate CGT on shares, property, and crypto for 2025–26.",
      },
      {
        title: "Tax Refund Estimator",
        slug: "tax-refund-estimator",
        description: "Estimate your Australian tax refund for 2025–26.",
      },
      {
        title: "Stamp Duty Calculator",
        slug: "stamp-duty-calculator",
        description: "Calculate stamp duty across all Australian states.",
      },
      {
        title: "Superannuation Calculator",
        slug: "superannuation-calculator",
        description: "Project your super balance at retirement.",
      },
      {
        title: "Salary Sacrifice Calculator",
        slug: "salary-sacrifice-calculator",
        description: "See how salary sacrifice boosts your super and cuts tax.",
      },
      {
        title: "Franking Credits Calculator",
        slug: "franking-credits-calculator",
        description: "Calculate franking credits and refunds on Australian dividends.",
      },
      {
        title: "Negative Gearing Calculator",
        slug: "negative-gearing-calculator",
        description: "Model negative gearing tax benefits on investment property.",
      },
      {
        title: "HECS-HELP Repayment Calculator",
        slug: "hecs-help-repayment-calculator",
        description: "Calculate your HECS-HELP repayments based on income.",
      },
      {
        title: "Work From Home Tax Calculator",
        slug: "work-from-home-tax-calculator",
        description: "Calculate WFH tax deductions for 2025–26.",
      },
      {
        title: "Mortgage Repayment Calculator",
        slug: "mortgage-repayment-calculator",
        description: "Calculate monthly, fortnightly, and weekly repayments.",
      },
      {
        title: "Loan Repayment Calculator",
        slug: "loan-repayment-calculator",
        description: "Calculate monthly payments and total interest on any loan.",
      },
      {
        title: "Compound Interest Calculator",
        slug: "compound-interest-calculator",
        description: "Project savings and investment growth with compound interest.",
      },
    ],
  },
  {
    category: "Everyday Tools",
    slug: "financial",
    color: "bg-rose-50 border-rose-200 dark:bg-rose-950 dark:border-rose-800",
    icon: "🧮",
    tools: [
      {
        title: "Percentage Calculator",
        slug: "percentage-calculator",
        description: "Fast, free percentage calculations for any use case.",
      },
      {
        title: "BMI Calculator",
        slug: "bmi-calculator",
        description: "Calculate your Body Mass Index using Australian health standards.",
      },
      {
        title: "Age Calculator",
        slug: "age-calculator",
        description: "Calculate exact age in years, months, and days.",
      },
      {
        title: "Tip Calculator",
        slug: "tip-calculator",
        description: "Split bills and calculate tips instantly.",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Free Online Calculators — Finance, Marketing, Tax &amp; Fuel
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stop guessing. Start measuring. CalcFuel gives you instant answers on
          ROI, ROAS, email metrics, social media performance, and more — all
          free, no sign-up required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {toolCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/calculators/${cat.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 transition-all"
            >
              {cat.icon} {cat.category}
            </Link>
          ))}
        </div>
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />

      {/* Tool grid by category */}
      {toolCategories.map((cat) => (
        <section key={cat.slug} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cat.icon} {cat.category}
            </h2>
            <Link
              href={`/calculators/${cat.slug}`}
              className="text-sm text-orange-500 hover:underline font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.path ?? `/calculators/${tool.slug}`}
                className={`block p-5 rounded-xl border ${cat.color} hover:shadow-lg hover:border-orange-400 transition-all group`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {tool.description}
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-orange-500 group-hover:underline">
                  Try it free →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="my-8" />

      <EmailOptIn source="homepage" />

      <ProductCTASection variant="showcase" />

      <section className="mt-12 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Built for trust and transparent decisions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Every calculator is built with clear assumptions, practical examples, and documented limitations. We publish free tools to help teams make better decisions, faster.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/about" className="text-orange-500 hover:text-orange-600">
            Learn about CalcFuel
          </Link>
          <Link href="/privacy-policy" className="text-orange-500 hover:text-orange-600">
            Review privacy policy
          </Link>
          <Link href="/contact" className="text-orange-500 hover:text-orange-600">
            Contact editorial team
          </Link>
        </div>
      </section>

      {/* Latest from the Blog — editorial depth signal */}
      <section className="mt-10 mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest from the Blog</h2>
          <Link href="/blog" className="text-sm text-orange-500 hover:underline font-medium">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              href: "/blog/caravan-fuel-consumption-australia",
              category: "Fuel & Energy",
              title: "Caravan Fuel Consumption Australia: Towing Costs by Vehicle",
              excerpt: "Real-world L/100km for 6 popular tow vehicles, costs for 5 major AU road trips, and fuel-saving tips.",
            },
            {
              href: "/blog/understanding-fuel-economy-mpg-vs-l100km",
              category: "Fuel & Energy",
              title: "Understanding Fuel Economy: MPG vs L/100km Explained",
              excerpt: "How to convert between MPG and L/100km, calculate your real fuel costs, and what affects consumption.",
            },
            {
              href: "/blog/how-to-reduce-commute-fuel-costs",
              category: "Fuel & Energy",
              title: "How to Reduce Your Commute Fuel Costs: 7 Proven Tips",
              excerpt: "Seven strategies that cut commute fuel costs with real savings estimates for each.",
            },
            {
              href: "/blog/what-is-a-good-conversion-rate",
              category: "Conversion",
              title: "What Is a Good Conversion Rate? Benchmarks by Industry",
              excerpt: "Industry benchmarks for e-commerce, SaaS, lead generation, and landing pages.",
            },
          ].map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:shadow-md transition-all group bg-white dark:bg-gray-900"
            >
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                {post.category}
              </span>
              <h3 className="mt-2 font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors text-sm">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-orange-500 group-hover:underline">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}