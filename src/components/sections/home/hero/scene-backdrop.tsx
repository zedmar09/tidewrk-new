import { STAGE_HEIGHT, STAGE_WIDTH } from "./stage";

// Static drawing of the hero world: clouds, hills, rising sun, sea, and waves.
// Each part is its own group (id) so step 3 can animate it independently.

const HORIZON_Y = 485;
const SUN = { cx: 354, cy: HORIZON_Y, r: 44 };
const SUN_RAY_ANGLES = [-165, -140, -115, -90, -65, -40, -15];

/**
 * A flat sine wave band, two stage-widths wide so it can later slide
 * left-to-right and loop seamlessly. The rising slope is applied by the
 * parent group's skew, which keeps this pattern tileable.
 */
function wavePath({
  baseY,
  amplitude,
  wavelength,
  phase = 0,
  bottom = STAGE_HEIGHT + 40,
}: {
  baseY: number;
  amplitude: number;
  wavelength: number;
  phase?: number;
  bottom?: number;
}) {
  const width = STAGE_WIDTH * 2;
  const step = 8;
  let d = `M0 ${bottom} L0 ${baseY}`;

  for (let x = 0; x <= width; x += step) {
    const y = baseY + amplitude * Math.sin((2 * Math.PI * x) / wavelength + phase);
    d += ` L${x} ${y.toFixed(1)}`;
  }

  return `${d} L${width} ${bottom} Z`;
}

function crestPath(options: Parameters<typeof wavePath>[0]) {
  // Same curve as the wave top, as an open line for the coral crest stroke.
  const width = STAGE_WIDTH * 2;
  const step = 8;
  let d = "";

  for (let x = 0; x <= width; x += step) {
    const y =
      options.baseY +
      options.amplitude * Math.sin((2 * Math.PI * x) / options.wavelength + (options.phase ?? 0));
    d += `${x === 0 ? "M" : " L"}${x} ${y.toFixed(1)}`;
  }

  return d;
}

// Wavelengths divide 1440 evenly so the pattern repeats at exactly one stage width.
const waves = [
  { id: "wave-back", baseY: 526, amplitude: 11, wavelength: 480, phase: 0.6, fill: "#1E4A8A" },
  { id: "wave-mid", baseY: 554, amplitude: 16, wavelength: 720, phase: 2.1, fill: "#2456A0", crest: true },
  { id: "wave-front", baseY: 590, amplitude: 22, wavelength: 1440, phase: 4.2, fill: "#1D4A8E", crest: true },
  { id: "wave-base", baseY: 622, amplitude: 12, wavelength: 480, phase: 1.3, fill: "#173C75", crest: true },
];

export function SceneBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      fill="none"
      viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
    >
      <defs>
        <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#E98973" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#E98973" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#E98973" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1A3A6C" />
          <stop offset="100%" stopColor="#10264C" />
        </linearGradient>
        <clipPath id="above-horizon">
          <rect height={HORIZON_Y} width={STAGE_WIDTH} x="0" y="0" />
        </clipPath>
      </defs>

      {/* Clouds */}
      <g id="clouds" fill="#1B3F75" opacity="0.9">
        <path d="M18 53 C 40 40, 60 38, 80 42 C 88 20, 120 10, 148 22 C 165 8, 200 12, 210 34 C 230 34, 245 44, 245 53 Z" />
        <path d="M1199 90 C 1215 74, 1240 70, 1262 76 C 1272 50, 1310 40, 1338 56 C 1356 38, 1396 44, 1402 72 C 1412 74, 1418 82, 1416 90 Z" />
      </g>

      {/* Distant hills */}
      <g id="hills">
        <path
          d={`M0 ${HORIZON_Y} L0 452 C 60 440, 110 430, 170 446 C 230 462, 270 438, 330 444 C 400 452, 440 470, 520 466 C 600 462, 640 440, 720 450 L 760 ${HORIZON_Y} Z`}
          fill="#1D3F73"
        />
        <path
          d={`M640 ${HORIZON_Y} C 700 470, 760 462, 820 468 C 900 476, 960 456, 1040 452 C 1120 448, 1180 430, 1260 438 C 1340 446, 1390 440, 1440 432 L1440 ${HORIZON_Y} Z`}
          fill="#1D3F73"
        />
        <path
          d={`M0 ${HORIZON_Y} L0 470 C 90 462, 160 474, 260 472 C 360 470, 420 478, 520 ${HORIZON_Y} Z`}
          fill="#173563"
        />
        <path
          d={`M1000 ${HORIZON_Y} C 1080 474, 1160 466, 1260 468 C 1340 470, 1400 462, 1440 458 L1440 ${HORIZON_Y} Z`}
          fill="#173563"
        />
      </g>

      {/* Rising sun (rays match the logo icon) */}
      <g id="sun">
        <circle cx={SUN.cx} cy={SUN.cy} fill="url(#sun-glow)" r="150" />
        <g clipPath="url(#above-horizon)">
          {SUN_RAY_ANGLES.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const inner = SUN.r + 14;
            const outer = SUN.r + (angle === -90 ? 48 : 40);
            return (
              <line
                key={angle}
                stroke="#E98973"
                strokeLinecap="round"
                strokeWidth="7"
                x1={SUN.cx + inner * Math.cos(rad)}
                x2={SUN.cx + outer * Math.cos(rad)}
                y1={SUN.cy + inner * Math.sin(rad)}
                y2={SUN.cy + outer * Math.sin(rad)}
              />
            );
          })}
          <circle cx={SUN.cx} cy={SUN.cy} fill="#E98973" r={SUN.r} />
        </g>
      </g>

      {/* Sea */}
      <rect fill="url(#sea)" height={STAGE_HEIGHT - HORIZON_Y + 40} width={STAGE_WIDTH} x="0" y={HORIZON_Y} />
      <line stroke="#E98973" strokeOpacity="0.35" strokeWidth="1.5" x1="0" x2={STAGE_WIDTH} y1={HORIZON_Y} y2={HORIZON_Y} />

      {/* Sun reflection */}
      <g id="sun-reflection" stroke="#E98973" strokeLinecap="round">
        {[
          { y: 496, w: 130, o: 0.85 },
          { y: 506, w: 96, o: 0.65 },
          { y: 516, w: 64, o: 0.45 },
          { y: 526, w: 34, o: 0.3 },
        ].map((line) => (
          <line
            key={line.y}
            strokeOpacity={line.o}
            strokeWidth="4"
            x1={SUN.cx - line.w / 2}
            x2={SUN.cx + line.w / 2}
            y1={line.y}
            y2={line.y}
          />
        ))}
      </g>

      {/* Waves: rise from bottom-left toward the upper-right (skew), never ebbing. */}
      <g id="waves" transform={`translate(0 ${STAGE_HEIGHT}) skewY(-2.4) translate(0 -${STAGE_HEIGHT})`}>
        {waves.map((wave) => (
          <g id={wave.id} key={wave.id}>
            <path d={wavePath(wave)} fill={wave.fill} />
            {wave.crest && (
              <path
                d={crestPath(wave)}
                stroke="#E98973"
                strokeLinecap="round"
                strokeOpacity="0.9"
                strokeWidth="2.5"
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
