import Link from "next/link";

const comparisonRows = [
  {
    feature: "Record types per query",
    ours: "7 types in parallel (A, AAAA, MX, TXT, CNAME, NS, SOA)",
    competitor: "One record type at a time",
  },
  {
    feature: "Propagation checking",
    ours: "4 global resolvers (Cloudflare, Google, Quad9, OpenDNS)",
    competitor: "Single resolver (Google Public DNS)",
  },
  {
    feature: "Shareable reports",
    ours: "Permanent URL for every lookup result",
    competitor: "No shareable reports — URL parameters only",
  },
  {
    feature: "Speed",
    ours: "Sub-second parallel queries via Cloudflare DoH",
    competitor: "Fast — Google infrastructure",
  },
  {
    feature: "Interface",
    ours: "Modern UI with dark mode, organized by record type",
    competitor: "Raw JSON response format",
  },
  {
    feature: "DNS-over-HTTPS API",
    ours: "No public API (coming soon on Pro)",
    competitor: "Full DoH API at dns.google/resolve",
  },
  {
    feature: "Pricing",
    ours: "Free tier + $5/mo Pro for unlimited lookups",
    competitor: "Completely free (no paid tier)",
  },
  {
    feature: "DNSSEC validation",
    ours: "Shows DNSSEC status in results",
    competitor: "Full DNSSEC validation with detailed chain info",
  },
  {
    feature: "Target audience",
    ours: "Developers checking DNS records and propagation quickly",
    competitor: "Developers building apps that need DNS resolution",
  },
  {
    feature: "Ecosystem",
    ours: "Part of Moltcorp suite (SSL, Headers, Meta, Uptime, WHOIS)",
    competitor: "Part of Google Public DNS service",
  },
];

const faqs = [
  {
    question: "What is Google dns.google?",
    answer:
      "dns.google is Google's public DNS lookup tool. It lets you query DNS records using Google's Public DNS resolvers (8.8.8.8 and 8.8.4.4). It also provides a DNS-over-HTTPS API that developers use in applications.",
  },
  {
    question: "Why use DNS Lookup instead of Google dns.google?",
    answer:
      "Google dns.google shows one record type at a time and returns raw JSON. DNS Lookup scans all 7 record types in a single query, checks propagation across 4 global resolvers, and presents results in a clean UI with permanent shareable URLs. It's designed for quickly checking a domain's DNS configuration, not building applications.",
  },
  {
    question: "Does Google dns.google have features DNS Lookup doesn't?",
    answer:
      "Yes. Google dns.google provides a full DNS-over-HTTPS API that developers can use in applications, detailed DNSSEC validation chain information, and the backing of Google's global anycast infrastructure. If you need a DNS resolution API, Google dns.google is the right tool.",
  },
  {
    question: "Is DNS Lookup free?",
    answer:
      "Yes. The free tier lets you look up any domain with no account required. If you need unlimited lookups and batch checking, Pro is $5/month.",
  },
  {
    question: "Can I check DNS propagation with Google dns.google?",
    answer:
      "Google dns.google only shows results from Google's own resolvers. DNS Lookup checks propagation across 4 independent resolvers — Cloudflare, Google, Quad9, and OpenDNS — so you can see if your DNS changes have propagated globally.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Google DNS Lookup Alternative — DNS Lookup",
    description:
      "Google dns.google shows one record type at a time. DNS Lookup scans all 7 in parallel with propagation checking across 4 global resolvers.",
    url: "https://dns-lookup-moltcorporation.vercel.app/compare/google-dns",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "DNS Lookup",
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  },
  {
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
  },
];

export default function GoogleDnsComparison() {
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-teal-400"
        >
          DNS Lookup
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="font-mono text-sm text-teal-600 transition-colors hover:text-teal-400"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Look up a domain free
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-wide text-teal-600">
            Comparison
          </p>
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            Google DNS Lookup Alternative
          </h1>
          <p className="text-lg text-teal-200/60">
            Google&apos;s dns.google is fast and reliable — but it shows one
            record type at a time and returns raw JSON. DNS Lookup scans all 7
            record types in parallel, checks propagation across 4 global
            resolvers, and gives you a clean shareable report. No account needed.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex self-start rounded-lg bg-teal-600 px-8 py-3 font-mono text-base font-medium text-white transition-colors hover:bg-teal-500"
        >
          Look up a domain free
        </Link>

        {/* Comparison table */}
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            DNS Lookup vs Google dns.google
          </h2>
          <div className="overflow-x-auto rounded-lg border border-teal-900/50 bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal-900/50">
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-700">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-400">
                    DNS Lookup
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-700">
                    Google dns.google
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-teal-950/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-teal-200">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-teal-100">{row.ours}</td>
                    <td className="px-4 py-3 text-teal-100/40">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When Google dns.google is better */}
        <section className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            When Google dns.google is the better choice
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
            <li>
              You need a{" "}
              <strong className="text-teal-200">DNS-over-HTTPS API</strong> to
              resolve domains programmatically in your application.
            </li>
            <li>
              You need{" "}
              <strong className="text-teal-200">
                detailed DNSSEC validation
              </strong>{" "}
              with full chain-of-trust information.
            </li>
            <li>
              You want the reliability of{" "}
              <strong className="text-teal-200">
                Google&apos;s global anycast infrastructure
              </strong>{" "}
              for production DNS resolution.
            </li>
            <li>
              You need a{" "}
              <strong className="text-teal-200">completely free tool</strong>{" "}
              with no rate limits and no paid tier.
            </li>
          </ul>
        </section>

        {/* When DNS Lookup is better */}
        <section className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            When DNS Lookup is the better choice
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
            <li>
              You want to see{" "}
              <strong className="text-teal-200">
                all 7 record types at once
              </strong>{" "}
              — not query them one at a time.
            </li>
            <li>
              You need{" "}
              <strong className="text-teal-200">propagation checking</strong>{" "}
              across multiple independent resolvers to verify DNS changes.
            </li>
            <li>
              You want a{" "}
              <strong className="text-teal-200">clean, readable report</strong>{" "}
              instead of raw JSON output.
            </li>
            <li>
              You need a{" "}
              <strong className="text-teal-200">shareable URL</strong> you can
              send to teammates or include in documentation.
            </li>
            <li>
              You want one tool that&apos;s part of the{" "}
              <strong className="text-teal-200">Moltcorp suite</strong> — check
              SSL, security headers, meta tags, WHOIS, and uptime alongside DNS.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            Frequently asked questions
          </h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5"
            >
              <h3 className="font-mono text-sm font-semibold text-teal-200">
                {faq.question}
              </h3>
              <p className="text-sm text-teal-100/50">{faq.answer}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-teal-800 bg-teal-950/50 p-8 text-center">
          <h2 className="font-mono text-xl font-bold text-white">
            Try DNS Lookup — it&apos;s free
          </h2>
          <p className="max-w-md text-sm text-teal-200/60">
            Enter a domain and get all 7 record types with propagation checking
            in under a second. No account needed.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Look up a domain
          </Link>
        </div>

        {/* Cross-links */}
        <div className="flex flex-col gap-3 text-sm text-teal-600">
          <p className="font-mono font-medium text-teal-400">
            More comparisons
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/compare/mxtoolbox"
              className="hover:text-teal-300"
            >
              vs MXToolbox
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-teal-300">
            More tools from Moltcorp
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "SSL Certificate Checker",
                href: "https://ssl-certificate-checker-moltcorporation.vercel.app",
              },
              {
                label: "Security Headers",
                href: "https://headerguard-moltcorporation.vercel.app",
              },
              {
                label: "Meta Tags",
                href: "https://metashield-moltcorporation.vercel.app",
              },
              {
                label: "Uptime Monitor",
                href: "https://statusping-moltcorporation.vercel.app",
              },
              {
                label: "WHOIS Lookup",
                href: "https://whois-lookup-moltcorporation.vercel.app",
              },
            ].map((tool) => (
              <a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
              >
                {tool.label} &rarr;
              </a>
            ))}
          </div>
        </div>
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
          <a
            href="https://ssl-certificate-checker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            SSL Checker
          </a>
          <a
            href="https://whois-lookup-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            WHOIS Lookup
          </a>
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
