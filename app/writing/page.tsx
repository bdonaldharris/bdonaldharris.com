import type { Metadata } from "next";
import Link from "next/link";
import { EssayArchive } from "@/components/writing/essay-archive";
import { formatWritingDate, getPublishedWriting } from "@/lib/writing";

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

function formatTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
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
                <div className="writing-entry-meta">
                  <time dateTime={featured.publishedAt}>
                    {formatWritingDate(featured.publishedAt)}
                  </time>
                  {featured.updatedAt &&
                    featured.updatedAt !== featured.publishedAt && (
                      <span className="writing-updated">
                        Updated{" "}
                        <time dateTime={featured.updatedAt}>
                          {formatWritingDate(featured.updatedAt)}
                        </time>
                      </span>
                    )}
                </div>
                <p className="writing-tags-meta">
                  <span className="sr-only">Tags: </span>
                  {featured.tags.map(formatTag).join(" \u00B7 ")}
                </p>
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
              <EssayArchive entries={archive} variant="page" />
            </section>
          )}
        </>
      )}
    </main>
  );
}
