import { assignResultsToDice, createDieOfNSides } from '../utils/rolls';
import findEmptySpace, { getBoxes } from '../utils/findEmptySpace';

const MIN_HEIGHT = 72;
const MIN_WIDTH = 72;

export const makeNewVisualDie = async ({
  sides,
  leftOffset = 0,
  getNumbers,
}: {
  sides: number;
  leftOffset?: number;
  getNumbers: (val: number) => Promise<number[]>;
}) => {
  const die = createDieOfNSides({ n: sides, name: `d${sides}` });
  const { top, left } = findEmptySpace({
    MIN_HEIGHT,
    MIN_WIDTH,
    ...getBoxes(),
  });
  const results = await getNumbers(1);
  const diceWithResults = assignResultsToDice({
    dice: [die],
    results,
  });
  return { ...diceWithResults[0], x: left + leftOffset, y: top };
};
