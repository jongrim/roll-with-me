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
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
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
      backgroundImageUrl
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      labels {
        items {
          id
          roomId
          contents
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      counters {
        items {
          id
          roomId
          title
          value
          max
          x
          y
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      dice {
        items {
          id
          roomId
          x
          y
          createdBy
          result
          sides
          color
          version
          type
          createdAt
          updatedAt
          room {
            id
            name
            backgroundImageUrl
            createdAt
            updatedAt
          }
        }
        nextToken
      }
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
      backgroundImageUrl
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      labels {
        items {
          id
          roomId
          contents
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      counters {
        items {
          id
          roomId
          title
          value
          max
          x
          y
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      dice {
        items {
          id
          roomId
          x
          y
          createdBy
          result
          sides
          color
          version
          type
          createdAt
          updatedAt
          room {
            id
            name
            backgroundImageUrl
            createdAt
            updatedAt
          }
        }
        nextToken
      }
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
      backgroundImageUrl
      createdAt
      updatedAt
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      labels {
        items {
          id
          roomId
          contents
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      counters {
        items {
          id
          roomId
          title
          value
          max
          x
          y
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      dice {
        items {
          id
          roomId
          x
          y
          createdBy
          result
          sides
          color
          version
          type
          createdAt
          updatedAt
          room {
            id
            name
            backgroundImageUrl
            createdAt
            updatedAt
          }
        }
        nextToken
      }
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
export const createUserRoom = /* GraphQL */ `
  mutation CreateUserRoom(
    $input: CreateUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    createUserRoom(input: $input, condition: $condition) {
      id
      roomKey
      description
      createdOn
      updatedOn
      defaultRoomUsername
      textRoom {
        id
        name
        rolls
        counters
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
      }
      interactiveRoom {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      trophyDarkRoom {
        id
        name
        createdAt
        updatedAt
      }
      owner
    }
  }
`;
export const updateUserRoom = /* GraphQL */ `
  mutation UpdateUserRoom(
    $input: UpdateUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    updateUserRoom(input: $input, condition: $condition) {
      id
      roomKey
      description
      createdOn
      updatedOn
      defaultRoomUsername
      textRoom {
        id
        name
        rolls
        counters
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
      }
      interactiveRoom {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      trophyDarkRoom {
        id
        name
        createdAt
        updatedAt
      }
      owner
    }
  }
`;
export const deleteUserRoom = /* GraphQL */ `
  mutation DeleteUserRoom(
    $input: DeleteUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    deleteUserRoom(input: $input, condition: $condition) {
      id
      roomKey
      description
      createdOn
      updatedOn
      defaultRoomUsername
      textRoom {
        id
        name
        rolls
        counters
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
      }
      interactiveRoom {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      trophyDarkRoom {
        id
        name
        createdAt
        updatedAt
      }
      owner
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
export const createLabel = /* GraphQL */ `
  mutation CreateLabel(
    $input: CreateLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    createLabel(input: $input, condition: $condition) {
      id
      roomId
      contents
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const updateLabel = /* GraphQL */ `
  mutation UpdateLabel(
    $input: UpdateLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    updateLabel(input: $input, condition: $condition) {
      id
      roomId
      contents
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const deleteLabel = /* GraphQL */ `
  mutation DeleteLabel(
    $input: DeleteLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    deleteLabel(input: $input, condition: $condition) {
      id
      roomId
      contents
      x
      y
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
      x
      y
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
      x
      y
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
      x
      y
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
      x
      y
      createdBy
      result
      sides
      color
      version
      type
      createdAt
      updatedAt
      room {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
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
      x
      y
      createdBy
      result
      sides
      color
      version
      type
      createdAt
      updatedAt
      room {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
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
      x
      y
      createdBy
      result
      sides
      color
      version
      type
      createdAt
      updatedAt
      room {
        id
        name
        backgroundImageUrl
        createdAt
        updatedAt
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
        }
        labels {
          items {
            id
            roomId
            contents
            x
            y
            createdAt
            updatedAt
          }
          nextToken
        }
        counters {
          items {
            id
            roomId
            title
            value
            max
            x
            y
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        dice {
          items {
            id
            roomId
            x
            y
            createdBy
            result
            sides
            color
            version
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
