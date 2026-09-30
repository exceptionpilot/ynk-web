import Link from "next/link";

// Wird innerhalb des Locale-Layouts gerendert; Sprache aus dem Pfad ist hier
// nicht verfügbar, daher zweisprachig.
export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh" }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display h2">Lost on the floor.</h1>
        <p className="lead" style={{ marginTop: 24 }}>Diese Seite gibt es nicht (mehr). · This page doesn&apos;t exist (anymore).</p>
        <p style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/de" className="btn btn-primary">Startseite</Link>
          <Link href="/en" className="btn">Home</Link>
        </p>
      </div>
    </section>
  );
}
