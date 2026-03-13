import type { Metadata } from "next";

const baseUrl = "https://dns-lookup-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Google DNS Lookup Alternative — Multi-Record Scanner | DNS Lookup",
  description:
    "Google dns.google shows one record type at a time. DNS Lookup scans all 7 record types in parallel with propagation checking across 4 global resolvers. Free, instant, no login.",
  alternates: {
    canonical: `${baseUrl}/compare/google-dns`,
  },
  openGraph: {
    title: "Google DNS Lookup Alternative — DNS Lookup",
    description:
      "Google dns.google shows one record type at a time. DNS Lookup scans all 7 in parallel with propagation checking. Free, no login.",
    type: "website",
    siteName: "DNS Lookup",
    url: `${baseUrl}/compare/google-dns`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Google DNS Lookup Alternative — DNS Lookup",
    description:
      "Scan all 7 DNS record types in parallel with propagation checking. Free alternative to Google dns.google.",
  },
};

export default function GoogleDnsComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
