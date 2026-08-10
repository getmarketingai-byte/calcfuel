/**
 * Commercial placement abstraction — AdSense | Affiliate | DirectSponsor.
 * No sophisticated ad system yet; wrappers keep call sites stable.
 */

import type { ReactNode } from "react";
import AdSenseUnit from "@/components/AdSenseUnit";

export type CommercialKind = "adsense" | "affiliate" | "direct_sponsor";

interface CommercialPlacementProps {
  kind: CommercialKind;
  /** AdSense slot id when kind === "adsense". */
  slot?: string;
  /** Optional affiliate/sponsor markup. */
  children?: ReactNode;
  className?: string;
  label?: string;
}

const KIND_LABEL: Record<CommercialKind, string> = {
  adsense: "Advertisement",
  affiliate: "Affiliate disclosure: we may earn a commission if you buy through this link.",
  direct_sponsor: "Sponsored",
};

export default function CommercialPlacement({
  kind,
  slot,
  children,
  className,
  label,
}: CommercialPlacementProps) {
  const disclosure = label ?? KIND_LABEL[kind];

  if (kind === "adsense") {
    if (!slot) return null;
    return (
      <div className={className} data-commercial="adsense">
        <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">{disclosure}</p>
        <AdSenseUnit slot={slot} />
      </div>
    );
  }

  if (!children) return null;

  return (
    <aside
      className={className}
      data-commercial={kind}
      aria-label={kind === "affiliate" ? "Affiliate offer" : "Sponsor"}
    >
      <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">{disclosure}</p>
      {children}
    </aside>
  );
}
