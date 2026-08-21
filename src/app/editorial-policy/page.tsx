import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";
import { CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How CalcFuel creates, reviews and updates transport and trip-cost calculators and guides.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPageLayout title="Editorial Policy" lastUpdated="21 August 2026">
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

      <h2>Who reviews, and what a review covers</h2>
      <p>
        Every page is reviewed by <strong>{OPERATOR_NAME}</strong>, the studio that operates CalcFuel.
        There is one byline per page and it links to{" "}
        <Link href="/about#who-reviews-this">what that review actually involves</Link>. Reviews happen
        before a major release, whenever a formula or unit convention changes, and whenever the ACCC
        publishes a fuel price report that moves the site defaults.
      </p>
      <p>
        The date on a byline is the date of the last substantive review, not the date the file was
        last touched. Pages carry no date at all rather than an invented one.
      </p>

      <h2>Sourcing</h2>
      <ul>
        <li>
          Fuel prices are transcribed from a single named, dated ACCC weekly monitoring report and
          published in full on our{" "}
          <Link href="/data/australian-fuel-prices">fuel price data</Link> page. Nothing is
          interpolated, smoothed or carried forward.
        </li>
        <li>
          Where a figure is a rule of thumb rather than a measurement, the page says so in those
          words. The horsepower-based marine burn estimate is the clearest case.
        </li>
        <li>
          Where a rate could not be verified against a primary source, the tool depending on it is
          withdrawn rather than published with a plausible-looking number.
        </li>
        <li>
          Outbound citations exist because the page relies on the source, not to manufacture
          authority. A source we did not use does not get linked.
        </li>
      </ul>

      <h2>On generated text</h2>
      <p>
        Drafting assistance is used, and we think readers are entitled to know that. What is not
        acceptable here is publishing generated text unchecked: every formula description is verified
        against the code that runs it, every worked example is produced by running the scenario
        through the calculator itself, and every figure is traced to a source or removed. Where that
        process previously failed — a disclaimer written for cars appearing on the boat page, a fuel
        price citation pasted onto pages it had nothing to do with — those pages were rewritten in
        August 2026.
      </p>

      <h2>Independence and advertising</h2>
      <p>
        Editorial decisions are not sold. Affiliate or sponsor relationships, where they exist, do not
        change a calculator&rsquo;s formula, its defaults or which tools appear.
      </p>
      <p>
        Advertising is labelled where it appears. We do not place ads inside calculator controls, and
        we do not place them on pages that are mostly navigation — a screen that exists to send you
        somewhere else has not earned an advertisement. That rule is enforced automatically at build
        time rather than by convention.
      </p>

      <h2>Retirement</h2>
      <p>
        When a page no longer meets these standards and cannot be brought up to them, it is retired
        with an HTTP 410 rather than left live or redirected to the homepage. In August 2026 that
        applied to about eighty URLs covering marketing, tax and general-purpose calculators — content
        that was outside what this site is for. Retiring a page is a normal editorial act, not a
        failure to be hidden.
      </p>

      <h2>Contact</h2>
      <p>
        Editorial questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Corrections:{" "}
        <a href="/corrections">corrections process</a>.
      </p>
    </LegalPageLayout>
  );
}
