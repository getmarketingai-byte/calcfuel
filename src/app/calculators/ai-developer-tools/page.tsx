import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";

export const metadata: Metadata = {
  title: "AI Developer Tools & Calculators",
  description:
    "Free AI developer calculators: model router savings, prompt caching discounts, RAG storage costs, and multimodal payload estimates. Optimise your LLM spend instantly.",
};

const tools = [
  {
    title: "AI Model Router Savings Calculator",
    slug: "ai-model-router-savings-calculator",
    description: "See how much you save routing easy queries to cheaper models like GPT-4o mini, Claude Haiku, or Gemini Flash.",
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
  {
    title: "RAG Storage Cost Calculator",
    slug: "rag-storage-cost-calculator",
    description: "Estimate vector storage and retrieval costs for your RAG pipeline.",
  },
];

export default function AIDeveloperToolsHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>AI Developer Tools</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AI Developer Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Optimise your LLM spend with these free AI developer calculators — model routing savings, prompt caching, storage costs, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}`}
            className="block p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 hover:shadow-lg hover:border-orange-400 transition-all group"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />

      <article className="prose max-w-none">
        <h2>Why AI Cost Optimisation Matters</h2>
        <p>
          As AI-powered applications scale, LLM API costs can quickly become the largest variable expense in your infrastructure budget. A single GPT-4o call costs roughly 15–25× more than the equivalent GPT-4o mini call. For high-volume applications handling thousands of requests per day, the difference between a naive "always use the best model" approach and an intelligent routing strategy can be the difference between profitability and unsustainable burn.
        </p>
        <p>
          These calculators help developers, founders, and engineering teams make data-driven decisions about model selection, prompt caching, and storage architecture — before committing to expensive API contracts or infrastructure investments.
        </p>

        <h2>Model Routing: The Biggest Lever</h2>
        <p>
          LLM routing — directing simple queries to cheaper models and complex queries to capable ones — consistently delivers 40–70% cost reduction in production systems. The key insight: most real-world query distributions have a "long tail" of simple requests (factual lookups, short summaries, classification) that do not require frontier model capabilities. Routing these to GPT-4o mini, Claude Haiku, or Gemini Flash dramatically reduces per-request costs without user-visible quality degradation.
        </p>

        <h2>Prompt Caching: Immediate Savings</h2>
        <p>
          Anthropic, OpenAI, and Google all offer prompt caching — reusing the KV cache from a previous request when the prompt prefix is identical. For applications with long system prompts or repeated context (RAG chunks, tool definitions, conversation history), caching reduces input token costs by 50–90%. The savings compound quickly at scale.
        </p>
      </article>

      <ProductCTASection variant="ai_dev" />
    </div>
  );
}
