import type { Metadata } from "next";

const baseUrl = "https://dns-lookup-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title:
    "DNS Records Explained — A, AAAA, MX, TXT, CNAME, NS, SOA | DNS Lookup",
  description:
    "Learn what DNS records are and what each type does. Plain-English explanations of A, AAAA, MX, TXT, CNAME, NS, and SOA records with examples. Free DNS lookup tool included.",
  openGraph: {
    title: "DNS Records Explained — Complete Guide",
    description:
      "Plain-English guide to DNS record types. A, AAAA, MX, TXT, CNAME, NS, and SOA records explained with examples.",
    type: "article",
    siteName: "DNS Lookup",
    url: `${baseUrl}/guides/dns-records-explained`,
  },
  twitter: {
    card: "summary_large_image",
    title: "DNS Records Explained — Complete Guide",
    description:
      "Everything developers need to know about DNS record types.",
  },
  alternates: {
    canonical: `${baseUrl}/guides/dns-records-explained`,
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
