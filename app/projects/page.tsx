import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the connected body of work across NotableBIT, HindSite, BitVoices Network, and BIT Voices Podcast.",
};

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Projects"
        title={
          <>
            A connected body of work across software, media, community, and{" "}
            <span className="text-accent">AI-era building</span>.
          </>
        }
        body="The projects are aligned vehicles rather than disconnected ideas: company work, workflow intelligence, community/media infrastructure, and public conversations serving a shared builder-centered mission."
        motif="orbit"
        primaryCta={{ href: "/contact", label: "Collaborate" }}
        secondaryCta={{ href: "/ideas", label: "Read the Ideas" }}
      />

      <section className="section" aria-labelledby="project-cards">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Aligned vehicles"
          body="Each project has its own role, but the work points toward clarity, context, ownership, and durable pathways for Black builders."
        />
        <span id="project-cards" className="sr-only">
          Project cards
        </span>
        <ContentGrid variant="four">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ContentGrid>
      </section>

      <section className="section ecosystem-map-section" aria-labelledby="ecosystem-map">
        <SectionHeading
          eyebrow="Map"
          title="How the ecosystem connects"
          body="B Donald Harris sits at the narrative center. NotableBIT carries the company and studio layer. HindSite, BitVoices Network, and BIT Voices Podcast extend the work into product, community, and media."
        />
        <div className="ecosystem-map" aria-hidden="true">
          <svg
            className="ecosystem-traces"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <linearGradient id="trace-cyan" x1="50%" y1="50%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="trace-gold" x1="50%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d6a94a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d6a94a" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <line x1="50" y1="50" x2="21" y2="20" stroke="url(#trace-cyan)" strokeWidth="0.4" />
            <line x1="50" y1="50" x2="80" y2="21" stroke="url(#trace-cyan)" strokeWidth="0.4" />
            <line x1="50" y1="50" x2="81" y2="81" stroke="url(#trace-gold)" strokeWidth="0.4" />
            <line x1="50" y1="50" x2="20" y2="81" stroke="url(#trace-gold)" strokeWidth="0.4" />
          </svg>
          <div className="ecosystem-node ecosystem-node-center">
            <span>B Donald Harris</span>
            <small>Founder / builder</small>
          </div>
          {projects.map((project, index) => (
            <div
              className={`ecosystem-node ecosystem-node-${index + 1}`}
              data-layer={
                index === 0 || index === 1 ? "tech" : "human"
              }
              key={project.id}
            >
              <span>{project.title}</span>
              <small>{project.category}</small>
            </div>
          ))}
        </div>
        <div className="map-text-equivalent">
          <h3>Text version of the ecosystem map</h3>
          <p>
            B Donald Harris is the public founder and narrative center.
            NotableBIT is the company and studio home. HindSite is being built
            as workflow intelligence for builders. BitVoices Network is growing
            as a community and media ecosystem for Black builders. BIT Voices
            Podcast carries conversations with Black technologists, founders,
            builders, and leaders.
          </p>
        </div>
      </section>

      <section className="section connection-section">
        <div>
          <p className="eyebrow">Throughline</p>
          <h2>One founder. One mission. Multiple aligned vehicles.</h2>
        </div>
        <div>
          <p>
            The work connects through builder ownership, AI-era workflow
            clarity, community as culture, media that tells stronger stories,
            and systems that preserve context instead of only celebrating
            output.
          </p>
          <Link className="button-secondary" href="/about">
            Read the Founder Story
          </Link>
        </div>
      </section>

      <section className="section explore-links" aria-labelledby="explore-links">
        <SectionHeading eyebrow="Explore" title="Explore the work" />
        <ul id="explore-links">
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={project.href}>{project.title}</Link>
              <span>{project.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <CTASection
        eyebrow="Partnership"
        title="Bring context to the work before the work gets bigger."
        body="For aligned partnerships, strategic technology conversations, media inquiries, and speaking invitations, start with the contact path."
        motif="orbit"
        primaryCta={{ href: "/contact", label: "Contact Me" }}
        secondaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
      />
    </main>
  );
}
