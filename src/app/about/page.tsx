import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CalcFuel helps people make better real-world transport and trip-cost decisions by calculating fuel, range, time and operating costs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About CalcFuel" lastUpdated="10 August 2026">
      <p>
        CalcFuel helps people make better real-world transport and trip-cost decisions by calculating
        fuel, range, time and operating costs — for boats, towing and caravans, vehicles, motorcycles
        and road trips.
      </p>
      <p>
        The calculator is the mechanism. The decision is the product. We favour a small set of deep
        decision engines over a large directory of thin tools.
      </p>

      <h2>Our mission</h2>
      <p>
        Most trip decisions start with a number: &ldquo;What will this passage cost?&rdquo;
        &ldquo;How much extra fuel will towing add?&rdquo; &ldquo;Is driving cheaper than flying for
        this group?&rdquo; When those numbers are hard to get, people guess. CalcFuel turns everyday
        transport maths into clear, decision-ready answers in the browser — no sign-up wall.
      </p>

      <h2>Who we build for</h2>
      <ul>
        <li>Boat owners planning day trips and coastal passages</li>
        <li>Caravan and trailer towers estimating fuel penalties</li>
        <li>Drivers comparing road trips, commutes and carpools</li>
        <li>Households budgeting fuel across one or more vehicles</li>
        <li>People weighing hybrid, EV or motorcycle running costs</li>
      </ul>

      <h2 id="who-reviews-this">Who runs CalcFuel, and who reviews it</h2>
      <p>
        CalcFuel is built and operated by <strong>{OPERATOR_NAME}</strong>, an independent Australian
        software studio. CalcFuel is the product; {OPERATOR_NAME} is the entity behind it. Every
        &ldquo;Reviewed by&rdquo; line on this site points here, and there is deliberately only one
        such line per page — a page carrying two different reviewer names and two different dates
        tells you nothing about who stands behind it.
      </p>
      <p>A review means four specific things have been checked:</p>
      <ul>
        <li>
          <strong>The formula matches the page.</strong> The maths described in the article is the
          maths the calculator runs — both come from the same shared calculation layer, so an
          explanation cannot drift away from the code behind it.
        </li>
        <li>
          <strong>The worked example is a real output.</strong> Every worked example on the site was
          produced by running the scenario through the calculator itself, not written to look
          plausible.
        </li>
        <li>
          <strong>Prices are dated and sourced.</strong> Default fuel prices are transcribed from a
          named, dated ACCC report rather than estimated. See{" "}
          <Link href="/data/australian-fuel-prices">Australian fuel price data</Link>.
        </li>
        <li>
          <strong>Limitations are stated on the page.</strong> Each calculator says what its model
          leaves out, in terms specific to that calculation rather than a generic disclaimer.
        </li>
      </ul>
      <p>
        Contact for corrections, questions or anything that looks wrong:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We would rather hear about an error
        than have it sit there.
      </p>

      <h2>What we deliberately do not do</h2>
      <p>
        We do not publish a calculator for every keyword. The site was substantially larger in early
        2026 and covered marketing, tax and general-purpose maths; most of that inventory was retired
        in August 2026 because it had nothing to do with transport costs and none of it was better
        than what already existed elsewhere. Seventeen calculators that answer a real decision beat
        eighty that answer a search query.
      </p>
      <p>
        We also do not publish figures we cannot source. Where a rate or a price could not be
        verified against a primary source, the tool that depended on it was withdrawn rather than
        shipped with a plausible-looking number — which is why there are no tax calculators here.
      </p>

      <h2>How the tools work</h2>
      <p>
        Everything runs in your browser. Inputs are not sent to a server, nothing is stored beyond
        your own unit and currency preference in local storage, and there is no account to create.
        The site is funded by advertising, which is labelled where it appears, and is not placed
        inside calculator controls or on pages without substantial content.
      </p>

      <h2>Standards</h2>
      <p>
        Our <Link href="/editorial-policy">editorial policy</Link> sets out how pages are written and
        reviewed, our <Link href="/methodology">methodology</Link> documents the calculation logic
        behind every tool, and our <Link href="/corrections">corrections process</Link> explains how
        mistakes are recorded and fixed rather than quietly edited.
      </p>
    </LegalPageLayout>
  );
}
