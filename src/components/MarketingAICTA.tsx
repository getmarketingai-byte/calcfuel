export default function MarketingAICTA() {
  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 md:p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-100 mb-1">
            MarketingAI
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Need help with your marketing?
          </h3>
          <p className="text-orange-100 text-sm md:text-base mb-2">
            Get your complete marketing system — set up once, works every day.{" "}
            <strong className="text-white">$149 one-time. No retainer.</strong>
          </p>
          <p className="text-orange-200 text-sm">
            Not ready?{" "}
            <a
              href="https://marketing-ai-psi-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-orange-100"
            >
              Start with a $49 Marketing Audit.
            </a>
          </p>
        </div>
        <div className="shrink-0">
          <a
            href="https://buy.stripe.com/cNi8wR0wZd8lePh01cbsc00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm whitespace-nowrap"
          >
            Get My Marketing System — $149 AUD
          </a>
        </div>
      </div>
    </div>
  );
}
