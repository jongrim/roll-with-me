import { v4 as uuidv4 } from 'uuid';

export interface CustomDie {
  id: string;
  name: string;
  sides: number;
}

export function createCustomDie({
  name,
  sides,
}: {
  name: string;
  sides: number;
}): CustomDie {
  return {
    id: uuidv4(),
    name,
    sides,
  };
}
