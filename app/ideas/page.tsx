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
        title="A premium editorial home for the ideas shaping the work."
        body="These are public thinking lanes for essays, reflections, talks, and future writing around AI-era building, Black tech ownership, workflow intelligence, community, purpose, and lived systems thinking."
        primaryCta={{ href: "/speaking", label: "Speaking Topics" }}
        secondaryCta={{ href: "/projects", label: "Explore Projects" }}
      />

      <section className="section featured-idea" aria-labelledby="featured-idea">
        <div>
          <p className="eyebrow">Featured Reflection</p>
          <h2 id="featured-idea">{featuredIdea.title}</h2>
        </div>
        <div>
          <p>{featuredIdea.excerpt}</p>
          <p className="muted-note">
            Seed content for a future essay. No publish date is shown until the
            writing exists as a finished public piece.
          </p>
        </div>
      </section>

      <section className="section ideas-taxonomy" aria-labelledby="idea-categories">
        <SectionHeading
          eyebrow="Categories"
          title="The lanes of public thinking"
          body="The page is structured for future writing without pretending that unpublished articles already exist."
        />
        <ul className="category-list" id="idea-categories">
          {ideaCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="idea-grid-heading">
        <SectionHeading
          eyebrow="Archive"
          title="Initial idea cards"
          body="Short editorial seeds that can become essays, talks, podcast segments, or project notes."
        />
        <span id="idea-grid-heading" className="sr-only">
          Initial idea cards
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
