import type { Metadata } from "next";
import { Motif } from "@/components/ui/motif";
import { ContactForm } from "./contact-form";

const inquiryCards = [
  {
    title: "Speaking & panels",
    body: "Keynotes, panels, fireside chats, and workshops on AI, Black tech ownership, and builder workflows.",
  },
  {
    title: "Media & podcast",
    body: "Podcast conversations, interviews, media requests, and thoughtful conversations around technology and builders.",
  },
  {
    title: "Partnerships & product work",
    body: "Strategic collaborations, product thinking, ecosystem building, and aligned technology initiatives.",
  },
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact B Donald Harris for speaking, media, partnership, advisory, and aligned collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <section className="section contact-hero">
        <h1>
          Let&rsquo;s connect around{" "}
          <span className="text-accent">aligned</span> work.
        </h1>
        <Motif variant="orbit" className="contact-hero-motif" />
      </section>

      <section className="section contact-priority" aria-label="What I prioritize">
        <blockquote className="contact-priority-note">
          <p>
            I read every message, but I prioritize requests connected to
            speaking, product work, Black tech ecosystem building, AI-era
            workflows, and aligned collaborations.
          </p>
        </blockquote>
      </section>

      <section className="section contact-inquiries" aria-label="Inquiry types">
        <ul className="inquiry-cards">
          {inquiryCards.map((card) => (
            <li key={card.title} className="inquiry-card">
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section contact-form-section"
        aria-labelledby="contact-form-heading"
      >
        <ContactForm />
      </section>
    </main>
  );
}
