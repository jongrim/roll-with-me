import { useState, useRef } from 'react';

export function clamp(min: number, max: number, cur: number) {
  if (cur > max) return max;
  if (cur < min) return min;
  return cur;
}

export function move(arr: any[], i: number, target: number) {
  const item = arr[i];
  const otherItem = arr[target];
  const next = [...arr];
  next[target] = item;
  next[i] = otherItem;
  return next;
}

export const usePositionReorder = (
  initialState: any[]
): [
  any[],
  React.Dispatch<React.SetStateAction<any[]>>,
  (i: number, offset: number) => number,
  (i: number, viewportBox: any) => void
] => {
  const [order, setOrder] = useState(initialState);

  // We need to collect an array of width and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<number[]>([]).current;
  const updatePosition = (i: number, offset: number) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const updateOrder = (i: number, viewportBox: any) => {
    const targetIndex = findIndex(i, viewportBox, positions);
    if (targetIndex !== i) setOrder(move(order, i, targetIndex));
  };

  return [order, setOrder, updatePosition, updateOrder];
};

export const findIndex = (i: any, currentBox: any, positions: any) => {
  let target = i;

  currentBox.x.center = (currentBox.x.min + currentBox.x.max) / 2;
  currentBox.y.center = (currentBox.y.min + currentBox.y.max) / 2;

  const nextBox = positions[i + 1];
  const prevBox = positions[i - 1];

  if (nextBox && currentBox.y.center > nextBox.top) {
    target = i + 1;
  }
  if (prevBox && currentBox.y.center < prevBox.top + prevBox.height) {
    target = i - 1;
  }

  return clamp(0, positions.length, target);
};
