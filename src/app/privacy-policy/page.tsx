import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

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
    <LegalPageLayout title="Privacy Policy" lastUpdated="8 May 2026">
      <p>
        CalcFuel (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy.
        This Privacy Policy explains what information we collect, how we use it, and
        your rights when using <strong>https://calcfuel.com</strong>.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited usage and technical information to operate and improve
        our calculator tools. This may include browser type, device information,
        referring pages, and high-level interaction data.
      </p>

      <h2>Google Analytics</h2>
      <p>
        We use Google Analytics to understand site usage and improve content quality.
        Google Analytics may collect information such as page views, session duration,
        and interactions through cookies and similar technologies.
      </p>

      <h2>Cookies</h2>
      <p>
        CalcFuel and third-party partners may use cookies and related technologies to:
      </p>
      <ul>
        <li>maintain site functionality</li>
        <li>measure performance and engagement</li>
        <li>support advertising and monetization features</li>
      </ul>

      <h2>How To Opt Out</h2>
      <p>You can manage cookies and tracking preferences through:</p>
      <ul>
        <li>your browser cookie settings</li>
        <li>
          the Google Analytics opt-out browser add-on:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">
            https://tools.google.com/dlpage/gaoptout
          </a>
        </li>
        <li>
          Google ad settings:{" "}
          <a href="https://adssettings.google.com">
            https://adssettings.google.com
          </a>
        </li>
      </ul>

      <h2>GDPR & Privacy Rights</h2>
      <p>
        If you are in the European Economic Area, United Kingdom, or similar
        jurisdictions, you may have rights regarding access, correction, deletion,
        restriction, and objection to processing of your personal data. To exercise
        these rights, contact us at{" "}
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a>.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services, including analytics and advertising
        providers, that process data according to their own policies.
      </p>

      <h2>Calculator Accuracy Disclaimer</h2>
      <p>
        Calculator results are estimates and should not be treated as financial,
        legal, or professional advice.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, email{" "}
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a> or
        visit our <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPageLayout>
  );
}
