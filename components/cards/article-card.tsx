import type { Idea } from "@/content/ideas";

type ArticleCardProps = {
  idea: Idea;
};

export function ArticleCard({ idea }: ArticleCardProps) {
  return (
    <article className="editorial-card article-card">
      <p className="card-meta">{idea.category}</p>
      <h3>{idea.title}</h3>
      <p>{idea.excerpt}</p>
    </article>
  );
}
