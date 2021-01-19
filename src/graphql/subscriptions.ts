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
        items {
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
          version
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
export const onCreateVisualDieByRoom = /* GraphQL */ `
  subscription OnCreateVisualDieByRoom($roomId: String!) {
    onCreateVisualDieByRoom(roomId: $roomId) {
      id
      roomId
      room {
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
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVisualDieById = /* GraphQL */ `
  subscription OnUpdateVisualDieById($id: String!) {
    onUpdateVisualDieById(id: $id) {
      id
      roomId
      room {
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
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCounterByRoom = /* GraphQL */ `
  subscription OnCreateCounterByRoom($roomId: String!) {
    onCreateCounterByRoom(roomId: $roomId) {
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
export const onUpdateCounterById = /* GraphQL */ `
  subscription OnUpdateCounterById($id: String!) {
    onUpdateCounterById(id: $id) {
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
export const onCreateLabelByRoom = /* GraphQL */ `
  subscription OnCreateLabelByRoom($roomId: String!) {
    onCreateLabelByRoom(roomId: $roomId) {
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
export const onUpdateLabelById = /* GraphQL */ `
  subscription OnUpdateLabelById($id: String!) {
    onUpdateLabelById(id: $id) {
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
        items {
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
          version
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
        items {
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
          version
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
        items {
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
          version
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
export const onCreateLabel = /* GraphQL */ `
  subscription OnCreateLabel {
    onCreateLabel {
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
export const onUpdateLabel = /* GraphQL */ `
  subscription OnUpdateLabel {
    onUpdateLabel {
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
export const onDeleteLabel = /* GraphQL */ `
  subscription OnDeleteLabel {
    onDeleteLabel {
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
export const onCreateCounter = /* GraphQL */ `
  subscription OnCreateCounter {
    onCreateCounter {
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
export const onUpdateCounter = /* GraphQL */ `
  subscription OnUpdateCounter {
    onUpdateCounter {
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
export const onDeleteCounter = /* GraphQL */ `
  subscription OnDeleteCounter {
    onDeleteCounter {
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
export const onCreateVisualDie = /* GraphQL */ `
  subscription OnCreateVisualDie {
    onCreateVisualDie {
      id
      roomId
      room {
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
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      version
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
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      version
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
        safetyModule {
          id
          xCardActive
          linesAndVeils
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
      x
      y
      createdBy
      result
      sides
      color
      version
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
