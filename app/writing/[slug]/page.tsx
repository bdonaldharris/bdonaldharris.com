import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatWritingDate,
  getAllWritingSlugs,
  getWritingBySlug,
} from "@/lib/writing";

type Props = {
  params: Promise<{ slug: string }>;
};

// Only published entries are prerendered; everything else (including drafts)
// is a 404. Publishing is a Git commit, not a runtime concern.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllWritingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWritingBySlug(slug);

  if (!entry || entry.status !== "published") {
    return {};
  }

  const url = `https://bdonaldharris.com/writing/${entry.slug}`;

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

export default async function WritingArticlePage({ params }: Props) {
  const { slug } = await params;
  const entry = await getWritingBySlug(slug);

  if (!entry || entry.status !== "published") {
    notFound();
  }

  const { default: Article } = await import(`@/content/writing/${slug}.mdx`);

  return (
    <main className="page-shell writing-article-page">
      <article className="section writing-article">
        <header className="writing-article-header">
          <p className="writing-back">
            <Link href="/writing">Writing</Link>
          </p>
          <h1>{entry.title}</h1>
          <p className="writing-article-deck">{entry.description}</p>
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
          <ul className="writing-tags" aria-label="Tags">
            {entry.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <div className="writing-article-body">
          <Article />
        </div>

        <footer className="writing-article-footer">
          <Link href="/writing">Back to Writing</Link>
        </footer>
      </article>
    </main>
  );
}
