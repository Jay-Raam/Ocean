import { useState } from "react";
import type { FormEvent } from "react";
import { BRAND } from "../../lib/brand";
import { sendContactMessage } from "../../lib/api";
import { Ornament } from "../ui/Ornament";

const SUBJECTS = [
  "Booking enquiry",
  "Weddings & events",
  "Dining reservation",
  "Spa & treatments",
  "Getting here / transfers",
  "Feedback",
  "Other",
];

const CONTACT_CARDS = [
  { label: "Address", lines: [BRAND.contact.addressLine1, BRAND.contact.addressLine2] },
  { label: "Phone", lines: [BRAND.contact.phoneDisplay], href: BRAND.contact.phoneHref },
  { label: "Email", lines: [BRAND.contact.emailDisplay], href: BRAND.contact.emailHref },
  { label: "WhatsApp", lines: [BRAND.contact.whatsappDisplay], href: `https://wa.me/${BRAND.contact.whatsapp}` },
];

type Status = "idle" | "sending" | "done" | "error";

/**
 * Contact details + inquiry form. The form posts to the backend
 * (/api/v1/messages) and falls back to a friendly error if the API is
 * unreachable — the page still works without a backend running.
 */
export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setError("");
    const result = await sendContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });
    if (result.ok) {
      setStatus("done");
      setName("");
      setEmail("");
      setSubject(SUBJECTS[0]);
      setMessage("");
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try again or reach us on WhatsApp.");
    }
  };

  return (
    <section id="inquiry" className="section section-contact" data-theme-section="light" data-bg-section="light">
      <div className="border-top" />
      <div className="container">
        <div className="row centered">
          <div className="col styled-col">
            <div className="col-row col-row-ornament">
              <Ornament />
            </div>
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow">Reach out</span>
            </div>
            <div className="col-row col-row-title small">
              <h2>Send us a message</h2>
            </div>
            <div className="col-row col-row-text medium styled-content">
              <p>
                Questions about a stay, a wedding, a table by the pool? Write to us and we will reply within a day.
              </p>
            </div>
          </div>
        </div>

        <div className="row grid row-contact-cards">
          {CONTACT_CARDS.map((card) => (
            <div className="col col-contact-card" key={card.label}>
              <div className="border-top" />
              <span className="eyebrow small">{card.label}</span>
              {card.lines.map((line) =>
                card.href ? (
                  <a key={line} className="contact-card-link" href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {line}
                  </a>
                ) : (
                  <p key={line} className="medium">
                    {line}
                  </p>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="row row-contact-form">
          <div className="col">
            {status === "done" ? (
              <div className="contact-form-done">
                <p className="medium">
                  Thank you — your message is on its way. We will be in touch within a day. For anything urgent,
                  reach us on WhatsApp.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span className="eyebrow small">Your name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </label>
                  <label className="contact-field">
                    <span className="eyebrow small">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="contact-field">
                    <span className="eyebrow small">Subject</span>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="contact-field contact-field-message">
                    <span className="eyebrow small">Message</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your plans…"
                      rows={5}
                    />
                  </label>
                </div>
                {status === "error" && (
                  <p className="contact-form-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="contact-form-submit">
                  <button type="submit" className="btn-contact-submit" disabled={status === "sending"}>
                    <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
