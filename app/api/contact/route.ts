import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact form -> email via Resend. Runs only on the server so the API key is
// never exposed to the browser. The client posts JSON to this endpoint.
export const runtime = "nodejs";
// This route handles dynamic POST requests; it must never be statically cached.
export const dynamic = "force-dynamic";

const MESSAGE_MAX_LENGTH = 5000;
const FIELD_MAX_LENGTH = 200;
// Pragmatic email shape check — not RFC-perfect, just enough to reject garbage.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  inquiryType?: unknown;
  organization?: unknown;
  relevantLink?: unknown;
  message?: unknown;
  // Honeypot — real users never see or fill this.
  phone?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: if filled, a bot submitted the form. Return a generic success so
  // the bot gets no signal, but do not send an email.
  if (asString(payload.phone)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const message = asString(payload.message);
  const inquiryType = asString(payload.inquiryType);
  const organization = asString(payload.organization);
  const relevantLink = asString(payload.relevantLink);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  else if (name.length > FIELD_MAX_LENGTH) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email) || email.length > FIELD_MAX_LENGTH)
    errors.email = "Enter a valid email address.";

  if (!message) errors.message = "Message is required.";
  else if (message.length > MESSAGE_MAX_LENGTH)
    errors.message = `Message must be under ${MESSAGE_MAX_LENGTH} characters.`;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "bdonaldharris@notablebit.com";
  // Resend requires a verified sender. Falls back to their onboarding sender
  // so the endpoint still works before a custom domain is verified.
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    // Misconfiguration — log server-side, return a generic error to the client.
    console.error("RESEND_API_KEY is not set; cannot send contact email.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toISOString();
  const site = "bdonaldharris.com";
  const subject = inquiryType
    ? `New contact: ${inquiryType} — ${name}`
    : `New contact from ${name}`;

  const textLines = [
    `New message from the ${site} contact form.`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    inquiryType ? `Inquiry type: ${inquiryType}` : null,
    organization ? `Organization: ${organization}` : null,
    relevantLink ? `Relevant link: ${relevantLink}` : null,
    "",
    "Message:",
    message,
    "",
    `Submitted: ${submittedAt}`,
    `Source: ${site}`,
  ].filter((line): line is string => line !== null);
  const text = textLines.join("\n");

  const htmlRow = (label: string, value: string) =>
    `<p style="margin:0 0 8px"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
  const html = [
    `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">`,
    `<p style="margin:0 0 16px">New message from the ${site} contact form.</p>`,
    htmlRow("Name", name),
    htmlRow("Email", email),
    inquiryType ? htmlRow("Inquiry type", inquiryType) : "",
    organization ? htmlRow("Organization", organization) : "",
    relevantLink ? htmlRow("Relevant link", relevantLink) : "",
    `<p style="margin:16px 0 4px"><strong>Message:</strong></p>`,
    `<p style="margin:0 0 16px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
    htmlRow("Submitted", submittedAt),
    htmlRow("Source", site),
    `</div>`,
  ].join("");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
