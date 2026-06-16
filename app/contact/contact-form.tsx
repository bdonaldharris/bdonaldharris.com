"use client";

import { useRef, useState } from "react";

const inquiryTypes = [
  "Speaking invitation",
  "Podcast/media inquiry",
  "Partnership/collaboration",
  "Technology advisory / consulting inquiry",
  "General message",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // Synchronous guard: state updates are async, so a rapid double-submit can
  // slip past `status` before React re-renders. A ref blocks it immediately.
  const submittingRef = useRef(false);

  const isSubmitting = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return; // prevent duplicate submissions
    submittingRef.current = true;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      inquiryType: String(data.get("inquiryType") ?? ""),
      message: String(data.get("message") ?? ""),
      relevantLink: String(data.get("relevantLink") ?? ""),
      // Honeypot — should always be empty for real users.
      phone: String(data.get("phone") ?? ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorMessage(
          body?.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Could not reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form
      id="contact-form"
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <h2 id="contact-form-heading">Contact form</h2>
      <p className="form-status-note">
        Your message is sent straight to my inbox — usually with a reply within
        a few days.
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
          maxLength={5000}
          aria-describedby="message-help"
        />
        <p id="message-help" className="field-help">
          Include the ask, timing, and any context that helps route the inquiry.
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

      {/* Honeypot field: hidden from users, attractive to bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <label htmlFor="contact-phone">Phone</label>
        <input
          id="contact-phone"
          name="phone"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-actions">
        <button
          className="button-primary form-submit"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>
      </div>

      <p className="form-feedback" role="status" aria-live="polite">
        {status === "success" && (
          <span className="form-feedback-success">
            Thanks — your message is on its way. I&rsquo;ll be in touch soon.
          </span>
        )}
        {status === "error" && (
          <span className="form-feedback-error">{errorMessage}</span>
        )}
      </p>
    </form>
  );
}
