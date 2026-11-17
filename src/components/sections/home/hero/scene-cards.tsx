import type { ReactNode } from "react";
import { Check, ChevronRight, KeyRound, MapPin, ShieldCheck, UserRound } from "lucide-react";

import { u } from "./stage";

// Cards that tell the visitor, at a glance, what Tidewrk is:
// embedded professionals, your roadmap on track, backup behind critical roles,
// and code you own. Positions are in design pixels on the 1440 × 640 stage.

// TODO(assets): swap the placeholder icons for the generated portraits
// (public/hero/avatar-developer.png, etc.).
const team = [
  { role: "Developer" },
  { role: "QA Engineer" },
  { role: "Operations" },
  { role: "Project Lead" },
];

const roadmap = [
  { label: "Wireframe", state: "done", progress: 1 },
  { label: "Build", state: "active", progress: 0.45 },
  { label: "Launch", state: "next", progress: 0 },
] as const;

const cardClass =
  "absolute border border-white/45 bg-[#0B1A33]/85 text-white shadow-[0_18px_50px_rgba(2,8,20,0.35)]";

function CardLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-medium uppercase text-[#C8CCD0]"
      style={{ fontSize: u(11.5), letterSpacing: "0.2em" }}
    >
      {children}
    </p>
  );
}

export function TeamCard() {
  return (
    <div
      className={cardClass}
      style={{ left: u(104), top: u(205), width: u(364), height: u(186), borderRadius: u(14), padding: `${u(16)} ${u(20)}` }}
    >
      <CardLabel>Your team</CardLabel>
      <p className="font-medium" style={{ fontSize: u(20), marginTop: u(2) }}>
        Embedded in your team
      </p>
      <ul className="flex justify-between" style={{ marginTop: u(12) }}>
        {team.map((member) => (
          <li className="flex flex-col items-center" key={member.role} style={{ width: u(76) }}>
            <span
              className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#3B6FB8] to-[#1D4580] text-white/85"
              style={{ width: u(70), height: u(70) }}
            >
              <UserRound aria-hidden="true" style={{ width: u(32), height: u(32) }} />
            </span>
            <span className="text-center text-white/90" style={{ fontSize: u(12), marginTop: u(8) }}>
              {member.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoadmapCard() {
  return (
    <div
      className={cardClass}
      style={{ left: u(524), top: u(200), width: u(320), height: u(172), borderRadius: u(14), padding: `${u(16)} ${u(22)}` }}
    >
      <CardLabel>Your roadmap</CardLabel>
      <p className="font-medium" style={{ fontSize: u(21), marginTop: u(2) }}>
        On track
      </p>
      <ul style={{ marginTop: u(10) }}>
        {roadmap.map((row) => (
          <li className="flex items-center" key={row.label} style={{ height: u(34), gap: u(12) }}>
            <span className="flex shrink-0 items-center justify-center" style={{ width: u(20) }}>
              {row.state === "done" ? (
                <Check className="text-[#E98973]" strokeWidth={3} style={{ width: u(20), height: u(20) }} />
              ) : (
                <span
                  className={`rounded-full ${row.state === "active" ? "border-[#E98973]" : "border-[#C8CCD0]/80"}`}
                  style={{ width: u(16), height: u(16), borderWidth: u(2.5) }}
                />
              )}
            </span>
            <span className="text-white/90" style={{ fontSize: u(15), width: u(92) }}>
              {row.label}
            </span>
            <span className="relative flex-1 overflow-hidden rounded-full bg-[#2A5A9E]/45" style={{ height: u(9) }}>
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-[#E98973]"
                style={{ width: `${row.progress * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chip({
  icon,
  children,
  left,
  top,
  width,
  height,
}: {
  icon: ReactNode;
  children: ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <div
      className={`${cardClass} flex items-center font-medium`}
      style={{ left: u(left), top: u(top), width: u(width), height: u(height), borderRadius: u(height / 2 > 26 ? 14 : 999), padding: `0 ${u(18)}`, gap: u(12) }}
    >
      {icon}
      {children}
    </div>
  );
}

const iconStyle = { width: u(26), height: u(26) };

export function SceneChips() {
  return (
    <>
      <Chip
        height={46}
        icon={<MapPin className="shrink-0 fill-[#E98973] text-[#0B1A33]" style={iconStyle} />}
        left={1171}
        top={164}
        width={200}
      >
        <span className="flex items-center" style={{ fontSize: u(19), gap: u(6) }}>
          Next move
          <ChevronRight className="fill-[#E98973] text-[#E98973]" style={{ width: u(16), height: u(16) }} />
        </span>
      </Chip>
      <Chip
        height={64}
        icon={<ShieldCheck className="shrink-0 text-[#E98973]" style={iconStyle} />}
        left={1074}
        top={266}
        width={254}
      >
        <span className="leading-tight" style={{ fontSize: u(17) }}>
          Backup on every critical role
        </span>
      </Chip>
      <Chip
        height={50}
        icon={<KeyRound className="shrink-0 text-[#E98973]" style={iconStyle} />}
        left={1074}
        top={350}
        width={260}
      >
        <span style={{ fontSize: u(18) }}>You own the code</span>
      </Chip>
    </>
  );
}
