export interface Die {
  id: string;
  sides: number;
  result: number | undefined;
  name: string;
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
}
