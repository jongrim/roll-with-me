import * as React from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion';
import useTrophyRoomLookup from './useTrophyRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, actions, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import CharacterChoice from './CharacterChoice';
import TrophyGoldGameArea from './TrophyGoldGameArea';
import { RawTrophyGoldCharacter } from '../APITypes';
import DesignedForTrophyGold from './DesignedForTrophyGold';
import { CreateTrophyGoldCharacterInput } from '../API';

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
  const [state, send] = useMachine(
    gameLoadMachine.withContext({
      initTime: Date.now(),
      delay: 2000,
      characterChoice: 'unset',
    }),
    {
      services: {
        transition: async () => {
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
  const [characters, setCharacters] = React.useState<RawTrophyGoldCharacter[]>(
    []
  );
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    if (data) {
      send('LOAD');
      setCharacters(data?.characters?.items ?? []);
    }
  }, [data, send]);

  React.useEffect(() => {
    if (!data?.id) return;
    const newCharacterSubscription = API.graphql({
      query: subscriptions.onCreateTrophyDarkCharacterByGame,
      variables: {
        gameID: data.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setCharacters((cur) =>
          cur.concat(value.data.onCreateTrophyDarkCharacterByGame)
        );
      },
    });
    return () => newCharacterSubscription.unsubscribe();
  }, [data?.id]);

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
            <CharacterChoice
              characters={data?.characters}
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
                      notes: JSON.stringify({}),
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
                    try {
                      API.graphql({
                        query: mutations.updateTrophyGoldCharacter,
                        variables: {
                          input: {
                            id: character,
                            playerName: username,
                          },
                        },
                      });
                    } catch (e) {
                      console.warn(e);
                    }
                    send('CHOOSE', {
                      value: character,
                    });
                }
              }}
            />
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
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
          characters={characters}
          characterChoice={state.context.characterChoice}
          gameData={data!}
        />
      );
    default:
      return <Box>oh no!</Box>;
  }
};

export default TrophyGoldRoom;
