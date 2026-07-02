import { getPublishedWriting } from "@/lib/writing";

// Rendered once at build time — the feed changes only when content is
// committed and the site is redeployed.
export const dynamic = "force-static";

const SITE_URL = "https://bdonaldharris.com";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toPubDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

export async function GET() {
  const entries = await getPublishedWriting();

  const items = entries
    .map((entry) => {
      const url = `${SITE_URL}/writing/${entry.slug}`;

      return [
        "    <item>",
        `      <title>${escapeXml(entry.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(entry.description)}</description>`,
        `      <pubDate>${toPubDate(entry.publishedAt)}</pubDate>`,
        ...entry.tags.map(
          (tag) => `      <category>${escapeXml(tag)}</category>`,
        ),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>B Donald Harris — Writing</title>
    <link>${SITE_URL}/writing</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays, field notes, and working ideas on software construction, responsible architecture, AI-assisted development, and the discipline of building systems humans still understand.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
