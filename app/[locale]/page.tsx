import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import {
  Audiences,
  Events,
  Faq,
  GallerySection,
  Grillz,
  Hero,
  HowItWorks,
  JsonLd,
  Marquee,
  Organizers,
  PartnerStudios,
  Services,
  Studios,
} from "@/components/Home";

// Stündlich neu rendern, damit vergangene Events automatisch verschwinden
export const revalidate = 3600;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = { t, locale };
  return (
    <>
      <Hero {...p} />
      <Marquee {...p} />
      <Audiences {...p} />
      <HowItWorks {...p} />
      <Events {...p} />
      <Services {...p} />
      <GallerySection {...p} />
      <Studios {...p} />
      <Organizers {...p} />
      <PartnerStudios {...p} />
      <Grillz {...p} />
      <Faq {...p} />
      <JsonLd {...p} />
    </>
  );
}
