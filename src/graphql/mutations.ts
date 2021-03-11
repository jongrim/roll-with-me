/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrophyDarkRoom = /* GraphQL */ `
  mutation CreateTrophyDarkRoom(
    $input: CreateTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    createTrophyDarkRoom(input: $input, condition: $condition) {
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
export const updateTrophyDarkRoom = /* GraphQL */ `
  mutation UpdateTrophyDarkRoom(
    $input: UpdateTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    updateTrophyDarkRoom(input: $input, condition: $condition) {
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
export const deleteTrophyDarkRoom = /* GraphQL */ `
  mutation DeleteTrophyDarkRoom(
    $input: DeleteTrophyDarkRoomInput!
    $condition: ModelTrophyDarkRoomConditionInput
  ) {
    deleteTrophyDarkRoom(input: $input, condition: $condition) {
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
export const createTrophyDarkCharacter = /* GraphQL */ `
  mutation CreateTrophyDarkCharacter(
    $input: CreateTrophyDarkCharacterInput!
    $condition: ModelTrophyDarkCharacterConditionInput
  ) {
    createTrophyDarkCharacter(input: $input, condition: $condition) {
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
export const updateTrophyDarkCharacter = /* GraphQL */ `
  mutation UpdateTrophyDarkCharacter(
    $input: UpdateTrophyDarkCharacterInput!
    $condition: ModelTrophyDarkCharacterConditionInput
  ) {
    updateTrophyDarkCharacter(input: $input, condition: $condition) {
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
export const deleteTrophyDarkCharacter = /* GraphQL */ `
  mutation DeleteTrophyDarkCharacter(
    $input: DeleteTrophyDarkCharacterInput!
    $condition: ModelTrophyDarkCharacterConditionInput
  ) {
    deleteTrophyDarkCharacter(input: $input, condition: $condition) {
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
export const createTextRoom = /* GraphQL */ `
  mutation CreateTextRoom(
    $input: CreateTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    createTextRoom(input: $input, condition: $condition) {
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
export const updateTextRoom = /* GraphQL */ `
  mutation UpdateTextRoom(
    $input: UpdateTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    updateTextRoom(input: $input, condition: $condition) {
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
export const deleteTextRoom = /* GraphQL */ `
  mutation DeleteTextRoom(
    $input: DeleteTextRoomInput!
    $condition: ModelTextRoomConditionInput
  ) {
    deleteTextRoom(input: $input, condition: $condition) {
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
export const createTrophyGoldRoom = /* GraphQL */ `
  mutation CreateTrophyGoldRoom(
    $input: CreateTrophyGoldRoomInput!
    $condition: ModelTrophyGoldRoomConditionInput
  ) {
    createTrophyGoldRoom(input: $input, condition: $condition) {
      id
      name
      bestiary
      lightDice
      darkDice
      goldDice
      diceMode
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
          combatEquipment
          foundEquipment
          burdens
          hoard
          gold
          tokens
          training
          household
          library
          backpack
          conditions
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
export const updateTrophyGoldRoom = /* GraphQL */ `
  mutation UpdateTrophyGoldRoom(
    $input: UpdateTrophyGoldRoomInput!
    $condition: ModelTrophyGoldRoomConditionInput
  ) {
    updateTrophyGoldRoom(input: $input, condition: $condition) {
      id
      name
      bestiary
      lightDice
      darkDice
      goldDice
      diceMode
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
          combatEquipment
          foundEquipment
          burdens
          hoard
          gold
          tokens
          training
          household
          library
          backpack
          conditions
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
export const deleteTrophyGoldRoom = /* GraphQL */ `
  mutation DeleteTrophyGoldRoom(
    $input: DeleteTrophyGoldRoomInput!
    $condition: ModelTrophyGoldRoomConditionInput
  ) {
    deleteTrophyGoldRoom(input: $input, condition: $condition) {
      id
      name
      bestiary
      lightDice
      darkDice
      goldDice
      diceMode
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
          combatEquipment
          foundEquipment
          burdens
          hoard
          gold
          tokens
          training
          household
          library
          backpack
          conditions
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
export const createTrophyGoldCharacter = /* GraphQL */ `
  mutation CreateTrophyGoldCharacter(
    $input: CreateTrophyGoldCharacterInput!
    $condition: ModelTrophyGoldCharacterConditionInput
  ) {
    createTrophyGoldCharacter(input: $input, condition: $condition) {
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
      combatEquipment
      foundEquipment
      burdens
      hoard
      gold
      tokens
      training
      household
      library
      backpack
      conditions
      notes
      createdAt
      updatedAt
    }
  }
`;
export const updateTrophyGoldCharacter = /* GraphQL */ `
  mutation UpdateTrophyGoldCharacter(
    $input: UpdateTrophyGoldCharacterInput!
    $condition: ModelTrophyGoldCharacterConditionInput
  ) {
    updateTrophyGoldCharacter(input: $input, condition: $condition) {
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
      combatEquipment
      foundEquipment
      burdens
      hoard
      gold
      tokens
      training
      household
      library
      backpack
      conditions
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrophyGoldCharacter = /* GraphQL */ `
  mutation DeleteTrophyGoldCharacter(
    $input: DeleteTrophyGoldCharacterInput!
    $condition: ModelTrophyGoldCharacterConditionInput
  ) {
    deleteTrophyGoldCharacter(input: $input, condition: $condition) {
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
      combatEquipment
      foundEquipment
      burdens
      hoard
      gold
      tokens
      training
      household
      library
      backpack
      conditions
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createHeartRoom = /* GraphQL */ `
  mutation CreateHeartRoom(
    $input: CreateHeartRoomInput!
    $condition: ModelHeartRoomConditionInput
  ) {
    createHeartRoom(input: $input, condition: $condition) {
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
export const updateHeartRoom = /* GraphQL */ `
  mutation UpdateHeartRoom(
    $input: UpdateHeartRoomInput!
    $condition: ModelHeartRoomConditionInput
  ) {
    updateHeartRoom(input: $input, condition: $condition) {
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
export const deleteHeartRoom = /* GraphQL */ `
  mutation DeleteHeartRoom(
    $input: DeleteHeartRoomInput!
    $condition: ModelHeartRoomConditionInput
  ) {
    deleteHeartRoom(input: $input, condition: $condition) {
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
export const createHeartCharacter = /* GraphQL */ `
  mutation CreateHeartCharacter(
    $input: CreateHeartCharacterInput!
    $condition: ModelHeartCharacterConditionInput
  ) {
    createHeartCharacter(input: $input, condition: $condition) {
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
export const updateHeartCharacter = /* GraphQL */ `
  mutation UpdateHeartCharacter(
    $input: UpdateHeartCharacterInput!
    $condition: ModelHeartCharacterConditionInput
  ) {
    updateHeartCharacter(input: $input, condition: $condition) {
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
export const deleteHeartCharacter = /* GraphQL */ `
  mutation DeleteHeartCharacter(
    $input: DeleteHeartCharacterInput!
    $condition: ModelHeartCharacterConditionInput
  ) {
    deleteHeartCharacter(input: $input, condition: $condition) {
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
export const createUserRoom = /* GraphQL */ `
  mutation CreateUserRoom(
    $input: CreateUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    createUserRoom(input: $input, condition: $condition) {
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
export const updateUserRoom = /* GraphQL */ `
  mutation UpdateUserRoom(
    $input: UpdateUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    updateUserRoom(input: $input, condition: $condition) {
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
export const deleteUserRoom = /* GraphQL */ `
  mutation DeleteUserRoom(
    $input: DeleteUserRoomInput!
    $condition: ModelUserRoomConditionInput
  ) {
    deleteUserRoom(input: $input, condition: $condition) {
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
export const createSafetyItem = /* GraphQL */ `
  mutation CreateSafetyItem(
    $input: CreateSafetyItemInput!
    $condition: ModelSafetyItemConditionInput
  ) {
    createSafetyItem(input: $input, condition: $condition) {
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
export const updateSafetyItem = /* GraphQL */ `
  mutation UpdateSafetyItem(
    $input: UpdateSafetyItemInput!
    $condition: ModelSafetyItemConditionInput
  ) {
    updateSafetyItem(input: $input, condition: $condition) {
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
export const deleteSafetyItem = /* GraphQL */ `
  mutation DeleteSafetyItem(
    $input: DeleteSafetyItemInput!
    $condition: ModelSafetyItemConditionInput
  ) {
    deleteSafetyItem(input: $input, condition: $condition) {
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
export const createHexMapModule = /* GraphQL */ `
  mutation CreateHexMapModule(
    $input: CreateHexMapModuleInput!
    $condition: ModelHexMapModuleConditionInput
  ) {
    createHexMapModule(input: $input, condition: $condition) {
      id
      gridConfiguration
      backgroundImages
      createdAt
      updatedAt
    }
  }
`;
export const updateHexMapModule = /* GraphQL */ `
  mutation UpdateHexMapModule(
    $input: UpdateHexMapModuleInput!
    $condition: ModelHexMapModuleConditionInput
  ) {
    updateHexMapModule(input: $input, condition: $condition) {
      id
      gridConfiguration
      backgroundImages
      createdAt
      updatedAt
    }
  }
`;
export const deleteHexMapModule = /* GraphQL */ `
  mutation DeleteHexMapModule(
    $input: DeleteHexMapModuleInput!
    $condition: ModelHexMapModuleConditionInput
  ) {
    deleteHexMapModule(input: $input, condition: $condition) {
      id
      gridConfiguration
      backgroundImages
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
