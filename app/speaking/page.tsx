import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  audienceFit,
  signatureTalks,
  speakingFormats,
  speakingTopics,
} from "@/content/speaking";
import styles from "./speaking.module.css";

export const dynamic = "force-dynamic";

const ENGAGEMENT_END = new Date("2026-08-22T23:59:59-04:00");

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Invite B Donald Harris to speak on AI, Black tech ownership, builder-led leadership, community trust, and people-centered technology.",
};

export default function SpeakingPage() {
  const isCurrentEngagement = new Date() <= ENGAGEMENT_END;

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
          {isCurrentEngagement && (
            <Link
              className={`button-secondary ${styles.heroEngagementLink}`}
              href="#current-engagement"
            >
              National Business League
            </Link>
          )}
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

      <section
        id="current-engagement"
        className={`section ${styles.engagement}`}
        aria-labelledby="current-engagement-title"
      >
        <div className={styles.engagementCopy}>
          <p className="eyebrow eyebrow-gold">
            {isCurrentEngagement ? "Current engagement" : "Recent engagement"}
          </p>
          <h2 id="current-engagement-title">
            126th National Business League Conference
          </h2>
          <p className={styles.talkTitle}>
            From Consumers to Builders: Practical AI for Black Entrepreneurs and SMBs
          </p>
          <p className={styles.engagementMeta}>
            {isCurrentEngagement
              ? "August 21–22, 2026"
              : "Presented August 21–22, 2026"}
            <span aria-hidden="true"> · </span>
            Atlanta, Georgia
          </p>
        </div>

        <figure className={styles.engagementArtwork}>
          <Image
            src="/images/nbl-current-engagement.webp"
            alt="Conference graphic for B Donald Harris's National Business League presentation, From Consumers to Builders: Practical AI for Black Entrepreneurs and SMBs."
            width={1080}
            height={1350}
            sizes="(max-width: 860px) 100vw, 720px"
          />
        </figure>
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
