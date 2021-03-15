import { v4 as uuidv4 } from 'uuid';
import { TrophyGoldDiceMode } from '../API';
import { ParsedHexMapModule } from '../MapModule/gridConfiguration';
import { Die, SafetyModule } from '../types';

export interface TrophyGoldRoomDetails {
  id: string;
  name: string;
  bestiary: Array<string>;
  lightDice: Die[];
  darkDice: Die[];
  goldDice: Die[];
  diceMode: TrophyGoldDiceMode;
  createdAt: string;
  updatedAt: string;
  characters?: {
    items: TrophyGoldCharacter[];
  };
  safetyModule: SafetyModule;
  hexMapModule?: ParsedHexMapModule;
}

export interface TrophyGoldCharacter {
  id: string;
  gameID: string;
  playerName: string;
  characterName?: string;
  characterPronouns?: string;
  characterImageUrl?: string;
  ruin?: number;
  occupation?: string;
  background?: string;
  drive?: string;
  rituals?: Array<string>;
  combatEquipment?: Array<string>;
  foundEquipment?: Array<string>;
  burdens?: number;
  hoard?: number;
  gold?: number;
  tokens?: number;
  training?: Array<string>;
  household?: string;
  library?: Array<string>;
  backpack?: Array<string>;
  conditions?: Array<string>;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  marked: boolean;
  value?: number;
}

export interface Household {
  name: string;
  description: string;
}

export interface LibraryItem {
  id: string;
  ritual: string;
}
export interface BackpackItem {
  id: string;
  description: string;
  uses?: number;
}

export interface Backpack {
  [id: string]: BackpackItem;
}

function createBackpackItem() {
  return {
    id: uuidv4(),
    description: '',
  };
}

export function createEmptyBackpack(): Backpack {
  const map = {
    one: createBackpackItem(),
    two: createBackpackItem(),
    three: createBackpackItem(),
    four: createBackpackItem(),
    five: createBackpackItem(),
    six: createBackpackItem(),
  };
  return {
    [map.one.id]: map.one,
    [map.two.id]: map.two,
    [map.three.id]: map.three,
    [map.four.id]: map.four,
    [map.five.id]: map.five,
    [map.six.id]: map.six,
  };
}
