export default function MarketingAICTA() {
  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 md:p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-100 mb-1">
            MarketingAI
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Want an expert to handle your marketing?
          </h3>
          <p className="text-orange-100 text-sm md:text-base">
            MarketingAI assists in setting up your entire marketing stack for{" "}
            <strong className="text-white">$149 AUD</strong>. Strategy, tools, automations — all
            done for you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="https://calendly.com/getmarketingai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm whitespace-nowrap"
          >
            Book a Free Call
          </a>
          <a
            href="https://buy.stripe.com/cNi8wR0wZd8lePh01cbsc00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-800 transition-colors text-sm whitespace-nowrap"
          >
            Get Started — $149 AUD
          </a>
        </div>
      </div>
    </div>
  );
}
