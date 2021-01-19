/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTextRoomInput = {
  id?: string | null,
  name: string,
  rolls?: Array< string > | null,
  counters?: Array< string > | null,
  textRoomSafetyModuleId: string,
};

export type ModelTextRoomConditionInput = {
  name?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  counters?: ModelStringInput | null,
  and?: Array< ModelTextRoomConditionInput | null > | null,
  or?: Array< ModelTextRoomConditionInput | null > | null,
  not?: ModelTextRoomConditionInput | null,
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

export type UpdateTextRoomInput = {
  id: string,
  name?: string | null,
  rolls?: Array< string > | null,
  counters?: Array< string > | null,
  textRoomSafetyModuleId?: string | null,
};

export type DeleteTextRoomInput = {
  id?: string | null,
};

export type CreateInteractiveRoomInput = {
  id?: string | null,
  name: string,
  interactiveRoomSafetyModuleId: string,
};

export type ModelInteractiveRoomConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelInteractiveRoomConditionInput | null > | null,
  or?: Array< ModelInteractiveRoomConditionInput | null > | null,
  not?: ModelInteractiveRoomConditionInput | null,
};

export enum CounterType {
  CLOCK = "CLOCK",
  OTHER = "OTHER",
}


export type UpdateInteractiveRoomInput = {
  id: string,
  name?: string | null,
  interactiveRoomSafetyModuleId?: string | null,
};

export type DeleteInteractiveRoomInput = {
  id?: string | null,
};

export type CreateTrophyDarkRoomInput = {
  id?: string | null,
  name: string,
};

export type ModelTrophyDarkRoomConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkRoomConditionInput | null > | null,
  or?: Array< ModelTrophyDarkRoomConditionInput | null > | null,
  not?: ModelTrophyDarkRoomConditionInput | null,
};

export type UpdateTrophyDarkRoomInput = {
  id: string,
  name?: string | null,
};

export type DeleteTrophyDarkRoomInput = {
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
};

export type DeleteVisualDieInput = {
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

export type UpdateSavedRollInput = {
  id: string,
  rollName?: string | null,
  dice?: Array< string > | null,
  modifier?: number | null,
};

export type DeleteSavedRollInput = {
  id?: string | null,
};

export type ModelTextRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  rolls?: ModelStringInput | null,
  counters?: ModelStringInput | null,
  and?: Array< ModelTextRoomFilterInput | null > | null,
  or?: Array< ModelTextRoomFilterInput | null > | null,
  not?: ModelTextRoomFilterInput | null,
};

export type ModelInteractiveRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelInteractiveRoomFilterInput | null > | null,
  or?: Array< ModelInteractiveRoomFilterInput | null > | null,
  not?: ModelInteractiveRoomFilterInput | null,
};

export type ModelTrophyDarkRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTrophyDarkRoomFilterInput | null > | null,
  or?: Array< ModelTrophyDarkRoomFilterInput | null > | null,
  not?: ModelTrophyDarkRoomFilterInput | null,
};

export type ModelSafetyModuleFilterInput = {
  id?: ModelIDInput | null,
  xCardActive?: ModelBooleanInput | null,
  linesAndVeils?: ModelStringInput | null,
  and?: Array< ModelSafetyModuleFilterInput | null > | null,
  or?: Array< ModelSafetyModuleFilterInput | null > | null,
  not?: ModelSafetyModuleFilterInput | null,
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
  and?: Array< ModelVisualDieFilterInput | null > | null,
  or?: Array< ModelVisualDieFilterInput | null > | null,
  not?: ModelVisualDieFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSavedRollFilterInput = {
  id?: ModelIDInput | null,
  rollName?: ModelStringInput | null,
  dice?: ModelStringInput | null,
  modifier?: ModelIntInput | null,
  and?: Array< ModelSavedRollFilterInput | null > | null,
  or?: Array< ModelSavedRollFilterInput | null > | null,
  not?: ModelSavedRollFilterInput | null,
};

export type CreateTextRoomMutationVariables = {
  input: CreateTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type CreateTextRoomMutation = {
  createTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTextRoomMutationVariables = {
  input: UpdateTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type UpdateTextRoomMutation = {
  updateTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTextRoomMutationVariables = {
  input: DeleteTextRoomInput,
  condition?: ModelTextRoomConditionInput | null,
};

export type DeleteTextRoomMutation = {
  deleteTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateInteractiveRoomMutationVariables = {
  input: CreateInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type CreateInteractiveRoomMutation = {
  createInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInteractiveRoomMutationVariables = {
  input: UpdateInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type UpdateInteractiveRoomMutation = {
  updateInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInteractiveRoomMutationVariables = {
  input: DeleteInteractiveRoomInput,
  condition?: ModelInteractiveRoomConditionInput | null,
};

export type DeleteInteractiveRoomMutation = {
  deleteInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTrophyDarkRoomMutationVariables = {
  input: CreateTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type CreateTrophyDarkRoomMutation = {
  createTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrophyDarkRoomMutationVariables = {
  input: UpdateTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type UpdateTrophyDarkRoomMutation = {
  updateTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrophyDarkRoomMutationVariables = {
  input: DeleteTrophyDarkRoomInput,
  condition?: ModelTrophyDarkRoomConditionInput | null,
};

export type DeleteTrophyDarkRoomMutation = {
  deleteTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSafetyModuleMutationVariables = {
  input: CreateSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type CreateSafetyModuleMutation = {
  createSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSafetyModuleMutationVariables = {
  input: UpdateSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type UpdateSafetyModuleMutation = {
  updateSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSafetyModuleMutationVariables = {
  input: DeleteSafetyModuleInput,
  condition?: ModelSafetyModuleConditionInput | null,
};

export type DeleteSafetyModuleMutation = {
  deleteSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLabelMutationVariables = {
  input: CreateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type CreateLabelMutation = {
  createLabel:  {
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
  input: UpdateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type UpdateLabelMutation = {
  updateLabel:  {
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
  input: DeleteLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type DeleteLabelMutation = {
  deleteLabel:  {
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
  input: CreateCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type CreateCounterMutation = {
  createCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCounterMutationVariables = {
  input: UpdateCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type UpdateCounterMutation = {
  updateCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCounterMutationVariables = {
  input: DeleteCounterInput,
  condition?: ModelCounterConditionInput | null,
};

export type DeleteCounterMutation = {
  deleteCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVisualDieMutationVariables = {
  input: CreateVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type CreateVisualDieMutation = {
  createVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVisualDieMutationVariables = {
  input: UpdateVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type UpdateVisualDieMutation = {
  updateVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVisualDieMutationVariables = {
  input: DeleteVisualDieInput,
  condition?: ModelVisualDieConditionInput | null,
};

export type DeleteVisualDieMutation = {
  deleteVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSavedRollMutationVariables = {
  input: CreateSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type CreateSavedRollMutation = {
  createSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateSavedRollMutationVariables = {
  input: UpdateSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type UpdateSavedRollMutation = {
  updateSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteSavedRollMutationVariables = {
  input: DeleteSavedRollInput,
  condition?: ModelSavedRollConditionInput | null,
};

export type DeleteSavedRollMutation = {
  deleteSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetTextRoomQueryVariables = {
  id: string,
};

export type GetTextRoomQuery = {
  getTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTextRoomsQueryVariables = {
  filter?: ModelTextRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTextRoomsQuery = {
  listTextRooms:  {
    __typename: "ModelTextRoomConnection",
    items:  Array< {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls: Array< string > | null,
      counters: Array< string > | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetInteractiveRoomQueryVariables = {
  id: string,
};

export type GetInteractiveRoomQuery = {
  getInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInteractiveRoomsQueryVariables = {
  filter?: ModelInteractiveRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInteractiveRoomsQuery = {
  listInteractiveRooms:  {
    __typename: "ModelInteractiveRoomConnection",
    items:  Array< {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTrophyDarkRoomQueryVariables = {
  id: string,
};

export type GetTrophyDarkRoomQuery = {
  getTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrophyDarkRoomsQueryVariables = {
  filter?: ModelTrophyDarkRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrophyDarkRoomsQuery = {
  listTrophyDarkRooms:  {
    __typename: "ModelTrophyDarkRoomConnection",
    items:  Array< {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSafetyModuleQueryVariables = {
  id: string,
};

export type GetSafetyModuleQuery = {
  getSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSafetyModulesQueryVariables = {
  filter?: ModelSafetyModuleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSafetyModulesQuery = {
  listSafetyModules:  {
    __typename: "ModelSafetyModuleConnection",
    items:  Array< {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetLabelQueryVariables = {
  id: string,
};

export type GetLabelQuery = {
  getLabel:  {
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
  listLabels:  {
    __typename: "ModelLabelConnection",
    items:  Array< {
      __typename: "Label",
      id: string,
      roomId: string,
      contents: string,
      x: number,
      y: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCounterQueryVariables = {
  id: string,
};

export type GetCounterQuery = {
  getCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
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
  listCounters:  {
    __typename: "ModelCounterConnection",
    items:  Array< {
      __typename: "Counter",
      id: string,
      roomId: string,
      title: string,
      value: number,
      max: number | null,
      x: number,
      y: number,
      type: CounterType,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetVisualDieQueryVariables = {
  id: string,
};

export type GetVisualDieQuery = {
  getVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVisualDiesQueryVariables = {
  filter?: ModelVisualDieFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVisualDiesQuery = {
  listVisualDies:  {
    __typename: "ModelVisualDieConnection",
    items:  Array< {
      __typename: "VisualDie",
      id: string,
      roomId: string,
      room:  {
        __typename: "InteractiveRoom",
        id: string,
        name: string,
        safetyModule:  {
          __typename: "SafetyModule",
          id: string,
          xCardActive: boolean,
          linesAndVeils: Array< string >,
          createdAt: string,
          updatedAt: string,
        },
        dice:  {
          __typename: "ModelVisualDieConnection",
          nextToken: string | null,
        } | null,
        counters:  {
          __typename: "ModelCounterConnection",
          nextToken: string | null,
        } | null,
        labels:  {
          __typename: "ModelLabelConnection",
          nextToken: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      x: number,
      y: number,
      createdBy: string,
      result: number,
      sides: number,
      color: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
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
  textRoomByName:  {
    __typename: "ModelTextRoomConnection",
    items:  Array< {
      __typename: "TextRoom",
      id: string,
      name: string,
      rolls: Array< string > | null,
      counters: Array< string > | null,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
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
  interactiveRoomByName:  {
    __typename: "ModelInteractiveRoomConnection",
    items:  Array< {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
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
  trophyDarkRoomByName:  {
    __typename: "ModelTrophyDarkRoomConnection",
    items:  Array< {
      __typename: "TrophyDarkRoom",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSavedRollQueryVariables = {
  id: string,
};

export type GetSavedRollQuery = {
  getSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListSavedRollsQueryVariables = {
  filter?: ModelSavedRollFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSavedRollsQuery = {
  listSavedRolls:  {
    __typename: "ModelSavedRollConnection",
    items:  Array< {
      __typename: "SavedRoll",
      id: string,
      rollName: string,
      dice: Array< string >,
      modifier: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnUpdateTextRoomByNameSubscriptionVariables = {
  name: string,
};

export type OnUpdateTextRoomByNameSubscription = {
  onUpdateTextRoomByName:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInteractiveRoomByNameSubscriptionVariables = {
  name: string,
};

export type OnUpdateInteractiveRoomByNameSubscription = {
  onUpdateInteractiveRoomByName:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyDarkRoomByNameSubscriptionVariables = {
  name: string,
};

export type OnUpdateTrophyDarkRoomByNameSubscription = {
  onUpdateTrophyDarkRoomByName:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVisualDieByRoomSubscriptionVariables = {
  roomId: string,
};

export type OnCreateVisualDieByRoomSubscription = {
  onCreateVisualDieByRoom:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVisualDieByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateVisualDieByIdSubscription = {
  onUpdateVisualDieById:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCounterByRoomSubscriptionVariables = {
  roomId: string,
};

export type OnCreateCounterByRoomSubscription = {
  onCreateCounterByRoom:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCounterByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateCounterByIdSubscription = {
  onUpdateCounterById:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLabelByRoomSubscriptionVariables = {
  roomId: string,
};

export type OnCreateLabelByRoomSubscription = {
  onCreateLabelByRoom:  {
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
  id: string,
};

export type OnUpdateLabelByIdSubscription = {
  onUpdateLabelById:  {
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

export type OnCreateTextRoomSubscription = {
  onCreateTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTextRoomSubscription = {
  onUpdateTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTextRoomSubscription = {
  onDeleteTextRoom:  {
    __typename: "TextRoom",
    id: string,
    name: string,
    rolls: Array< string > | null,
    counters: Array< string > | null,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInteractiveRoomSubscription = {
  onCreateInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInteractiveRoomSubscription = {
  onUpdateInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInteractiveRoomSubscription = {
  onDeleteInteractiveRoom:  {
    __typename: "InteractiveRoom",
    id: string,
    name: string,
    safetyModule:  {
      __typename: "SafetyModule",
      id: string,
      xCardActive: boolean,
      linesAndVeils: Array< string >,
      createdAt: string,
      updatedAt: string,
    },
    dice:  {
      __typename: "ModelVisualDieConnection",
      items:  Array< {
        __typename: "VisualDie",
        id: string,
        roomId: string,
        room:  {
          __typename: "InteractiveRoom",
          id: string,
          name: string,
          createdAt: string,
          updatedAt: string,
        } | null,
        x: number,
        y: number,
        createdBy: string,
        result: number,
        sides: number,
        color: string,
        version: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    counters:  {
      __typename: "ModelCounterConnection",
      items:  Array< {
        __typename: "Counter",
        id: string,
        roomId: string,
        title: string,
        value: number,
        max: number | null,
        x: number,
        y: number,
        type: CounterType,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    labels:  {
      __typename: "ModelLabelConnection",
      items:  Array< {
        __typename: "Label",
        id: string,
        roomId: string,
        contents: string,
        x: number,
        y: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrophyDarkRoomSubscription = {
  onCreateTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrophyDarkRoomSubscription = {
  onUpdateTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrophyDarkRoomSubscription = {
  onDeleteTrophyDarkRoom:  {
    __typename: "TrophyDarkRoom",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSafetyModuleSubscription = {
  onCreateSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSafetyModuleSubscription = {
  onUpdateSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSafetyModuleSubscription = {
  onDeleteSafetyModule:  {
    __typename: "SafetyModule",
    id: string,
    xCardActive: boolean,
    linesAndVeils: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLabelSubscription = {
  onCreateLabel:  {
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
  onUpdateLabel:  {
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
  onDeleteLabel:  {
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
  onCreateCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCounterSubscription = {
  onUpdateCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCounterSubscription = {
  onDeleteCounter:  {
    __typename: "Counter",
    id: string,
    roomId: string,
    title: string,
    value: number,
    max: number | null,
    x: number,
    y: number,
    type: CounterType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVisualDieSubscription = {
  onCreateVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVisualDieSubscription = {
  onUpdateVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVisualDieSubscription = {
  onDeleteVisualDie:  {
    __typename: "VisualDie",
    id: string,
    roomId: string,
    room:  {
      __typename: "InteractiveRoom",
      id: string,
      name: string,
      safetyModule:  {
        __typename: "SafetyModule",
        id: string,
        xCardActive: boolean,
        linesAndVeils: Array< string >,
        createdAt: string,
        updatedAt: string,
      },
      dice:  {
        __typename: "ModelVisualDieConnection",
        items:  Array< {
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
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      counters:  {
        __typename: "ModelCounterConnection",
        items:  Array< {
          __typename: "Counter",
          id: string,
          roomId: string,
          title: string,
          value: number,
          max: number | null,
          x: number,
          y: number,
          type: CounterType,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      labels:  {
        __typename: "ModelLabelConnection",
        items:  Array< {
          __typename: "Label",
          id: string,
          roomId: string,
          contents: string,
          x: number,
          y: number,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    x: number,
    y: number,
    createdBy: string,
    result: number,
    sides: number,
    color: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSavedRollSubscriptionVariables = {
  owner: string,
};

export type OnCreateSavedRollSubscription = {
  onCreateSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateSavedRollSubscriptionVariables = {
  owner: string,
};

export type OnUpdateSavedRollSubscription = {
  onUpdateSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteSavedRollSubscriptionVariables = {
  owner: string,
};

export type OnDeleteSavedRollSubscription = {
  onDeleteSavedRoll:  {
    __typename: "SavedRoll",
    id: string,
    rollName: string,
    dice: Array< string >,
    modifier: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
