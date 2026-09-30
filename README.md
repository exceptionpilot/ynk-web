# YNK – Mobile Tattoo & Grillz Studio

**Ink the Night. — Minimal Meaningful Memorable**

Website für YNK: Onepager mit drei Einstiegen (Gäste, Veranstalter, Studios),
Aftercare-Seite für den QR-Code, Kunden- und Partner-Portal, zweisprachig (DE/EN).

## Stack

- Next.js 16 (App Router, Server Actions, Proxy), React 19, TypeScript
- Zod (gemeinsame Validierung Client + Server), Nodemailer (Formularversand)
- Eigenes CSS-Design-System (`app/globals.css`), Fonts via `next/font` (lokal ausgeliefert, DSGVO-freundlich)

```bash
npm install
cp .env.example .env.local   # Werte anpassen
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Seiten

| Route | Inhalt |
| --- | --- |
| `/` | Redirect auf `/de` bzw. `/en` (Browser-Sprache / Cookie) |
| `/{de,en}` | Hero, So funktioniert's, Events, Leistungen, Flash-Galerie, Partner-Studios, Veranstalter (+ Formular), Studios (+ Bewerbung), Grillz-Waitlist, FAQ |
| `/{de,en}/aftercare` | Aftercare-Anleitung. **QR-Code auf `https://<domain>/aftercare` zeigen** – leitet sprachabhängig weiter |
| `/{de,en}/portal` | Login Kunden / Partner |
| `/{de,en}/portal/kunde` | Kundenportal: Buchungen, Heilungs-Tracker, Einwilligung, Waitlist-Position, DSGVO-Anfragen |
| `/{de,en}/portal/partner` | Partner-Portal – Studio: Einsätze, Flash-Sets, Nachweise, Auszahlungen · Veranstalter: Events, Setup-Checkliste, Umsatzbeteiligung |
| `/{de,en}/impressum`, `/datenschutz`, `/agb` | Rechtstexte (Platzhalter) |

## Inhalte austauschen (Platzhalter)

| Was | Datei |
| --- | --- |
| Buchungs-URL `[BUCHUNGS-URL]`, E-Mail `[E-MAIL]`, Socials, Hero-Video, Firmendaten | `lib/site.ts` |
| Events | `lib/content/events.ts` (vergangene Events werden automatisch ausgeblendet, stündliche Revalidierung) |
| Partner-Studios (optional Logo in `/public`) | `lib/content/studios.ts` |
| Flash-Galerie (`src` setzen für echte Fotos, sonst Line-Art-Platzhalter) | `lib/content/gallery.ts` |
| Alle Texte DE / EN | `lib/i18n/dictionaries/de.ts`, `en.ts` (EN ist gegen DE typgeprüft – fehlende Keys = Build-Fehler) |
| Rechtstexte | `lib/content/legal.ts` |
| Portal-Demo-Daten / Accounts | `lib/portal/data.ts`, `lib/auth/users.ts` |

Hero-Video: Datei z. B. als `public/media/hero.mp4` ablegen und in `site.heroVideo.src` eintragen. Ohne Video läuft ein animierter Club-Licht-Hintergrund.

## Formulare

- Veranstalter-Anfrage, Studio-Bewerbung (mit Portfolio-Link), Grillz-Waitlist
- Validierung client- und serverseitig (`lib/forms/schemas.ts`), Pflicht-Einwilligung (DSGVO) inkl. Zeitstempel in der Mail
- Spam-Schutz: Honeypot + Rate-Limit (in-memory; bei mehreren Instanzen z. B. durch Redis ersetzen)
- Versand an `FORM_RECIPIENT` per SMTP. **Ohne `SMTP_HOST` werden Anfragen nur ins Server-Log geschrieben.**

## Portale (Demo)

Auth über HMAC-signiertes, httpOnly Session-Cookie (`SESSION_SECRET` setzen!). Demo-Zugänge
werden nur außerhalb von Production angezeigt (oder mit `SHOW_DEMO_LOGINS=true`):

| Rolle | E-Mail | Code / Passwort |
| --- | --- | --- |
| Gast | `gast@ynk.demo` | `YNK-4821` |
| Studio | `studio@ynk.demo` | `demo1234` |
| Veranstalter | `club@ynk.demo` | `demo1234` |

Für den Livebetrieb `lib/auth/users.ts` und `lib/portal/data.ts` durch Buchungssystem-/Auth-API ersetzen – die Seiten bleiben unverändert.

## Tracking & Cookies

Es werden nur technisch notwendige Cookies gesetzt (`NEXT_LOCALE`, `ynk_session`), daher **kein Cookie-Banner**.
Wird Tracking eingeführt: `site.analytics.enabled = true` → Banner erscheint; Skripte erst nach Consent (`localStorage["ynk-consent"] === "granted"`, Event `ynk-consent`) laden.

## SEO

Meta-Titel/-Beschreibungen je Sprache, `hreflang`-Alternates, Canonicals, generiertes Open-Graph-Bild,
`sitemap.xml`, `robots.txt` (Portal ausgeschlossen), JSON-LD (Organization, FAQPage, Events).
`NEXT_PUBLIC_SITE_URL` auf die Live-Domain setzen.
