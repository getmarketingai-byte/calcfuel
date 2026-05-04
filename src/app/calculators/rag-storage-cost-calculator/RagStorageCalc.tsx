"use client";
import { useState } from "react";
import { trackCalculation } from "@/lib/analytics";

type InputMode = "pdfs" | "gb";

const EMBEDDING_MODELS = [
  { label: "OpenAI text-embedding-3-small", value: "te3s", pricePerM: 0.020, dim: 1536, note: "$0.020/1M tokens" },
  { label: "OpenAI text-embedding-3-large", value: "te3l", pricePerM: 0.130, dim: 3072, note: "$0.130/1M tokens" },
  { label: "Cohere embed-v3 (English)", value: "cohere", pricePerM: 0.100, dim: 1024, note: "$0.100/1M tokens" },
  { label: "Voyage AI voyage-3", value: "voyage3", pricePerM: 0.060, dim: 1024, note: "$0.060/1M tokens" },
];

const VECTOR_DBS = [
  { label: "Pinecone (Serverless)", value: "pinecone", storageModel: "$/GB-month", freeTier: "Free tier: 2 GB" },
  { label: "Weaviate Cloud", value: "weaviate", storageModel: "$/1M vector-dims/month", freeTier: "Sandbox: free (limited)" },
  { label: "Qdrant Cloud", value: "qdrant", storageModel: "$/GB-month", freeTier: "Free tier: 1 GB RAM" },
  { label: "Supabase pgvector", value: "supabase", storageModel: "$25 base + $/GB", freeTier: "Free tier: 500 MB" },
];

const LLM_MODELS = [
  { label: "GPT-4o", value: "gpt4o", inputPer1M: 2.50, outputPer1M: 10.00 },
  { label: "GPT-4o mini", value: "gpt4omini", inputPer1M: 0.15, outputPer1M: 0.60 },
  { label: "Claude Sonnet 4.5", value: "claude-sonnet", inputPer1M: 3.00, outputPer1M: 15.00 },
  { label: "Claude Haiku 3.5", value: "claude-haiku", inputPer1M: 0.80, outputPer1M: 4.00 },
  { label: "Gemini 1.5 Pro", value: "gemini-pro", inputPer1M: 1.25, outputPer1M: 5.00 },
  { label: "Gemini 1.5 Flash", value: "gemini-flash", inputPer1M: 0.075, outputPer1M: 0.30 },
];

// Chunking constants
const CHUNK_SIZE = 512; // tokens per chunk
const CHUNK_STRIDE = 256; // stride (50% overlap)
const K_RESULTS = 5; // retrieved chunks per query
const OUTPUT_TOKENS = 400; // generated tokens per LLM response
const QUERY_TOKENS = 50; // user query tokens

function calcVectorDbMonthlyCost(
  dbValue: string,
  storageGb: number,
  numChunks: number,
  dim: number
): { storage: number; baseCost: number } {
  switch (dbValue) {
    case "pinecone":
      return { storage: storageGb * 0.033, baseCost: 0 };
    case "weaviate":
      return { storage: (numChunks * dim / 1_000_000) * 0.05, baseCost: 0 };
    case "qdrant":
      return { storage: storageGb * 0.040, baseCost: 0 };
    case "supabase":
      return { storage: storageGb * 0.125, baseCost: 25 };
    default:
      return { storage: 0, baseCost: 0 };
  }
}

function calcRetrievalCostPerQuery(dbValue: string): number {
  switch (dbValue) {
    case "pinecone": return 0.0001;
    case "weaviate": return 0.000005;
    case "qdrant": return 0.000005;
    case "supabase": return 0.000001;
    default: return 0;
  }
}

function fmtUSD(n: number): string {
  if (n >= 10000) return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1) return "$" + n.toFixed(2);
  if (n >= 0.0001) return "$" + n.toFixed(4);
  return "<$0.0001";
}

function fmtNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

interface CalcResult {
  totalTokens: number;
  numChunks: number;
  storageGb: number;
  embeddingCost: number;
  dbStorageCostMonthly: number;
  dbBaseCostMonthly: number;
  retrievalCostMonthly: number;
  llmCostPerQuery: number;
  llmCostMonthly: number;
  totalMonthly: number;
  dim: number;
}

export default function RagStorageCalc() {
  const [inputMode, setInputMode] = useState<InputMode>("pdfs");
  const [numPdfs, setNumPdfs] = useState("100");
  const [avgPages, setAvgPages] = useState("20");
  const [gbText, setGbText] = useState("1");
  const [embModel, setEmbModel] = useState("te3s");
  const [vectorDb, setVectorDb] = useState("pinecone");
  const [dailyQueries, setDailyQueries] = useState("500");
  const [llmModel, setLlmModel] = useState("gpt4omini");
  const [result, setResult] = useState<CalcResult | null>(null);

  function calculate() {
    const model = EMBEDDING_MODELS.find(m => m.value === embModel)!;
    const llm = LLM_MODELS.find(m => m.value === llmModel)!;

    // Total tokens to embed
    let totalTokens: number;
    if (inputMode === "pdfs") {
      const pdfs = parseFloat(numPdfs) || 0;
      const pages = parseFloat(avgPages) || 1;
      // ~400 tokens per page (conservative for business docs)
      totalTokens = pdfs * pages * 400;
    } else {
      const gb = parseFloat(gbText) || 0;
      // 1 GB plain text ≈ 200M tokens (1B chars / ~5 chars per token)
      totalTokens = gb * 200_000_000;
    }

    // Number of chunks (512-token chunks, 256-token stride = 50% overlap)
    const numChunks = Math.max(1, Math.ceil(totalTokens / CHUNK_STRIDE));

    // Vector storage size
    // float32 (4 bytes) per dimension, plus ~50% metadata overhead
    const storageBytes = numChunks * model.dim * 4 * 1.5;
    const storageGb = storageBytes / (1024 ** 3);

    // Embedding cost (one-time)
    const embeddingCost = (totalTokens / 1_000_000) * model.pricePerM;

    // Vector DB monthly storage cost
    const { storage: dbStorageCost, baseCost: dbBaseCost } = calcVectorDbMonthlyCost(
      vectorDb, storageGb, numChunks, model.dim
    );

    // Query costs per month
    const queries = parseFloat(dailyQueries) || 0;
    const monthlyQueries = queries * 30;
    const retrievalCostPerQuery = calcRetrievalCostPerQuery(vectorDb);
    const retrievalCostMonthly = monthlyQueries * retrievalCostPerQuery;

    // LLM generation cost per query
    // Context: k retrieved chunks × chunk_size + user query tokens
    const inputTokensPerQuery = K_RESULTS * CHUNK_SIZE + QUERY_TOKENS;
    const llmCostPerQuery =
      (inputTokensPerQuery * llm.inputPer1M + OUTPUT_TOKENS * llm.outputPer1M) / 1_000_000;
    const llmCostMonthly = monthlyQueries * llmCostPerQuery;

    const totalMonthly = dbStorageCost + dbBaseCost + retrievalCostMonthly + llmCostMonthly;

    const res: CalcResult = {
      totalTokens,
      numChunks,
      storageGb,
      embeddingCost,
      dbStorageCostMonthly: dbStorageCost,
      dbBaseCostMonthly: dbBaseCost,
      retrievalCostMonthly,
      llmCostPerQuery,
      llmCostMonthly,
      totalMonthly,
      dim: model.dim,
    };

    setResult(res);
    trackCalculation("rag-storage-cost-calculator", {
      inputMode,
      embModel,
      vectorDb,
      dailyQueries,
      llmModel,
    });
  }

  const selectedDb = VECTOR_DBS.find(d => d.value === vectorDb)!;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">RAG Storage Cost Calculator</h2>

      <div className="space-y-5">
        {/* Input mode toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data Input Method
          </label>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setInputMode("pdfs")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                inputMode === "pdfs"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              Number of PDFs
            </button>
            <button
              onClick={() => setInputMode("gb")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                inputMode === "gb"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              GB of Text Data
            </button>
          </div>
        </div>

        {/* PDF inputs */}
        {inputMode === "pdfs" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of PDFs
              </label>
              <input
                type="number"
                min="1"
                value={numPdfs}
                onChange={e => setNumPdfs(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Avg. Pages per PDF
              </label>
              <input
                type="number"
                min="1"
                value={avgPages}
                onChange={e => setAvgPages(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 20"
              />
            </div>
          </div>
        )}

        {/* GB input */}
        {inputMode === "gb" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Text Data (GB)
            </label>
            <input
              type="number"
              min="0.001"
              step="0.1"
              value={gbText}
              onChange={e => setGbText(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. 1.5"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 GB plain text ≈ 200M tokens</p>
          </div>
        )}

        {/* Embedding model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Embedding Model
          </label>
          <select
            value={embModel}
            onChange={e => setEmbModel(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {EMBEDDING_MODELS.map(m => (
              <option key={m.value} value={m.value}>
                {m.label} — {m.note}, {m.dim.toLocaleString()} dims
              </option>
            ))}
          </select>
        </div>

        {/* Vector DB */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vector Database
          </label>
          <select
            value={vectorDb}
            onChange={e => setVectorDb(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {VECTOR_DBS.map(db => (
              <option key={db.value} value={db.value}>
                {db.label} — {db.freeTier}
              </option>
            ))}
          </select>
        </div>

        {/* Daily queries */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Daily Queries (RAG retrievals)
          </label>
          <input
            type="number"
            min="0"
            value={dailyQueries}
            onChange={e => setDailyQueries(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. 500"
          />
        </div>

        {/* LLM model for generation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            LLM for Generation (per query)
          </label>
          <select
            value={llmModel}
            onChange={e => setLlmModel(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {LLM_MODELS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Assumes k=5 retrieved chunks × 512 tokens + 50 query tokens input, ~400 tokens output
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Calculate RAG Costs →
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Dataset summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Dataset Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmtNum(result.totalTokens)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total tokens</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmtNum(result.numChunks)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Vectors / chunks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.storageGb < 0.01
                    ? (result.storageGb * 1024).toFixed(0) + " MB"
                    : result.storageGb.toFixed(2) + " GB"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Vector storage</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
              512-token chunks · 50% overlap · {result.dim.toLocaleString()}-dim float32 vectors · 1.5× metadata overhead
            </p>
          </div>

          {/* One-time cost */}
          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wide">
                  One-Time Cost
                </p>
                <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100 mt-1">
                  {fmtUSD(result.embeddingCost)}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Embedding generation</p>
              </div>
              <div className="text-right text-xs text-blue-600 dark:text-blue-400">
                <p>{fmtNum(result.totalTokens)} tokens</p>
                <p>× {EMBEDDING_MODELS.find(m => m.value === embModel)!.note}</p>
              </div>
            </div>
          </div>

          {/* Monthly costs breakdown */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Monthly Cost Breakdown
              </p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {result.dbBaseCostMonthly > 0 && (
                <div className="flex justify-between items-center px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{selectedDb.label} — Base plan</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Platform minimum</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmtUSD(result.dbBaseCostMonthly)}/mo</p>
                </div>
              )}
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{selectedDb.label} — Storage</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedDb.storageModel}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmtUSD(result.dbStorageCostMonthly)}/mo</p>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Vector retrieval</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fmtNum(parseFloat(dailyQueries) * 30)} queries/month × {fmtUSD(calcRetrievalCostPerQuery(vectorDb))}/query
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmtUSD(result.retrievalCostMonthly)}/mo</p>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    LLM generation ({LLM_MODELS.find(m => m.value === llmModel)!.label})
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fmtNum(parseFloat(dailyQueries) * 30)} queries × {fmtUSD(result.llmCostPerQuery)}/query
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{fmtUSD(result.llmCostMonthly)}/mo</p>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-orange-50 dark:bg-orange-950">
                <p className="text-sm font-bold text-orange-900 dark:text-orange-100">Total monthly cost</p>
                <p className="text-xl font-extrabold text-orange-600 dark:text-orange-400">{fmtUSD(result.totalMonthly)}/mo</p>
              </div>
            </div>
          </div>

          {/* Per-query cost */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Retrieval cost per query</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {fmtUSD(calcRetrievalCostPerQuery(vectorDb))}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Generation cost per query</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {fmtUSD(result.llmCostPerQuery)}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            All figures are estimates based on published provider pricing (May 2025). Actual costs vary with usage patterns, data types, and provider plan changes.
          </p>
        </div>
      )}
    </div>
  );
}
