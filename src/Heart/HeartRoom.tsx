import * as React from 'react';
import { Box, Container, Flex, Image, useToast } from '@chakra-ui/react';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion';
import useHeartRoomLookup from './useHeartRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, actions, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import CharacterChoiceCard from '../Common/CharacterChoice/CharacterChoiceCard';
import HeartGameArea from './HeartGameArea';
import CharacterForm from './CharacterForm';
import heart from './heart.svg';
import './heart.css';
import useHeartCharacterSubscription from './useHeartCharacterSubscription';

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
    delay: 2000,
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

interface HeartRoomProps {
  name: string;
}

const HeartRoom = ({ name }: HeartRoomProps) => {
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
  const { data } = useHeartRoomLookup(name);

  React.useEffect(() => {
    if (data && state.value === 'loading') {
      send('LOAD');
    }
  }, [data, send, state.value]);

  const trackedCharacters = useHeartCharacterSubscription({
    characters: data?.characters.items ?? [],
    gameId: data?.id,
  });
  const [username, setUsername] = React.useState('');

  const updateUsername = (name: string) => {
    try {
      API.graphql({
        query: mutations.updateHeartCharacter,
        variables: {
          input: {
            id: state.context.characterChoice,
            playerName: name,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    }
    setUsername(name);
  };

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
              <CharacterChoiceCard
                characters={trackedCharacters}
                username={username}
                setUsername={setUsername}
                controls={optionsControls}
                onDone={(character: string) => {
                  switch (character) {
                    case GM:
                      send('GM');
                      setUsername('Game Facilitator');
                      break;
                    case NEW_CHARACTER:
                      send('NEW');
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
            >
              <Image src={heart} w={36} alt="heart with black tendrils" />
            </motion.div>
          </AnimateSharedLayout>
        </Flex>
      );
    case 'NEW':
      if (!data?.id) {
        throw new Error('no game module loaded');
      }
      return (
        <Flex
          direction="column"
          fontFamily="Roboto Slab"
          alignItems="center"
          justifyContent="center"
          minH="full"
          py={12}
        >
          <Container maxW="4xl">
            <CharacterForm
              submitText="Begin Your Journey"
              onDone={async (character) => {
                try {
                  // @ts-ignore
                  const { data: createdCharacter } = await API.graphql({
                    query: mutations.createHeartCharacter,
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
                    value: createdCharacter?.createHeartCharacter?.id,
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
      );
    case 'PLAYING':
      return (
        <HeartGameArea
          name={name}
          username={username}
          setUsername={updateUsername}
          characters={trackedCharacters}
          characterChoice={state.context.characterChoice}
          id={data?.id ?? ''}
          safetyModuleId={data?.safetyModule?.id ?? ''}
          hexMap={
            data?.hexMapModule ?? {
              id: '',
              gridConfiguration: '{}',
              backgroundImages: [],
              createdAt: '',
              updatedAt: '',
            }
          }
          dice={{
            d4Dice:
              data?.d4Dice?.map(
                (d) => JSON.parse(d) as { username: string; result: number }
              ) ?? [],
            d6Dice:
              data?.d6Dice?.map(
                (d) => JSON.parse(d) as { username: string; result: number }
              ) ?? [],
            d8Dice:
              data?.d8Dice?.map(
                (d) => JSON.parse(d) as { username: string; result: number }
              ) ?? [],
            d10Dice:
              data?.d10Dice?.map(
                (d) => JSON.parse(d) as { username: string; result: number }
              ) ?? [],
            d12Dice:
              data?.d12Dice?.map(
                (d) => JSON.parse(d) as { username: string; result: number }
              ) ?? [],
          }}
        />
      );
    default:
      return <Box>oh no!</Box>;
  }
};

export default HeartRoom;
