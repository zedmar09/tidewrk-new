// PLACEHOLDER: replace with the generated ship asset (public/hero/ship.svg or .png).
// Drawn in a 200 × 170 box; the bow points right (sailing forward).
export function PlaceholderShip({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 200 170">
      {/* Flag */}
      <path d="M82 6 L82 30" stroke="#C8CCD0" strokeWidth="2.5" />
      <path d="M83 7 C 96 3, 104 13, 118 8 L 112 18 L 118 27 C 104 31, 96 22, 83 26 Z" fill="#E98973" />
      {/* Masts */}
      <path d="M82 26 L82 128" stroke="#C8CCD0" strokeWidth="3" />
      <path d="M126 50 L126 126" stroke="#C8CCD0" strokeWidth="2.5" />
      {/* Sails */}
      <path d="M84 32 C 120 54, 128 92, 118 120 L 84 120 Z" fill="#E9EEF5" />
      <path d="M80 36 C 58 64, 52 98, 60 120 L 80 120 Z" fill="#B9C7DC" />
      <path d="M128 56 C 154 72, 160 100, 154 122 L 128 122 Z" fill="#D6DFEB" />
      {/* Hull */}
      <path d="M26 122 L 186 116 C 180 136, 166 150, 146 154 L 52 156 C 40 148, 30 136, 26 122 Z" fill="#1E3A6E" />
      <path d="M30 130 L 182 124 C 181 128, 180 131, 178 134 L 34 140 C 32 136, 31 133, 30 130 Z" fill="#E98973" />
      <path d="M26 122 L 186 116" stroke="#C8CCD0" strokeLinecap="round" strokeWidth="2.5" />
      {/* Foam */}
      <g stroke="#EAF2FF" strokeLinecap="round" strokeWidth="3">
        <path d="M172 150 C 182 146, 190 146, 198 150" />
        <path d="M150 160 C 162 156, 174 156, 184 160" />
        <path d="M14 156 C 22 152, 32 152, 40 156" />
      </g>
    </svg>
  );
}
