import Image from "next/image";
import Link from "next/link";
import homeHeroImage from "@/assets/originals/home-hero.png";
import { LatestPodcastFeature } from "@/components/home/latest-podcast-feature";
import latestPodcast from "@/content/latest-podcast.json";

export default function HomePage() {
  return (
    <main className="page-shell home-page">
      <section className="section home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Founder • Builder • Technologist</p>
          <h1>
            Building for <span className="text-accent">Black builders</span> in the AI era.
          </h1>
          <p>
            I’m B Donald Harris, founder of NotableBIT and host of BIT Voices. I
            build tools, platforms, and conversations that help Black builders
            lead with clarity, context, and ownership.
          </p>
        </div>
        <figure className="hero-portrait">
          <Image
            src={homeHeroImage}
            alt="Portrait of B Donald Harris against a dark cyan and amber editorial background."
            fill
            priority
            sizes="(max-width: 860px) 92vw, 1120px"
          />
        </figure>
      </section>

      <div className="section home-principles-panel">
        <section className="home-thesis" aria-labelledby="home-thesis-heading">
          <h2 id="home-thesis-heading">Builders still have to lead.</h2>
          <p>
            AI accelerates output. It cannot replace judgment, context,
            accountability, or ownership.
          </p>
          <Link className="text-link" href="/essays">
            Explore My Ideas
          </Link>
        </section>

        <section className="home-credibility" aria-labelledby="home-credibility-heading">
          <h2 id="home-credibility-heading">
            Shaped by technology, leadership, and community.
          </h2>
          <p>
            My perspective draws on decades in software engineering, ministry,
            leadership, founder work, and community building.
          </p>
          <Link className="text-link" href="/about">
            Read My Story
          </Link>
        </section>
      </div>

      <LatestPodcastFeature episode={latestPodcast} />

      <section className="section closing-contact">
        <Link className="button-primary" href="/contact">
          Contact Me
        </Link>
        <p>For speaking, collaboration, or a thoughtful conversation, get in touch.</p>
      </section>
    </main>
  );
}
