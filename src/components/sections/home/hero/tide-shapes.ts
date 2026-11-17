// Shape data for the hero background, traced from
// design/references/hero-background-v1.webp (1671 × 941). Coordinates are in
// that image's pixels, so the SVG viewBox matches the reference 1:1.

export type Point = readonly [number, number];

export const VIEW_W = 1671;
export const VIEW_H = 941;
/** Bottom used to close wave shapes, below the visible canvas. */
export const FLOOR = 1010;

// The reference is drawn at 1671 × 941. The rendered view is "zoomed out":
// extra sky above and the scene continued left and right, so the whole
// picture (clouds, sun, waves) stays visible with room for the team.
export const VIEW = { x: -465, y: -359, w: 2600, h: 1300 };
const EXT_LEFT = VIEW.x - 40;
const EXT_RIGHT = VIEW.x + VIEW.w + 40;

/**
 * Continues an edge past the reference's left and right borders, following
 * its end slope and easing it out, so waves and hills run off-screen smoothly.
 */
function extend(points: Point[], damping = 0.8): Point[] {
  const step = 60;
  const grow = (from: Point, to: Point, dir: 1 | -1, limit: number) => {
    const out: Point[] = [];
    let slope = (to[1] - from[1]) / (to[0] - from[0]);
    let [x, y] = to;
    while (dir === 1 ? x < limit : x > limit) {
      x += dir * step;
      slope *= damping;
      y += dir * step * slope;
      out.push([x, y]);
    }
    return out;
  };

  const ascending = points[0][0] < points[points.length - 1][0];
  const list = ascending ? points : [...points].reverse();
  const left = grow(list[1], list[0], -1, EXT_LEFT).reverse();
  const right = grow(list[list.length - 2], list[list.length - 1], 1, EXT_RIGHT);
  const full = [...left, ...list, ...right];
  return ascending ? full : full.reverse();
}

/** Smooth curve through points (Catmull-Rom converted to cubic Béziers). */
export function smoothPath(points: readonly Point[], move = true) {
  let d = move ? `M${points[0][0]} ${points[0][1].toFixed(1)}` : `L${points[0][0]} ${points[0][1].toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1].toFixed(1)}`;
  }

  return d;
}

/** A filled band: smooth top edge, closed straight down to the floor. */
export function bandPath(top: readonly Point[]) {
  const first = top[0];
  const last = top[top.length - 1];
  return `${smoothPath(top)} L${last[0]} ${FLOOR} L${first[0]} ${FLOOR} Z`;
}

/**
 * Waves are gently compressed toward the bottom of the frame (vs. the
 * reference) to leave more sky for the team and the hero text.
 */
export const WAVE_SQUASH = 0.85;
const squash = (points: Point[]): Point[] =>
  points.map(([x, y]) => [x, VIEW_H - (VIEW_H - y) * WAVE_SQUASH] as const);

/** Turns "x,y x,y ..." into a point list. */
const pts = (s: string): Point[] =>
  s
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(",").map(Number) as unknown as Point);

// ── Horizon ────────────────────────────────────────────────────────────────
export const HORIZON_Y = 530;
export const SUN_HORIZON_Y = 495;

export const hillsLeft = extend(pts(`
  -10,489 0,488 24,487 48,480 72,470 96,463 120,459 144,460 168,465 192,472 216,482 240,491
  264,497 288,495 312,492 336,492 360,495 384,501 408,508 432,513 456,516 480,516
  504,514 528,511 552,512 576,515 600,519 624,525 648,528 672,530`));

export const hillsRightTop = pts(`
  900,530 912,528 936,524 960,518 984,512 1008,506 1032,501 1056,499 1080,500 1104,501
  1128,494 1152,487 1176,484 1200,481 1224,473 1248,465 1272,461 1296,462 1320,466
  1344,473 1368,482 1392,489 1416,494 1432,498`);

// Lower edge of the right hills (the sea is visible a little higher there).
export const hillsRightBottom = pts(`
  1432,498 1392,500 1368,503 1344,506 1320,509 1296,512 1272,515 1248,518 1224,520
  1200,521 1176,523 1152,523 1128,524 1104,525 1080,526 1056,526 1032,527 1008,527
  984,528 960,528 936,529 900,530`);

export const hillFarRight = extend(pts(`1580,498 1592,493 1616,486 1640,478 1664,470 1690,462`), 0.55);

// ── Waves (back → front) ───────────────────────────────────────────────────

/** Light wave on the left, behind the coral wave. */
export const waveBack = squash(extend(pts(`
  -10,676 0,672 24,664 48,656 72,650 96,645 120,641 144,639 168,638 192,638 216,639
  240,641 264,644 288,648 312,653 336,659 360,665 384,671 408,678 432,684 456,690
  480,694 504,699 528,702 552,704 576,705 600,707 640,712 700,722 760,736`)));

/** Dark wave between the light back wave and the coral line (left side). */
export const waveDark = squash(extend(pts(`
  -10,714 0,710 24,701 48,694 72,688 96,683 120,679 144,676 168,675 192,675 216,675
  240,677 264,680 288,683 312,688 336,693 360,698 384,704 408,710 432,715 456,720
  480,724 504,726 528,728 552,734 600,752 660,780`)));

/** The roadmap: the coral line along the crest of the main wave. */
export const coralCrest = squash(extend(pts(`
  -10,813 0,809 24,799 48,789 72,780 96,772.5 120,765.5 144,760 168,755 192,751
  216,748 240,745.5 264,744 288,743.5 312,743.5 336,744 360,745 384,746 408,746
  432,746 456,745.5 480,744 504,742.5 528,740 552,737 576,733 600,728 624,723
  648,717 672,711 696,704 720,697 744,689.5 768,682 792,674 816,666 840,658
  864,649.5 888,641.5 912,634 936,626 960,618 984,610 1008,602.5 1032,595 1056,588
  1080,581.5 1104,575.5 1128,570.5 1152,565.5 1176,561.5 1200,558 1224,556 1248,554
  1272,553 1296,553 1320,554 1344,555 1368,557 1392,559 1416,562 1440,566
  1464,569.5 1488,573.5 1512,577.5 1536,581 1560,584.5 1584,587 1608,589 1632,590.5
  1656,590 1690,590`)));

/** Lower edge of the lighter sheen just under the coral line. */
export const coralSheenBottom = squash(extend(pts(`
  1690,628 1600,622 1540,616 1480,609 1420,601 1380,597 1360,595 1336,595 1312,596
  1288,598 1264,601 1240,604 1216,608 1192,613 1168,619 1144,625 1120,632 1096,641
  1072,650 1048,660 1024,671 1000,682 976,694 952,706 928,718 904,730 880,741
  856,751 832,760 808,768 784,775 760,781 700,775 600,760 480,752`)));

/** Top of the bright blue band. Follows the coral line on the left. */
export const waveBright = squash(extend(pts(`
  -10,818 0,814 24,804 48,794 72,785 96,777.5 120,770.5 144,765 168,760 192,756
  216,753 240,750.5 264,749 288,748.5 312,748.5 336,749 360,750 384,751 408,751
  432,751 456,751 480,753 504,754 528,756 552,759 576,763 600,766 624,770 648,774
  672,778 696,781 720,785 744,787 768,789 792,791 816,792 840,791 864,790 888,789
  912,786 936,783 960,778 984,773 1008,767 1032,759 1056,751 1080,742 1104,733
  1128,723 1152,713 1176,703 1200,693 1224,684 1248,675 1272,667 1296,660 1320,653
  1344,647 1368,642 1392,638 1416,635 1440,632 1464,630 1488,630 1512,630 1536,632
  1560,634 1584,637 1608,641 1632,645 1656,650 1690,656`)));

/** Mid-navy wave in front of the bright band. */
export const waveMid = squash(extend(pts(`
  -10,880 0,877 24,871 48,865 72,859 96,852 120,844 144,837 168,830 192,823 216,815
  240,809 264,803 288,798 312,793 336,788 360,785 384,782 408,780 432,780 456,780
  480,781 504,783 528,786 552,790 576,794 600,799 624,804 648,809 672,814 696,818
  720,821 744,824 768,825 792,826 816,826 840,824 864,822 888,818 912,814 936,808
  960,802 984,795 1008,787 1032,779 1056,770 1080,762 1104,753 1128,744 1152,736
  1176,728 1200,721 1224,714 1248,707 1272,701 1296,696 1320,692 1344,688 1368,685
  1392,682 1416,681 1440,680 1464,680 1488,681 1512,682 1536,685 1560,688 1584,691
  1608,696 1632,701 1656,707 1690,715`)));

/** Darkest wave at the very front. */
export const waveFront = squash(extend(pts(`
  -10,976 0,973 24,966 48,959 72,952 96,945 120,938 144,931 168,924 192,916 216,908
  240,900 264,893 288,886 312,879 336,873 360,867 384,862 408,858 432,854 456,851
  480,848 504,846 528,845 552,845 576,846 600,847 624,849 648,852 672,855 696,859
  720,864 744,868 768,873 792,877 816,881 840,885 864,889 888,891 912,893 936,894
  960,894 984,893 1008,891 1032,887 1056,883 1080,878 1104,871 1128,865 1152,856
  1176,848 1200,839 1224,830 1248,821 1272,813 1296,804 1320,797 1344,790 1368,783
  1392,777 1416,772 1440,768 1464,765 1488,762 1512,761 1536,760 1560,760 1584,762
  1608,764 1632,767 1656,771 1690,777`)));

// ── Sky details ────────────────────────────────────────────────────────────
export const SUN = { cx: 1502, cy: 510, r: 83 };

export const stars = [
  { x: 194, y: 87, s: 7 },
  { x: 252, y: 152, s: 5 },
  { x: 451, y: 313, s: 5 },
  { x: 1136, y: 277, s: 5 },
  { x: 1403, y: 157, s: 6.5 },
  { x: 1534, y: 70, s: 5 },
];

// Sun reflection streaks on the water: centre x, y, half-width, half-height.
export const reflections = [
  { x: 1510, y: 500, w: 54, h: 2.5, o: 0.55 },
  { x: 1508, y: 507, w: 100, h: 3.5, o: 0.8 },
  { x: 1500, y: 519, w: 62, h: 4, o: 0.95 },
  { x: 1500, y: 529, w: 50, h: 3, o: 0.75 },
  { x: 1506, y: 541, w: 40, h: 3, o: 0.85 },
  { x: 1505, y: 555, w: 23, h: 2.2, o: 0.8 },
];

// Faint lighter ripples on the open sea.
export const ripples = [
  { x: 150, y: 566, w: 95, h: 2 },
  { x: 380, y: 548, w: 80, h: 1.6 },
  { x: 400, y: 570, w: 70, h: 1.6 },
  { x: 720, y: 562, w: 100, h: 2 },
  { x: 725, y: 555, w: 55, h: 1.4 },
  { x: 910, y: 544, w: 55, h: 1.4 },
  { x: 1320, y: 522, w: 60, h: 1.4 },
];

/** Height of the coral crest line at x (linear between traced points). */
export function crestYAt(x: number) {
  const list = coralCrest;
  if (x <= list[0][0]) return list[0][1];
  for (let i = 1; i < list.length; i++) {
    const [x1, y1] = list[i];
    if (x <= x1) {
      const [x0, y0] = list[i - 1];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return list[list.length - 1][1];
}

// ── Roadmap stations on the crest ──────────────────────────────────────────
export type StationStatus = "done" | "active" | "upcoming";

export const stations: {
  id: "plan" | "build" | "test" | "launch";
  label: string;
  x: number;
  status: StationStatus;
  labelWidth: number;
  /** Character art (trimmed, in /public) and its width ÷ height. */
  image: string;
  aspect: number;
  /** Scales the visible character-and-prop group to its platform diameter. */
  artScale: number;
  /** Per-asset baseline correction for transparent space inside the SVG. */
  baselineOffset: number;
  /** Platform half-width, sized to the character and props on it. */
  platformRx: number;
  flag?: boolean;
}[] = [
  { id: "plan", label: "Plan", x: 230, status: "done", labelWidth: 132, image: "/images/hero/char-plan.svg", aspect: 1.516, artScale: 0.76, baselineOffset: 82, platformRx: 132 },
  { id: "build", label: "Build", x: 560, status: "active", labelWidth: 140, image: "/images/hero/char-build.svg", aspect: 1.369, artScale: 0.77, baselineOffset: 30, platformRx: 122 },
  { id: "test", label: "Test", x: 870, status: "upcoming", labelWidth: 128, image: "/images/hero/char-test.svg", aspect: 1.108, artScale: 0.86, baselineOffset: 16, platformRx: 112 },
  { id: "launch", label: "Launch", x: 1170, status: "upcoming", labelWidth: 162, image: "/images/hero/char-launch.svg", aspect: 1.005, artScale: 1, baselineOffset: 12, platformRx: 132, flag: true },
];

export const nextMove = { x: 1370, label: "Next move", labelWidth: 184 };

/** Station layout, relative to the crest point (x, crestY). */
export const STATION = {
  platformRise: 44, // platform top centre sits this far above the crest
  platformRx: 112,
  platformRy: 18,
  platformDepth: 32,
  personWidth: 190, // slot reserved for each character image
  personHeight: 160,
  labelGap: 30, // space between the label and the person's head
  labelHeight: 46,
};
