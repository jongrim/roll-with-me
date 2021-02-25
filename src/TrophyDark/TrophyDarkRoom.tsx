import * as React from 'react';
import { Box, Container, Flex, useToast } from '@chakra-ui/react';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion';
import useTrophyRoomLookup from './useTrophyRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, actions, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import CharacterChoice from './CharacterChoice';
import TrophyDarkGameArea from './TrophyDarkGameArea';
import CharacterForm from './CharacterForm';
import { TrophyDarkCharacter } from '../APITypes';
import TrophyQuote from './TrophyQuote';

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
  id: 'trophyDarkGameLoad',
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
        NEW: 'NEW',
        CHOOSE: {
          target: 'PLAYING',
          actions: assign({
            characterChoice: (ctx, event) => event.value,
          }),
        },
      },
    },
    NEW: {
      on: {
        CREATE: {
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

interface TDarkProps {
  name: string;
}

const TrophyDarkRoom = ({ name }: TDarkProps) => {
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
  const [characters, setCharacters] = React.useState<TrophyDarkCharacter[]>([]);
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
              onDone={(character: string) => {
                switch (character) {
                  case GM:
                    send('GM');
                    break;
                  case NEW_CHARACTER:
                    send('NEW');
                    break;
                  default:
                    try {
                      API.graphql({
                        query: mutations.updateTrophyDarkCharacter,
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
              <TrophyQuote />
            </motion.div>
          </AnimateSharedLayout>
        </Flex>
      );
    case 'NEW':
      if (!data?.id) {
        throw new Error('no game module loaded');
      }
      return (
        <Box h="full" overflow="auto">
          <Flex
            direction="column"
            fontFamily="Roboto Slab"
            alignItems="center"
            justifyContent="center"
            py={12}
            minH="full"
            overflow="auto"
          >
            <Container maxW="4xl">
              <CharacterForm
                submitText="Begin Your Journey"
                onDone={async (character) => {
                  try {
                    // @ts-ignore
                    const { data: createdCharacter } = await API.graphql({
                      query: mutations.createTrophyDarkCharacter,
                      variables: {
                        input: {
                          gameID: data?.id,
                          playerName: username,
                          ...character,
                        },
                      },
                    });
                    toast({
                      status: 'success',
                      title: 'Character created',
                      isClosable: true,
                      duration: 3000,
                    });
                    send('CREATE', {
                      value: createdCharacter?.createTrophyDarkCharacter?.id,
                    });
                  } catch (e) {
                    let errorMessage = 'Check your values and try again';
                    if (e.errors[0]?.message?.includes('valid URL')) {
                      errorMessage =
                        'The image URL you provided is not valid. Either remove it or provide a different one.';
                    }
                    toast({
                      status: 'error',
                      title: 'Unable to create character',
                      description: errorMessage,
                      isClosable: true,
                      duration: 5000,
                    });
                  }
                }}
              />
            </Container>
          </Flex>
        </Box>
      );
    case 'PLAYING':
      return (
        <TrophyDarkGameArea
          name={name}
          username={username}
          setUsername={setUsername}
          characters={characters}
          characterChoice={state.context.characterChoice}
          lightDice={data?.lightDice ?? []}
          darkDice={data?.darkDice ?? []}
          id={data?.id ?? ''}
          safetyModuleId={data?.safetyModule?.id ?? ''}
        />
      );
    default:
      return <Box>oh no!</Box>;
  }
};

export default TrophyDarkRoom;
