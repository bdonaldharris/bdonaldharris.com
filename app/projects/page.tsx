import type { Metadata } from "next";
import Image from "next/image";
import { ProjectCard } from "@/components/cards/project-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the connected body of work across NotableBIT, BIT Voices Podcast, BitVoices Network, and HindSite.",
};

function ecosystemLayer(category: string) {
  return /community|media|podcast/i.test(category) ? "human" : "tech";
}

export default function ProjectsPage() {
  return (
    <main className="page-shell projects-page">
      <section className="section page-hero projects-hero" aria-labelledby="projects-hero-title">
        <div className="page-hero-copy">
          <h1 id="projects-hero-title">
            One mission. Multiple vehicles. Built{" "}
            <span className="text-accent">over time</span>.
          </h1>
          <p>
            A founder-led body of work spanning company, media, community, and
            workflow intelligence — aligned vehicles serving a shared
            builder-centered mission rather than disconnected ideas.
          </p>
        </div>
        <div className="projects-hero-image" aria-hidden="true">
          <Image
            src="/images/projects-hero.webp"
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 860px) 0px, 46vw"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="built-in-sequence">
        <div className="projects-section-heading">
          <h2 id="built-in-sequence">Built in sequence</h2>
          <p>
            Each project has its own role, but the work points toward clarity,
            context, ownership, and durable pathways for Black builders.
          </p>
        </div>
        <ContentGrid variant="four">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} showLogo />
          ))}
        </ContentGrid>
      </section>

      <section className="section ecosystem-map-section" aria-labelledby="ecosystem-map">
        <div className="projects-section-heading">
          <h2 id="ecosystem-map">How the ecosystem connects</h2>
        </div>
        <ol className="ecosystem-flow" aria-hidden="true">
          <li className="flow-node flow-origin">
            <span className="flow-dot" />
            <div className="flow-card">
              <span className="flow-step">Start</span>
              <span className="flow-name">B Donald Harris</span>
              <span className="flow-role">Founder &amp; mission</span>
            </div>
          </li>
          {projects.map((project, index) => (
            <li
              className={`flow-node${
                index === projects.length - 1 ? " flow-node-current" : ""
              }`}
              data-layer={ecosystemLayer(project.category)}
              key={project.id}
            >
              <span className="flow-dot" />
              <div className="flow-card">
                <span className="flow-step">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flow-name">{project.title}</span>
                <span className="flow-role">{project.category}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="ecosystem-caption">
          B Donald Harris sits at the narrative center. NotableBIT carries the
          company and studio layer. BIT Voices Podcast, BitVoices Network, and
          HindSite extend the work into media, community, and product.
        </p>
        <p className="sr-only">
          B Donald Harris is the public founder and narrative center. NotableBIT
          is the company and studio home. BIT Voices Podcast carries
          conversations with Black technologists, founders, builders, and
          leaders. BitVoices Network is growing as a community and media
          ecosystem for Black builders. HindSite is being built as workflow
          intelligence for builders.
        </p>
      </section>
    </main>
  );
}
