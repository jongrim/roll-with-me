/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTrophyDarkRoomInput = {
  id?: string | null,
  name: string,
  lightDice: Array< string >,
  darkDice: Array< string >,
  trophyDarkRoomSafetyModuleId: string,
};

export type ModelTrophyDarkRoomConditionInput = {
  name?: ModelStringInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkRoomConditionInput | null > | null,
  or?: Array< ModelTrophyDarkRoomConditionInput | null > | null,
  not?: ModelTrophyDarkRoomConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type TrophyDarkRoom = {
  __typename: "TrophyDarkRoom",
  id?: string,
  name?: string,
  lightDice?: Array< string >,
  darkDice?: Array< string >,
  characters?: ModelTrophyDarkCharacterConnection,
  createdAt?: string,
  updatedAt?: string,
  safetyModule?: SafetyModule,
};

export type ModelTrophyDarkCharacterConnection = {
  __typename: "ModelTrophyDarkCharacterConnection",
  items?:  Array<TrophyDarkCharacter | null > | null,
  nextToken?: string | null,
};

export type TrophyDarkCharacter = {
  __typename: "TrophyDarkCharacter",
  id?: string,
  gameID?: string,
  playerName?: string,
  characterName?: string,
  characterPronouns?: string,
  characterImageUrl?: string | null,
  ruin?: number,
  occupation?: string,
  background?: string,
  drive?: string,
  rituals?: Array< string >,
  createdAt?: string,
  updatedAt?: string,
};

export type SafetyModule = {
  __typename: "SafetyModule",
  id?: string,
  xCardActive?: boolean,
  linesAndVeils?: Array< string >,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateTrophyDarkRoomInput = {
  id: string,
  name?: string | null,
  lightDice?: Array< string > | null,
  darkDice?: Array< string > | null,
  trophyDarkRoomSafetyModuleId?: string | null,
};

export type DeleteTrophyDarkRoomInput = {
  id?: string | null,
};

export type CreateTrophyDarkCharacterInput = {
  id?: string | null,
  gameID: string,
  playerName: string,
  characterName: string,
  characterPronouns: string,
  characterImageUrl?: string | null,
  ruin: number,
  occupation: string,
  background: string,
  drive: string,
  rituals: Array< string >,
};

export type ModelTrophyDarkCharacterConditionInput = {
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ruin?: ModelIntInput | null,
  occupation?: ModelStringInput | null,
  background?: ModelStringInput | null,
  drive?: ModelStringInput | null,
  rituals?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkCharacterConditionInput | null > | null,
  or?: Array< ModelTrophyDarkCharacterConditionInput | null > | null,
  not?: ModelTrophyDarkCharacterConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTrophyDarkCharacterInput = {
  id: string,
  gameID?: string | null,
  playerName?: string | null,
  characterName?: string | null,
  characterPronouns?: string | null,
  characterImageUrl?: string | null,
  ruin?: number | null,
  occupation?: string | null,
  background?: string | null,
  drive?: string | null,
  rituals?: Array< string > | null,
};

export type DeleteTrophyDarkCharacterInput = {
  id?: string | null,
};

export type CreateTextRoomInput = {
  id?: string | null,
  name: string,
  rolls?: Array< string > | null,
  customDice?: Array< string > | null,
  counters?: Array< string > | null,
  textRoomSafetyModuleId: string,
};

export type ModelTextRoomConditionInput = {
  name?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  customDice?: ModelStringInput | null,
  counters?: ModelStringInput | null,
  and?: Array< ModelTextRoomConditionInput | null > | null,
  or?: Array< ModelTextRoomConditionInput | null > | null,
  not?: ModelTextRoomConditionInput | null,
};

export type TextRoom = {
  __typename: "TextRoom",
  id?: string,
  name?: string,
  rolls?: Array< string > | null,
  customDice?: Array< string > | null,
  counters?: Array< string > | null,
  createdAt?: string,
  updatedAt?: string,
  safetyModule?: SafetyModule,
};

export type UpdateTextRoomInput = {
  id: string,
  name?: string | null,
  rolls?: Array< string > | null,
  customDice?: Array< string > | null,
  counters?: Array< string > | null,
  textRoomSafetyModuleId?: string | null,
};

export type DeleteTextRoomInput = {
  id?: string | null,
};

export type CreateInteractiveRoomInput = {
  id?: string | null,
  name: string,
  backgroundImageUrl?: string | null,
  rolls?: Array< string > | null,
  interactiveRoomSafetyModuleId: string,
};

export type ModelInteractiveRoomConditionInput = {
  name?: ModelStringInput | null,
  backgroundImageUrl?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  and?: Array< ModelInteractiveRoomConditionInput | null > | null,
  or?: Array< ModelInteractiveRoomConditionInput | null > | null,
  not?: ModelInteractiveRoomConditionInput | null,
};

export type InteractiveRoom = {
  __typename: "InteractiveRoom",
  id?: string,
  name?: string,
  backgroundImageUrl?: string | null,
  rolls?: Array< string > | null,
  createdAt?: string,
  updatedAt?: string,
  safetyModule?: SafetyModule,
  labels?: ModelLabelConnection,
  counters?: ModelCounterConnection,
  dice?: ModelVisualDieConnection,
};

export type ModelLabelConnection = {
  __typename: "ModelLabelConnection",
  items?:  Array<Label | null > | null,
  nextToken?: string | null,
};

export type Label = {
  __typename: "Label",
  id?: string,
  roomId?: string,
  contents?: string,
  x?: number,
  y?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelCounterConnection = {
  __typename: "ModelCounterConnection",
  items?:  Array<Counter | null > | null,
  nextToken?: string | null,
};

export type Counter = {
  __typename: "Counter",
  id?: string,
  roomId?: string,
  title?: string,
  value?: number,
  max?: number | null,
  x?: number,
  y?: number,
  type?: CounterType,
  createdAt?: string,
  updatedAt?: string,
};

export enum CounterType {
  CLOCK = "CLOCK",
  OTHER = "OTHER",
}


export type ModelVisualDieConnection = {
  __typename: "ModelVisualDieConnection",
  items?:  Array<VisualDie | null > | null,
  nextToken?: string | null,
};

export type VisualDie = {
  __typename: "VisualDie",
  id?: string,
  roomId?: string,
  x?: number,
  y?: number,
  createdBy?: string,
  result?: number,
  sides?: number,
  color?: string,
  version?: number,
  type?: string | null,
  createdAt?: string,
  updatedAt?: string,
  room?: InteractiveRoom,
};

export type UpdateInteractiveRoomInput = {
  id: string,
  name?: string | null,
  backgroundImageUrl?: string | null,
  rolls?: Array< string > | null,
  interactiveRoomSafetyModuleId?: string | null,
};

export type DeleteInteractiveRoomInput = {
  id?: string | null,
};

export type CreateTrophyGoldRoomInput = {
  id?: string | null,
  name: string,
  bestiary: Array< string >,
  lightDice: Array< string >,
  darkDice: Array< string >,
  goldDice: Array< string >,
  diceMode: TrophyGoldDiceMode,
  trophyGoldRoomSafetyModuleId: string,
  trophyGoldRoomHexMapModuleId?: string | null,
};

export enum TrophyGoldDiceMode {
  risk = "risk",
  hunt = "hunt",
  combat = "combat",
  contest = "contest",
  gold = "gold",
}


export type ModelTrophyGoldRoomConditionInput = {
  name?: ModelStringInput | null,
  bestiary?: ModelStringInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  goldDice?: ModelStringInput | null,
  diceMode?: ModelTrophyGoldDiceModeInput | null,
  and?: Array< ModelTrophyGoldRoomConditionInput | null > | null,
  or?: Array< ModelTrophyGoldRoomConditionInput | null > | null,
  not?: ModelTrophyGoldRoomConditionInput | null,
};

export type ModelTrophyGoldDiceModeInput = {
  eq?: TrophyGoldDiceMode | null,
  ne?: TrophyGoldDiceMode | null,
};

export type TrophyGoldRoom = {
  __typename: "TrophyGoldRoom",
  id?: string,
  name?: string,
  bestiary?: Array< string >,
  lightDice?: Array< string >,
  darkDice?: Array< string >,
  goldDice?: Array< string >,
  diceMode?: TrophyGoldDiceMode,
  createdAt?: string,
  updatedAt?: string,
  characters?: ModelTrophyGoldCharacterConnection,
  safetyModule?: SafetyModule,
  hexMapModule?: HexMapModule,
};

export type ModelTrophyGoldCharacterConnection = {
  __typename: "ModelTrophyGoldCharacterConnection",
  items?:  Array<TrophyGoldCharacter | null > | null,
  nextToken?: string | null,
};

export type TrophyGoldCharacter = {
  __typename: "TrophyGoldCharacter",
  id?: string,
  gameID?: string,
  playerName?: string,
  characterName?: string | null,
  characterPronouns?: string | null,
  characterImageUrl?: string | null,
  ruin?: number,
  weakPoint?: number | null,
  lightDice?: Array< string > | null,
  darkDice?: Array< string > | null,
  occupation?: string | null,
  background?: string | null,
  drive?: string | null,
  rituals?: Array< string > | null,
  armorSet?: string,
  weaponSet?: string,
  foundEquipment?: Array< string > | null,
  burdens?: number,
  hoard?: number,
  gold?: number,
  tokens?: number,
  training?: Array< string > | null,
  household?: string | null,
  library?: Array< string > | null,
  backpack?: string,
  conditions?: string,
  notes?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type HexMapModule = {
  __typename: "HexMapModule",
  id?: string,
  gridConfiguration?: string,
  backgroundImages?: Array< string >,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateTrophyGoldRoomInput = {
  id: string,
  name?: string | null,
  bestiary?: Array< string > | null,
  lightDice?: Array< string > | null,
  darkDice?: Array< string > | null,
  goldDice?: Array< string > | null,
  diceMode?: TrophyGoldDiceMode | null,
  trophyGoldRoomSafetyModuleId?: string | null,
  trophyGoldRoomHexMapModuleId?: string | null,
};

export type DeleteTrophyGoldRoomInput = {
  id?: string | null,
};

export type CreateTrophyGoldCharacterInput = {
  id?: string | null,
  gameID: string,
  playerName: string,
  characterName?: string | null,
  characterPronouns?: string | null,
  characterImageUrl?: string | null,
  ruin: number,
  weakPoint?: number | null,
  lightDice?: Array< string > | null,
  darkDice?: Array< string > | null,
  occupation?: string | null,
  background?: string | null,
  drive?: string | null,
  rituals?: Array< string > | null,
  armorSet: string,
  weaponSet: string,
  foundEquipment?: Array< string > | null,
  burdens: number,
  hoard: number,
  gold: number,
  tokens: number,
  training?: Array< string > | null,
  household?: string | null,
  library?: Array< string > | null,
  backpack: string,
  conditions: string,
  notes: string,
};

export type ModelTrophyGoldCharacterConditionInput = {
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ruin?: ModelIntInput | null,
  weakPoint?: ModelIntInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  occupation?: ModelStringInput | null,
  background?: ModelStringInput | null,
  drive?: ModelStringInput | null,
  rituals?: ModelStringInput | null,
  armorSet?: ModelStringInput | null,
  weaponSet?: ModelStringInput | null,
  foundEquipment?: ModelStringInput | null,
  burdens?: ModelIntInput | null,
  hoard?: ModelIntInput | null,
  gold?: ModelIntInput | null,
  tokens?: ModelIntInput | null,
  training?: ModelStringInput | null,
  household?: ModelStringInput | null,
  library?: ModelStringInput | null,
  backpack?: ModelStringInput | null,
  conditions?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelTrophyGoldCharacterConditionInput | null > | null,
  or?: Array< ModelTrophyGoldCharacterConditionInput | null > | null,
  not?: ModelTrophyGoldCharacterConditionInput | null,
};

export type UpdateTrophyGoldCharacterInput = {
  id: string,
  gameID?: string | null,
  playerName?: string | null,
  characterName?: string | null,
  characterPronouns?: string | null,
  characterImageUrl?: string | null,
  ruin?: number | null,
  weakPoint?: number | null,
  lightDice?: Array< string > | null,
  darkDice?: Array< string > | null,
  occupation?: string | null,
  background?: string | null,
  drive?: string | null,
  rituals?: Array< string > | null,
  armorSet?: string | null,
  weaponSet?: string | null,
  foundEquipment?: Array< string > | null,
  burdens?: number | null,
  hoard?: number | null,
  gold?: number | null,
  tokens?: number | null,
  training?: Array< string > | null,
  household?: string | null,
  library?: Array< string > | null,
  backpack?: string | null,
  conditions?: string | null,
  notes?: string | null,
};

export type DeleteTrophyGoldCharacterInput = {
  id?: string | null,
};

export type CreateHeartRoomInput = {
  id?: string | null,
  name: string,
  d4Dice: Array< string >,
  d6Dice: Array< string >,
  d8Dice: Array< string >,
  d10Dice: Array< string >,
  d12Dice: Array< string >,
  heartRoomSafetyModuleId: string,
  heartRoomHexMapModuleId: string,
};

export type ModelHeartRoomConditionInput = {
  name?: ModelStringInput | null,
  d4Dice?: ModelStringInput | null,
  d6Dice?: ModelStringInput | null,
  d8Dice?: ModelStringInput | null,
  d10Dice?: ModelStringInput | null,
  d12Dice?: ModelStringInput | null,
  and?: Array< ModelHeartRoomConditionInput | null > | null,
  or?: Array< ModelHeartRoomConditionInput | null > | null,
  not?: ModelHeartRoomConditionInput | null,
};

export type HeartRoom = {
  __typename: "HeartRoom",
  id?: string,
  name?: string,
  d4Dice?: Array< string >,
  d6Dice?: Array< string >,
  d8Dice?: Array< string >,
  d10Dice?: Array< string >,
  d12Dice?: Array< string >,
  createdAt?: string,
  updatedAt?: string,
  characters?: ModelHeartCharacterConnection,
  safetyModule?: SafetyModule,
  hexMapModule?: HexMapModule,
};

export type ModelHeartCharacterConnection = {
  __typename: "ModelHeartCharacterConnection",
  items?:  Array<HeartCharacter | null > | null,
  nextToken?: string | null,
};

export type HeartCharacter = {
  __typename: "HeartCharacter",
  id?: string,
  gameID?: string,
  playerName?: string,
  characterName?: string,
  characterPronouns?: string,
  characterImageUrl?: string | null,
  ancestry?: string,
  calling?: string,
  class?: string,
  beats?: Array< string >,
  fallout?: Array< string >,
  bloodProtection?: number,
  bloodStress?: number,
  echoProtection?: number,
  echoStress?: number,
  fortuneProtection?: number,
  fortuneStress?: number,
  mindProtection?: number,
  mindStress?: number,
  supplyProtection?: number,
  supplyStress?: number,
  skills?: Array< string >,
  domains?: Array< string >,
  knacks?: Array< string >,
  abilities?: Array< string >,
  equipment?: Array< string >,
  resources?: Array< string >,
  bonds?: Array< string >,
  notes?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateHeartRoomInput = {
  id: string,
  name?: string | null,
  d4Dice?: Array< string > | null,
  d6Dice?: Array< string > | null,
  d8Dice?: Array< string > | null,
  d10Dice?: Array< string > | null,
  d12Dice?: Array< string > | null,
  heartRoomSafetyModuleId?: string | null,
  heartRoomHexMapModuleId?: string | null,
};

export type DeleteHeartRoomInput = {
  id?: string | null,
};

export type CreateHeartCharacterInput = {
  id?: string | null,
  gameID: string,
  playerName: string,
  characterName: string,
  characterPronouns: string,
  characterImageUrl?: string | null,
  ancestry: string,
  calling: string,
  class: string,
  beats: Array< string >,
  fallout: Array< string >,
  bloodProtection: number,
  bloodStress: number,
  echoProtection: number,
  echoStress: number,
  fortuneProtection: number,
  fortuneStress: number,
  mindProtection: number,
  mindStress: number,
  supplyProtection: number,
  supplyStress: number,
  skills: Array< string >,
  domains: Array< string >,
  knacks: Array< string >,
  abilities: Array< string >,
  equipment: Array< string >,
  resources: Array< string >,
  bonds: Array< string >,
  notes: string,
};

export type ModelHeartCharacterConditionInput = {
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ancestry?: ModelStringInput | null,
  calling?: ModelStringInput | null,
  class?: ModelStringInput | null,
  beats?: ModelStringInput | null,
  fallout?: ModelStringInput | null,
  bloodProtection?: ModelIntInput | null,
  bloodStress?: ModelIntInput | null,
  echoProtection?: ModelIntInput | null,
  echoStress?: ModelIntInput | null,
  fortuneProtection?: ModelIntInput | null,
  fortuneStress?: ModelIntInput | null,
  mindProtection?: ModelIntInput | null,
  mindStress?: ModelIntInput | null,
  supplyProtection?: ModelIntInput | null,
  supplyStress?: ModelIntInput | null,
  skills?: ModelStringInput | null,
  domains?: ModelStringInput | null,
  knacks?: ModelStringInput | null,
  abilities?: ModelStringInput | null,
  equipment?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  bonds?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelHeartCharacterConditionInput | null > | null,
  or?: Array< ModelHeartCharacterConditionInput | null > | null,
  not?: ModelHeartCharacterConditionInput | null,
};

export type UpdateHeartCharacterInput = {
  id: string,
  gameID?: string | null,
  playerName?: string | null,
  characterName?: string | null,
  characterPronouns?: string | null,
  characterImageUrl?: string | null,
  ancestry?: string | null,
  calling?: string | null,
  class?: string | null,
  beats?: Array< string > | null,
  fallout?: Array< string > | null,
  bloodProtection?: number | null,
  bloodStress?: number | null,
  echoProtection?: number | null,
  echoStress?: number | null,
  fortuneProtection?: number | null,
  fortuneStress?: number | null,
  mindProtection?: number | null,
  mindStress?: number | null,
  supplyProtection?: number | null,
  supplyStress?: number | null,
  skills?: Array< string > | null,
  domains?: Array< string > | null,
  knacks?: Array< string > | null,
  abilities?: Array< string > | null,
  equipment?: Array< string > | null,
  resources?: Array< string > | null,
  bonds?: Array< string > | null,
  notes?: string | null,
};

export type DeleteHeartCharacterInput = {
  id?: string | null,
};

export type CreateUserRoomInput = {
  id?: string | null,
  roomKey: string,
  description?: string | null,
  createdOn?: string | null,
  updatedOn?: string | null,
  defaultRoomUsername?: string | null,
  userRoomTextRoomId?: string | null,
  userRoomInteractiveRoomId?: string | null,
  userRoomTrophyDarkRoomId?: string | null,
};

export type ModelUserRoomConditionInput = {
  roomKey?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdOn?: ModelStringInput | null,
  updatedOn?: ModelStringInput | null,
  defaultRoomUsername?: ModelStringInput | null,
  and?: Array< ModelUserRoomConditionInput | null > | null,
  or?: Array< ModelUserRoomConditionInput | null > | null,
  not?: ModelUserRoomConditionInput | null,
};

export type UserRoom = {
  __typename: "UserRoom",
  id?: string,
  trophyDarkRoom?: TrophyDarkRoom,
  roomKey?: string,
  description?: string | null,
  createdOn?: string,
  updatedOn?: string,
  defaultRoomUsername?: string | null,
  textRoom?: TextRoom,
  interactiveRoom?: InteractiveRoom,
  owner?: string | null,
};

export type UpdateUserRoomInput = {
  id: string,
  roomKey?: string | null,
  description?: string | null,
  createdOn?: string | null,
  updatedOn?: string | null,
  defaultRoomUsername?: string | null,
  userRoomTextRoomId?: string | null,
  userRoomInteractiveRoomId?: string | null,
  userRoomTrophyDarkRoomId?: string | null,
};

export type DeleteUserRoomInput = {
  id?: string | null,
};

export type CreateSavedRollInput = {
  id?: string | null,
  rollName: string,
  dice: Array< string >,
  modifier: number,
};

export type ModelSavedRollConditionInput = {
  rollName?: ModelStringInput | null,
  dice?: ModelStringInput | null,
  modifier?: ModelIntInput | null,
  and?: Array< ModelSavedRollConditionInput | null > | null,
  or?: Array< ModelSavedRollConditionInput | null > | null,
  not?: ModelSavedRollConditionInput | null,
};

export type SavedRoll = {
  __typename: "SavedRoll",
  id?: string,
  rollName?: string,
  dice?: Array< string >,
  modifier?: number,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateSavedRollInput = {
  id: string,
  rollName?: string | null,
  dice?: Array< string > | null,
  modifier?: number | null,
};

export type DeleteSavedRollInput = {
  id?: string | null,
};

export type CreateSafetyItemInput = {
  id?: string | null,
  label: string,
  classification: SafetyClassification,
  note?: string | null,
};

export enum SafetyClassification {
  line = "line",
  veil = "veil",
  ask = "ask",
  consent = "consent",
}


export type ModelSafetyItemConditionInput = {
  label?: ModelStringInput | null,
  classification?: ModelSafetyClassificationInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelSafetyItemConditionInput | null > | null,
  or?: Array< ModelSafetyItemConditionInput | null > | null,
  not?: ModelSafetyItemConditionInput | null,
};

export type ModelSafetyClassificationInput = {
  eq?: SafetyClassification | null,
  ne?: SafetyClassification | null,
};

export type SafetyItem = {
  __typename: "SafetyItem",
  id?: string,
  label?: string,
  classification?: SafetyClassification,
  note?: string | null,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateSafetyItemInput = {
  id: string,
  label?: string | null,
  classification?: SafetyClassification | null,
  note?: string | null,
};

export type DeleteSafetyItemInput = {
  id?: string | null,
};

export type CreateSafetyModuleInput = {
  id?: string | null,
  xCardActive: boolean,
  linesAndVeils: Array< string >,
};

export type ModelSafetyModuleConditionInput = {
  xCardActive?: ModelBooleanInput | null,
  linesAndVeils?: ModelStringInput | null,
  and?: Array< ModelSafetyModuleConditionInput | null > | null,
  or?: Array< ModelSafetyModuleConditionInput | null > | null,
  not?: ModelSafetyModuleConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSafetyModuleInput = {
  id: string,
  xCardActive?: boolean | null,
  linesAndVeils?: Array< string > | null,
};

export type DeleteSafetyModuleInput = {
  id?: string | null,
};

export type CreateHexMapModuleInput = {
  id?: string | null,
  gridConfiguration: string,
  backgroundImages: Array< string >,
};

export type ModelHexMapModuleConditionInput = {
  gridConfiguration?: ModelStringInput | null,
  backgroundImages?: ModelStringInput | null,
  and?: Array< ModelHexMapModuleConditionInput | null > | null,
  or?: Array< ModelHexMapModuleConditionInput | null > | null,
  not?: ModelHexMapModuleConditionInput | null,
};

export type UpdateHexMapModuleInput = {
  id: string,
  gridConfiguration?: string | null,
  backgroundImages?: Array< string > | null,
};

export type DeleteHexMapModuleInput = {
  id?: string | null,
};

export type CreateLabelInput = {
  id?: string | null,
  roomId: string,
  contents: string,
  x: number,
  y: number,
};

export type ModelLabelConditionInput = {
  roomId?: ModelIDInput | null,
  contents?: ModelStringInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  and?: Array< ModelLabelConditionInput | null > | null,
  or?: Array< ModelLabelConditionInput | null > | null,
  not?: ModelLabelConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateLabelInput = {
  id: string,
  roomId?: string | null,
  contents?: string | null,
  x?: number | null,
  y?: number | null,
};

export type DeleteLabelInput = {
  id?: string | null,
};

export type CreateCounterInput = {
  id?: string | null,
  roomId: string,
  title: string,
  value: number,
  max?: number | null,
  x: number,
  y: number,
  type: CounterType,
};

export type ModelCounterConditionInput = {
  roomId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  value?: ModelIntInput | null,
  max?: ModelIntInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  type?: ModelCounterTypeInput | null,
  and?: Array< ModelCounterConditionInput | null > | null,
  or?: Array< ModelCounterConditionInput | null > | null,
  not?: ModelCounterConditionInput | null,
};

export type ModelCounterTypeInput = {
  eq?: CounterType | null,
  ne?: CounterType | null,
};

export type UpdateCounterInput = {
  id: string,
  roomId?: string | null,
  title?: string | null,
  value?: number | null,
  max?: number | null,
  x?: number | null,
  y?: number | null,
  type?: CounterType | null,
};

export type DeleteCounterInput = {
  id?: string | null,
};

export type CreateVisualDieInput = {
  id?: string | null,
  roomId: string,
  x: number,
  y: number,
  createdBy: string,
  result: number,
  sides: number,
  color: string,
  version: number,
  type?: string | null,
};

export type ModelVisualDieConditionInput = {
  roomId?: ModelIDInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  createdBy?: ModelStringInput | null,
  result?: ModelIntInput | null,
  sides?: ModelIntInput | null,
  color?: ModelStringInput | null,
  version?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelVisualDieConditionInput | null > | null,
  or?: Array< ModelVisualDieConditionInput | null > | null,
  not?: ModelVisualDieConditionInput | null,
};

export type UpdateVisualDieInput = {
  id: string,
  roomId?: string | null,
  x?: number | null,
  y?: number | null,
  createdBy?: string | null,
  result?: number | null,
  sides?: number | null,
  color?: string | null,
  version?: number | null,
  type?: string | null,
};

export type DeleteVisualDieInput = {
  id?: string | null,
};

export type ModelTrophyDarkRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkRoomFilterInput | null > | null,
  or?: Array< ModelTrophyDarkRoomFilterInput | null > | null,
  not?: ModelTrophyDarkRoomFilterInput | null,
};

export type ModelTrophyDarkRoomConnection = {
  __typename: "ModelTrophyDarkRoomConnection",
  items?:  Array<TrophyDarkRoom | null > | null,
  nextToken?: string | null,
};

export type ModelTrophyDarkCharacterFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ruin?: ModelIntInput | null,
  occupation?: ModelStringInput | null,
  background?: ModelStringInput | null,
  drive?: ModelStringInput | null,
  rituals?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkCharacterFilterInput | null > | null,
  or?: Array< ModelTrophyDarkCharacterFilterInput | null > | null,
  not?: ModelTrophyDarkCharacterFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTextRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  customDice?: ModelStringInput | null,
  counters?: ModelStringInput | null,
  and?: Array< ModelTextRoomFilterInput | null > | null,
  or?: Array< ModelTextRoomFilterInput | null > | null,
  not?: ModelTextRoomFilterInput | null,
};

export type ModelTextRoomConnection = {
  __typename: "ModelTextRoomConnection",
  items?:  Array<TextRoom | null > | null,
  nextToken?: string | null,
};

export type ModelInteractiveRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  backgroundImageUrl?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  and?: Array< ModelInteractiveRoomFilterInput | null > | null,
  or?: Array< ModelInteractiveRoomFilterInput | null > | null,
  not?: ModelInteractiveRoomFilterInput | null,
};

export type ModelInteractiveRoomConnection = {
  __typename: "ModelInteractiveRoomConnection",
  items?:  Array<InteractiveRoom | null > | null,
  nextToken?: string | null,
};

export type ModelTrophyGoldRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  bestiary?: ModelStringInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  goldDice?: ModelStringInput | null,
  diceMode?: ModelTrophyGoldDiceModeInput | null,
  and?: Array< ModelTrophyGoldRoomFilterInput | null > | null,
  or?: Array< ModelTrophyGoldRoomFilterInput | null > | null,
  not?: ModelTrophyGoldRoomFilterInput | null,
};

export type ModelTrophyGoldRoomConnection = {
  __typename: "ModelTrophyGoldRoomConnection",
  items?:  Array<TrophyGoldRoom | null > | null,
  nextToken?: string | null,
};

export type ModelTrophyGoldCharacterFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ruin?: ModelIntInput | null,
  weakPoint?: ModelIntInput | null,
  lightDice?: ModelStringInput | null,
  darkDice?: ModelStringInput | null,
  occupation?: ModelStringInput | null,
  background?: ModelStringInput | null,
  drive?: ModelStringInput | null,
  rituals?: ModelStringInput | null,
  armorSet?: ModelStringInput | null,
  weaponSet?: ModelStringInput | null,
  foundEquipment?: ModelStringInput | null,
  burdens?: ModelIntInput | null,
  hoard?: ModelIntInput | null,
  gold?: ModelIntInput | null,
  tokens?: ModelIntInput | null,
  training?: ModelStringInput | null,
  household?: ModelStringInput | null,
  library?: ModelStringInput | null,
  backpack?: ModelStringInput | null,
  conditions?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelTrophyGoldCharacterFilterInput | null > | null,
  or?: Array< ModelTrophyGoldCharacterFilterInput | null > | null,
  not?: ModelTrophyGoldCharacterFilterInput | null,
};

export type ModelHeartRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  d4Dice?: ModelStringInput | null,
  d6Dice?: ModelStringInput | null,
  d8Dice?: ModelStringInput | null,
  d10Dice?: ModelStringInput | null,
  d12Dice?: ModelStringInput | null,
  and?: Array< ModelHeartRoomFilterInput | null > | null,
  or?: Array< ModelHeartRoomFilterInput | null > | null,
  not?: ModelHeartRoomFilterInput | null,
};

export type ModelHeartRoomConnection = {
  __typename: "ModelHeartRoomConnection",
  items?:  Array<HeartRoom | null > | null,
  nextToken?: string | null,
};

export type ModelHeartCharacterFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  playerName?: ModelStringInput | null,
  characterName?: ModelStringInput | null,
  characterPronouns?: ModelStringInput | null,
  characterImageUrl?: ModelStringInput | null,
  ancestry?: ModelStringInput | null,
  calling?: ModelStringInput | null,
  class?: ModelStringInput | null,
  beats?: ModelStringInput | null,
  fallout?: ModelStringInput | null,
  bloodProtection?: ModelIntInput | null,
  bloodStress?: ModelIntInput | null,
  echoProtection?: ModelIntInput | null,
  echoStress?: ModelIntInput | null,
  fortuneProtection?: ModelIntInput | null,
  fortuneStress?: ModelIntInput | null,
  mindProtection?: ModelIntInput | null,
  mindStress?: ModelIntInput | null,
  supplyProtection?: ModelIntInput | null,
  supplyStress?: ModelIntInput | null,
  skills?: ModelStringInput | null,
  domains?: ModelStringInput | null,
  knacks?: ModelStringInput | null,
  abilities?: ModelStringInput | null,
  equipment?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  bonds?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  and?: Array< ModelHeartCharacterFilterInput | null > | null,
  or?: Array< ModelHeartCharacterFilterInput | null > | null,
  not?: ModelHeartCharacterFilterInput | null,
};

export type ModelUserRoomFilterInput = {
  id?: ModelIDInput | null,
  roomKey?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdOn?: ModelStringInput | null,
  updatedOn?: ModelStringInput | null,
  defaultRoomUsername?: ModelStringInput | null,
  and?: Array< ModelUserRoomFilterInput | null > | null,
  or?: Array< ModelUserRoomFilterInput | null > | null,
  not?: ModelUserRoomFilterInput | null,
};

export type ModelUserRoomConnection = {
  __typename: "ModelUserRoomConnection",
  items?:  Array<UserRoom | null > | null,
  nextToken?: string | null,
};

export type ModelSavedRollFilterInput = {
  id?: ModelIDInput | null,
  rollName?: ModelStringInput | null,
  dice?: ModelStringInput | null,
  modifier?: ModelIntInput | null,
  and?: Array< ModelSavedRollFilterInput | null > | null,
  or?: Array< ModelSavedRollFilterInput | null > | null,
  not?: ModelSavedRollFilterInput | null,
};

export type ModelSavedRollConnection = {
  __typename: "ModelSavedRollConnection",
  items?:  Array<SavedRoll | null > | null,
  nextToken?: string | null,
};

export type ModelSafetyItemFilterInput = {
  id?: ModelIDInput | null,
  label?: ModelStringInput | null,
  classification?: ModelSafetyClassificationInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelSafetyItemFilterInput | null > | null,
  or?: Array< ModelSafetyItemFilterInput | null > | null,
  not?: ModelSafetyItemFilterInput | null,
};

export type ModelSafetyItemConnection = {
  __typename: "ModelSafetyItemConnection",
  items?:  Array<SafetyItem | null > | null,
  nextToken?: string | null,
};

export type ModelSafetyModuleFilterInput = {
  id?: ModelIDInput | null,
  xCardActive?: ModelBooleanInput | null,
  linesAndVeils?: ModelStringInput | null,
  and?: Array< ModelSafetyModuleFilterInput | null > | null,
  or?: Array< ModelSafetyModuleFilterInput | null > | null,
  not?: ModelSafetyModuleFilterInput | null,
};

export type ModelSafetyModuleConnection = {
  __typename: "ModelSafetyModuleConnection",
  items?:  Array<SafetyModule | null > | null,
  nextToken?: string | null,
};

export type ModelHexMapModuleFilterInput = {
  id?: ModelIDInput | null,
  gridConfiguration?: ModelStringInput | null,
  backgroundImages?: ModelStringInput | null,
  and?: Array< ModelHexMapModuleFilterInput | null > | null,
  or?: Array< ModelHexMapModuleFilterInput | null > | null,
  not?: ModelHexMapModuleFilterInput | null,
};

export type ModelHexMapModuleConnection = {
  __typename: "ModelHexMapModuleConnection",
  items?:  Array<HexMapModule | null > | null,
  nextToken?: string | null,
};

export type ModelLabelFilterInput = {
  id?: ModelIDInput | null,
  roomId?: ModelIDInput | null,
  contents?: ModelStringInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  and?: Array< ModelLabelFilterInput | null > | null,
  or?: Array< ModelLabelFilterInput | null > | null,
  not?: ModelLabelFilterInput | null,
};

export type ModelCounterFilterInput = {
  id?: ModelIDInput | null,
  roomId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  value?: ModelIntInput | null,
  max?: ModelIntInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  type?: ModelCounterTypeInput | null,
  and?: Array< ModelCounterFilterInput | null > | null,
  or?: Array< ModelCounterFilterInput | null > | null,
  not?: ModelCounterFilterInput | null,
};

export type ModelVisualDieFilterInput = {
  id?: ModelIDInput | null,
  roomId?: ModelIDInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  createdBy?: ModelStringInput | null,
  result?: ModelIntInput | null,
  sides?: ModelIntInput | null,
  color?: ModelStringInput | null,
  version?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelVisualDieFilterInput | null > | null,
  or?: Array< ModelVisualDieFilterInput | null > | null,
  not?: ModelVisualDieFilterInput | null,
};

export type CreateTrophyDarkRoomMutationVariables = {
  input?: CreateTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type CreateTrophyDarkRoomMutation = {
  createTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateTrophyDarkRoomMutationVariables = {
  input?: UpdateTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type UpdateTrophyDarkRoomMutation = {
  updateTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteTrophyDarkRoomMutationVariables = {
  input?: DeleteTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type DeleteTrophyDarkRoomMutation = {
  deleteTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateTrophyDarkCharacterMutationVariables = {
  input?: CreateTrophyDarkCharacterInput,
  condition?: ModelTrophyDarkCharacterConditionInput | null,
};

export type CreateTrophyDarkCharacterMutation = {
  createTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrophyDarkCharacterMutationVariables = {
  input?: UpdateTrophyDarkCharacterInput,
  condition?: ModelTrophyDarkCharacterConditionInput | null,
};

export type UpdateTrophyDarkCharacterMutation = {
  updateTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrophyDarkCharacterMutationVariables = {
  input?: DeleteTrophyDarkCharacterInput,
  condition?: ModelTrophyDarkCharacterConditionInput | null,
};

export type DeleteTrophyDarkCharacterMutation = {
  deleteTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTextRoomMutationVariables = {
  input?: CreateTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type CreateTextRoomMutation = {
  createTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateTextRoomMutationVariables = {
  input?: UpdateTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type UpdateTextRoomMutation = {
  updateTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteTextRoomMutationVariables = {
  input?: DeleteTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type DeleteTextRoomMutation = {
  deleteTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateInteractiveRoomMutationVariables = {
  input?: CreateInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type CreateInteractiveRoomMutation = {
  createInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateInteractiveRoomMutationVariables = {
  input?: UpdateInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type UpdateInteractiveRoomMutation = {
  updateInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteInteractiveRoomMutationVariables = {
  input?: DeleteInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type DeleteInteractiveRoomMutation = {
  deleteInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateTrophyGoldRoomMutationVariables = {
  input?: CreateTrophyGoldRoomInput,
  condition?: ModelTrophyGoldRoomConditionInput | null,
};

export type CreateTrophyGoldRoomMutation = {
  createTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateTrophyGoldRoomMutationVariables = {
  input?: UpdateTrophyGoldRoomInput,
  condition?: ModelTrophyGoldRoomConditionInput | null,
};

export type UpdateTrophyGoldRoomMutation = {
  updateTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteTrophyGoldRoomMutationVariables = {
  input?: DeleteTrophyGoldRoomInput,
  condition?: ModelTrophyGoldRoomConditionInput | null,
};

export type DeleteTrophyGoldRoomMutation = {
  deleteTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateTrophyGoldCharacterMutationVariables = {
  input?: CreateTrophyGoldCharacterInput,
  condition?: ModelTrophyGoldCharacterConditionInput | null,
};

export type CreateTrophyGoldCharacterMutation = {
  createTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrophyGoldCharacterMutationVariables = {
  input?: UpdateTrophyGoldCharacterInput,
  condition?: ModelTrophyGoldCharacterConditionInput | null,
};

export type UpdateTrophyGoldCharacterMutation = {
  updateTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrophyGoldCharacterMutationVariables = {
  input?: DeleteTrophyGoldCharacterInput,
  condition?: ModelTrophyGoldCharacterConditionInput | null,
};

export type DeleteTrophyGoldCharacterMutation = {
  deleteTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHeartRoomMutationVariables = {
  input?: CreateHeartRoomInput,
  condition?: ModelHeartRoomConditionInput | null,
};

export type CreateHeartRoomMutation = {
  createHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateHeartRoomMutationVariables = {
  input?: UpdateHeartRoomInput,
  condition?: ModelHeartRoomConditionInput | null,
};

export type UpdateHeartRoomMutation = {
  updateHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteHeartRoomMutationVariables = {
  input?: DeleteHeartRoomInput,
  condition?: ModelHeartRoomConditionInput | null,
};

export type DeleteHeartRoomMutation = {
  deleteHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateHeartCharacterMutationVariables = {
  input?: CreateHeartCharacterInput,
  condition?: ModelHeartCharacterConditionInput | null,
};

export type CreateHeartCharacterMutation = {
  createHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHeartCharacterMutationVariables = {
  input?: UpdateHeartCharacterInput,
  condition?: ModelHeartCharacterConditionInput | null,
};

export type UpdateHeartCharacterMutation = {
  updateHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHeartCharacterMutationVariables = {
  input?: DeleteHeartCharacterInput,
  condition?: ModelHeartCharacterConditionInput | null,
};

export type DeleteHeartCharacterMutation = {
  deleteHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserRoomMutationVariables = {
  input?: CreateUserRoomInput,
  condition?: ModelUserRoomConditionInput | null,
};

export type CreateUserRoomMutation = {
  createUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type UpdateUserRoomMutationVariables = {
  input?: UpdateUserRoomInput,
  condition?: ModelUserRoomConditionInput | null,
};

export type UpdateUserRoomMutation = {
  updateUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type DeleteUserRoomMutationVariables = {
  input?: DeleteUserRoomInput,
  condition?: ModelUserRoomConditionInput | null,
};

export type DeleteUserRoomMutation = {
  deleteUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type CreateSavedRollMutationVariables = {
  input?: CreateSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type CreateSavedRollMutation = {
  createSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSavedRollMutationVariables = {
  input?: UpdateSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type UpdateSavedRollMutation = {
  updateSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSavedRollMutationVariables = {
  input?: DeleteSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type DeleteSavedRollMutation = {
  deleteSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSafetyItemMutationVariables = {
  input?: CreateSafetyItemInput,
  condition?: ModelSafetyItemConditionInput | null,
};

export type CreateSafetyItemMutation = {
  createSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSafetyItemMutationVariables = {
  input?: UpdateSafetyItemInput,
  condition?: ModelSafetyItemConditionInput | null,
};

export type UpdateSafetyItemMutation = {
  updateSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSafetyItemMutationVariables = {
  input?: DeleteSafetyItemInput,
  condition?: ModelSafetyItemConditionInput | null,
};

export type DeleteSafetyItemMutation = {
  deleteSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSafetyModuleMutationVariables = {
  input?: CreateSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type CreateSafetyModuleMutation = {
  createSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSafetyModuleMutationVariables = {
  input?: UpdateSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type UpdateSafetyModuleMutation = {
  updateSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSafetyModuleMutationVariables = {
  input?: DeleteSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type DeleteSafetyModuleMutation = {
  deleteSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHexMapModuleMutationVariables = {
  input?: CreateHexMapModuleInput,
  condition?: ModelHexMapModuleConditionInput | null,
};

export type CreateHexMapModuleMutation = {
  createHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHexMapModuleMutationVariables = {
  input?: UpdateHexMapModuleInput,
  condition?: ModelHexMapModuleConditionInput | null,
};

export type UpdateHexMapModuleMutation = {
  updateHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHexMapModuleMutationVariables = {
  input?: DeleteHexMapModuleInput,
  condition?: ModelHexMapModuleConditionInput | null,
};

export type DeleteHexMapModuleMutation = {
  deleteHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLabelMutationVariables = {
  input?: CreateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type CreateLabelMutation = {
  createLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLabelMutationVariables = {
  input?: UpdateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type UpdateLabelMutation = {
  updateLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLabelMutationVariables = {
  input?: DeleteLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type DeleteLabelMutation = {
  deleteLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCounterMutationVariables = {
  input?: CreateCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type CreateCounterMutation = {
  createCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCounterMutationVariables = {
  input?: UpdateCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type UpdateCounterMutation = {
  updateCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCounterMutationVariables = {
  input?: DeleteCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type DeleteCounterMutation = {
  deleteCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVisualDieMutationVariables = {
  input?: CreateVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type CreateVisualDieMutation = {
  createVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateVisualDieMutationVariables = {
  input?: UpdateVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type UpdateVisualDieMutation = {
  updateVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteVisualDieMutationVariables = {
  input?: DeleteVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type DeleteVisualDieMutation = {
  deleteVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetTrophyDarkRoomQueryVariables = {
  id?: string,
};

export type GetTrophyDarkRoomQuery = {
  getTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListTrophyDarkRoomsQueryVariables = {
  filter?: ModelTrophyDarkRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrophyDarkRoomsQuery = {
  listTrophyDarkRooms?:  {
    __typename: "ModelTrophyDarkRoomConnection",
    items?:  Array< {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrophyDarkCharacterQueryVariables = {
  id?: string,
};

export type GetTrophyDarkCharacterQuery = {
  getTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrophyDarkCharactersQueryVariables = {
  filter?: ModelTrophyDarkCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrophyDarkCharactersQuery = {
  listTrophyDarkCharacters?:  {
    __typename: "ModelTrophyDarkCharacterConnection",
    items?:  Array< {
      __typename: "TrophyDarkCharacter",
      id: string,
      gameID: string,
      playerName: string,
      characterName: string,
      characterPronouns: string,
      characterImageUrl?: string | null,
      ruin: number,
      occupation: string,
      background: string,
      drive: string,
      rituals: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type TrophyDarkRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTrophyDarkRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TrophyDarkRoomByNameQuery = {
  trophyDarkRoomByName?:  {
    __typename: "ModelTrophyDarkRoomConnection",
    items?:  Array< {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTextRoomsQueryVariables = {
  filter?: ModelTextRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTextRoomsQuery = {
  listTextRooms?:  {
    __typename: "ModelTextRoomConnection",
    items?:  Array< {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTextRoomQueryVariables = {
  id?: string,
};

export type GetTextRoomQuery = {
  getTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type TextRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTextRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TextRoomByNameQuery = {
  textRoomByName?:  {
    __typename: "ModelTextRoomConnection",
    items?:  Array< {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListInteractiveRoomsQueryVariables = {
  filter?: ModelInteractiveRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInteractiveRoomsQuery = {
  listInteractiveRooms?:  {
    __typename: "ModelInteractiveRoomConnection",
    items?:  Array< {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetInteractiveRoomQueryVariables = {
  id?: string,
};

export type GetInteractiveRoomQuery = {
  getInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type InteractiveRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInteractiveRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InteractiveRoomByNameQuery = {
  interactiveRoomByName?:  {
    __typename: "ModelInteractiveRoomConnection",
    items?:  Array< {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrophyGoldRoomQueryVariables = {
  id?: string,
};

export type GetTrophyGoldRoomQuery = {
  getTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListTrophyGoldRoomsQueryVariables = {
  filter?: ModelTrophyGoldRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrophyGoldRoomsQuery = {
  listTrophyGoldRooms?:  {
    __typename: "ModelTrophyGoldRoomConnection",
    items?:  Array< {
      __typename: "TrophyGoldRoom",
      id: string,
      name: string,
      bestiary: Array< string >,
      lightDice: Array< string >,
      darkDice: Array< string >,
      goldDice: Array< string >,
      diceMode: TrophyGoldDiceMode,
      createdAt: string,
      updatedAt: string,
      characters?:  {
        __typename: "ModelTrophyGoldCharacterConnection",
        items?:  Array< {
          __typename: "TrophyGoldCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName?: string | null,
          characterPronouns?: string | null,
          characterImageUrl?: string | null,
          ruin: number,
          weakPoint?: number | null,
          lightDice?: Array< string > | null,
          darkDice?: Array< string > | null,
          occupation?: string | null,
          background?: string | null,
          drive?: string | null,
          rituals?: Array< string > | null,
          armorSet: string,
          weaponSet: string,
          foundEquipment?: Array< string > | null,
          burdens: number,
          hoard: number,
          gold: number,
          tokens: number,
          training?: Array< string > | null,
          household?: string | null,
          library?: Array< string > | null,
          backpack: string,
          conditions: string,
          notes: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      hexMapModule?:  {
        __typename: "HexMapModule",
        id: string,
        gridConfiguration: string,
        backgroundImages: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type TrophyGoldRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTrophyGoldRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TrophyGoldRoomByNameQuery = {
  trophyGoldRoomByName?:  {
    __typename: "ModelTrophyGoldRoomConnection",
    items?:  Array< {
      __typename: "TrophyGoldRoom",
      id: string,
      name: string,
      bestiary: Array< string >,
      lightDice: Array< string >,
      darkDice: Array< string >,
      goldDice: Array< string >,
      diceMode: TrophyGoldDiceMode,
      createdAt: string,
      updatedAt: string,
      characters?:  {
        __typename: "ModelTrophyGoldCharacterConnection",
        items?:  Array< {
          __typename: "TrophyGoldCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName?: string | null,
          characterPronouns?: string | null,
          characterImageUrl?: string | null,
          ruin: number,
          weakPoint?: number | null,
          lightDice?: Array< string > | null,
          darkDice?: Array< string > | null,
          occupation?: string | null,
          background?: string | null,
          drive?: string | null,
          rituals?: Array< string > | null,
          armorSet: string,
          weaponSet: string,
          foundEquipment?: Array< string > | null,
          burdens: number,
          hoard: number,
          gold: number,
          tokens: number,
          training?: Array< string > | null,
          household?: string | null,
          library?: Array< string > | null,
          backpack: string,
          conditions: string,
          notes: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      hexMapModule?:  {
        __typename: "HexMapModule",
        id: string,
        gridConfiguration: string,
        backgroundImages: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrophyGoldCharacterQueryVariables = {
  id?: string,
};

export type GetTrophyGoldCharacterQuery = {
  getTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrophyGoldCharactersQueryVariables = {
  filter?: ModelTrophyGoldCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrophyGoldCharactersQuery = {
  listTrophyGoldCharacters?:  {
    __typename: "ModelTrophyGoldCharacterConnection",
    items?:  Array< {
      __typename: "TrophyGoldCharacter",
      id: string,
      gameID: string,
      playerName: string,
      characterName?: string | null,
      characterPronouns?: string | null,
      characterImageUrl?: string | null,
      ruin: number,
      weakPoint?: number | null,
      lightDice?: Array< string > | null,
      darkDice?: Array< string > | null,
      occupation?: string | null,
      background?: string | null,
      drive?: string | null,
      rituals?: Array< string > | null,
      armorSet: string,
      weaponSet: string,
      foundEquipment?: Array< string > | null,
      burdens: number,
      hoard: number,
      gold: number,
      tokens: number,
      training?: Array< string > | null,
      household?: string | null,
      library?: Array< string > | null,
      backpack: string,
      conditions: string,
      notes: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetHeartRoomQueryVariables = {
  id?: string,
};

export type GetHeartRoomQuery = {
  getHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListHeartRoomsQueryVariables = {
  filter?: ModelHeartRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHeartRoomsQuery = {
  listHeartRooms?:  {
    __typename: "ModelHeartRoomConnection",
    items?:  Array< {
      __typename: "HeartRoom",
      id: string,
      name: string,
      d4Dice: Array< string >,
      d6Dice: Array< string >,
      d8Dice: Array< string >,
      d10Dice: Array< string >,
      d12Dice: Array< string >,
      createdAt: string,
      updatedAt: string,
      characters?:  {
        __typename: "ModelHeartCharacterConnection",
        items?:  Array< {
          __typename: "HeartCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ancestry: string,
          calling: string,
          class: string,
          beats: Array< string >,
          fallout: Array< string >,
          bloodProtection: number,
          bloodStress: number,
          echoProtection: number,
          echoStress: number,
          fortuneProtection: number,
          fortuneStress: number,
          mindProtection: number,
          mindStress: number,
          supplyProtection: number,
          supplyStress: number,
          skills: Array< string >,
          domains: Array< string >,
          knacks: Array< string >,
          abilities: Array< string >,
          equipment: Array< string >,
          resources: Array< string >,
          bonds: Array< string >,
          notes: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      hexMapModule:  {
        __typename: "HexMapModule",
        id: string,
        gridConfiguration: string,
        backgroundImages: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type HeartRoomByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHeartRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HeartRoomByNameQuery = {
  heartRoomByName?:  {
    __typename: "ModelHeartRoomConnection",
    items?:  Array< {
      __typename: "HeartRoom",
      id: string,
      name: string,
      d4Dice: Array< string >,
      d6Dice: Array< string >,
      d8Dice: Array< string >,
      d10Dice: Array< string >,
      d12Dice: Array< string >,
      createdAt: string,
      updatedAt: string,
      characters?:  {
        __typename: "ModelHeartCharacterConnection",
        items?:  Array< {
          __typename: "HeartCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ancestry: string,
          calling: string,
          class: string,
          beats: Array< string >,
          fallout: Array< string >,
          bloodProtection: number,
          bloodStress: number,
          echoProtection: number,
          echoStress: number,
          fortuneProtection: number,
          fortuneStress: number,
          mindProtection: number,
          mindStress: number,
          supplyProtection: number,
          supplyStress: number,
          skills: Array< string >,
          domains: Array< string >,
          knacks: Array< string >,
          abilities: Array< string >,
          equipment: Array< string >,
          resources: Array< string >,
          bonds: Array< string >,
          notes: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      hexMapModule:  {
        __typename: "HexMapModule",
        id: string,
        gridConfiguration: string,
        backgroundImages: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetHeartCharacterQueryVariables = {
  id?: string,
};

export type GetHeartCharacterQuery = {
  getHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHeartCharactersQueryVariables = {
  filter?: ModelHeartCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHeartCharactersQuery = {
  listHeartCharacters?:  {
    __typename: "ModelHeartCharacterConnection",
    items?:  Array< {
      __typename: "HeartCharacter",
      id: string,
      gameID: string,
      playerName: string,
      characterName: string,
      characterPronouns: string,
      characterImageUrl?: string | null,
      ancestry: string,
      calling: string,
      class: string,
      beats: Array< string >,
      fallout: Array< string >,
      bloodProtection: number,
      bloodStress: number,
      echoProtection: number,
      echoStress: number,
      fortuneProtection: number,
      fortuneStress: number,
      mindProtection: number,
      mindStress: number,
      supplyProtection: number,
      supplyStress: number,
      skills: Array< string >,
      domains: Array< string >,
      knacks: Array< string >,
      abilities: Array< string >,
      equipment: Array< string >,
      resources: Array< string >,
      bonds: Array< string >,
      notes: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserRoomQueryVariables = {
  id?: string,
};

export type GetUserRoomQuery = {
  getUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type ListUserRoomsQueryVariables = {
  filter?: ModelUserRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserRoomsQuery = {
  listUserRooms?:  {
    __typename: "ModelUserRoomConnection",
    items?:  Array< {
      __typename: "UserRoom",
      id: string,
      trophyDarkRoom?:  {
        __typename: "TrophyDarkRoom",
        id: string,
        name: string,
        lightDice: Array< string >,
        darkDice: Array< string >,
        characters?:  {
          __typename: "ModelTrophyDarkCharacterConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        safetyModule:  {
          __typename: "SafetyModule",
          id: string,
          xCardActive: boolean,
          linesAndVeils: Array< string >,
          createdAt: string,
          updatedAt: string,
        },
      } | null,
      roomKey: string,
      description?: string | null,
      createdOn: string,
      updatedOn: string,
      defaultRoomUsername?: string | null,
      textRoom?:  {
        __typename: "TextRoom",
        id: string,
        name: string,
        rolls?: Array< string > | null,
        customDice?: Array< string > | null,
        counters?: Array< string > | null,
        createdAt: string,
        updatedAt: string,
        safetyModule:  {
          __typename: "SafetyModule",
          id: string,
          xCardActive: boolean,
          linesAndVeils: Array< string >,
          createdAt: string,
          updatedAt: string,
        },
      } | null,
      interactiveRoom?:  {
        __typename: "InteractiveRoom",
        id: string,
        name: string,
        backgroundImageUrl?: string | null,
        rolls?: Array< string > | null,
        createdAt: string,
        updatedAt: string,
        safetyModule:  {
          __typename: "SafetyModule",
          id: string,
          xCardActive: boolean,
          linesAndVeils: Array< string >,
          createdAt: string,
          updatedAt: string,
        },
        labels?:  {
          __typename: "ModelLabelConnection",
          nextToken?: string | null,
        } | null,
        counters?:  {
          __typename: "ModelCounterConnection",
          nextToken?: string | null,
        } | null,
        dice?:  {
          __typename: "ModelVisualDieConnection",
          nextToken?: string | null,
        } | null,
      } | null,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSavedRollQueryVariables = {
  id?: string,
};

export type GetSavedRollQuery = {
  getSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSavedRollsQueryVariables = {
  filter?: ModelSavedRollFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSavedRollsQuery = {
  listSavedRolls?:  {
    __typename: "ModelSavedRollConnection",
    items?:  Array< {
      __typename: "SavedRoll",
      id: string,
      rollName: string,
      dice: Array< string >,
      modifier: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSafetyItemQueryVariables = {
  id?: string,
};

export type GetSafetyItemQuery = {
  getSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSafetyItemsQueryVariables = {
  filter?: ModelSafetyItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSafetyItemsQuery = {
  listSafetyItems?:  {
    __typename: "ModelSafetyItemConnection",
    items?:  Array< {
      __typename: "SafetyItem",
      id: string,
      label: string,
      classification: SafetyClassification,
      note?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListSafetyModulesQueryVariables = {
  filter?: ModelSafetyModuleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSafetyModulesQuery = {
  listSafetyModules?:  {
    __typename: "ModelSafetyModuleConnection",
    items?:  Array< {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSafetyModuleQueryVariables = {
  id?: string,
};

export type GetSafetyModuleQuery = {
  getSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHexMapModulesQueryVariables = {
  filter?: ModelHexMapModuleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHexMapModulesQuery = {
  listHexMapModules?:  {
    __typename: "ModelHexMapModuleConnection",
    items?:  Array< {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetHexMapModuleQueryVariables = {
  id?: string,
};

export type GetHexMapModuleQuery = {
  getHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLabelQueryVariables = {
  id?: string,
};

export type GetLabelQuery = {
  getLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLabelsQueryVariables = {
  filter?: ModelLabelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLabelsQuery = {
  listLabels?:  {
    __typename: "ModelLabelConnection",
    items?:  Array< {
      __typename: "Label",
      id: string,
      roomId: string,
      contents: string,
      x: number,
      y: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCounterQueryVariables = {
  id?: string,
};

export type GetCounterQuery = {
  getCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCountersQueryVariables = {
  filter?: ModelCounterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCountersQuery = {
  listCounters?:  {
    __typename: "ModelCounterConnection",
    items?:  Array< {
      __typename: "Counter",
      id: string,
      roomId: string,
      title: string,
      value: number,
      max?: number | null,
      x: number,
      y: number,
      type: CounterType,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetVisualDieQueryVariables = {
  id?: string,
};

export type GetVisualDieQuery = {
  getVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListVisualDiesQueryVariables = {
  filter?: ModelVisualDieFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVisualDiesQuery = {
  listVisualDies?:  {
    __typename: "ModelVisualDieConnection",
    items?:  Array< {
      __typename: "VisualDie",
      id: string,
      roomId: string,
      x: number,
      y: number,
      createdBy: string,
      result: number,
      sides: number,
      color: string,
      version: number,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      room?:  {
        __typename: "InteractiveRoom",
        id: string,
        name: string,
        backgroundImageUrl?: string | null,
        rolls?: Array< string > | null,
        createdAt: string,
        updatedAt: string,
        safetyModule:  {
          __typename: "SafetyModule",
          id: string,
          xCardActive: boolean,
          linesAndVeils: Array< string >,
          createdAt: string,
          updatedAt: string,
        },
        labels?:  {
          __typename: "ModelLabelConnection",
          nextToken?: string | null,
        } | null,
        counters?:  {
          __typename: "ModelCounterConnection",
          nextToken?: string | null,
        } | null,
        dice?:  {
          __typename: "ModelVisualDieConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateTextRoomByNameSubscriptionVariables = {
  name?: string,
};

export type OnUpdateTextRoomByNameSubscription = {
  onUpdateTextRoomByName?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateVisualDieByRoomSubscriptionVariables = {
  roomId?: string,
};

export type OnCreateVisualDieByRoomSubscription = {
  onCreateVisualDieByRoom?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateInteractiveRoomByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateInteractiveRoomByIdSubscription = {
  onUpdateInteractiveRoomById?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateVisualDieByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateVisualDieByIdSubscription = {
  onUpdateVisualDieById?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateCounterByRoomSubscriptionVariables = {
  roomId?: string,
};

export type OnCreateCounterByRoomSubscription = {
  onCreateCounterByRoom?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCounterByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateCounterByIdSubscription = {
  onUpdateCounterById?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLabelByRoomSubscriptionVariables = {
  roomId?: string,
};

export type OnCreateLabelByRoomSubscription = {
  onCreateLabelByRoom?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLabelByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateLabelByIdSubscription = {
  onUpdateLabelById?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrophyDarkCharacterByGameSubscriptionVariables = {
  gameID?: string,
};

export type OnCreateTrophyDarkCharacterByGameSubscription = {
  onCreateTrophyDarkCharacterByGame?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyDarkCharacterByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateTrophyDarkCharacterByIdSubscription = {
  onUpdateTrophyDarkCharacterById?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrophyGoldCharacterByGameSubscriptionVariables = {
  gameID?: string,
};

export type OnCreateTrophyGoldCharacterByGameSubscription = {
  onCreateTrophyGoldCharacterByGame?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyGoldCharacterByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateTrophyGoldCharacterByIdSubscription = {
  onUpdateTrophyGoldCharacterById?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHeartCharacterByGameSubscriptionVariables = {
  gameID?: string,
};

export type OnCreateHeartCharacterByGameSubscription = {
  onCreateHeartCharacterByGame?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHeartCharacterByIdSubscriptionVariables = {
  id?: string,
};

export type OnUpdateHeartCharacterByIdSubscription = {
  onUpdateHeartCharacterById?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrophyDarkRoomSubscription = {
  onCreateTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateTrophyDarkRoomSubscription = {
  onUpdateTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteTrophyDarkRoomSubscription = {
  onDeleteTrophyDarkRoom?:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    lightDice: Array< string >,
    darkDice: Array< string >,
    characters?:  {
      __typename: "ModelTrophyDarkCharacterConnection",
      items?:  Array< {
        __typename: "TrophyDarkCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ruin: number,
        occupation: string,
        background: string,
        drive: string,
        rituals: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateTrophyDarkCharacterSubscription = {
  onCreateTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyDarkCharacterSubscription = {
  onUpdateTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrophyDarkCharacterSubscription = {
  onDeleteTrophyDarkCharacter?:  {
    __typename: "TrophyDarkCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ruin: number,
    occupation: string,
    background: string,
    drive: string,
    rituals: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTextRoomSubscription = {
  onCreateTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateTextRoomSubscription = {
  onUpdateTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteTextRoomSubscription = {
  onDeleteTextRoom?:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls?: Array< string > | null,
    customDice?: Array< string > | null,
    counters?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateInteractiveRoomSubscription = {
  onCreateInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateInteractiveRoomSubscription = {
  onUpdateInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteInteractiveRoomSubscription = {
  onDeleteInteractiveRoom?:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    backgroundImageUrl?: string | null,
    rolls?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    labels?:  {
      __typename: "ModelLabelConnection",
      items?:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    counters?:  {
      __typename: "ModelCounterConnection",
      items?:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max?: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    dice?:  {
      __typename: "ModelVisualDieConnection",
      items?:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
        room?:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          backgroundImageUrl?: string | null,
          rolls?: Array< string > | null,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateTrophyGoldRoomSubscription = {
  onCreateTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateTrophyGoldRoomSubscription = {
  onUpdateTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteTrophyGoldRoomSubscription = {
  onDeleteTrophyGoldRoom?:  {
    __typename: "TrophyGoldRoom",
    id: string,
    name: string,
    bestiary: Array< string >,
    lightDice: Array< string >,
    darkDice: Array< string >,
    goldDice: Array< string >,
    diceMode: TrophyGoldDiceMode,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelTrophyGoldCharacterConnection",
      items?:  Array< {
        __typename: "TrophyGoldCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName?: string | null,
        characterPronouns?: string | null,
        characterImageUrl?: string | null,
        ruin: number,
        weakPoint?: number | null,
        lightDice?: Array< string > | null,
        darkDice?: Array< string > | null,
        occupation?: string | null,
        background?: string | null,
        drive?: string | null,
        rituals?: Array< string > | null,
        armorSet: string,
        weaponSet: string,
        foundEquipment?: Array< string > | null,
        burdens: number,
        hoard: number,
        gold: number,
        tokens: number,
        training?: Array< string > | null,
        household?: string | null,
        library?: Array< string > | null,
        backpack: string,
        conditions: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule?:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateTrophyGoldCharacterSubscription = {
  onCreateTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyGoldCharacterSubscription = {
  onUpdateTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrophyGoldCharacterSubscription = {
  onDeleteTrophyGoldCharacter?:  {
    __typename: "TrophyGoldCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName?: string | null,
    characterPronouns?: string | null,
    characterImageUrl?: string | null,
    ruin: number,
    weakPoint?: number | null,
    lightDice?: Array< string > | null,
    darkDice?: Array< string > | null,
    occupation?: string | null,
    background?: string | null,
    drive?: string | null,
    rituals?: Array< string > | null,
    armorSet: string,
    weaponSet: string,
    foundEquipment?: Array< string > | null,
    burdens: number,
    hoard: number,
    gold: number,
    tokens: number,
    training?: Array< string > | null,
    household?: string | null,
    library?: Array< string > | null,
    backpack: string,
    conditions: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHeartRoomSubscription = {
  onCreateHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateHeartRoomSubscription = {
  onUpdateHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteHeartRoomSubscription = {
  onDeleteHeartRoom?:  {
    __typename: "HeartRoom",
    id: string,
    name: string,
    d4Dice: Array< string >,
    d6Dice: Array< string >,
    d8Dice: Array< string >,
    d10Dice: Array< string >,
    d12Dice: Array< string >,
    createdAt: string,
    updatedAt: string,
    characters?:  {
      __typename: "ModelHeartCharacterConnection",
      items?:  Array< {
        __typename: "HeartCharacter",
        id: string,
        gameID: string,
        playerName: string,
        characterName: string,
        characterPronouns: string,
        characterImageUrl?: string | null,
        ancestry: string,
        calling: string,
        class: string,
        beats: Array< string >,
        fallout: Array< string >,
        bloodProtection: number,
        bloodStress: number,
        echoProtection: number,
        echoStress: number,
        fortuneProtection: number,
        fortuneStress: number,
        mindProtection: number,
        mindStress: number,
        supplyProtection: number,
        supplyStress: number,
        skills: Array< string >,
        domains: Array< string >,
        knacks: Array< string >,
        abilities: Array< string >,
        equipment: Array< string >,
        resources: Array< string >,
        bonds: Array< string >,
        notes: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    hexMapModule:  {
      __typename: "HexMapModule",
      id: string,
      gridConfiguration: string,
      backgroundImages: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateHeartCharacterSubscription = {
  onCreateHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHeartCharacterSubscription = {
  onUpdateHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHeartCharacterSubscription = {
  onDeleteHeartCharacter?:  {
    __typename: "HeartCharacter",
    id: string,
    gameID: string,
    playerName: string,
    characterName: string,
    characterPronouns: string,
    characterImageUrl?: string | null,
    ancestry: string,
    calling: string,
    class: string,
    beats: Array< string >,
    fallout: Array< string >,
    bloodProtection: number,
    bloodStress: number,
    echoProtection: number,
    echoStress: number,
    fortuneProtection: number,
    fortuneStress: number,
    mindProtection: number,
    mindStress: number,
    supplyProtection: number,
    supplyStress: number,
    skills: Array< string >,
    domains: Array< string >,
    knacks: Array< string >,
    abilities: Array< string >,
    equipment: Array< string >,
    resources: Array< string >,
    bonds: Array< string >,
    notes: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserRoomSubscriptionVariables = {
  owner?: string,
};

export type OnCreateUserRoomSubscription = {
  onCreateUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserRoomSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateUserRoomSubscription = {
  onUpdateUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserRoomSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteUserRoomSubscription = {
  onDeleteUserRoom?:  {
    __typename: "UserRoom",
    id: string,
    trophyDarkRoom?:  {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      lightDice: Array< string >,
      darkDice: Array< string >,
      characters?:  {
        __typename: "ModelTrophyDarkCharacterConnection",
        items?:  Array< {
          __typename: "TrophyDarkCharacter",
          id: string,
          gameID: string,
          playerName: string,
          characterName: string,
          characterPronouns: string,
          characterImageUrl?: string | null,
          ruin: number,
          occupation: string,
          background: string,
          drive: string,
          rituals: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    roomKey: string,
    description?: string | null,
    createdOn: string,
    updatedOn: string,
    defaultRoomUsername?: string | null,
    textRoom?:  {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls?: Array< string > | null,
      customDice?: Array< string > | null,
      counters?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
    } | null,
    interactiveRoom?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnCreateSavedRollSubscriptionVariables = {
  owner?: string,
};

export type OnCreateSavedRollSubscription = {
  onCreateSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSavedRollSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateSavedRollSubscription = {
  onUpdateSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSavedRollSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteSavedRollSubscription = {
  onDeleteSavedRoll?:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSafetyItemSubscriptionVariables = {
  owner?: string,
};

export type OnCreateSafetyItemSubscription = {
  onCreateSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSafetyItemSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateSafetyItemSubscription = {
  onUpdateSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSafetyItemSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteSafetyItemSubscription = {
  onDeleteSafetyItem?:  {
    __typename: "SafetyItem",
    id: string,
    label: string,
    classification: SafetyClassification,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSafetyModuleSubscription = {
  onCreateSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSafetyModuleSubscription = {
  onUpdateSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSafetyModuleSubscription = {
  onDeleteSafetyModule?:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHexMapModuleSubscription = {
  onCreateHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHexMapModuleSubscription = {
  onUpdateHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHexMapModuleSubscription = {
  onDeleteHexMapModule?:  {
    __typename: "HexMapModule",
    id: string,
    gridConfiguration: string,
    backgroundImages: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLabelSubscription = {
  onCreateLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLabelSubscription = {
  onUpdateLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLabelSubscription = {
  onDeleteLabel?:  {
    __typename: "Label",
    id: string,
    roomId: string,
    contents: string,
    x: number,
    y: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCounterSubscription = {
  onCreateCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCounterSubscription = {
  onUpdateCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCounterSubscription = {
  onDeleteCounter?:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max?: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVisualDieSubscription = {
  onCreateVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateVisualDieSubscription = {
  onUpdateVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteVisualDieSubscription = {
  onDeleteVisualDie?:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
    room?:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      backgroundImageUrl?: string | null,
      rolls?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      labels?:  {
        __typename: "ModelLabelConnection",
        items?:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      counters?:  {
        __typename: "ModelCounterConnection",
        items?:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max?: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      dice?:  {
        __typename: "ModelVisualDieConnection",
        items?:  Array< {
          __typename: "VisualDie",
          id: string,
          roomId: string,
          x: number,
          y: number,
          createdBy: string,
          result: number,
          sides: number,
          color: string,
          version: number,
          type?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};
