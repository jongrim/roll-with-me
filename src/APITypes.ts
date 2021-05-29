import {
  HeartRoom,
  HexMapModule,
  SafetyModule,
  TrophyGoldBeast,
  TrophyGoldCharacter,
  TrophyGoldDiceModule,
} from './API';
import { VisualCounter, VisualDie, VisualLabel } from './types';

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
  bestiary: {
    items: TrophyGoldBeast[];
  };
  diceModule: TrophyGoldDiceModule;
  createdAt: string;
  updatedAt: string;
  characters: {
    items: RawTrophyGoldCharacter[];
  };
  safetyModule: RawSafetyModule;
  hexMapModule?: RawHexMapModule;
}

export interface RawTrophyGoldCharacter extends TrophyGoldCharacter {
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
  weaponSet: string;
  armorSet: string;
  foundEquipment: Array<string>;
  burdens?: number;
  hoard?: number;
  gold?: number;
  tokens?: number;
  training?: Array<string>;
  household?: string;
  library?: Array<string>;
  backpack?: string;
  conditions?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
export interface HeartRoomDetails extends HeartRoom {
  id: string;
  name: string;
  safetyModule: RawSafetyModule;
  hexMapModule: RawHexMapModule;
}

export interface RawSafetyModule extends SafetyModule {
  id: string;
}

export interface RawHexMapModule extends HexMapModule {
  id: string;
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
  rolls: Array<string>;
};
