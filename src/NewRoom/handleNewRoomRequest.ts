import {
  CreateTextRoomMutation,
  CreateSafetyModuleMutation,
  CreateInteractiveRoomMutation,
  CreateTrophyDarkRoomMutation,
} from '../API';
import gql from '../gql';
import * as mutations from '../graphql/mutations';

export const handleNewRoomRequest = async (
  type: 'r' | 'i' | 'trophy-dark',
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
    if (type === 'r') {
      await gql<CreateTextRoomMutation>(mutations.createTextRoom, {
        name,
        rolls: [],
        textRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
      });
    }
    if (type === 'i') {
      await gql<CreateInteractiveRoomMutation>(
        mutations.createInteractiveRoom,
        {
          name,
          interactiveRoomSafetyModuleId:
            newSafetyModule.data?.createSafetyModule?.id,
        }
      );
    }
    if (type === 'trophy-dark') {
      await gql<CreateTrophyDarkRoomMutation>(mutations.createTrophyDarkRoom, {
        name,
        trophyDarkRoomSafetyModuleId:
          newSafetyModule.data?.createSafetyModule?.id,
        lightDice: [],
        darkDice: [],
      });
    }
  } catch (e) {
    console.warn('could not create room', e);
  }
};
