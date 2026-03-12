export interface ResolverResult {
  resolver: string;
  name: string;
  addresses: string[];
  error?: string;
}

export interface PropagationResult {
  results: ResolverResult[];
  consistent: boolean;
}

const RESOLVERS = [
  {
    name: "Cloudflare",
    url: "https://cloudflare-dns.com/dns-query",
  },
  {
    name: "Google",
    url: "https://dns.google/resolve",
  },
  {
    name: "Quad9",
    url: "https://dns.quad9.net:5053/dns-query",
  },
  {
    name: "OpenDNS",
    url: "https://doh.opendns.com/dns-query",
  },
];

async function queryResolver(
  resolverUrl: string,
  resolverName: string,
  domain: string
): Promise<ResolverResult> {
  try {
    const url = `${resolverUrl}?name=${encodeURIComponent(domain)}&type=A`;
    const res = await fetch(url, {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return { resolver: resolverUrl, name: resolverName, addresses: [], error: `HTTP ${res.status}` };
    }

    const data = await res.json();

    const addresses = (data.Answer || [])
      .filter((a: { type: number }) => a.type === 1) // A records only
      .map((a: { data: string }) => a.data)
      .sort();

    return { resolver: resolverUrl, name: resolverName, addresses };
  } catch {
    return { resolver: resolverUrl, name: resolverName, addresses: [], error: "Timeout" };
  }
}

export async function checkPropagation(
  domain: string
): Promise<PropagationResult> {
  const results = await Promise.all(
    RESOLVERS.map((r) => queryResolver(r.url, r.name, domain))
  );

  // Check consistency: all resolvers with addresses should return the same set
  const withAddresses = results.filter((r) => r.addresses.length > 0);
  let consistent = true;
  if (withAddresses.length >= 2) {
    const first = withAddresses[0].addresses.join(",");
    consistent = withAddresses.every((r) => r.addresses.join(",") === first);
  }

  return { results, consistent };
}
