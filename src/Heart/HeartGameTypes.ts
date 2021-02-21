export type Resistance = 'Blood' | 'Mind' | 'Echo' | 'Fortune' | 'Supply';
export const resistances: Resistance[] = [
  'Blood',
  'Mind',
  'Echo',
  'Fortune',
  'Supply',
];

export type Skill =
  | 'Compel'
  | 'Delve'
  | 'Discern'
  | 'Endure'
  | 'Evade'
  | 'Hunt'
  | 'Kill'
  | 'Mend'
  | 'Sneak';
export const skills: Skill[] = [
  'Compel',
  'Delve',
  'Discern',
  'Endure',
  'Evade',
  'Hunt',
  'Kill',
  'Mend',
  'Sneak',
];

export type Domain =
  | 'Cursed'
  | 'Desolate'
  | 'Haven'
  | 'Occult'
  | 'Religion'
  | 'Technology'
  | 'Warren'
  | 'Wild';
export const domains: Domain[] = [
  'Cursed',
  'Desolate',
  'Haven',
  'Occult',
  'Religion',
  'Technology',
  'Warren',
  'Wild',
];

export type ResourceValue = 'D4' | 'D6' | 'D8' | 'D10' | 'D12';
export interface Resource {
  id: string;
  name: string;
  value: ResourceValue;
  domain: Domain;
  tags?: string[];
}

export type EquipmentRank =
  | 'Unequipped – D4'
  | 'Civilian – D6'
  | 'Professional – D8'
  | 'Exotic – D10'
  | 'Legendary – D12';
export const equipmentRanks: EquipmentRank[] = [
  'Unequipped – D4',
  'Civilian – D6',
  'Professional – D8',
  'Exotic – D10',
  'Legendary – D12',
];

export type EquipmentQuality = 'Standard' | 'Good' | 'Excellent' | 'Renowned';
export const equipmentQualities: EquipmentQuality[] = [
  'Standard',
  'Good',
  'Excellent',
  'Renowned',
];

export type EquipmentType = 'Kill' | 'Delve' | 'Mend' | 'Miscellaneous';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rank?: EquipmentRank;
  tags?: string[];
  quality: EquipmentQuality;
}

export interface KillEquipment extends Equipment {
  type: 'Kill';
  rank: EquipmentRank;
}

export interface DelveEquipment extends Equipment {
  type: 'Delve';
  rank: EquipmentRank;
}

export interface MendEquipment extends Equipment {
  type: 'Mend';
  rank: EquipmentRank;
}

export type AbilityType = 'core' | 'minor' | 'major' | 'zenith';
export interface Ability {
  id: string;
  name: string;
  description: string;
  type: AbilityType;
}

export type BeatType = 'minor' | 'major' | 'zenith';
export interface Beat {
  id: string;
  description: string;
  type: BeatType;
}

export type Ancestry = 'Drow' | 'Aelfir' | 'Human' | 'Gnoll';
export const ancestries: Ancestry[] = ['Drow', 'Aelfir', 'Human', 'Gnoll'];

export type Class =
  | 'Cleaver'
  | 'Deadwalker'
  | 'Deep Apiarist'
  | 'Heretic'
  | 'Hound'
  | 'Incarnadine'
  | 'Junk Mage'
  | 'Vermissian Knight'
  | 'Witch';
export const classes: Class[] = [
  'Cleaver',
  'Deadwalker',
  'Deep Apiarist',
  'Heretic',
  'Hound',
  'Incarnadine',
  'Junk Mage',
  'Vermissian Knight',
  'Witch',
];

export type Calling =
  | 'Adventure'
  | 'Enlightenment'
  | 'Forced'
  | 'Heartsong'
  | 'Penitent';
export const callings: Calling[] = [
  'Adventure',
  'Enlightenment',
  'Forced',
  'Heartsong',
  'Penitent',
];

export type FalloutType = 'minor' | 'major' | 'critical';
export interface Fallout {
  id: string;
  resistance: Resistance;
  title: string;
  description: string;
  type: FalloutType;
}

export interface Bond {
  id: string;
  name: string;
  notes: string;
}
