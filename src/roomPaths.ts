export type roomPathCodes = 'i' | 'r' | 'trophy-dark' | 'trophy-gold' | 'heart';

export interface roomCodesI {
  visual: 'i';
  text: 'r';
  trophyDark: 'trophy-dark';
  trophyGold: 'trophy-gold';
  heart: 'heart';
}

export const roomCodes: roomCodesI = {
  visual: 'i',
  text: 'r',
  trophyDark: 'trophy-dark',
  trophyGold: 'trophy-gold',
  heart: 'heart',
};

export type roomNamesType =
  | 'Text'
  | 'Visual'
  | 'Trophy Dark'
  | 'Heart'
  | 'Trophy Gold';

export interface roomNamesI {
  visual: 'Visual';
  text: 'Text';
  trophyDark: 'Trophy Dark';
  trophyGold: 'Trophy Gold';
  heart: 'Heart';
}

export const roomNames: roomNamesI = {
  text: 'Text',
  visual: 'Visual',
  trophyDark: 'Trophy Dark',
  trophyGold: 'Trophy Gold',
  heart: 'Heart',
};
