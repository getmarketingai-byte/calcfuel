export const SITE_URL = "https://calcfuel.com";
export const CONTACT_EMAIL = "hello@calcfuel.com";
export { OPERATOR_NAME, OPERATOR_URL } from "@/lib/editorial";

/**
 * CalcFuel-only Organization. Do not attach a parentOrganization to another
 * brand — Google should see this host as its own entity (RISK LAB #1).
 */
export const CALCFUEL_ORG = {
  "@type": "Organization" as const,
  name: "CalcFuel",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/icon-192.png`,
    width: 192,
    height: 192,
  },
  areaServed: { "@type": "Country" as const, name: "Australia" },
};
