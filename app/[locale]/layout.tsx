import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";
import { CookieBanner } from "@/components/CookieBanner";
import { getDictionary } from "@/lib/i18n";
import { htmlLang, isLocale, locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import "../globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "de" ? "de_DE" : "en_GB",
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={`${archivo.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <Header locale={locale} t={t.nav} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t.footer} />
        <RevealObserver />
        {site.analytics.enabled && <CookieBanner t={t.cookie} />}
      </body>
    </html>
  );
}
