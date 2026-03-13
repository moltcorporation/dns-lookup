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

    const cleanDomain = domain.trim();
    if (!cleanDomain) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: cleanDomain }),
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
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DNS Lookup",
            url: "https://dns-lookup-moltcorporation.vercel.app",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
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
        <span className="font-mono text-lg font-bold tracking-tight text-teal-400">
          DNS Lookup
        </span>
        <nav className="flex items-center gap-4">
          <a
            href="/pricing"
            className="font-mono text-sm text-teal-600 hover:text-teal-400 transition-colors"
          >
            Pricing
          </a>
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-600 hover:text-teal-400"
          >
            by Moltcorp
          </a>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 pb-16 pt-20">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="globe-glow flex h-14 w-14 items-center justify-center rounded-xl border border-teal-700 bg-teal-950/60">
              <svg
                className="h-7 w-7 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
            DNS lookup that doesn&apos;t cost <span className="text-teal-400">$129/mo</span>
          </h1>
          <p className="max-w-md text-lg text-teal-200/60">
            7 record types queried in parallel. Sub-second results via Cloudflare. No signup, no paywall &mdash; just paste a domain.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-mono text-teal-400/70">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              7 record types
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Parallel queries
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              100% free
            </span>
          </div>

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
                className="flex-1 rounded-lg border border-teal-800 bg-gray-900 px-4 py-3 font-mono text-base text-teal-100 placeholder-teal-700 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="rounded-lg bg-teal-600 px-6 py-3 font-mono text-base font-medium text-white transition-colors hover:bg-teal-500 disabled:opacity-50"
              >
                {loading ? "Looking up..." : "Lookup"}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </form>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-800 border-t-teal-400" />
              <p className="font-mono text-sm text-teal-400/70">
                Querying DNS records...
              </p>
            </div>
          )}
        </div>

        {!loading && (
          <>
          {/* How it works */}
          <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Enter a domain", desc: "Type any domain name — no https:// needed." },
              { step: "2", title: "We query DNS", desc: "7 record types checked in parallel via Cloudflare." },
              { step: "3", title: "See all records", desc: "View every record with TTL and propagation check." },
            ].map((s) => (
              <div key={s.step} className="dns-card flex flex-col items-center gap-2 rounded-lg border border-teal-900/50 p-5 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 font-mono text-sm font-bold text-white">{s.step}</span>
                <h3 className="font-mono text-sm font-semibold text-teal-300">{s.title}</h3>
                <p className="text-xs text-teal-100/50">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Record type badges */}
          <div className="mt-8 flex w-full max-w-2xl flex-wrap justify-center gap-2">
            {["A", "AAAA", "MX", "TXT", "CNAME", "NS", "SOA"].map((type) => (
              <span
                key={type}
                className="rounded border border-teal-800/50 bg-teal-950/30 px-3 py-1 font-mono text-xs font-bold text-teal-400"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-16 flex w-full max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
              <h2 className="font-mono text-lg font-semibold text-teal-300">
                What are DNS records?
              </h2>
              <p className="text-sm leading-relaxed text-teal-100/50">
                DNS (Domain Name System) records are instructions stored on DNS
                servers that map domain names to IP addresses and other data.
                They control where your website is hosted, where your email is
                delivered, and how your domain is verified by third-party
                services. Common record types include <span className="font-mono text-teal-400">A</span> (IPv4
                address), <span className="font-mono text-teal-400">AAAA</span> (IPv6), <span className="font-mono text-teal-400">MX</span>{" "}
                (mail servers), <span className="font-mono text-teal-400">TXT</span> (verification and SPF),{" "}
                <span className="font-mono text-teal-400">CNAME</span> (aliases), and <span className="font-mono text-teal-400">NS</span>{" "}
                (nameservers).
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
              <h2 className="font-mono text-lg font-semibold text-teal-300">
                Why look up DNS records?
              </h2>
              <p className="text-sm leading-relaxed text-teal-100/50">
                DNS lookups help you debug website connectivity issues, verify
                email configuration (MX and SPF records), confirm domain
                ownership (TXT records), check if DNS changes have propagated,
                and audit your domain&apos;s configuration. If your site isn&apos;t
                loading or email isn&apos;t being delivered, DNS records are the
                first thing to check.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
              <h2 className="font-mono text-lg font-semibold text-teal-300">
                What does this tool check?
              </h2>
              <p className="text-sm leading-relaxed text-teal-100/50">
                We query 7 record types in parallel using Cloudflare&apos;s
                public DNS resolver: <span className="font-mono text-teal-400">A</span> (IPv4), <span className="font-mono text-teal-400">AAAA</span> (IPv6), <span className="font-mono text-teal-400">MX</span> (mail), <span className="font-mono text-teal-400">TXT</span>{" "}
                (verification/SPF), <span className="font-mono text-teal-400">CNAME</span> (aliases), <span className="font-mono text-teal-400">NS</span> (nameservers), and <span className="font-mono text-teal-400">SOA</span>{" "}
                (zone authority). Results show each record&apos;s value and TTL
                (time to live). All lookups are free and instant.
              </p>
            </div>
          </div>
          </>
        )}
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-teal-700">
          <span className="font-medium text-teal-500">Moltcorp Suite:</span>
          <a
            href="https://metashield-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            MetaShield
          </a>
          <a
            href="https://headerguard-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            HeaderGuard
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            StatusPing
          </a>
          <span className="font-medium text-teal-400">DNS Lookup</span>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">WHOIS Lookup</a>
        </div>
        <span className="text-xs text-teal-800">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
