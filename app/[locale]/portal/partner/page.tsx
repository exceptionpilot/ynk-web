import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDictionary, type Dictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getSession } from "@/lib/auth/session";
import { accountById } from "@/lib/auth/users";
import { organizerData, studioData, type PartnerEvent, type Payout } from "@/lib/portal/data";
import { events } from "@/lib/content/events";
import { site } from "@/lib/site";
import { fmtDate, fmtMoney, fmtNumber, fmtShort } from "@/lib/format";
import { DashHead, Kpi, Panel } from "@/components/PortalShell";

type T = Dictionary["portal"];

function EventsPanel({ list, t, locale, action }: { list: PartnerEvent[]; t: T; locale: Locale; action?: React.ReactNode }) {
  return (
    <Panel title={t.nextEvents} action={action}>
      <ul className="row-list">
        {list.map((pe) => {
          const e = events.find((x) => x.id === pe.eventId);
          if (!e) return null;
          return (
            <li key={pe.eventId}>
              <div>
                <div className="mono acid">{fmtShort(e.date, locale)}</div>
                <div className="display h3" style={{ margin: "6px 0" }}>{e.title}</div>
                <div className="row-sub">{e.location}, {e.city} · {e.artist}</div>
                <div className="progress" style={{ maxWidth: 240 }}><i style={{ width: `${pe.total ? (pe.booked / pe.total) * 100 : 0}%` }} /></div>
                <div className="row-sub mono" style={{ fontSize: 11, marginTop: 6 }}>{pe.booked}/{pe.total} {t.booked}</div>
              </div>
              <span className={`tag ${pe.status === "confirmed" ? "" : "tag-mute"}`}>{t.status[pe.status]}</span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function PayoutPanel({ list, t, locale }: { list: Payout[]; t: T; locale: Locale }) {
  return (
    <Panel title={t.payouts}>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr><th>{t.period}</th><th className="num">{t.amount}</th><th>{t.payoutStatus}</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.period}>
                <td className="mono">{p.period}</td>
                <td className="num">{fmtMoney(p.amount, locale)}</td>
                <td>{p.paid ? <span className="acid">✓ {t.payoutPaid}</span> : <span className="muted">{t.payoutPending}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export default async function PartnerPortal({ params }: PageProps<"/[locale]/portal/partner">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await getSession();
  if (!session || session.role === "customer") redirect(`/${locale}/portal`);
  const acc = accountById(session.uid);
  const t = await getDictionary(locale);
  const p = t.portal;
  const contact = (
    <a href={`mailto:${site.email}`} className="link-arrow">{p.contactTeam} →</a>
  );
  const calcLink = (as: "studio" | "organizer") => (
    <p style={{ margin: "0 0 24px" }}>
      <Link href={`/${locale}/rechner?als=${as}`} className="link-arrow">{p.calcCta} →</Link>
    </p>
  );

  if (session.role === "studio") {
    const d = studioData[session.uid];
    if (!d) notFound();
    return (
      <div className="wrap">
        <DashHead t={p} locale={locale} name={acc?.name ?? ""} role={p.role.studio} />
        <p className="notice" style={{ marginTop: 24 }}>{p.demoNotice}</p>
        <div className="kpis">
          <Kpi label={p.kpiEvents} value={fmtNumber(d.kpis.events, locale)} />
          <Kpi label={p.kpiTattoos} value={fmtNumber(d.kpis.tattoos, locale)} />
          <Kpi label={p.kpiRevenue} value={fmtMoney(d.kpis.revenue, locale)} />
          <Kpi label={p.kpiRating} value={`${d.kpis.rating.toLocaleString(locale)} ★`} />
        </div>
        {calcLink("studio")}
        <div className="dash-grid">
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <EventsPanel list={d.events} t={p} locale={locale} action={contact} />
            <Panel title={p.flashSets} action={<a href={`mailto:${site.email}?subject=Flash-Set`} className="btn btn-sm btn-primary">{p.uploadFlash}</a>}>
              <ul className="row-list">
                {d.flashSets.map((f) => (
                  <li key={f.title}>
                    <div>
                      <div className="row-title">{f.title}</div>
                      <div className="row-sub">{f.count} {p.motifs}</div>
                    </div>
                    <span className={`tag ${f.approved ? "" : "tag-mute"}`}>{f.approved ? p.approved : p.inReview}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <Panel title={p.documents}>
              <ul className="check-list">
                {d.documents.map((doc) => (
                  <li key={doc.title} className={doc.validUntil ? "done-soft" : ""}>
                    <span className="box" style={doc.validUntil ? { background: "var(--acid)", borderColor: "var(--acid)", color: "var(--acid-ink)" } : { borderColor: "var(--danger)" }}>{doc.validUntil ? "✓" : "!"}</span>
                    <span style={{ flex: 1 }}>{doc.title}</span>
                    <span className="mono muted" style={{ fontSize: 11 }}>{doc.validUntil ? `${p.validUntil} ${fmtDate(doc.validUntil, locale)}` : p.missing}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <PayoutPanel list={d.payouts} t={p} locale={locale} />
          </div>
        </div>
      </div>
    );
  }

  const d = organizerData[session.uid];
  if (!d) notFound();
  return (
    <div className="wrap">
      <DashHead t={p} locale={locale} name={acc?.name ?? ""} role={p.role.organizer} />
      <p className="notice" style={{ marginTop: 24 }}>{p.demoNotice}</p>
      <div className="kpis">
        <Kpi label={p.kpiEvents} value={fmtNumber(d.kpis.events, locale)} />
        <Kpi label={p.kpiGuests} value={fmtNumber(d.kpis.guests, locale)} />
        <Kpi label={p.kpiTattoos} value={fmtNumber(d.kpis.tattoos, locale)} />
        <Kpi label={p.kpiShare} value={fmtMoney(d.kpis.share, locale)} />
      </div>
      {calcLink("organizer")}
      <div className="dash-grid">
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <EventsPanel
            list={d.events}
            t={p}
            locale={locale}
            action={<Link href={`/${locale}#veranstalter`} className="btn btn-sm btn-primary">{p.requestEvent}</Link>}
          />
          <PayoutPanel list={d.payouts} t={p} locale={locale} />
        </div>
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <Panel title={p.checklist} action={contact}>
            <ul className="check-list">
              {d.checklist.map((c) => (
                <li key={c.label.de} className={c.done ? "done" : ""}>
                  <span className="box" aria-hidden>{c.done ? "✓" : ""}</span>
                  <span>{c.label[locale]}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
