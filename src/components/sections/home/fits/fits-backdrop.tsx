// The join between the Problem section and "Where Tidewrk fits": the exact
// soft gradient-wave style used where the hero meets the Problem section
// (problem/problem-backdrop.tsx, its top bands), static, no animation.
//
// - Starts on the colour the Problem section ends on (#011437).
// - Same three bands: each fades in from transparent at its crest, reaching
//   full colour ~110 units lower.
// - The last band does not fade out: it settles into FITS_BODY, the solid
//   colour of the rest of the section.
//
// Width-scaled strip anchored to the top, so it keeps its shape on any screen.

export const FITS_BODY = "#03224F";
const TOP = "#011437";

const VIEW_W = 1440;
const VIEW_H = 600;
const LEFT = -200;
const RIGHT = VIEW_W + 200;

type Wave = {
  y: number;
  a: number;
  len: number;
  a2: number;
  len2: number;
  phase: number;
  rise: number;
};

type Band = {
  id: string;
  wave: Wave;
  color: string;
  opacity: number;
  bottom: number;
  /** The last band stays solid down to the body instead of fading out. */
  solid?: boolean;
};

const crestY = (w: Wave, x: number) =>
  w.y -
  (w.rise * (x - LEFT)) / (RIGHT - LEFT) +
  w.a * Math.sin((2 * Math.PI * x) / w.len + w.phase) +
  w.a2 * Math.sin((2 * Math.PI * x) / w.len2 + w.phase * 1.7);

function bandPath(w: Wave, bottom: number) {
  let d = "";
  for (let x = LEFT; x <= RIGHT; x += 10) {
    d += `${x === LEFT ? "M" : " L"}${x} ${crestY(w, x).toFixed(1)}`;
  }
  return `${d} L${RIGHT} ${bottom} L${LEFT} ${bottom} Z`;
}

// Same bands as the hero → Problem join.
const bands: Band[] = [
  { id: "a", wave: { y: 40, a: 18, len: 820, a2: 6, len2: 300, phase: 0.6, rise: 30 }, color: "#0C3771", opacity: 0.75, bottom: 360 },
  { id: "b", wave: { y: 110, a: 20, len: 960, a2: 7, len2: 350, phase: 2.4, rise: 24 }, color: "#072B63", opacity: 0.8, bottom: 420 },
  { id: "c", wave: { y: 190, a: 16, len: 1100, a2: 6, len2: 400, phase: 4.1, rise: 16 }, color: FITS_BODY, opacity: 0.85, bottom: VIEW_H + 2, solid: true },
];

export function FitsBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 w-full"
      focusable="false"
      preserveAspectRatio="xMidYMin slice"
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    >
      <defs>
        {bands.map((b) => {
          const top = b.wave.y - b.wave.a - b.wave.a2 - b.wave.rise;
          const full = Math.min(0.45, 110 / (b.bottom - top));
          return (
            <linearGradient gradientUnits="userSpaceOnUse" id={`fits-band-${b.id}`} key={b.id} x1="0" x2="0" y1={top} y2={b.bottom}>
              <stop offset="0" stopColor={b.color} stopOpacity="0" />
              <stop offset={full} stopColor={b.color} stopOpacity={b.opacity} />
              <stop offset="1" stopColor={b.color} stopOpacity={b.solid ? 1 : 0} />
            </linearGradient>
          );
        })}
      </defs>

      {/* Water carried over from the Problem section. */}
      <rect fill={TOP} height={VIEW_H} width={VIEW_W} />
      {bands.map((b) => (
        <path d={bandPath(b.wave, b.bottom)} fill={`url(#fits-band-${b.id})`} key={b.id} />
      ))}
    </svg>
  );
}
