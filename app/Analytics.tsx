"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_KEY, trackAnalyticsEvent } from "./analytics-events";

type ConsentState = "loading" | "pending" | "granted" | "denied";

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const measurementId = /^G-[A-Z0-9]+$/i.test(configuredMeasurementId) ? configuredMeasurementId : "";

export function Analytics() {
  const [consent, setConsent] = useState<ConsentState>("loading");

  useEffect(() => {
    if (!measurementId) return;

    let initialConsent: ConsentState = "pending";
    try {
      const storedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      initialConsent = storedConsent === "granted" || storedConsent === "denied" ? storedConsent : "pending";
    } catch {
      initialConsent = "pending";
    }

    const initialUpdate = window.setTimeout(() => setConsent(initialConsent), 0);
    const openPreferences = () => setConsent("pending");
    window.addEventListener("portfolio:open-analytics", openPreferences);
    return () => {
      window.clearTimeout(initialUpdate);
      window.removeEventListener("portfolio:open-analytics", openPreferences);
    };
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;

    const handleTrackedClick = (event: MouseEvent) => {
      const source = event.target;
      if (!(source instanceof Element)) return;

      const target = source.closest<HTMLElement>("[data-analytics-event]");
      const eventName = target?.dataset.analyticsEvent;
      if (!target || !eventName) return;

      const label = target.dataset.analyticsLabel ?? target.getAttribute("aria-label") ?? target.textContent?.trim().slice(0, 100) ?? "unlabeled";
      const linkUrl = target instanceof HTMLAnchorElement ? target.href : "";

      trackAnalyticsEvent(eventName, {
        event_label: label,
        link_url: linkUrl,
        page_location: window.location.href,
      });
    };

    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, [consent]);

  const chooseConsent = (choice: "granted" | "denied") => {
    const wasGranted = consent === "granted";
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
    } catch {
      // The in-memory choice still applies when storage is unavailable.
    }

    window.gtag?.("consent", "update", {
      analytics_storage: choice,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setConsent(choice);
    if (wasGranted && choice === "denied") window.location.reload();
  };

  if (!measurementId) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('config', '${measurementId}', { send_page_view: true });`}
          </Script>
        </>
      )}

      {consent === "pending" && (
        <aside className="analytics-consent" aria-labelledby="analytics-consent-title">
          <div>
            <strong id="analytics-consent-title">Help improve this portfolio?</strong>
            <p>Allow anonymous analytics for visits, engagement, approximate location, and portfolio clicks. Form names, emails, and notes are never sent.</p>
          </div>
          <div className="analytics-consent-actions">
            <button type="button" className="analytics-decline" onClick={() => chooseConsent("denied")}>Not now</button>
            <button type="button" className="analytics-accept" onClick={() => chooseConsent("granted")}>Allow analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}

export function AnalyticsPreferencesButton() {
  if (!measurementId) return null;

  return (
    <button
      className="analytics-preferences"
      type="button"
      onClick={() => window.dispatchEvent(new Event("portfolio:open-analytics"))}
    >
      Analytics settings
    </button>
  );
}
