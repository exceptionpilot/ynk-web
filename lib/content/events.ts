/**
 * PLATZHALTER – Kommende Events.
 * Einfach Einträge ergänzen/entfernen. Vergangene Events (date < heute)
 * werden automatisch ausgeblendet.
 */
export type YnkEvent = {
  id: string;
  /** ISO-Datum mit Uhrzeit (Europe/Berlin) */
  date: string;
  title: string;
  location: string;
  city: string;
  /** Name(n) der Tätowierer:innen */
  artist: string;
  /** Partner-Studio (id aus studios.ts) */
  studioId: string;
  slotsTotal: number;
  slotsLeft: number;
  /** Deep-Link ins Buchungssystem; leer = allgemeine [BUCHUNGS-URL] */
  bookingUrl?: string;
  eventFlash?: boolean;
};

export const events: YnkEvent[] = [
  { id: "ber-2610", date: "2026-10-10T23:00:00+02:00", title: "Nachtschicht", location: "[CLUB NAME]", city: "Berlin", artist: "Mira K.", studioId: "linework-berlin", slotsTotal: 24, slotsLeft: 9, eventFlash: true },
  { id: "ham-1710", date: "2026-10-17T23:30:00+02:00", title: "Hafenrave", location: "[LOCATION]", city: "Hamburg", artist: "Jonas Vey", studioId: "salt-ink", slotsTotal: 20, slotsLeft: 3 },
  { id: "lei-2410", date: "2026-10-24T22:00:00+02:00", title: "Concrete Sessions", location: "[CLUB NAME]", city: "Leipzig", artist: "Ana Brandt", studioId: "blackbox-leipzig", slotsTotal: 18, slotsLeft: 0 },
  { id: "koe-3110", date: "2026-10-31T23:00:00+01:00", title: "Halloween Warehouse", location: "[LOCATION]", city: "Köln", artist: "Deniz & Lu", studioId: "ritual-cologne", slotsTotal: 32, slotsLeft: 14, eventFlash: true },
  { id: "muc-0711", date: "2026-11-07T23:00:00+01:00", title: "Tunnel Vision", location: "[CLUB NAME]", city: "München", artist: "Sophie Arnd", studioId: "fineline-muc", slotsTotal: 22, slotsLeft: 22 },
  { id: "fra-1411", date: "2026-11-14T23:00:00+01:00", title: "Industrial Nights", location: "[LOCATION]", city: "Frankfurt", artist: "Mira K.", studioId: "linework-berlin", slotsTotal: 20, slotsLeft: 17 },
];

export function upcomingEvents(now = new Date()): YnkEvent[] {
  // Events bleiben bis 12 h nach Beginn sichtbar (laufende Nacht)
  const cutoff = now.getTime() - 12 * 60 * 60 * 1000;
  return events
    .filter((e) => new Date(e.date).getTime() >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));
}
