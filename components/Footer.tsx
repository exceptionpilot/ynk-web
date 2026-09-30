import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary["footer"] }) {
  const base = `/${locale}`;
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer-big chrome-text" aria-hidden="true">YNK</p>
        <div className="footer-grid">
          <div>
            <p className="mono" style={{ margin: "0 0 8px", color: "var(--acid)" }}>{site.claim}</p>
            <p className="muted" style={{ margin: 0, maxWidth: "36ch" }}>{t.tagline}</p>
          </div>
          <div>
            <h4>{t.follow}</h4>
            <ul>
              <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
              <li><a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.contact}</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href={`${base}/aftercare`}>Aftercare</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.portals}</h4>
            <ul>
              <li><Link href={`${base}/portal`}>{t.customerPortal}</Link></li>
              <li><Link href={`${base}/portal?tab=partner`}>{t.partnerPortal}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.legal}</h4>
            <ul>
              <li><Link href={`${base}/impressum`}>{t.imprint}</Link></li>
              <li><Link href={`${base}/datenschutz`}>{t.privacy}</Link></li>
              <li><Link href={`${base}/agb`}>{t.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} {site.name}. {t.rights}</span>
          <span>Ink the Night.</span>
        </div>
      </div>
    </footer>
  );
}
