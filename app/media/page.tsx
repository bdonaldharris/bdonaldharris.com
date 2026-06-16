import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import mediaHeroImage from "@/assets/originals/media-hero.png";
import { ContentGrid } from "@/components/sections/content-grid";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcast episodes, interviews, speaking clips, and reflections from B Donald Harris and BIT Voices Podcast — plus media and press kit context.",
};

const recentMedia = [
  {
    category: "Video",
    title: "Podcast Clips & Conversations",
    description:
      "Selected video clips and conversations from podcast episodes, interviews, and media appearances.",
    status: "Coming soon",
  },
  {
    category: "Articles",
    title: "Published Articles & Features",
    description:
      "Articles, features, and contributed thinking connected to AI, software, builders, and community.",
    status: "Coming soon",
  },
  {
    category: "Writing",
    title: "Founder Reflections",
    description:
      "Short reflections and essays from the intersection of product thinking, builder culture, and technology leadership.",
    status: "Coming soon",
  },
];

export default function MediaPage() {
  return (
    <main className="page-shell media-page">
      <section className="media-hero" aria-labelledby="media-hero-title">
        <div className="media-hero-copy">
          <h1 id="media-hero-title">Builder conversations with real depth.</h1>
          <p>
            Podcast episodes, interviews, speaking clips, and reflections
            featuring builders, technologists, founders, and leaders shaping
            what comes next.
          </p>
        </div>
        <div className="media-hero-image" aria-hidden="true">
          <Image
            src={mediaHeroImage}
            alt=""
            priority
            placeholder="blur"
            sizes="100vw"
          />
        </div>
      </section>

      <section
        className="section featured-podcast media-feature"
        id="bit-voices-podcast"
        aria-labelledby="featured-podcast-heading"
      >
        <div className="media-feature-inner">
          <p className="eyebrow eyebrow-gold">BIT Voices Podcast</p>
          <h2 id="featured-podcast-heading">
            Conversations with the people building what comes next.
          </h2>
          <p>
            BIT Voices Podcast features conversations with Black technologists,
            founders, builders, and leaders shaping the future. It is the media
            heart of the broader BIT Voices and NotableBIT ecosystem.
          </p>
          <Link
            className="button-secondary"
            href="https://www.youtube.com/@bitvoices"
          >
            Explore the Podcast
          </Link>
        </div>
      </section>

      <section
        className="section media-recent"
        aria-labelledby="recent-media-heading"
      >
        <div className="media-section-heading">
          <h2 id="recent-media-heading">Recent Media</h2>
        </div>
        <ContentGrid variant="three">
          {recentMedia.map((item) => (
            <article
              key={item.title}
              className="editorial-card media-card media-card-soon"
            >
              <p className="card-meta">{item.category}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="card-footer">
                <span className="card-status">{item.status}</span>
              </div>
            </article>
          ))}
        </ContentGrid>
      </section>

      <section
        className="section media-events"
        id="upcoming-events"
        aria-labelledby="upcoming-events-heading"
      >
        <h2 id="upcoming-events-heading">Upcoming Events</h2>
        <p className="media-events-desc">
          Talks, interviews, panels, and public conversations will be added as
          they are confirmed.
        </p>
        <p className="media-availability-note">
          <span className="media-availability-dot" aria-hidden="true" />
          Available for podcasts, panels, interviews, and conversations on AI,
          software, Black tech, builder culture, product thinking, and
          community-led innovation.
        </p>
      </section>

      <section
        className="section media-press"
        aria-labelledby="press-kit-heading"
      >
        <div className="media-presskit-card">
          <span className="media-presskit-accent" aria-hidden="true" />
          <header className="media-presskit-header">
            <h2 id="press-kit-heading">Media &amp; Press Kit</h2>
            <p className="media-presskit-desc">
              Helpful context for podcast hosts, event organizers, journalists,
              and media teams.
            </p>
          </header>
          <div className="media-presskit-main">
            <figure className="media-presskit-photo">
              <Image
                src="/images/profile-photo-one-web.jpg"
                alt="Headshot of B Donald Harris."
                fill
                sizes="(max-width: 860px) 92vw, 360px"
              />
            </figure>
            <div className="media-presskit-body">
              <p className="media-presskit-bio">
                B Donald Harris is the founder of NotableBIT, creator of
                HindSite, and host of BIT Voices Podcast. His work sits at the
                intersection of AI, software, Black tech ownership, media, and
                community.
              </p>
              <dl className="media-presskit-facts">
                <div>
                  <dt>Roles</dt>
                  <dd>Founder, builder, technologist, speaker, podcast host</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>
                    AI, software, builder culture, workflow intelligence,
                    community, Black tech ownership
                  </dd>
                </div>
                <div>
                  <dt>Assets</dt>
                  <dd>
                    Headshots, logos, short bio, and media context available on
                    request
                  </dd>
                </div>
              </dl>
              <Link className="button-primary" href="/contact">
                Request Media Assets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
