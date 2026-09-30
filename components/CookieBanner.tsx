"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const KEY = "ynk-consent";

/**
 * Wird nur gerendert, wenn `site.analytics.enabled` true ist.
 * Tracking-Skripte erst laden, wenn `getConsent() === "granted"`.
 */
export function CookieBanner({ t }: { t: Dictionary["cookie"] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  const decide = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    window.dispatchEvent(new CustomEvent("ynk-consent", { detail: v }));
    setShow(false);
  };
  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Cookies">
      <p>{t.text}</p>
      <div className="actions">
        <button className="btn btn-sm btn-primary" onClick={() => decide("granted")}>{t.accept}</button>
        <button className="btn btn-sm" onClick={() => decide("denied")}>{t.decline}</button>
      </div>
    </div>
  );
}
