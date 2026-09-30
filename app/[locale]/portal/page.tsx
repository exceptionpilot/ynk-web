import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { getSession } from "@/lib/auth/session";
import { demoAccounts } from "@/lib/auth/users";
import { PortalLogin } from "@/components/PortalLogin";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return { title: t.meta.portalTitle, description: t.meta.portalDescription };
}

export default async function PortalPage({ params, searchParams }: PageProps<"/[locale]/portal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await getSession();
  if (session) redirect(`/${locale}/portal/${session.role === "customer" ? "kunde" : "partner"}`);
  const t = await getDictionary(locale);
  const tab = (await searchParams).tab === "partner" ? "partner" : "customer";
  // Demo-Zugänge nur außerhalb von Production anzeigen, sofern nicht explizit erlaubt
  const showDemo = process.env.NODE_ENV !== "production" || process.env.SHOW_DEMO_LOGINS === "true";

  return (
    <section className="page-hero" style={{ borderBottom: 0, paddingBottom: 120 }}>
      <div className="wrap login-wrap">
        <div>
          <p className="eyebrow">{t.portal.eyebrow}</p>
          <h1 className="display h1">{t.portal.title}</h1>
          <p className="lead" style={{ marginTop: 24 }}>{t.portal.intro}</p>
        </div>
        <PortalLogin t={t.portal} locale={locale} initial={tab} demo={showDemo ? demoAccounts : []} />
      </div>
    </section>
  );
}
