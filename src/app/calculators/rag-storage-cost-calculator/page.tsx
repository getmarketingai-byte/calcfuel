import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import RelatedTools from "@/components/RelatedTools";
import RagStorageCalc from "./RagStorageCalc";

export const metadata: Metadata = {
  title: "RAG Storage Cost Calculator — Vector DB & Embedding Costs | CalcFuel",
  description:
    "Free RAG storage cost calculator. Estimate one-time embedding generation costs and monthly vector database hosting fees for Pinecone, Weaviate, Qdrant, and Supabase pgvector. Supports OpenAI, Cohere, and Voyage AI embeddings.",
  alternates: { canonical: "/calculators/rag-storage-cost-calculator" },
};

const relatedTools = [
  { title: "AI Model Router Savings Calculator", slug: "ai-model-router-savings-calculator", description: "See how much you save routing easy queries to cheaper LLM models." },
  { title: "Prompt Caching Discount Estimator", slug: "prompt-caching-discount-estimator", description: "Calculate savings from caching system prompts with Claude, GPT-4o, or Gemini." },
  { title: "Multimodal Payload Estimator", slug: "multimodal-payload-estimator", description: "Estimate token costs for sending images, video, or audio to vision models." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your marketing investment." },
  { title: "Website Speed Impact Calculator", slug: "website-speed-impact-calculator", description: "See how page speed affects conversions and revenue." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from paid ads." },
];

const faqs = [
  {
    question: "What is RAG and why does it have storage costs?",
    answer:
      "Retrieval-Augmented Generation (RAG) is a technique where you store your documents in a vector database, then retrieve the most relevant chunks at query time to provide as context to an LLM. Storage costs arise because you must: (1) convert every document chunk into a dense vector (an array of floating-point numbers called an embedding) using an embedding model API, and (2) host all those vectors in a vector database so they can be searched in milliseconds. The embedding step is a one-time cost per document set; the hosting is an ongoing monthly cost.",
  },
  {
    question: "What is a vector embedding and how big is it?",
    answer:
      "A vector embedding is a fixed-length array of floating-point numbers that represents the semantic meaning of a text chunk. OpenAI's text-embedding-3-small produces 1,536-dimensional vectors; text-embedding-3-large produces 3,072 dimensions. Each dimension is stored as a 32-bit float (4 bytes), so a single 1,536-dim embedding takes 6,144 bytes (about 6 KB). For 100,000 document chunks, that's roughly 600 MB of raw vector data before metadata overhead — which is why vector database storage costs can add up for large document sets.",
  },
  {
    question: "What is chunking and how does it affect costs?",
    answer:
      "Chunking is the process of splitting long documents into smaller, overlapping segments before embedding them. A typical configuration uses 512-token chunks with a 256-token stride (50% overlap). The overlap ensures that context spanning two adjacent chunks is captured in at least one vector. More chunks = more embedding API calls (higher one-time cost) and more vectors to store (higher ongoing hosting cost). This calculator uses 512-token chunks with 256-token stride as defaults — standard practice for most RAG use cases.",
  },
  {
    question: "Which embedding model should I choose?",
    answer:
      "For most use cases, OpenAI text-embedding-3-small is the best starting point: it's inexpensive ($0.020/M tokens), widely supported, and performs well on English enterprise content. text-embedding-3-large produces higher-quality embeddings (especially for nuanced semantic matching) at 6.5× the cost and twice the storage. Cohere embed-v3 and Voyage AI voyage-3 are strong alternatives — particularly Voyage, which often outperforms OpenAI models on domain-specific retrieval benchmarks at a competitive price. If you're building a production system handling specialised content (legal, medical, technical), benchmark all four on a sample of your actual queries.",
  },
  {
    question: "What is the difference between Pinecone, Weaviate, Qdrant, and Supabase pgvector?",
    answer:
      "Pinecone is a managed, fully-serverless vector database with minimal setup — ideal for teams who want zero infrastructure management. Weaviate is an open-source vector DB with a managed cloud offering; it supports multi-modal search and hybrid (vector + keyword) search natively. Qdrant is a high-performance open-source vector DB written in Rust, available both self-hosted and as a managed cloud service; it excels at large-scale deployments requiring low latency. Supabase pgvector uses PostgreSQL's pgvector extension — ideal if you already use Supabase and want to avoid a separate service; performance is lower than dedicated vector DBs at very large scale but adequate for most use cases under 5M vectors.",
  },
  {
    question: "What does 'cost per query' include?",
    answer:
      "Each RAG query involves two steps: (1) vector retrieval — searching the database for the k most similar chunks (k=5 by default); and (2) LLM generation — passing the retrieved context plus the user's question to an LLM to generate an answer. The retrieval cost is charged by the vector DB provider (typically very small for Weaviate, Qdrant, and Supabase; slightly higher for Pinecone serverless). The generation cost is charged by the LLM provider based on the total input tokens (retrieved chunks + query) and output tokens (the generated answer). This calculator estimates both and shows the combined per-query cost.",
  },
  {
    question: "How accurate are these estimates?",
    answer:
      "The estimates are designed for ballpark planning and provider comparison, not exact billing. Key assumptions include: 400 tokens per PDF page (reasonable for business documents; dense technical PDFs may be higher), 200M tokens per GB of plain text, 512-token chunks with 50% overlap, and k=5 retrieved chunks per query. Actual costs will vary based on your document types, chunk size settings, query complexity, and provider plan tier. Always check the latest pricing on each provider's website before making procurement decisions.",
  },
  {
    question: "How do I reduce RAG storage costs?",
    answer:
      "The four main levers are: (1) Use a smaller embedding model — switching from text-embedding-3-large to text-embedding-3-small cuts both embedding cost (6.5×) and storage (50%). (2) Reduce chunk overlap — cutting overlap from 50% to 25% reduces chunk count by roughly 33%, with modest impact on retrieval quality. (3) Use Supabase pgvector if you already pay for a Supabase Pro plan — pgvector storage is included in your database allocation. (4) Use a cheaper LLM for generation — GPT-4o mini costs 94% less than GPT-4o per query with comparable quality for most Q&A tasks.",
  },
  {
    question: "Does the free tier cover my use case?",
    answer:
      "Pinecone's free tier includes 2 GB of serverless storage and is suitable for prototypes under ~300K document chunks (1,536-dim). Weaviate's sandbox is free but resource-limited; suitable for development only. Qdrant's free cloud tier provides 1 GB of RAM — approximately 100K–200K vectors depending on dimensions. Supabase's free tier includes 500 MB of database storage shared across all tables, including pgvector. For most production RAG deployments processing thousands of business documents, you will need a paid tier. This calculator helps you estimate whether the cost is justified by the query volume.",
  },
];

const howToSteps = [
  {
    name: "Choose your data input method",
    text: "Select 'Number of PDFs' if you know your document count, or 'GB of Text Data' if you have a raw data size. PDFs use an estimate of 400 tokens per page; GB mode uses 200M tokens per gigabyte of plain text.",
  },
  {
    name: "Select your embedding model",
    text: "Pick the model you plan to use to generate embeddings. OpenAI text-embedding-3-small is the most cost-effective general-purpose option. text-embedding-3-large produces higher-quality vectors for demanding retrieval tasks. Cohere and Voyage are competitive alternatives.",
  },
  {
    name: "Select your vector database",
    text: "Choose the vector DB provider you plan to use. Each has different storage pricing models — Pinecone charges per GB, Weaviate per million vector-dimensions, Qdrant per GB, and Supabase charges a $25 base plus per-GB storage.",
  },
  {
    name: "Enter your daily query volume",
    text: "Enter how many RAG queries your application will make per day. This drives the monthly retrieval and LLM generation cost estimates.",
  },
  {
    name: "Choose your LLM for generation",
    text: "Select the language model that will generate answers using the retrieved context. GPT-4o mini is the most cost-effective option for standard Q&A. GPT-4o or Claude Sonnet are better for complex reasoning over retrieved content.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RAG Storage Cost Calculator",
  description:
    "Free calculator that estimates the one-time embedding generation cost and monthly vector database hosting cost for RAG (Retrieval-Augmented Generation) workflows. Supports Pinecone, Weaviate, Qdrant, and Supabase pgvector.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://calcfuel.com/calculators/rag-storage-cost-calculator",
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
  name: "How to estimate your RAG storage and query costs",
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
  headline: "RAG Storage Cost Calculator — Vector DB & Embedding Costs",
  description: "Free RAG storage cost calculator. Estimate one-time embedding generation costs and monthly vector database hosting fees for Pinecone, Weaviate, Qdrant, and Supabase pgvector.",
  url: "https://calcfuel.com/calculators/rag-storage-cost-calculator",
  author: { "@type": "Organization", name: "CalcFuel", url: "https://calcfuel.com" },
  publisher: { "@type": "Organization", name: "CalcFuel", url: "https://calcfuel.com" },
  datePublished: "2025-10-01",
  dateModified: "2026-05-15",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://calcfuel.com/calculators/rag-storage-cost-calculator" },
};

export default function RagStorageCostPage() {
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
          <span className="text-gray-700 dark:text-gray-200">RAG Storage Cost Calculator</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          RAG Storage Cost Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Estimate the one-time embedding generation cost and monthly vector database hosting cost for your RAG (Retrieval-Augmented Generation) pipeline. Compare Pinecone, Weaviate, Qdrant, and Supabase pgvector side by side.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Embedding models: <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a>, <a href="https://cohere.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">Cohere</a>, Voyage AI · Vector DBs: <a href="https://www.pinecone.io/pricing/" target="_blank" rel="noopener noreferrer" className="underline">Pinecone</a> · <a href="https://weaviate.io/pricing" target="_blank" rel="noopener noreferrer" className="underline">Weaviate</a> · <a href="https://qdrant.tech/pricing/" target="_blank" rel="noopener noreferrer" className="underline">Qdrant</a> · <a href="https://supabase.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">Supabase</a>. Prices from official provider pages, May 2025.
        </p>
        <CalcReviewedBy />

        <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

        {/* Calculator */}
        <div className="my-8">
          <RagStorageCalc />
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
          <h2>Understanding RAG Infrastructure Costs</h2>
          <p>
            RAG pipelines have a two-phase cost structure that catches many teams off guard. The <strong>setup phase</strong> — converting documents into embeddings — is a one-time cost that scales with your data volume. The <strong>operational phase</strong> — hosting vectors and answering queries — is a recurring monthly cost that scales with both data size and query volume.
          </p>
          <p>
            Most developers focus only on the LLM API cost (which is visible in their billing dashboard) and underestimate the vector storage and embedding costs. For a mid-size enterprise knowledge base of 50,000 documents averaging 20 pages each, the one-time embedding cost can easily reach $500–$2,000 depending on the model chosen — and the monthly storage cost adds another $50–$200 per month before any queries are made.
          </p>

          <h3>Phase 1: Embedding Generation (One-Time)</h3>
          <p>
            Before you can search your documents, you must convert every chunk into a vector embedding using an embedding model API. The cost is: <em>total tokens × price per million tokens</em>. A 400-page business document contains roughly 160,000 tokens when chunked at 512 tokens with 50% overlap, producing about 625 vectors. At $0.020/M tokens (text-embedding-3-small), that single document costs about $0.003 to embed — cheap in isolation, but a 10,000-document corpus at the same density costs $30 to embed.
          </p>
          <p>
            Once embedded, you typically don't re-embed unless the document content changes. This makes embedding a capital expenditure rather than an operating cost. The key decision is choosing between a cheap model (lower upfront cost, fewer storage bytes, slightly lower retrieval quality) and a premium model (higher upfront cost, more storage, better semantic matching).
          </p>

          <h3>Phase 2: Vector Database Hosting (Monthly)</h3>
          <p>
            Every embedding must be stored in a vector database so it can be retrieved at query time using approximate nearest neighbour (ANN) search. Storage costs depend on vector count, embedding dimensions, and the provider's pricing model:
          </p>
          <ul>
            <li><strong>Pinecone Serverless:</strong> charges $0.033/GB-month for stored vectors and a small per-query fee for ANN searches. Simple to use, no cluster management required.</li>
            <li><strong>Weaviate Cloud:</strong> charges per million vector-dimensions per month ($0.05/1M), making it more cost-effective for lower-dimensional embeddings like Cohere or Voyage (1,024 dims vs. OpenAI's 1,536–3,072 dims).</li>
            <li><strong>Qdrant Cloud:</strong> charges ~$0.040/GB-month for stored vectors, with a generous free tier (1 GB RAM). Strong performance for large datasets due to its Rust-based implementation.</li>
            <li><strong>Supabase pgvector:</strong> storage is billed as standard PostgreSQL storage ($0.125/GB-month) plus a $25/month Pro plan base. The most economical choice if you already use Supabase — the marginal cost of adding pgvector is just the storage increment.</li>
          </ul>

          <h3>Phase 3: Query Costs (Per Request)</h3>
          <p>
            Every user query triggers two billable events: a vector retrieval (small fee to the vector DB) and an LLM generation call (larger fee to the language model). The retrieval cost is typically negligible — Pinecone serverless charges roughly $0.0001 per query; Weaviate and Qdrant even less. The dominant cost is almost always the LLM generation step.
          </p>
          <p>
            With k=5 retrieved chunks at 512 tokens each, plus a 50-token user query, each generation call requires about 2,610 input tokens. At GPT-4o pricing ($2.50/M input, $10.00/M output), a 400-token response costs about $0.0105 per query — $315/month for 1,000 daily queries. Switching to GPT-4o mini ($0.15/M input, $0.60/M output) reduces that to about $0.0006 per query — $18/month. For most Q&A and document retrieval tasks, GPT-4o mini delivers comparable quality at a fraction of the cost.
          </p>

          <h3>Optimising Your RAG Budget</h3>
          <p>
            The highest-leverage cost optimisation for most RAG deployments is choosing the right LLM for generation. A 10× cheaper model (GPT-4o mini vs. GPT-4o) typically reduces monthly costs by 80–90% with minimal quality degradation for standard document Q&A. Embedding model choice has a smaller but meaningful impact: text-embedding-3-small produces 1,536-dim vectors at $0.020/M tokens; text-embedding-3-large produces 3,072-dim vectors at $0.130/M. The storage cost difference is proportional to dimensions — text-embedding-3-large uses twice the storage at 6.5× the embedding cost.
          </p>
          <p>
            For most teams starting a new RAG project, the recommended baseline is: <strong>text-embedding-3-small</strong> for embeddings, <strong>Pinecone or Supabase</strong> for vector storage (depending on existing infrastructure), and <strong>GPT-4o mini or Claude Haiku</strong> for generation. Upgrade to larger models only after benchmarking retrieval quality on your specific domain.
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
            MarketingAI builds done-with-you marketing systems for small businesses — content, email, and lead generation, configured to your offer and delivered in under a week. One-time setup, owned by you permanently.
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
