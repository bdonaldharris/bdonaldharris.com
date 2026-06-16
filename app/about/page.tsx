import type { Metadata } from "next";
import Image from "next/image";
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
        title={
          <>
            I build systems, stories, and communities that help people move with{" "}
            <span className="text-warm">clarity</span>.
          </>
        }
        body="My work sits at the intersection of software engineering, founder leadership, ministry-shaped formation, media, community, and a lifelong instinct for seeing systems in layers."
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

      <section
        className="section story-section warm-section"
        aria-labelledby="about-story"
      >
        <h2 id="about-story" className="story-heading">
          A path shaped by systems, people, and purpose.
        </h2>

        <div className="story-feature">
          <figure className="story-portrait">
            <Image
              src="/images/profile-photo-two-web.jpg"
              alt="B Donald Harris, founder and technologist, working at his laptop."
              fill
              sizes="(max-width: 860px) 92vw, 440px"
            />
            <figcaption>B Donald Harris — founder, engineer, and builder.</figcaption>
          </figure>
          <p className="story-lead">
            One through line runs from the first system I took apart to the
            companies I build today: a need to understand how things actually fit
            together, and to make that clarity useful to other people.
          </p>
        </div>

        <ol className="storyline" aria-label="Career and formation storyline">
          {aboutStorySections.map((section, index) => (
            <li
              key={section.title}
              className="storyline-item"
              data-pos={index % 2 === 0 ? "above" : "below"}
            >
              <div className="storyline-content">
                <span className="storyline-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </div>
              <span className="storyline-node" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className="section beliefs-section" aria-labelledby="beliefs">
        <div className="beliefs-intro-card">
          <h2 id="beliefs">What I believe</h2>
          <p>
            The convictions that shape how I build, speak, collaborate, and
            evaluate technology.
          </p>
        </div>
        <ul className="belief-grid">
          {beliefStatements.map((belief) => (
            <li key={belief} className="belief-card">
              {belief}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
