import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms governing use of CalcFuel calculators, content, and services.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | CalcFuel",
    description:
      "Terms governing access and use of CalcFuel tools, calculators, and content.",
    url: "https://calcfuel.com/terms-of-service",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | CalcFuel",
    description:
      "Terms governing access and use of CalcFuel tools, calculators, and content.",
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="8 May 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of CalcFuel at{" "}
        <strong>https://calcfuel.com</strong>. By using this site, you agree to these
        Terms.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may use CalcFuel for lawful purposes only. You agree not to misuse the
        platform, interfere with service operations, or attempt unauthorized access to
        systems or data.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Site design, content, and calculator implementations are protected by
        applicable intellectual property laws. You may not republish or redistribute
        substantial portions without permission.
      </p>

      <h2>No Professional Advice</h2>
      <p>
        Calculator results are estimates and should not be treated as financial,
        legal, or professional advice.
      </p>

      <h2>Availability and Changes</h2>
      <p>
        We may update, suspend, or discontinue features at any time. We may also
        revise these Terms as our services evolve.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, CalcFuel is provided on an
        &quot;as-is&quot; basis without warranties of any kind, and we are not liable
        for indirect or consequential losses arising from use of the site.
      </p>

      <h2>Privacy and Data Use</h2>
      <p>
        Your use of the site is also governed by our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>, including details on
        cookies and Google Analytics usage.
      </p>

      <h2>Contact</h2>
      <p>
        For legal questions, contact{" "}
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a> or use
        the <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPageLayout>
  );
}
