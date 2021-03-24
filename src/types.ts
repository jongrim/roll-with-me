export interface Die {
  id: string;
  sides: number;
  result?: number;
  name: string;
  type?: 'fudge';
}

export interface VisualDie extends Die {
  x: number;
  y: number;
  color: string;
  version: number;
  createdBy: string;
  type?: 'fudge';
}

export interface SavedDie {
  id: string;
  sides: number;
  name: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Roll {
  id: string;
  createdAt: string;
  rolledBy: string;
  modifier: number;
  sum: number; // modifier plus result of each dice
  dice: Die[];
  rollName: string;
  offline?: boolean; // indicates if roll is saved locally
}

export interface SavedRoll {
  id: string;
  dice: Die[];
  rollName: string;
  modifier: number;
  result?: number;
  updatedAt?: string;
  createdAt?: string;
  offline?: boolean;
}

export interface Counter {
  id: string;
  title: string;
  value: number;
}

export interface VisualCounter extends Counter {
  x: number;
  y: number;
  max?: number;
  type: 'CLOCK' | 'OTHER';
}

export interface VisualLabel {
  x: number;
  y: number;
  contents: string;
  id: string;
  roomId: string;
}

export interface SafetyModule {
  id: string;
  xCardActive: boolean;
  linesAndVeils: ClassifiedItem[];
}

export interface ClassifiedItem {
  id: string;
  label: string;
  classification: 'line' | 'veil' | 'ask' | 'consent';
  note: string;
}
