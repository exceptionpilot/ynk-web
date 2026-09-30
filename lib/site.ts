/**
 * Zentrale Stammdaten. Alle mit [ECKIGEN KLAMMERN] markierten Werte sind
 * Platzhalter und müssen vor dem Launch ersetzt werden.
 */
export const site = {
  name: "YNK",
  claim: "Minimal Meaningful Memorable",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Externes Ticket-/Buchungssystem  ->  [BUCHUNGS-URL] */
  bookingUrl: "https://tickets.example.com/ynk",

  /** Öffentliche Kontaktadresse  ->  [E-MAIL] */
  email: "hello@ynk.example",

  social: {
    instagram: "https://instagram.com/ynk.studio",
    tiktok: "https://tiktok.com/@ynk.studio",
  },

  /**
   * Hero-Video. Datei z. B. unter /public/media/hero.mp4 ablegen und hier
   * eintragen. Leer = animierter CSS-Hintergrund als Fallback.
   */
  heroVideo: {
    src: "",
    poster: "",
  },

  /**
   * Tracking. Solange `enabled` false ist, wird KEIN Cookie-Banner angezeigt
   * (keine einwilligungspflichtigen Cookies im Einsatz).
   */
  analytics: {
    enabled: false,
  },

  legal: {
    company: "[FIRMENNAME]",
    owner: "[VERTRETUNGSBERECHTIGTE PERSON]",
    street: "[STRASSE NR.]",
    city: "[PLZ ORT]",
    phone: "[TELEFON]",
    vatId: "[USt-IdNr.]",
    register: "[REGISTERGERICHT / NR.]",
  },
} as const;
