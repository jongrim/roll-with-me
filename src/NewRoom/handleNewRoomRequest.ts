import {
  CreateTextRoomMutation,
  CreateSafetyModuleMutation,
  CreateInteractiveRoomMutation,
  CreateTrophyDarkRoomMutation,
  CreateHeartRoomMutation,
} from '../API';
import gql from '../gql';
import * as mutations from '../graphql/mutations';
import { roomCodes, roomPathCodes } from '../roomPaths';

export const handleNewRoomRequest = async (
  type: roomPathCodes,
  name: string
) => {
  try {
    // check if room exists?
    const newSafetyModule = await gql<CreateSafetyModuleMutation>(
      mutations.createSafetyModule,
      {
        xCardActive: false,
        linesAndVeils: [],
      }
    );
    if (type === roomCodes.text) {
      await gql<CreateTextRoomMutation>(mutations.createTextRoom, {
        name,
        rolls: [],
        textRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
      });
    }
    if (type === roomCodes.visual) {
      await gql<CreateInteractiveRoomMutation>(
        mutations.createInteractiveRoom,
        {
          name,
          interactiveRoomSafetyModuleId:
            newSafetyModule.data?.createSafetyModule?.id,
        }
      );
    }
    if (type === roomCodes.trophyDark) {
      await gql<CreateTrophyDarkRoomMutation>(mutations.createTrophyDarkRoom, {
        name,
        trophyDarkRoomSafetyModuleId:
          newSafetyModule.data?.createSafetyModule?.id,
        lightDice: [],
        darkDice: [],
      });
    }
    if (type === roomCodes.heart) {
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
  } catch (e) {
    console.warn('could not create room', e);
  }
};
