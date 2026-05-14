import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CalcFuel Terms of Service — disclaimer, limitation of liability, and acceptable use.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: May 2026</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>calcfuel.com</strong> (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site. CalcFuel is operated by MarketingAI (Australian sole trader).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Calculator Results Are Estimates Only</h2>
          <p>
            All calculators and tools on CalcFuel provide <strong>estimates for informational purposes only</strong>. Results are based on the inputs you provide and standard mathematical formulas. They are:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Not financial advice, tax advice, legal advice, or professional advice of any kind</li>
            <li>Not guaranteed to be accurate, complete, or up to date</li>
            <li>Not a substitute for advice from a qualified professional (accountant, financial adviser, lawyer, etc.)</li>
          </ul>
          <p className="mt-3">
            <strong>Use at your own risk.</strong> Always verify results with a qualified professional before making financial, business, or investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, CalcFuel and MarketingAI will not be liable for any loss, damage, or cost arising from your use of — or reliance on — any calculator, tool, or information on this Site. This includes, without limitation, direct, indirect, incidental, or consequential losses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to any part of the Site</li>
            <li>Scrape, copy, or reproduce Site content for commercial use without permission</li>
            <li>Transmit malicious code, viruses, or other harmful material</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Intellectual Property</h2>
          <p>
            All content on CalcFuel, including calculator logic, copy, and design, is the property of MarketingAI unless otherwise stated. You may use the calculators for personal and business purposes but may not reproduce or redistribute the Site&rsquo;s content without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Third-Party Services</h2>
          <p>
            CalcFuel uses Google Analytics and Google AdSense. Use of these services is subject to Google&rsquo;s own terms and privacy policies. We are not responsible for the practices of these third-party providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the updated Terms. The &ldquo;Last updated&rdquo; date at the top of this page will reflect when changes were last made.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Australia.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact</h2>
          <p>
            For questions about these Terms, contact us at:{" "}
            <a href="mailto:getmarketingai@gmail.com" className="text-orange-500 hover:underline">
              getmarketingai@gmail.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
