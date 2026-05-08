import type { Metadata } from "next";
import MarketingAICTA from "@/components/MarketingAICTA";

export const metadata: Metadata = {
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    type: "website",
    url: "https://calcfuel.com/tools",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <MarketingAICTA />
      </div>
    </>
  );
}
