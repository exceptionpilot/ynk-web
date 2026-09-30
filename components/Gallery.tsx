"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { GalleryItem, GalleryStyle } from "@/lib/content/gallery";
import { Motif } from "./Motif";

type StudioRef = { id: string; name: string };

export function Gallery({ items, studios, t }: { items: GalleryItem[]; studios: StudioRef[]; t: Dictionary["gallery"] }) {
  const [studio, setStudio] = useState<string>("all");
  const [style, setStyle] = useState<GalleryStyle | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const studioName = useCallback((id: string) => studios.find((s) => s.id === id)?.name ?? id, [studios]);
  const usedStudios = useMemo(() => studios.filter((s) => items.some((i) => i.studioId === s.id)), [studios, items]);
  const usedStyles = useMemo(() => Array.from(new Set(items.map((i) => i.style))), [items]);
  const filtered = items.filter((i) => (studio === "all" || i.studioId === studio) && (style === "all" || i.style === style));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const step = (dir: 1 | -1) => setActive((a) => (a === null ? a : (a + dir + filtered.length) % filtered.length));
  const current = active !== null ? filtered[active] : null;

  return (
    <>
      <div className="filters">
        <div className="filter-group" role="group" aria-label={t.filterStudio}>
          <span className="mono">{t.filterStudio}</span>
          <button className="chip" aria-pressed={studio === "all"} onClick={() => setStudio("all")}>{t.all}</button>
          {usedStudios.map((s) => (
            <button key={s.id} className="chip" aria-pressed={studio === s.id} onClick={() => setStudio(s.id)}>{s.name}</button>
          ))}
        </div>
        <div className="filter-group" role="group" aria-label={t.filterStyle}>
          <span className="mono">{t.filterStyle}</span>
          <button className="chip" aria-pressed={style === "all"} onClick={() => setStyle("all")}>{t.all}</button>
          {usedStyles.map((s) => (
            <button key={s} className="chip" aria-pressed={style === s} onClick={() => setStyle(s)}>{t.styles[s]}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">{t.empty}</p>
      ) : (
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <button key={item.id} className="g-item" onClick={() => setActive(i)} aria-label={`${t.open}: ${item.title}`}>
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={item.title} loading="lazy" />
              ) : (
                <Motif name={item.motif} />
              )}
              <span className="g-cap">
                <span>{item.title}</span>
                <span>{t.styles[item.style]}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={current?.title}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <div className="lightbox-inner">
            <div className="lightbox-media">
              {current.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.title} />
              ) : (
                <Motif name={current.motif} title={current.title} />
              )}
            </div>
            <div className="lightbox-bar">
              <div>
                <h3 className="display h3">{current.title}</h3>
                <p className="mono muted" style={{ margin: "6px 0 0" }}>
                  {t.styles[current.style]} · {t.by} {studioName(current.studioId)}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="icon-btn" onClick={() => step(-1)} aria-label={t.prev}>←</button>
                <button className="icon-btn" onClick={() => step(1)} aria-label={t.next}>→</button>
                <button className="icon-btn" onClick={() => setActive(null)} aria-label={t.close} autoFocus>×</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
