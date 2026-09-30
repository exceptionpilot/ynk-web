import type { MotifName } from "@/components/Motif";

/**
 * PLATZHALTER – Flash-Galerie.
 * Für echte Fotos `src` setzen (z. B. "/gallery/rose-01.jpg" in /public).
 * Ohne `src` wird eine Line-Art-Grafik (`motif`) als Platzhalter gerendert.
 */
export type GalleryStyle = "flash" | "fineline" | "event" | "lettering";

export type GalleryItem = {
  id: string;
  title: string;
  studioId: string;
  style: GalleryStyle;
  motif: MotifName;
  src?: string;
};

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Dagger", studioId: "salt-ink", style: "flash", motif: "dagger" },
  { id: "g2", title: "Night Rose", studioId: "linework-berlin", style: "fineline", motif: "rose" },
  { id: "g3", title: "Moon Phase", studioId: "fineline-muc", style: "fineline", motif: "moon" },
  { id: "g4", title: "Strobe Star", studioId: "blackbox-leipzig", style: "event", motif: "star" },
  { id: "g5", title: "Serpent", studioId: "salt-ink", style: "flash", motif: "snake" },
  { id: "g6", title: "Third Eye", studioId: "ritual-cologne", style: "event", motif: "eye" },
  { id: "g7", title: "Heart Beat", studioId: "hollow-ffm", style: "flash", motif: "heart" },
  { id: "g8", title: "Bolt", studioId: "blackbox-leipzig", style: "flash", motif: "bolt" },
  { id: "g9", title: "Moth", studioId: "linework-berlin", style: "fineline", motif: "moth" },
  { id: "g10", title: "Web", studioId: "hollow-ffm", style: "event", motif: "web" },
  { id: "g11", title: "Swallow", studioId: "ritual-cologne", style: "flash", motif: "swallow" },
  { id: "g12", title: "„Nacht“", studioId: "ritual-cologne", style: "lettering", motif: "lettering" },
];
