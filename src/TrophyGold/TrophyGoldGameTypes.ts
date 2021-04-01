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
  type: 'weapon' | 'armor' | 'found';
  description: string;
  marked?: boolean;
}

export interface Weapon extends Equipment {
  type: 'weapon';
}

export interface WeaponSet {
  [id: string]: Weapon;
}

export const createEmptyWeapon = (): Weapon => ({
  id: uuidv4(),
  type: 'weapon',
  description: '',
});

export function createEmptyWeaponSet(): WeaponSet {
  const map = {
    one: createEmptyWeapon(),
    two: createEmptyWeapon(),
    three: createEmptyWeapon(),
  };
  return {
    [map.one.id]: map.one,
    [map.two.id]: map.two,
    [map.three.id]: map.three,
  };
}

export interface Armor extends Equipment {
  type: 'armor';
  marked: boolean;
}

export interface ArmorSet {
  [id: string]: Armor;
}

export const createEmptyArmor = (): Armor => ({
  id: uuidv4(),
  type: 'armor',
  description: '',
  marked: false,
});

export function createEmptyArmorSet(): ArmorSet {
  const map = {
    one: createEmptyArmor(),
    two: createEmptyArmor(),
    three: createEmptyArmor(),
  };
  return {
    [map.one.id]: map.one,
    [map.two.id]: map.two,
    [map.three.id]: map.three,
  };
}

export interface FoundEquipment extends Equipment {
  type: 'found';
}

export const createEmptyFoundEquipment = (): FoundEquipment => ({
  id: uuidv4(),
  type: 'found',
  description: '',
});

export function createEmptyFoundEquipmentList(): FoundEquipment[] {
  let equipment = [];
  for (let i = 0; i < 6; i++) {
    equipment.push(createEmptyFoundEquipment());
  }
  return equipment;
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

export interface Beast {
  id: string;
  gameID?: string;
  gmModuleID?: string;
  endurance?: number;
  title: string;
  description: string;
  habit1?: string;
  habit2?: string;
  habit3?: string;
  habit4?: string;
  habit5?: string;
  habit6?: string;
  defenses: string;
  weakness: string;
}

export function makeBeast(gameID: { [key: string]: string }): Beast {
  return {
    id: uuidv4(),
    ...gameID,
    title: '',
    description: '',
    defenses: '',
    weakness: '',
    habit1: '',
    habit2: '',
    habit3: '',
    habit4: '',
    habit5: '',
    habit6: '',
  };
}
