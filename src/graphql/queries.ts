/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTextRoom = /* GraphQL */ `
  query GetTextRoom($id: ID!) {
    getTextRoom(id: $id) {
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
export const listTextRooms = /* GraphQL */ `
  query ListTextRooms(
    $filter: ModelTextRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInteractiveRoom = /* GraphQL */ `
  query GetInteractiveRoom($id: ID!) {
    getInteractiveRoom(id: $id) {
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
export const listInteractiveRooms = /* GraphQL */ `
  query ListInteractiveRooms(
    $filter: ModelInteractiveRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInteractiveRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTrophyDarkRoom = /* GraphQL */ `
  query GetTrophyDarkRoom($id: ID!) {
    getTrophyDarkRoom(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listTrophyDarkRooms = /* GraphQL */ `
  query ListTrophyDarkRooms(
    $filter: ModelTrophyDarkRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyDarkRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSafetyModule = /* GraphQL */ `
  query GetSafetyModule($id: ID!) {
    getSafetyModule(id: $id) {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const listSafetyModules = /* GraphQL */ `
  query ListSafetyModules(
    $filter: ModelSafetyModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSafetyModules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLabel = /* GraphQL */ `
  query GetLabel($id: ID!) {
    getLabel(id: $id) {
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
export const listLabels = /* GraphQL */ `
  query ListLabels(
    $filter: ModelLabelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabels(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getCounter = /* GraphQL */ `
  query GetCounter($id: ID!) {
    getCounter(id: $id) {
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
export const listCounters = /* GraphQL */ `
  query ListCounters(
    $filter: ModelCounterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCounters(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getVisualDie = /* GraphQL */ `
  query GetVisualDie($id: ID!) {
    getVisualDie(id: $id) {
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
export const listVisualDies = /* GraphQL */ `
  query ListVisualDies(
    $filter: ModelVisualDieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVisualDies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
            nextToken
          }
          counters {
            nextToken
          }
          labels {
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
      nextToken
    }
  }
`;
export const textRoomByName = /* GraphQL */ `
  query TextRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelTextRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const interactiveRoomByName = /* GraphQL */ `
  query InteractiveRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelInteractiveRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interactiveRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const trophyDarkRoomByName = /* GraphQL */ `
  query TrophyDarkRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelTrophyDarkRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    trophyDarkRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSavedRoll = /* GraphQL */ `
  query GetSavedRoll($id: ID!) {
    getSavedRoll(id: $id) {
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
export const listSavedRolls = /* GraphQL */ `
  query ListSavedRolls(
    $filter: ModelSavedRollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedRolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rollName
        dice
        modifier
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
