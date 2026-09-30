"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { login, type LoginState } from "@/lib/auth/actions";

type Kind = "customer" | "partner";

export function PortalLogin({
  t,
  locale,
  initial,
  demo,
}: {
  t: Dictionary["portal"];
  locale: Locale;
  initial: Kind;
  demo: { role: string; email: string; secret: string }[];
}) {
  const [kind, setKind] = useState<Kind>(initial);
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const isCustomer = kind === "customer";
  const demos = demo.filter((d) => (isCustomer ? d.role === "customer" : d.role !== "customer"));

  return (
    <div>
      <div className="tabs" role="tablist" aria-label={t.eyebrow}>
        <button role="tab" id="tab-c" aria-controls="login-panel" aria-selected={isCustomer} onClick={() => setKind("customer")}>{t.tabCustomer}</button>
        <button role="tab" id="tab-p" aria-controls="login-panel" aria-selected={!isCustomer} onClick={() => setKind("partner")}>{t.tabPartner}</button>
      </div>
      <div className="form-panel" id="login-panel" role="tabpanel" aria-labelledby={isCustomer ? "tab-c" : "tab-p"}>
        <h2 className="display h3" style={{ margin: "0 0 8px" }}>{isCustomer ? t.customerLoginTitle : t.partnerLoginTitle}</h2>
        <p className="muted" style={{ margin: "0 0 28px" }}>{isCustomer ? t.customerLoginText : t.partnerLoginText}</p>
        <form action={action} className="form" key={kind}>
          <input type="hidden" name="kind" value={kind} />
          <input type="hidden" name="locale" value={locale} />
          <div className="field">
            <label htmlFor="l-email">{t.email}</label>
            <input id="l-email" name="email" type="email" className="input" required autoComplete="email" defaultValue={state.email} />
          </div>
          <div className="field">
            <label htmlFor="l-secret">{isCustomer ? t.bookingCode : t.password}</label>
            <input
              id="l-secret"
              name="secret"
              type={isCustomer ? "text" : "password"}
              className="input"
              required
              autoComplete={isCustomer ? "off" : "current-password"}
              placeholder={isCustomer ? "YNK-0000" : undefined}
              style={isCustomer ? { fontFamily: "var(--font-mono)", textTransform: "uppercase" } : undefined}
            />
          </div>
          {state.error && <p className="form-alert" role="alert">{state.error === "rate" ? t.rateLimited : t.invalid}</p>}
          <div>
            <button className="btn btn-primary" type="submit" disabled={pending}>
              <span className="glitch">{t.login}</span><span className="arrow" aria-hidden>→</span>
            </button>
          </div>
        </form>
        {demos.length > 0 && <div className="demo-box" style={{ marginTop: 28 }}>
          <span>{t.demoHint}:</span>
          {demos.map((d) => (
            <span key={d.email}>
              {d.role} → <code>{d.email}</code> / <code>{d.secret}</code>
            </span>
          ))}
        </div>}
        {!isCustomer && (
          <p className="mono muted" style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span>{t.notPartner}</span>
            <Link href={`/${locale}#studios-partner`} className="link-arrow">{t.applyStudio} →</Link>
            <Link href={`/${locale}#veranstalter`} className="link-arrow">{t.applyOrganizer} →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
