import type { Metadata } from "next";
import { Motif } from "@/components/ui/motif";

const inquiryTypes = [
  "Speaking invitation",
  "Podcast/media inquiry",
  "Partnership/collaboration",
  "Technology advisory / consulting inquiry",
  "General message",
];

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
        <form
          id="contact-form"
          className="contact-form"
          action="mailto:hello@bdonaldharris.com"
          method="post"
          encType="text/plain"
        >
          <h2 id="contact-form-heading">Contact form</h2>
          <p className="form-status-note">
            This opens a pre-filled draft in your email client so your message
            comes straight to me — nothing is stored or sent in the background.
          </p>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="organization">Organization</label>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-type">Inquiry type</label>
              <select id="inquiry-type" name="inquiryType" required defaultValue="">
                <option value="" disabled>
                  Select an inquiry type
                </option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={7}
              required
              aria-describedby="message-help"
            />
            <p id="message-help" className="field-help">
              Include the ask, timing, and any context that helps route the
              inquiry.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="relevant-link">Relevant link</label>
            <input
              id="relevant-link"
              name="relevantLink"
              type="url"
              placeholder="https://"
            />
          </div>

          <div className="form-actions">
            <button className="button-primary form-submit" type="submit">
              Open Email Draft
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
