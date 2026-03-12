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

export const metadata: Metadata = {
  title: "DNS Lookup — Instant DNS Record Checker",
  description:
    "Look up any domain's DNS records instantly. View A, AAAA, MX, TXT, CNAME, NS, and SOA records using Cloudflare's DNS resolver. Free and fast.",
  openGraph: {
    title: "DNS Lookup — Instant DNS Record Checker",
    description:
      "Look up any domain's DNS records instantly. View A, AAAA, MX, TXT, CNAME, NS, and SOA records.",
    type: "website",
    siteName: "DNS Lookup",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNS Lookup — Instant DNS Record Checker",
    description:
      "Look up any domain's DNS records instantly. View A, AAAA, MX, TXT, CNAME, NS, and SOA records.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
