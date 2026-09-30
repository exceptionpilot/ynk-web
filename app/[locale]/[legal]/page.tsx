import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";
import { getLegal, isLegalSlug, legalSlugs } from "@/lib/content/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => legalSlugs.map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[legal]">): Promise<Metadata> {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalSlug(legal)) return {};
  return {
    title: getLegal(legal, locale).title,
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/${legal}` },
  };
}

export default async function LegalPage({ params }: PageProps<"/[locale]/[legal]">) {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalSlug(legal)) notFound();
  const t = await getDictionary(locale);
  const doc = getLegal(legal, locale);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">YNK</p>
          <h1 className="display h2">{doc.title}</h1>
        </div>
      </section>
      <section className="wrap" style={{ padding: "48px var(--gutter) 120px" }}>
        <div className="prose">
          <p className="notice">{t.legal.placeholder}</p>
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ))}
          <p style={{ marginTop: 48 }}>
            <Link href={`/${locale}`} className="link-arrow">← {t.legal.back}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
