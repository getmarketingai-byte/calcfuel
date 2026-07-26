import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About CalcFuel — Free Online Calculators",
  description:
    "CalcFuel is a free calculator platform for marketers, creators, and anyone who needs reliable numbers fast. Learn about our editorial standards and how we verify our tools.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CalcFuel — Free Online Calculators",
    description:
      "CalcFuel mission, editorial standards, calculator verification methodology, and who we build for.",
    url: "https://calcfuel.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About CalcFuel" lastUpdated="26 July 2026">
      <p>
        CalcFuel is a free collection of calculators and practical guides for marketers, social
        media managers, small business owners, and anyone who needs reliable numbers fast — without
        a spreadsheet, a paywalled tool, or a sign-up wall.
      </p>
      <p>
        We publish tools across social media metrics, marketing analytics (ROI, ROAS, CAC, CLV),
        fuel and travel costs, finance, and regional tax calculators where local rules apply. Every
        tool runs in your browser. Nothing is stored. No sign-up required.
      </p>

      <h2>Our Mission</h2>
      <p>
        Most decisions start with a number: &ldquo;What ROAS do I need to break even?&rdquo; &ldquo;Is this
        engagement rate good for my niche?&rdquo; &ldquo;What will this road trip cost in fuel?&rdquo; When those
        numbers are hard to get, people either guess or don&apos;t decide at all.
      </p>
      <p>
        CalcFuel&apos;s mission is to make those numbers accessible in under 60 seconds. We turn
        everyday maths into clear, decision-ready answers with no paywall and no sales pitch —
        supported by teaching content on every tool page.
      </p>

      <h2>Who We Build For</h2>
      <p>
        Our users are international — marketers, creators, freelancers, and business owners who
        need quick, reliable estimates to inform a decision, not a substitute for professional
        advice. That includes:
      </p>
      <ul>
        <li>Social media managers benchmarking engagement and follower growth</li>
        <li>Marketing teams calculating ROI, ROAS, and CAC across campaigns</li>
        <li>Small business owners planning ad spend and conversion targets</li>
        <li>Drivers and travellers estimating fuel and trip costs</li>
        <li>Users in Australia who need tax, super, or HECS tools with local rates clearly labeled</li>
      </ul>

      <h2>Who Runs CalcFuel</h2>
      <p>
        CalcFuel is operated by <strong>{OPERATOR_NAME}</strong>. We develop the calculators,
        write the supporting guides, and review accuracy when rates or formulas change. For
        corrections, feedback, or partnership enquiries, reach us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>How We Build and Verify Our Calculators</h2>
      <p>Every CalcFuel calculator follows a consistent process before it goes live:</p>
      <ol>
        <li>
          <strong>Primary source research:</strong> We start from authoritative sources — industry
          frameworks for marketing metrics, government tables for regional tax tools, and established
          formulas for fuel and finance calculators.
        </li>
        <li>
          <strong>Formula implementation:</strong> Calculations are coded in TypeScript with explicit
          formulas. Key variables are named constants so they can be audited and updated.
        </li>
        <li>
          <strong>Spot-check verification:</strong> Each calculator is cross-checked against known
          correct answers, published examples, or official tools where available.
        </li>
        <li>
          <strong>Ongoing updates:</strong> Regional tax and rate-based tools are updated when
          official schedules change. Marketing benchmarks are refreshed when we publish new guides.
        </li>
      </ol>
      <p>
        Calculator outputs are estimates based on the parameters you provide. They do not account
        for all individual circumstances and are not a substitute for advice from a qualified
        professional.
      </p>

      <h2>Editorial Standards</h2>
      <ul>
        <li>
          <strong>Show the formula.</strong> Every calculator displays the formula it uses.
        </li>
        <li>
          <strong>Cite the source.</strong> When we reference a rate, threshold, or benchmark, we name
          the source and link where possible.
        </li>
        <li>
          <strong>Acknowledge limitations.</strong> Financial, tax, and health-adjacent tools include
          clear disclaimers.
        </li>
        <li>
          <strong>Avoid thin content.</strong> Calculator pages include worked examples and FAQs so
          users understand the number, not just see it.
        </li>
        <li>
          <strong>Plain language.</strong> Jargon is explained on first use.
        </li>
      </ul>

      <h2>Important Disclaimer</h2>
      <p>
        Calculator results are estimates only. They are provided for informational purposes and
        should not be treated as financial, tax, legal, or professional advice. Always consult a
        qualified professional before making decisions based on calculator outputs.
      </p>

      <h2>Contact</h2>
      <p>
        For questions, feedback, errors in our calculators, or partnership enquiries, contact{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit our{" "}
        <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPageLayout>
  );
}
