import type { Metadata } from "next";
import Image from "next/image";
import { EssayArchive } from "@/components/essays/essay-archive";
import { ideaLanes } from "@/content/ideas";
import { getPublishedEssays } from "@/lib/essays";

const pageDescription =
  "Essays, reflections, and working ideas on AI, builder discipline, Black tech ownership, community, neurodivergence, and the systems behind meaningful work.";

export const metadata: Metadata = {
  title: "Essays",
  description: pageDescription,
  alternates: {
    canonical: "/essays",
  },
  openGraph: {
    type: "website",
    url: "https://bdonaldharris.com/essays",
    title: "Essays | B Donald Harris",
    description: pageDescription,
  },
};

export default async function EssaysPage() {
  const entries = await getPublishedEssays();
  const featured = entries.find((entry) => entry.featured);

  return (
    <main className="page-shell writing-page">
      <section className="section writing-hero">
        <div className="writing-hero-copy">
          <h1>Essays</h1>
          <p>{pageDescription}</p>
        </div>
        <div className="writing-hero-artifact">
          <Image
            src="/images/essays-sketchbook.png"
            alt="An engineer's sketchbook showing the beginning of a builder's journey."
            width={900}
            height={700}
            priority
          />
        </div>
      </section>

      {entries.length === 0 ? (
        <section className="section writing-empty-section">
          <div className="writing-empty">
            <h2>The archive begins here.</h2>
            <p>
              No published essays yet — the first pieces are being written.
              When they land, this is where they will live.
            </p>
          </div>
        </section>
      ) : (
        <section className="section writing-archive-section">
          <h2 className="sr-only">Essay archive</h2>
          <EssayArchive
            entries={entries}
            variant="page"
            featuredSlug={featured?.slug}
          />
        </section>
      )}

      <section className="section ideas-lanes-section">
        <header className="ideas-section-head">
          <h2>Recurring Themes</h2>
          <p>
            The recurring themes underneath the work — what I keep writing,
            building, and speaking toward.
          </p>
        </header>
        <ul className="idea-lanes">
          {ideaLanes.map((lane) => (
            <li key={lane.title}>
              <div className="idea-lane-copy">
                <h3>{lane.title}</h3>
                <p>{lane.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
