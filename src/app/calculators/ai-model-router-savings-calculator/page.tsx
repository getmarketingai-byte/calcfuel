import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ModelRouterCalc from "./ModelRouterCalc";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "AI Model Router Savings Calculator — How Much Are You Overspending on LLMs?",
  description:
    "Free AI model router savings calculator. See how routing easy queries to cheaper models (GPT-4o mini, Gemini Flash, Claude Haiku) instead of expensive ones saves up to 60% on monthly LLM costs.",
};

const relatedTools = [
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your marketing investment." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from paid ads." },
  { title: "Website Speed Impact Calculator", slug: "website-speed-impact-calculator", description: "See how page speed affects conversions and revenue." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Calculate the revenue value of each marketing lead." },
];

const faqs = [
  {
    question: "What is an LLM router?",
    answer:
      "An LLM router is a system that classifies each incoming query by complexity and routes it to the most cost-effective model capable of answering it. Simple queries — factual lookups, short summaries, classification tasks — go to cheap, fast models like GPT-4o mini or Gemini Flash. Complex reasoning, multi-step tasks, or nuanced generation goes to powerful models like GPT-4o or Claude Sonnet. The result is the same quality of response at a fraction of the cost.",
  },
  {
    question: "How much can I realistically save with LLM routing?",
    answer:
      "Research from companies like Martian, OpenRouter, and LLM proxy teams consistently shows 40–70% cost reduction when routing 60% of queries to smaller models. The exact saving depends on your query mix, token volume, and which models you route between. This calculator uses a conservative 60/40 split and real published pricing to give you a reliable estimate.",
  },
  {
    question: "Which queries should go to cheap models vs expensive ones?",
    answer:
      "Cheap models handle: keyword extraction, text classification, sentiment analysis, simple Q&A with short answers, formatting tasks, grammar checks, and translation of simple content. Expensive models should handle: multi-step reasoning, code generation, complex summarisation of long documents, nuanced creative writing, and tasks requiring deep contextual understanding. A well-tuned router classifies this in milliseconds before each call.",
  },
  {
    question: "What are the best cheap models to route to?",
    answer:
      "In 2024–2025 the best cost-performance cheap models are: GPT-4o mini ($0.15/M input), Gemini 1.5 Flash ($0.075/M input — often the cheapest option), Claude Haiku 3.5 ($0.80/M input), and Llama 3.1 70B via Groq ($0.59/M input with very fast inference). Each has different strengths — GPT-4o mini scores well on general tasks, Gemini Flash is cheapest, and Llama on Groq offers the lowest latency.",
  },
  {
    question: "What is the 60/40 routing split used in this calculator?",
    answer:
      "The 60/40 split (60% easy queries to cheap models, 40% complex queries to expensive models) is based on industry benchmarks from routing research. Studies by Martian and LLM routing papers show that in typical enterprise applications, 55–70% of queries can be adequately handled by smaller models without quality degradation. This calculator uses 60% as a conservative midpoint. Your actual ratio may be higher if your workload is mostly simple tasks.",
  },
  {
    question: "Does routing reduce response quality?",
    answer:
      "For the queries routed to cheaper models, quality is equivalent to what the expensive model would have produced on those same simple tasks. Research shows that modern cheap models (GPT-4o mini, Gemini Flash, Claude Haiku) match or outperform older large models on straightforward tasks. Quality only degrades if complex queries are misclassified and incorrectly routed to cheaper models — which is why a reliable classifier is the core component of any routing system.",
  },
  {
    question: "How do I implement LLM routing in my application?",
    answer:
      "There are several approaches: (1) Use an open-source router library like RouteLLM or Martian to add a classification layer before each LLM call; (2) Use a commercial router like OpenRouter which supports automatic model routing by quality/cost; (3) Build a simple binary classifier that scores query complexity (word count, presence of reasoning keywords, required response length) and routes based on a threshold. Most teams start with approach 3 as a quick win before adopting a dedicated router.",
  },
];

const howToSteps = [
  {
    name: "Enter your average daily LLM calls",
    text: "Input the number of API calls your application makes per day. Include all production calls — chatbot queries, background processing, summarisation jobs, and any other LLM usage.",
  },
  {
    name: "Enter average tokens per call",
    text: "Input the combined input + output token count for an average call. Find this in your model provider's usage dashboard or logs. If you only have input tokens, multiply by 1.5–2× to estimate total tokens.",
  },
  {
    name: "Select your current model",
    text: "Choose the model you currently route everything to. The calculator will automatically pair it with the most appropriate cheaper model for the 60% of easy queries.",
  },
  {
    name: "Review your savings estimate",
    text: "The calculator shows your current monthly cost (all queries to the expensive model) vs blended monthly cost (60% to cheap, 40% to expensive), plus monthly savings and percentage reduction.",
  },
  {
    name: "Implement routing and reduce your bill",
    text: "Use the savings estimate to build the business case for implementing a router. Even a simple complexity classifier can capture 70–80% of the theoretical savings within a few days of engineering effort.",
  },
];

export default function ModelRouterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="AI Model Router Savings Calculator"
        description="Free AI model router savings calculator. See how routing easy queries to cheaper LLMs saves up to 60% on monthly API costs."
        url="https://calcfuel.com/calculators/ai-model-router-savings-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "AI Model Router Savings Calculator", url: "https://calcfuel.com/calculators/ai-model-router-savings-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>AI Model Router Savings Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        AI Agent Model Router Savings Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        See exactly how much you could save by routing easy LLM queries to cheaper models — instead of sending everything to GPT-4o or Claude Sonnet. Enter your usage and get an instant monthly savings estimate.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <ModelRouterCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <EmailCapture />
      <MarketingAICTA />
      <article className="prose max-w-none mt-4">
        <h2>What Is an AI Model Router?</h2>
        <p>
          An AI model router is a layer that sits in front of your LLM API calls and decides, for each query, which model is the best fit — balancing cost, speed, and quality. Instead of routing 100% of your traffic to the most capable (and most expensive) model, a router classifies the complexity of each request and sends simple queries to a cheaper, faster model while reserving the expensive model for the tasks that actually need it.
        </p>
        <p>
          The fundamental insight behind routing is that most real-world AI applications have a highly uneven query distribution. A customer service chatbot might receive 70% simple factual questions and only 30% complex queries requiring reasoning. An AI writing assistant might generate 65% of its outputs with straightforward summarisation and 35% with nuanced creative generation. Routing exploits this distribution to cut costs without any visible quality change for end users.
        </p>

        <h2>Why Developers Overspend on LLMs</h2>
        <p>
          The default path for most development teams is to choose a single capable model — GPT-4o, Claude Sonnet, or Gemini Pro — and route everything to it. This is fast to implement and guarantees quality, but it is extremely expensive at scale. At 10,000 daily calls with 2,000 tokens each, sending everything to GPT-4o costs approximately $1,800/month. The same workload with a 60/40 router costs closer to $700/month — a saving of over $1,100 every month.
        </p>
        <p>
          The core problem is that teams optimise for quality during development (when volumes are low and costs are negligible) and never revisit model selection when they scale. By the time the bill is noticeable, the routing architecture requires a refactor that no one has time for. The result is paying Tier 1 prices for Tier 3 queries indefinitely.
        </p>

        <h2>How LLM Pricing Works</h2>
        <p>
          Every major LLM provider charges per token — the basic unit of text (approximately 0.75 words). Pricing is split between input tokens (the prompt, context, and conversation history you send) and output tokens (the response the model generates). Output tokens are consistently more expensive than input tokens, often by 3–5×, because generation requires more compute than processing.
        </p>
        <p>
          This calculator estimates costs by assuming 30% input tokens and 70% output tokens — a common distribution for conversational and agentic applications. If your application is primarily document processing (more input) or short-form generation (more output), your actual costs may differ. Check your provider's usage dashboard for your exact input/output split.
        </p>

        <h2>Model Pricing Reference (May 2025)</h2>
        <p>Prices shown as USD per 1 million tokens.</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Input ($/1M)</th>
                <th>Output ($/1M)</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GPT-4o</td>
                <td>$2.50</td>
                <td>$10.00</td>
                <td>Complex reasoning, code, nuanced generation</td>
              </tr>
              <tr>
                <td>GPT-4o mini</td>
                <td>$0.15</td>
                <td>$0.60</td>
                <td>Classification, Q&amp;A, short summaries, extraction</td>
              </tr>
              <tr>
                <td>Claude Opus 4.5</td>
                <td>$15.00</td>
                <td>$75.00</td>
                <td>Highest-complexity reasoning, agentic tasks</td>
              </tr>
              <tr>
                <td>Claude Sonnet 4.5</td>
                <td>$3.00</td>
                <td>$15.00</td>
                <td>Balanced quality + cost, coding, analysis</td>
              </tr>
              <tr>
                <td>Claude Haiku 3.5</td>
                <td>$0.80</td>
                <td>$4.00</td>
                <td>Fast, cheap, strong on structured tasks</td>
              </tr>
              <tr>
                <td>Gemini 1.5 Pro</td>
                <td>$1.25</td>
                <td>$5.00</td>
                <td>Long context, multimodal, document tasks</td>
              </tr>
              <tr>
                <td>Gemini 1.5 Flash</td>
                <td>$0.075</td>
                <td>$0.30</td>
                <td>Fastest, cheapest, best cost-to-performance ratio</td>
              </tr>
              <tr>
                <td>Llama 3.1 70B (Groq)</td>
                <td>$0.59</td>
                <td>$0.79</td>
                <td>Low latency, open-source, no output premium</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">Note: Prices subject to change. Verify with each provider before budgeting.</p>

        <h2>Building a Simple LLM Router in Practice</h2>
        <p>
          The simplest router is a rule-based classifier that runs before each LLM call. It examines the query and assigns it to a "simple" or "complex" bucket based on heuristics:
        </p>
        <ul>
          <li><strong>Word count:</strong> Queries under 50 words are often simple; over 200 words suggest complex context.</li>
          <li><strong>Reasoning keywords:</strong> Words like "explain", "compare", "analyse", "why", "design", and "debug" signal complex queries.</li>
          <li><strong>Expected output length:</strong> If the user asks for a one-sentence answer, any capable model will do. If they need a 1,000-word analysis, you want the best model.</li>
          <li><strong>Query type:</strong> Classification, extraction, and translation tasks are almost always simple. Summarisation of long documents, code review, and creative writing are complex.</li>
        </ul>
        <p>
          More sophisticated routers use a tiny classifier model (itself very cheap) to score complexity, or fine-tune a small model specifically on your query distribution to maximise routing accuracy. Companies like Martian offer drop-in API routing that handles classification automatically.
        </p>

        <h2>Expected Savings by Query Volume</h2>
        <p>
          Routing savings scale linearly with volume. Here are example estimates using GPT-4o (current model) routed to GPT-4o mini (60% of queries), at 2,000 tokens per call:
        </p>
        <ul>
          <li><strong>1,000 calls/day:</strong> ~$180/month → ~$70/month after routing. Saves $110/month.</li>
          <li><strong>5,000 calls/day:</strong> ~$900/month → ~$350/month after routing. Saves $550/month.</li>
          <li><strong>10,000 calls/day:</strong> ~$1,800/month → ~$700/month after routing. Saves $1,100/month.</li>
          <li><strong>50,000 calls/day:</strong> ~$9,000/month → ~$3,500/month after routing. Saves $5,500/month.</li>
        </ul>
        <p>
          Even at 1,000 daily calls, the annual saving from a router exceeds $1,300 — often worth more than the engineering time to implement one. At 10,000 calls per day, the saving funds a full-time developer.
        </p>

        <h2>When NOT to Use a Router</h2>
        <p>
          Routing adds latency and complexity. It is not worth implementing if: (1) your total monthly LLM bill is under $100 and unlikely to grow; (2) your query mix is already dominated by complex tasks (less than 20% simple queries reduces the saving significantly); (3) your application is latency-critical and the extra classification step would degrade user experience; or (4) you have strict compliance requirements that limit which models can process data and all approved models are similarly priced.
        </p>
        <p>
          For most growing AI applications processing more than 2,000 queries per day, however, routing is one of the highest-ROI optimisations available — faster to implement than most feature work and immediately impactful on unit economics.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
