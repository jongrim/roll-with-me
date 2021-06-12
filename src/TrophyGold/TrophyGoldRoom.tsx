import * as React from 'react';
import { Box, Flex, Spinner, useToast } from '@chakra-ui/react';
import useTrophyRoomLookup from './useTrophyRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import CharacterChoice from '../Common/CharacterChoice/CharacterChoiceCard';
import TrophyGoldGameArea from './TrophyGoldGameArea';
import DesignedForTrophyGold from './DesignedForTrophyGold';
import { CreateTrophyGoldCharacterInput } from '../API';
import useCharacterSubscription from './useCharacterSubscription';
import {
  createEmptyArmorSet,
  createEmptyBackpack,
  createEmptyFoundEquipmentList,
  createEmptyWeaponSet,
} from './TrophyGoldGameTypes';
import useBeastSubscription from './useBeastSubscription';

export const NEW_CHARACTER = 'NEW';
export const GM = 'GM';

// @ts-ignore
const gameLoadMachine = Machine<{
  characterChoice: string;
}>({
  id: 'trophyGoldGameLoad',
  initial: 'loading',
  context: {
    characterChoice: 'unset',
  },
  states: {
    loading: {
      on: {
        LOAD: { target: 'choosing' },
      },
    },
    choosing: {
      on: {
        GM: {
          target: 'PLAYING',
          actions: assign({
            characterChoice: () => GM,
          }),
        },
        CHOOSE: {
          target: 'PLAYING',
          actions: assign({
            characterChoice: (ctx, event) => event.value,
          }),
        },
      },
    },
    PLAYING: {
      type: 'final',
    },
  },
});

interface TGoldProps {
  name: string;
}

const TrophyGoldRoom = ({ name }: TGoldProps) => {
  const toast = useToast();
  const [state, send] = useMachine(
    gameLoadMachine.withContext({
      characterChoice: 'unset',
    })
  );
  const { data } = useTrophyRoomLookup(name);
  const [username, setUsername] = React.useState('');

  const updateUsername = (name: string) => {
    try {
      API.graphql({
        query: mutations.updateTrophyGoldCharacter,
        variables: {
          id: state.context.characterChoice,
          playerName: name,
        },
      });
    } catch (e) {
      console.warn(e);
    }
    setUsername(name);
  };

  React.useEffect(() => {
    if (data && state.value === 'loading') {
      send('LOAD');
    }
  }, [data, send, state.value]);

  const characters = React.useMemo(() => {
    return data?.characters.items ?? [];
  }, [data?.characters?.items]);

  const trackedCharacters = useCharacterSubscription({
    characters,
    gameId: data?.id,
  });

  const beasts = React.useMemo(() => {
    return data?.bestiary.items ?? [];
  }, [data?.bestiary?.items]);

  const trackedBeasts = useBeastSubscription({
    beasts: beasts ?? [],
    gameID: data?.id,
  });

  switch (state.value) {
    case 'loading':
      return (
        <Flex
          direction="column"
          fontFamily="Roboto Slab"
          alignItems="center"
          justifyContent="center"
          minH="full"
        >
          <Spinner />
        </Flex>
      );
    case 'delayed':
    case 'moving':
    case 'choosing':
      return (
        <Flex
          direction="column"
          fontFamily="Roboto Slab"
          alignItems="center"
          justifyContent="center"
          minH="full"
        >
          <CharacterChoice
            characters={trackedCharacters}
            username={username}
            setUsername={setUsername}
            onDone={async (character: string) => {
              switch (character) {
                case GM:
                  send('GM');
                  break;
                case NEW_CHARACTER:
                  if (!data?.id) {
                    throw new Error('no game loaded');
                  }
                  const newCharacter: CreateTrophyGoldCharacterInput = {
                    gameID: data.id,
                    playerName: username,
                    ruin: 0,
                    burdens: 0,
                    hoard: 0,
                    gold: 0,
                    tokens: 0,
                    backpack: JSON.stringify(createEmptyBackpack()),
                    armorSet: JSON.stringify(createEmptyArmorSet()),
                    weaponSet: JSON.stringify(createEmptyWeaponSet()),
                    foundEquipment: createEmptyFoundEquipmentList().map((i) =>
                      JSON.stringify(i)
                    ),
                    conditions: '',
                    notes: '',
                  };
                  // @ts-ignore
                  const { data: createdCharacter } = await API.graphql({
                    query: mutations.createTrophyGoldCharacter,
                    variables: {
                      input: newCharacter,
                    },
                  });
                  toast({
                    status: 'success',
                    title: 'Character created',
                    isClosable: true,
                    duration: 3000,
                  });
                  send('CHOOSE', {
                    value: createdCharacter?.createTrophyGoldCharacter?.id,
                  });
                  break;
                default:
                  const playerName = trackedCharacters.find(
                    (c) => c.id === character
                  )?.playerName;
                  setUsername(playerName || 'Unable to load username');
                  send('CHOOSE', {
                    value: character,
                  });
              }
            }}
          />
          <DesignedForTrophyGold />
        </Flex>
      );
    case 'PLAYING':
      return (
        <TrophyGoldGameArea
          username={username}
          setUsername={updateUsername}
          beasts={trackedBeasts}
          characters={trackedCharacters}
          characterChoice={state.context.characterChoice}
          gameData={data!}
        />
      );
    default:
      return <Box>oh no!</Box>;
  }
};

export default TrophyGoldRoom;
