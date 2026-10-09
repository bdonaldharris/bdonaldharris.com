"use client";

import Link from "next/link";
import { Microphone } from "@phosphor-icons/react";
import {
  audienceFit,
  speakingFormats,
  speakingTopics,
} from "@/content/speaking";

const homeConversationTopics = speakingTopics.filter((_, index) => [0, 2, 5].includes(index));

export function HomeSpeakingSection() {
  return (
    <>
      <div className="home-section-band">
        <div className="home-section-band-inner">SPEAKING</div>
      </div>

      <div className="home-section-inner home-speaking-content">
        <figure className="speaking-thesis-card">
          <blockquote>
            Technical enough for builders.
            <br />
            Human enough for rooms that need more than tools.
          </blockquote>
          <figcaption>
            I speak at the intersection of AI, Black tech ownership, builder-led leadership,
            community, and purpose—grounding emerging technology in the judgment, context,
            and responsibility required to build well.
          </figcaption>
        </figure>

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
            <h3>Conversation topics</h3>
            <div className="home-speaking-topic-list">
              {homeConversationTopics.map((topic) => (
                <article key={topic.title} className="home-speaking-topic-row">
                  <p>{topic.description}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="speaking-organizer-cta-row">
            <Link className="speaking-organizer-cta" href="/?inquiry=Speaking%20invitation#contact">
              <span className="speaking-organizer-cta-title">
                Invite me
                <br />
                to speak
              </span>
              <span className="speaking-organizer-cta-microphone" aria-hidden="true">
                <Microphone weight="duotone" />
              </span>
              <span className="speaking-organizer-cta-copy">
                For conferences, panels, podcasts, workshops, leadership rooms, and community
                conversations.
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
