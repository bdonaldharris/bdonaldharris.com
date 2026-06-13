type InsightCardProps = {
  title: string;
  excerpt: string;
  category?: string;
};

export function InsightCard({ title, excerpt, category }: InsightCardProps) {
  return (
    <article className="editorial-card insight-card">
      {category && <p className="card-meta">{category}</p>}
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </article>
  );
}
