import Link from "next/link";
import { formatWritingDate, type WritingEntry } from "@/lib/writing";
import styles from "./essay-archive.module.css";

type EssayArchiveProps = {
  entries: WritingEntry[];
  variant: "page" | "sidebar";
  currentSlug?: string;
};

type YearGroup = {
  year: string;
  entries: WritingEntry[];
};

function groupByYear(entries: WritingEntry[]): YearGroup[] {
  const groups = new Map<string, WritingEntry[]>();

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
}: EssayArchiveProps) {
  const groups = groupByYear(entries);
  const currentYear = new Date().getUTCFullYear().toString();

  return (
    <div className={styles.archive} data-variant={variant}>
      {groups.map((group) => (
        <details
          key={group.year}
          className={styles.yearGroup}
          open={group.year === currentYear}
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

              return (
                <li key={entry.slug} className={styles.entry}>
                  <article>
                    <div className="writing-entry-meta">
                      <time dateTime={entry.publishedAt}>
                        {formatWritingDate(entry.publishedAt)}
                      </time>
                      {variant === "page" && (
                        <span>{entry.readingMinutes} min read</span>
                      )}
                    </div>
                    <h3>
                      {isCurrent ? (
                        <span aria-current="page">{entry.title}</span>
                      ) : (
                        <Link href={`/writing/${entry.slug}`}>{entry.title}</Link>
                      )}
                    </h3>
                    {variant === "page" && (
                      <p className={styles.tags}>
                        <span className="sr-only">Tags: </span>
                        {entry.tags.map(formatTag).join(" \u00B7 ")}
                      </p>
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
