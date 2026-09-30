"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { calculate, parties, type Party } from "@/lib/calculator";

type T = Dictionary["calc"];

const initial = {
  guests: "800",
  hours: "6",
  rate: "4",
  minutes: "30",
  price: "70",
  cost: "",
  artists: "",
  shares: { organizer: "", studio: "", ynk: "" } as Record<Party, string>,
};

const num = (v: string) => {
  if (v.trim() === "") return null;
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

export function RevenueCalculator({ t, locale, initialRole = "organizer" }: { t: T; locale: Locale; initialRole?: Party }) {
  const [v, setV] = useState(initial);
  const [role, setRole] = useState<Party>(initialRole);
  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });
  const setShare = (p: Party) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, shares: { ...v.shares, [p]: e.target.value } });

  const r = useMemo(
    () =>
      calculate({
        guests: num(v.guests) ?? 0,
        rate: num(v.rate) ?? 0,
        hours: num(v.hours) ?? 0,
        minutes: num(v.minutes) ?? 0,
        price: num(v.price) ?? 0,
        cost: num(v.cost) ?? 0,
        artists: num(v.artists),
        shares: { organizer: num(v.shares.organizer), studio: num(v.shares.studio), ynk: num(v.shares.ynk) },
      }),
    [v],
  );

  const intl = locale === "de" ? "de-DE" : "en-GB";
  const eur = (n: number) => new Intl.NumberFormat(intl, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const int = (n: number) => new Intl.NumberFormat(intl, { maximumFractionDigits: 0 }).format(n);
  const pct = (n: number) => `${new Intl.NumberFormat(intl, { maximumFractionDigits: 1 }).format(n)} %`;
  const own = r.split[role];
  const guestsN = num(v.guests);

  return (
    <div className="calc">
      <div className="calc-inputs">
        {/* 1 · Event */}
        <fieldset className="calc-group">
          <legend className="calc-legend"><span>1</span>{t.stepEvent}</legend>
          <div className="field">
            <span className="field-label" id="lbl-preset">{t.presets}</span>
            <div className="seg-wrap" role="group" aria-labelledby="lbl-preset">
              {t.presetItems.map((p) => (
                <button
                  type="button"
                  key={p.label}
                  className="chip"
                  aria-pressed={guestsN === p.guests && num(v.hours) === p.hours}
                  onClick={() => setV({ ...v, guests: String(p.guests), hours: String(p.hours) })}
                >
                  {p.label} · {int(p.guests)}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <NumField id="c-guests" label={t.guests} value={v.guests} onChange={set("guests")} min={0} step={50} />
            <NumField id="c-hours" label={t.hours} value={v.hours} onChange={set("hours")} min={0} max={24} step={0.5} suffix="h" />
          </div>
        </fieldset>

        {/* 2 · Nachfrage & Kapazität */}
        <fieldset className="calc-group">
          <legend className="calc-legend"><span>2</span>{t.stepDemand}</legend>
          <div className="field">
            <label htmlFor="c-rate">{t.rate}</label>
            <div className="range-row">
              <input
                id="c-rate-range"
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={num(v.rate) ?? 0}
                onChange={set("rate")}
                aria-label={t.rate}
              />
              <div className="input-suffix" style={{ width: 110 }}>
                <input id="c-rate" className="input" inputMode="decimal" type="number" min={0} max={100} step={0.5} value={v.rate} onChange={set("rate")} />
                <span>%</span>
              </div>
            </div>
            <div className="seg-wrap">
              {t.scenarios.map((s) => (
                <button type="button" key={s.label} className="chip" aria-pressed={num(v.rate) === s.rate} onClick={() => setV({ ...v, rate: String(s.rate) })}>
                  {s.label} · {pct(s.rate)}
                </button>
              ))}
            </div>
            <span className="hint">{t.rateHint}</span>
          </div>
          <div className="form-row">
            <NumField id="c-minutes" label={t.minutes} value={v.minutes} onChange={set("minutes")} min={5} step={5} suffix="min" hint={t.minutesHint} />
            <NumField id="c-price" label={t.price} value={v.price} onChange={set("price")} min={0} step={5} suffix="€" />
          </div>
          <div className="form-row">
            <NumField id="c-cost" label={t.cost} value={v.cost} onChange={set("cost")} min={0} step={1} suffix="€" hint={t.costHint} placeholder="0" />
            <div className="field">
              <label htmlFor="c-artists">{t.artists}</label>
              <div className="input-suffix">
                <input
                  id="c-artists"
                  className="input"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={v.artists}
                  placeholder={String(r.recommended)}
                  onChange={set("artists")}
                />
              </div>
              <span className="hint">
                {t.artistsHint}{" "}
                {v.artists !== "" && (
                  <button type="button" className="text-btn" onClick={() => setV({ ...v, artists: "" })}>{t.artistsAuto} ({r.recommended})</button>
                )}
              </span>
            </div>
          </div>
        </fieldset>

        {/* 3 · Deal */}
        <fieldset className="calc-group">
          <legend className="calc-legend"><span>3</span>{t.stepDeal}</legend>
          <div className="field">
            <span className="field-label" id="lbl-role">{t.role}</span>
            <div className="seg-wrap" role="radiogroup" aria-labelledby="lbl-role">
              {parties.map((p) => (
                <button type="button" role="radio" key={p} className="chip" aria-checked={role === p} aria-pressed={role === p} onClick={() => setRole(p)}>
                  {t.roles[p]}
                </button>
              ))}
            </div>
          </div>
          <div className="share-grid">
            {parties.map((p) => (
              <div className="field" key={p}>
                <label htmlFor={`c-share-${p}`}>
                  {t.shareOf} {t.roles[p]} {p === role && <span className="acid">· {t.yourShare}</span>}
                </label>
                <div className={`input-suffix ${p === role ? "is-own" : ""}`}>
                  <input
                    id={`c-share-${p}`}
                    className="input"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step={0.5}
                    value={v.shares[p]}
                    placeholder={t.sharePlaceholder}
                    onChange={setShare(p)}
                    aria-invalid={r.overAllocated || undefined}
                  />
                  <span>%</span>
                </div>
              </div>
            ))}
          </div>
          <span className="hint">{t.shareHint}</span>
          {r.overAllocated && <p className="form-alert" role="alert" style={{ margin: 0 }}>{t.overAllocated}</p>}
        </fieldset>
      </div>

      {/* Ergebnis */}
      <aside className="calc-result" aria-live="polite" aria-label={t.resultTitle}>
        <div className="calc-own">
          <p className="mono muted" style={{ margin: 0 }}>{t.yourShare} · {t.roles[role]}</p>
          {own != null ? (
            <>
              <p className="calc-big acid">{eur(own)}</p>
              {role === "studio" && r.perArtistEarning != null && r.artists > 0 && (
                <p className="mono" style={{ margin: 0 }}>≈ {eur(r.perArtistEarning)} {t.perArtistEarning} ({r.artists})</p>
              )}
            </>
          ) : (
            <p className="muted" style={{ margin: "12px 0 0" }}>{t.enterDeal}</p>
          )}
        </div>

        <dl className="calc-stats">
          <Stat label={t.demand} value={int(r.demand)} />
          <Stat label={t.perArtist} value={int(r.perArtist)} />
          <Stat label={t.recommended} value={int(r.recommended)} strong />
          <Stat label={t.tattoos} value={int(r.tattoos)} />
        </dl>
        {r.unserved > 0 && <p className="calc-warn">+{int(r.unserved)} {t.unserved}</p>}
        <div>
          <div className="mono muted" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{t.utilisation}</span>
            <span>{pct(r.utilisation * 100)}</span>
          </div>
          <div className="progress"><i style={{ width: `${Math.min(100, r.utilisation * 100)}%` }} /></div>
        </div>

        <table className="calc-table">
          <tbody>
            <tr><th scope="row">{t.gross}</th><td>{eur(r.gross)}</td></tr>
            {r.costs > 0 && <tr><th scope="row">− {t.costs}</th><td>{eur(r.costs)}</td></tr>}
            <tr className="total"><th scope="row">{t.net}</th><td>{eur(r.net)}</td></tr>
          </tbody>
        </table>

        <div>
          <p className="mono muted" style={{ margin: "0 0 10px" }}>{t.split}</p>
          <div className="split-bar" aria-hidden>
            {parties.map((p) =>
              r.split[p] != null && r.net > 0 ? (
                <i key={p} className={`seg-${p} ${p === role ? "own" : ""}`} style={{ width: `${Math.max(0, Math.min(100, ((r.split[p] as number) / r.net) * 100))}%` }} />
              ) : null,
            )}
          </div>
          <ul className="split-list">
            {parties.map((p) => (
              <li key={p} className={p === role ? "own" : ""}>
                <span><i className={`dot seg-${p}`} />{t.roles[p]}</span>
                <span className="mono">{v.shares[p] !== "" ? pct(num(v.shares[p]) ?? 0) : "–"}</span>
                <span>{r.split[p] != null ? eur(r.split[p] as number) : "–"}</span>
              </li>
            ))}
            {r.unassigned != null && r.unassigned > 0 && !r.overAllocated && (
              <li className="muted">
                <span><i className="dot" />{t.unassigned}</span>
                <span className="mono">{pct(r.unassigned)}</span>
                <span>{eur(r.unassignedAmount ?? 0)}</span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="mono muted" style={{ margin: "0 0 10px" }}>{t.setup}</p>
          <dl className="calc-stats three">
            <Stat label={t.stations} value={int(r.artists)} />
            <Stat label={t.area} value={`${int(r.area)} m²`} />
            <Stat label={t.sockets} value={int(r.sockets)} />
          </dl>
        </div>
        <p className="mono muted" style={{ margin: 0, fontSize: 11 }}>{t.perGuest}: {eur(r.perGuest)}</p>
        <p className="hint" style={{ margin: 0 }}>{t.disclaimer}</p>
        <div>
          <button type="button" className="btn btn-sm" onClick={() => setV(initial)}>{t.reset}</button>
        </div>
      </aside>
    </div>
  );
}

function NumField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-suffix">
        <input id={id} className="input" type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={onChange} placeholder={placeholder} />
        {suffix && <span>{suffix}</span>}
      </div>
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "strong" : undefined}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
