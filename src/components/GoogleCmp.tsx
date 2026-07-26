import Script from "next/script";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-7076137753154472";

/** Google-certified CMP (Funding Choices) — enable messaging in AdSense → Privacy & messaging */
export default function GoogleCmp() {
  const pubId = ADSENSE_CLIENT.replace("ca-pub-", "");
  return (
    <Script
      id="google-cmp"
      strategy="afterInteractive"
      src={`https://fundingchoicesmessages.google.com/i/pub-${pubId}?ers=1`}
    />
  );
}
