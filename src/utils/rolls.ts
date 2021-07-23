import { v4 as uuidv4 } from "uuid";
import { Die, Roll, SavedRoll } from "../types";
import { CustomDie } from "./dice";

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

export function createFudgeDie(): Die {
  return {
    id: uuidv4(),
    sides: 6,
    result: undefined,
    name: "Fudge",
    type: "fudge",
  };
}

export function makeNFudgeDice({ n }: { n: number }): Die[] {
  return Array.from(new Array(n)).map(() => createFudgeDie());
}

const dieFactory =
  ({ n, name }: { n: number; name?: string }) =>
  () =>
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

type dieWithResult = { result: number };

export function assignResultsToDice<T extends { sides: number }>({
  dice,
  results,
}: {
  dice: T[];
  results: number[];
}): (T & dieWithResult)[] {
  const newDice = [];
  for (let i = 0; i < dice.length; i++) {
    const newDie = { ...dice[i], result: (results[i] % dice[i].sides) + 1 };
    newDice.push(newDie);
  }
  return newDice;
}

export function sumOfDice(dice: Die[]): number {
  return dice.reduce((acc, cur) => {
    if (cur.type === "fudge") {
      return acc + fudgeDieNumberResult(cur.result || 0);
    }
    return acc + (cur.result || 0);
  }, 0);
}

export function getRollFromQuickString(
  s: string,
  customDice?: CustomDie[]
): Roll {
  const specifiedRollName = getRollName(s);
  const modifier = getModifier(s);

  const maybeCustomDice = getCustomDice(s, customDice);
  const maybeBaseDice = getBaseDice(s);
  const maybeFudgeDice = getFudgeDice(s);
  const dice = [...maybeBaseDice, ...maybeFudgeDice, ...maybeCustomDice];

  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    modifier: modifier,
    rollName: specifiedRollName ?? describeRoll({ dice, modifier }),
    rolledBy: "",
    sum: 0,
    dice,
  };
}

export function getRollName(s: string) {
  const rollNameReg = /as (.+)/i;
  const rollNameGroups = s.match(rollNameReg);
  return rollNameGroups?.[1];
}

export function getModifier(s: string) {
  const modifierReg = /(\+|-)\s?\d/;
  const modifier = modifierReg.exec(s);
  return Number(modifier?.[0].replace(" ", "") ?? 0);
}

export function getCustomDice(s: string, customDice?: CustomDie[]) {
  let customMatches: {
    count: number;
    sides: number;
    name: string;
  }[] = [];

  if (customDice) {
    customDice.forEach((die) => {
      const dieNameReg = new RegExp(`(\\d*)\\s*(${die.name})\\b`, "i");
      const diceNameGroups = s.match(dieNameReg);
      if (diceNameGroups) {
        const dieTemplate = customDice.find((d) => d.id === die.id);
        if (!dieTemplate) return;
        customMatches.push({
          count: Number(diceNameGroups[1]),
          sides: dieTemplate.sides,
          name: dieTemplate.name,
        });
      }
    });
  }

  if (customMatches.length > 0) {
    const dice = customMatches
      .map((match) => {
        return makeNDice({
          count: match.count,
          sides: match.sides,
          name: match.name,
        });
      })
      .flat();
    return dice;
  }
  return [];
}

export function getBaseDice(s: string) {
  const baseDiceReg = /\d{0,3}\s*d\s*\d+/gi;

  const countReg = /\d+\s*d/i;
  const sidesReg = /d\s*\d+/i;

  const baseDice = [...s.matchAll(baseDiceReg)];
  if (baseDice.length > 0) {
    const dice = baseDice
      .map((group) => {
        const count = countReg
          .exec(group[0])?.[0]
          .toLowerCase()
          .replace("d", "")
          .trim();
        const sides = sidesReg
          .exec(group[0])?.[0]
          .toLowerCase()
          .replace("d", "")
          .trim();
        return makeNDice({
          count: Number(count),
          sides: Number(sides),
        });
      })
      .flat();
    return dice;
  }
  return [];
}

export function getFudgeDice(s: string) {
  const fudgeDiceReg = /\d{0,3}\s*d\s*f\b/gi;

  const countReg = /\d+\s*d/i;

  const baseDice = [...s.matchAll(fudgeDiceReg)];
  if (baseDice.length > 0) {
    const dice = baseDice
      .map((group) => {
        const count = countReg
          .exec(group[0])?.[0]
          .toLowerCase()
          .replace("d", "")
          .trim();
        return makeNFudgeDice({ n: Number(count) });
      })
      .flat();
    return dice;
  }
  return [];
}

export function describeRoll({
  dice,
  modifier,
}: {
  dice: Die[];
  modifier: number;
}): string {
  const diceString = getCountOfDiceTypesFromDice(dice);
  return `${diceString} + ${modifier}`;
}

export function getCountOfDiceTypesFromDice(dice: Die[]): string {
  let diceCountMap: Record<string, number> = {};
  dice.forEach((d) => {
    if (diceCountMap[d.name]) {
      diceCountMap[d.name] += 1;
    } else {
      diceCountMap[d.name] = 1;
    }
  });
  return Object.entries(diceCountMap)
    .map(([key, val]) => `${val} ${key}`)
    .join(" + ");
}

export function getCountOfDiceTypesFromRoll(roll: SavedRoll): string {
  let diceCountMap: Record<string, number> = {};
  roll.dice.forEach((d) => {
    if (diceCountMap[d.name]) {
      diceCountMap[d.name] += 1;
    } else {
      diceCountMap[d.name] = 1;
    }
  });
  return Object.entries(diceCountMap)
    .map(([key, val]) => `${val} ${key}`)
    .join(" + ");
}

// Used for rolling a saved roll or a pre-defined roll
export const savedRollToRoll =
  (name: string) =>
  (roll: SavedRoll): Roll => {
    return {
      ...roll,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      sum: 0,
      rolledBy: name,
    };
  };

export const createEmptySavedRoll = (): SavedRoll => {
  return {
    id: uuidv4(),
    createdAt: new Date().toDateString(),
    rollName: "",
    modifier: 0,
    dice: [],
  };
};

export const createNewRollFromValues = ({
  id,
  dice,
  rollName,
  rolledBy,
  modifier,
  offline,
}: {
  id: string;
  dice: Die[];
  rollName?: string;
  rolledBy?: string;
  modifier?: number;
  offline?: boolean;
}): SavedRoll => {
  const newRoll = {
    id,
    dice,
    rollName: rollName || "",
    rolledBy: rolledBy || "",
    modifier: modifier || 0,
    sum: 0,
    offline,
  };
  if (newRoll.rollName === "") {
    newRoll.rollName = describeRoll(newRoll);
  }
  return newRoll;
};

export const fudgeDieTextResult = (result: number) => {
  switch (result) {
    case 1:
    case 2:
      return "+";
    case 3:
    case 4:
      return "—";
    default:
      return "blank";
  }
};

export const fudgeDieNumberResult = (result: number) => {
  switch (result) {
    case 1:
    case 2:
      return 1;
    case 3:
    case 4:
      return -1;
    default:
      return 0;
  }
};
