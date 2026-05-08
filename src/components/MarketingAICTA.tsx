export default function MarketingAICTA() {
  return (
    <div className="my-8 rounded-xl border border-blue-100 bg-blue-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
          MarketingAI
        </p>
        <p className="text-sm font-bold text-gray-900 mb-0.5">
          Need a complete marketing strategy?
        </p>
        <p className="text-xs text-gray-500">
          Get a personalised 3-page audit — your gaps, 3 fixes, and a 30-day roadmap.
        </p>
      </div>
      <a
        href="https://marketing-ai-psi-nine.vercel.app/audit"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
      >
        Get your \$49 Marketing Audit →
      </a>
    </div>
  );
}