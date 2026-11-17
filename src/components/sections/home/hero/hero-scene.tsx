import { PlaceholderShip } from "./placeholder-ship";
import { SceneBackdrop } from "./scene-backdrop";
import { RoadmapCard, SceneChips, TeamCard } from "./scene-cards";
import { SceneConnectors } from "./scene-connectors";
import { STAGE_HEIGHT, STAGE_WIDTH, u } from "./stage";

// The illustrated world under the hero text. Layers, back to front:
// backdrop (sky, sun, hills, sea, waves) → dotted connectors → ship → cards.
export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={`@container relative w-full ${className ?? ""}`}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}`,
          // One design pixel, derived from the container width.
          ["--u" as string]: `calc(100cqw / ${STAGE_WIDTH})`,
        }}
      >
        <SceneBackdrop />
        <SceneConnectors />

        <div
          className="absolute"
          id="ship"
          style={{ left: u(800), top: u(368), width: u(200), height: u(170) }}
        >
          <PlaceholderShip className="h-full w-full" />
        </div>

        {/* Cards repeat what the copy says; screen readers get it from the text above. */}
        <div aria-hidden="true">
          <TeamCard />
          <RoadmapCard />
          <SceneChips />
        </div>
      </div>
    </div>
  );
}
