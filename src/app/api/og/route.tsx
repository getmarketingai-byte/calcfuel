import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "35+ Free Marketing Calculators";
  const subtitle = searchParams.get("subtitle") || "For Australian Small Business";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "28px", fontWeight: "800", color: "#ea580c" }}>
            CalcFuel
          </span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#1c1917",
            lineHeight: "1.1",
            letterSpacing: "-2px",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "500",
            color: "#78716c",
            marginBottom: "48px",
          }}
        >
          {subtitle}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Free Forever", "No Sign-up", "ROI - CAC - ROAS - CLV"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(234, 88, 12, 0.12)",
                borderRadius: "999px",
                padding: "10px 22px",
                fontSize: "20px",
                fontWeight: "600",
                color: "#c2410c",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: "48px", right: "80px", fontSize: "22px", color: "#a8a29e" }}>
          calcfuel.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
