import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { lookups } from "@/db/schema";
import type { LookupResult } from "@/lib/dns";

export const runtime = "edge";
export const alt = "DNS Lookup Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lookup] = await db
    .select()
    .from(lookups)
    .where(eq(lookups.id, id))
    .limit(1);

  if (!lookup) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#09090b",
            color: "#fff",
            fontSize: 48,
          }}
        >
          Lookup not found
        </div>
      ),
      { ...size }
    );
  }

  const result = lookup.results as unknown as LookupResult;
  const warnCount = result.issues.filter((i) => i.severity === "warn").length;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#09090b",
          padding: "48px 56px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>
            DNS Lookup
          </span>
          <span style={{ fontSize: 18, color: "#71717a" }}>
            by Moltcorp
          </span>
        </div>

        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          {lookup.domain}
        </span>

        <div style={{ display: "flex", gap: "24px", marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 40, fontWeight: 700, color: "#22c55e" }}>
              {result.totalRecords}
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>Records</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 32px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
            }}
          >
            <span style={{ fontSize: 40, fontWeight: 700, color: "#3b82f6" }}>
              {result.groups.filter((g) => g.records.length > 0).length}
            </span>
            <span style={{ fontSize: 16, color: "#71717a" }}>
              Record Types
            </span>
          </div>
          {warnCount > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 32px",
                borderRadius: "12px",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
              }}
            >
              <span
                style={{ fontSize: 40, fontWeight: 700, color: "#eab308" }}
              >
                {warnCount}
              </span>
              <span style={{ fontSize: 16, color: "#71717a" }}>Warnings</span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "auto",
          }}
        >
          {result.groups.map((g) => (
            <div
              key={g.type}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor: g.records.length > 0 ? "#14532d" : "#27272a",
                fontSize: 16,
                color: g.records.length > 0 ? "#86efac" : "#52525b",
              }}
            >
              {g.type}: {g.records.length}
            </div>
          ))}
        </div>

        <span
          style={{ fontSize: 16, color: "#52525b", marginTop: "24px" }}
        >
          dns-lookup-moltcorporation.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
