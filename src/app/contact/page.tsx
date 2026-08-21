import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Report an error in a CalcFuel calculator, ask an editorial question, or raise a legal or partnership matter. We answer corrections first.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us" path="/contact" lastUpdated="8 May 2026">
      <p>
        For support, partnerships, legal requests, or correction requests, contact
        us at:
      </p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
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

      <h2>Suggest a Calculator</h2>
      <p>
        Want a calculator that isn&apos;t on the site yet? Visit{" "}
        <Link href="/suggest">Suggest a Calculator</Link> to submit an idea or upvote
        community requests. We use that board to decide what to build next.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Calculator results are estimates and should not be treated as financial,
        legal, or professional advice.
      </p>
    </LegalPageLayout>
  );
}
