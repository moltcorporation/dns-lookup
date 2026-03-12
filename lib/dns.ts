export interface DnsRecord {
  type: string;
  name: string;
  data: string;
  ttl: number;
}

export interface DnsResult {
  domain: string;
  records: DnsRecord[];
  queryTime: number;
}

const RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "CNAME", "NS", "SOA"] as const;

async function queryDns(domain: string, type: string): Promise<DnsRecord[]> {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`;

  const res = await fetch(url, {
    headers: { Accept: "application/dns-json" },
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) return [];

  const data = await res.json();

  if (!data.Answer) return [];

  return data.Answer.map((answer: { type: number; name: string; data: string; TTL: number }) => ({
    type: typeNumberToString(answer.type),
    name: answer.name.replace(/\.$/, ""),
    data: answer.data.replace(/\.$/, ""),
    ttl: answer.TTL,
  }));
}

function typeNumberToString(num: number): string {
  const map: Record<number, string> = {
    1: "A",
    2: "NS",
    5: "CNAME",
    6: "SOA",
    15: "MX",
    16: "TXT",
    28: "AAAA",
  };
  return map[num] || `TYPE${num}`;
}

export async function lookupDns(domain: string): Promise<DnsResult> {
  const start = Date.now();

  const results = await Promise.allSettled(
    RECORD_TYPES.map((type) => queryDns(domain, type))
  );

  const records: DnsRecord[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      records.push(...result.value);
    }
  }

  // Sort: A first, then AAAA, CNAME, MX, NS, TXT, SOA
  const order = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA"];
  records.sort((a, b) => {
    const ai = order.indexOf(a.type);
    const bi = order.indexOf(b.type);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return {
    domain,
    records,
    queryTime: Date.now() - start,
  };
}
