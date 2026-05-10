import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import MultimodalPayloadCalc from "./MultimodalPayloadCalc";

export const metadata: Metadata = {
  title: "Multimodal Payload Estimator — Image, Video & Audio Token Costs",
  description:
    "Free multimodal token calculator. Estimate the token count and API cost of sending images, video, or audio to GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro. Includes OpenAI tile-based formula, Anthropic pixel-division formula, and Google tile tokenisation.",
  alternates: { canonical: "/calculators/multimodal-payload-estimator" },
};

const relatedTools = [
  { title: "Prompt Caching Discount Estimator", slug: "prompt-caching-discount-estimator", description: "Calculate how much you save by caching system prompts with Claude, GPT-4o, or Gemini." },
  { title: "AI Model Router Savings Calculator", slug: "ai-model-router-savings-calculator", description: "See how much you save routing easy queries to cheaper models." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from your paid ad budget." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Calculate the return on your marketing investment." },
];

const faqs = [
  {
    question: "How does GPT-4o count image tokens?",
    answer:
      "GPT-4o uses a tile-based approach for high-detail images. The image is first scaled to fit within a 2048×2048 bounding box, then scaled so the shortest side is 768px. The resulting image is divided into 512×512 tiles, and each tile costs 170 tokens, plus a flat 85-token base fee. A 1920×1080 image in high-detail mode becomes approximately 1080×608 after scaling, yielding a 3×2 tile grid: (6 × 170) + 85 = 1,105 tokens. For low-detail mode, the cost is always 85 tokens regardless of resolution.",
  },
  {
    question: "How does Anthropic Claude count image tokens?",
    answer:
      "Claude 3.5 Sonnet uses a pixel-division formula. The image is resized so its longest edge is at most 1568 pixels (preserving aspect ratio). The token count is then calculated as the ceiling of (width × height) ÷ 750. A 1280×720 image stays at its native size (longest edge 1280 < 1568) and costs ⌈921,600 ÷ 750⌉ = 1,229 tokens. A 3840×2160 image is scaled to 1568×882 before the formula is applied, costing ⌈1,383,936 ÷ 750⌉ = 1,846 tokens.",
  },
  {
    question: "How does Gemini 1.5 Pro count image tokens?",
    answer:
      "Gemini 1.5 Pro divides images into 768×768 tiles and charges 258 tokens per tile. The tile count is ⌈width ÷ 768⌉ × ⌈height ÷ 768⌉ with a minimum of one tile. A 1280×720 image uses ⌈1280÷768⌉ × ⌈720÷768⌉ = 2 × 1 = 2 tiles = 516 tokens. A 1920×1080 image uses 3 × 2 = 6 tiles = 1,548 tokens. Unlike OpenAI and Anthropic, Gemini does not resize the image before tiling — the original dimensions determine the tile count.",
  },
  {
    question: "How does Gemini tokenise video?",
    answer:
      "Gemini 1.5 Pro samples video at 1 frame per second and encodes each frame as 258 tokens (equivalent to a 768×768 image tile). The audio track is encoded separately at 32 tokens per second. A 60-second video therefore costs (60 × 258) + (60 × 32) = 15,480 + 1,920 = 17,400 tokens. For very short clips or high-frame-rate content, note that Gemini always samples at 1 fps regardless of the original frame rate.",
  },
  {
    question: "Can GPT-4o and Claude process video files?",
    answer:
      "Neither GPT-4o nor Claude 3.5 Sonnet accepts native video file uploads via their standard vision APIs. To process video with these models, you must extract individual frames and send each frame as a separate image in the messages array. Token costs are then calculated per frame using the standard image tokenisation formulas. This makes Gemini 1.5 Pro the most practical choice for native video understanding without frame extraction preprocessing.",
  },
  {
    question: "How does Gemini tokenise audio?",
    answer:
      "Gemini 1.5 Pro tokenises audio at a flat rate of 32 tokens per second. A 5-minute (300-second) audio file costs 9,600 tokens, which at Gemini's $1.25 per million input tokens costs approximately $0.012. This makes audio understanding relatively inexpensive compared to sending equivalent information as transcribed text for long files. Claude 3.5 Sonnet does not currently support audio input; GPT-4o audio requires the separate gpt-4o-audio-preview endpoint.",
  },
  {
    question: "Do these token counts include text prompt tokens?",
    answer:
      "No. The estimator shows only the tokens consumed by the media payload itself. Your text system prompt, user message, and any tool definitions are charged separately at the model's standard input token rate. To calculate total API cost, add your text prompt token count to the media token count shown here, then multiply the combined total by the model's input price per million tokens.",
  },
  {
    question: "Which model is cheapest for image processing?",
    answer:
      "At current pricing (May 2025), Gemini 1.5 Pro is cheapest per image at $1.25/M input tokens, followed by GPT-4o at $2.50/M and Claude 3.5 Sonnet at $3.00/M. However, the number of tokens per image also varies significantly by model and resolution. For a 1280×720 HD image: GPT-4o high detail uses ~765 tokens ($0.0019), Claude uses 1,229 tokens ($0.0037), and Gemini uses 516 tokens ($0.0006). Gemini is typically both cheapest-per-token and uses fewer tokens for moderate resolutions.",
  },
];

const howToSteps = [
  {
    name: "Select your media type",
    text: "Choose Image, Video, or Audio depending on what you're sending to the model. Video and Audio are supported natively only by Gemini 1.5 Pro.",
  },
  {
    name: "Set the resolution or duration",
    text: "For images, pick a preset resolution (Thumbnail, SD, HD, Full HD, 4K) or enter custom dimensions. For video or audio, enter the duration in seconds.",
  },
  {
    name: "Set the item count",
    text: "Enter how many images, videos, or audio files you're sending in a single batch. Costs scale linearly per item.",
  },
  {
    name: "Review the comparison table",
    text: "The estimator shows tokens per item, total tokens, cost per item, and total cost for GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro side by side.",
  },
];


export default function MultimodalPayloadPage() {
  return (
    <>
      <CalculatorJsonLd
        name="Multimodal Payload Estimator"
        description="Estimate the token count and cost of sending images, video, or audio to GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro."
        url="https://calcfuel.com/calculators/multimodal-payload-estimator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "AI Tools", url: "https://calcfuel.com/calculators/ai-model-router-savings-calculator" },
          { name: "Multimodal Payload Estimator", url: "https://calcfuel.com/calculators/multimodal-payload-estimator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          {" / "}
          <Link href="/calculators/ai-model-router-savings-calculator" className="hover:text-orange-500">AI Tools</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-200">Multimodal Payload Estimator</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Multimodal Payload Estimator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Estimate the token count and API cost of sending images, video, or audio to GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Pro. Each provider tokenises media differently — see the exact breakdown side by side.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          OpenAI uses <strong>tile-based counting</strong> · Anthropic uses a <strong>pixel-division formula</strong> · Google uses <strong>768×768 tiles at 258 tokens each</strong>. Prices from official provider pages, May 2025.
        </p>

        <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

        {/* Calculator */}
        <div className="my-8">
          <MultimodalPayloadCalc />
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
          <h2>Understanding Multimodal Tokenisation</h2>
          <p>
            When you send an image, video clip, or audio file to a vision or multimodal model via API, the provider converts that media into tokens before processing. Unlike text — where 1 token ≈ 4 characters — media tokenisation depends on resolution, aspect ratio, duration, and the provider's internal encoding strategy. The same 1920×1080 image can cost anywhere from 765 to 1,548 tokens depending on which model you use.
          </p>
          <p>
            Understanding this is critical for budgeting AI applications. A product catalogue analysis pipeline processing 500 product images per day generates very different monthly bills on GPT-4o versus Gemini — often a 3–5× difference — before you even consider the output token costs.
          </p>

          <h3>GPT-4o: Tile-Based Image Tokenisation</h3>
          <p>
            OpenAI's GPT-4o uses a two-mode system. In <strong>low detail</strong> mode, every image costs a flat 85 tokens regardless of resolution — useful for applications where fine visual detail is not needed. In <strong>high detail</strong> mode, the image goes through a three-step process: first scaled to fit within a 2048×2048 bounding box, then rescaled so the shortest side is exactly 768 pixels, then divided into 512×512 tiles. Each tile costs 170 tokens, plus a fixed 85-token base. A typical 1280×720 HD image in high-detail mode produces a 1280×720 → scales to 1365×768 → 3×2 tiles = (6 × 170) + 85 = 1,105 tokens.
          </p>
          <p>
            For applications sending many moderate-resolution images where exact visual detail matters (e.g. document extraction, UI screenshot analysis), high detail is appropriate. For thumbnail-level classification tasks (e.g. "is there a person in this photo?"), low detail at 85 tokens flat is dramatically cheaper.
          </p>

          <h3>Claude 3.5 Sonnet: Pixel-Division Formula</h3>
          <p>
            Anthropic uses a simpler but equally effective approach. The image is resized so its longest dimension is at most 1568 pixels, preserving the aspect ratio. The token count is then the ceiling of (width × height) ÷ 750. This linear formula means token costs scale predictably with image area. A 1568×1568 square at maximum size costs ⌈2,457,856 ÷ 750⌉ = 3,278 tokens — but most real-world images at HD or lower are well under 2,000 tokens each.
          </p>
          <p>
            Claude's formula is transparent and easy to reason about. Unlike tile-based approaches, there's no non-linear step change when crossing tile boundaries. The cap at 1568 pixels also means that sending a 4K image costs the same as sending a 1568px equivalent — Anthropic's preprocessing erases the resolution difference before billing.
          </p>

          <h3>Gemini 1.5 Pro: 258-Token Tiles for Images, Video, and Audio</h3>
          <p>
            Google's Gemini 1.5 Pro applies a unified 258-token-per-tile model across all media types. For images, the image is divided into 768×768 tiles without prior resizing: tile count = ⌈width ÷ 768⌉ × ⌈height ÷ 768⌉, with a minimum of one tile. This means a 3840×2160 4K image uses ⌈3840÷768⌉ × ⌈2160÷768⌉ = 5 × 3 = 15 tiles = 3,870 tokens — the only model where 4K images incur a meaningfully higher token count than 1080p.
          </p>
          <p>
            For video, Gemini samples at 1 frame per second (regardless of the original frame rate) and encodes each frame as a single tile at 258 tokens, then adds audio at 32 tokens per second. This makes Gemini the only model of the three with native video file support. A 3-minute product demo video costs (180 × 258) + (180 × 32) = 46,440 + 5,760 = 52,200 tokens, or about $0.065 at $1.25/M — inexpensive enough for high-volume video analysis pipelines.
          </p>
          <p>
            Audio is encoded at a flat 32 tokens/second. This covers speech, music, ambient sound, and any audio format supported by the Gemini API (MP3, WAV, AAC, FLAC, and others).
          </p>

          <h3>Practical Cost Comparison</h3>
          <p>
            For a typical HD image (1280×720) sent 10,000 times per month: GPT-4o high detail costs about $17/month, Claude 3.5 Sonnet costs about $18/month, and Gemini 1.5 Pro costs about $6.45/month. For video or audio workloads, Gemini is the clear choice — it's the only model with native support, and its pricing is competitive even for high-volume use.
          </p>
          <p>
            However, cost alone shouldn't drive model selection. GPT-4o and Claude 3.5 Sonnet often produce higher-quality vision outputs for tasks requiring fine-grained reasoning about image content. For high-stakes document extraction, medical imaging analysis, or UI parsing, the marginal cost difference may be well worth the quality uplift.
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

        {/* Related Tools */}
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
