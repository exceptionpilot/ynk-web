import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "YNK – Ink the Night. Minimal Meaningful Memorable";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#ecebe6",
          backgroundImage: "radial-gradient(ellipse at 20% 0%, rgba(198,255,0,0.18), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#a3a29c" }}>
          <span>Mobile Tattoo & Grillz Studio</span>
          <span style={{ color: "#c6ff00" }}>●</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>Ink the</div>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            Night<span style={{ color: "#c6ff00" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          <span>{site.claim}</span>
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2 }}>YNK</span>
        </div>
      </div>
    ),
    size,
  );
}
