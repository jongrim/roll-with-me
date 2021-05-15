export interface RollableTableI {
  id: string;
  title: string;
  columns: RollableColumn[];
}

export interface RollableColumn {
  id: string;
  title?: string;
  items: RollableTableItem[];
}
export interface RollableTableItem {
  id: string;
  title: string;
}
