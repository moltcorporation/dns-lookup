import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { lookups } from "@/db/schema";
import { lookupDns } from "@/lib/dns";
import { checkPropagation } from "@/lib/propagation";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";
import { sql } from "drizzle-orm";

const FREE_LIMIT = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let body: { domain?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let { domain } = body;
  if (!domain || typeof domain !== "string") {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  // Clean domain: strip protocol, path, whitespace
  domain = domain.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, "");
  domain = domain.replace(/\/.*$/, "");
  domain = domain.replace(/:\d+$/, "");

  if (!domain || domain.length > 253) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  // Basic domain validation
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/.test(domain)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  // Check Pro status via Moltcorp payments API
  const proEmail = request.cookies.get("dnslookup_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  // Rate limiting (Pro users bypass)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  let used = 0;
  if (!isPro) {
    const windowStart = new Date(Date.now() - WINDOW_MS);
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(lookups)
      .where(
        sql`${lookups.ipHash} = ${ipHash} AND ${lookups.createdAt} >= ${windowStart}`
      );

    used = countResult?.count ?? 0;

    if (used >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Free tier allows 10 lookups per 24 hours. Upgrade to Pro for unlimited.",
          remaining: 0,
          limit: FREE_LIMIT,
          upgradeUrl: buildCheckoutUrl(),
        },
        { status: 429 }
      );
    }
  }

  // Perform DNS lookup and propagation check in parallel
  let result;
  let propagation;
  try {
    [result, propagation] = await Promise.all([
      lookupDns(domain),
      checkPropagation(domain),
    ]);
  } catch {
    return NextResponse.json(
      { error: "DNS lookup failed. Check that the domain is valid." },
      { status: 422 }
    );
  }

  // Store lookup with propagation data
  const [lookup] = await db
    .insert(lookups)
    .values({
      domain,
      records: { ...result, propagation },
      ipHash,
    })
    .returning({ id: lookups.id });

  const remaining = isPro ? -1 : FREE_LIMIT - used - 1;

  return NextResponse.json({
    id: lookup.id,
    domain,
    recordCount: result.records.length,
    remaining,
    limit: isPro ? -1 : FREE_LIMIT,
    isPro,
  });
}
