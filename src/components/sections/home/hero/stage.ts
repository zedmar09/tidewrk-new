// The hero scene is drawn on a fixed 1440 × 640 design canvas.
// `--u` is one design pixel, derived from the stage's container width, so every
// card, line, and drawing scales together and stays aligned at any width.
export const STAGE_WIDTH = 1440;
export const STAGE_HEIGHT = 640;

/** Converts design pixels to a CSS length that scales with the stage. */
export const u = (designPx: number) => `calc(var(--u) * ${designPx})`;
