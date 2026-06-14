import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ideas } from "@/content/ideas";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/projects";
import { speakingTopics } from "@/content/speaking";

const [leadIdea, ...supportingIdeas] = ideas;
const homeIdeas = supportingIdeas.slice(0, 3);
const featuredTopics = speakingTopics.slice(0, 4);

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="section home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Founder • Builder • Technologist • Ecosystem Architect</p>
          <h1>
            Building tools, platforms, and conversations for{" "}
            <span className="text-accent">Black builders</span> in the AI era.
          </h1>
          <p>
            I’m B Donald Harris — founder of NotableBIT, creator of HindSite,
            and host of BIT Voices. I build at the intersection of software,
            media, community, and practical AI adoption, with a focus on helping
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
          <div className="hero-portrait-atmosphere" aria-hidden="true" />
          <Image
            src="/images/profile-photo-one-web.jpg"
            alt="Portrait of B Donald Harris, founder, builder, and technologist."
            fill
            priority
            sizes="(max-width: 860px) 92vw, 480px"
          />
        </figure>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Ecosystem"
          title="The work is connected."
          body="My work spans products, platforms, media, and community — but the mission is consistent: help builders preserve context, tell better stories, build stronger systems, and create ownership."
        />
        <ContentGrid variant="four">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ContentGrid>
      </section>

      <section className="section ideas-feature">
        <div className="ideas-feature-lead">
          <p className="eyebrow">Ideas</p>
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
          <li className="idea-rows-link">
            <Link href="/ideas">Read more ideas</Link>
          </li>
        </ul>
      </section>

      <section className="section speaking-preview section-split">
        <div>
          <SectionHeading
            eyebrow="Speaking"
            title="Speaking on AI, ownership, and the future of Black tech."
            body="I speak and facilitate conversations on the realities of building in the AI era — engineering workflows, Black tech ownership, community ecosystems, and the human side of innovation."
          />
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
        <div>
          <p className="eyebrow eyebrow-gold">Founder Story</p>
          <h2>Built from engineering, ministry, community, and lived experience.</h2>
        </div>
        <div>
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
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Media"
          title="Recent conversations and reflections."
          body="Selected entry points into the public conversations, podcast work, and reflections connected to the broader ecosystem."
        />
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

      <CTASection
        eyebrow="Next Step"
        title="Let’s build with clarity, context, and ownership."
        body="Whether you are inviting me to speak, exploring a partnership, or following the work I’m building through NotableBIT, BitVoices, and HindSite — this is the front door."
        motif="orbit"
        primaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/contact", label: "Contact Me" }}
      />
    </main>
  );
}
