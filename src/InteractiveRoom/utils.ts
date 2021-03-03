import { getRandomNumbers } from '../functions/randomNumbers';
import { assignResultsToDice, createDieOfNSides } from '../utils/rolls';
import findEmptySpace, { getBoxes } from '../utils/findEmptySpace';

const MIN_HEIGHT = 72;
const MIN_WIDTH = 72;

export const makeNewVisualDie = async ({
  sides,
  leftOffset = 0,
}: {
  sides: number;
  leftOffset?: number;
}) => {
  const die = createDieOfNSides({ n: sides, name: `d${sides}` });
  const { top, left } = findEmptySpace({
    MIN_HEIGHT,
    MIN_WIDTH,
    ...getBoxes(),
  });
  const results = await getRandomNumbers(1);
  const diceWithResults = assignResultsToDice({
    dice: [die],
    results,
  });
  return { ...diceWithResults[0], x: left + leftOffset, y: top };
};
