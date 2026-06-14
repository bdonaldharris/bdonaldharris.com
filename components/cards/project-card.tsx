import Link from "next/link";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const layer = /community|media|podcast/i.test(project.category)
    ? "human"
    : "tech";

  return (
    <article
      className="editorial-card project-card"
      id={project.id}
      data-layer={layer}
    >
      <p className="card-meta">{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-footer">
        <span>{project.status}</span>
        <Link href={project.href} aria-label={`Explore ${project.title}`}>
          Explore
        </Link>
      </div>
    </article>
  );
}
