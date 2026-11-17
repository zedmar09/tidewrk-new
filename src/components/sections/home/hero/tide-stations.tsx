"use client";

import { Check, FlaskConical, Hammer, type LucideIcon, Rocket } from "lucide-react";
import { type RefObject, useEffect, useState } from "react";

import {
  crestYAt,
  nextMove,
  STATION,
  type StationStatus,
  stations,
  SUN,
  VIEW,
} from "./tide-shapes";

// Roadmap stations riding the crest: a floating platform where each team
// member will stand, a glowing status dot on the coral line, a label tag,
// and the Launch flag. Each outer <g> is moved by the backdrop's animation
// loop so it bobs with the wave.
//
// Stations spread across whatever part of the scene is visible on screen,
// and the people are sized as tall as possible without reaching the
// headline, subtitle, or button above them.

const FONT = { fontFamily: "var(--font-poppins), Poppins, sans-serif" };
const SILVER = "#C8CCD0";
const CORAL = "#E98973";

const icons: Record<(typeof stations)[number]["id"], LucideIcon> = {
  plan: Check,
  build: Hammer,
  test: FlaskConical,
  launch: Rocket,
};

type Register = (id: string, x: number, el: SVGGElement | null) => void;

type Layout = { xs: number[]; nextX: number; nextLabelX: number; personHeight: number };

const defaultLayout: Layout = {
  xs: stations.map((s) => s.x),
  nextX: nextMove.x,
  nextLabelX: nextMove.x,
  personHeight: STATION.personHeight,
};

/**
 * Side margin (fraction of the visible width) for Plan and Next move.
 * The Problem section's text margin uses the same 9% (problem-section.tsx),
 * so its copy lines up with the Plan dot.
 */
const EDGE = 0.09;
/** Launch and its flag stay left of the sun; Next move sits past its reflection. */
const LAUNCH_MAX_X = SUN.cx - SUN.r - 150;
const NEXT_MIN_X = SUN.cx + SUN.r + 130;
const PERSON_MIN = 110;
/** Typical character height, used to size things before the real height is known. */
const NOMINAL_PERSON = 190;
const PERSON_MAX = 230;
const TEXT_CLEARANCE = 18; // scene units kept free under the hero text

/**
 * How far a platform floats above its dot, so the climbing coral line passes
 * cleanly underneath it instead of cutting through its side.
 */
function platformRiseAt(x: number, rx: number) {
  const { platformRy: ry, platformDepth: depth } = STATION;
  const cy = crestYAt(x);
  let rise = STATION.platformRise;
  // The line may tuck just behind the platform's outer edges, as in the reference art.
  for (let dx = -rx * 0.75; dx <= rx * 0.75; dx += 8) {
    const bottom = depth + ry * Math.sqrt(Math.max(0, 1 - (dx / rx) ** 2));
    rise = Math.max(rise, cy - crestYAt(x + dx) + bottom + 10);
  }
  return rise;
}

function measureLayout(svg: SVGSVGElement, avoid: HTMLElement | null): Layout {
  const box = svg.getBoundingClientRect();
  if (!box.width || !box.height) return defaultLayout;

  // Visible part of the viewBox (preserveAspectRatio="xMidYMax slice").
  const scale = Math.max(box.width / VIEW.w, box.height / VIEW.h);
  const visW = box.width / scale;
  const visH = box.height / scale;
  const visL = VIEW.x + (VIEW.w - visW) / 2;
  const visT = VIEW.y + VIEW.h - visH;
  const toScene = (r: DOMRect) => ({
    left: visL + (r.left - box.left) / scale,
    right: visL + (r.right - box.left) / scale,
    bottom: visT + (r.bottom - box.top) / scale,
  });

  // When the scene is wider than the screen (phones, swiping sideways), the
  // fixed text can sit above any station, so treat it as full width.
  const swipeable = box.width > window.innerWidth + 1;
  const blocks = avoid
    ? Array.from(avoid.querySelectorAll<HTMLElement>("h1, p, a")).map((el) => {
        const b = toScene(el.getBoundingClientRect());
        return swipeable ? { ...b, left: -Infinity, right: Infinity } : b;
      })
    : [];

  // Evenly spaced steps up the wave across the whole visible width:
  // Plan → Build → Test → Launch → (sunrise) → Next move.
  const visR = visL + visW;
  const first = visL + visW * EDGE;
  const end = visR - visW * EDGE;
  const step = (end - first) / stations.length;
  const last = Math.min(first + step * (stations.length - 1), LAUNCH_MAX_X);
  const xs = stations.map((_, i) => first + ((last - first) * i) / (stations.length - 1));
  const nextX = Math.max(end, NEXT_MIN_X);
  // Keep the Next move tag on screen even when the dot sits near the edge.
  const nextLabelX = Math.min(nextX, visR - nextMove.labelWidth / 2 - 24);

  // Tallest person that keeps every label (and head) clear of the text above.
  let personHeight = PERSON_MAX;
  const lowestBottom = (left: number, right: number) =>
    blocks
      .filter((b) => b.right > left && b.left < right)
      .reduce((max, b) => Math.max(max, b.bottom + TEXT_CLEARANCE), -Infinity);
  stations.forEach((station, i) => {
    const x = xs[i];
    const platformLift = station.id === "plan" ? 24 : 0;
    const platformY =
      crestYAt(x) - platformRiseAt(x, station.platformRx) - platformLift;
    const labelLimit = lowestBottom(x - station.labelWidth / 2, x + station.labelWidth / 2);
    const half = (station.aspect * NOMINAL_PERSON) / 2;
    const headLimit = lowestBottom(x - half, x + half);
    personHeight = Math.min(
      personHeight,
      platformY - labelLimit - STATION.labelHeight - STATION.labelGap,
      platformY - headLimit,
    );
  });

  return { xs, nextX, nextLabelX, personHeight: Math.max(PERSON_MIN, Math.round(personHeight)) };
}

function useStationLayout(svgRef: RefObject<SVGSVGElement | null>, avoidRef?: RefObject<HTMLElement | null>) {
  const [layout, setLayout] = useState<Layout>(defaultLayout);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => setLayout(measureLayout(svg, avoidRef?.current ?? null));

    update();
    const observer = new ResizeObserver(update);
    observer.observe(svg);
    if (avoidRef?.current) observer.observe(avoidRef.current);
    document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, [svgRef, avoidRef]);

  return layout;
}

function StationIcon({
  id,
  status,
  cx,
  cy,
}: {
  id: (typeof stations)[number]["id"];
  status: StationStatus;
  cx: number;
  cy: number;
}) {
  const Icon = icons[id];
  const size = 24;
  return (
    <Icon
      color={status === "upcoming" ? SILVER : CORAL}
      height={size}
      strokeWidth={id === "plan" ? 3 : 2.2}
      width={size}
      x={cx - size / 2}
      y={cy - size / 2}
    />
  );
}

function Label({ x, y, width, children }: { x: number; y: number; width: number; children: React.ReactNode }) {
  return (
    <g>
      <rect
        fill="#071A3A"
        fillOpacity="0.88"
        height={STATION.labelHeight}
        rx={STATION.labelHeight / 2}
        stroke={SILVER}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        width={width}
        x={x - width / 2}
        y={y}
      />
      {children}
    </g>
  );
}

/** Status dot on the coral line, with a soft glow like the reference art. */
function GlowDot({ x, y, kind }: { x: number; y: number; kind: StationStatus | "next" }) {
  const warm = kind !== "upcoming";
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        fill={warm ? "url(#tide-dot-glow-warm)" : "url(#tide-dot-glow-cool)"}
        r={kind === "active" ? 46 : kind === "upcoming" ? 26 : 34}
      />
      <circle
        cx={x}
        cy={y}
        fill={kind === "next" ? "#FFD9CC" : kind === "active" ? "#FFE3D9" : warm ? CORAL : "#5F86C2"}
        r={kind === "active" ? 12 : 10}
        stroke={kind === "active" ? CORAL : warm ? "#FFFFFF" : "#E4EBF5"}
        strokeOpacity="0.9"
        strokeWidth="3"
      />
    </g>
  );
}

export function TideStations({
  register,
  svgRef,
  avoidRef,
}: {
  register: Register;
  svgRef: RefObject<SVGSVGElement | null>;
  avoidRef?: RefObject<HTMLElement | null>;
}) {
  const S = STATION;
  const { xs, nextX, nextLabelX, personHeight } = useStationLayout(svgRef, avoidRef);

  return (
    <g className="tide-stations">
      <defs>
        <radialGradient id="tide-dot-glow-warm">
          <stop offset="0" stopColor="#FFB49E" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#F59078" stopOpacity="0.55" />
          <stop offset="0.65" stopColor={CORAL} stopOpacity="0.18" />
          <stop offset="1" stopColor={CORAL} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tide-platform-top" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3566AB" />
          <stop offset="1" stopColor="#24508F" />
        </linearGradient>
        <linearGradient id="tide-platform-side" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#173E78" />
          <stop offset="0.5" stopColor="#1D4A8A" />
          <stop offset="1" stopColor="#123362" />
        </linearGradient>
        <radialGradient id="tide-dot-glow-cool">
          <stop offset="0" stopColor="#BFD4F2" stopOpacity="0.6" />
          <stop offset="0.45" stopColor="#7FA3D6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#7FA3D6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {stations.map((station, i) => {
        const x = xs[i];
        const cy = crestYAt(x);
        const rx = station.platformRx;
        const rise = platformRiseAt(x, rx);
        const platformLift = station.id === "plan" ? 24 : 0;
        const platformY = cy - rise - platformLift;
        const artHeight = personHeight * station.artScale;
        const personTop = platformY - artHeight;
        const personWidth = artHeight * station.aspect;
        // The source SVG wrappers retain different amounts of invisible space
        // below their artwork. Correct each baseline so the visible character
        // sits on the centre of its platform ellipse at every responsive scale.
        const seat = station.baselineOffset * station.artScale;
        const labelY =
          personTop + platformLift - S.labelGap - S.labelHeight;
        const labelLeft = x - station.labelWidth / 2;
        const flagX = x + rx - 26;

        return (
          <g data-station={station.id} key={station.id} ref={(el) => register(station.id, x, el)}>
            <g className="tide-station" style={{ animationDelay: `${1.4 + i * 0.4}s` }}>
              {/* Label tag + dashed connector down to the person */}
              <Label width={station.labelWidth} x={x} y={labelY}>
                <StationIcon cx={labelLeft + 28} cy={labelY + S.labelHeight / 2} id={station.id} status={station.status} />
                <text
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontSize="22"
                  fontWeight="500"
                  style={FONT}
                  x={labelLeft + 50}
                  y={labelY + S.labelHeight / 2 + 1}
                >
                  {station.label}
                </text>
              </Label>
              <line
                stroke={SILVER}
                strokeDasharray="4 6"
                strokeOpacity="0.7"
                strokeWidth="2"
                x1={x}
                x2={x}
                y1={labelY + S.labelHeight}
                y2={
                  personTop +
                  Math.max(18, artHeight * 0.12) +
                  (station.id === "plan" ? 32 : 0)
                }
              />

              {/* Floating platform */}
              <g>
                <path
                  d={`M${x - rx} ${platformY} L${x - rx} ${platformY + S.platformDepth} A${rx} ${S.platformRy} 0 0 0 ${x + rx} ${platformY + S.platformDepth} L${x + rx} ${platformY} Z`}
                  fill="url(#tide-platform-side)"
                />
                <ellipse cx={x} cy={platformY} fill="url(#tide-platform-top)" rx={rx} ry={S.platformRy} />
                <ellipse cx={x} cy={platformY} fill="none" rx={rx} ry={S.platformRy} stroke="#3B6FB8" strokeWidth="2" />
              </g>

              {/* The team member at work on this step */}
              <g className="tide-person" style={{ animationDelay: `${-i * 1.3}s` }}>
                <image
                  height={artHeight}
                  href={station.image}
                  preserveAspectRatio="xMidYMax meet"
                  width={personWidth}
                  x={x - personWidth / 2}
                  y={personTop + seat}
                />
              </g>

              {/* Launch flag, planted on the right edge of the platform */}
              {station.flag && (
                <g>
                  <line
                    stroke={SILVER}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    x1={flagX}
                    x2={flagX}
                    y1={platformY + 2}
                    y2={platformY - 132}
                  />
                  <circle cx={flagX} cy={platformY - 134} fill={SILVER} r="4" />
                  <path
                    className="tide-flag"
                    d={`M${flagX + 2} ${platformY - 128} C${flagX + 26} ${platformY - 136} ${flagX + 40} ${platformY - 118} ${flagX + 64} ${platformY - 124} L${flagX + 52} ${platformY - 108} L${flagX + 64} ${platformY - 92} C${flagX + 40} ${platformY - 86} ${flagX + 26} ${platformY - 104} ${flagX + 2} ${platformY - 96} Z`}
                    fill={CORAL}
                  />
                </g>
              )}

              {/* Short stem pinning the platform to its milestone on the line */}
              {rise > S.platformDepth + S.platformRy + 14 && (
                <line
                  stroke={SILVER}
                  strokeDasharray="3 5"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  x1={x}
                  x2={x}
                  y1={platformY + S.platformDepth + S.platformRy + 2}
                  y2={cy - 12}
                />
              )}
              <GlowDot kind={station.status} x={x} y={cy} />
            </g>
          </g>
        );
      })}

      {/* "Next move" waypoint at the end of the roadmap, past the sunrise */}
      {(() => {
        const x = nextX;
        const { labelWidth } = nextMove;
        const cy = crestYAt(x);
        const labelY = cy - 80;
        const labelLeft = nextLabelX - labelWidth / 2;
        return (
          <g data-station="next" ref={(el) => register("next", x, el)}>
            <g className="tide-station" style={{ animationDelay: `${1.4 + stations.length * 0.4}s` }}>
              <Label width={labelWidth} x={nextLabelX} y={labelY}>
                <text
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontSize="22"
                  fontWeight="500"
                  style={FONT}
                  x={labelLeft + 24}
                  y={labelY + STATION.labelHeight / 2 + 1}
                >
                  {nextMove.label}
                </text>
                <path
                  d={`M${labelLeft + labelWidth - 34} ${labelY + 15} L${labelLeft + labelWidth - 20} ${labelY + 23} L${labelLeft + labelWidth - 34} ${labelY + 31} Z`}
                  fill={CORAL}
                />
              </Label>
              <line
                stroke={SILVER}
                strokeDasharray="4 6"
                strokeOpacity="0.7"
                strokeWidth="2"
                x1={x}
                x2={x}
                y1={labelY + STATION.labelHeight}
                y2={cy - 14}
              />
              <GlowDot kind="next" x={x} y={cy} />
            </g>
          </g>
        );
      })()}
    </g>
  );
}
