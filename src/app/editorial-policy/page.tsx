import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How CalcFuel creates, reviews and updates transport and trip-cost calculators and guides.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPageLayout title="Editorial Policy" lastUpdated="10 August 2026">
      <p>
        CalcFuel publishes decision tools and guides for real-world transport and trip costs. This
        policy explains how we create, review and correct that work.
      </p>

      <h2>What we publish</h2>
      <p>
        We focus on calculators and guides that help people answer: what will this trip cost, how much
        fuel do I need, how far can I go, and which option makes more sense. Calculators are the
        mechanism; the decision is the product.
      </p>

      <h2>Standards</h2>
      <ul>
        <li>Formulas are implemented in TypeScript and unit-tested where a shared domain model exists.</li>
        <li>Estimates are labelled as planning figures, not guarantees or professional advice.</li>
        <li>Marine range uses conservative reserve assumptions and is described as estimated planning range.</li>
        <li>We do not invent manufacturer-specific burn rates; HP-based estimates are labelled as approximate.</li>
        <li>Commercial placements (ads, affiliates, sponsors) are secondary to usefulness and are labelled.</li>
      </ul>

      <h2>Review</h2>
      <p>
        Tools are reviewed by the CalcFuel Technical Editor before major releases and when rates,
        formulas or unit conventions change. Page-level &ldquo;Reviewed by&rdquo; notes reflect the last
        substantive review.
      </p>

      <h2>Independence</h2>
      <p>
        Editorial decisions are not sold. Affiliate or sponsor relationships, when present, do not
        change calculator formulas.
      </p>

      <h2>Contact</h2>
      <p>
        Editorial questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Corrections:{" "}
        <a href="/corrections">corrections process</a>.
      </p>
    </LegalPageLayout>
  );
}
