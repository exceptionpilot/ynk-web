import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { getSession } from "@/lib/auth/session";
import { accountById } from "@/lib/auth/users";
import { customerData } from "@/lib/portal/data";
import { events } from "@/lib/content/events";
import { site } from "@/lib/site";
import { fmtDate, fmtMoney, fmtShort, fmtWeekdayTime } from "@/lib/format";
import { DashHead, Panel } from "@/components/PortalShell";
import { PrivacyRequest } from "@/components/PrivacyRequest";
import { Motif } from "@/components/Motif";

const HEAL_DAYS = 28;

export default async function CustomerPortal({ params }: PageProps<"/[locale]/portal/kunde">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await getSession();
  if (!session || session.role !== "customer") redirect(`/${locale}/portal`);
  const acc = accountById(session.uid);
  const data = customerData[session.uid] ?? { bookings: [], tattoos: [], waitlistPosition: null };
  const t = await getDictionary(locale);
  const p = t.portal;
  const now = Date.now();

  const bookings = data.bookings
    .map((b) => ({ ...b, event: events.find((e) => e.id === b.eventId) }))
    .filter((b) => b.event && new Date(b.event.date).getTime() > now - 12 * 3600e3);

  return (
    <div className="wrap">
      <DashHead t={p} locale={locale} name={acc?.name ?? ""} role={p.customerLoginTitle} />
      <p className="notice" style={{ marginTop: 24 }}>{p.demoNotice}</p>

      <div className="dash-grid" style={{ marginTop: 32 }}>
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <Panel title={p.upcoming} action={<Link href={`/${locale}#events`} className="link-arrow">{p.findEvent} →</Link>}>
            {bookings.length === 0 ? (
              <p className="panel-body muted" style={{ margin: 0 }}>{p.noUpcoming}</p>
            ) : (
              <ul className="row-list">
                {bookings.map((b) => (
                  <li key={b.code}>
                    <div>
                      <div className="mono acid">{fmtShort(b.event!.date, locale)} · {fmtWeekdayTime(b.event!.date, locale)}</div>
                      <div className="display h3" style={{ margin: "6px 0" }}>{b.event!.title}</div>
                      <div className="row-sub">{b.event!.location}, {b.event!.city} · {b.event!.artist}</div>
                      <div className="row-sub" style={{ marginTop: 8 }}>
                        {p.slot}: <b>{b.slot}</b> · {p.motif}: <b>{b.motif}</b>
                      </div>
                      <div className="row-sub">
                        {p.deposit}: {fmtMoney(b.deposit, locale)}{" "}
                        <span className={b.depositPaid ? "acid" : ""} style={b.depositPaid ? undefined : { color: "var(--danger)" }}>({b.depositPaid ? p.paid : p.open})</span>
                      </div>
                    </div>
                    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
                      <span className="tag tag-mute">{p.ticket}: {b.code}</span>
                      <a href={b.event!.bookingUrl || site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">{p.manageBooking} ↗</a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title={p.myTattoos} action={<Link href={`/${locale}/aftercare`} className="link-arrow">{p.aftercareGuide} →</Link>}>
            <ul className="row-list">
              {data.tattoos.map((tt) => {
                const day = Math.max(1, Math.floor((now - new Date(tt.date).getTime()) / 86400e3) + 1);
                const healed = day >= HEAL_DAYS;
                return (
                  <li key={tt.id}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <Motif name={tt.motif} className="tattoo-thumb" />
                      <div style={{ flex: 1 }}>
                        <div className="row-title">{tt.title}</div>
                        <div className="row-sub">{tt.studio} · {fmtDate(tt.date, locale)}</div>
                        <div className="progress" aria-label={p.healing}><i style={{ width: `${Math.min(100, (day / HEAL_DAYS) * 100)}%` }} /></div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gap: 6, justifyItems: "start" }}>
                      <span className="mono">{healed ? <span className="acid">✓ {p.healed}</span> : `${p.healing}: ${p.day} ${day} ${p.of} ${HEAL_DAYS}`}</span>
                      <span className="mono muted" style={{ fontSize: 11 }}>{p.consentForm}: {tt.consentSigned ? p.consentSigned : p.consentPending}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <Panel title={p.waitlistTitle}>
            <div className="panel-body">
              {data.waitlistPosition ? (
                <>
                  <div className="mono muted">{p.waitlistPosition}</div>
                  <div className="big-stat chrome-text" style={{ fontSize: 88 }}>#{data.waitlistPosition}</div>
                </>
              ) : (
                <Link href={`/${locale}#grillz`} className="btn btn-chrome btn-sm">{p.waitlistJoin}</Link>
              )}
            </div>
          </Panel>
          <Panel title={p.privacyTitle}>
            <div className="panel-body" style={{ display: "grid", gap: 16 }}>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>{p.privacyText}</p>
              <PrivacyRequest labels={{ export: p.requestExport, delete: p.requestDelete, sent: p.requestSent }} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
