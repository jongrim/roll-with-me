import { GetTextRoomQuery } from './API';
import { SafetyModule, VisualDie } from './types';

export type TextRoomDetails = Omit<
  Exclude<GetTextRoomQuery['getTextRoom'], null>,
  '__typename'
>;

export type InteractiveRoomData = {
  counters: [];
  createdAt: string;
  updatedAt: string;
  dice: {
    items: VisualDie[];
  };
  id: string;
  name: string;
  safetyModule: SafetyModule;
};
