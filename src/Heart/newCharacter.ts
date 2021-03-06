import { domainMap, skillMap } from './HeartGameTypes';

export const newCharacter = {
  characterName: '',
  characterPronouns: '',
  characterImageUrl: null,
  ancestry: '',
  calling: '',
  class: '',
  abilities: [],
  beats: [],
  fallout: [],
  bloodProtection: 0,
  bloodStress: 0,
  mindProtection: 0,
  mindStress: 0,
  echoProtection: 0,
  echoStress: 0,
  fortuneProtection: 0,
  fortuneStress: 0,
  supplyProtection: 0,
  supplyStress: 0,
  skills: JSON.stringify(skillMap),
  domains: JSON.stringify(domainMap),
  equipment: [],
  resources: [],
  bonds: [],
  notes: '',
};
