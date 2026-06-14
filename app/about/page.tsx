import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { aboutStorySections, beliefStatements } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about B Donald Harris, a founder, technologist, speaker, community builder, and faith-rooted leader building across AI, Black tech ownership, media, and workflow intelligence.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="About B Donald Harris"
        title={
          <>
            I build where technology, purpose, community, and{" "}
            <span className="text-accent">ownership</span> meet.
          </>
        }
        body="My work sits at the intersection of software engineering, founder leadership, ministry-shaped formation, media, community, and the lived experience of seeing systems in layers."
        motif="threads"
        primaryCta={{ href: "/speaking", label: "Invite Me to Speak" }}
        secondaryCta={{ href: "/projects", label: "Explore Projects" }}
      />

      <section className="section about-throughline">
        <figure className="pull-quote pull-quote-wide">
          <blockquote>
            The story is not a pile of roles. It is one aligned body of work.
          </blockquote>
          <figcaption>
            Engineering taught me how systems behave. Ministry taught me how
            people carry meaning, pressure, and hope. Founder work keeps those
            lessons honest, because ideas have to become useful, maintainable
            things.
          </figcaption>
        </figure>
      </section>

      <section className="section story-timeline warm-section" aria-labelledby="about-story">
        <div className="story-aside">
          <p className="eyebrow eyebrow-gold">Story</p>
          <h2 id="about-story">A path shaped by systems, people, and purpose.</h2>
          <figure className="story-portrait">
            <Image
              src="/images/profile-photo-two-web.jpg"
              alt="B Donald Harris working at his laptop."
              fill
              sizes="(max-width: 860px) 92vw, 360px"
            />
          </figure>
        </div>
        <div className="timeline-list">
          {aboutStorySections.map((section) => (
            <article key={section.title} className="timeline-item">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section belief-list-section" aria-labelledby="beliefs">
        <div>
          <p className="eyebrow">Beliefs</p>
          <h2 id="beliefs">What I believe</h2>
          <p className="belief-intro">
            These convictions shape the way I build, speak, collaborate, and
            evaluate technology.
          </p>
        </div>
        <ul className="belief-list">
          {beliefStatements.map((belief) => (
            <li key={belief}>{belief}</li>
          ))}
        </ul>
      </section>

      <section className="section about-current-work">
        <div>
          <p className="eyebrow">Current Work</p>
          <h2>NotableBIT, HindSite, BitVoices, and BIT Voices are connected vehicles.</h2>
        </div>
        <div>
          <p>
            The work is focused on Black tech ownership, AI-era building,
            workflow intelligence, media, and community. Some of it is company
            work. Some of it is product work. Some of it is public conversation.
            The center is consistent: help builders move with clarity, context,
            and ownership.
          </p>
          <Link className="button-secondary" href="/projects">
            See the Ecosystem
          </Link>
        </div>
      </section>

      <CTASection
        eyebrow="Collaboration"
        title="Build, speak, or partner around work that needs context."
        body="For speaking, media, partnership, or strategic technology inquiries, the Contact page is the best next step."
        motif="orbit"
        primaryCta={{ href: "/contact", label: "Contact Me" }}
        secondaryCta={{ href: "/speaking", label: "Speaking Topics" }}
      />
    </main>
  );
}
