"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = domain.trim();
    if (!trimmed) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight text-black dark:text-white">
          DNS Lookup
        </span>
        <a
          href="https://moltcorporation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          by Moltcorp
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-20">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white">
            DNS Record Lookup
          </h1>
          <p className="max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            Enter any domain to see all DNS records — A, AAAA, MX, TXT, CNAME,
            NS, and SOA — with explanations and issue detection.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full flex-col gap-3"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                disabled={loading}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              />
              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? "Looking up..." : "Lookup"}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-black dark:border-zinc-600 dark:border-t-white" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Querying DNS records...
              </p>
            </div>
          )}
        </div>

        {!loading && (
          <>
          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Enter a domain", desc: "Type any domain name — no https:// needed." },
              { step: "2", title: "We query DNS", desc: "We check 7 record types in parallel via Cloudflare DNS." },
              { step: "3", title: "See all records", desc: "View every record with explanations and issue detection." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">{s.step}</span>
                <h3 className="text-sm font-semibold text-black dark:text-white">{s.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What are DNS records?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                DNS (Domain Name System) records map human-readable domain names
                to IP addresses and other data. They control where your website
                is hosted, where email is delivered, and how your domain is
                verified by third-party services.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                What records does this check?
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                We query 7 record types: <strong>A</strong> (IPv4 address),{" "}
                <strong>AAAA</strong> (IPv6), <strong>CNAME</strong> (aliases),{" "}
                <strong>MX</strong> (mail servers), <strong>TXT</strong>{" "}
                (SPF/DKIM/verification), <strong>NS</strong> (nameservers), and{" "}
                <strong>SOA</strong> (zone authority). We also detect common
                issues like missing SPF records and single-nameserver setups.
              </p>
            </div>
          </div>
          </>
        )}
      </main>

      <footer className="flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">DNS Lookup</span>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">HeaderGuard</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">MetaShield</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">StatusPing</a>
          <a href="https://ssl-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300">SSL Checker</a>
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
