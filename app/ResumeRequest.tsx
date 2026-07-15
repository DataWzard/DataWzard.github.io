"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { trackAnalyticsEvent } from "./analytics-events";

const requestEndpoint = process.env.NEXT_PUBLIC_RESUME_REQUEST_URL;

export function ResumeRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const triggerButton = useRef<HTMLButtonElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.setTimeout(() => triggerButton.current?.focus(), 0);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => nameInput.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    if (!requestEndpoint) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("submittedAt", new Date().toISOString());
    data.append("source", window.location.href);

    try {
      await fetch(requestEndpoint, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });
      form.reset();
      trackAnalyticsEvent("resume_request_sent", { source: "portfolio" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const close = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      setStatus("idle");
      triggerButton.current?.focus();
    }, 200);
  };

  return (
    <>
      <button
        ref={triggerButton}
        className="button button-secondary resume-request-trigger"
        type="button"
        onClick={() => setIsOpen(true)}
        data-analytics-event="resume_request_open"
        data-analytics-label="Request resume"
      >
        Request r&eacute;sum&eacute; <span>&rarr;</span>
      </button>

      {isOpen && (
        <div className="resume-request-overlay" onMouseDown={close}>
          <section
            className="resume-request-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-request-title"
            aria-describedby="resume-request-description"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="resume-request-close" type="button" aria-label="Close resume request" onClick={close}>
              &times;
            </button>

            {status === "success" ? (
              <div className="resume-request-success" role="status">
                <p className="section-kicker">Request received</p>
                <h2 id="resume-request-title">Thanks for reaching out.</h2>
                <p id="resume-request-description">
                  Jacob has your request and will respond directly by email with a personal note and his r&eacute;sum&eacute;.
                </p>
                <button className="button button-primary" type="button" onClick={close}>Return to portfolio</button>
              </div>
            ) : (
              <>
                <p className="section-kicker">R&eacute;sum&eacute; access</p>
                <h2 id="resume-request-title">Start with a quick introduction.</h2>
                <p id="resume-request-description" className="resume-request-intro">
                  Share your contact details and Jacob will personally follow up with his r&eacute;sum&eacute; and any relevant context.
                </p>

                <form onSubmit={submitRequest}>
                  <div className="resume-request-fields">
                    <label>
                      <span>Name <b>Required</b></span>
                      <input ref={nameInput} type="text" name="name" autoComplete="name" maxLength={100} required />
                    </label>
                    <label>
                      <span>Email <b>Required</b></span>
                      <input type="email" name="email" autoComplete="email" maxLength={160} required />
                    </label>
                    <label className="resume-request-note">
                      <span>Optional note</span>
                      <textarea name="note" rows={5} maxLength={1200} placeholder="A role, project, or reason for connecting..." />
                    </label>
                  </div>
                  <label className="resume-request-honeypot" aria-hidden="true">
                    Website<input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <p className="resume-request-privacy">
                    Your information will only be used to review and respond to this r&eacute;sum&eacute; request.
                  </p>
                  {status === "error" && (
                    <p className="resume-request-error" role="alert">
                      The request form is not connected yet. Please email <a href="mailto:jakestack91@gmail.com">jakestack91@gmail.com</a> for now.
                    </p>
                  )}
                  <button className="button button-primary resume-request-submit" type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending request..." : "Send request"} <span>&rarr;</span>
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}