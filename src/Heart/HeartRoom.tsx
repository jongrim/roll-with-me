import * as React from 'react';
import { Box, Flex, Spinner, useToast } from '@chakra-ui/react';
import useHeartRoomLookup from './useHeartRoomLookup';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import CharacterChoiceCard from '../Common/CharacterChoice/CharacterChoiceCard';
import HeartGameArea from './HeartGameArea';
import './heart.css';
import useHeartCharacterSubscription from './useHeartCharacterSubscription';
import { newCharacter } from './newCharacter';

export const NEW_CHARACTER = 'NEW';
export const GM = 'GM';

const gameLoadMachine = Machine<{
  characterChoice: string;
}>({
  id: 'trophyDarkGameLoad',
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

interface HeartRoomProps {
  name: string;
}

const HeartRoom = ({ name }: HeartRoomProps) => {
  const toast = useToast();

  const [state, send] = useMachine(
    gameLoadMachine.withContext({
      characterChoice: 'unset',
    })
  );
  const { data } = useHeartRoomLookup(name);

  React.useEffect(() => {
    if (data && state.value === 'loading') {
      send('LOAD');
    }
  }, [data, send, state.value]);

  const characters = React.useMemo(() => {
    return data?.characters.items ?? [];
  }, [data?.characters?.items]);

  const trackedCharacters = useHeartCharacterSubscription({
    characters,
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
    case 'choosing':
      return (
        <Flex
          direction="column"
          fontFamily="Roboto Slab"
          alignItems="center"
          minH="full"
        >
          <CharacterChoiceCard
            characters={trackedCharacters}
            username={username}
            setUsername={setUsername}
            onDone={async (character: string) => {
              switch (character) {
                case GM:
                  send('GM');
                  setUsername('Game Facilitator');
                  break;
                case NEW_CHARACTER:
                  try {
                    // @ts-ignore
                    const { data: createdCharacter } = await API.graphql({
                      query: mutations.createHeartCharacter,
                      variables: {
                        input: {
                          gameID: data?.id,
                          playerName: username,
                          ...newCharacter,
                        },
                      },
                    });
                    toast({
                      status: 'success',
                      title: 'Character created',
                      isClosable: true,
                      duration: 3000,
                    });
                    send('CHOOSE', {
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
