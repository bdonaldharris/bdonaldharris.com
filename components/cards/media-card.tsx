import Link from "next/link";
import type { MediaItem } from "@/content/media";

type MediaCardProps = {
  item: MediaItem;
};

export function MediaCard({ item }: MediaCardProps) {
  return (
    <article className="editorial-card media-card">
      <p className="card-meta">{item.category}</p>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="card-footer">
        {item.status && <span>{item.status}</span>}
        <Link href={item.href} aria-label={`View ${item.title}`}>
          View
        </Link>
      </div>
    </article>
  );
}
