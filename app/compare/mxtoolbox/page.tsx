import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MXToolbox Alternative — Free DNS Lookup Tool | DNS Lookup",
  description:
    "Looking for an MXToolbox alternative? DNS Lookup is a free DNS record checker with propagation testing across 4 global resolvers. Pro tier at $5/mo — not $129. No login required.",
  alternates: {
    canonical: "https://dns-lookup-moltcorporation.vercel.app/compare/mxtoolbox",
  },
  openGraph: {
    title: "MXToolbox Alternative — DNS Lookup",
    description:
      "Free alternative to MXToolbox. Check DNS records with multi-resolver propagation testing. Pro at $5/mo.",
    type: "website",
    siteName: "DNS Lookup",
  },
  twitter: {
    card: "summary_large_image",
    title: "MXToolbox Alternative — DNS Lookup",
    description:
      "Free DNS lookup tool with propagation checking. MXToolbox Pro is $129/mo — ours is $5.",
  },
};

const faqs = [
  {
    question: "What is MXToolbox?",
    answer:
      "MXToolbox is a suite of network diagnostic tools focused on email deliverability, DNS lookups, and blacklist monitoring. Their free tier includes basic DNS lookups with ads, while their SuperTool Pro starts at $129/mo.",
  },
  {
    question: "Is DNS Lookup a good alternative to MXToolbox?",
    answer:
      "For DNS record lookups and propagation checking, yes. DNS Lookup checks 7 record types in parallel with propagation testing across 4 global resolvers. If you need email-specific tools like blacklist monitoring or SMTP diagnostics, MXToolbox is more comprehensive.",
  },
  {
    question: "How much does MXToolbox cost?",
    answer:
      "MXToolbox offers a free tier with basic lookups and advertising. Their paid plans start at $129/mo for SuperTool Pro. DNS Lookup offers a Pro tier at $5/mo for unlimited lookups — 25x cheaper.",
  },
  {
    question: "What DNS record types does DNS Lookup check?",
    answer:
      "DNS Lookup checks 7 record types in a single parallel query: A (IPv4), AAAA (IPv6), MX (mail servers), TXT (verification/SPF), CNAME (aliases), NS (nameservers), and SOA (zone authority).",
  },
  {
    question: "Does DNS Lookup check DNS propagation?",
    answer:
      "Yes. DNS Lookup tests propagation across 4 global resolvers — Cloudflare, Google, Quad9, and OpenDNS — so you can see if your DNS changes have propagated worldwide.",
  },
];

const features = [
  {
    ours: "7 record types checked in parallel (A, AAAA, MX, TXT, CNAME, NS, SOA)",
    competitor: "Similar record types, but one at a time via separate tools",
  },
  {
    ours: "DNS propagation check across 4 global resolvers (Cloudflare, Google, Quad9, OpenDNS)",
    competitor: "No built-in propagation checking in basic tools",
  },
  {
    ours: "Instant results via Cloudflare DoH — sub-second queries",
    competitor: "Slower queries, often 2-5 seconds",
  },
  {
    ours: "Shareable report with permanent URL",
    competitor: "No shareable reports — results disappear",
  },
  {
    ours: "Pro tier: $5/mo for unlimited lookups and batch checking",
    competitor: "SuperTool Pro: $129/mo — 25x more expensive",
  },
  {
    ours: "Clean, modern interface with dark mode",
    competitor: "Dated interface with heavy advertising",
  },
  {
    ours: "Part of the Moltcorp suite (SSL, Headers, Meta Tags, Uptime, WHOIS)",
    competitor: "Standalone tool — no integrated security suite",
  },
];

export default function MXToolboxComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans">
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
          Look up a domain free
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            MXToolbox Alternative
          </h1>
          <p className="text-lg text-teal-200/60">
            DNS Lookup is a free, modern alternative to MXToolbox. Check all 7
            DNS record types in a single query, test propagation across 4 global
            resolvers, and get shareable reports — all without creating an
            account. Pro tier starts at $5/mo, not $129.
          </p>
        </div>

        {/* Pricing comparison callout */}
        <div className="flex flex-col gap-2 rounded-lg border border-teal-800 bg-teal-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            The pricing gap
          </h2>
          <p className="text-sm text-teal-100/50">
            MXToolbox offers a free tier with basic lookups and ads. Their Pro
            tier jumps straight to{" "}
            <span className="font-mono font-bold text-red-400">$129/mo</span>.
            There&apos;s nothing in between. DNS Lookup fills that gap with a
            Pro tier at{" "}
            <span className="font-mono font-bold text-teal-300">$5/mo</span>{" "}
            — unlimited lookups, batch checking, and no ads. That&apos;s{" "}
            <span className="font-mono text-teal-300">25x cheaper</span>.
          </p>
        </div>

        {/* Feature comparison */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-lg border border-teal-900/50 bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal-900/50">
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-400">
                    DNS Lookup
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-700">
                    MXToolbox
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr
                    key={i}
                    className="border-b border-teal-950/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-teal-100">{f.ours}</td>
                    <td className="px-4 py-3 text-teal-100/40">
                      {f.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            How to use DNS Lookup
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter a domain",
                desc: "Type any domain name — no account or login needed.",
              },
              {
                step: "2",
                title: "Get instant results",
                desc: "7 record types queried in parallel via Cloudflare DNS.",
              },
              {
                step: "3",
                title: "Check propagation",
                desc: "See if all 4 global resolvers return the same records.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center gap-2 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5 text-center"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 font-mono text-sm font-bold text-white">
                  {s.step}
                </span>
                <h3 className="font-mono text-sm font-semibold text-teal-300">
                  {s.title}
                </h3>
                <p className="text-xs text-teal-100/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* When MXToolbox is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            When MXToolbox is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-teal-100/50">
            <li>You need <strong className="text-teal-200">email deliverability tools</strong> — blacklist monitoring, SMTP diagnostics, and mail flow analysis.</li>
            <li>You need <strong className="text-teal-200">comprehensive domain health reports</strong> with historical data and scheduled monitoring.</li>
            <li>Your team is enterprise-scale and needs <strong className="text-teal-200">multi-user dashboards</strong> and alerting integrations.</li>
            <li>You need <strong className="text-teal-200">DMARC, DKIM, and SPF analysis</strong> beyond basic TXT record lookups.</li>
          </ul>
        </div>

        {/* When DNS Lookup is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            When DNS Lookup is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-teal-100/50">
            <li>You need a <strong className="text-teal-200">quick DNS lookup</strong> — enter a domain, get all 7 record types instantly.</li>
            <li>You want <strong className="text-teal-200">propagation checking</strong> across 4 global resolvers in one view.</li>
            <li>You want <strong className="text-teal-200">shareable reports</strong> with permanent URLs to send to teammates or clients.</li>
            <li>You need <strong className="text-teal-200">unlimited lookups</strong> at $5/mo instead of $129/mo — 25x cheaper.</li>
            <li>You want one tool that&apos;s part of the <strong className="text-teal-200">Moltcorp suite</strong> alongside SSL, headers, meta tags, WHOIS, and uptime monitoring.</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            Frequently asked questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
              <h3 className="font-mono text-sm font-semibold text-teal-200">{faq.question}</h3>
              <p className="text-sm text-teal-100/50">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-teal-800 bg-teal-950/50 p-8 text-center">
          <h2 className="font-mono text-xl font-bold text-white">
            Try DNS Lookup — it&apos;s free
          </h2>
          <p className="max-w-md text-sm text-teal-200/60">
            No account needed. Enter a domain and get all 7 record types with
            propagation checking in under a second.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Look up a domain
          </Link>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3 text-sm text-teal-600">
          <p className="font-mono font-medium text-teal-400">
            More comparisons
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/compare/google-dns"
              className="hover:text-teal-300"
            >
              vs Google dns.google
            </Link>
          </div>
        </div>

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-teal-300">
            More tools from Moltcorp
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://ssl-certificate-checker-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              SSL Certificate Checker &rarr;
            </a>
            <a
              href="https://headerguard-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Security Headers (HeaderGuard) &rarr;
            </a>
            <a
              href="https://metashield-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Meta Tags (MetaShield) &rarr;
            </a>
            <a
              href="https://statusping-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Uptime Monitor (StatusPing) &rarr;
            </a>
            <a
              href="https://whois-lookup-moltcorporation.vercel.app"
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
          <span className="font-medium text-teal-400">DNS Lookup</span>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">WHOIS Lookup</a>
        </div>
        <span className="text-xs text-teal-800">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
