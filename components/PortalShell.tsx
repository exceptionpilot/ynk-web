import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { logout } from "@/lib/auth/actions";

export function DashHead({ t, locale, name, role }: { t: Dictionary["portal"]; locale: Locale; name: string; role: string }) {
  return (
    <div className="dash-head">
      <div>
        <p className="eyebrow">{role}</p>
        <h1 className="display h2">{t.welcome} {name}.</h1>
      </div>
      <form action={logout}>
        <input type="hidden" name="locale" value={locale} />
        <button className="btn btn-sm" type="submit">{t.logout} ↗</button>
      </form>
    </div>
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpi">
      <div className="mono muted">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}
