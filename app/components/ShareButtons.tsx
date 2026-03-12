"use client";

import { useState } from "react";

export function ShareButtons({
  domain,
  recordCount,
  reportUrl,
}: {
  domain: string;
  recordCount: number;
  reportUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const tweetText = `Found ${recordCount} DNS records for ${domain} using DNS Lookup:`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(reportUrl)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/80 p-4">
      <span className="font-mono text-sm font-medium text-teal-300">
        Share this lookup
      </span>
      <div className="flex gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-lg border border-teal-800 px-4 py-2 font-mono text-sm font-medium text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
