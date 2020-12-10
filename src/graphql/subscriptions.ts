/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateTextRoomByName = /* GraphQL */ `
  subscription OnUpdateTextRoomByName($name: String!) {
    onUpdateTextRoomByName(name: $name) {
      id
      name
      rolls
      customDice
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
      dice
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
      customDice
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
      customDice
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
      customDice
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
      dice
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
      dice
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
      dice
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
