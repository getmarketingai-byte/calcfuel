import { ImageResponse } from "next/og";

/**
 * Default social card, generated as a real PNG at build time.
 *
 * The previous card was an SVG, which Facebook, X, LinkedIn, Slack, Discord and
 * iMessage all refuse to render — so every share of every page produced a bare link.
 */
export const alt = "CalcFuel — fuel and trip cost calculators for Australia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              fontSize: 68,
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            What will this trip actually cost?
          </div>
          <div style={{ fontSize: 30, color: "#3F4A5A", maxWidth: 880, lineHeight: 1.35 }}>
            Fuel, range and running costs for boats, caravans, cars and road trips — priced on
            current Australian data.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#475569" }}>
          <div style={{ width: 40, height: 4, background: "#C2410C" }} />
          <div>calcfuel.com</div>
        </div>
      </div>
    ),
    size,
  );
}
