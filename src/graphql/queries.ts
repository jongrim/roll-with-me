/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrophyDarkRoom = /* GraphQL */ `
  query GetTrophyDarkRoom($id: ID!) {
    getTrophyDarkRoom(id: $id) {
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
      nextToken
    }
  }
`;
export const getTrophyDarkCharacter = /* GraphQL */ `
  query GetTrophyDarkCharacter($id: ID!) {
    getTrophyDarkCharacter(id: $id) {
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
export const listTrophyDarkCharacters = /* GraphQL */ `
  query ListTrophyDarkCharacters(
    $filter: ModelTrophyDarkCharacterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyDarkCharacters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getTrophyGoldDiceModule = /* GraphQL */ `
  query GetTrophyGoldDiceModule($id: ID!) {
    getTrophyGoldDiceModule(id: $id) {
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
export const listTrophyGoldDiceModules = /* GraphQL */ `
  query ListTrophyGoldDiceModules(
    $filter: ModelTrophyGoldDiceModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyGoldDiceModules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        lightDice
        darkDice
        goldDice
        diceMode
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
      nextToken
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
      nextToken
    }
  }
`;
export const getTextRoom = /* GraphQL */ `
  query GetTextRoom($id: ID!) {
    getTextRoom(id: $id) {
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
      nextToken
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
      nextToken
    }
  }
`;
export const getInteractiveRoom = /* GraphQL */ `
  query GetInteractiveRoom($id: ID!) {
    getInteractiveRoom(id: $id) {
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
      nextToken
    }
  }
`;
export const getTrophyGoldRoom = /* GraphQL */ `
  query GetTrophyGoldRoom($id: ID!) {
    getTrophyGoldRoom(id: $id) {
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
          armorSet
          weaponSet
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
export const listTrophyGoldRooms = /* GraphQL */ `
  query ListTrophyGoldRooms(
    $filter: ModelTrophyGoldRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyGoldRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
            armorSet
            weaponSet
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
      nextToken
    }
  }
`;
export const trophyGoldRoomByName = /* GraphQL */ `
  query TrophyGoldRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelTrophyGoldRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    trophyGoldRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            armorSet
            weaponSet
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
      nextToken
    }
  }
`;
export const getTrophyGoldGmModule = /* GraphQL */ `
  query GetTrophyGoldGmModule($id: ID!) {
    getTrophyGoldGMModule(id: $id) {
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
export const listTrophyGoldGmModules = /* GraphQL */ `
  query ListTrophyGoldGmModules(
    $filter: ModelTrophyGoldGMModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyGoldGMModules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const goldGmByGameId = /* GraphQL */ `
  query GoldGmByGameId(
    $gameID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTrophyGoldGMModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goldGMByGameID(
      gameID: $gameID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTrophyGoldCharacter = /* GraphQL */ `
  query GetTrophyGoldCharacter($id: ID!) {
    getTrophyGoldCharacter(id: $id) {
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
      armorSet
      weaponSet
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
export const listTrophyGoldCharacters = /* GraphQL */ `
  query ListTrophyGoldCharacters(
    $filter: ModelTrophyGoldCharacterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyGoldCharacters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        armorSet
        weaponSet
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
  }
`;
export const getTrophyGoldBeast = /* GraphQL */ `
  query GetTrophyGoldBeast($id: ID!) {
    getTrophyGoldBeast(id: $id) {
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
export const listTrophyGoldBeasts = /* GraphQL */ `
  query ListTrophyGoldBeasts(
    $filter: ModelTrophyGoldBeastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophyGoldBeasts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getHeartRoom = /* GraphQL */ `
  query GetHeartRoom($id: ID!) {
    getHeartRoom(id: $id) {
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
export const listHeartRooms = /* GraphQL */ `
  query ListHeartRooms(
    $filter: ModelHeartRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeartRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const heartRoomByName = /* GraphQL */ `
  query HeartRoomByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelHeartRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    heartRoomByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getHeartCharacter = /* GraphQL */ `
  query GetHeartCharacter($id: ID!) {
    getHeartCharacter(id: $id) {
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
export const listHeartCharacters = /* GraphQL */ `
  query ListHeartCharacters(
    $filter: ModelHeartCharacterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeartCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getUserRoom = /* GraphQL */ `
  query GetUserRoom($id: ID!) {
    getUserRoom(id: $id) {
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
export const listUserRooms = /* GraphQL */ `
  query ListUserRooms(
    $filter: ModelUserRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trophyDarkRoom {
          id
          name
          lightDice
          darkDice
          characters {
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
            nextToken
          }
          counters {
            nextToken
          }
          dice {
            nextToken
          }
        }
        owner
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
export const getSafetyItem = /* GraphQL */ `
  query GetSafetyItem($id: ID!) {
    getSafetyItem(id: $id) {
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
export const listSafetyItems = /* GraphQL */ `
  query ListSafetyItems(
    $filter: ModelSafetyItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSafetyItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        classification
        note
        createdAt
        updatedAt
        owner
      }
      nextToken
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
export const listHexMapModules = /* GraphQL */ `
  query ListHexMapModules(
    $filter: ModelHexMapModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHexMapModules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gridConfiguration
        backgroundImages
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHexMapModule = /* GraphQL */ `
  query GetHexMapModule($id: ID!) {
    getHexMapModule(id: $id) {
      id
      gridConfiguration
      backgroundImages
      createdAt
      updatedAt
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
            nextToken
          }
          counters {
            nextToken
          }
          dice {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
