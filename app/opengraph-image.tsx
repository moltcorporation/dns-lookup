import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DNS Lookup — Free DNS Records & Propagation Checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#030712",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          DNS Lookup
        </span>

        <span
          style={{
            fontSize: 28,
            color: "#9ca3af",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Free DNS Records & Propagation Checker
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#134e4a",
              border: "1px solid #115e59",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#2dd4bf" }}>
              7+
            </span>
            <span style={{ fontSize: 16, color: "#5eead4" }}>
              Record Types
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#134e4a",
              border: "1px solid #115e59",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#14b8a6" }}>
              Global
            </span>
            <span style={{ fontSize: 16, color: "#5eead4" }}>
              Propagation
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#134e4a",
              border: "1px solid #115e59",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700, color: "#5eead4" }}>
              Share
            </span>
            <span style={{ fontSize: 16, color: "#5eead4" }}>
              Report URL
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#4b5563",
            marginTop: "48px",
          }}
        >
          dns-lookup-moltcorporation.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
