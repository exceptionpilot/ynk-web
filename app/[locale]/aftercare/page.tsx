import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";

/**
 * Eigene URL für den QR-Code auf der Aftercare-Karte:
 *   https://<domain>/aftercare  → leitet automatisch auf /de/aftercare bzw. /en/aftercare
 */
export async function generateMetadata({ params }: PageProps<"/[locale]/aftercare">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.meta.aftercareTitle,
    description: t.meta.aftercareDescription,
    alternates: {
      canonical: `/${locale}/aftercare`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/aftercare`])),
    },
    openGraph: { title: t.meta.aftercareTitle, description: t.meta.aftercareDescription, url: `/${locale}/aftercare` },
  };
}

export default async function AftercarePage({ params }: PageProps<"/[locale]/aftercare">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const a = t.aftercare;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{a.eyebrow}</p>
          <h1 className="display h1">{a.title}</h1>
          <p className="lead" style={{ marginTop: 24 }}>{a.intro}</p>
        </div>
      </section>
      <section className="section" style={{ borderTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 48 }}>
          <ol className="timeline" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {a.phases.map((p, i) => (
              <li key={p.time} className="phase reveal">
                <div>
                  <div className="mono muted">0{i + 1}</div>
                  <div className="time">{p.time}</div>
                </div>
                <div>
                  <h2 className="display h3">{p.title}</h2>
                  <ul>
                    {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="split">
            <div className="phase reveal" style={{ border: "1px solid var(--line)" }}>
              <h2 className="display h3">{a.dontsTitle}</h2>
              <ul className="dont-list">
                {a.donts.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
            <div className="warn reveal">
              <h2 className="display h3">{a.warningTitle}</h2>
              <p className="muted" style={{ margin: 0 }}>{a.warning}</p>
            </div>
          </div>
          <div className="reveal" style={{ display: "grid", gap: 16 }}>
            <p className="notice" style={{ margin: 0 }}>✦ {a.touchup}</p>
            <p style={{ margin: 0 }}>
              <a className="link-arrow" href={`mailto:${site.email}?subject=Aftercare`}>{a.contact} → {site.email}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
