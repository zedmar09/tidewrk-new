// The join between "Why companies bet on us" and "How this works" uses
// the same generated, soft gradient-wave system as the Problem → Fits join.
// Each band fades in below its organic crest, and the final band settles into
// the solid body colour of the Plan section.

export const PLAN_BODY = "#061F46";
const TOP = "#061F46";

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
  solid?: boolean;
};

const crestY = (wave: Wave, x: number) =>
  wave.y -
  (wave.rise * (x - LEFT)) / (RIGHT - LEFT) +
  wave.a * Math.sin((2 * Math.PI * x) / wave.len + wave.phase) +
  wave.a2 * Math.sin((2 * Math.PI * x) / wave.len2 + wave.phase * 1.7);

function bandPath(wave: Wave, bottom: number) {
  let path = "";

  for (let x = LEFT; x <= RIGHT; x += 10) {
    path += `${x === LEFT ? "M" : " L"}${x} ${crestY(wave, x).toFixed(1)}`;
  }

  return `${path} L${RIGHT} ${bottom} L${LEFT} ${bottom} Z`;
}

const bands: Band[] = [
  {
    id: "a",
    wave: {
      y: 40,
      a: 18,
      len: 820,
      a2: 6,
      len2: 300,
      phase: 0.6,
      rise: 30,
    },
    color: "#15508C",
    opacity: 0.5,
    bottom: 360,
  },
  {
    id: "b",
    wave: {
      y: 110,
      a: 20,
      len: 960,
      a2: 7,
      len2: 350,
      phase: 2.4,
      rise: 24,
    },
    color: "#0E427D",
    opacity: 0.58,
    bottom: 420,
  },
  {
    id: "c",
    wave: {
      y: 190,
      a: 16,
      len: 1100,
      a2: 6,
      len2: 400,
      phase: 4.1,
      rise: 16,
    },
    color: PLAN_BODY,
    opacity: 0.88,
    bottom: VIEW_H + 2,
    solid: true,
  },
];

export function PlanBackdrop() {
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
        {bands.map((band) => {
          const top =
            band.wave.y - band.wave.a - band.wave.a2 - band.wave.rise;
          const full = Math.min(0.45, 110 / (band.bottom - top));

          return (
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`plan-band-${band.id}`}
              key={band.id}
              x1="0"
              x2="0"
              y1={top}
              y2={band.bottom}
            >
              <stop offset="0" stopColor={band.color} stopOpacity="0" />
              <stop
                offset={full}
                stopColor={band.color}
                stopOpacity={band.opacity}
              />
              <stop
                offset="1"
                stopColor={band.color}
                stopOpacity={band.solid ? 1 : 0}
              />
            </linearGradient>
          );
        })}
      </defs>

      <rect fill={TOP} height={VIEW_H} width={VIEW_W} />
      {bands.map((band) => (
        <path
          d={bandPath(band.wave, band.bottom)}
          fill={`url(#plan-band-${band.id})`}
          key={band.id}
        />
      ))}
    </svg>
  );
}
