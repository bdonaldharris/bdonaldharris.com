import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/cards/article-card";
import { MediaCard } from "@/components/cards/media-card";
import { ProjectCard } from "@/components/cards/project-card";
import { SpeakingTopicCard } from "@/components/cards/speaking-topic-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ideas } from "@/content/ideas";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/projects";
import { speakingTopics } from "@/content/speaking";

const featuredIdeas = ideas.slice(0, 4);
const featuredTopics = speakingTopics.slice(0, 3);

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="section home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Founder • Builder • Technologist • Ecosystem Architect</p>
          <h1>Building tools, platforms, and conversations for Black builders in the AI era.</h1>
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
        <div className="hero-visual" aria-label="Abstract network visual representing connected builder workflows">
          <Image
            src="/images/architectural-noir-signal.png"
            alt="Abstract dark editorial network of luminous workflow traces and connected signal nodes."
            fill
            priority
            sizes="(max-width: 860px) 100vw, 42vw"
          />
        </div>
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

      <section className="section section-split">
        <SectionHeading eyebrow="Ideas" title="The ideas shaping the work." />
        <ContentGrid variant="two">
          {featuredIdeas.map((idea) => (
            <ArticleCard key={idea.title} idea={idea} />
          ))}
        </ContentGrid>
      </section>

      <section className="section speaking-preview">
        <SectionHeading
          eyebrow="Speaking"
          title="Speaking on AI, builders, ownership, and the future of Black tech."
          body="I speak and facilitate conversations on the realities of building in the AI era — from engineering workflows and product strategy to Black tech ownership, community ecosystems, and the human side of innovation."
        />
        <ContentGrid variant="three">
          {featuredTopics.map((topic) => (
            <SpeakingTopicCard key={topic.title} topic={topic} />
          ))}
        </ContentGrid>
        <div className="section-link">
          <Link href="/speaking">View speaking topics</Link>
        </div>
      </section>

      <section className="section founder-preview">
        <div>
          <p className="eyebrow">Founder Story</p>
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
        <ContentGrid variant="three">
          {mediaItems.map((item) => (
            <MediaCard key={item.title} item={item} />
          ))}
        </ContentGrid>
      </section>

      <CTASection
        eyebrow="Next Step"
        title="Let’s build with clarity, context, and ownership."
        body="Whether you are inviting me to speak, exploring a partnership, or following the work I’m building through NotableBIT, BitVoices, and HindSite — this is the front door."
        primaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/contact", label: "Contact Me" }}
      />
    </main>
  );
}
