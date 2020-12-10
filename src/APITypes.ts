import { GetTextRoomQuery } from './API';

export type TextRoomDetails = Omit<Exclude<GetTextRoomQuery['getTextRoom'], null>, '__typename'>
