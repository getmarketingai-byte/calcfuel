import { ImageResponse } from "next/og";
import { FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";

export const alt = "CalcFuel fuel and trip cost calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const priceLine =
    `Unleaded ${FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl · ` +
    `diesel ${FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl · ${SOURCE_REPORT.pricesToLabel}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 45%, #F0F9FF 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#C2410C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            CF
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", letterSpacing: -0.4 }}>
            CalcFuel
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Fuel &amp; trip cost calculators
          </div>
          <div style={{ fontSize: 29, color: "#3F4A5A", maxWidth: 900, lineHeight: 1.35 }}>
            Seventeen calculators for boats, caravans, cars and road trips — each showing its formula, assumptions and sources.
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 23, color: "#475569" }}
        >
          <div style={{ width: 40, height: 4, background: "#C2410C" }} />
          <div>{priceLine}</div>
        </div>
      </div>
    ),
    size,
  );
}
