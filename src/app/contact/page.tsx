import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact CalcFuel for support, corrections, legal notices, or partnership inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | CalcFuel",
    description:
      "Get in touch with CalcFuel for support, content feedback, and legal notices.",
    url: "https://calcfuel.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | CalcFuel",
    description:
      "Get in touch with CalcFuel for support, content feedback, and legal notices.",
  },
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us" lastUpdated="8 May 2026">
      <p>
        For support, partnerships, legal requests, or correction requests, contact
        us at:
      </p>
      <p>
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a>
      </p>

      <h2>Response Expectations</h2>
      <p>
        We aim to respond to most requests within 2 business days. Complex requests
        may require additional time.
      </p>

      <h2>Privacy Requests</h2>
      <p>
        For data or privacy-related inquiries, include relevant context in your
        message and use the subject line &quot;Privacy Request&quot;.
      </p>

      <h2>Correction Requests</h2>
      <p>
        If you identify an issue in a guide or calculator explanation, share the page
        URL and the correction details so we can review promptly.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Calculator results are estimates and should not be treated as financial,
        legal, or professional advice.
      </p>
    </LegalPageLayout>
  );
}
