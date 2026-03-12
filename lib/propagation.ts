/**
 * DNS Propagation Checker
 * Queries multiple global DNS resolvers to check if records are consistent.
 */

export interface ResolverResult {
  resolver: string;
  location: string;
  addresses: string[];
  status: "ok" | "error" | "timeout";
  responseMs: number;
}

export interface PropagationResult {
  domain: string;
  consistent: boolean;
  resolvers: ResolverResult[];
}

const RESOLVERS = [
  {
    name: "Cloudflare",
    location: "Global (Anycast)",
    url: "https://cloudflare-dns.com/dns-query",
    headers: { Accept: "application/dns-json" },
  },
  {
    name: "Google",
    location: "Global (Anycast)",
    url: "https://dns.google/resolve",
    headers: {},
  },
  {
    name: "Quad9",
    location: "Global (Anycast)",
    url: "https://dns.quad9.net:5053/dns-query",
    headers: { Accept: "application/dns-json" },
  },
  {
    name: "OpenDNS",
    location: "US (Cisco)",
    url: "https://doh.opendns.com/dns-query",
    headers: { Accept: "application/dns-json" },
  },
];

async function queryResolver(
  resolver: (typeof RESOLVERS)[number],
  domain: string
): Promise<ResolverResult> {
  const start = Date.now();
  try {
    const url = `${resolver.url}?name=${encodeURIComponent(domain)}&type=A`;
    const res = await fetch(url, {
      headers: resolver.headers,
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return {
        resolver: resolver.name,
        location: resolver.location,
        addresses: [],
        status: "error",
        responseMs: Date.now() - start,
      };
    }

    const data = await res.json();
    const addresses = (data.Answer || [])
      .filter((a: { type: number }) => a.type === 1) // A records only
      .map((a: { data: string }) => a.data)
      .sort();

    return {
      resolver: resolver.name,
      location: resolver.location,
      addresses,
      status: "ok",
      responseMs: Date.now() - start,
    };
  } catch {
    return {
      resolver: resolver.name,
      location: resolver.location,
      addresses: [],
      status: "timeout",
      responseMs: Date.now() - start,
    };
  }
}

export async function checkPropagation(
  domain: string
): Promise<PropagationResult> {
  const results = await Promise.all(
    RESOLVERS.map((r) => queryResolver(r, domain))
  );

  // Check consistency: all successful resolvers return the same IPs
  const successfulResults = results.filter((r) => r.status === "ok" && r.addresses.length > 0);
  const allSame =
    successfulResults.length > 1 &&
    successfulResults.every(
      (r) => JSON.stringify(r.addresses) === JSON.stringify(successfulResults[0].addresses)
    );

  return {
    domain,
    consistent: allSame,
    resolvers: results,
  };
}
