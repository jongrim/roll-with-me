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
        rolls
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
export const onUpdateInteractiveRoomById = /* GraphQL */ `
  subscription OnUpdateInteractiveRoomById($id: String!) {
    onUpdateInteractiveRoomById(id: $id) {
      id
      name
      backgroundImageUrl
      rolls
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
            rolls
            createdAt
            updatedAt
          }
        }
        nextToken
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
        rolls
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
export const onUpdateTrophyDarkRoomById = /* GraphQL */ `
  subscription OnUpdateTrophyDarkRoomById($id: String!) {
    onUpdateTrophyDarkRoomById(id: $id) {
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
export const onCreateTrophyGoldCharacterByGame = /* GraphQL */ `
  subscription OnCreateTrophyGoldCharacterByGame($gameID: String!) {
    onCreateTrophyGoldCharacterByGame(gameID: $gameID) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      weakPoint
      lightDice
      darkDice
      occupation
      background
      drive
      rituals
      skills
      armorSet
      weaponSet
      foundEquipment
      burdens
      hoard
      gold
      tokens
      hearthfire
      backpack
      conditions
      notes
      hidden
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldRoomById = /* GraphQL */ `
  subscription OnUpdateTrophyGoldRoomById($id: String!) {
    onUpdateTrophyGoldRoomById(id: $id) {
      id
      name
      diceModule {
        id
        lightDice
        darkDice
        goldDice
        diceMode
        createdAt
        updatedAt
      }
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
          ruin
          weakPoint
          lightDice
          darkDice
          occupation
          background
          drive
          rituals
          skills
          armorSet
          weaponSet
          foundEquipment
          burdens
          hoard
          gold
          tokens
          hearthfire
          backpack
          conditions
          notes
          hidden
          createdAt
          updatedAt
        }
        nextToken
      }
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
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
export const onUpdateTrophyGoldDiceModuleById = /* GraphQL */ `
  subscription OnUpdateTrophyGoldDiceModuleById($id: String!) {
    onUpdateTrophyGoldDiceModuleById(id: $id) {
      id
      lightDice
      darkDice
      goldDice
      diceMode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldCharacterById = /* GraphQL */ `
  subscription OnUpdateTrophyGoldCharacterById($id: String!) {
    onUpdateTrophyGoldCharacterById(id: $id) {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      weakPoint
      lightDice
      darkDice
      occupation
      background
      drive
      rituals
      skills
      armorSet
      weaponSet
      foundEquipment
      burdens
      hoard
      gold
      tokens
      hearthfire
      backpack
      conditions
      notes
      hidden
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTrophyGoldBeastByGame = /* GraphQL */ `
  subscription OnCreateTrophyGoldBeastByGame($gameID: String!) {
    onCreateTrophyGoldBeastByGame(gameID: $gameID) {
      id
      gameID
      gmModuleID
      endurance
      title
      description
      habit1
      habit2
      habit3
      habit4
      habit5
      habit6
      defenses
      weakness
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldBeastById = /* GraphQL */ `
  subscription OnUpdateTrophyGoldBeastById($id: String!) {
    onUpdateTrophyGoldBeastById(id: $id) {
      id
      gameID
      gmModuleID
      endurance
      title
      description
      habit1
      habit2
      habit3
      habit4
      habit5
      habit6
      defenses
      weakness
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
export const onUpdateSafetyModuleById = /* GraphQL */ `
  subscription OnUpdateSafetyModuleById($id: String!) {
    onUpdateSafetyModuleById(id: $id) {
      id
      xCardActive
      linesAndVeils
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHexMapModuleById = /* GraphQL */ `
  subscription OnUpdateHexMapModuleById($id: String!) {
    onUpdateHexMapModuleById(id: $id) {
      id
      gridConfiguration
      backgroundImages
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
export const onCreateTrophyGoldDiceModule = /* GraphQL */ `
  subscription OnCreateTrophyGoldDiceModule {
    onCreateTrophyGoldDiceModule {
      id
      lightDice
      darkDice
      goldDice
      diceMode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldDiceModule = /* GraphQL */ `
  subscription OnUpdateTrophyGoldDiceModule {
    onUpdateTrophyGoldDiceModule {
      id
      lightDice
      darkDice
      goldDice
      diceMode
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophyGoldDiceModule = /* GraphQL */ `
  subscription OnDeleteTrophyGoldDiceModule {
    onDeleteTrophyGoldDiceModule {
      id
      lightDice
      darkDice
      goldDice
      diceMode
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
      customDice
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
      customDice
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
      rolls
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
            rolls
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
      rolls
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
            rolls
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
      rolls
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
            rolls
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateTrophyGoldRoom = /* GraphQL */ `
  subscription OnCreateTrophyGoldRoom {
    onCreateTrophyGoldRoom {
      id
      name
      diceModule {
        id
        lightDice
        darkDice
        goldDice
        diceMode
        createdAt
        updatedAt
      }
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
          ruin
          weakPoint
          lightDice
          darkDice
          occupation
          background
          drive
          rituals
          skills
          armorSet
          weaponSet
          foundEquipment
          burdens
          hoard
          gold
          tokens
          hearthfire
          backpack
          conditions
          notes
          hidden
          createdAt
          updatedAt
        }
        nextToken
      }
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
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
export const onUpdateTrophyGoldRoom = /* GraphQL */ `
  subscription OnUpdateTrophyGoldRoom {
    onUpdateTrophyGoldRoom {
      id
      name
      diceModule {
        id
        lightDice
        darkDice
        goldDice
        diceMode
        createdAt
        updatedAt
      }
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
          ruin
          weakPoint
          lightDice
          darkDice
          occupation
          background
          drive
          rituals
          skills
          armorSet
          weaponSet
          foundEquipment
          burdens
          hoard
          gold
          tokens
          hearthfire
          backpack
          conditions
          notes
          hidden
          createdAt
          updatedAt
        }
        nextToken
      }
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
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
export const onDeleteTrophyGoldRoom = /* GraphQL */ `
  subscription OnDeleteTrophyGoldRoom {
    onDeleteTrophyGoldRoom {
      id
      name
      diceModule {
        id
        lightDice
        darkDice
        goldDice
        diceMode
        createdAt
        updatedAt
      }
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
          ruin
          weakPoint
          lightDice
          darkDice
          occupation
          background
          drive
          rituals
          skills
          armorSet
          weaponSet
          foundEquipment
          burdens
          hoard
          gold
          tokens
          hearthfire
          backpack
          conditions
          notes
          hidden
          createdAt
          updatedAt
        }
        nextToken
      }
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
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
export const onCreateTrophyGoldGmModule = /* GraphQL */ `
  subscription OnCreateTrophyGoldGmModule($owner: String!) {
    onCreateTrophyGoldGMModule(owner: $owner) {
      id
      gameID
      notes
      createdAt
      updatedAt
      owner
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateTrophyGoldGmModule = /* GraphQL */ `
  subscription OnUpdateTrophyGoldGmModule($owner: String!) {
    onUpdateTrophyGoldGMModule(owner: $owner) {
      id
      gameID
      notes
      createdAt
      updatedAt
      owner
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteTrophyGoldGmModule = /* GraphQL */ `
  subscription OnDeleteTrophyGoldGmModule($owner: String!) {
    onDeleteTrophyGoldGMModule(owner: $owner) {
      id
      gameID
      notes
      createdAt
      updatedAt
      owner
      bestiary {
        items {
          id
          gameID
          gmModuleID
          endurance
          title
          description
          habit1
          habit2
          habit3
          habit4
          habit5
          habit6
          defenses
          weakness
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateTrophyGoldCharacter = /* GraphQL */ `
  subscription OnCreateTrophyGoldCharacter {
    onCreateTrophyGoldCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      weakPoint
      lightDice
      darkDice
      occupation
      background
      drive
      rituals
      skills
      armorSet
      weaponSet
      foundEquipment
      burdens
      hoard
      gold
      tokens
      hearthfire
      backpack
      conditions
      notes
      hidden
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldCharacter = /* GraphQL */ `
  subscription OnUpdateTrophyGoldCharacter {
    onUpdateTrophyGoldCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      weakPoint
      lightDice
      darkDice
      occupation
      background
      drive
      rituals
      skills
      armorSet
      weaponSet
      foundEquipment
      burdens
      hoard
      gold
      tokens
      hearthfire
      backpack
      conditions
      notes
      hidden
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophyGoldCharacter = /* GraphQL */ `
  subscription OnDeleteTrophyGoldCharacter {
    onDeleteTrophyGoldCharacter {
      id
      gameID
      playerName
      characterName
      characterPronouns
      characterImageUrl
      ruin
      weakPoint
      lightDice
      darkDice
      occupation
      background
      drive
      rituals
      skills
      armorSet
      weaponSet
      foundEquipment
      burdens
      hoard
      gold
      tokens
      hearthfire
      backpack
      conditions
      notes
      hidden
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTrophyGoldBeast = /* GraphQL */ `
  subscription OnCreateTrophyGoldBeast {
    onCreateTrophyGoldBeast {
      id
      gameID
      gmModuleID
      endurance
      title
      description
      habit1
      habit2
      habit3
      habit4
      habit5
      habit6
      defenses
      weakness
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophyGoldBeast = /* GraphQL */ `
  subscription OnUpdateTrophyGoldBeast {
    onUpdateTrophyGoldBeast {
      id
      gameID
      gmModuleID
      endurance
      title
      description
      habit1
      habit2
      habit3
      habit4
      habit5
      habit6
      defenses
      weakness
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophyGoldBeast = /* GraphQL */ `
  subscription OnDeleteTrophyGoldBeast {
    onDeleteTrophyGoldBeast {
      id
      gameID
      gmModuleID
      endurance
      title
      description
      habit1
      habit2
      habit3
      habit4
      habit5
      habit6
      defenses
      weakness
      createdAt
      updatedAt
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
        customDice
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
        rolls
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
        customDice
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
        rolls
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
        customDice
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
        rolls
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
        rolls
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
        rolls
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
        rolls
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
