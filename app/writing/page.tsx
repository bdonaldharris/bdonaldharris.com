import type { Metadata } from "next";
import Link from "next/link";
import {
  formatWritingDate,
  getPublishedWriting,
  type WritingEntry,
} from "@/lib/writing";
import styles from "./essays.module.css";

const pageDescription =
  "Essays and working notes on the craft of building.";

export const metadata: Metadata = {
  title: "Essays",
  description: pageDescription,
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    type: "website",
    url: "https://bdonaldharris.com/writing",
    title: "Essays | B Donald Harris",
    description: pageDescription,
  },
};

function EntryMeta({ entry }: { entry: WritingEntry }) {
  return (
    <div className="writing-entry-meta">
      <time dateTime={entry.publishedAt}>
        {formatWritingDate(entry.publishedAt)}
      </time>
      {entry.updatedAt && entry.updatedAt !== entry.publishedAt && (
        <span className="writing-updated">
          Updated{" "}
          <time dateTime={entry.updatedAt}>
            {formatWritingDate(entry.updatedAt)}
          </time>
        </span>
      )}
    </div>
  );
}

// Capitalizes only the tag's first character, preserving the rest as
// authored (so "AI-assisted development" is untouched but "architecture"
// reads as "Architecture").
function formatTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

// Restrained inline metadata, not a control: tags here are informative only
// (no tag pages exist yet), so they're rendered as plain dot-separated text
// rather than list items styled like buttons/pills.
function EntryTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <p className="writing-tags-meta">
      <span className="sr-only">Tags: </span>
      {tags.map(formatTag).join(" \u00B7 ")}
    </p>
  );
}

export default async function WritingPage() {
  const entries = await getPublishedWriting();
  const featured = entries.find((entry) => entry.featured);
  const archive = featured
    ? entries.filter((entry) => entry.slug !== featured.slug)
    : entries;

  return (
    <main className="page-shell writing-page">
      <section className="section writing-hero">
        <div className="writing-hero-copy">
          <h1>Essays</h1>
          <p>Essays and working notes on the craft of building.</p>
        </div>
      </section>

      {entries.length === 0 ? (
        <section className="section writing-empty-section">
          <div className="writing-empty">
            <h2>The archive begins here.</h2>
            <p>
              No published essays yet — the first pieces are being written.
              When they land, this is where they will live.
            </p>
          </div>
        </section>
      ) : (
        <>
          {featured && (
            <section
              className="section writing-featured-section"
              aria-labelledby="featured-writing"
            >
              <article className="writing-featured">
                <p className="eyebrow eyebrow-gold">Featured essay</p>
                <h2 id="featured-writing">
                  <Link href={`/writing/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="writing-featured-desc">{featured.description}</p>
                <EntryMeta entry={featured} />
                <EntryTags tags={featured.tags} />
                <p className="writing-featured-link">
                  <Link href={`/writing/${featured.slug}`}>
                    Read the essay
                  </Link>
                </p>
              </article>
            </section>
          )}

          {archive.length > 0 && (
            <section
              className="section writing-archive-section"
              aria-labelledby="writing-archive"
            >
              <header className="writing-section-head">
                <h2 id="writing-archive">Archive</h2>
              </header>
              <ol className={`writing-list ${styles.archiveList}`}>
                {archive.map((entry) => (
                  <li key={entry.slug}>
                    <article className={`writing-entry ${styles.archiveEntry}`}>
                      <EntryMeta entry={entry} />
                      <h3>
                        <Link href={`/writing/${entry.slug}`}>
                          {entry.title}
                        </Link>
                      </h3>
                      <EntryTags tags={entry.tags} />
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </>
      )}
    </main>
  );
}
