import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EssayArchive } from "@/components/essays/essay-archive";
import { ideaLanes } from "@/content/ideas";
import { formatEssayDate, getPublishedEssays } from "@/lib/essays";
import styles from "./featured-polish.module.css";

const pageDescription =
  "Essays, reflections, and working ideas on AI, builder discipline, Black tech ownership, community, neurodivergence, and the systems behind meaningful work.";

export const metadata: Metadata = {
  title: "Essays",
  description: pageDescription,
  alternates: {
    canonical: "/essays",
  },
  openGraph: {
    type: "website",
    url: "https://bdonaldharris.com/essays",
    title: "Essays | B Donald Harris",
    description: pageDescription,
  },
};

function formatTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

export default async function EssaysPage() {
  const entries = await getPublishedEssays();
  const featured = entries.find((entry) => entry.featured);
  const archive = featured
    ? entries.filter((entry) => entry.slug !== featured.slug)
    : entries;

  return (
    <main className="page-shell writing-page">
      <section className="section writing-hero">
        <div className="writing-hero-copy">
          <h1>Essays</h1>
          <p>{pageDescription}</p>
        </div>
        <div className="writing-hero-artifact">
          <Image
            src="/images/essays-sketchbook.png"
            alt="An engineer's sketchbook showing the beginning of a builder's journey."
            width={900}
            height={700}
            priority
          />
        </div>
      </section>

      {featured && (
        <section
          className="section writing-featured-section"
          aria-labelledby="featured-writing"
        >
          <article className={`writing-featured ${styles.featuredCard}`}>
            <p className={`eyebrow eyebrow-gold ${styles.featuredEyebrow}`}>
              Featured essay
            </p>
            <h2 id="featured-writing" className={styles.featuredTitle}>
              <Link href={`/essays/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="writing-featured-desc">{featured.description}</p>
            <div className="writing-entry-meta">
              <time dateTime={featured.publishedAt}>
                {formatEssayDate(featured.publishedAt)}
              </time>
              <span>{featured.readingMinutes} min read</span>
              {featured.updatedAt && featured.updatedAt !== featured.publishedAt && (
                <span className="writing-updated">
                  Updated <time dateTime={featured.updatedAt}>{formatEssayDate(featured.updatedAt)}</time>
                </span>
              )}
            </div>
            <p className="writing-tags-meta">
              <span className="sr-only">Tags: </span>
              {featured.tags.map(formatTag).join(" · ")}
            </p>
            <p className={`writing-featured-link ${styles.featuredCta}`}>
              <Link href={`/essays/${featured.slug}`}>Read the essay</Link>
            </p>
          </article>
        </section>
      )}

      <section className="section ideas-lanes-section">
        <header className="ideas-section-head">
          <h2>Recurring Themes</h2>
          <p>
            The recurring themes underneath the work — what I keep writing,
            building, and speaking toward.
          </p>
        </header>
        <ol className="idea-lanes">
          {ideaLanes.map((lane) => (
            <li key={lane.title}>
              <div className="idea-lane-copy">
                <h3>{lane.title}</h3>
                <p>{lane.description}</p>
              </div>
            </li>
          ))}
        </ol>
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
        archive.length > 0 && (
          <section
            className="section writing-archive-section"
            aria-labelledby="essays-list"
          >
            <header className="writing-section-head">
              <h2 id="essays-list">Essays</h2>
            </header>
            <EssayArchive entries={archive} variant="page" />
          </section>
        )
      )}
    </main>
  );
}
