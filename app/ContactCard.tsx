"use client";

import { useEffect, useRef, useState } from "react";

const contactLinks = [
  { label: "Email", detail: "jakestack91@gmail.com", href: "mailto:jakestack91@gmail.com" },
  { label: "LinkedIn", detail: "Connect professionally", href: "https://www.linkedin.com/in/stack-jacob/" },
  { label: "GitHub", detail: "Browse code and projects", href: "https://github.com/DataWzard" },
  { label: "Tableau", detail: "Explore dashboards", href: "https://public.tableau.com/app/profile/jacob.stack/vizzes" },
];

let contactAudio: HTMLAudioElement | null = null;

function playContactSound() {
  try {
    contactAudio ??= new Audio("/audio/lets-talk.mp3");
    contactAudio.currentTime = 0;
    contactAudio.volume = 0.5;
    void contactAudio.play().catch(() => undefined);
  } catch {
    // Audio is an enhancement; the contact card still opens if sound is unavailable.
  }
}

export function ContactCard() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openCard = () => {
    playContactSound();
    setIsOpen(true);
  };

  const closeCard = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button className="header-cta contact-card-trigger" type="button" onClick={openCard} ref={triggerRef} data-analytics-event="contact_card_open" data-analytics-label="Let's talk">
        Let&apos;s talk <span>{"\u2197"}</span>
      </button>

      {isOpen && (
        <div
          className="contact-card-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCard();
          }}
        >
          <section className="contact-card-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-card-title">
            <button className="contact-card-close" type="button" onClick={closeCard} aria-label="Close contact card" ref={closeButtonRef}>
              &times;
            </button>
            <p className="section-kicker">Connect with Jacob</p>
            <h2 id="contact-card-title">Let&apos;s build something useful.</h2>
            <p className="contact-card-intro">Choose the channel that works best for you. Email is the fastest way to start a conversation.</p>
            <div className="contact-card-links">
              {contactLinks.map((link, index) => (
                <a
                  className={index === 0 ? "contact-card-link contact-card-link-primary" : "contact-card-link"}
                  href={link.href}
                  key={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  data-analytics-event="contact_click"
                  data-analytics-label={link.label}
                >
                  <span>{link.label}</span>
                  <strong>{link.detail}</strong>
                  <b aria-hidden="true">{"\u2197"}</b>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
