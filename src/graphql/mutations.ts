/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTextRoom = /* GraphQL */ `
  mutation CreateTextRoom(
    $input: CreateTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    createTextRoom(input: $input, condition: $condition) {
      id
      name
      rolls
      counters
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTextRoom = /* GraphQL */ `
  mutation UpdateTextRoom(
    $input: UpdateTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    updateTextRoom(input: $input, condition: $condition) {
      id
      name
      rolls
      counters
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTextRoom = /* GraphQL */ `
  mutation DeleteTextRoom(
    $input: DeleteTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    deleteTextRoom(input: $input, condition: $condition) {
      id
      name
      rolls
      counters
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createInteractiveRoom = /* GraphQL */ `
  mutation CreateInteractiveRoom(
    $input: CreateInteractiveRoomInput!
    $condition: ModelInteractiveRoomConditionInput
  ) {
    createInteractiveRoom(input: $input, condition: $condition) {
      id
      name
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      dice {
        nextToken
      }
      counters {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateInteractiveRoom = /* GraphQL */ `
  mutation UpdateInteractiveRoom(
    $input: UpdateInteractiveRoomInput!
    $condition: ModelInteractiveRoomConditionInput
  ) {
    updateInteractiveRoom(input: $input, condition: $condition) {
      id
      name
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      dice {
        nextToken
      }
      counters {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteInteractiveRoom = /* GraphQL */ `
  mutation DeleteInteractiveRoom(
    $input: DeleteInteractiveRoomInput!
    $condition: ModelInteractiveRoomConditionInput
  ) {
    deleteInteractiveRoom(input: $input, condition: $condition) {
      id
      name
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      dice {
        nextToken
      }
      counters {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTrophyDarkRoom = /* GraphQL */ `
  mutation CreateTrophyDarkRoom(
    $input: CreateTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    createTrophyDarkRoom(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateTrophyDarkRoom = /* GraphQL */ `
  mutation UpdateTrophyDarkRoom(
    $input: UpdateTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    updateTrophyDarkRoom(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrophyDarkRoom = /* GraphQL */ `
  mutation DeleteTrophyDarkRoom(
    $input: DeleteTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    deleteTrophyDarkRoom(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createSafetyModule = /* GraphQL */ `
  mutation CreateSafetyModule(
    $input: CreateSafetyModuleInput!
    $condition: ModelSafetyModuleConditionInput
  ) {
    createSafetyModule(input: $input, condition: $condition) {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const updateSafetyModule = /* GraphQL */ `
  mutation UpdateSafetyModule(
    $input: UpdateSafetyModuleInput!
    $condition: ModelSafetyModuleConditionInput
  ) {
    updateSafetyModule(input: $input, condition: $condition) {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const deleteSafetyModule = /* GraphQL */ `
  mutation DeleteSafetyModule(
    $input: DeleteSafetyModuleInput!
    $condition: ModelSafetyModuleConditionInput
  ) {
    deleteSafetyModule(input: $input, condition: $condition) {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const createCounter = /* GraphQL */ `
  mutation CreateCounter(
    $input: CreateCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    createCounter(input: $input, condition: $condition) {
      id
      roomId
      title
      value
      max
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateCounter = /* GraphQL */ `
  mutation UpdateCounter(
    $input: UpdateCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    updateCounter(input: $input, condition: $condition) {
      id
      roomId
      title
      value
      max
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteCounter = /* GraphQL */ `
  mutation DeleteCounter(
    $input: DeleteCounterInput!
    $condition: ModelCounterConditionInput
  ) {
    deleteCounter(input: $input, condition: $condition) {
      id
      roomId
      title
      value
      max
      type
      createdAt
      updatedAt
    }
  }
`;
export const createVisualDie = /* GraphQL */ `
  mutation CreateVisualDie(
    $input: CreateVisualDieInput!
    $condition: ModelVisualDieConditionInput
  ) {
    createVisualDie(input: $input, condition: $condition) {
      id
      roomId
      room {
        id
        name
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      createdAt
      updatedAt
    }
  }
`;
export const updateVisualDie = /* GraphQL */ `
  mutation UpdateVisualDie(
    $input: UpdateVisualDieInput!
    $condition: ModelVisualDieConditionInput
  ) {
    updateVisualDie(input: $input, condition: $condition) {
      id
      roomId
      room {
        id
        name
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      createdAt
      updatedAt
    }
  }
`;
export const deleteVisualDie = /* GraphQL */ `
  mutation DeleteVisualDie(
    $input: DeleteVisualDieInput!
    $condition: ModelVisualDieConditionInput
  ) {
    deleteVisualDie(input: $input, condition: $condition) {
      id
      roomId
      room {
        id
        name
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      createdAt
      updatedAt
    }
  }
`;
export const createSavedRoll = /* GraphQL */ `
  mutation CreateSavedRoll(
    $input: CreateSavedRollInput!
    $condition: ModelSavedRollConditionInput
  ) {
    createSavedRoll(input: $input, condition: $condition) {
      id
      rollName
      dice
      modifier
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSavedRoll = /* GraphQL */ `
  mutation UpdateSavedRoll(
    $input: UpdateSavedRollInput!
    $condition: ModelSavedRollConditionInput
  ) {
    updateSavedRoll(input: $input, condition: $condition) {
      id
      rollName
      dice
      modifier
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSavedRoll = /* GraphQL */ `
  mutation DeleteSavedRoll(
    $input: DeleteSavedRollInput!
    $condition: ModelSavedRollConditionInput
  ) {
    deleteSavedRoll(input: $input, condition: $condition) {
      id
      rollName
      dice
      modifier
      createdAt
      updatedAt
      owner
    }
  }
`;
