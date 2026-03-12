import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { lookups } from "@/db/schema";
import { lookupDomain } from "@/lib/dns";
import { sql } from "drizzle-orm";

const FREE_LIMIT = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function normalizeDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, "");
  domain = domain.split("/")[0];
  domain = domain.split(":")[0];
  return domain;
}

export async function POST(request: NextRequest) {
  let body: { domain?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawDomain = body.domain;
  if (!rawDomain || typeof rawDomain !== "string") {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const domain = normalizeDomain(rawDomain);

  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain)) {
    return NextResponse.json({ error: "Invalid domain name" }, { status: 400 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  const windowStart = new Date(Date.now() - WINDOW_MS);
  const [countResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(lookups)
    .where(
      sql`${lookups.ipHash} = ${ipHash} AND ${lookups.createdAt} >= ${windowStart}`
    );

  const used = countResult?.count ?? 0;
  if (used >= FREE_LIMIT) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Free tier allows 10 lookups per 24 hours.", remaining: 0 },
      { status: 429 }
    );
  }

  let result;
  try {
    result = await lookupDomain(domain);
  } catch (err) {
    const message = err instanceof Error ? err.message : "DNS lookup failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  const [lookup] = await db
    .insert(lookups)
    .values({
      domain,
      results: result,
      issueCount: result.issues.length,
      recordCount: result.totalRecords,
      ipHash,
    })
    .returning({ id: lookups.id });

  return NextResponse.json({
    id: lookup.id,
    domain,
    totalRecords: result.totalRecords,
    issueCount: result.issues.length,
    remaining: FREE_LIMIT - used - 1,
  });
}
