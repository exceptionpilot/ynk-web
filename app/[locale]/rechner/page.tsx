import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";
import { parties, type Party } from "@/lib/calculator";
import { RevenueCalculator } from "@/components/RevenueCalculator";

export async function generateMetadata({ params }: PageProps<"/[locale]/rechner">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.meta.calcTitle,
    description: t.meta.calcDescription,
    alternates: {
      canonical: `/${locale}/rechner`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/rechner`])),
    },
    openGraph: { title: t.meta.calcTitle, description: t.meta.calcDescription, url: `/${locale}/rechner` },
  };
}

export default async function CalculatorPage({ params, searchParams }: PageProps<"/[locale]/rechner">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  // ?als=studio | organizer | ynk wählt die Perspektive vor (Links aus Sektionen/Portal)
  const als = (await searchParams).als;
  const role: Party = typeof als === "string" && (parties as string[]).includes(als) ? (als as Party) : "organizer";
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{t.calc.eyebrow}</p>
          <h1 className="display h2">{t.calc.title}</h1>
          <p className="lead" style={{ marginTop: 24 }}>{t.calc.intro}</p>
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "48px 120px" }}>
        <RevenueCalculator t={t.calc} locale={locale} initialRole={role} key={role} />
      </section>
    </>
  );
}
