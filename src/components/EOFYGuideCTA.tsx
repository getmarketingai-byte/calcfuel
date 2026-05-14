"use client";

const EOFY_GUIDE_LINK = "https://buy.stripe.com/8x24gBa7z5FT8qT15gbsc07";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function EOFYGuideCTA() {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "product_cta_click", {
        product: "eofy_guide",
        link: EOFY_GUIDE_LINK,
      });
    }
  };

  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-6 md:p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-100 mb-1">
            EOFY 2024&ndash;25
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            EOFY Tax Planning Guide &mdash; $9 AUD
          </h3>
          <p className="text-teal-100 text-sm md:text-base">
            Salary sacrifice, super, WFH deductions, CGT &mdash; a step-by-step checklist to minimise
            your 2024&ndash;25 tax bill before 30 June.
          </p>
        </div>
        <div className="shrink-0">
          <a
            href={EOFY_GUIDE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-block text-center bg-white text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm whitespace-nowrap"
          >
            Get the Guide ($9 AUD) &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
