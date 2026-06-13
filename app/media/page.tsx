import type { Metadata } from "next";
import Link from "next/link";
import { MediaCard } from "@/components/cards/media-card";
import { ContentGrid } from "@/components/sections/content-grid";
import { CTASection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { mediaItems } from "@/content/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcast, interviews, talks, press kit information, and media references from B Donald Harris and BIT Voices.",
};

export default function MediaPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Media"
        title="Conversations, interviews, talks, and stories from the work."
        body="A home for podcast work, public conversations, future speaking clips, and lightweight press context connected to B Donald Harris, NotableBIT, HindSite, BitVoices Network, and BIT Voices Podcast."
        primaryCta={{ href: "/contact", label: "Media Inquiry" }}
        secondaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
      />

      <section
        className="section featured-podcast"
        id="bit-voices-podcast"
        aria-labelledby="featured-podcast"
      >
        <div>
          <p className="eyebrow">Featured Podcast</p>
          <h2 id="featured-podcast">BIT Voices Podcast</h2>
        </div>
        <div>
          <p>
            BIT Voices Podcast features conversations with Black technologists,
            founders, builders, and leaders shaping the future. It is one of
            the media expressions of the broader BitVoices and NotableBIT
            ecosystem.
          </p>
          <Link className="button-secondary" href="/contact">
            Pitch a Conversation
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="recent-media">
        <SectionHeading
          eyebrow="Recent"
          title="Recent episodes, conversations, and reflections"
          body="Initial media cards are structured for approved public content and tasteful placeholders only."
        />
        <span id="recent-media" className="sr-only">
          Recent episodes, conversations, and reflections
        </span>
        <ContentGrid variant="three">
          {mediaItems.map((item) => (
            <MediaCard key={item.title} item={item} />
          ))}
        </ContentGrid>
      </section>

      <section
        className="section appearances-section"
        id="speaking-appearances"
        aria-labelledby="appearances"
      >
        <span id="appearances" className="sr-only">
          Speaking and event appearances
        </span>
        <SectionHeading
          eyebrow="Appearances"
          title="Speaking and event appearances"
          body="This section is ready for verified talks, panels, interviews, and clips. It intentionally does not include fake logos, unavailable embeds, or invented credits."
        />
        <div className="empty-state">
          <h3>Verified media assets can be added here.</h3>
          <p>
            Add approved clips, event pages, podcast links, or interview
            references when they are available.
          </p>
        </div>
      </section>

      <section className="section press-kit" aria-labelledby="press-kit-heading">
        <span id="press-kit-heading" className="sr-only">
          Press Kit Lite
        </span>
        <SectionHeading
          eyebrow="Press Kit Lite"
          title="Helpful context for media and podcast teams"
          body="A lightweight press kit structure for approved assets and accurate short-form references."
        />
        <div className="press-kit-grid">
          <article>
            <h3>Short bio</h3>
            <p>
              B Donald Harris is the founder of NotableBIT, creator of
              HindSite, and host of BIT Voices. He builds at the intersection
              of AI, software, Black tech ownership, media, and community.
            </p>
          </article>
          <article>
            <h3>Headshot</h3>
            <p>Approved headshot asset needed before publication.</p>
          </article>
          <article>
            <h3>Logos</h3>
            <p>Approved NotableBIT, BitVoices, and related logo assets needed.</p>
          </article>
          <article>
            <h3>Contact path</h3>
            <p>Use the Contact page for media, podcast, and speaking inquiries.</p>
          </article>
        </div>
      </section>

      <CTASection
        eyebrow="Media"
        title="Start with the right context."
        body="For podcast invitations, interviews, media requests, press-kit needs, or speaking clips, use the contact path and include the relevant link."
        primaryCta={{ href: "/contact", label: "Media Inquiry" }}
        secondaryCta={{ href: "/ideas", label: "Explore Ideas" }}
      />
    </main>
  );
}
