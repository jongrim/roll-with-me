import { TrophyGoldDiceMode } from '../API';

function getHighestDie(dice: string[]) {
  let highest = 0;
  dice.forEach((die) => {
    if (Number(die) > highest) {
      highest = Number(die);
    }
  });
  return highest;
}

function getHuntRollResult({ lightDice }: { lightDice: string[] }) {
  if (lightDice.length === 0) return '';
  const highest = getHighestDie(lightDice);
  if (highest === 6) {
    return 'You receive a token';
  }
  if (highest > 3) {
    return 'You get a token, but encounter something terrible';
  }
  if (highest > 1) {
    return 'You encounter something terrible';
  }
  return 'You encounter something terrible, and lose all tokens';
}

function getRiskRollResult({
  lightDice,
  darkDice = [],
}: {
  lightDice: string[];
  darkDice?: string[];
}) {
  if (lightDice.length === 0) return '';
  const highestLight = getHighestDie(lightDice);
  const highestDark = getHighestDie(darkDice);
  const highest = Math.max(highestDark, highestLight);
  let result = '';
  if (highest === 6) {
    result = 'You succeed. Describe how.';
  } else if (highest > 3) {
    result =
      'You succeed, but there’s some kind of complication. The gm describes the complication, then you describe how you succeed.';
  } else {
    result =
      'You fail, and things get worse. The gm describes how. The gm may also allow you to succeed, but things will get worse in some other way.';
  }

  if (highestDark >= highestLight) {
    result +=
      '\nThe dark die is highest. If it is higher than your current ruin, your ruin goes up by one.';
  } else {
    result += '\nYou may add another dark die and roll again.';
  }

  return result;
}

function getCombatRollResult({ darkDice }: { darkDice: string[] }) {
  if (darkDice.length === 0) return '';
  const sum = darkDice.reduce((acc, cur) => {
    return acc + Number(cur);
  }, 0);
  return `You defeat the monster if its endurance is ${sum} or lower`;
}

function getGoldRollResult({ goldDice }: { goldDice: string[] }) {
  if (goldDice.length === 0) return '';
  const numberOfSixes = goldDice.reduce((acc, cur) => {
    if (cur === '6') {
      return acc + 1;
    }
    return acc;
  }, 0);

  return `You got ${numberOfSixes} Gold`;
}

export default function getRollOutcome({
  mode,
  lightDice,
  darkDice,
  goldDice,
}: {
  mode: TrophyGoldDiceMode;
  lightDice?: string[];
  darkDice?: string[];
  goldDice?: string[];
}) {
  switch (mode) {
    case TrophyGoldDiceMode.hunt:
      if (!lightDice) throw new Error('no light dice!');
      return getHuntRollResult({ lightDice });
    case TrophyGoldDiceMode.risk:
      if (!lightDice) throw new Error('no light dice!');
      return getRiskRollResult({ lightDice, darkDice });
    case TrophyGoldDiceMode.combat:
      if (!darkDice) throw new Error('no dark dice for combat results');
      return getCombatRollResult({ darkDice });
    case TrophyGoldDiceMode.gold:
      if (!goldDice) throw new Error('no gold dice for gold results');
      return getGoldRollResult({ goldDice });
  }
}
