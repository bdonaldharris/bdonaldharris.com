import type { Metadata } from "next";
import Link from "next/link";
import { ideaLanes, workingConcepts } from "@/content/ideas";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "The public thinking layer of B Donald Harris — concepts, language, and working reflections on AI, builder discipline, Black tech ownership, community, neurodivergence, and meaningful work.",
};

export default function IdeasPage() {
  return (
    <main className="page-shell ideas-page">
      <section className="section ideas-hero">
        <div className="ideas-hero-field" aria-hidden="true" />
        <div className="ideas-hero-copy">
          <h1>
            Where the work becomes <span className="text-accent">language</span>.
          </h1>
          <p>
            Essays, reflections, and working ideas on AI, builder discipline,
            Black tech ownership, community, neurodivergence, and the systems
            behind meaningful work.
          </p>
        </div>
      </section>

      <section
        className="section ideas-featured-section"
        aria-labelledby="featured-idea"
      >
        <article className="ideas-featured">
          <h2 id="featured-idea">Community is culture before it is features.</h2>
          <p>
            Profiles, feeds, hubs, comments, and notifications do not create
            community by themselves. Culture does.
          </p>
          <p>
            Trust, safety, visibility, shared language, and mutual
            responsibility matter more than platform mechanics. The features are
            only ever a container for the culture that has to come first.
          </p>
          <p className="muted-note">A working reflection.</p>
        </article>
      </section>

      <section className="section ideas-lanes-section">
        <header className="ideas-section-head">
          <h2>The lanes I keep returning to</h2>
          <p>
            The recurring themes underneath the work — what I keep writing,
            building, and speaking toward.
          </p>
        </header>
        <ol className="idea-lanes">
          {ideaLanes.map((lane) => (
            <li key={lane.title}>
              <div className="idea-lane-copy">
                <h3>{lane.title}</h3>
                <p>{lane.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section ideas-concepts-section">
        <header className="ideas-section-head">
          <h2>Working concepts</h2>
          <p>
            Language I’m naming, borrowing, applying, and refining as patterns
            keep showing up in the work.
          </p>
        </header>
        <div className="concept-deck">
          {workingConcepts.map((concept) => (
            <article key={concept.title} className="concept-card">
              <h3>{concept.title}</h3>
              <p>{concept.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section ideas-bridge-section">
        <div className="ideas-bridge">
          <h2>Not separate from the work.</h2>
          <p>
            These ideas shape the platforms I build, the communities I serve,
            the talks I give, and the way I help builders move from output to
            understanding.
          </p>
        </div>
      </section>

      <section
        className="section ideas-cta-section ideas-final-cta"
        aria-label="Start a conversation"
      >
        <Link className="button-primary" href="/contact">
          Start a conversation
        </Link>
        <p className="ideas-cta-note">
          Invite B Donald to speak, facilitate, or join a conversation on AI,
          builder culture, community, ownership, and the future of meaningful
          work.
        </p>
      </section>
    </main>
  );
}
