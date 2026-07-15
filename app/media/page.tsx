import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import mediaHeroImage from "@/assets/originals/media-hero.png";
import { MediaClips } from "./media-clips";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcast episodes, interviews, speaking clips, and reflections from B Donald Harris and BIT Voices Podcast.",
};

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
            href="https://www.youtube.com/@notablebit"
            target="_blank"
            rel="noopener noreferrer"
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
          <p>
            Selected moments from conversations about technology, culture,
            entrepreneurship, and the systems shaping how we build and live.
          </p>
        </div>
        <MediaClips />
      </section>

      <section
        className="section featured-podcast media-feature media-inquiry"
        aria-labelledby="media-inquiry-heading"
      >
        <div className="media-feature-inner">
          <p className="eyebrow eyebrow-gold">Media &amp; Press</p>
          <h2 id="media-inquiry-heading">Looking for context or approved assets?</h2>
          <p>
            For interviews, commentary, biographies, headshots, approved media
            assets, or other press-related requests, submit a media or press
            inquiry through the contact form.
          </p>
          <Link className="button-primary" href="/contact#contact-form">
            Submit a Media Inquiry
          </Link>
        </div>
      </section>
    </main>
  );
}
