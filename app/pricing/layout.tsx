import type { Metadata } from "next";

const baseUrl = "https://dns-lookup-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — Free DNS Lookup & Pro Plans | DNS Lookup",
  description: "DNS Lookup is free for up to 10 lookups per day. Pro is $5/month for unlimited lookups. No credit card required.",
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Pricing — Free & Pro Plans | DNS Lookup",
    description: "Free: 10 lookups/day. Pro ($5/mo): unlimited DNS lookups. No credit card required.",
    type: "website",
    siteName: "DNS Lookup",
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free & Pro Plans | DNS Lookup",
    description: "Free: 10 lookups/day. Pro ($5/mo): unlimited DNS record lookups.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DNS Lookup Pricing",
  description: "Free DNS lookups for up to 10 per day. Pro plan at $5/month for unlimited lookups.",
  url: `${baseUrl}/pricing`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "DNS Lookup",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "10 lookups/day, all record types, propagation checker" },
      { "@type": "Offer", name: "Pro", price: "5", priceCurrency: "USD", billingIncrement: "MON", description: "Unlimited lookups, priority support" },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
