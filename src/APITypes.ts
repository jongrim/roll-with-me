import { GetTextRoomQuery } from './API';
import { SafetyModule, VisualCounter, VisualDie, VisualLabel } from './types';

export type TextRoomDetails = Omit<
  Exclude<GetTextRoomQuery['getTextRoom'], null>,
  '__typename'
>;

export type InteractiveRoomData = {
  createdAt: string;
  updatedAt: string;
  labels: {
    items: VisualLabel[];
  };
  counters: {
    items: VisualCounter[];
  };
  dice: {
    items: VisualDie[];
  };
  id: string;
  name: string;
  safetyModule: SafetyModule;
  backgroundImageUrl?: string;
};
