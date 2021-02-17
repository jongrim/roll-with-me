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

export interface Resource {
  name: string;
  value: 'D4' | 'D6' | 'D8' | 'D10' | 'D12';
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

export interface Equipment {
  name: string;
  type: 'Kill' | 'Delve' | 'Mend' | 'Miscellaneous';
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

export interface Ability {
  name: string;
  description: string;
  level: 'core' | 'minor' | 'major' | 'zenith';
}

export interface Beat {
  description: string;
  level: 'minor' | 'major' | 'zenith';
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

export interface Fallout {
  resistance: Resistance;
  title: string;
  description: string;
  level: 'minor' | 'major' | 'critical';
}

export interface Bond {
  name: string;
  bloodStress: number;
  mindStress: number;
  echoStress: number;
  fortuneStress: number;
  supplyStress: number;
}
