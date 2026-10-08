import Image from "next/image";
import Link from "next/link";
import homeHeroImage from "@/assets/originals/home-hero.png";
import { LatestPodcastFeature } from "@/components/home/latest-podcast-feature";
import latestPodcast from "@/content/latest-podcast.json";

export default function HomePage() {
  return (
    <main className="page-shell home-page">
      <section id="home" className="section home-hero" data-home-nav-section>
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

      <section id="about" className="home-section home-about" data-home-nav-section>
        <div className="home-section-inner home-about-content">
          <p className="eyebrow">About</p>
          <h2>Builders still have to lead.</h2>
          <div className="home-about-copy">
            <p>
              AI accelerates output. It cannot replace judgment, context,
              accountability, or ownership.
            </p>
            <p>
              My perspective draws on decades in software engineering, ministry,
              leadership, founder work, and community building.
            </p>
          </div>
          <Link className="text-link" href="/essays">
            Explore My Ideas
          </Link>
        </div>
      </section>

      <section id="media" className="home-section home-media" data-home-nav-section>
        <LatestPodcastFeature episode={latestPodcast} />
      </section>

      <section id="speaking" className="home-section home-speaking" data-home-nav-section>
        <div className="home-section-inner home-simple-section">
          <p className="eyebrow">Speaking</p>
          <p>For speaking, collaboration, or a thoughtful conversation, get in touch.</p>
        </div>
      </section>

      <section id="contact" className="home-section home-contact" data-home-nav-section>
        <div className="home-section-inner home-simple-section">
          <p className="eyebrow">Contact</p>
          <Link className="button-primary" href="/contact">
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
