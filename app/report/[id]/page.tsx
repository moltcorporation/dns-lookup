export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { lookups } from "@/db/schema";
import type { LookupResult, RecordGroup, DnsIssue } from "@/lib/dns";
import Link from "next/link";

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

  if (!lookup) return { title: "Lookup not found — DNS Lookup" };

  const title = `DNS Records for ${lookup.domain}`;
  const description = `DNS lookup for ${lookup.domain}: ${lookup.recordCount} records found across 7 types.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "DNS Lookup" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function formatTTL(seconds: number): string {
  if (seconds >= 86400) return `${Math.floor(seconds / 86400)}d`;
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h`;
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m`;
  return `${seconds}s`;
}

function IssueItem({ issue }: { issue: DnsIssue }) {
  const color =
    issue.severity === "warn"
      ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300"
      : "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300";
  const icon = issue.severity === "warn" ? "\u26A0" : "\u2139";

  return (
    <div className={`flex items-start gap-2 rounded-lg border p-3 ${color}`}>
      <span className="mt-0.5">{icon}</span>
      <p className="text-sm">{issue.message}</p>
    </div>
  );
}

function RecordGroupSection({ group }: { group: RecordGroup }) {
  if (group.records.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">
            {group.typeName}
          </h3>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            No records
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {group.description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-black dark:text-white">
          {group.typeName}
        </h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {group.records.length} record{group.records.length === 1 ? "" : "s"}
        </span>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {group.description}
      </p>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                Value
              </th>
              <th className="px-3 py-2 text-right font-medium text-zinc-500 dark:text-zinc-400">
                TTL
              </th>
            </tr>
          </thead>
          <tbody>
            {group.records.map((record, i) => (
              <tr
                key={i}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="break-all px-3 py-2 font-mono text-xs text-black dark:text-white">
                  {record.data}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-xs text-zinc-500 dark:text-zinc-400">
                  {formatTTL(record.TTL)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

  const result = lookup.results as unknown as LookupResult;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          DNS Lookup
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Look up another domain
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {result.domain}
          </h1>
          <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{result.totalRecords} records found</span>
            {result.issues.length > 0 && (
              <span>
                {result.issues.filter((i) => i.severity === "warn").length}{" "}
                warnings
              </span>
            )}
          </div>
        </div>

        {/* Issues */}
        {result.issues.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Issues Detected
            </h2>
            {result.issues.map((issue, i) => (
              <IssueItem key={i} issue={issue} />
            ))}
          </div>
        )}

        {/* Record groups */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            DNS Records
          </h2>
          {result.groups.map((group) => (
            <RecordGroupSection key={group.type} group={group} />
          ))}
        </div>

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            Also check this domain&apos;s security headers
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Security headers protect against XSS, clickjacking, and MIME-sniffing attacks.
          </p>
          <a
            href={`https://headerguard-moltcorporation.vercel.app/?url=${encodeURIComponent("https://" + result.domain)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Check with HeaderGuard &rarr;
          </a>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">DNS Lookup</span>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            HeaderGuard
          </a>
          <a
            href="https://metashield-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            MetaShield
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            StatusPing
          </a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
