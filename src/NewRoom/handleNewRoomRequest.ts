import { isAfter, add, parseISO } from 'date-fns';
import { API } from 'aws-amplify';
import {
  CreateTextRoomMutation,
  CreateSafetyModuleMutation,
  CreateInteractiveRoomMutation,
  CreateTrophyDarkRoomMutation,
  CreateHeartRoomMutation,
  CreateTrophyGoldRoomMutation,
  CreateTrophyGoldDiceModuleMutation,
} from '../API';
import gql from '../gql';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { roomCodes, roomPathCodes } from '../roomPaths';

const sixMonthsAgo = add(new Date(), { months: -6 });

export const handleNewRoomRequest = async (
  type: roomPathCodes,
  name: string
) => {
  if (type === roomCodes.text) {
    return handleTextRoomRequest(name);
  }
  if (type === roomCodes.visual) {
    return handleInteractiveRoomRequest(name);
  }
  if (type === roomCodes.trophyDark) {
    return handleTrophyDarkRoomRequest(name);
  }
  if (type === roomCodes.heart) {
    return handleHeartRoomRequest(name);
  }
  if (type === roomCodes.trophyGold) {
    return handleTrophyGoldRoomRequest(name);
  }
};

async function getNewSafetyModule() {
  return gql<CreateSafetyModuleMutation>(mutations.createSafetyModule, {
    xCardActive: false,
    linesAndVeils: [],
  });
}

async function handleTextRoomRequest(name: string) {
  const result = await API.graphql({
    query: queries.textRoomByName,
    variables: {
      name,
    },
  });
  // @ts-ignore
  const existingRoom = result?.data?.textRoomByName?.items[0];
  if (existingRoom) {
    const lastUsedDate = parseISO(existingRoom?.updatedAt);
    if (isAfter(lastUsedDate, sixMonthsAgo)) {
      throw new Error('room exists');
    } else {
      await API.graphql({
        query: mutations.deleteTextRoom,
        variables: {
          input: {
            id: existingRoom.id,
          },
        },
      });
    }
  }
  const newSafetyModule = await getNewSafetyModule();
  await gql<CreateTextRoomMutation>(mutations.createTextRoom, {
    name,
    rolls: [],
    textRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
  });
}

async function handleInteractiveRoomRequest(name: string) {
  const result = await API.graphql({
    query: queries.interactiveRoomByName,
    variables: {
      name,
    },
  });
  // @ts-ignore
  const existingRoom = result?.data?.interactiveRoomByName?.items[0];
  if (existingRoom) {
    const lastUsedDate = parseISO(existingRoom?.updatedAt);
    if (isAfter(lastUsedDate, sixMonthsAgo)) {
      throw new Error('room exists');
    } else {
      await API.graphql({
        query: mutations.deleteInteractiveRoom,
        variables: {
          input: {
            id: existingRoom.id,
          },
        },
      });
    }
  }
  const newSafetyModule = await getNewSafetyModule();
  await gql<CreateInteractiveRoomMutation>(mutations.createInteractiveRoom, {
    name,
    interactiveRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
  });
}

async function handleTrophyDarkRoomRequest(name: string) {
  const result = await API.graphql({
    query: queries.trophyDarkRoomByName,
    variables: {
      name,
    },
  });
  // @ts-ignore
  const existingRoom = result?.data?.trophyDarkRoomByName?.items[0];
  if (existingRoom) {
    const lastUsedDate = parseISO(existingRoom?.updatedAt);
    if (isAfter(lastUsedDate, sixMonthsAgo)) {
      throw new Error('room exists');
    } else {
      await API.graphql({
        query: mutations.deleteTrophyDarkRoom,
        variables: {
          input: {
            id: existingRoom.id,
          },
        },
      });
    }
  }
  const newSafetyModule = await getNewSafetyModule();
  await gql<CreateTrophyDarkRoomMutation>(mutations.createTrophyDarkRoom, {
    name,
    trophyDarkRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
    lightDice: [],
    darkDice: [],
  });
}

async function handleHeartRoomRequest(name: string) {
  const result = await API.graphql({
    query: queries.heartRoomByName,
    variables: {
      name,
    },
  });
  // @ts-ignore
  const existingRoom = result?.data?.heartRoomByName?.items[0];
  if (existingRoom) {
    const lastUsedDate = parseISO(existingRoom?.updatedAt);
    if (isAfter(lastUsedDate, sixMonthsAgo)) {
      throw new Error('room exists');
    } else {
      await API.graphql({
        query: mutations.deleteHeartRoom,
        variables: {
          input: {
            id: existingRoom.id,
          },
        },
      });
    }
  }
  const newSafetyModule = await getNewSafetyModule();
  await gql<CreateHeartRoomMutation>(mutations.createHeartRoom, {
    name,
    heartRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
    d4Dice: [],
    d6Dice: [],
    d8Dice: [],
    d10Dice: [],
    d12Dice: [],
  });
}

async function getNewTrophyGoldDice() {
  return gql<CreateTrophyGoldDiceModuleMutation>(
    mutations.createTrophyGoldDiceModule,
    {
      lightDice: [],
      darkDice: [],
      goldDice: [],
      diceMode: 'hunt',
    }
  );
}

async function handleTrophyGoldRoomRequest(name: string) {
  const result = await API.graphql({
    query: queries.trophyGoldRoomByName,
    variables: {
      name,
    },
  });
  // @ts-ignore
  const existingRoom = result?.data?.trophyGoldRoomByName?.items[0];
  if (existingRoom) {
    const lastUsedDate = parseISO(existingRoom?.updatedAt);
    if (isAfter(lastUsedDate, sixMonthsAgo)) {
      throw new Error('room exists');
    } else {
      await API.graphql({
        query: mutations.deleteTrophyGoldRoom,
        variables: {
          input: {
            id: existingRoom.id,
          },
        },
      });
    }
  }
  const newSafetyModule = await getNewSafetyModule();
  const diceModule = await getNewTrophyGoldDice();
  await gql<CreateTrophyGoldRoomMutation>(mutations.createTrophyGoldRoom, {
    name,
    trophyGoldRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
    trophyGoldRoomDiceModuleId: diceModule.data?.createTrophyGoldDiceModule?.id,
  });
}
