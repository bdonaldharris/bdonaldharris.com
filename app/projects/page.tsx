import type { Metadata } from "next";
import Image from "next/image";
import { GitHubContributionGraph } from "@/components/projects/github-contribution-graph";
import { curatedRepositories } from "@/content/github";
import { projects } from "@/content/projects";
import { getGitHubContributionWeeks } from "@/lib/github-contributions";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the connected body of work across NotableBIT, BIT Voices Podcast, BitVoices Network, and HindSite.",
};

export default async function ProjectsPage() {
  const contributionWeeks = await getGitHubContributionWeeks();

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

      <section className="github-section" aria-labelledby="github-title">
        <div className="github-layout">
          <div className="github-introduction">
            <h2 id="github-title">The Workbench</h2>
          </div>

          {contributionWeeks && <GitHubContributionGraph weeks={contributionWeeks} />}
          <div
            className={`github-repository-shelf${contributionWeeks ? "" : " github-repository-shelf-no-graph"}`}
          >
            {curatedRepositories.map((repository) => (
              <article className="github-repository" key={repository.href}>
                <h3>
                  <a href={repository.href} target="_blank" rel="noopener noreferrer">
                    {repository.name}
                  </a>
                  <span className="github-repository-category">{repository.category}</span>
                </h3>
                <p className="github-repository-description">{repository.description}</p>
                <p className="github-repository-technologies">
                  {repository.technologies.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
