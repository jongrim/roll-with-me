export type roomPathCodes = "i" | "r" | "trophy-dark" | "heart";

export interface roomCodesI {
  visual: "i";
  text: "r";
  trophyDark: "trophy-dark";
  heart: "heart";
}

export const roomCodes: roomCodesI = {
  visual: "i",
  text: "r",
  trophyDark: "trophy-dark",
  heart: "heart",
};

export type roomNamesType = "Text" | "Visual" | "Trophy Dark" | "Heart";

export interface roomNamesI {
  visual: "Visual";
  text: "Text";
  trophyDark: "Trophy Dark";
  heart: "Heart";
}

export const roomNames: roomNamesI = {
  text: "Text",
  visual: "Visual",
  trophyDark: "Trophy Dark",
  heart: "Heart",
};
