import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the connected body of work across NotableBIT, BIT Voices Podcast, BitVoices Network, and HindSite.",
};

export default function ProjectsPage() {
  return (
    <main className="page-shell projects-page">
      <section className="projects-layout" aria-labelledby="projects-title">
        <div className="projects-introduction">
          <h1 id="projects-title">What I’m building.</h1>
          <p>
            I build companies, media, communities, and tools around a shared
            goal: helping Black builders participate in technology with greater
            visibility, context, ownership, and opportunity.
          </p>
        </div>

        <div className="projects-list-rows">
          {projects.map((project) => (
            <article className="project-row" key={project.id}>
              <a
                className="project-row-identity"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="project-row-logo"
                  src={project.logo}
                  alt=""
                  width={56}
                  height={56}
                  sizes="56px"
                />
                <div>
                  <p className="project-row-category">{project.category}</p>
                  <h2>{project.title}</h2>
                </div>
              </a>
              <p className="project-row-description">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
