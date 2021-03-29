import * as React from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion';
import useTrophyRoomLookup from './useTrophyRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, actions, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import CharacterChoice from './CharacterChoice';
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

const { send } = actions;

const sendLoadAfter1Second = send('LOAD', { delay: 1000 });

const delayPassed = (context: { initTime: number; delay: number }) => {
  return Date.now() > context.initTime + context.delay;
};

// @ts-ignore
const gameLoadMachine = Machine<{
  initTime: number;
  delay: number;
  characterChoice: string;
}>({
  id: 'trophyGoldGameLoad',
  initial: 'loading',
  context: {
    initTime: 0,
    delay: 6000,
    characterChoice: 'unset',
  },
  states: {
    loading: {
      on: {
        LOAD: [{ target: 'moving', cond: delayPassed }, { target: 'delayed' }],
      },
    },
    delayed: {
      // @ts-ignore
      entry: sendLoadAfter1Second,
      on: {
        LOAD: [{ target: 'moving', cond: delayPassed }, { target: 'delayed' }],
      },
    },
    moving: {
      invoke: {
        src: 'transition',
        onDone: {
          target: 'choosing',
        },
      },
    },
    choosing: {
      on: {
        GM: {
          target: 'PLAYING',
          actions: assign({
            characterChoice: () => 'GM',
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
  const optionsControls = useAnimation();
  const spacerControls = useAnimation();
  const [state, send] = useMachine(
    gameLoadMachine.withContext({
      initTime: Date.now(),
      delay: 2000,
      characterChoice: 'unset',
    }),
    {
      services: {
        transition: async () => {
          spacerControls.start({
            flex: 1,
            transition: { duration: 1.5 },
          });
          await optionsControls.start({
            height: 'auto',
            transition: { duration: 1.5 },
          });
          await optionsControls.start({
            opacity: 1,
            transition: { duration: 1.5 },
          });
          return;
        },
      },
    }
  );
  const { data } = useTrophyRoomLookup(name);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    if (data && state.value === 'loading') {
      send('LOAD');
    }
  }, [data, send, state.value]);

  const trackedCharacters = useCharacterSubscription({
    characters: data?.characters.items ?? [],
    gameId: data?.id,
  });
  const trackedBeasts = useBeastSubscription({
    beasts: data?.bestiary.items ?? [],
    gameID: data?.id,
  });

  switch (state.value) {
    case 'loading':
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
          <AnimateSharedLayout>
            {state.value !== 'loading' && (
              <CharacterChoice
                characters={trackedCharacters}
                username={username}
                setUsername={setUsername}
                controls={optionsControls}
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
                        foundEquipment: createEmptyFoundEquipmentList().map(
                          (i) => JSON.stringify(i)
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
            )}
            <motion.div
              layout
              initial={{ flex: 0 }}
              animate={spacerControls}
            ></motion.div>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1 },
              }}
            >
              <DesignedForTrophyGold />
            </motion.div>
          </AnimateSharedLayout>
        </Flex>
      );
    case 'PLAYING':
      return (
        <TrophyGoldGameArea
          username={username}
          setUsername={setUsername}
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
