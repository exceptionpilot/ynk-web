/**
 * Fine-Line-Platzhaltergrafiken für die Flash-Galerie.
 * Werden durch echte Fotos ersetzt, sobald `src` in gallery.ts gesetzt ist.
 */
const motifs = {
  dagger: (
    <>
      <path d="M100 18 L112 118 L100 132 L88 118 Z" />
      <path d="M100 30 L100 124" />
      <path d="M66 122 Q100 112 134 122 Q100 132 66 122 Z" />
      <path d="M94 128 L94 166 M106 128 L106 166" />
      <path d="M94 138 L106 144 M94 148 L106 154 M94 158 L106 164" />
      <circle cx="100" cy="174" r="8" />
    </>
  ),
  rose: (
    <>
      <path d="M100 86 C92 80 92 70 100 68 C108 66 114 76 106 84 C100 90 88 86 86 76 C84 64 96 56 106 58 C120 60 124 78 114 90 C104 102 82 98 76 84 C70 68 80 50 98 48 C120 46 134 66 128 86 C122 104 100 112 84 104" />
      <path d="M84 104 C72 98 64 86 66 72" />
      <path d="M100 110 C100 130 98 150 102 184" />
      <path d="M101 140 C88 132 74 134 66 142 C80 148 92 146 101 140 Z" />
      <path d="M101 158 C114 150 128 152 136 160 C122 166 110 164 101 158 Z" />
      <path d="M99 124 L92 120 M103 170 L110 166" />
    </>
  ),
  moon: (
    <>
      <path d="M118 34 A66 66 0 1 0 150 150 A54 54 0 1 1 118 34 Z" />
      <path d="M150 48 L150 64 M142 56 L158 56" />
      <path d="M160 96 L160 104 M156 100 L164 100" />
      <circle cx="136" cy="80" r="1.5" />
      <circle cx="166" cy="130" r="1.5" />
      <path d="M78 120 Q86 124 92 120" />
    </>
  ),
  star: (
    <>
      <path d="M100 20 L108 92 L180 100 L108 108 L100 180 L92 108 L20 100 L92 92 Z" />
      <path d="M100 56 L104 96 L144 100 L104 104 L100 144 L96 104 L56 100 L96 96 Z" />
      <path d="M52 52 L86 86 M148 52 L114 86 M52 148 L86 114 M148 148 L114 114" />
      <circle cx="100" cy="100" r="3" />
    </>
  ),
  snake: (
    <>
      <path d="M58 176 C30 160 40 128 72 126 C110 124 128 110 120 88 C112 66 78 70 76 50 C74 34 92 24 110 28" />
      <path d="M66 172 C44 158 52 136 76 134 C118 130 140 112 130 84 C120 58 88 64 86 48 C85 38 96 34 110 36" />
      <path d="M110 28 C124 26 136 32 136 32 C136 32 124 40 110 36" />
      <path d="M136 32 L148 28 M136 32 L148 36" />
      <circle cx="122" cy="31" r="1.5" />
      <path d="M58 176 L50 184" />
    </>
  ),
  eye: (
    <>
      <path d="M28 100 Q100 40 172 100 Q100 160 28 100 Z" />
      <circle cx="100" cy="100" r="26" />
      <circle cx="100" cy="100" r="10" />
      <path d="M100 30 L100 14 M64 40 L56 26 M136 40 L144 26 M34 62 L22 52 M166 62 L178 52" />
      <path d="M100 146 L100 186 M92 176 L100 186 L108 176" />
    </>
  ),
  heart: (
    <>
      <path d="M100 168 C60 136 30 110 30 80 C30 58 46 44 64 44 C80 44 92 54 100 68 C108 54 120 44 136 44 C154 44 170 58 170 80 C170 110 140 136 100 168 Z" />
      <path d="M22 102 L60 94 L178 94 L140 102 L178 110 L60 110 L22 102 Z" />
      <path d="M60 94 L60 110 M140 102 L140 102" />
      <path d="M50 70 L150 70" strokeDasharray="2 5" />
    </>
  ),
  bolt: (
    <>
      <path d="M118 16 L58 110 L96 110 L78 184 L146 82 L106 82 L118 16 Z" />
      <path d="M40 60 L52 64 M150 140 L164 136 M36 140 L48 132 M156 50 L168 44" />
    </>
  ),
  moth: (
    <>
      <path d="M100 60 L100 150" />
      <path d="M100 70 C80 40 36 34 26 56 C18 76 44 96 98 100" />
      <path d="M100 70 C120 40 164 34 174 56 C182 76 156 96 102 100" />
      <path d="M98 104 C70 106 46 126 56 150 C64 166 90 150 98 128" />
      <path d="M102 104 C130 106 154 126 144 150 C136 166 110 150 102 128" />
      <path d="M100 62 C94 50 88 42 80 38 M100 62 C106 50 112 42 120 38" />
      <circle cx="58" cy="62" r="8" />
      <circle cx="142" cy="62" r="8" />
    </>
  ),
  web: (
    <>
      <path d="M100 20 L100 180 M20 100 L180 100 M44 44 L156 156 M156 44 L44 156" />
      <path d="M100 40 L142 58 L160 100 L142 142 L100 160 L58 142 L40 100 L58 58 Z" />
      <path d="M100 64 L126 74 L136 100 L126 126 L100 136 L74 126 L64 100 L74 74 Z" />
      <path d="M100 86 L110 90 L114 100 L110 110 L100 114 L90 110 L86 100 L90 90 Z" />
      <path d="M142 142 L142 170" />
      <circle cx="142" cy="176" r="6" />
    </>
  ),
  swallow: (
    <>
      <path d="M60 92 C72 76 92 72 108 80 C130 60 156 50 184 52 C160 64 144 80 132 96 C148 104 160 120 164 140 C150 128 132 120 116 118 C104 134 90 146 70 150 C82 138 88 124 88 112 C74 110 62 104 60 92 Z" />
      <circle cx="72" cy="90" r="2" />
      <path d="M60 92 L46 94 L58 98" />
      <path d="M112 84 C124 90 128 100 126 110" />
    </>
  ),
  lettering: (
    <>
      <text x="100" y="118" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="52" strokeWidth="1" fill="none">
        Nacht
      </text>
      <path d="M40 136 Q100 150 160 136" />
      <path d="M150 80 L150 92 M144 86 L156 86" />
    </>
  ),
} as const;

export type MotifName = keyof typeof motifs;

export function Motif({ name, className, title }: { name: MotifName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {motifs[name]}
    </svg>
  );
}
