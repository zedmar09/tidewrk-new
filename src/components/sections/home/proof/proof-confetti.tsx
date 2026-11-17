// A small, elegant sprinkle of flat confetti around the trophy (not a party
// explosion). Positions are % of the trophy area; pieces keep clear of the
// trophy itself and drift/turn slowly (.proof-confetti in globals.css).

type Piece = {
  left: number;
  top: number;
  shape: "dot" | "dash" | "squiggle";
  color: string;
  size: number;
  rotate: number;
  delay: number;
};

const CORAL = "#E98973";
const SILVER = "#C8CCD0";
const WHITE = "#FFFFFF";
const BLUE = "#3B6FB8";
const SKY = "#7FA8E0";

const pieces: Piece[] = [
  // Left side
  { left: -4, top: 6, shape: "squiggle", color: CORAL, size: 26, rotate: 20, delay: 0 },
  { left: 6, top: 22, shape: "dot", color: SILVER, size: 8, rotate: 0, delay: -1.2 },
  { left: -10, top: 30, shape: "dash", color: SKY, size: 22, rotate: -35, delay: -2.4 },
  { left: 2, top: 44, shape: "dot", color: CORAL, size: 7, rotate: 0, delay: -0.6 },
  { left: -14, top: 52, shape: "squiggle", color: BLUE, size: 24, rotate: -15, delay: -3 },
  { left: 8, top: 60, shape: "dash", color: WHITE, size: 16, rotate: 50, delay: -1.8 },
  { left: -6, top: 12, shape: "dot", color: WHITE, size: 5, rotate: 0, delay: -2 },
  { left: 14, top: 4, shape: "dash", color: CORAL, size: 14, rotate: 70, delay: -0.9 },
  { left: -18, top: 40, shape: "dot", color: SKY, size: 6, rotate: 0, delay: -3.4 },
  // Right side
  { left: 92, top: 4, shape: "dot", color: CORAL, size: 9, rotate: 0, delay: -0.4 },
  { left: 100, top: 18, shape: "dash", color: SILVER, size: 22, rotate: 40, delay: -1.6 },
  { left: 104, top: 32, shape: "dot", color: BLUE, size: 9, rotate: 0, delay: -2.8 },
  { left: 90, top: 46, shape: "squiggle", color: CORAL, size: 26, rotate: 25, delay: -1 },
  { left: 108, top: 56, shape: "dash", color: SKY, size: 18, rotate: -60, delay: -2.2 },
  { left: 96, top: 62, shape: "dot", color: WHITE, size: 6, rotate: 0, delay: -3.2 },
  { left: 84, top: 10, shape: "dash", color: WHITE, size: 12, rotate: -20, delay: -2.6 },
  { left: 114, top: 42, shape: "dot", color: CORAL, size: 5, rotate: 0, delay: -0.2 },
  // Above
  { left: 30, top: -6, shape: "dot", color: SKY, size: 6, rotate: 0, delay: -1.4 },
  { left: 66, top: -8, shape: "dash", color: CORAL, size: 14, rotate: 30, delay: -2 },
  { left: 48, top: -12, shape: "dot", color: WHITE, size: 5, rotate: 0, delay: -0.8 },
  { left: 20, top: -2, shape: "squiggle", color: SILVER, size: 20, rotate: -40, delay: -3.6 },
];

function Shape({ piece }: { piece: Piece }) {
  const { shape, color, size } = piece;
  if (shape === "dot") {
    return <span className="block rounded-full" style={{ width: size, height: size, background: color }} />;
  }
  if (shape === "dash") {
    return <span className="block rounded-full" style={{ width: size, height: Math.max(4, size / 5), background: color }} />;
  }
  return (
    <svg fill="none" height={size * 0.6} viewBox="0 0 30 18" width={size}>
      <path d="M2 14 C 7 2, 11 2, 15 9 S 23 16, 28 4" stroke={color} strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

export function ProofConfetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {pieces.map((piece, i) => (
        <span
          className="proof-confetti absolute"
          key={i}
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            ["--r" as string]: `${piece.rotate}deg`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        >
          <Shape piece={piece} />
        </span>
      ))}
    </div>
  );
}
