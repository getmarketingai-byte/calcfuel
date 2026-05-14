import type { Metadata } from "next";
import MarketingAICTA from "@/components/MarketingAICTA";
import AuthorInfo from "@/components/AuthorInfo";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <AuthorInfo />
        <MarketingAICTA />
      </div>
    </>
  );
}
