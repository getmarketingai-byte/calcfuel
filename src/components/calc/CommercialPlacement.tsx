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

export default function CommercialPlacement({
  kind,
  slot,
  children,
  className,
  label,
}: CommercialPlacementProps) {
  if (kind === "adsense") {
    if (!slot) return null;
    return (
      <div className={className} data-commercial="adsense">
        {label ? <p className="sr-only">{label}</p> : null}
        <AdSenseUnit slot={slot} />
      </div>
    );
  }

  if (!children) return null;

  return (
    <aside
      className={className}
      data-commercial={kind}
      aria-label={label ?? (kind === "affiliate" ? "Affiliate offer" : "Sponsor")}
    >
      {children}
    </aside>
  );
}
