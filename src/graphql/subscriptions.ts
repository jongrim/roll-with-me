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
export const onCreateVisualDieByRoom = /* GraphQL */ `
  subscription OnCreateVisualDieByRoom($roomId: String!) {
    onCreateVisualDieByRoom(roomId: $roomId) {
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
export const onUpdateVisualDieById = /* GraphQL */ `
  subscription OnUpdateVisualDieById($id: String!) {
    onUpdateVisualDieById(id: $id) {
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
export const onCreateTrophyDarkCharacterByGame = /* GraphQL */ `
  subscription OnCreateTrophyDarkCharacterByGame($gameID: String!) {
    onCreateTrophyDarkCharacterByGame(gameID: $gameID) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      occupation
      background
      drive
      rituals
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyDarkCharacterById = /* GraphQL */ `
  subscription OnUpdateTrophyDarkCharacterById($id: String!) {
    onUpdateTrophyDarkCharacterById(id: $id) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      occupation
      background
      drive
      rituals
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeartCharacterByGame = /* GraphQL */ `
  subscription OnCreateHeartCharacterByGame($gameID: String!) {
    onCreateHeartCharacterByGame(gameID: $gameID) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ancestry
      calling
      class
      beats
      fallout
      bloodProtection
      bloodStress
      echoProtection
      echoStress
      fortuneProtection
      fortuneStress
      mindProtection
      mindStress
      supplyProtection
      supplyStress
      skills
      domains
      knacks
      abilities
      equipment
      resources
      bonds
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeartCharacterById = /* GraphQL */ `
  subscription OnUpdateHeartCharacterById($id: String!) {
    onUpdateHeartCharacterById(id: $id) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ancestry
      calling
      class
      beats
      fallout
      bloodProtection
      bloodStress
      echoProtection
      echoStress
      fortuneProtection
      fortuneStress
      mindProtection
      mindStress
      supplyProtection
      supplyStress
      skills
      domains
      knacks
      abilities
      equipment
      resources
      bonds
      notes
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
      lightDice
      darkDice
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ruin
          occupation
          background
          drive
          rituals
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const onUpdateTrophyDarkRoom = /* GraphQL */ `
  subscription OnUpdateTrophyDarkRoom {
    onUpdateTrophyDarkRoom {
      id
      name
      lightDice
      darkDice
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ruin
          occupation
          background
          drive
          rituals
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const onDeleteTrophyDarkRoom = /* GraphQL */ `
  subscription OnDeleteTrophyDarkRoom {
    onDeleteTrophyDarkRoom {
      id
      name
      lightDice
      darkDice
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ruin
          occupation
          background
          drive
          rituals
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const onCreateTrophyDarkCharacter = /* GraphQL */ `
  subscription OnCreateTrophyDarkCharacter {
    onCreateTrophyDarkCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      occupation
      background
      drive
      rituals
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyDarkCharacter = /* GraphQL */ `
  subscription OnUpdateTrophyDarkCharacter {
    onUpdateTrophyDarkCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      occupation
      background
      drive
      rituals
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophyDarkCharacter = /* GraphQL */ `
  subscription OnDeleteTrophyDarkCharacter {
    onDeleteTrophyDarkCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      occupation
      background
      drive
      rituals
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
export const onUpdateTextRoom = /* GraphQL */ `
  subscription OnUpdateTextRoom {
    onUpdateTextRoom {
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
export const onDeleteTextRoom = /* GraphQL */ `
  subscription OnDeleteTextRoom {
    onDeleteTextRoom {
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
export const onCreateInteractiveRoom = /* GraphQL */ `
  subscription OnCreateInteractiveRoom {
    onCreateInteractiveRoom {
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
export const onUpdateInteractiveRoom = /* GraphQL */ `
  subscription OnUpdateInteractiveRoom {
    onUpdateInteractiveRoom {
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
export const onDeleteInteractiveRoom = /* GraphQL */ `
  subscription OnDeleteInteractiveRoom {
    onDeleteInteractiveRoom {
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
export const onCreateHeartRoom = /* GraphQL */ `
  subscription OnCreateHeartRoom {
    onCreateHeartRoom {
      id
      name
      d4Dice
      d6Dice
      d8Dice
      d10Dice
      d12Dice
      createdAt
      updatedAt
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ancestry
          calling
          class
          beats
          fallout
          bloodProtection
          bloodStress
          echoProtection
          echoStress
          fortuneProtection
          fortuneStress
          mindProtection
          mindStress
          supplyProtection
          supplyStress
          skills
          domains
          knacks
          abilities
          equipment
          resources
          bonds
          notes
          createdAt
          updatedAt
        }
        nextToken
      }
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      hexMapModule {
        id
        gridConfiguration
        backgroundImages
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateHeartRoom = /* GraphQL */ `
  subscription OnUpdateHeartRoom {
    onUpdateHeartRoom {
      id
      name
      d4Dice
      d6Dice
      d8Dice
      d10Dice
      d12Dice
      createdAt
      updatedAt
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ancestry
          calling
          class
          beats
          fallout
          bloodProtection
          bloodStress
          echoProtection
          echoStress
          fortuneProtection
          fortuneStress
          mindProtection
          mindStress
          supplyProtection
          supplyStress
          skills
          domains
          knacks
          abilities
          equipment
          resources
          bonds
          notes
          createdAt
          updatedAt
        }
        nextToken
      }
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      hexMapModule {
        id
        gridConfiguration
        backgroundImages
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteHeartRoom = /* GraphQL */ `
  subscription OnDeleteHeartRoom {
    onDeleteHeartRoom {
      id
      name
      d4Dice
      d6Dice
      d8Dice
      d10Dice
      d12Dice
      createdAt
      updatedAt
      characters {
        items {
          id
          gameID
          playerName
          characterName
          characterPronouns
          characterImageUrl
          ancestry
          calling
          class
          beats
          fallout
          bloodProtection
          bloodStress
          echoProtection
          echoStress
          fortuneProtection
          fortuneStress
          mindProtection
          mindStress
          supplyProtection
          supplyStress
          skills
          domains
          knacks
          abilities
          equipment
          resources
          bonds
          notes
          createdAt
          updatedAt
        }
        nextToken
      }
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      hexMapModule {
        id
        gridConfiguration
        backgroundImages
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateHeartCharacter = /* GraphQL */ `
  subscription OnCreateHeartCharacter {
    onCreateHeartCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ancestry
      calling
      class
      beats
      fallout
      bloodProtection
      bloodStress
      echoProtection
      echoStress
      fortuneProtection
      fortuneStress
      mindProtection
      mindStress
      supplyProtection
      supplyStress
      skills
      domains
      knacks
      abilities
      equipment
      resources
      bonds
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeartCharacter = /* GraphQL */ `
  subscription OnUpdateHeartCharacter {
    onUpdateHeartCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ancestry
      calling
      class
      beats
      fallout
      bloodProtection
      bloodStress
      echoProtection
      echoStress
      fortuneProtection
      fortuneStress
      mindProtection
      mindStress
      supplyProtection
      supplyStress
      skills
      domains
      knacks
      abilities
      equipment
      resources
      bonds
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeartCharacter = /* GraphQL */ `
  subscription OnDeleteHeartCharacter {
    onDeleteHeartCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ancestry
      calling
      class
      beats
      fallout
      bloodProtection
      bloodStress
      echoProtection
      echoStress
      fortuneProtection
      fortuneStress
      mindProtection
      mindStress
      supplyProtection
      supplyStress
      skills
      domains
      knacks
      abilities
      equipment
      resources
      bonds
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserRoom = /* GraphQL */ `
  subscription OnCreateUserRoom($owner: String!) {
    onCreateUserRoom(owner: $owner) {
      id
      trophyDarkRoom {
        id
        name
        lightDice
        darkDice
        characters {
          items {
            id
            gameID
            playerName
            characterName
            characterPronouns
            characterImageUrl
            ruin
            occupation
            background
            drive
            rituals
            createdAt
            updatedAt
          }
          nextToken
        }
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
      owner
    }
  }
`;
export const onUpdateUserRoom = /* GraphQL */ `
  subscription OnUpdateUserRoom($owner: String!) {
    onUpdateUserRoom(owner: $owner) {
      id
      trophyDarkRoom {
        id
        name
        lightDice
        darkDice
        characters {
          items {
            id
            gameID
            playerName
            characterName
            characterPronouns
            characterImageUrl
            ruin
            occupation
            background
            drive
            rituals
            createdAt
            updatedAt
          }
          nextToken
        }
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
      owner
    }
  }
`;
export const onDeleteUserRoom = /* GraphQL */ `
  subscription OnDeleteUserRoom($owner: String!) {
    onDeleteUserRoom(owner: $owner) {
      id
      trophyDarkRoom {
        id
        name
        lightDice
        darkDice
        characters {
          items {
            id
            gameID
            playerName
            characterName
            characterPronouns
            characterImageUrl
            ruin
            occupation
            background
            drive
            rituals
            createdAt
            updatedAt
          }
          nextToken
        }
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
      owner
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
export const onCreateSafetyItem = /* GraphQL */ `
  subscription OnCreateSafetyItem($owner: String!) {
    onCreateSafetyItem(owner: $owner) {
      id
      label
      classification
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateSafetyItem = /* GraphQL */ `
  subscription OnUpdateSafetyItem($owner: String!) {
    onUpdateSafetyItem(owner: $owner) {
      id
      label
      classification
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteSafetyItem = /* GraphQL */ `
  subscription OnDeleteSafetyItem($owner: String!) {
    onDeleteSafetyItem(owner: $owner) {
      id
      label
      classification
      note
      createdAt
      updatedAt
      owner
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
export const onCreateHexMapModule = /* GraphQL */ `
  subscription OnCreateHexMapModule {
    onCreateHexMapModule {
      id
      gridConfiguration
      backgroundImages
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHexMapModule = /* GraphQL */ `
  subscription OnUpdateHexMapModule {
    onUpdateHexMapModule {
      id
      gridConfiguration
      backgroundImages
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHexMapModule = /* GraphQL */ `
  subscription OnDeleteHexMapModule {
    onDeleteHexMapModule {
      id
      gridConfiguration
      backgroundImages
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
export const onUpdateVisualDie = /* GraphQL */ `
  subscription OnUpdateVisualDie {
    onUpdateVisualDie {
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
export const onDeleteVisualDie = /* GraphQL */ `
  subscription OnDeleteVisualDie {
    onDeleteVisualDie {
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
