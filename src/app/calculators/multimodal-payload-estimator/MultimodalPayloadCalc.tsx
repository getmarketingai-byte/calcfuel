"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type MediaType = "image" | "video" | "audio";
type DetailLevel = "low" | "high";

const RESOLUTION_PRESETS = [
  { label: "Thumbnail (320×240)", width: 320, height: 240 },
  { label: "SD (640×480)", width: 640, height: 480 },
  { label: "HD (1280×720)", width: 1280, height: 720 },
  { label: "Full HD (1920×1080)", width: 1920, height: 1080 },
  { label: "Square HD (1080×1080)", width: 1080, height: 1080 },
  { label: "4K (3840×2160)", width: 3840, height: 2160 },
  { label: "Custom", width: 0, height: 0 },
];

// Pricing per 1M input tokens (May 2025)
const INPUT_PRICE_PER_M = {
  gpt4o: 2.50,
  claude: 3.00,
  gemini: 1.25,
};

// --- Tokenisation formulas ---

function calcGPT4oImageTokens(width: number, height: number, detail: DetailLevel): number {
  if (detail === "low") return 85;
  let w = width, h = height;
  // Step 1: scale to fit 2048×2048 keeping aspect ratio
  const maxDim = Math.max(w, h);
  if (maxDim > 2048) {
    w = Math.round((w * 2048) / maxDim);
    h = Math.round((h * 2048) / maxDim);
  }
  // Step 2: scale so shortest side = 768
  const minDim = Math.min(w, h);
  if (minDim > 768) {
    w = Math.round((w * 768) / minDim);
    h = Math.round((h * 768) / minDim);
  }
  // Step 3: count 512×512 tiles × 170 + 85 base
  const tilesX = Math.ceil(w / 512);
  const tilesY = Math.ceil(h / 512);
  return tilesX * tilesY * 170 + 85;
}

function calcClaudeImageTokens(width: number, height: number): number {
  let w = width, h = height;
  // Resize so longest side ≤ 1568
  const maxDim = Math.max(w, h);
  if (maxDim > 1568) {
    const scale = 1568 / maxDim;
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  return Math.ceil((w * h) / 750);
}

function calcGeminiImageTokens(width: number, height: number): number {
  // 258 tokens per 768×768 tile
  const tilesX = Math.max(1, Math.ceil(width / 768));
  const tilesY = Math.max(1, Math.ceil(height / 768));
  return tilesX * tilesY * 258;
}

function fmt(n: number): string {
  if (n >= 1000)
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  if (n >= 1)
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  if (n >= 0.0001)
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(n);
  return "<$0.0001";
}

function fmtTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString("en-US");
}

interface ModelResult {
  tokensPerItem: number;
  totalTokens: number;
  costPerItem: number;
  totalCost: number;
}

export default function MultimodalPayloadCalc() {
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [resolutionPreset, setResolutionPreset] = useState(2); // HD 1280×720 default
  const [customWidth, setCustomWidth] = useState("1280");
  const [customHeight, setCustomHeight] = useState("720");
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("high");
  const [numItems, setNumItems] = useState("10");
  const [videoDuration, setVideoDuration] = useState("60");
  const [audioDuration, setAudioDuration] = useState("60");

  const [results, setResults] = useState<{
    gpt4o: ModelResult | null;
    claude: ModelResult | null;
    gemini: ModelResult | null;
  } | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const items = Math.max(1, parseInt(numItems) || 1);
      let gpt4oTok = 0, claudeTok = 0, geminiTok = 0;

      if (mediaType === "image") {
        const preset = RESOLUTION_PRESETS[resolutionPreset];
        const w = preset.width === 0 ? Math.max(1, parseInt(customWidth) || 1280) : preset.width;
        const h = preset.height === 0 ? Math.max(1, parseInt(customHeight) || 720) : preset.height;
        gpt4oTok = calcGPT4oImageTokens(w, h, detailLevel);
        claudeTok = calcClaudeImageTokens(w, h);
        geminiTok = calcGeminiImageTokens(w, h);
      } else if (mediaType === "video") {
        const secs = Math.max(1, parseFloat(videoDuration) || 60);
        // Gemini: 258 tokens/frame at 1 fps + 32 tokens/sec audio
        geminiTok = Math.round(secs * 258 + secs * 32);
        // GPT-4o and Claude: no native video file support via multimodal API
        gpt4oTok = 0;
        claudeTok = 0;
      } else {
        // audio
        const secs = Math.max(1, parseFloat(audioDuration) || 60);
        // Gemini: 32 tokens/sec
        geminiTok = Math.round(secs * 32);
        // GPT-4o audio requires separate gpt-4o-audio-preview endpoint (different pricing)
        // Claude: no audio support
        gpt4oTok = 0;
        claudeTok = 0;
      }

      const build = (tok: number, pricePerM: number): ModelResult => ({
        tokensPerItem: tok,
        totalTokens: tok * items,
        costPerItem: (tok * pricePerM) / 1_000_000,
        totalCost: (tok * items * pricePerM) / 1_000_000,
      });

      setResults({
        gpt4o: gpt4oTok > 0 ? build(gpt4oTok, INPUT_PRICE_PER_M.gpt4o) : null,
        claude: claudeTok > 0 ? build(claudeTok, INPUT_PRICE_PER_M.claude) : null,
        gemini: geminiTok > 0 ? build(geminiTok, INPUT_PRICE_PER_M.gemini) : null,
      });

      trackCalculation("multimodal_payload_estimator", {
        media_type: mediaType,
        num_items: items,
        gpt4o_tokens_per_item: gpt4oTok,
        claude_tokens_per_item: claudeTok,
        gemini_tokens_per_item: geminiTok,
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [mediaType, resolutionPreset, customWidth, customHeight, detailLevel, numItems, videoDuration, audioDuration]);

  const preset = RESOLUTION_PRESETS[resolutionPreset];
  const itemLabel = mediaType === "image" ? "Images" : mediaType === "video" ? "Videos" : "Audio Files";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Multimodal Payload Estimator</h2>

      {/* Media type tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([
          ["image", "🖼️ Image"] as const,
          ["video", "🎥 Video"] as const,
          ["audio", "🎵 Audio"] as const,
        ]).map(([type, label]) => (
          <button
            key={type}
            onClick={() => setMediaType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mediaType === type
                ? "bg-orange-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Image inputs */}
      {mediaType === "image" && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resolution
            </label>
            <select
              value={resolutionPreset}
              onChange={(e) => setResolutionPreset(parseInt(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            >
              {RESOLUTION_PRESETS.map((p, i) => (
                <option key={i} value={i}>{p.label}</option>
              ))}
            </select>
          </div>

          {preset.width === 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (px)</label>
                <input
                  type="number"
                  min="1"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
                <input
                  type="number"
                  min="1"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GPT-4o Detail Level
            </label>
            <div className="flex gap-6">
              {(["low", "high"] as DetailLevel[]).map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="detail"
                    value={level}
                    checked={detailLevel === level}
                    onChange={() => setDetailLevel(level)}
                    className="accent-orange-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{level} detail</span>
                  <span className="text-xs text-gray-400">
                    {level === "low" ? "(85 tokens, fixed)" : "(tile-based)"}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Only affects GPT-4o. Claude and Gemini use their own fixed tokenisation formulas.
            </p>
          </div>
        </div>
      )}

      {/* Video inputs */}
      {mediaType === "video" && (
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Video Duration (seconds)
            </label>
            <input
              type="number"
              min="1"
              value={videoDuration}
              onChange={(e) => setVideoDuration(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="e.g. 60"
            />
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
            <strong>Gemini only:</strong> Gemini 1.5 Pro samples video at 1 fps (258 tokens/frame) and encodes the audio track at 32 tokens/sec. GPT-4o and Claude do not natively accept video files via their multimodal APIs — frames must be extracted and sent individually.
          </div>
        </div>
      )}

      {/* Audio inputs */}
      {mediaType === "audio" && (
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Audio Duration (seconds)
            </label>
            <input
              type="number"
              min="1"
              value={audioDuration}
              onChange={(e) => setAudioDuration(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="e.g. 60"
            />
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
            <strong>Gemini only:</strong> Gemini 1.5 Pro tokenises audio at 32 tokens/sec. GPT-4o audio requires the separate <code>gpt-4o-audio-preview</code> model (different endpoint and pricing). Claude 3.5 Sonnet does not currently support audio input.
          </div>
        </div>
      )}

      {/* Number of items */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Number of {itemLabel}
        </label>
        <input
          type="number"
          min="1"
          value={numItems}
          onChange={(e) => setNumItems(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="e.g. 10"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Total batch size — costs scale linearly per item.
        </p>
      </div>

      {/* Results table */}
      {results && (
        <div aria-live="polite">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Token Counts &amp; Costs — All Models
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 pr-4 text-gray-600 dark:text-gray-400 font-medium">Model</th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Tokens/Item</th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Total Tokens</th>
                  <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400 font-medium">Cost/Item</th>
                  <th className="text-right py-2 pl-3 text-gray-600 dark:text-gray-400 font-medium">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {/* GPT-4o */}
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-gray-900 dark:text-white">GPT-4o (vision)</p>
                    <p className="text-xs text-gray-500">$2.50/M input tokens · OpenAI</p>
                  </td>
                  {results.gpt4o ? (
                    <>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.gpt4o.tokensPerItem)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.gpt4o.totalTokens)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmt(results.gpt4o.costPerItem)}</td>
                      <td className="text-right py-3 pl-3 font-mono font-semibold text-green-600 dark:text-green-400">{fmt(results.gpt4o.totalCost)}</td>
                    </>
                  ) : (
                    <td colSpan={4} className="py-3 px-3 text-gray-400 italic text-xs text-right">
                      {mediaType === "video" ? "Video not supported via vision API — extract frames" : "Audio requires gpt-4o-audio-preview endpoint"}
                    </td>
                  )}
                </tr>

                {/* Claude 3.5 Sonnet */}
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-gray-900 dark:text-white">Claude 3.5 Sonnet</p>
                    <p className="text-xs text-gray-500">$3.00/M input tokens · Anthropic</p>
                  </td>
                  {results.claude ? (
                    <>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.claude.tokensPerItem)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.claude.totalTokens)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmt(results.claude.costPerItem)}</td>
                      <td className="text-right py-3 pl-3 font-mono font-semibold text-orange-600 dark:text-orange-400">{fmt(results.claude.totalCost)}</td>
                    </>
                  ) : (
                    <td colSpan={4} className="py-3 px-3 text-gray-400 italic text-xs text-right">
                      {mediaType === "video" ? "Video not supported — extract and send frames" : "Audio input not supported"}
                    </td>
                  )}
                </tr>

                {/* Gemini 1.5 Pro */}
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-gray-900 dark:text-white">Gemini 1.5 Pro</p>
                    <p className="text-xs text-gray-500">$1.25/M input tokens · Google</p>
                  </td>
                  {results.gemini ? (
                    <>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.gemini.tokensPerItem)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmtTokens(results.gemini.totalTokens)}</td>
                      <td className="text-right py-3 px-3 font-mono text-gray-700 dark:text-gray-300">{fmt(results.gemini.costPerItem)}</td>
                      <td className="text-right py-3 pl-3 font-mono font-semibold text-blue-600 dark:text-blue-400">{fmt(results.gemini.totalCost)}</td>
                    </>
                  ) : (
                    <td colSpan={4} className="py-3 px-3 text-gray-400 italic text-xs text-right">N/A</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          <details className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 font-medium">
              Show tokenisation methodology
            </summary>
            <ul className="mt-2 space-y-1 ml-4 list-disc leading-relaxed">
              {mediaType === "image" && (
                <>
                  <li><strong>GPT-4o high detail:</strong> Scale to fit 2048×2048 → scale shortest side to 768px → count 512×512 tiles × 170 + 85 base tokens</li>
                  <li><strong>GPT-4o low detail:</strong> Fixed 85 tokens regardless of resolution</li>
                  <li><strong>Claude 3.5 Sonnet:</strong> Scale longest edge to ≤ 1568px → tokens = ⌈width × height ÷ 750⌉</li>
                  <li><strong>Gemini 1.5 Pro:</strong> 258 tokens per 768×768 tile (⌈w/768⌉ × ⌈h/768⌉ tiles)</li>
                </>
              )}
              {mediaType === "video" && (
                <>
                  <li><strong>Gemini 1.5 Pro:</strong> 258 tokens/frame at 1 fps + 32 tokens/sec audio track</li>
                  <li>GPT-4o and Claude 3.5 Sonnet do not accept video file payloads via their standard vision APIs — frames must be extracted manually and sent as individual images</li>
                </>
              )}
              {mediaType === "audio" && (
                <>
                  <li><strong>Gemini 1.5 Pro:</strong> 32 tokens per second of audio</li>
                  <li>GPT-4o audio processing requires the <code>gpt-4o-audio-preview</code> model at different pricing (not included here)</li>
                  <li>Claude 3.5 Sonnet does not support audio input via the Messages API</li>
                </>
              )}
              <li>Costs shown are <strong>input token costs only</strong> for the media payload. Text prompt tokens and output tokens are charged additionally at standard rates.</li>
              <li>Prices from official provider documentation, May 2025.</li>
            </ul>
          </details>
        </div>
      )}

      {/* MarketingAI CTA */}
      <div className="mt-8 rounded-xl bg-gray-900 dark:bg-gray-950 text-white p-6">
        <h3 className="text-lg font-bold mb-2">Want your AI marketing system set up in a week?</h3>
        <p className="text-gray-300 text-sm mb-4">
          MarketingAI builds and hands over three coordinated, AI-assisted marketing systems — content engine, outbound lead sequence, and email nurture — configured to your business. Done in under a week. You own it permanently.
        </p>
        <a
          href="https://marketing-ai-psi-nine.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          Get your marketing system →
        </a>
      </div>
    </div>
  );
}
