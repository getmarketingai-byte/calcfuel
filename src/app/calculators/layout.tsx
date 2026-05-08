import MarketingAICTA from "@/components/MarketingAICTA";

export default function CalculatorsLayout({
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
