import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corrections",
  description: "How to report an error in a CalcFuel calculator or guide, and how we handle fixes.",
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <LegalPageLayout title="Corrections" lastUpdated="10 August 2026">
      <p>
        If you find an error in a formula, unit conversion, labelled estimate, or supporting guide,
        please tell us. We correct material mistakes promptly.
      </p>

      <h2>How to report</h2>
      <ol>
        <li>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the page URL.</li>
        <li>Describe the expected vs actual result, including inputs you used.</li>
        <li>If possible, cite a primary source (owner&apos;s manual, standards body, or government table).</li>
      </ol>

      <h2>What we do</h2>
      <ul>
        <li>Reproduce the issue against the domain tests and calculator UI.</li>
        <li>Ship a fix and update the page&apos;s reviewed / modified date when the change is substantive.</li>
        <li>For significant public errors, note the correction here or on the affected page.</li>
      </ul>

      <h2>Not corrections</h2>
      <p>
        Differences between planning estimates and your real trip (weather, load, throttle) are expected
        variance, not calculator bugs — though we welcome feedback that improves labelled assumptions.
      </p>
    </LegalPageLayout>
  );
}
