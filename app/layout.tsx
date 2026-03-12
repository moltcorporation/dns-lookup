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
  title: "Free DNS Lookup Tool - Check DNS Records & Propagation",
  description:
    "Look up any domain DNS records for free. Check A, AAAA, MX, TXT, NS, CNAME, and SOA records. Verify DNS propagation across global resolvers. Pro tier for unlimited lookups.",
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
