export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { lookups } from "@/db/schema";
import type { DnsResult } from "@/lib/dns";
import type { PropagationResult } from "@/lib/propagation";
import Link from "next/link";
import { ShareButtons } from "@/app/components/ShareButtons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const [lookup] = await db
    .select()
    .from(lookups)
    .where(eq(lookups.id, id))
    .limit(1);

  if (!lookup) {
    return { title: "Lookup not found — DNS Lookup" };
  }

  const result = lookup.records as unknown as DnsResult;
  const title = `DNS Records for ${lookup.domain}`;
  const description = `${result.records.length} DNS records found for ${lookup.domain}. View A, AAAA, MX, TXT, CNAME, NS, and SOA records.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "DNS Lookup" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const TYPE_COLORS: Record<string, string> = {
  A: "bg-teal-900/50 text-teal-300 border border-teal-700/50",
  AAAA: "bg-cyan-900/50 text-cyan-300 border border-cyan-700/50",
  MX: "bg-purple-900/50 text-purple-300 border border-purple-700/50",
  TXT: "bg-amber-900/50 text-amber-300 border border-amber-700/50",
  CNAME: "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50",
  NS: "bg-sky-900/50 text-sky-300 border border-sky-700/50",
  SOA: "bg-gray-800/50 text-gray-300 border border-gray-700/50",
};

function TypeBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] || "bg-gray-800/50 text-gray-400 border border-gray-700/50";
  return (
    <span className={`inline-flex rounded px-2 py-0.5 font-mono text-xs font-bold ${color}`}>
      {type}
    </span>
  );
}

export default async function ReportPage({
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
    notFound();
  }

  const storedData = lookup.records as unknown as DnsResult & { propagation?: PropagationResult };
  const result: DnsResult = {
    domain: storedData.domain,
    records: storedData.records,
    queryTime: storedData.queryTime,
  };
  const propagation = storedData.propagation || null;

  // Group records by type
  const grouped: Record<string, typeof result.records> = {};
  for (const record of result.records) {
    if (!grouped[record.type]) grouped[record.type] = [];
    grouped[record.type].push(record);
  }

  const typeOrder = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA"];
  const sortedTypes = Object.keys(grouped).sort(
    (a, b) => (typeOrder.indexOf(a) === -1 ? 99 : typeOrder.indexOf(a)) -
              (typeOrder.indexOf(b) === -1 ? 99 : typeOrder.indexOf(b))
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(20,184,166,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-teal-400"
        >
          DNS Lookup
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-teal-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
        >
          Look up another domain
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        {/* Domain + Summary */}
        <div className="flex flex-col gap-2">
          <h1 className="font-mono text-2xl font-bold text-white">
            {lookup.domain}
          </h1>
          <div className="flex gap-4 font-mono text-sm text-teal-500">
            <span>{result.records.length} records found</span>
            <span>{result.queryTime}ms query time</span>
          </div>
        </div>

        {/* Record type summary pills */}
        <div className="flex flex-wrap gap-2">
          {sortedTypes.map((type) => (
            <span key={type} className="flex items-center gap-1.5">
              <TypeBadge type={type} />
              <span className="font-mono text-xs text-teal-600">
                {grouped[type].length}
              </span>
            </span>
          ))}
        </div>

        {/* Records grouped by type */}
        {sortedTypes.map((type) => (
          <div key={type} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TypeBadge type={type} />
              <h2 className="font-mono text-sm font-semibold text-teal-300">
                {type} Records
              </h2>
            </div>
            <div className="record-table overflow-x-auto rounded-lg border border-teal-900/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-teal-900/50">
                    <th className="px-4 py-2 text-left font-mono text-xs font-medium text-teal-600">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left font-mono text-xs font-medium text-teal-600">
                      Value
                    </th>
                    <th className="px-4 py-2 text-right font-mono text-xs font-medium text-teal-600">
                      TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[type].map((record, i) => (
                    <tr
                      key={i}
                      className="border-b border-teal-950/50 last:border-0"
                    >
                      <td className="px-4 py-2 font-mono text-xs text-teal-300/70">
                        {record.name}
                      </td>
                      <td className="max-w-md break-all px-4 py-2 font-mono text-xs text-teal-100">
                        {record.data}
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-teal-600">
                        {record.ttl}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {result.records.length === 0 && (
          <div className="rounded-lg border border-teal-900/50 bg-gray-900/80 p-8 text-center">
            <p className="font-mono text-teal-500">
              No DNS records found for this domain.
            </p>
          </div>
        )}

        {/* DNS Propagation */}
        {propagation && propagation.results.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-sm font-semibold text-teal-300">
                DNS Propagation
              </h2>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
                  propagation.consistent
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/50"
                    : "bg-amber-900/50 text-amber-300 border border-amber-700/50"
                }`}
              >
                {propagation.consistent ? "Consistent" : "Inconsistent"}
              </span>
            </div>

            {/* Resolver grid */}
            <div className="resolver-grid grid grid-cols-2 gap-3 sm:grid-cols-4">
              {propagation.results.map((r) => (
                <div
                  key={r.name}
                  className={`flex flex-col gap-2 rounded-lg border p-3 ${
                    r.error
                      ? "border-red-800/50 bg-red-950/20"
                      : r.addresses.length > 0
                        ? "border-teal-800/50 bg-teal-950/20"
                        : "border-gray-800/50 bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-300">{r.name}</span>
                    {r.error ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    ) : r.addresses.length > 0 ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                    )}
                  </div>
                  <div className="font-mono text-[10px] leading-relaxed text-teal-100/60">
                    {r.error
                      ? <span className="text-red-400">{r.error}</span>
                      : r.addresses.length > 0
                        ? r.addresses.map((addr, i) => <div key={i}>{addr}</div>)
                        : <span className="text-gray-500">No records</span>}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-mono text-xs text-teal-700">
              Queried Cloudflare, Google, Quad9, and OpenDNS for A records. {propagation.consistent
                ? "All resolvers return the same addresses."
                : "Resolvers are returning different addresses \u2014 DNS changes may still be propagating."}
            </p>
          </div>
        )}

        <ShareButtons
          domain={lookup.domain}
          recordCount={result.records.length}
          reportUrl={`https://dns-lookup-moltcorporation.vercel.app/report/${id}`}
        />

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-teal-300">
            Also check this domain
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://metashield-moltcorporation.vercel.app/?url=https://${encodeURIComponent(lookup.domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Meta tags (MetaShield) &rarr;
            </a>
            <a
              href={`https://headerguard-moltcorporation.vercel.app/?url=https://${encodeURIComponent(lookup.domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Security headers (HeaderGuard) &rarr;
            </a>
            <a
              href={`https://ssl-certificate-checker-moltcorporation.vercel.app/?domain=${encodeURIComponent(lookup.domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              SSL certificate (SSL Checker) &rarr;
            </a>
            <a
              href="https://statusping-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Uptime monitor (StatusPing) &rarr;
            </a>
            <a
              href={`https://whois-lookup-moltcorporation.vercel.app/?domain=${encodeURIComponent(lookup.domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              WHOIS Lookup &rarr;
            </a>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-teal-700">
          <span className="font-medium text-teal-500">Moltcorp Suite:</span>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">MetaShield</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">HeaderGuard</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">StatusPing</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">WHOIS Lookup</a>
          <span className="font-medium text-teal-400">DNS Lookup</span>
        </div>
        <span className="text-xs text-teal-800">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
