export const ANALYTICS_CONSENT_KEY = "portfolio-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(eventName: string, parameters: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "granted") return;
    window.gtag?.("event", eventName, parameters);
  } catch {
    // Analytics should never interrupt the portfolio experience.
  }
}
