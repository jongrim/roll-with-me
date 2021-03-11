import { TrophyGoldDiceMode } from './API';
import { SafetyModule, VisualCounter, VisualDie, VisualLabel } from './types';

export interface TextRoomDetails {
  id: string;
  name: string;
  rolls?: Array<string> | null;
  counters?: Array<string> | null;
  createdAt: string;
  updatedAt: string;
  safetyModule: RawSafetyModule;
}

export interface TrophyDarkRoomDetails {
  id: string;
  name: string;
  lightDice: Array<string>;
  darkDice: Array<string>;
  characters: {
    items: TrophyDarkCharacter[];
  };
  createdAt: string;
  updatedAt: string;
  safetyModule: RawSafetyModule;
}

export interface TrophyDarkCharacter {
  id: string;
  gameID: string;
  playerName: string;
  characterName: string;
  characterPronouns: string;
  characterImageUrl?: string | null;
  ruin: number;
  occupation: string;
  background: string;
  drive: string;
  rituals: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface RawTrophyGoldRoomDetails {
  id: string;
  name: string;
  bestiary: Array<string>;
  lightDice: Array<string>;
  darkDice: Array<string>;
  goldDice: Array<string>;
  diceMode: TrophyGoldDiceMode;
  createdAt: string;
  updatedAt: string;
  characters?: {
    items: RawTrophyGoldCharacter[];
  };
  safetyModule: RawSafetyModule;
  hexMapModule?: RawHexMapModule;
}

export interface RawTrophyGoldCharacter {
  id: string;
  gameID: string;
  playerName: string;
  characterName?: string;
  characterPronouns?: string;
  characterImageUrl?: string;
  ruin?: number;
  weakPoint?: number;
  lightDice?: Array<string>;
  darkDice?: Array<string>;
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
export interface HeartRoomDetails {
  id: string;
  name: string;
  d4Dice: Array<string>;
  d6Dice: Array<string>;
  d8Dice: Array<string>;
  d10Dice: Array<string>;
  d12Dice: Array<string>;
  createdAt: string;
  updatedAt: string;
  characters: {
    items: HeartCharacter[];
  };
  safetyModule: RawSafetyModule;
  hexMapModule: RawHexMapModule;
}

export interface HeartCharacter {
  id: string;
  gameID: string;
  playerName: string;
  characterName: string;
  characterPronouns: string;
  characterImageUrl?: string | null;
  ancestry: string;
  calling: string;
  class: string;
  beats: Array<string>;
  fallout: Array<string>;
  bloodProtection: number;
  bloodStress: number;
  echoProtection: number;
  echoStress: number;
  fortuneProtection: number;
  fortuneStress: number;
  mindProtection: number;
  mindStress: number;
  supplyProtection: number;
  supplyStress: number;
  skills: Array<string>;
  domains: Array<string>;
  knacks: Array<string>;
  abilities: Array<string>;
  equipment: Array<string>;
  resources: Array<string>;
  bonds: Array<string>;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawSafetyModule {
  id: string;
  xCardActive: boolean;
  linesAndVeils: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface RawHexMapModule {
  id: string;
  gridConfiguration: string;
  backgroundImages: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export type InteractiveRoomData = {
  createdAt: string;
  updatedAt: string;
  labels: {
    items: VisualLabel[];
  };
  counters: {
    items: VisualCounter[];
  };
  dice: {
    items: VisualDie[];
  };
  id: string;
  name: string;
  safetyModule: SafetyModule;
  backgroundImageUrl?: string;
};
