import Link from "next/link";

const records = [
  {
    type: "A",
    name: "A Record (Address)",
    what: "Maps a domain name to an IPv4 address. This is the most fundamental DNS record — it tells the internet 'when someone types example.com, send them to this IP address.' Every domain that serves a website needs at least one A record.",
    example: "example.com → 93.184.216.34",
    common: "Pointing your domain to your web server or hosting provider.",
  },
  {
    type: "AAAA",
    name: "AAAA Record (IPv6 Address)",
    what: "Maps a domain name to an IPv6 address. Same purpose as an A record, but for the newer IPv6 protocol. As IPv4 addresses run out, more servers use IPv6. If your server has an IPv6 address, add an AAAA record alongside your A record.",
    example: "example.com → 2606:2800:220:1:248:1893:25c8:1946",
    common: "Dual-stack hosting where your server supports both IPv4 and IPv6.",
  },
  {
    type: "CNAME",
    name: "CNAME Record (Canonical Name)",
    what: "Points one domain name to another domain name (an alias). Instead of pointing to an IP address, it says 'this domain is the same as that domain — go look up that one instead.' Useful for subdomains and CDN configurations. Cannot be used on the root domain (example.com) — only subdomains (www.example.com).",
    example: "www.example.com → example.com",
    common: "Pointing www to your root domain, or subdomains to a CDN (e.g., cdn.example.com → d1234.cloudfront.net).",
  },
  {
    type: "MX",
    name: "MX Record (Mail Exchange)",
    what: "Tells other mail servers where to deliver email for your domain. When someone sends email to you@example.com, the sending server looks up the MX record to find your mail server. MX records include a priority number — lower numbers are tried first, allowing failover to backup mail servers.",
    example: "example.com → 10 mail.example.com, 20 backup.example.com",
    common: "Configuring email with Google Workspace, Microsoft 365, or any email provider.",
  },
  {
    type: "TXT",
    name: "TXT Record (Text)",
    what: "Stores arbitrary text data associated with your domain. Originally designed for human-readable notes, TXT records are now used for machine-readable verification and security policies. SPF (email authentication), DKIM (email signing), DMARC (email policy), and domain verification (Google, Let's Encrypt) all use TXT records.",
    example: 'example.com → "v=spf1 include:_spf.google.com ~all"',
    common: "Email authentication (SPF/DKIM/DMARC), domain ownership verification, and site verification for Google Search Console.",
  },
  {
    type: "NS",
    name: "NS Record (Name Server)",
    what: "Specifies which DNS servers are authoritative for your domain — meaning which servers hold the official DNS records. When you register a domain and point it to Cloudflare, AWS Route 53, or your hosting provider's DNS, you're setting NS records. Changes to NS records can take up to 48 hours to propagate globally.",
    example: "example.com → ns1.cloudflare.com, ns2.cloudflare.com",
    common: "Delegating DNS management to Cloudflare, AWS Route 53, Google Cloud DNS, or your hosting provider.",
  },
  {
    type: "SOA",
    name: "SOA Record (Start of Authority)",
    what: "Contains administrative information about your DNS zone — the primary name server, the admin email, and timing parameters that control how often secondary servers check for updates. Every domain has exactly one SOA record. You rarely need to edit it directly, but it's useful for debugging DNS propagation issues (the serial number increments with each change).",
    example: "example.com → ns1.example.com admin.example.com 2024010101 3600 600 604800 60",
    common: "Debugging DNS propagation — check the serial number to verify changes have been published.",
  },
];

const faqs = [
  {
    question: "What are DNS records?",
    answer:
      "DNS records are instructions stored on DNS servers that tell the internet how to handle requests for your domain. They map domain names to IP addresses (A/AAAA records), specify mail servers (MX records), verify domain ownership (TXT records), create aliases (CNAME records), and delegate authority to name servers (NS records). Without DNS records, browsers wouldn't know which server to contact when someone types your domain.",
  },
  {
    question: "How do I look up DNS records for a domain?",
    answer:
      "Use the DNS Lookup tool — enter any domain and see all 7 record types (A, AAAA, MX, TXT, CNAME, NS, SOA) in a single query. You can also check DNS propagation across 4 global resolvers (Cloudflare, Google, Quad9, OpenDNS) to verify changes have taken effect. No signup required.",
  },
  {
    question: "How long do DNS changes take to propagate?",
    answer:
      "It depends on the TTL (Time To Live) of the record you changed. Most records have a TTL between 300 seconds (5 minutes) and 86400 seconds (24 hours). After you make a change, it can take up to the old TTL value for all DNS servers worldwide to pick up the new value. NS record changes can take up to 48 hours. To speed things up, lower the TTL before making changes.",
  },
  {
    question: "What is the difference between A and CNAME records?",
    answer:
      "An A record maps a domain directly to an IP address (e.g., example.com → 93.184.216.34). A CNAME record maps a domain to another domain name (e.g., www.example.com → example.com). Use A records for your root domain, and CNAME records for subdomains that should point to the same place. You cannot use a CNAME on the root domain — only on subdomains.",
  },
  {
    question: "What DNS records do I need for email?",
    answer:
      "At minimum, you need MX records pointing to your mail provider (e.g., Google Workspace or Microsoft 365). For proper email deliverability, you also need three TXT records: SPF (which servers can send email for your domain), DKIM (cryptographic signature proving emails are authentic), and DMARC (policy for handling emails that fail SPF/DKIM checks).",
  },
  {
    question: "What is TTL in DNS?",
    answer:
      "TTL (Time To Live) is how long DNS servers and browsers cache a DNS record before checking for updates. A TTL of 3600 means the record is cached for 1 hour. Lower TTLs mean faster propagation of changes but more DNS queries (slightly higher latency). Set TTL low before planned changes, then raise it after the change is confirmed.",
  },
];

export default function DnsRecordsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "DNS Records Explained — Understanding All 7 Record Types",
    description:
      "Complete guide to DNS record types: A, AAAA, CNAME, MX, TXT, NS, and SOA records explained with examples.",
    step: records.map((r, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Understand ${r.type} records`,
      text: r.what,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            className="font-mono text-sm text-teal-400/60 transition-colors hover:text-teal-300"
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
          <p className="font-mono text-sm font-medium text-teal-400">
            Guide
          </p>
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            DNS Records Explained
          </h1>
          <p className="text-lg text-teal-200/60">
            DNS is the system that translates domain names into the IP addresses
            and services that make the internet work. Here&apos;s what each DNS
            record type does, with plain-English explanations and real examples.
          </p>
        </div>

        {/* Records */}
        <div className="flex flex-col gap-5">
          {records.map((record, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-teal-800/50 bg-gray-900/80 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="rounded bg-teal-600 px-2 py-0.5 font-mono text-sm font-bold text-white">
                  {record.type}
                </span>
                <h2 className="font-mono text-lg font-semibold text-white">
                  {record.name}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-teal-100/50">
                {record.what}
              </p>
              <div className="rounded bg-gray-950 px-3 py-2">
                <code className="font-mono text-xs text-teal-300">
                  {record.example}
                </code>
              </div>
              <p className="text-xs text-teal-400/60">
                Common use: {record.common}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-teal-800 bg-teal-950/50 p-8 text-center">
          <h2 className="font-mono text-2xl font-bold text-white">
            Look up DNS records now
          </h2>
          <p className="max-w-md text-sm text-teal-100/50">
            Enter any domain and see all 7 record types in a single query. Check
            propagation across 4 global resolvers. Free — no signup required.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-8 py-3 font-mono text-base font-medium text-white transition-colors hover:bg-teal-500"
          >
            Look up a domain free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-xl font-semibold text-white">
            Compare DNS lookup tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "MXToolbox", href: "/compare/mxtoolbox" },
              { name: "Google DNS", href: "/compare/google-dns" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-teal-800/50 bg-gray-900/80 px-4 py-2.5 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:text-teal-200"
              >
                vs {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="font-mono text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-teal-800/50 bg-gray-900/80 p-5"
              >
                <h3 className="font-mono font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-teal-100/50">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 border-t border-teal-900/50 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-gray-500">
          <span className="font-medium">Moltcorp Suite:</span>
          <span className="font-semibold text-teal-400">DNS Lookup</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">Federal Contract Tracker</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">HeaderGuard</a>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">MetaShield</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">SSL Checker</a>
          <a href="https://whois-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">WHOIS Lookup</a>
        </div>
        <p className="font-mono text-xs text-gray-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
