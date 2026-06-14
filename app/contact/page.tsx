import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { socialLinks } from "@/content/links";

const inquiryTypes = [
  "Speaking invitation",
  "Podcast/media inquiry",
  "Partnership/collaboration",
  "Technology advisory / consulting inquiry",
  "General message",
];

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact B Donald Harris for speaking, media, partnership, advisory, and aligned collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s connect around{" "}
            <span className="text-accent">aligned work</span>.
          </>
        }
        body="For speaking, media, partnership, or strategic technology inquiries, use the form below. I read every message, but I prioritize requests connected to speaking, product work, Black tech ecosystem building, AI-era workflows, and aligned collaborations."
        tone="gold"
        primaryCta={{ href: "#contact-form", label: "Start Inquiry" }}
        secondaryCta={{ href: "/speaking", label: "Speaking Topics" }}
      />

      <section className="section contact-layout" aria-labelledby="contact-form-heading">
        <div className="contact-guidance">
          <p className="eyebrow eyebrow-gold">Inquiry types</p>
          <dl className="inquiry-types">
            <div>
              <dt>Speaking &amp; panels</dt>
              <dd>
                Keynotes, panels, fireside chats, and workshops on AI, Black tech
                ownership, and builder workflows.
              </dd>
            </div>
            <div>
              <dt>Media &amp; podcast</dt>
              <dd>
                Interviews, podcast conversations, and BIT Voices guest or
                collaboration ideas.
              </dd>
            </div>
            <div>
              <dt>Partnership &amp; advisory</dt>
              <dd>
                Aligned collaborations and strategic technology conversations
                across the ecosystem.
              </dd>
            </div>
          </dl>
          <p className="contact-expectation">
            I read every message and prioritize requests connected to speaking,
            product work, Black tech ecosystem building, AI-era workflows, and
            aligned collaboration. Sharing a timeline and a relevant link helps
            me route your note.
          </p>
        </div>

        <form
          id="contact-form"
          className="contact-form"
          action="mailto:hello@bdonaldharris.com"
          method="post"
          encType="text/plain"
        >
          <h2 id="contact-form-heading">Contact form</h2>
          <p className="form-status-note">
            This form opens your email client. No database or silent fake
            submission is used in this static build.
          </p>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>

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

          <button className="button-primary form-submit" type="submit">
            Open Email Draft
          </button>
        </form>
      </section>

      <section className="section alternate-contact" aria-labelledby="alternate-contact">
        <SectionHeading
          eyebrow="Connect"
          title="Alternate contact and social paths"
          body="Use the Contact page for formal inquiries. These links are useful for following the work and public conversations."
        />
        <ul id="alternate-contact">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
