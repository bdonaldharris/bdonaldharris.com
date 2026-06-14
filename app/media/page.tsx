import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="featured-podcast-mark" aria-hidden="true">
          <span className="podcast-waveform">
            {[10, 22, 16, 30, 20, 36, 14, 26, 18, 12].map((h, i) => (
              <i key={i} style={{ height: `${h}px` }} />
            ))}
          </span>
        </div>
        <div>
          <p className="eyebrow eyebrow-gold">The Anchor · BIT Voices Podcast</p>
          <h2 id="featured-podcast">Conversations with the people building what comes next.</h2>
          <p>
            BIT Voices Podcast features conversations with Black technologists,
            founders, builders, and leaders shaping the future. It is the media
            heart of the broader BitVoices and NotableBIT ecosystem.
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
          body="This space is held for verified talks, panels, interviews, and clips — added only as real assets become available, never filled with invented credits."
        />
        <div className="reserved-note">
          <span className="reserved-dot" aria-hidden="true" />
          <p>
            Reserved for confirmed appearances. To list a recent talk, panel, or
            interview, share it through the contact path.
          </p>
        </div>
      </section>

      <section className="section press-kit" aria-labelledby="press-kit-heading">
        <span id="press-kit-heading" className="sr-only">
          Press Kit
        </span>
        <SectionHeading
          eyebrow="Press Kit"
          title="Helpful context for media and podcast teams"
          body="A lightweight kit for accurate references. High-resolution headshots and logo assets are available on request."
        />
        <div className="press-kit-layout">
          <figure className="press-kit-photo">
            <Image
              src="/images/profile-photo-one-web.jpg"
              alt="Headshot of B Donald Harris."
              fill
              sizes="(max-width: 860px) 92vw, 320px"
            />
          </figure>
          <div className="press-kit-detail">
            <h3>Short bio</h3>
            <p>
              B Donald Harris is the founder of NotableBIT, creator of HindSite,
              and host of BIT Voices. He builds at the intersection of AI,
              software, Black tech ownership, media, and community.
            </p>
            <dl className="press-kit-facts">
              <div>
                <dt>Roles</dt>
                <dd>Founder, builder, technologist, speaker</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>
                  AI-era building, Black tech ownership, workflow intelligence,
                  community
                </dd>
              </div>
              <div>
                <dt>Assets</dt>
                <dd>Headshots and logos available on request</dd>
              </div>
            </dl>
            <Link className="button-secondary" href="/contact">
              Request Assets
            </Link>
          </div>
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
