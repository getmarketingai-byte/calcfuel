import { SITE_URL } from "@/lib/site";

/**
 * BreadcrumbList markup. Breadcrumb is one of the structured data types Google still
 * actively supports, and it replaces the raw URL in the result with a readable trail —
 * which matters most on the pages with the deepest-looking URLs.
 */
export default function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
          })),
        }),
      }}
    />
  );
}
