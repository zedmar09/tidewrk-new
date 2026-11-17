"use client";

import { type RefObject, useCallback, useEffect, useRef } from "react";

import {
  bandPath,
  coralCrest,
  coralSheenBottom,
  FLOOR,
  hillFarRight,
  hillsLeft,
  hillsRightBottom,
  hillsRightTop,
  HORIZON_Y,
  type Point,
  reflections,
  ripples,
  smoothPath,
  stars,
  SUN,
  SUN_HORIZON_Y,
  VIEW,
  VIEW_W,
  waveBack,
  waveBright,
  waveDark,
  waveFront,
  waveMid,
} from "./tide-shapes";
import { TideStations } from "./tide-stations";

// Animated hero background: night sky, clouds, rising sun with reflection,
// and rolling waves carrying the coral roadmap line. Traced 1:1 from
// design/references/hero-background-v1.webp.

// ── Wave motion ────────────────────────────────────────────────────────────
// Each edge is displaced by a gentle travelling sine (moving left → right,
// so the tide pushes forward). Amplitude is small so the shapes stay
// faithful to the reference.
type Swell = { a: number; len: number; speed: number; phase: number };

const swells = {
  back: { a: 4, len: 760, speed: 0.38, phase: 0.4 },
  coral: { a: 5, len: 980, speed: 0.3, phase: 1.3 },
  bright: { a: 6, len: 820, speed: 0.42, phase: 2.2 },
  mid: { a: 6, len: 900, speed: 0.36, phase: 3.1 },
  front: { a: 5, len: 1100, speed: 0.27, phase: 4.4 },
} satisfies Record<string, Swell>;

const swellAt = (s: Swell, x: number, t: number) =>
  s.a * Math.sin((2 * Math.PI * x) / s.len - s.speed * t + s.phase) +
  s.a * 0.35 * Math.sin((2 * Math.PI * x) / (s.len * 0.47) - s.speed * 1.6 * t + s.phase * 2);

const smoothstep = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

const shift = (points: readonly Point[], dy: (x: number) => number): Point[] =>
  points.map(([x, y]) => [x, y + dy(x)] as const);

/** All animated wave paths for time t (seconds). t = 0 reproduces the reference. */
function wavePaths(t: number) {
  const on = t === 0 ? 0 : 1;
  const back = (x: number) => on * swellAt(swells.back, x, t);
  const coral = (x: number) => on * swellAt(swells.coral, x, t);
  // The bright band hugs the coral line on the left, then moves on its own.
  const bright = (x: number) => {
    const k = smoothstep(480, 820, x);
    return on * ((1 - k) * swellAt(swells.coral, x, t) + k * swellAt(swells.bright, x, t));
  };
  const mid = (x: number) => on * swellAt(swells.mid, x, t);
  const front = (x: number) => on * swellAt(swells.front, x, t);

  const crest = shift(coralCrest, coral);
  const sheenBottom = shift(coralSheenBottom, coral);
  // Short foam swooshes riding just below a wave's top edge.
  const foam = (points: readonly Point[], dy: (x: number) => number, x0: number, x1: number, off: number) =>
    smoothPath(shift(points.filter(([x]) => x >= x0 && x <= x1), (x) => dy(x) + off));

  return {
    back: bandPath(shift(waveBack, back)),
    dark: bandPath(shift(waveDark, back)),
    coralBody: bandPath(crest),
    sheen: `${smoothPath(crest)} ${smoothPath(sheenBottom, false)} Z`,
    crest: smoothPath(crest),
    crestGlow: smoothPath(crest),
    bright: bandPath(shift(waveBright, bright)),
    brightRim: smoothPath(shift(waveBright, bright).filter(([x]) => x >= 560)),
    backRim: smoothPath(shift(waveBack, back).filter(([x]) => x <= 600)),
    mid: bandPath(shift(waveMid, mid)),
    front: bandPath(shift(waveFront, front)),
    foam1: foam(waveBack, back, 40, 260, 14),
    foam2: foam(coralCrest, coral, 1330, 1560, 30),
    foam3: foam(waveBright, bright, 980, 1210, 16),
    foam4: foam(waveMid, mid, 260, 520, 20),
    foam5: foam(waveMid, mid, 1480, 1720, 22),
    foam6: foam(waveFront, front, 1180, 1420, 22),
  };
}

type WaveKey = keyof ReturnType<typeof wavePaths>;

// Bottom of the visible scene; the hero's waves fade out here (see below).
const VIEW_BOTTOM = VIEW.y + VIEW.h;

const initial = wavePaths(0);

// ── Static shapes ──────────────────────────────────────────────────────────
const hillsLeftPath = `${smoothPath(hillsLeft)} L672 ${HORIZON_Y + 2} L${hillsLeft[0][0]} ${HORIZON_Y + 2} Z`;
const hillsRightPath = `${smoothPath(hillsRightTop)} ${smoothPath(hillsRightBottom, false)} Z`;
const hillFarRightPath = `${smoothPath(hillFarRight)} L${hillFarRight[hillFarRight.length - 1][0]} ${SUN_HORIZON_Y + 3} L1580 ${SUN_HORIZON_Y + 3} Z`;
// A hazy far range behind the hills, dipping low where the sun rises.
const farRange: Point[] = [
  [-560, 452], [-470, 466], [-380, 474], [-260, 446], [-150, 458], [-40, 432], [80, 452], [190, 440], [300, 466],
  [420, 452], [540, 474], [660, 450], [780, 470], [900, 456], [1010, 436], [1120, 452],
  [1230, 428], [1330, 450], [1400, 482], [1450, 506], [1600, 506], [1660, 474],
  [1750, 446], [1860, 458], [1980, 438], [2060, 452], [2160, 436], [2240, 450],
];
const farRangePath = `${smoothPath(farRange)} L2240 ${HORIZON_Y + 4} L-560 ${HORIZON_Y + 4} Z`;

// The sea's far edge sits a little higher on the right, behind the hills.
const SEA_L = VIEW.x - 50;
const SEA_R = VIEW.x + VIEW.w + 50;
const seaPath = `M${SEA_L} ${HORIZON_Y} L930 ${HORIZON_Y} L1400 ${SUN_HORIZON_Y} L${SEA_R} ${SUN_HORIZON_Y} L${SEA_R} ${FLOOR} L${SEA_L} ${FLOOR} Z`;

const clouds = [
  {
    id: "cloud-left",
    d: "M22 269 C40 266 48 262 52 257 A30 30 0 0 1 102 244 A50 50 0 0 1 198 247 A20 20 0 0 1 232 256 A16 16 0 0 1 263 264 C272 267 280 268 288 269 Z",
    drift: "tide-cloud-a",
  },
  {
    id: "cloud-mid",
    d: "M410 396 C422 394 430 391 435 387 A18 18 0 0 1 466 380 A40 40 0 0 1 540 383 A14 14 0 0 1 565 389 A12 12 0 0 1 585 394 C590 395 596 396 602 396 Z",
    drift: "tide-cloud-b",
  },
  {
    id: "cloud-right",
    d: "M1383 231 C1395 229 1402 226 1407 222 A26 26 0 0 1 1450 210 A40 40 0 0 1 1522 196 A82 82 0 0 1 1680 209 L1690 231 Z",
    drift: "tide-cloud-c",
  },
];

/** Four-point sparkle star. */
const sparkle = (x: number, y: number, s: number) =>
  `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;

/** Pointed horizontal streak (lozenge). */
const streak = (x: number, y: number, w: number, h: number) =>
  `M${x - w} ${y} L${x - w * 0.62} ${y - h} L${x + w * 0.62} ${y - h} L${x + w} ${y} L${x + w * 0.62} ${y + h} L${x - w * 0.62} ${y + h} Z`;

export function TideBackdrop({
  className,
  avoidRef,
}: {
  className?: string;
  /** Hero text container; the stations keep their labels below it. */
  avoidRef?: RefObject<HTMLElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Partial<Record<WaveKey, SVGPathElement | null>>>({});
  // Stations ride the coral wave: each is shifted by the crest's swell at its x.
  const stationRefs = useRef(new Map<string, { x: number; el: SVGGElement }>());
  const registerStation = useCallback((id: string, x: number, el: SVGGElement | null) => {
    if (el) stationRefs.current.set(id, { x, el });
    else stationRefs.current.delete(id);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000 + 0.001;
      const next = wavePaths(t);
      for (const key of Object.keys(next) as WaveKey[]) {
        pathRefs.current[key]?.setAttribute("d", next[key]);
      }
      for (const { x, el } of stationRefs.current.values()) {
        el.setAttribute("transform", `translate(0 ${swellAt(swells.coral, x, t).toFixed(2)})`);
      }
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (visible && !reduce.matches) frame = requestAnimationFrame(tick);
    };

    // Pause the loop while the hero is off screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    observer.observe(svg);
    reduce.addEventListener("change", run);
    run();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduce.removeEventListener("change", run);
    };
  }, []);

  const wave = (key: WaveKey) => ({
    d: initial[key],
    ref: (el: SVGPathElement | null) => {
      pathRefs.current[key] = el;
    },
  });

  return (
    <svg
      aria-hidden="true"
      className={`tide-backdrop ${className ?? ""}`}
      focusable="false"
      preserveAspectRatio="xMidYMax slice"
      ref={svgRef}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="tide-sky" x1="0" x2="0" y1="0" y2={HORIZON_Y}>
          <stop offset="0" stopColor="#010F2A" />
          <stop offset="0.19" stopColor="#00132F" />
          <stop offset="0.38" stopColor="#00183B" />
          <stop offset="0.57" stopColor="#011E4B" />
          <stop offset="0.66" stopColor="#012456" />
          <stop offset="0.755" stopColor="#042E64" />
          <stop offset="0.85" stopColor="#073878" />
          <stop offset="0.943" stopColor="#0F4E9A" />
          <stop offset="1" stopColor="#1259AC" />
        </linearGradient>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-sea" x1="0" x2="0" y1={SUN_HORIZON_Y} y2="720">
          <stop offset="0" stopColor="#0A4189" />
          <stop offset="0.16" stopColor="#03397B" />
          <stop offset="0.29" stopColor="#012D66" />
          <stop offset="0.42" stopColor="#00295F" />
          <stop offset="0.58" stopColor="#033A7E" />
          <stop offset="0.73" stopColor="#03448E" />
          <stop offset="1" stopColor="#054A96" />
        </linearGradient>

        <linearGradient id="tide-cloud" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3A7ACB" />
          <stop offset="0.35" stopColor="#245CA8" />
          <stop offset="0.75" stopColor="#164689" />
          <stop offset="1" stopColor="#0E3A78" />
        </linearGradient>
        <linearGradient id="tide-cloud-far" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2A5FA8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#123E7E" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="tide-far-range" x1="0" x2="0" y1="425" y2={HORIZON_Y}>
          <stop offset="0" stopColor="#0E3E80" />
          <stop offset="1" stopColor="#0B3570" />
        </linearGradient>

        <radialGradient id="tide-sun-glow">
          <stop offset="0" stopColor="#E8705C" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#DF6556" stopOpacity="0.78" />
          <stop offset="0.5" stopColor="#D65A52" stopOpacity="0.55" />
          <stop offset="0.63" stopColor="#C9505A" stopOpacity="0.4" />
          <stop offset="0.74" stopColor="#B04866" stopOpacity="0.24" />
          <stop offset="0.87" stopColor="#8A3E6A" stopOpacity="0.08" />
          <stop offset="1" stopColor="#6A3A6A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="tide-water-glow">
          <stop offset="0" stopColor="#E98973" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#B05A78" stopOpacity="0.14" />
          <stop offset="1" stopColor="#6A3A6A" stopOpacity="0" />
        </radialGradient>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-sun" x1="0" x2="0" y1={SUN.cy - SUN.r} y2={SUN_HORIZON_Y}>
          <stop offset="0" stopColor="#FC8B72" />
          <stop offset="1" stopColor="#FE9373" />
        </linearGradient>

        <linearGradient id="tide-back" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1556AD" />
          <stop offset="0.12" stopColor="#0E4B98" />
          <stop offset="0.3" stopColor="#063A7C" />
        </linearGradient>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-sheen" x1="0" x2="0" y1="560" y2="790">
          <stop offset="0" stopColor="#0E53A6" />
          <stop offset="1" stopColor="#0A4590" />
        </linearGradient>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-bright" x1="0" x2={VIEW_W} y1="0" y2="0">
          <stop offset="0" stopColor="#1258B0" />
          <stop offset="0.2" stopColor="#1054A8" />
          <stop offset="0.45" stopColor="#2775D0" />
          <stop offset="0.7" stopColor="#2270CB" />
          <stop offset="0.86" stopColor="#2A79D8" />
          <stop offset="1" stopColor="#1F6BC6" />
        </linearGradient>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-mid" x1="0" x2="0" y1="680" y2="900">
          <stop offset="0" stopColor="#043371" />
          <stop offset="1" stopColor="#04397C" />
        </linearGradient>

        <filter height="300%" id="tide-crest-glow" width="140%" x="-20%" y="-100%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <linearGradient gradientUnits="userSpaceOnUse" id="tide-bottom-fade" x1="0" x2="0" y1={VIEW_BOTTOM - 149} y2={VIEW_BOTTOM + 1}>
          <stop offset="0" stopColor="#012356" stopOpacity="0" />
          <stop offset="0.55" stopColor="#012356" stopOpacity="0.7" />
          <stop offset="1" stopColor="#012356" />
        </linearGradient>

        <clipPath id="tide-sun-clip">
          <rect height={SUN_HORIZON_Y - VIEW.y} width={VIEW.w} x={VIEW.x} y={VIEW.y} />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect fill="url(#tide-sky)" height={HORIZON_Y - VIEW.y + 10} width={VIEW.w + 100} x={VIEW.x - 50} y={VIEW.y - 10} />

      <g className="tide-stars" fill="#FDFFFF">
        {stars.map((star, i) => (
          <path
            d={sparkle(star.x, star.y, star.s)}
            key={`${star.x}-${star.y}`}
            style={{ animationDelay: `${i * 0.9}s`, animationDuration: `${3.6 + (i % 3) * 1.1}s` }}
          />
        ))}
      </g>

      {/* Distant, fainter clouds filling the wider sky */}
      <g className="tide-cloud tide-cloud-b" fill="url(#tide-cloud-far)">
        <path d={clouds[1].d} transform="translate(-520 -330) scale(1.1)" />
        <path d={clouds[0].d} transform="translate(1040 -40) scale(0.7)" />
        <path d={clouds[1].d} transform="translate(1380 -30) scale(0.75)" />
        <path d={clouds[0].d} transform="translate(-260 160) scale(0.6)" />
      </g>

      {clouds.map((cloud) => (
        <g className={`tide-cloud ${cloud.drift}`} key={cloud.id}>
          <path d={cloud.d} fill="url(#tide-cloud)" />
          {/* lighter crown highlight */}
          <path d={cloud.d} fill="none" stroke="#5B95E0" strokeOpacity="0.35" strokeWidth="1.5" />
        </g>
      ))}

      {/* Sun glow, then the sun rising behind the horizon */}
      <ellipse className="tide-sun-glow" cx={SUN.cx} cy={SUN_HORIZON_Y} fill="url(#tide-sun-glow)" rx="250" ry="195" />
      <g clipPath="url(#tide-sun-clip)">
        <circle className="tide-sun" cx={SUN.cx} cy={SUN.cy} fill="url(#tide-sun)" r={SUN.r} />
      </g>

      {/* Far mountain range (haze layer) */}
      <path className="tide-far-range" d={farRangePath} fill="url(#tide-far-range)" />
      <path d={smoothPath(farRange)} fill="none" stroke="#3E78C4" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Hills and sea */}
      <path d={seaPath} fill="url(#tide-sea)" />
      <rect fill="#1460AF" height="1.6" opacity="0.55" width={940 - SEA_L} x={SEA_L} y={HORIZON_Y - 0.5} />
      <path d={hillsLeftPath} fill="#022457" />
      <path d={hillsRightPath} fill="#022559" />
      <path d={hillFarRightPath} fill="#012659" />
      {/* Soft moonlit rim along the hill tops */}
      <g fill="none" stroke="#2C66B4" strokeLinecap="round" strokeOpacity="0.4" strokeWidth="1.6">
        <path d={smoothPath(hillsLeft.filter(([x]) => x <= 660))} />
        <path d={smoothPath(hillsRightTop)} />
        <path d={smoothPath(hillFarRight)} />
      </g>

      <g fill="#0A438B">
        {ripples.map((r) => (
          <path d={streak(r.x, r.y, r.w, r.h)} key={`${r.x}-${r.y}`} opacity="0.75" />
        ))}
      </g>

      {/* Sun reflection */}
      <ellipse className="tide-water-glow" cx="1500" cy="515" fill="url(#tide-water-glow)" rx="200" ry="45" />
      <g className="tide-reflection" fill="#F98066">
        {reflections.map((r, i) => (
          <path
            d={streak(r.x, r.y, r.w, r.h)}
            key={r.y}
            opacity={r.o}
            style={{ animationDelay: `${-i * 0.7}s`, animationDuration: `${2.8 + (i % 3) * 0.9}s` }}
          />
        ))}
      </g>

      {/* Waves, back to front */}
      <g className="tide-waves">
        <g className="tide-rise" style={{ animationDelay: "0.2s" }}>
          <path {...wave("back")} fill="url(#tide-back)" />
          <path {...wave("backRim")} fill="none" stroke="#2A72CC" strokeOpacity="0.6" strokeWidth="2" />
          <path {...wave("dark")} fill="#03326E" />
        </g>

        <g className="tide-rise" style={{ animationDelay: "0.35s" }}>
          <path {...wave("coralBody")} fill="#02336F" />
          <path {...wave("sheen")} fill="url(#tide-sheen)" />
        </g>

        <g className="tide-rise" style={{ animationDelay: "0.5s" }}>
          <path {...wave("bright")} fill="url(#tide-bright)" />
          <path {...wave("brightRim")} fill="none" stroke="#4393F1" strokeOpacity="0.7" strokeWidth="2.5" />
        </g>

        <g className="tide-rise" style={{ animationDelay: "0.65s" }}>
          <path {...wave("mid")} fill="url(#tide-mid)" />
        </g>

        <g className="tide-rise" style={{ animationDelay: "0.8s" }}>
          <path {...wave("front")} fill="#012356" />
        </g>

        {/* Foam swooshes on the wave faces */}
        <g className="tide-foam" fill="none" stroke="#9CC2F2" strokeLinecap="round">
          <path {...wave("foam1")} strokeOpacity="0.35" strokeWidth="3" />
          <path {...wave("foam2")} strokeOpacity="0.3" strokeWidth="3.5" />
          <path {...wave("foam3")} strokeOpacity="0.4" strokeWidth="3.5" />
          <path {...wave("foam4")} strokeOpacity="0.3" strokeWidth="3" />
          <path {...wave("foam5")} strokeOpacity="0.3" strokeWidth="3" />
          <path {...wave("foam6")} strokeOpacity="0.25" strokeWidth="3" />
        </g>

        {/* Bottom fade: the waves melt into #012356, the colour the Problem
            section starts with, so there is no hard edge between them. */}
        <rect fill="url(#tide-bottom-fade)" height="150" width={VIEW.w + 100} x={VIEW.x - 50} y={VIEW_BOTTOM - 149} />

        {/* The roadmap line along the crest, drawn in left → right */}
        <g className="tide-rise" style={{ animationDelay: "0.35s" }}>
          <path
            {...wave("crestGlow")}
            className="tide-crest"
            fill="none"
            filter="url(#tide-crest-glow)"
            pathLength={1}
            stroke="#F5876C"
            strokeOpacity="0.3"
            strokeWidth="8"
          />
          <path
            {...wave("crest")}
            className="tide-crest"
            fill="none"
            pathLength={1}
            stroke="#FB8C70"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </g>
      </g>

      <TideStations avoidRef={avoidRef} register={registerStation} svgRef={svgRef} />
    </svg>
  );
}
