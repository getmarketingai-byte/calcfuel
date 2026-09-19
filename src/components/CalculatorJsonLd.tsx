import { CALCFUEL_ORG } from "@/lib/site";

export { CALCFUEL_ORG };

interface Breadcrumb {
  name: string;
  url: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface Props {
  name: string;
  description: string;
  url: string;
  breadcrumbs: Breadcrumb[];
  faqs?: Faq[];
  /**
   * Accepted for call-site compatibility and rendered as page content by the caller,
   * but no longer emitted as HowTo structured data — see the note below.
   */
  howToSteps?: HowToStep[];
  datePublished?: string;
  dateModified?: string;
}

/**
 * Structured data for a calculator page.
 *
 * Three deliberate omissions, all verified against Google's current documentation
 * on 2026-08-21:
 *
 *  - **No `HowTo`.** Deprecated on desktop in September 2023 and with no rich result
 *    on any surface since. "How to use this calculator" was never a HowTo task anyway.
 *  - **No `Article`.** A calculator is a tool, not an article. Declaring both
 *    `SoftwareApplication` and `Article` for one URL tells Google two contradictory
 *    things about what the page is.
 *  - **`FAQPage` kept.** FAQ rich results were deprecated in Google on 7 May 2026, so
 *    this earns nothing there — but it remains valid Schema.org, Bing still reads it,
 *    and it is one of the structures AI answer engines extract from.
 *
 * Dates are never invented: a page that does not supply one emits none.
 */
export default function CalculatorJsonLd({
  name,
  description,
  url,
  breadcrumbs,
  faqs,
  datePublished,
  dateModified,
}: Props) {
  const app = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
    },
    provider: CALCFUEL_ORG,
    publisher: CALCFUEL_ORG,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "en-AU",
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
