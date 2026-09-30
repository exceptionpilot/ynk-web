import type { Locale } from "@/lib/i18n/config";

const tz = "Europe/Berlin";
const intl = (l: Locale) => (l === "de" ? "de-DE" : "en-GB");

export const fmtDay = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(intl(l), { day: "2-digit", timeZone: tz }).format(new Date(iso));
export const fmtMonth = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(intl(l), { month: "short", year: "numeric", timeZone: tz }).format(new Date(iso));
export const fmtWeekdayTime = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(intl(l), { weekday: "short", hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(iso));
export const fmtDate = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(intl(l), { day: "2-digit", month: "2-digit", year: "numeric", timeZone: tz }).format(new Date(iso));
export const fmtShort = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(intl(l), { day: "2-digit", month: "short", timeZone: tz }).format(new Date(iso));
export const fmtMoney = (n: number, l: Locale) =>
  new Intl.NumberFormat(intl(l), { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const fmtNumber = (n: number, l: Locale) => new Intl.NumberFormat(intl(l)).format(n);
