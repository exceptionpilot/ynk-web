import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

/**
 * PLATZHALTER – Rechtstexte. Vor Veröffentlichung durch anwaltlich bzw.
 * mit einem Generator geprüfte Texte ersetzen.
 */
export type LegalSlug = "impressum" | "datenschutz" | "agb";
type Section = { h: string; p: string[] };
type LegalDoc = { title: string; sections: Section[] };

const L = site.legal;

const docs: Record<LegalSlug, Record<Locale, LegalDoc>> = {
  impressum: {
    de: {
      title: "Impressum",
      sections: [
        { h: "Angaben gemäß § 5 DDG", p: [L.company, L.street, L.city] },
        { h: "Vertreten durch", p: [L.owner] },
        { h: "Kontakt", p: [`Telefon: ${L.phone}`, `E-Mail: ${site.email}`] },
        { h: "Registereintrag", p: [L.register] },
        { h: "Umsatzsteuer-ID", p: [`Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: ${L.vatId}`] },
        { h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", p: [L.owner, L.street, L.city] },
        { h: "Verbraucherstreitbeilegung", p: ["Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."] },
      ],
    },
    en: {
      title: "Imprint",
      sections: [
        { h: "Information according to § 5 DDG", p: [L.company, L.street, L.city] },
        { h: "Represented by", p: [L.owner] },
        { h: "Contact", p: [`Phone: ${L.phone}`, `Email: ${site.email}`] },
        { h: "Register entry", p: [L.register] },
        { h: "VAT ID", p: [`VAT identification number according to § 27 a UStG: ${L.vatId}`] },
        { h: "Responsible for content according to § 18 (2) MStV", p: [L.owner, L.street, L.city] },
        { h: "Consumer dispute resolution", p: ["We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."] },
      ],
    },
  },
  datenschutz: {
    de: {
      title: "Datenschutzerklärung",
      sections: [
        { h: "1. Verantwortlicher", p: [`${L.company}, ${L.street}, ${L.city}, E-Mail: ${site.email}`] },
        { h: "2. Hosting & Server-Logfiles", p: ["Beim Aufruf der Website werden technisch notwendige Daten (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browser) in Server-Logfiles verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer Betrieb). Die Logs werden nach [X] Tagen gelöscht. Hoster: [HOSTING-ANBIETER]."] },
        { h: "3. Kontakt- und Bewerbungsformulare", p: ["Wenn du uns über ein Formular (Event-Anfrage, Partner-Bewerbung, Grillz-Waitlist) kontaktierst, verarbeiten wir die angegebenen Daten zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie ggf. die Anbahnung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Die Einwilligung kannst du jederzeit per E-Mail widerrufen. Die Daten werden per E-Mail an uns übermittelt und gelöscht, sobald sie nicht mehr erforderlich sind, spätestens nach [X] Monaten, sofern keine gesetzlichen Aufbewahrungspflichten bestehen."] },
        { h: "4. Cookies", p: ["Wir setzen ausschließlich technisch notwendige Cookies ein (§ 25 Abs. 2 TDDDG): „NEXT_LOCALE“ speichert deine Sprachauswahl (12 Monate), „ynk_session“ hält dich im Portal eingeloggt (8 Stunden). Tracking- oder Marketing-Cookies setzen wir derzeit nicht ein; daher gibt es kein Cookie-Banner."] },
        { h: "5. Schriftarten", p: ["Schriftarten werden lokal von unserem Server ausgeliefert. Es findet keine Verbindung zu Servern von Google statt."] },
        { h: "6. Externe Links: Buchung & Social Media", p: ["Die Slot-Buchung erfolgt über ein externes Buchungssystem ([ANBIETER]). Erst beim Klick auf „Slot buchen“ verlässt du unsere Website; dort gilt die Datenschutzerklärung des Anbieters. Links zu Instagram und TikTok sind einfache Links ohne eingebettete Inhalte."] },
        { h: "7. Kunden- und Partner-Portal", p: ["Für die Nutzung des Portals verarbeiten wir Login-Daten, Buchungs- bzw. Vertragsdaten (Art. 6 Abs. 1 lit. b DSGVO). Gesundheitsbezogene Angaben aus der Einwilligungserklärung zum Tattoo verarbeiten wir nur mit deiner ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO)."] },
        { h: "8. Deine Rechte", p: ["Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde."] },
      ],
    },
    en: {
      title: "Privacy policy",
      sections: [
        { h: "1. Controller", p: [`${L.company}, ${L.street}, ${L.city}, email: ${site.email}`] },
        { h: "2. Hosting & server log files", p: ["When you visit the website, technically necessary data (IP address, date/time, page requested, browser) is processed in server log files. Legal basis is Art. 6(1)(f) GDPR (secure operation). Logs are deleted after [X] days. Host: [HOSTING PROVIDER]."] },
        { h: "3. Contact and application forms", p: ["When you contact us via a form (event request, partner application, grillz waitlist), we process the data provided to handle your request. Legal basis is your consent (Art. 6(1)(a) GDPR) and, where applicable, pre-contractual measures (Art. 6(1)(b) GDPR). You can withdraw your consent at any time by email. The data is sent to us by email and deleted once no longer needed, at the latest after [X] months, unless statutory retention obligations apply."] },
        { h: "4. Cookies", p: ["We only use technically necessary cookies (§ 25(2) TDDDG): “NEXT_LOCALE” stores your language (12 months), “ynk_session” keeps you logged in to the portal (8 hours). We currently do not use tracking or marketing cookies, so there is no cookie banner."] },
        { h: "5. Fonts", p: ["Fonts are served locally from our server. No connection to Google servers is made."] },
        { h: "6. External links: booking & social media", p: ["Slot booking is handled by an external booking system ([PROVIDER]). You only leave our website when clicking “Book a slot”; the provider's privacy policy applies there. Links to Instagram and TikTok are plain links without embedded content."] },
        { h: "7. Customer and partner portal", p: ["To use the portal we process login data and booking or contract data (Art. 6(1)(b) GDPR). Health-related information from the tattoo consent form is only processed with your explicit consent (Art. 9(2)(a) GDPR)."] },
        { h: "8. Your rights", p: ["You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and objection (Art. 21 GDPR), as well as the right to lodge a complaint with a supervisory authority."] },
      ],
    },
  },
  agb: {
    de: {
      title: "Allgemeine Geschäftsbedingungen",
      sections: [
        { h: "§ 1 Geltungsbereich", p: ["Diese AGB gelten für alle Buchungen von Tattoo-Slots bei Events von YNK. Vertragspartner für die Tätowierung ist [YNK / das jeweilige Partner-Studio]."] },
        { h: "§ 2 Mindestalter & Ausschlüsse", p: ["Tätowiert werden nur Personen ab 18 Jahren mit gültigem amtlichem Lichtbildausweis. Personen unter Einfluss von Alkohol oder Drogen werden nicht tätowiert. Die Entscheidung trifft der/die Tätowierer:in vor Ort."] },
        { h: "§ 3 Buchung & Zahlung", p: ["Mit der Online-Buchung wird eine Anzahlung von [X] € fällig, die auf den Gesamtpreis angerechnet wird. Der Restbetrag ist vor Ort zu zahlen."] },
        { h: "§ 4 Stornierung", p: ["Eine kostenlose Stornierung ist bis 48 Stunden vor Eventbeginn möglich. Danach sowie bei Ablehnung gemäß § 2 verfällt die Anzahlung."] },
        { h: "§ 5 Haftung", p: ["[Haftungsregelung einfügen]"] },
      ],
    },
    en: {
      title: "Terms and conditions",
      sections: [
        { h: "§ 1 Scope", p: ["These terms apply to all bookings of tattoo slots at YNK events. The contracting party for the tattoo is [YNK / the respective partner studio]."] },
        { h: "§ 2 Minimum age & exclusions", p: ["Only persons aged 18 or over with a valid official photo ID will be tattooed. Persons under the influence of alcohol or drugs will not be tattooed. The artist on site decides."] },
        { h: "§ 3 Booking & payment", p: ["A deposit of €[X] is due upon online booking and is credited against the total price. The remaining amount is paid on site."] },
        { h: "§ 4 Cancellation", p: ["Free cancellation is possible up to 48 hours before the event starts. After that, and in case of refusal under § 2, the deposit is forfeited."] },
        { h: "§ 5 Liability", p: ["[Insert liability clause]"] },
      ],
    },
  },
};

export const legalSlugs = Object.keys(docs) as LegalSlug[];
export const isLegalSlug = (s: string): s is LegalSlug => (legalSlugs as string[]).includes(s);
export const getLegal = (slug: LegalSlug, locale: Locale) => docs[slug][locale];
