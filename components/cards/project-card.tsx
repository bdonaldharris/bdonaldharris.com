import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  showLogo?: boolean;
};

export function ProjectCard({ project, showLogo = false }: ProjectCardProps) {
  const layer = /community|media|podcast/i.test(project.category)
    ? "human"
    : "tech";
  const isExternal = project.href.startsWith("http");

  return (
    <article
      className="editorial-card project-card"
      id={project.id}
      data-layer={layer}
    >
      {showLogo && (
        <span className="project-card-logo" aria-hidden="true">
          <Image src={project.logo} alt="" width={128} height={128} />
        </span>
      )}
      <p className="card-meta">{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-footer">
        <span>{project.status}</span>
        <Link
          href={project.href}
          aria-label={`Explore ${project.title}`}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          Explore
        </Link>
      </div>
    </article>
  );
}
