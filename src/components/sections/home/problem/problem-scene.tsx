import Image from "next/image";

// "Everything depends on too few people": two people holding up the whole
// stack of work, an empty dashed outline where the missing teammate should be,
// and a faint vendor walking off with the code in the background.
// Art: public/images/problem/problem-scene.svg (cleaned + trimmed from
// design/references/problem-scene.png, 1131 × 1230).
// TODO(assets): a parts sheet would let the stack sway and the outline pulse on its own.

const SCENE_W = 1131;
const SCENE_H = 1230;

export function ProblemScene({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className ?? ""}`}>
      {/* The platform floats gently on the calm water. */}
      <div className="problem-float">
        <Image
          alt=""
          className="h-auto w-full"
          height={SCENE_H}
          sizes="(min-width: 1280px) 480px, (min-width: 640px) 448px, 92vw"
          src="/images/problem/problem-scene.svg"
          unoptimized
          width={SCENE_W}
        />
      </div>
    </div>
  );
}
