import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import PromptCachingCalc from "./PromptCachingCalc";

export const metadata: Metadata = {
  title: "Prompt Caching Savings Calculator — Save Up to 90% on LLM Costs | CalcFuel",
  description:
    "Free prompt caching discount estimator. Calculate exactly how much you save by caching your system prompt with Claude, GPT-4o, or Gemini. See break-even point and monthly savings instantly.",
  alternates: { canonical: "/calculators/prompt-caching-discount-estimator" },
};

const relatedTools = [
  { title: "AI Model Router Savings Calculator", slug: "ai-model-router-savings-calculator", description: "See how much you save routing easy queries to cheaper models." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your marketing investment." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from paid ads." },
  { title: "Website Speed Impact Calculator", slug: "website-speed-impact-calculator", description: "See how page speed affects conversions and revenue." },
  { title: "RAG Storage Cost Calculator", slug: "rag-storage-cost-calculator", description: "Calculate vector DB and embedding storage costs." },
  { title: "Multimodal Payload Estimator", slug: "multimodal-payload-estimator", description: "Estimate token costs for image and document payloads." },
];

const faqs = [
  {
    question: "What is prompt caching in LLM APIs?",
    answer:
      "Prompt caching is a feature offered by Anthropic (Claude), OpenAI (GPT-4o), and Google (Gemini) that lets you store a large, reused portion of your prompt — typically a system prompt, a document, or a codebase — on the provider's servers. On subsequent requests that reuse the same prefix, the provider reads from cache instead of re-processing the full token count. Cache reads are dramatically cheaper: 90% off for Anthropic, 50% off for OpenAI, and 75% off for Google.",
  },
  {
    question: "How much does prompt caching actually save?",
    answer:
      "The savings depend on how large your system prompt is relative to your query volume. A 10,000-token system prompt sent to Claude Sonnet 1,000 times per day costs $90/month in input tokens alone. With caching, the same setup costs about $9/month in cache reads — a $81/month saving (90% reduction). The larger your prompt and higher your query volume, the bigger the absolute saving. This calculator shows you the exact numbers for your specific setup.",
  },
  {
    question: "How does Anthropic prompt caching work?",
    answer:
      "With Anthropic's explicit caching, you mark a section of your prompt with a cache_control parameter (type: 'ephemeral'). The first request that includes this prompt section pays the cache write rate — 125% of the standard input rate. All subsequent requests within the cache TTL (5 minutes by default) pay the cache read rate — just 10% of standard input price. The cache TTL resets each time the cached block is accessed. For production applications with high query volume, the break-even is typically reached after fewer than 5 queries.",
  },
  {
    question: "How does OpenAI prompt caching work?",
    answer:
      "OpenAI implements automatic prompt caching for supported models (GPT-4o, GPT-4o mini, o1, o3). You don't need to explicitly mark sections for caching. Any prompt prefix of 1,024 or more tokens that has been sent in a recent request is automatically cached. Cached tokens are charged at 50% of the standard input rate. There is no explicit write cost — caching happens transparently. The cache is maintained for about an hour of inactivity.",
  },
  {
    question: "How does Google context caching work?",
    answer:
      "Google's context caching is available for Gemini models. Unlike Anthropic or OpenAI, Google requires you to explicitly create a cached content resource via the API, specifying the content to cache and a TTL. Cached content storage costs $1.00 per million tokens per hour for Gemini 1.5 Pro, or $0.25 per million tokens per hour for Gemini 1.5 Flash. Cache read requests get a 75% discount on input token pricing. Google context caching is most cost-effective when you query the same cached content many times per hour.",
  },
  {
    question: "What should I put in my cached prompt?",
    answer:
      "Cache your largest, most static content: (1) System instructions and persona definitions, (2) Long documents, PDFs, or reference material your app processes repeatedly, (3) Code files or codebases for code review/generation tasks, (4) Product catalogues, knowledge bases, or FAQ documents, (5) Tool definitions for function-calling setups. Do NOT cache user-specific data, the conversation history, or anything that changes per request — those must remain in the non-cached portion of the prompt.",
  },
  {
    question: "What is the minimum prompt size for caching to work?",
    answer:
      "Each provider has a minimum token requirement before caching applies. Anthropic requires at least 1,024 tokens in a cached block (Claude Sonnet/Opus) or 2,048 tokens (Claude Haiku). OpenAI automatically caches prefixes of 1,024 tokens or more. Google's minimum cached content is 4,096 tokens. For small system prompts under these thresholds, caching won't help — focus on reducing prompt length instead.",
  },
  {
    question: "Does prompt caching affect response quality?",
    answer:
      "No. The model processes cached tokens identically to non-cached tokens — the cache is a billing optimization, not a model shortcut. The AI still 'reads' and 'understands' the full cached context when generating each response. Response quality, latency, and accuracy are unaffected by whether the prompt prefix was served from cache or re-processed from scratch.",
  },
];

const howToSteps = [
  {
    name: "Select your model",
    text: "Choose the LLM provider and model you currently use. Caching discounts vary significantly: Anthropic offers 90% off cache reads, OpenAI offers 50%, Google offers 75%.",
  },
  {
    name: "Enter your system prompt length",
    text: "Input the number of tokens in your system prompt, or use the character estimator (1 token ≈ 4 characters). A 1,000-word prompt is roughly 1,333 tokens; a 10-page PDF is roughly 10,000 tokens.",
  },
  {
    name: "Enter your daily query volume",
    text: "How many API requests does your application make per day? Higher query volumes produce larger absolute savings from caching.",
  },
  {
    name: "Review your monthly savings",
    text: "The estimator shows your monthly cost without caching, with caching, and the break-even point — the number of queries at which caching pays for itself.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Prompt Caching Discount Estimator",
  description:
    "Free calculator that estimates how much you save by using prompt caching with Claude (Anthropic), GPT-4o (OpenAI), and Gemini (Google). Shows monthly cost comparison and break-even point.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://calcfuel.com/calculators/prompt-caching-discount-estimator",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Free",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to estimate your prompt caching savings",
  step: howToSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Prompt Caching Discount Estimator — Save Up to 90% on LLM Costs",
  description: "Free calculator that estimates how much you save by using prompt caching with Claude (Anthropic), GPT-4o (OpenAI), and Gemini (Google). Shows monthly cost comparison and break-even point.",
  url: "https://calcfuel.com/calculators/prompt-caching-discount-estimator",
  author: { "@type": "Organization", name: "CalcFuel", url: "https://calcfuel.com" },
  publisher: { "@type": "Organization", name: "CalcFuel", url: "https://calcfuel.com" },
  datePublished: "2025-10-01",
  dateModified: "2026-05-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://calcfuel.com/calculators/prompt-caching-discount-estimator" },
};

export default function PromptCachingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          {" / "}
          <Link href="/calculators/ai-model-router-savings-calculator" className="hover:text-orange-500">AI Tools</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-200">Prompt Caching Discount Estimator</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Prompt Caching Discount Estimator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Calculate exactly how much you save by caching your system prompt with Claude, GPT-4o, or Gemini. See your break-even point and monthly savings in seconds.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">Anthropic</a> offers <strong>90% off</strong> cache reads · <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a> offers <strong>50% off</strong> · <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer" className="underline">Google</a> offers <strong>75% off</strong>. Prices from official provider pages, May 2025.
        </p>
        <CalcReviewedBy />

        <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

        {/* Calculator */}
        <div className="my-8">
          <PromptCachingCalc />
        </div>


        <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

        {/* How it works */}
        <section className="mt-12 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <ol className="space-y-4">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{step.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Explainer */}
        <section className="prose prose-gray dark:prose-invert max-w-none mb-10">
          <h2>Why Prompt Caching Matters for AI Developers</h2>
          <p>
            If you're running an LLM-powered application at scale, your system prompt is almost certainly your largest and most repetitive cost driver. Every time your application calls the API — for a user question, a document classification, a support ticket response — you're sending the same thousand-token system prompt over and over again. Each repetition is billed at full input token rates.
          </p>
          <p>
            Prompt caching solves this by letting you store that static prefix on the provider's infrastructure. Subsequent calls that reuse the same prefix are charged at the cache read rate instead: 90% cheaper for Anthropic, 50% cheaper for OpenAI, 75% cheaper for Google. For applications making thousands of daily calls to the same large system prompt, the monthly savings can be substantial.
          </p>

          <h3>Anthropic Claude: Explicit Cache Control</h3>
          <p>
            Anthropic's implementation requires you to explicitly mark blocks for caching using a <code>cache_control</code> parameter in the messages API. Cache writes cost 25% more than standard input rates (to cover the overhead of writing to cache), but cache reads cost only 10% of the input rate — a 90% discount. The cache persists for at least 5 minutes and resets on each access. For production applications with consistent traffic, the write cost is negligible compared to the read savings.
          </p>

          <h3>OpenAI GPT-4o: Automatic Caching</h3>
          <p>
            OpenAI caches automatically — there's no API parameter to set. Any prompt prefix longer than 1,024 tokens that appears in recent requests is automatically cached. Cached tokens are billed at 50% of standard input rates. The lack of an explicit write cost means OpenAI caching is always profitable from the very first repeated request. The downside is less control: you can't force cache writes or inspect cache hits programmatically.
          </p>

          <h3>Google Gemini: Context Caching with Storage Fees</h3>
          <p>
            Google's approach is more explicit than OpenAI but adds a storage dimension: you create a cached content resource with a specified TTL, and pay an hourly storage fee per million cached tokens while it exists. Cache reads are billed at 75% off input rates. For workloads with consistent traffic throughout the day, the storage cost is easily offset by the input savings. For sporadic workloads, evaluate whether storage fees erode the discount.
          </p>

          <h3>When to Use Prompt Caching</h3>
          <p>
            Caching delivers the highest ROI when your system prompt is long (thousands of tokens), your query volume is high (hundreds or thousands per day), and your prompt content is mostly static. Common use cases include: RAG systems where the same large document context is queried repeatedly, customer support bots with detailed product knowledge bases, code review tools that embed an entire codebase, and multi-step agent workflows that reuse the same tool definitions across many turns.
          </p>
          <p>
            Caching is less effective for one-off queries, personalised prompts that change per user, or very short system prompts below the provider minimum (typically 1,024 tokens).
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

        {/* MarketingAI CTA */}
        <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950 rounded-2xl border border-orange-200 dark:border-orange-800 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need an AI-assisted marketing system for your business?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            MarketingAI builds done-with-you marketing systems for Australian small businesses — content, email, and lead generation, configured to your offer and delivered in under a week. One-time setup, owned by you permanently.
          </p>
          <a
            href="https://marketing-ai-psi-nine.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
          >
            Learn About MarketingAI →
          </a>
        </div>

        {/* Related Tools */}
        <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200">
          <strong>Disclaimer:</strong> This calculator provides estimates only. Actual API costs depend on your specific usage patterns, provider pricing changes, and discount tiers. Always verify current pricing on the provider&apos;s official pricing page before making infrastructure decisions.
        </aside>
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
