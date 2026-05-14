import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CalcFuel Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: May 2026</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Overview</h2>
          <p>
            CalcFuel (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a free calculator and tool website operated by MarketingAI (Australian sole trader). This Privacy Policy explains what data we collect when you visit <strong>calcfuel.com</strong>, how we use it, and your rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. What We Collect</h2>
          <p>We do not require registration or collect personal information directly. However, third-party services on this site may collect data automatically:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Google Analytics (G-2Q8MGZ47BC):</strong> Collects anonymised usage data including pages visited, time on site, browser type, and approximate location (country/city level). This helps us understand how visitors use CalcFuel.
            </li>
            <li>
              <strong>Google AdSense (ca-pub-7076137753154472):</strong> May serve personalised advertisements based on your browsing history and interests, using cookies set by Google. If AdSense ads are not yet active, the snippet still loads for account verification.
            </li>
            <li>
              <strong>Vercel Analytics &amp; Speed Insights:</strong> Collects anonymised performance metrics (page load times, Core Web Vitals) to help us optimise site speed. No personal identifiers are stored.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Cookies</h2>
          <p>
            CalcFuel itself does not set first-party cookies. Google Analytics and Google AdSense use cookies to function. By using this site, you consent to these cookies in accordance with our use of Google services.
          </p>
          <p className="mt-2">
            You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>
          <p className="mt-2">
            You can manage Google Ad personalisation via <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Google Ad Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. How We Use Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To understand which calculators are most useful and improve them</li>
            <li>To measure and improve site performance</li>
            <li>To serve relevant advertisements (via Google AdSense)</li>
          </ul>
          <p className="mt-3">We do not sell your data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. GDPR &amp; Your Rights</h2>
          <p>If you are located in the European Economic Area (EEA), you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-3">
            Because we primarily use third-party analytics tools (Google), most data subject requests should be directed to Google. For any other requests, contact us at the address below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
          <p>
            Google Analytics retains anonymised usage data for 14 months by default. We do not store personal data on our own servers beyond what is necessary for site operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Contact</h2>
          <p>
            For privacy-related questions, email us at:{" "}
            <a href="mailto:getmarketingai@gmail.com" className="text-orange-500 hover:underline">
              getmarketingai@gmail.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
