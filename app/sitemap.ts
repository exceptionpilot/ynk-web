import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { legalSlugs } from "@/lib/content/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/aftercare", "/rechner", ...legalSlugs.map((s) => `/${s}`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: p === "" ? "weekly" : "monthly",
      priority: p === "" ? 1 : p === "/aftercare" || p === "/rechner" ? 0.8 : 0.3,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
