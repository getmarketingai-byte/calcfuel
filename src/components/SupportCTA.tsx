"use client";

const SUPPORT_LINK = "https://buy.stripe.com/6oU00lfrT0lzgXp15gbsc0k";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function SupportCTA() {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "support_cta_click", {
        link: SUPPORT_LINK,
      });
    }
  };

  return (
    <div className="text-center py-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong className="text-gray-700 dark:text-gray-300">Found this useful?</strong>{" "}
        CalcFuel is free.{" "}
        <a
          href={SUPPORT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="text-orange-500 hover:text-orange-600 font-medium underline"
        >
          Buy us a coffee ($5)
        </a>{" "}
        ☕ to keep it running.
      </p>
    </div>
  );
}
