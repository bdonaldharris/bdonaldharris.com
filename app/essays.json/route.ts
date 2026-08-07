import { getPublishedEssays } from "@/lib/essays";

// Canonical machine-readable source for published essays. Rendered once at
// build time from content/essays/*.mdx — the same source of truth the /essays
// routes use — so it changes only when content is committed and redeployed.
export const dynamic = "force-static";

const SITE_URL = "https://bdonaldharris.com";

export async function GET() {
  // getPublishedEssays() already excludes drafts and sorts newest first.
  const entries = await getPublishedEssays();

  const essays = entries.map((entry) => ({
    title: entry.title,
    slug: entry.slug,
    url: `${SITE_URL}/essays/${entry.slug}`,
    publishedAt: entry.publishedAt,
    summary: entry.description,
    tags: entry.tags,
  }));

  return Response.json(essays, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
