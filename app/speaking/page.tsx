import type { Metadata } from "next";
import Link from "next/link";
import { SpeakingTopicCard } from "@/components/cards/speaking-topic-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  audienceFit,
  signatureTalks,
  speakingFormats,
  speakingTopics,
} from "@/content/speaking";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Invite B Donald Harris to speak on AI, Black tech ownership, builder workflows, community ecosystems, and purpose-driven technology leadership.",
};

export default function SpeakingPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Speaking"
        title="Speaking on AI, Black tech ownership, builder workflows, community ecosystems, and purpose-driven technology."
        body="B Donald brings a grounded mix of engineering, founder work, ministry-shaped leadership, media, and community-building perspective to conversations about what it takes to build with clarity in the AI era."
        primaryCta={{ href: "/contact", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/media", label: "View Media" }}
      />

      <section className="section speaker-positioning">
        <SectionHeading
          eyebrow="Positioning"
          title="Technical enough for builders. Human enough for rooms that need more than tools."
          body="The strongest conversations connect product reality, engineering judgment, Black tech ownership, community trust, purpose, and the leadership required when AI accelerates output faster than understanding."
        />
      </section>

      <section className="section" aria-labelledby="featured-topics">
        <SectionHeading
          eyebrow="Topics"
          title="Featured speaking topics"
          body="These topics are designed for conference sessions, founder communities, podcasts, workshops, panels, and leadership conversations."
        />
        <ContentGrid variant="three">
          {speakingTopics.map((topic) => (
            <SpeakingTopicCard key={topic.title} topic={topic} />
          ))}
        </ContentGrid>
      </section>

      <section className="section speaking-lists">
        <div>
          <p className="eyebrow">Signature Talks</p>
          <h2>Talks that connect AI-era building to ownership and leadership.</h2>
        </div>
        <ol className="numbered-list">
          {signatureTalks.map((talk) => (
            <li key={talk}>{talk}</li>
          ))}
        </ol>
      </section>

      <section className="section format-fit-grid">
        <article>
          <SectionHeading eyebrow="Formats" title="Session formats" />
          <ul className="tag-list">
            {speakingFormats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </article>
        <article>
          <SectionHeading eyebrow="Audience Fit" title="Strong rooms for this work" />
          <ul className="tag-list">
            {audienceFit.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section media-placeholder" aria-labelledby="clips">
        <div>
          <p className="eyebrow">Media Clips</p>
          <h2 id="clips">Selected clips will live here when approved assets are available.</h2>
        </div>
        <p>
          This section is intentionally reserved rather than filled with fake
          videos, unavailable logos, or invented appearances. For current media
          and podcast context, visit the Media page.
        </p>
        <Link className="button-secondary" href="/media">
          Visit Media
        </Link>
      </section>

      <CTASection
        eyebrow="Booking"
        title="Invite B Donald to speak with your conference, community, podcast, or leadership room."
        body="Use the contact path for speaking invitations, podcast conversations, panels, workshops, and aligned community sessions."
        primaryCta={{ href: "/contact", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/projects", label: "Explore the Work" }}
      />
    </main>
  );
}
