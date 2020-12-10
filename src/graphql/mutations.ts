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
      dice
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
      dice
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
      dice
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
