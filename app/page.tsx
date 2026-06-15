import Image from "next/image";
import Link from "next/link";
import homeHeroImage from "@/assets/originals/home-hero.png";
import { ProjectCard } from "@/components/cards/project-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { ideas } from "@/content/ideas";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/projects";
import { speakingTopics } from "@/content/speaking";

const [leadIdea, ...supportingIdeas] = ideas;
const homeIdeas = supportingIdeas.slice(0, 3);
const featuredTopics = speakingTopics.slice(0, 4);
const homeProjectOrder = [
  "notablebit",
  "bit-voices-podcast",
  "bitvoices-network",
  "hindsite",
];
const homeProjects = homeProjectOrder
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="section home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Founder • Builder • Technologist • Ecosystem Architect</p>
          <h1>
            Building for <span className="text-accent">Black builders</span> in the AI era.
          </h1>
          <p>
            I’m B Donald Harris — founder of NotableBIT and host of BIT Voices
            Podcast. I build software, media, and community systems that help
            Black builders move with clarity, context, and ownership.
          </p>
          <div className="button-row">
            <Link className="button-primary" href="/speaking">
              Invite Me to Speak
            </Link>
            <Link className="button-secondary" href="/projects">
              Explore My Work
            </Link>
          </div>
        </div>
        <figure className="hero-portrait">
          <Image
            src={homeHeroImage}
            alt="Portrait of B Donald Harris against a dark cyan and amber editorial background."
            fill
            priority
            sizes="(max-width: 860px) 92vw, 1120px"
          />
        </figure>
      </section>

      <section className="section ecosystem-section">
        <div className="ecosystem-home-map">
          <ContentGrid variant="four">
            {homeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ContentGrid>
        </div>
      </section>

      <section className="section ideas-feature ideas-editorial">
        <div className="ideas-feature-lead">
          <figure className="pull-quote">
            <blockquote>{leadIdea.title}</blockquote>
            <figcaption>{leadIdea.excerpt}</figcaption>
          </figure>
        </div>
        <ul className="idea-rows">
          {homeIdeas.map((idea) => (
            <li key={idea.title}>
              <span className="idea-rows-cat">{idea.category}</span>
              <p className="idea-rows-title">{idea.title}</p>
              <p className="idea-rows-excerpt">{idea.excerpt}</p>
            </li>
          ))}
        </ul>
        <p className="idea-rows-link">
          <Link href="/ideas">Read More Ideas</Link>
        </p>
      </section>

      <section className="section speaking-preview">
        <div className="speaking-card">
          <h2>Discussion Topics</h2>
          <p>
            Focused conversations on AI-era building, Black tech ownership,
            workflow intelligence, and community ecosystems.
          </p>
          <div className="button-row">
            <Link className="button-primary" href="/speaking">
              Invite Me to Speak
            </Link>
          </div>
        </div>
        <ul className="topic-rows">
          {featuredTopics.map((topic) => (
            <li key={topic.title}>
              <span className="topic-rows-title">{topic.title}</span>
              <span className="topic-rows-desc">{topic.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section founder-preview warm-section">
        <div className="founder-preview-heading">
          <h2>Built from engineering, ministry, community, and lived experience.</h2>
        </div>
        <div className="founder-preview-grid">
          <ul className="formed-by-list" aria-label="Formed by">
            <li>Engineering</li>
            <li>Ministry and leadership</li>
            <li>Community building</li>
            <li>Lived experience</li>
            <li>Founder work</li>
          </ul>
          <div className="founder-preview-copy">
            <p>
              My path has moved through more than two decades of software
              engineering, nearly three decades of ministry and leadership,
              founder work, community building, and a late autism diagnosis that
              gave language to patterns I had carried for years. That combination
              shapes how I see systems, people, purpose, and the responsibility of
              building technology that serves more than output.
            </p>
            <Link className="button-secondary" href="/about">
              Read My Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section media-preview">
        <p className="media-preview-note">
          “Selected entry points into the public conversations, podcast work,
          and reflections connected to the broader ecosystem.”
        </p>
        <ul className="media-list">
          {mediaItems.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <span className="media-list-cat">{item.category}</span>
                <span className="media-list-title">{item.title}</span>
                <span className="media-list-desc">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section closing-contact">
        <p>Have a speaking invitation, collaboration idea, or thoughtful conversation to start?</p>
        <Link className="button-primary" href="/contact">
          Contact Me
        </Link>
      </section>
    </main>
  );
}
