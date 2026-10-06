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

    </main>
  );
}
