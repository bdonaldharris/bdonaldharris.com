import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayArchive } from "@/components/essays/essay-archive";
import {
  formatEssayDate,
  getAllEssaySlugs,
  getEssayBySlug,
  getPublishedEssays,
} from "@/lib/essays";
import styles from "./article.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

// Only published entries are prerendered; everything else (including drafts)
// is a 404. Publishing is a Git commit, not a runtime concern.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllEssaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEssayBySlug(slug);

  if (!entry || entry.status !== "published") {
    return {};
  }

  const url = `https://bdonaldharris.com/essays/${entry.slug}`;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.tags,
    alternates: {
      canonical: entry.canonicalUrl ?? url,
    },
    openGraph: {
      type: "article",
      url,
      title: entry.title,
      description: entry.description,
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
      tags: entry.tags,
      ...(entry.ogImage ? { images: [{ url: entry.ogImage }] } : {}),
    },
  };
}

export default async function EssayArticlePage({ params }: Props) {
  const { slug } = await params;
  const [entry, entries] = await Promise.all([
    getEssayBySlug(slug),
    getPublishedEssays(),
  ]);

  if (!entry || entry.status !== "published") {
    notFound();
  }

  const { default: Article } = await import(`@/content/essays/${slug}.mdx`);

  return (
    <main className="page-shell writing-article-page">
      <article className="section writing-article">
        <div
          className={
            entry.featuredImage
              ? styles.headerLayout
              : styles.headerLayoutWithoutImage
          }
        >
          <header className="writing-article-header">
            <p className="writing-back">
              <Link href="/essays">Essays</Link>
            </p>
            <h1 className={styles.articleTitle}>{entry.title}</h1>
            <p className="writing-article-deck">{entry.description}</p>
            <div className="writing-entry-meta">
              <time dateTime={entry.publishedAt}>
                {formatEssayDate(entry.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{entry.readingMinutes} min read</span>
              {entry.updatedAt && entry.updatedAt !== entry.publishedAt && (
                <span className="writing-updated">
                  Updated{" "}
                  <time dateTime={entry.updatedAt}>
                    {formatEssayDate(entry.updatedAt)}
                  </time>
                </span>
              )}
            </div>
            <ul className="writing-tags" aria-label="Tags">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </header>

          {entry.featuredImage && (
            <div className={styles.featuredImage}>
              <Image
                src={entry.featuredImage}
                alt=""
                fill
                sizes="(max-width: 1040px) 100vw, 42vw"
                priority
              />
            </div>
          )}
        </div>

        <div className={styles.articleLayout}>
          <div className={styles.articleMain}>
            <div className="writing-article-body">
              <Article />
            </div>

            <footer className="writing-article-footer">
              <Link href="/essays">Back to Essays</Link>
            </footer>
          </div>

          <aside className={styles.sidebar} aria-labelledby="essay-archive-title">
            <h2 id="essay-archive-title">Essay archive</h2>
            <EssayArchive
              entries={entries}
              variant="sidebar"
              currentSlug={entry.slug}
            />
          </aside>
        </div>
      </article>
    </main>
  );
}
