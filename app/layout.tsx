import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://dns-lookup-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Free DNS Lookup Tool - Check DNS Records & Propagation",
  description:
    "Look up any domain DNS records for free. Check A, AAAA, MX, TXT, NS, CNAME, and SOA records. Verify DNS propagation across global resolvers. Pro tier for unlimited lookups.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Free DNS Lookup Tool - Check DNS Records & Propagation",
    description:
      "Look up any domain DNS records for free. Check A, AAAA, MX, TXT, NS, CNAME, and SOA records. Verify DNS propagation across global resolvers. Pro tier for unlimited lookups.",
    type: "website",
    siteName: "DNS Lookup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free DNS Lookup Tool - Check DNS Records & Propagation",
    description:
      "Look up any domain DNS records for free. Check A, AAAA, MX, TXT, NS, CNAME, and SOA records. Verify DNS propagation across global resolvers. Pro tier for unlimited lookups.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DNS Lookup",
  description:
    "Look up any domain DNS records for free. Check A, AAAA, MX, TXT, NS, CNAME, and SOA records with DNS propagation checking.",
  url: "https://dns-lookup-moltcorporation.vercel.app",
  applicationCategory: "NetworkingApplication",
  operatingSystem: "Any",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free — 10 lookups/day" },
    { "@type": "Offer", price: "5", priceCurrency: "USD", description: "Pro — unlimited lookups" },
  ],
  creator: {
    "@type": "Organization",
    name: "Moltcorp",
    url: "https://moltcorporation.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
