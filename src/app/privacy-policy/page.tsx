import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how CalcFuel handles data, analytics, cookies, GDPR rights, and user privacy protections.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | CalcFuel",
    description:
      "CalcFuel privacy disclosures, including cookies, analytics, and GDPR rights.",
    url: "https://calcfuel.com/privacy-policy",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | CalcFuel",
    description:
      "CalcFuel privacy disclosures, including cookies, analytics, and GDPR rights.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="26 July 2026">
      <p>
        CalcFuel (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), operated by {OPERATOR_NAME},
        values your privacy. This Privacy Policy explains what information we collect, how we use
        it, and your rights when using <strong>https://calcfuel.com</strong>.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited usage and technical information to operate and improve our calculator
        tools. This may include browser type, device information, referring pages, and high-level
        interaction data. If you contact us by email, we receive the information you choose to send.
      </p>

      <h2>Calculator Suggestions and Votes</h2>
      <p>
        If you submit or upvote a calculator suggestion on our{" "}
        <Link href="/suggest">Suggest a Calculator</Link> page, we ask for your email address. We
        use it only to prevent duplicate votes and to operate the suggestion board. Emails are
        stored as a one-way hash and are not published on the site or included in public GitHub
        issues created from suggestions. Suggestion titles and descriptions you submit are shown
        publicly on the board. To request deletion of your vote or related data, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Google AdSense Advertising</h2>
      <p>
        We use <strong>Google AdSense</strong> to display advertisements on CalcFuel. Google AdSense
        uses cookies to serve ads based on your prior visits to this site or other websites. These
        cookies allow Google and its partners to serve ads based on your interests.
      </p>
      <p>
        You can opt out of personalised advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>
        . You can also opt out of third-party vendor use of cookies for personalised advertising by
        visiting{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          www.aboutads.info/choices
        </a>
        .
      </p>
      <p>
        For more information on how Google uses data when you use our site, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses data when you use our partners&apos; sites or apps
        </a>
        .
      </p>

      <h2>Google Analytics</h2>
      <p>
        We use Google Analytics to understand site usage and improve content quality. Google
        Analytics may collect information such as page views, session duration, and interactions
        through cookies and similar technologies.
      </p>

      <h2>Vercel Analytics</h2>
      <p>
        We use Vercel Analytics and Vercel Speed Insights to measure page performance and aggregate
        traffic patterns. These services may collect anonymised usage data such as page views and
        web vitals metrics.
      </p>

      <h2>Cookies and Consent</h2>
      <p>CalcFuel and third-party partners may use cookies and related technologies to:</p>
      <ul>
        <li>maintain site functionality</li>
        <li>measure performance and engagement</li>
        <li>serve and measure advertising through Google AdSense</li>
      </ul>
      <p>
        Where required by law (including the EEA, UK, and Switzerland), we use a Google-certified
        consent management platform so you can accept or decline personalised advertising cookies.
      </p>

      <h2>How To Opt Out</h2>
      <p>You can manage cookies and tracking preferences through:</p>
      <ul>
        <li>your browser cookie settings</li>
        <li>
          the Google Analytics opt-out browser add-on:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</a>
        </li>
        <li>
          Google ad settings: <a href="https://adssettings.google.com">adssettings.google.com</a>
        </li>
      </ul>

      <h2>GDPR &amp; Privacy Rights</h2>
      <p>
        If you are in the European Economic Area, United Kingdom, or similar jurisdictions, you may
        have rights regarding access, correction, deletion, restriction, and objection to processing
        of your personal data. To exercise these rights, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party services including Google (AdSense and Analytics), Vercel (hosting and
        analytics), and Upstash (Redis storage for calculator suggestion votes). These providers
        process data according to their own policies.
      </p>

      <h2>Calculator Accuracy Disclaimer</h2>
      <p>
        Calculator results are estimates and should not be treated as financial, legal, or
        professional advice.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit our{" "}
        <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPageLayout>
  );
}
