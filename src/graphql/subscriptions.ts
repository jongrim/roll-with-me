/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateTextRoomByName = /* GraphQL */ `
  subscription OnUpdateTextRoomByName($name: String!) {
    onUpdateTextRoomByName(name: $name) {
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
export const onUpdateInteractiveRoomByName = /* GraphQL */ `
  subscription OnUpdateInteractiveRoomByName($name: String!) {
    onUpdateInteractiveRoomByName(name: $name) {
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
export const onUpdateTrophyDarkRoomByName = /* GraphQL */ `
  subscription OnUpdateTrophyDarkRoomByName($name: String!) {
    onUpdateTrophyDarkRoomByName(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTextRoom = /* GraphQL */ `
  subscription OnCreateTextRoom {
    onCreateTextRoom {
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
export const onUpdateTextRoom = /* GraphQL */ `
  subscription OnUpdateTextRoom {
    onUpdateTextRoom {
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
export const onDeleteTextRoom = /* GraphQL */ `
  subscription OnDeleteTextRoom {
    onDeleteTextRoom {
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
export const onCreateInteractiveRoom = /* GraphQL */ `
  subscription OnCreateInteractiveRoom {
    onCreateInteractiveRoom {
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
export const onUpdateInteractiveRoom = /* GraphQL */ `
  subscription OnUpdateInteractiveRoom {
    onUpdateInteractiveRoom {
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
export const onDeleteInteractiveRoom = /* GraphQL */ `
  subscription OnDeleteInteractiveRoom {
    onDeleteInteractiveRoom {
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
export const onCreateTrophyDarkRoom = /* GraphQL */ `
  subscription OnCreateTrophyDarkRoom {
    onCreateTrophyDarkRoom {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyDarkRoom = /* GraphQL */ `
  subscription OnUpdateTrophyDarkRoom {
    onUpdateTrophyDarkRoom {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophyDarkRoom = /* GraphQL */ `
  subscription OnDeleteTrophyDarkRoom {
    onDeleteTrophyDarkRoom {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSafetyModule = /* GraphQL */ `
  subscription OnCreateSafetyModule {
    onCreateSafetyModule {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSafetyModule = /* GraphQL */ `
  subscription OnUpdateSafetyModule {
    onUpdateSafetyModule {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSafetyModule = /* GraphQL */ `
  subscription OnDeleteSafetyModule {
    onDeleteSafetyModule {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCounter = /* GraphQL */ `
  subscription OnCreateCounter {
    onCreateCounter {
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
export const onUpdateCounter = /* GraphQL */ `
  subscription OnUpdateCounter {
    onUpdateCounter {
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
export const onDeleteCounter = /* GraphQL */ `
  subscription OnDeleteCounter {
    onDeleteCounter {
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
export const onCreateVisualDie = /* GraphQL */ `
  subscription OnCreateVisualDie {
    onCreateVisualDie {
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
export const onUpdateVisualDie = /* GraphQL */ `
  subscription OnUpdateVisualDie {
    onUpdateVisualDie {
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
export const onDeleteVisualDie = /* GraphQL */ `
  subscription OnDeleteVisualDie {
    onDeleteVisualDie {
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
export const onCreateSavedRoll = /* GraphQL */ `
  subscription OnCreateSavedRoll($owner: String!) {
    onCreateSavedRoll(owner: $owner) {
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
export const onUpdateSavedRoll = /* GraphQL */ `
  subscription OnUpdateSavedRoll($owner: String!) {
    onUpdateSavedRoll(owner: $owner) {
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
export const onDeleteSavedRoll = /* GraphQL */ `
  subscription OnDeleteSavedRoll($owner: String!) {
    onDeleteSavedRoll(owner: $owner) {
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
