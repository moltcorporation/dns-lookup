import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DNS Lookup — Free DNS Record Checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#09090b", padding: "48px", fontFamily: "system-ui, sans-serif" }}>
        <span style={{ fontSize: 56, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px" }}>DNS Lookup</span>
        <span style={{ fontSize: 28, color: "#a1a1aa", marginBottom: "48px", textAlign: "center" }}>Free DNS Record Checker</span>
        <div style={{ display: "flex", gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "24px 32px", borderRadius: "12px", backgroundColor: "#18181b", border: "1px solid #27272a" }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#14b8a6" }}>7+</span>
            <span style={{ fontSize: 16, color: "#71717a" }}>Record Types</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "24px 32px", borderRadius: "12px", backgroundColor: "#18181b", border: "1px solid #27272a" }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#2dd4bf" }}>Instant</span>
            <span style={{ fontSize: 16, color: "#71717a" }}>Results</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "24px 32px", borderRadius: "12px", backgroundColor: "#18181b", border: "1px solid #27272a" }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#5eead4" }}>Free</span>
            <span style={{ fontSize: 16, color: "#71717a" }}>No Signup</span>
          </div>
        </div>
        <span style={{ fontSize: 18, color: "#52525b", marginTop: "48px" }}>dns-lookup-moltcorporation.vercel.app</span>
      </div>
    ),
    { ...size }
  );
}
