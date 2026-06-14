import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/cards/article-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ideaCategories, ideas } from "@/content/ideas";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "Ideas and reflections from B Donald Harris on AI, Black tech ownership, builder workflows, community, purpose, and systems thinking.",
};

export default function IdeasPage() {
  const [featuredIdea, ...restIdeas] = ideas;

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Ideas / Writing"
        title={
          <>
            Ideas for builders navigating the{" "}
            <span className="text-accent">AI era</span>.
          </>
        }
        body="Thinking out loud about AI, ownership, community, and the work of building — essays, reflections, and talks on Black tech ownership, workflow intelligence, purpose, and systems thinking."
        primaryCta={{ href: "/speaking", label: "Speaking Topics" }}
        secondaryCta={{ href: "/projects", label: "Explore Projects" }}
      />

      <section className="section" aria-labelledby="featured-idea">
        <article className="featured-reflection warm-section">
          <p className="eyebrow eyebrow-gold">Featured Reflection</p>
          <div className="featured-reflection-body">
            <h2 id="featured-idea">{featuredIdea.title}</h2>
            <div>
              <p>{featuredIdea.excerpt}</p>
              <p className="muted-note">
                A working reflection — expanding into a fuller essay.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="section ideas-taxonomy" aria-labelledby="idea-categories">
        <SectionHeading
          eyebrow="Categories"
          title="The lanes of public thinking"
          body="The themes I keep returning to as I build, write, and speak about the work."
        />
        <ul className="category-list" id="idea-categories">
          {ideaCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="idea-grid-heading">
        <SectionHeading
          eyebrow="Notes"
          title="Ideas in progress"
          body="Short reflections that grow into essays, talks, and podcast conversations."
        />
        <span id="idea-grid-heading" className="sr-only">
          Ideas in progress
        </span>
        <ContentGrid variant="three">
          {restIdeas.map((idea) => (
            <ArticleCard key={idea.title} idea={idea} />
          ))}
        </ContentGrid>
        <div className="section-link">
          <Link href="/contact">Suggest a conversation around one of these ideas</Link>
        </div>
      </section>

      <CTASection
        eyebrow="Thought Leadership"
        title="The ideas are meant to become useful conversations."
        body="Invite B Donald to speak, collaborate, or turn one of these themes into a deeper room with your organization or community."
        primaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/contact", label: "Contact Me" }}
      />
    </main>
  );
}
