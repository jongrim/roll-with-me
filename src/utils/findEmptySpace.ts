export const DICEBOX_ID = 'dice-box';

export default function findEmptySpace({
  diceboxRect,
  MIN_HEIGHT,
  MIN_WIDTH,
  childrenBoxes,
}: {
  diceboxRect: DOMRect;
  MIN_HEIGHT: number;
  MIN_WIDTH: number;
  childrenBoxes: {
    id: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
  }[];
}): { top: number; left: number } {
  if (childrenBoxes.length === 0) {
    return { top: 0, left: 0 };
  }

  let spotFound = false;
  let top = diceboxRect.top;
  let bottom = top + MIN_HEIGHT;
  let left = diceboxRect.left;
  let right = left + MIN_WIDTH;
  const MAX_LOOPS = 2000;
  let currentLoop = 0;
  while (!spotFound) {
    spotFound = true;
    if (currentLoop >= MAX_LOOPS) {
      break;
    }
    for (const box of childrenBoxes) {
      if (doOverlap({ box1: box, box2: { top, left, bottom, right } })) {
        if (bottom + MIN_HEIGHT < diceboxRect.bottom) {
          // more room below
          top += MIN_HEIGHT / 4;
          bottom += MIN_HEIGHT / 4;
        } else {
          // reset to top and move right
          top = diceboxRect.top;
          bottom = top + MIN_HEIGHT;
          left += MIN_WIDTH / 4;
          right += MIN_WIDTH / 4;
        }
        spotFound = false;
        currentLoop += 1;
        break;
      }
    }
  }
  return { top: top - diceboxRect.top, left: left - diceboxRect.left };
}

interface Box {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
const doOverlap = ({ box1, box2 }: { box1: Box; box2: Box }): boolean => {
  if (box1.left >= box2.right || box2.left >= box1.right) return false;
  if (box1.top >= box2.bottom || box2.top >= box1.bottom) return false;
  return true;
};

export const getBoxes = () => {
  const diceboxEl = window.document.getElementById(DICEBOX_ID);
  const diceboxRect = diceboxEl?.getBoundingClientRect() ?? new DOMRect();
  const childrenBoxes = Array.from(diceboxEl?.children ?? []).map((el) => {
    const box = el.getBoundingClientRect();
    return {
      id: el.getAttribute('id') ?? '',
      left: box.left,
      top: box.top,
      right: box.right,
      bottom: box.bottom,
    };
  });
  return { diceboxRect, childrenBoxes };
};
