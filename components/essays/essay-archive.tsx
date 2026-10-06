import Image from "next/image";
import Link from "next/link";
import { formatEssayDate, type EssayEntry } from "@/lib/essays";
import styles from "./essay-archive.module.css";

type EssayArchiveProps = {
  entries: EssayEntry[];
  variant: "page" | "sidebar";
  currentSlug?: string;
  featuredSlug?: string;
};

type YearGroup = {
  year: string;
  entries: EssayEntry[];
};

function groupByYear(entries: EssayEntry[]): YearGroup[] {
  const groups = new Map<string, EssayEntry[]>();

  for (const entry of entries) {
    const year = entry.publishedAt.slice(0, 4);
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }

  return Array.from(groups, ([year, groupedEntries]) => ({
    year,
    entries: groupedEntries,
  }));
}

function formatTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

export function EssayArchive({
  entries,
  variant,
  currentSlug,
  featuredSlug,
}: EssayArchiveProps) {
  const groups = groupByYear(entries);
  const currentYear = new Date().getUTCFullYear().toString();

  return (
    <div className={styles.archive} data-variant={variant}>
      {groups.map((group) => (
        <details
          key={group.year}
          className={styles.yearGroup}
          open={
            group.year === currentYear ||
            group.entries.some((entry) => entry.slug === featuredSlug)
          }
        >
          <summary className={styles.yearSummary}>
            <span>{group.year}</span>
            <span className={styles.count}>
              {group.entries.length} {group.entries.length === 1 ? "essay" : "essays"}
            </span>
          </summary>

          <ol className={styles.entries}>
            {group.entries.map((entry) => {
              const isCurrent = entry.slug === currentSlug;
              const isFeatured =
                variant === "page" && entry.slug === featuredSlug;
              const rowContent = (
                <>
                  <div className={styles.entryContent}>
                    {isFeatured && (
                      <p className={styles.featuredEyebrow}>Featured essay</p>
                    )}
                    <div className="writing-entry-meta">
                      <time dateTime={entry.publishedAt}>
                        {formatEssayDate(entry.publishedAt)}
                      </time>
                      {variant === "page" && (
                        <span>{entry.readingMinutes} min read</span>
                      )}
                    </div>
                    <h3>
                      {isCurrent ? (
                        <span aria-current="page">{entry.title}</span>
                      ) : variant === "page" ? (
                        <span>{entry.title}</span>
                      ) : (
                        <Link href={`/essays/${entry.slug}`}>{entry.title}</Link>
                      )}
                    </h3>
                    {variant === "page" && (
                      <p className={styles.tags}>
                        <span className="sr-only">Tags: </span>
                        {entry.tags.map(formatTag).join(" \u00B7 ")}
                      </p>
                    )}
                  </div>
                  {variant === "page" && entry.featuredImage && (
                    <div className={styles.thumbnail}>
                      <Image
                        src={entry.featuredImage}
                        alt=""
                        width={128}
                        height={72}
                        sizes="(max-width: 720px) 0px, (max-width: 960px) 120px, 128px"
                        className={styles.thumbnailImage}
                      />
                    </div>
                  )}
                </>
              );

              return (
                <li
                  key={entry.slug}
                  className={`${styles.entry}${isFeatured ? ` ${styles.featured}` : ""}`}
                >
                  <article>
                    {variant === "page" ? (
                      <Link
                        href={`/essays/${entry.slug}`}
                        className={styles.rowLink}
                      >
                        {rowContent}
                      </Link>
                    ) : (
                      rowContent
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </details>
      ))}
    </div>
  );
}
