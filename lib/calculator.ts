/**
 * Umsatz-Kalkulator: reine Rechenlogik, damit sie unabhängig von der UI
 * getestet und später z. B. im Portal wiederverwendet werden kann.
 */
export type Party = "organizer" | "studio" | "ynk";
export const parties: Party[] = ["organizer", "studio", "ynk"];

export type CalcInput = {
  guests: number;
  /** Anteil der Gäste, die sich tätowieren lassen möchten (in %) */
  rate: number;
  /** Stunden, in denen gestochen wird */
  hours: number;
  /** Minuten pro Tattoo inkl. Vorbereitung und Aufräumen */
  minutes: number;
  /** Durchschnittspreis pro Tattoo (€) */
  price: number;
  /** Kosten pro Tattoo vor der Aufteilung (Material, Zahlungsgebühren) (€) */
  cost: number;
  /** Eingeplante Tätowierer:innen; null = Empfehlung verwenden */
  artists: number | null;
  /** Vereinbarte Anteile in % – nur, was man selbst einträgt */
  shares: Record<Party, number | null>;
};

/** Fläche pro Arbeitsplatz inkl. Wartebereich (m²) und Grundfläche für Empfang/Beratung */
const AREA_PER_STATION = 4;
const AREA_BASE = 4;
const AREA_MIN = 10;

export function calculate(i: CalcInput) {
  const guests = Math.max(0, i.guests || 0);
  const rate = Math.min(100, Math.max(0, i.rate || 0));
  const demand = Math.round((guests * rate) / 100);
  const perArtist = i.minutes > 0 ? Math.max(0, Math.floor((Math.max(0, i.hours) * 60) / i.minutes)) : 0;
  const recommended = demand > 0 && perArtist > 0 ? Math.ceil(demand / perArtist) : 0;
  const artists = i.artists != null && i.artists >= 0 ? Math.floor(i.artists) : recommended;
  const capacity = artists * perArtist;
  const tattoos = Math.min(demand, capacity);
  const unserved = demand - tattoos;
  const utilisation = capacity > 0 ? tattoos / capacity : 0;

  const gross = tattoos * Math.max(0, i.price || 0);
  const costs = Math.min(gross, tattoos * Math.max(0, i.cost || 0));
  const net = gross - costs;

  const entered = parties.filter((p) => i.shares[p] != null && !Number.isNaN(i.shares[p]));
  const shareSum = entered.reduce((s, p) => s + (i.shares[p] as number), 0);
  const split = Object.fromEntries(
    parties.map((p) => [p, i.shares[p] != null ? (net * (i.shares[p] as number)) / 100 : null]),
  ) as Record<Party, number | null>;
  const unassigned = entered.length ? Math.max(0, 100 - shareSum) : null;

  return {
    demand,
    perArtist,
    recommended,
    artists,
    capacity,
    tattoos,
    unserved,
    utilisation,
    gross,
    costs,
    net,
    split,
    shareSum,
    overAllocated: shareSum > 100,
    unassigned,
    unassignedAmount: unassigned != null ? (net * unassigned) / 100 : null,
    perArtistEarning: split.studio != null && artists > 0 ? split.studio / artists : null,
    perGuest: guests > 0 ? net / guests : 0,
    area: artists > 0 ? Math.max(AREA_MIN, artists * AREA_PER_STATION + AREA_BASE) : 0,
    sockets: artists > 0 ? artists + 1 : 0,
  };
}

export type CalcResult = ReturnType<typeof calculate>;
