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
