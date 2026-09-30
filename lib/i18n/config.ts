export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, string> = { de: "DE", en: "EN" };
export const htmlLang: Record<Locale, string> = { de: "de-DE", en: "en" };
