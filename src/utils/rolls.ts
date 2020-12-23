import { v4 as uuidv4 } from 'uuid';
import { Die, Roll, SavedRoll } from '../types';

export function createDieOfNSides({
  n,
  name,
}: {
  n: number;
  name?: string;
}): Die {
  return {
    id: uuidv4(),
    sides: n,
    result: undefined,
    name: name || `D${n}`,
  };
}

const dieFactory = ({ n, name }: { n: number; name?: string }) => () =>
  createDieOfNSides({ n, name });

export function makeNDice({
  count,
  sides,
  name,
}: {
  count: number;
  sides: number;
  name?: string;
}): Die[] {
  return Array.from(new Array(count)).map(dieFactory({ n: sides, name }));
}

export function assignResultsToDice({
  dice,
  results,
}: {
  dice: Die[];
  results: number[];
}): Die[] {
  const newDice = [];
  for (let i = 0; i < dice.length; i++) {
    const newDie = { ...dice[i], result: (results[i] % dice[i].sides) + 1 };
    newDice.push(newDie);
  }
  return newDice;
}

export function sumOfDice(dice: Die[]): number {
  return dice.reduce((acc, cur) => acc + (cur.result || 0), 0);
}

export function getRollFromQuickString(s: string): Roll {
  const baseDiceReg = /^\dd\d+/i;
  const modifierReg = /(\+|-)\s?\d/;
  const rollNameReg = /as (.+)/i;

  const baseDice = baseDiceReg.exec(s);
  const modifier = modifierReg.exec(s);
  const rollNameGroups = s.match(rollNameReg);

  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    modifier: Number(modifier?.[0].replace(' ', '') ?? 0),
    rollName: rollNameGroups?.[1] ?? `${baseDice?.[0]} ${modifier?.[0]}`,
    rolledBy: '',
    sum: 0,
    dice: makeNDice({
      count: Number(baseDice?.[0].substr(0, 1)),
      sides: Number(baseDice?.[0].substr(2)),
    }),
  };
}

export function describeRoll(roll: SavedRoll): string {
  const diceString = getCountOfDiceTypesFromRoll(roll);
  return `(${diceString} + ${roll.modifier})`;
}

export function getCountOfDiceTypesFromRoll(roll: SavedRoll): string {
  let diceCountMap: Record<string, number> = {};
  roll?.dice.forEach((d) => {
    if (diceCountMap[d.name]) {
      diceCountMap[d.name] += 1;
    } else {
      diceCountMap[d.name] = 1;
    }
  });
  return Object.entries(diceCountMap)
    .map(([key, val]) => `${val} ${key}`)
    .join(' + ');
}

export const savedRollToRoll = (name: string) => (roll: SavedRoll): Roll => {
  return {
    ...roll,
    createdAt: new Date().toISOString(),
    sum: 0,
    rolledBy: name,
  };
};

export const createEmptySavedRoll = (): SavedRoll => {
  return {
    id: uuidv4(),
    createdAt: new Date().toDateString(),
    rollName: '',
    modifier: 0,
    dice: [],
  };
};
