// Background for the Problem section, based on
// design/references/problem-background-v1.webp and problem-reference-v1.webp.
// Soft, blended wave bands: no rim lines or foam strokes. Each band fades in
// from transparent at its crest, so the layers melt into one another and into
// the hero above (which fades its own waves to #012356). Drawn on a
// 1440 × 1100 canvas, anchored to the top.

const VIEW_W = 1440;
const VIEW_H = 1100;
const LEFT = -200;
const RIGHT = VIEW_W + 200;

type Wave = {
  /** Resting height of the crest. */
  y: number;
  /** Main swell height and length, plus a smaller second swell for an organic edge. */
  a: number;
  len: number;
  a2: number;
  len2: number;
  phase: number;
  /** Gentle rise toward the right (px across the full width), like the hero's tide. */
  rise?: number;
};

const crestY = (w: Wave, x: number) =>
  w.y -
  ((w.rise ?? 0) * (x - LEFT)) / (RIGHT - LEFT) +
  w.a * Math.sin((2 * Math.PI * x) / w.len + w.phase) +
  w.a2 * Math.sin((2 * Math.PI * x) / w.len2 + w.phase * 1.7);

/** Filled band from the crest down to `bottom`. */
function band(w: Wave, bottom: number) {
  let d = "";
  for (let x = LEFT; x <= RIGHT; x += 10) {
    d += `${x === LEFT ? "M" : " L"}${x} ${crestY(w, x).toFixed(1)}`;
  }
  return `${d} L${RIGHT} ${bottom} L${LEFT} ${bottom} Z`;
}

type Band = {
  id: string;
  wave: Wave;
  /** Colour at the body of the band; the crest fades in from transparent. */
  color: string;
  /** How opaque the band gets below its crest. */
  opacity: number;
  bottom: number;
  bob: string;
};

// Top: the hero's tide settling (farthest first, each lower band in front).
const topBands: Band[] = [
  { id: "a", wave: { y: 40, a: 18, len: 820, a2: 6, len2: 300, phase: 0.6, rise: 30 }, color: "#0C3771", opacity: 0.75, bottom: 360, bob: "12s" },
  { id: "b", wave: { y: 110, a: 20, len: 960, a2: 7, len2: 350, phase: 2.4, rise: 24 }, color: "#072B63", opacity: 0.8, bottom: 420, bob: "14s" },
  { id: "c", wave: { y: 190, a: 16, len: 1100, a2: 6, len2: 400, phase: 4.1, rise: 16 }, color: "#03224F", opacity: 0.85, bottom: 520, bob: "16s" },
];

// Bottom: the water gathering again before the next section.
const bottomBands: Band[] = [
  { id: "d", wave: { y: 880, a: 16, len: 1000, a2: 5, len2: 360, phase: 3.2, rise: -18 }, color: "#0A2958", opacity: 0.7, bottom: VIEW_H + 60, bob: "17s" },
  { id: "e", wave: { y: 960, a: 18, len: 1160, a2: 6, len2: 420, phase: 0.9, rise: -10 }, color: "#05214E", opacity: 0.85, bottom: VIEW_H + 60, bob: "20s" },
];

function BandGradient({ band: b }: { band: Band }) {
  // Soft crest: transparent at the top of the band, full colour ~90px lower,
  // easing back out at the bottom so it blends into the band beneath.
  const top = b.wave.y - b.wave.a - b.wave.a2 - (b.wave.rise ?? 0);
  return (
    <linearGradient gradientUnits="userSpaceOnUse" id={`problem-band-${b.id}`} x1="0" x2="0" y1={top} y2={b.bottom}>
      <stop offset="0" stopColor={b.color} stopOpacity="0" />
      <stop offset={Math.min(0.45, 110 / (b.bottom - top))} stopColor={b.color} stopOpacity={b.opacity} />
      <stop offset="1" stopColor={b.color} stopOpacity={b.bottom > VIEW_H ? b.opacity : 0} />
    </linearGradient>
  );
}

export function ProblemBackdrop() {
  const bands = [...bottomBands, ...topBands];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      focusable="false"
      preserveAspectRatio="xMidYMin slice"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    >
      <defs>
        {bands.map((b) => (
          <BandGradient band={b} key={b.id} />
        ))}
        {/* Soft moonlight on the open water, top-right. */}
        <radialGradient cx="0.78" cy="0.32" id="problem-sheen" r="0.45">
          <stop offset="0" stopColor="#1B417D" stopOpacity="0.2" />
          <stop offset="1" stopColor="#1B417D" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect fill="url(#problem-sheen)" height={VIEW_H} width={VIEW_W} />

      {bands.map((b) => (
        <path
          className="problem-wave"
          d={band(b.wave, b.bottom)}
          fill={`url(#problem-band-${b.id})`}
          key={b.id}
          style={{ animationDuration: b.bob }}
        />
      ))}
    </svg>
  );
}
