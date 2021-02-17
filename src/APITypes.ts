import {
  GetTextRoomQuery,
  GetTrophyDarkRoomQuery,
  GetTrophyDarkCharacterQuery,
  GetHeartRoomQuery,
  GetHeartCharacterQuery,
} from './API';
import { SafetyModule, VisualCounter, VisualDie, VisualLabel } from './types';

export type TextRoomDetails = Omit<
  Exclude<GetTextRoomQuery['getTextRoom'], null>,
  '__typename'
>;

export type TrophyDarkRoomDetails = Omit<
  Exclude<GetTrophyDarkRoomQuery['getTrophyDarkRoom'], null>,
  '__typename'
>;

export type TrophyDarkCharacter = GetTrophyDarkCharacterQuery['getTrophyDarkCharacter'];

export type HeartRoomDetails = Omit<
  Exclude<GetHeartRoomQuery['getHeartRoom'], null>,
  '__typename'
>;

export type HeartCharacter = GetHeartCharacterQuery['getHeartCharacter'];

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
