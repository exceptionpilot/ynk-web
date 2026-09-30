import "server-only";

/**
 * DEMO-Daten für die Portale. Später durch API-Aufrufe
 * (Buchungssystem, Abrechnung, CMS) ersetzen – die Typen bleiben gleich.
 */
export type CustomerBooking = {
  code: string;
  eventId: string;
  slot: string;
  motif: string;
  depositPaid: boolean;
  deposit: number;
};

export type CustomerTattoo = {
  id: string;
  motif: "rose" | "star" | "moon" | "bolt";
  title: string;
  studio: string;
  date: string;
  consentSigned: boolean;
};

export const customerData: Record<string, { bookings: CustomerBooking[]; tattoos: CustomerTattoo[]; waitlistPosition: number | null }> = {
  "c-001": {
    bookings: [
      { code: "YNK-4821", eventId: "ber-2610", slot: "01:30–02:00", motif: "Strobe Star (Event-Flash)", depositPaid: true, deposit: 20 },
      { code: "YNK-5170", eventId: "koe-3110", slot: "00:15–00:45", motif: "Web", depositPaid: false, deposit: 20 },
    ],
    tattoos: [
      { id: "t1", motif: "moon", title: "Moon Phase", studio: "Needle & Thread", date: "2026-09-19", consentSigned: true },
      { id: "t2", motif: "bolt", title: "Bolt", studio: "Blackbox", date: "2026-07-04", consentSigned: true },
    ],
    waitlistPosition: 137,
  },
};

export type PartnerEvent = { eventId: string; status: "confirmed" | "pending" | "requested" | "done"; booked: number; total: number };
export type Payout = { period: string; amount: number; paid: boolean };

export const studioData: Record<string, {
  kpis: { events: number; tattoos: number; revenue: number; rating: number };
  events: PartnerEvent[];
  flashSets: { title: string; count: number; approved: boolean }[];
  documents: { title: string; validUntil: string | null }[];
  payouts: Payout[];
}> = {
  "s-linework": {
    kpis: { events: 14, tattoos: 286, revenue: 18420, rating: 4.9 },
    events: [
      { eventId: "ber-2610", status: "confirmed", booked: 15, total: 24 },
      { eventId: "fra-1411", status: "pending", booked: 3, total: 20 },
    ],
    flashSets: [
      { title: "Nachtschicht – Event-Flash", count: 12, approved: true },
      { title: "Fine Line Botanicals", count: 18, approved: true },
      { title: "Industrial Nights", count: 9, approved: false },
    ],
    documents: [
      { title: "Betriebshaftpflicht", validUntil: "2027-03-31" },
      { title: "Hygienekonzept", validUntil: "2027-01-15" },
      { title: "Gewerbeanmeldung", validUntil: null },
    ],
    payouts: [
      { period: "09/2026", amount: 2310, paid: false },
      { period: "08/2026", amount: 3140, paid: true },
      { period: "07/2026", amount: 2780, paid: true },
    ],
  },
};

export const organizerData: Record<string, {
  kpis: { events: number; guests: number; tattoos: number; share: number };
  events: PartnerEvent[];
  checklist: { label: { de: string; en: string }; done: boolean }[];
  payouts: Payout[];
}> = {
  "o-001": {
    kpis: { events: 6, guests: 5400, tattoos: 131, share: 1965 },
    events: [
      { eventId: "ber-2610", status: "confirmed", booked: 15, total: 24 },
      { eventId: "fra-1411", status: "requested", booked: 0, total: 20 },
    ],
    checklist: [
      { label: { de: "Fläche 10–20 m² reserviert", en: "10–20 m² area reserved" }, done: true },
      { label: { de: "Separater Stromkreis (3 Steckdosen)", en: "Separate circuit (3 sockets)" }, done: true },
      { label: { de: "Sichtschutz / ruhige Ecke", en: "Privacy screen / quiet corner" }, done: false },
      { label: { de: "Ansprechperson für Aufbau (ab 21 Uhr)", en: "Contact person for setup (from 9 pm)" }, done: false },
      { label: { de: "Event auf Social Media angekündigt", en: "Event announced on social media" }, done: true },
    ],
    payouts: [
      { period: "09/2026", amount: 420, paid: false },
      { period: "08/2026", amount: 615, paid: true },
    ],
  },
};
