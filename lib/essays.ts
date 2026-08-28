import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

// File-based essay archive. Entries live as version-controlled MDX files in
// content/essays/ with YAML frontmatter. Publishing happens through normal
// Git and deployment flow — no database, no CMS, no runtime content backend.

export type EssayStatus = "draft" | "published";

export type EssaySyndication = {
  linkedin?: string;
  devto?: string;
  hashnode?: string;
  medium?: string;
};

export type EssayEntry = {
  title: string;
  slug: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  publishedAt: string;
  status: EssayStatus;
  tags: string[];
  /** Estimated reading time at 200 words per minute. */
  readingMinutes: number;
  /** ISO date string (YYYY-MM-DD). */
  updatedAt?: string;
  featured?: boolean;
  canonicalUrl?: string;
  syndicated?: EssaySyndication;
  series?: string;
  ogImage?: string;
  featuredImage?: string;
};

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");
const READING_WORDS_PER_MINUTE = 200;

// Existing essays predate the featuredImage frontmatter field. Keep this
// compatibility map until their frontmatter is backfilled; new essays should
// declare featuredImage directly.
const FEATURED_IMAGE_MIGRATIONS: Record<string, string> = {
  "ai-gate": "/images/essays/featured/ai-gate-og.jpg",
  "listen-to-the-software-building-with-ai-as-an-act-of-discovery":
    "/images/essays/featured/listen-to-the-software-og-v2.jpg",
  "the-myth-of-general-ai-instructions":
    "/images/essays/featured/the-myth-of-general-ai-instructions.png",
};

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

// YAML parses unquoted dates as Date objects and quoted dates as strings.
// Accept both and normalize to YYYY-MM-DD.
function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return optionalString(value);
}

function estimateReadingMinutes(content: string): number {
  const readableText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~|-]/g, " ");

  const wordCount = readableText.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / READING_WORDS_PER_MINUTE));
}

function toEntry(
  file: string,
  data: Record<string, unknown>,
  content: string,
): EssayEntry {
  const fail = (message: string): never => {
    throw new Error(`content/essays/${file}: ${message}`);
  };

  const title = optionalString(data.title) ?? fail(`"title" is required.`);
  const slug = optionalString(data.slug) ?? fail(`"slug" is required.`);
  const description =
    optionalString(data.description) ?? fail(`"description" is required.`);
  const publishedAt =
    toIsoDate(data.publishedAt) ??
    fail(`"publishedAt" is required (YYYY-MM-DD).`);

  const status = data.status;
  if (status !== "draft" && status !== "published") {
    fail(`"status" must be "draft" or "published".`);
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  if (tags.length === 0) {
    fail(`"tags" must be a non-empty list of strings.`);
  }

  // The article route imports `content/essays/<slug>.mdx` directly, so the
  // filename and frontmatter slug must agree.
  const fileSlug = file.replace(/\.mdx$/, "");
  if (fileSlug !== slug) {
    fail(`frontmatter slug "${slug}" must match the filename.`);
  }

  const syndicated =
    typeof data.syndicated === "object" && data.syndicated !== null
      ? {
          linkedin: optionalString(
            (data.syndicated as Record<string, unknown>).linkedin,
          ),
          devto: optionalString(
            (data.syndicated as Record<string, unknown>).devto,
          ),
          hashnode: optionalString(
            (data.syndicated as Record<string, unknown>).hashnode,
          ),
          medium: optionalString(
            (data.syndicated as Record<string, unknown>).medium,
          ),
        }
      : undefined;

  return {
    title,
    slug,
    description,
    publishedAt,
    status: status as EssayStatus,
    tags,
    readingMinutes: estimateReadingMinutes(content),
    updatedAt: toIsoDate(data.updatedAt),
    featured: data.featured === true,
    canonicalUrl: optionalString(data.canonicalUrl),
    syndicated,
    series: optionalString(data.series),
    ogImage: optionalString(data.ogImage),
    featuredImage:
      optionalString(data.featuredImage) ?? FEATURED_IMAGE_MIGRATIONS[slug],
  };
}

/**
 * All essay entries (drafts included), newest first.
 * Memoized per render pass so pages and generateMetadata share one read.
 */
export const getAllEssays = cache(async (): Promise<EssayEntry[]> => {
  let files: string[];
  try {
    files = await fs.readdir(ESSAYS_DIR);
  } catch {
    return [];
  }

  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(ESSAYS_DIR, file), "utf8");
        const parsed = matter(raw);
        return toEntry(file, parsed.data, parsed.content);
      }),
  );

  return entries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

/** Published entries only, newest first. Drafts never appear here. */
export async function getPublishedEssays(): Promise<EssayEntry[]> {
  const entries = await getAllEssays();
  return entries.filter((entry) => entry.status === "published");
}

/** Look up a single entry by slug. Callers must check `status` before rendering publicly. */
export async function getEssayBySlug(
  slug: string,
): Promise<EssayEntry | undefined> {
  const entries = await getAllEssays();
  return entries.find((entry) => entry.slug === slug);
}

/** Slugs for all publicly routable (published) entries — used by generateStaticParams. */
export async function getAllEssaySlugs(): Promise<string[]> {
  const entries = await getPublishedEssays();
  return entries.map((entry) => entry.slug);
}

/** Published entries flagged `featured: true`, newest first. */
export async function getFeaturedEssays(): Promise<EssayEntry[]> {
  const entries = await getPublishedEssays();
  return entries.filter((entry) => entry.featured);
}

/** Unique tags across published entries, alphabetized. */
export async function getEssayTags(): Promise<string[]> {
  const entries = await getPublishedEssays();
  return [...new Set(entries.flatMap((entry) => entry.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Render an ISO date (YYYY-MM-DD) as long-form editorial text, e.g. "July 2, 2026". */
export function formatEssayDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
