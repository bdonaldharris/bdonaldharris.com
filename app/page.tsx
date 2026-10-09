import Image from "next/image";
import Link from "next/link";
import homeHeroImage from "@/assets/originals/home-hero.png";
import { HomeMediaSection } from "@/components/home/home-media-section";
import { homeAboutMarkers } from "@/content/about";
import media from "@/content/media.json";

export default function HomePage() {
  return (
    <main className="page-shell home-page">
      <section id="home" className="home-hero" data-home-nav-section>
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="eyebrow">FOUNDER · BUILDER · TECHNOLOGIST</p>
            <h1>
              Building for <span className="text-accent">Black builders</span> in the AI era.
            </h1>
            <p>
              I’m B Donald Harris, founder of NotableBIT and host of BIT Voices. I
              build tools, platforms, and conversations that help Black builders
              lead with clarity, context, and ownership.
            </p>
            <div className="hero-action-row">
              <Link className="hero-action" href="/essays">
                Read My Essays
              </Link>
              <Link className="hero-action" href="/projects">
                Explore My Projects
              </Link>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <Image
            src={homeHeroImage}
            alt="Portrait of B Donald Harris against a dark cyan and amber editorial background."
            fill
            priority
            sizes="(max-width: 860px) 100vw, 100vw"
          />
        </figure>
      </section>

      <section id="about" className="home-section home-about" data-home-nav-section>
        <div className="home-section-band">
          <div className="home-section-band-inner">ABOUT</div>
        </div>
        <div className="home-section-inner home-about-content">
          <div className="about-opening">
            <h2>I&apos;m An Apostolic Technologist.</h2>
            <p className="about-realization">
              For years, I thought of ministry, technology, leadership, teaching, and
              entrepreneurship as different worlds—different spaces I had learned to move through.
              The more I reflected, the more I realized they were different expressions of the same
              foundation.
            </p>
            <blockquote>
              Apostolic Technologist is the language I&apos;ve found for both the pattern and the
              calling beneath my work. The disciplines change—ministry, technology, leadership,
              teaching, entrepreneurship—but the assignment remains: to build, teach, create,
              and open pathways where Black people can participate in technology with greater
              clarity, agency, and ownership.
            </blockquote>
          </div>

          <div className="about-journey-section">
            <h3>A Path Shaped by Systems, People, and Purpose</h3>
            <div className="about-journey">
              <figure className="about-portrait">
                <Image
                  src="/images/profile-photo-two-web.jpg"
                  alt="B Donald Harris, founder and technologist, working at his laptop."
                  fill
                  sizes="(max-width: 860px) 100vw, 460px"
                />
              </figure>
              <ul className="about-markers" aria-label="B Donald Harris's body of work">
                {homeAboutMarkers.map((marker) => (
                  <li key={marker.title}>
                    <div>
                      <h4>{marker.title}</h4>
                      <p>{marker.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section id="media" className="home-section home-media" data-home-nav-section>
        <HomeMediaSection media={media} />
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
