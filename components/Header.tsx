"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const home = `/${locale}`;
  const links = [
    { href: `${home}#events`, label: t.events },
    { href: `${home}#leistungen`, label: t.services },
    { href: `${home}#galerie`, label: t.gallery },
    { href: `${home}#veranstalter`, label: t.organizers },
    { href: `${home}#studios`, label: t.studios },
    { href: `${home}#faq`, label: t.faq },
  ];
  const switchTo = (l: Locale) => pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${l}`);

  return (
    <>
      <a href="#main" className="skip">{t.skip}</a>
      <header className="header" data-scrolled={scrolled} data-solid={!isHome || open}>
        <div className="wrap header-inner">
          <Link href={home} className="logo" aria-label={`YNK – ${t.home}`}>
            YNK<span>.</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="glitch-hover">{l.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <div className="lang" role="group" aria-label={t.language}>
              {locales.map((l) => (
                <Link key={l} href={switchTo(l)} hrefLang={l} aria-current={l === locale} lang={l}>
                  {localeLabels[l]}
                </Link>
              ))}
            </div>
            <Link href={`${home}/portal`} className="btn btn-sm">{t.portal}</Link>
            <a href={`${home}#veranstalter`} className="btn btn-sm btn-primary"><span className="glitch">{t.book}</span></a>
            <button
              className="burger"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.close : t.menu}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="m-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Link href={`${home}/rechner`} className="m-link">{t.calculator}</Link>
          <Link href={`${home}/aftercare`} className="m-link">{t.aftercare}</Link>
          <Link href={`${home}/portal`} className="m-link">{t.portal}</Link>
          <a href={`${home}#veranstalter`} className="btn btn-primary" onClick={() => setOpen(false)}>{t.book}</a>
        </nav>
      )}
    </>
  );
}
