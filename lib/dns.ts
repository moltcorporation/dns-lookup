export type RecordType = "A" | "AAAA" | "MX" | "TXT" | "CNAME" | "NS" | "SOA";

export interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DnsResponse {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: { name: string; type: number }[];
  Answer?: DnsRecord[];
  Authority?: DnsRecord[];
}

export interface RecordGroup {
  type: RecordType;
  typeName: string;
  description: string;
  records: DnsRecord[];
}

export interface DnsIssue {
  severity: "warn" | "info";
  message: string;
}

export interface LookupResult {
  domain: string;
  groups: RecordGroup[];
  issues: DnsIssue[];
  totalRecords: number;
}

const RECORD_TYPES: { type: RecordType; code: number; name: string; description: string }[] = [
  { type: "A", code: 1, name: "A (IPv4)", description: "IPv4 addresses your domain points to" },
  { type: "AAAA", code: 28, name: "AAAA (IPv6)", description: "IPv6 addresses your domain points to" },
  { type: "CNAME", code: 5, name: "CNAME", description: "Canonical name aliases for your domain" },
  { type: "MX", code: 15, name: "MX (Mail)", description: "Mail servers that handle email for your domain" },
  { type: "TXT", code: 16, name: "TXT", description: "Text records including SPF, DKIM, and verification" },
  { type: "NS", code: 2, name: "NS (Nameserver)", description: "Authoritative nameservers for your domain" },
  { type: "SOA", code: 6, name: "SOA", description: "Start of authority — primary nameserver and zone info" },
];

async function queryDns(domain: string, type: RecordType): Promise<DnsRecord[]> {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`;
  const res = await fetch(url, {
    headers: { Accept: "application/dns-json" },
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) return [];

  const data: DnsResponse = await res.json();
  return data.Answer || [];
}

function detectIssues(groups: RecordGroup[], domain: string): DnsIssue[] {
  const issues: DnsIssue[] = [];

  const aRecords = groups.find((g) => g.type === "A");
  const aaaaRecords = groups.find((g) => g.type === "AAAA");
  if (!aRecords?.records.length && !aaaaRecords?.records.length) {
    issues.push({
      severity: "warn",
      message: "No A or AAAA records found. This domain may not resolve to any IP address.",
    });
  }

  const mxRecords = groups.find((g) => g.type === "MX");
  if (!mxRecords?.records.length) {
    issues.push({
      severity: "warn",
      message: "No MX records found. This domain cannot receive email.",
    });
  }

  const txtRecords = groups.find((g) => g.type === "TXT");
  const hasSPF = txtRecords?.records.some((r) => r.data.includes("v=spf1"));
  if (!hasSPF) {
    issues.push({
      severity: "warn",
      message: "No SPF record found in TXT records. Email from this domain may be marked as spam.",
    });
  }

  const hasDMARC = txtRecords?.records.some((r) => r.data.includes("v=DMARC1"));
  if (!hasDMARC) {
    issues.push({
      severity: "info",
      message: "No DMARC record found. Consider adding _dmarc." + domain + " TXT record for email authentication.",
    });
  }

  const nsRecords = groups.find((g) => g.type === "NS");
  if (nsRecords && nsRecords.records.length === 1) {
    issues.push({
      severity: "warn",
      message: "Only one nameserver found. Add a secondary NS for redundancy.",
    });
  }

  const allRecords = groups.flatMap((g) => g.records);
  const lowTTL = allRecords.filter((r) => r.TTL < 300 && r.TTL > 0);
  if (lowTTL.length > 0) {
    issues.push({
      severity: "info",
      message: `${lowTTL.length} record(s) have TTL below 5 minutes. This increases DNS query volume.`,
    });
  }

  return issues;
}

export async function lookupDomain(domain: string): Promise<LookupResult> {
  const results = await Promise.allSettled(
    RECORD_TYPES.map(async (rt) => ({
      ...rt,
      records: await queryDns(domain, rt.type),
    }))
  );

  const groups: RecordGroup[] = results
    .filter((r): r is PromiseFulfilledResult<RecordGroup & { code: number; name: string }> => r.status === "fulfilled")
    .map((r) => ({
      type: r.value.type,
      typeName: r.value.name,
      description: r.value.description,
      records: r.value.records,
    }));

  const totalRecords = groups.reduce((sum, g) => sum + g.records.length, 0);
  const issues = detectIssues(groups, domain);

  return { domain, groups, issues, totalRecords };
}
