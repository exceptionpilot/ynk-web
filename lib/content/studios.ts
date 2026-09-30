/**
 * PLATZHALTER – Partner-Studios.
 * `logo` optional: Pfad zu einer Datei in /public (z. B. /studios/salt-ink.svg).
 * Ohne Logo wird ein typografisches Monogramm angezeigt.
 */
export type Studio = {
  id: string;
  name: string;
  city: string;
  instagram: string;
  logo?: string;
  styles: string[];
};

export const studios: Studio[] = [
  { id: "linework-berlin", name: "Linework Berlin", city: "Berlin", instagram: "linework.berlin", styles: ["Fine Line", "Flash"] },
  { id: "salt-ink", name: "Salt & Ink", city: "Hamburg", instagram: "saltandink.hh", styles: ["Flash", "Traditional"] },
  { id: "blackbox-leipzig", name: "Blackbox", city: "Leipzig", instagram: "blackbox.tattoo", styles: ["Blackwork", "Flash"] },
  { id: "ritual-cologne", name: "Ritual Club", city: "Köln", instagram: "ritual.cologne", styles: ["Lettering", "Fine Line"] },
  { id: "fineline-muc", name: "Needle & Thread", city: "München", instagram: "needleandthread.muc", styles: ["Fine Line", "Micro"] },
  { id: "hollow-ffm", name: "Hollow Point", city: "Frankfurt", instagram: "hollowpoint.ffm", styles: ["Flash", "Ornamental"] },
];

export const studioById = (id: string) => studios.find((s) => s.id === id);
