import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import { upcomingEvents, type YnkEvent } from "@/lib/content/events";
import { studioById, studios } from "@/lib/content/studios";
import { gallery } from "@/lib/content/gallery";
import { fmtDay, fmtMonth, fmtShort, fmtWeekdayTime } from "@/lib/format";
import { Motif, type MotifName } from "./Motif";
import { Gallery } from "./Gallery";
import { OrganizerForm, StudioForm, WaitlistForm } from "./Forms";

type P = { t: Dictionary; locale: Locale };

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <div className="reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display h2">{title}</h2>
      </div>
      {children && <div className="reveal reveal-delay-1">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Hero */
function NeedleArt() {
  return (
    <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1" className="hero-needle" aria-hidden>
      <circle cx="300" cy="300" r="280" strokeDasharray="1 7" />
      <circle cx="300" cy="300" r="220" />
      <circle cx="300" cy="300" r="150" strokeDasharray="4 10" />
      <circle cx="300" cy="300" r="12" />
      <path d="M300 20 L300 580 M20 300 L580 300" strokeOpacity=".4" />
      <path d="M180 120 L420 480" />
      <path d="M190 112 L430 472" strokeOpacity=".5" />
      <rect x="140" y="60" width="70" height="110" transform="rotate(-33.7 175 115)" />
      <path d="M420 480 L448 522" strokeWidth="0.6" />
    </svg>
  );
}

export function Hero({ t, locale }: P) {
  const next = upcomingEvents()[0];
  return (
    <section className="hero scanlines" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden>
        {site.heroVideo.src ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={site.heroVideo.poster || undefined}>
            <source src={site.heroVideo.src} type="video/mp4" />
          </video>
        ) : (
          <div className="hero-lights">
            <div className="beam b1" />
            <div className="beam b2" />
            <div className="beam b3" />
            <NeedleArt />
            <div className="strobe" />
          </div>
        )}
      </div>
      <div className="wrap hero-content">
        <p className="eyebrow kicker">{t.hero.kicker}</p>
        <h1 id="hero-title" className="display h1">
          Ink the<br />Night<span className="dot">.</span>
        </h1>
        <p className="hero-claim chrome-text">{t.hero.claim}</p>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-ctas">
          <a href="#events" className="btn btn-primary"><span className="glitch">{t.hero.ctaEvents}</span><span className="arrow" aria-hidden>↓</span></a>
          <a href="#veranstalter" className="btn"><span className="glitch">{t.hero.ctaBook}</span><span className="arrow" aria-hidden>→</span></a>
        </div>
        {next && (
          <div className="hero-meta mono">
            <span>Next →</span>
            <span style={{ color: "var(--fg)" }}>{fmtShort(next.date, locale)} · {next.city}</span>
            <span>{next.title}</span>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Marquee */
export function Marquee({ t, locale }: P) {
  const items = upcomingEvents();
  const list = items.length ? items : null;
  const row = (key: string) => (
    <div className="marquee-item" key={key} aria-hidden={key !== "a"}>
      {list
        ? list.map((e) => (
            <span key={e.id} style={{ display: "inline-flex", gap: 18, alignItems: "center" }}>
              <span>{fmtShort(e.date, locale)}</span>
              <b>{e.city}</b>
              <span>{e.title}</span>
              <span className="star">✦</span>
            </span>
          ))
        : <span>{site.claim} <span className="star">✦</span></span>}
    </div>
  );
  return (
    <div className="marquee" role="region" aria-label={t.events.marquee}>
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Audiences */
export function Audiences({ t }: P) {
  const entries = [
    { href: "#events", ...t.audiences.guests },
    { href: "#veranstalter", ...t.audiences.organizers },
    { href: "#studios-partner", ...t.audiences.studios },
  ];
  return (
    <section className="wrap" aria-label={t.audiences.title} style={{ padding: "clamp(48px,8vw,96px) var(--gutter)" }}>
      <p className="eyebrow reveal">{t.audiences.title}</p>
      <div className="grid cols-3 entries">
        {entries.map((e, i) => (
          <a key={e.href} href={e.href} className={`sweep reveal reveal-delay-${i + 1}`}>
            <span className="mono num">0{i + 1}</span>
            <h3 className="display h3">{e.label}</h3>
            <span className="muted">{e.text}</span>
            <span className="link-arrow" style={{ alignSelf: "flex-start" }}>{e.cta} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ How it works */
export function HowItWorks({ t }: P) {
  return (
    <section className="section" id="so-gehts" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">{t.how.eyebrow}</p>
            <h2 id="how-title" className="display h2">{t.how.title}</h2>
          </div>
        </div>
        <ol className="grid cols-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {t.how.steps.map((s, i) => (
            <li key={s.title} className={`card sweep reveal reveal-delay-${i + 1}`}>
              <div className="step-num" aria-hidden>0{i + 1}</div>
              <h3 className="display h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Events */
function EventCard({ e, t, locale }: { e: YnkEvent; t: Dictionary["events"]; locale: Locale }) {
  const soldOut = e.slotsLeft <= 0;
  const url = e.bookingUrl || site.bookingUrl;
  const studio = studioById(e.studioId);
  return (
    <article className="event sweep reveal">
      <div className="event-date">
        <time dateTime={e.date} className="day">{fmtDay(e.date, locale)}</time>
        <span className="mon">{fmtMonth(e.date, locale)}<br /><span className="muted">{fmtWeekdayTime(e.date, locale)}</span></span>
      </div>
      <div>
        <h3 className="event-title">{e.title}</h3>
        {e.eventFlash && <span className="tag">✦ {t.limited}</span>}
      </div>
      <dl>
        <dt>{t.location}</dt><dd>{e.location}</dd>
        <dt>{t.city}</dt><dd>{e.city}</dd>
        <dt>{t.artist}</dt><dd>{e.artist}{studio ? <span className="muted"> · {studio.name}</span> : null}</dd>
      </dl>
      <div className="event-cta">
        <div className="slots">
          {soldOut ? <span style={{ color: "var(--danger)" }}>{t.soldOut}</span> : <span><span className="acid">{e.slotsLeft}</span> / {e.slotsTotal} {t.slots} {t.slotsLeft}</span>}
          <div className="slotbar" aria-hidden><i style={{ width: `${Math.max(0, Math.min(100, ((e.slotsTotal - e.slotsLeft) / e.slotsTotal) * 100))}%` }} /></div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-sm ${soldOut ? "" : "btn-primary"}`}
          aria-label={`${soldOut ? t.waitlist : t.book}: ${e.title}, ${e.city} (${t.external})`}
        >
          <span className="glitch">{soldOut ? t.waitlist : t.book}</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}

export function Events({ t, locale }: P) {
  const list = upcomingEvents();
  return (
    <section className="section" id="events" aria-labelledby="events-title">
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">{t.events.eyebrow}</p>
            <h2 id="events-title" className="display h2">{t.events.title}</h2>
          </div>
        </div>
        {list.length === 0 ? (
          <p className="lead">{t.events.empty}</p>
        ) : (
          <div className="event-list">
            {list.map((e) => <EventCard key={e.id} e={e} t={t.events} locale={locale} />)}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Services */
const serviceMotif: Record<string, MotifName> = { flash: "dagger", event: "star", fineline: "rose", gems: "eye", grillz: "bolt" };

export function Services({ t }: P) {
  return (
    <section className="section" id="leistungen" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2 id="services-title" className="display h2">{t.services.title}</h2>
          </div>
        </div>
        <div className="grid services-grid">
          {t.services.items.map((s, i) => (
            <article key={s.key} className={`card service sweep reveal reveal-delay-${(i % 3) + 1} ${s.soon ? "soon" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
                <Motif name={serviceMotif[s.key] ?? "star"} className="motif" />
                {s.soon ? <span className="tag tag-chrome">{t.services.comingSoon}</span> : s.badge ? <span className="tag">{s.badge}</span> : null}
              </div>
              <h3 className="display h3">{s.title}</h3>
              <p>{s.text}</p>
              {!s.soon && (
                <div className="meta">
                  <div>
                    <div className="mono muted">{t.services.from}</div>
                    <div className="price">{s.price}</div>
                  </div>
                  <div>
                    <div className="mono muted">{t.services.duration}</div>
                    <div className="mono" style={{ fontSize: 14, marginTop: 8 }}>{s.duration}</div>
                  </div>
                </div>
              )}
            </article>
          ))}
          <a href="#grillz" className="card service sweep reveal" style={{ textDecoration: "none", justifyContent: "flex-end" }}>
            <span className="mono muted">Future Drop</span>
            <span className="display h3 chrome-text">Grillz →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Gallery */
export function GallerySection({ t }: P) {
  return (
    <section className="section" id="galerie" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">{t.gallery.eyebrow}</p>
            <h2 id="gallery-title" className="display h2">{t.gallery.title}</h2>
          </div>
        </div>
        <div className="reveal">
          <Gallery items={gallery} studios={studios.map(({ id, name }) => ({ id, name }))} t={t.gallery} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Studios */
export function Studios({ t }: P) {
  return (
    <section className="section" id="studios" aria-labelledby="studios-title">
      <div className="wrap">
        <SectionHead eyebrow={t.studios.eyebrow} title={t.studios.title}>
          <p className="lead">{t.studios.text}</p>
        </SectionHead>
        <ul className="grid studios-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {studios.map((s, i) => (
            <li key={s.id} className={`studio sweep reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="studio-logo" aria-hidden>
                {s.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logo} alt="" />
                ) : (
                  s.name.split(/\s+/).filter((w) => /\w/.test(w)).map((w) => w[0]).slice(0, 2).join("")
                )}
              </div>
              <div>
                <h3 className="display">{s.name}</h3>
                <p className="mono muted" style={{ margin: "8px 0 0" }}>{s.city} · {s.styles.join(" / ")}</p>
              </div>
              <a className="link-arrow ig" href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}>
                @{s.instagram} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Split helper */
function FeatureList({ items, offset = 0 }: { items: { title: string; text: string }[]; offset?: number }) {
  return (
    <ul className="feature-list">
      {items.map((b, i) => (
        <li key={b.title} className="reveal">
          <span className="idx">{String(i + 1 + offset).padStart(2, "0")}</span>
          <div>
            <strong>{b.title}</strong>
            <span>{b.text}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CalcTeaser({ href, text, cta }: { href: string; text: string; cta: string }) {
  return (
    <div className="calc-teaser reveal">
      <p>{text}</p>
      <Link href={href} className="btn btn-sm btn-primary"><span className="glitch">{cta}</span><span className="arrow" aria-hidden>→</span></Link>
    </div>
  );
}

/* -------------------------------------------------------------- Organizers */
export function Organizers({ t, locale }: P) {
  const o = t.organizers;
  return (
    <section className="section" id="veranstalter" aria-labelledby="org-title">
      <div className="wrap split">
        <div>
          <p className="eyebrow reveal">{o.eyebrow}</p>
          <h2 id="org-title" className="display h2 reveal">{o.title}</h2>
          <p className="lead reveal" style={{ marginTop: 24 }}>{o.text}</p>
          <p className="big-stat acid reveal" style={{ margin: "40px 0 0" }} aria-hidden>0 €</p>
          <p className="block-title">{o.benefitsTitle}</p>
          <FeatureList items={o.benefits} />
          <p className="block-title">{o.requirementsTitle}</p>
          <FeatureList items={o.requirements} />
          <CalcTeaser href={`/${locale}/rechner?als=organizer`} text={o.calcCta} cta={t.calc.cta} />
        </div>
        <div className="form-panel reveal" style={{ position: "sticky", top: 96 }}>
          <h3 className="display h3">{o.formTitle}</h3>
          <p>{o.formText}</p>
          <OrganizerForm t={t.forms} locale={locale} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Studio partner */
export function PartnerStudios({ t, locale }: P) {
  const p = t.partner;
  return (
    <section className="section" id="studios-partner" aria-labelledby="partner-title">
      <div className="wrap split">
        <div>
          <p className="eyebrow reveal">{p.eyebrow}</p>
          <h2 id="partner-title" className="display h2 reveal">{p.title}</h2>
          <p className="lead reveal" style={{ marginTop: 24 }}>{p.text}</p>
          <p className="block-title">{p.benefitsTitle}</p>
          <FeatureList items={p.benefits} />
          <p className="block-title">{p.requirementsTitle}</p>
          <FeatureList items={p.requirements} />
          <CalcTeaser href={`/${locale}/rechner?als=studio`} text={p.calcCta} cta={t.calc.cta} />
        </div>
        <div className="form-panel reveal" style={{ position: "sticky", top: 96 }}>
          <h3 className="display h3">{p.formTitle}</h3>
          <p>{p.formText}</p>
          <StudioForm t={t.forms} locale={locale} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Grillz */
export function Grillz({ t, locale }: P) {
  const g = t.grillz;
  return (
    <section className="section grillz" id="grillz" aria-labelledby="grillz-title" style={{ isolation: "isolate" }}>
      <div className="grillz-bg" aria-hidden />
      <div className="wrap split">
        <div>
          <p className="eyebrow reveal">{g.eyebrow}</p>
          <h2 id="grillz-title" className="display grillz-title chrome-text reveal">{g.title}</h2>
          <div className="grillz-teeth reveal" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
          </div>
          <p className="display h3 reveal" style={{ marginBottom: 16 }}>{g.sub}</p>
          <p className="lead reveal">{g.text}</p>
          <p className="reveal" style={{ marginTop: 24 }}><span className="tag tag-mute">● {g.status}</span></p>
        </div>
        <div className="form-panel reveal">
          <h3 className="display h3 chrome-text" style={{ marginBottom: 24 }}>{g.formTitle}</h3>
          <WaitlistForm t={t.forms} locale={locale} />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- FAQ */
export function Faq({ t, locale }: P) {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap split">
        <div>
          <p className="eyebrow reveal">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="display h2 reveal">{t.faq.title}</h2>
          <p className="reveal" style={{ marginTop: 32 }}>
            <Link href={`/${locale}/aftercare`} className="link-arrow">{t.nav.aftercare} →</Link>
          </p>
        </div>
        <div className="faq reveal">
          {t.faq.items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="answer">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Strukturierte Daten für FAQ + Events (SEO). */
export function JsonLd({ t, locale }: P) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: `${site.url}/${locale}`,
      slogan: site.claim,
      email: site.email,
      sameAs: [site.social.instagram, site.social.tiktok],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    ...upcomingEvents().map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `YNK – ${e.title}`,
      startDate: e.date,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: e.location, address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "DE" } },
      organizer: { "@type": "Organization", name: site.name, url: site.url },
      offers: { "@type": "Offer", url: e.bookingUrl || site.bookingUrl, availability: e.slotsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut" },
    })),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
