import { STAGE_HEIGHT, STAGE_WIDTH } from "./stage";

// Dotted lines from the ship out to each card. Drawn in the same 1440 × 640
// space as the cards, so they stay attached at every width.
// Each path starts at the card and ends at the ship (draw-in direction for step 4).
export const connectors = [
  { id: "to-team", d: "M468 378 C 600 378, 560 450, 700 452 S 790 456, 812 462" },
  { id: "to-roadmap", d: "M716 372 C 716 410, 736 420, 762 432 S 800 448, 812 462" },
  { id: "to-next", d: "M1271 210 C 1271 262, 1140 236, 1104 300 S 970 384, 962 428" },
  { id: "to-backup", d: "M1074 298 C 1024 298, 1012 338, 994 378 S 968 418, 962 428" },
  { id: "to-code", d: "M1074 375 C 1030 375, 1004 404, 974 436" },
];

const endpoints = [
  [468, 378],
  [716, 372],
  [1271, 210],
  [1074, 298],
  [1074, 375],
  [812, 462],
  [962, 428],
  [974, 436],
];

export function SceneConnectors() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
    >
      <g stroke="#E4EAF3" strokeDasharray="1 7" strokeLinecap="round" strokeOpacity="0.85" strokeWidth="2.4">
        {connectors.map((line) => (
          <path d={line.d} id={line.id} key={line.id} />
        ))}
      </g>
      <g fill="#FFFFFF">
        {endpoints.map(([cx, cy]) => (
          <circle cx={cx} cy={cy} key={`${cx}-${cy}`} r="4.5" />
        ))}
      </g>
    </svg>
  );
}
