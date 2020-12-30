export interface Die {
  id: string;
  sides: number;
  result?: number;
  name: string;
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
}

export interface SavedRoll {
  id: string;
  dice: Die[];
  rollName: string;
  modifier: number;
  result?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface Counter {
  id: string;
  title: string;
  value: number;
}
