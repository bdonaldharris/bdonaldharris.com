import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  audienceFit,
  signatureTalks,
  speakingClipPlaceholders,
  speakingFormats,
  speakingTopics,
} from "@/content/speaking";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Invite B Donald Harris to speak on AI, Black tech ownership, builder-led leadership, community trust, and people-centered technology.",
};

export default function SpeakingPage() {
  return (
    <main className="page-shell speaking-page">
      <section className="speaking-hero" aria-labelledby="speaking-hero-title">
        <div className="speaking-hero-copy">
          <h1 id="speaking-hero-title">
            Speaking on AI, Black tech ownership, and{" "}
            <span className="speaking-keep-together">builder-led leadership.</span>
          </h1>
          <p>
            B Donald brings a grounded, builder-first perspective to conversations
            about technology, culture, ownership, and the future of work in the AI
            era.
          </p>
        </div>

        <div className="speaking-hero-image" aria-hidden="true">
          <Image
            src="/images/speaking-hero.webp"
            alt=""
            width={1672}
            height={941}
            priority
            sizes="(max-width: 860px) 100vw, 58vw"
          />
        </div>
      </section>

      <section className="section speaking-thesis" aria-label="Speaking thesis">
        <figure className="speaking-thesis-card">
          <blockquote>
            Technical enough for builders.
            <br />
            Human enough for rooms that need more than tools.
          </blockquote>
          <figcaption>
            The strongest conversations connect product reality, engineering
            judgment, Black tech ownership, community trust, purpose, and the
            leadership required when AI accelerates output faster than understanding.
          </figcaption>
        </figure>
      </section>

      <section
        id="conversations"
        className="section speaking-conversations"
        aria-labelledby="conversations-title"
      >
        <header className="speaking-conversations-intro">
          <h2 id="conversations-title">Conversations B Donald leads</h2>
          <p>
            For conferences, panels, podcasts, workshops, leadership rooms, and
            community gatherings where technology needs context, clarity, and human
            judgment.
          </p>
        </header>

        <div className="speaking-conversations-main">
          <div className="speaking-theme-group">
            <div className="speaking-theme-list">
              {speakingTopics.map((topic) => (
                <article key={topic.title} className="speaking-theme-row">
                  <h4>{topic.title}</h4>
                  <p>{topic.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="speaking-organizer-panel" aria-label="Organizer details">
          <section className="speaking-organizer-group">
            <h3>Bookable as</h3>
            <ul className="speaking-organizer-list speaking-organizer-tags">
              {speakingFormats.map((format) => (
                <li key={format}>{format}</li>
              ))}
            </ul>
          </section>

          <section className="speaking-organizer-group">
            <h3>Common rooms</h3>
            <ul className="speaking-organizer-list speaking-organizer-tags">
              {audienceFit.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </section>

          <section className="speaking-organizer-group">
            <h3>Sample talk titles</h3>
            <ol className="speaking-organizer-list speaking-sample-talks">
              {signatureTalks.map((talk) => (
                <li key={talk}>{talk}</li>
              ))}
            </ol>
          </section>
        </aside>
      </section>

      <section className="section speaking-clips" aria-label="Speaking clip placeholders">
        <div className="speaking-clip-grid">
          {speakingClipPlaceholders.map((clip) => (
            <article key={clip} className="speaking-clip-card">
              <div className="speaking-play-indicator" aria-hidden="true" />
              <h3>{clip}</h3>
              <p>Clip placeholder</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section speaking-final-cta" aria-label="Invite B Donald to speak">
        <Link className="button-primary" href="/contact#contact-form">
          Invite me to speak
        </Link>
        <p>For conferences, podcasts, leadership rooms, and community conversations.</p>
      </section>
    </main>
  );
}
