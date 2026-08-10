import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About CalcFuel — Transport & Trip Cost Decisions",
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

      <h2>Who runs CalcFuel</h2>
      <p>
        CalcFuel is operated by <strong>{OPERATOR_NAME}</strong>. We develop the calculators, maintain
        the shared calculation domain, and review accuracy when formulas or conventions change. Contact:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Standards</h2>
      <p>
        See our <Link href="/editorial-policy">editorial policy</Link>,{" "}
        <Link href="/methodology">methodology</Link>, and{" "}
        <Link href="/corrections">corrections</Link> process. Page reviews are attributed to the
        CalcFuel Technical Editor.
      </p>
    </LegalPageLayout>
  );
}
