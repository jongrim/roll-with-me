import * as React from 'react';
import {
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useToast,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Spinner,
} from '@chakra-ui/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import debounce from 'lodash.debounce';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import QuickRollBar from '../QuickRollBar/QuickRollBar';
import SettingsBar from '../SettingsBar';
import UsernameModal from '../UsernameModal/UsernameModal';
import useRoomLookup from './useRoomLookup';
import { RiAddBoxLine, RiRestartLine, RiTBoxLine } from 'react-icons/ri';
import {
  GiD4,
  GiPerspectiveDiceSixFacesSix,
  GiDiceEightFacesEight,
  GiD10,
  GiD12,
  GiDiceTwentyFacesTwenty,
} from 'react-icons/gi';
import { BsClock } from 'react-icons/bs';
import SpinningCube from '../SpinningCube/SpinningCube';
import { VisualCounter, VisualDie, VisualLabel } from '../types';
import { assignResultsToDice } from '../utils/rolls';
import { getRandomNumbers } from '../functions/randomNumbers';
import VDie from './VisualDie';
import ClockModal from './ClockModal';
import VCounter from './VisualCounter';
import VLabel from './VisualLabel';
import LabelModal from './LabelModal';

import { DICEBOX_ID } from '../utils/findEmptySpace';
import SafetyForm from '../SafetyForm/SafetyForm';
import { makeNewVisualDie } from './utils';
import setXCard from '../SafetyForm/xCard';
import XCardModal from '../XCardModal/XCardModal';
import { UserRoomContext } from '../UserRoomProvider';
import useUserRoom from '../hooks/useUserRoom';

gsap.registerPlugin(Draggable);

const MIN_WIDTH = 72;

type Props = {
  name: string;
};

function InteractiveRoom({ name }: Props) {
  const toast = useToast();
  const [actionInProgress, setActionInProgress] = React.useState(false);
  const { data, isLoading } = useRoomLookup(name);
  const { isLoaded: userSettingsIsLoaded, username, setUsername } = useUserRoom(
    {
      roomName: name,
      roomId: data?.id || '',
      roomKey: 'interactiveRoom',
    }
  );
  const [clockModalIsOpen, setClockModalIsOpen] = React.useState(false);
  const [labelModalIsOpen, setLabelModalIsOpen] = React.useState(false);
  const [color, setColor] = React.useState('#c91db6');

  const { updateRoomActivity } = React.useContext(UserRoomContext);

  const setActivity = React.useCallback(() => {
    if (data?.id) {
      // only emit when the action starts
      updateRoomActivity({ roomKey: 'interactiveRoom', roomId: data.id });
    }
  }, [data?.id, updateRoomActivity]);

  const quickRollRef = React.useRef<HTMLElement>(null!);
  React.useEffect(() => {
    const checkForQuickCommand = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        quickRollRef.current?.focus();
      }
    };
    document.addEventListener('keydown', checkForQuickCommand);
    return () => document.removeEventListener('keydown', checkForQuickCommand);
  }, [quickRollRef]);

  const addDie = async ({
    sides,
    leftOffset,
    type,
  }: {
    sides: number;
    leftOffset?: number;
    type?: 'fudge';
  }) => {
    if (!data?.id) {
      toast({
        status: 'warning',
        description: 'Try reloading the page and trying again',
        title: 'Not connected to room',
        isClosable: true,
        duration: 7000,
      });
      return;
    }
    setActionInProgress(true);
    try {
      const die = await makeNewVisualDie({ sides, leftOffset });
      await API.graphql({
        query: mutations.createVisualDie,
        variables: {
          input: {
            roomId: data.id,
            x: die.x,
            y: die.y,
            createdBy: username,
            result: die.result,
            sides: die.sides,
            version: 0,
            color,
            type,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
  };

  const debouncedColor = debounce((color) => setColor(color), 900);

  return (
    <Flex flexDirection="column" h="full" maxW="full">
      <SettingsBar username={username} setUsername={setUsername} />
      <Container maxW="6xl" flex="1" display="flex" flexDirection="column">
        <QuickRollBar
          name={username}
          onSubmit={async (roll) => {
            const { dice } = roll;
            Promise.allSettled(
              dice.map((die, i) => {
                return addDie({ sides: die.sides, leftOffset: i * MIN_WIDTH });
              })
            )
              .then(() => {
                toast({
                  status: 'success',
                  description: 'Dice added!',
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((e) => {
                console.warn(e);
              });
          }}
          placeholder="Enter a die count to create multiple at once (ex. 2d6)"
          ref={quickRollRef}
        />
        <Tabs
          display="flex"
          flexDirection="column"
          flex="1"
          variant="unstyled"
          isFitted
        >
          <TabList>
            <Tab
              _selected={{
                opacity: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'brand.300',
              }}
              opacity="0.6"
            >
              Table
            </Tab>
            <Tab
              _selected={{
                opacity: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'brand.300',
              }}
              opacity="0.6"
            >
              Safety
            </Tab>
          </TabList>
          <TabPanels display="flex" flexDirection="column" flex="1">
            <TabPanel display="flex" flexDirection="column" flex="1">
              <Flex justify="space-between" align="center" wrap="wrap" my={2}>
                <Tooltip
                  openDelay={500}
                  label="Add a 4 sided die"
                  aria-label="Add a 4 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={<Icon h={12} w={12} color={color} as={GiD4} />}
                    onClick={() => addDie({ sides: 4 })}
                    aria-label="4 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a 6 sided die"
                  aria-label="Add a 6 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={
                      <Icon
                        h={12}
                        w={12}
                        color={color}
                        as={GiPerspectiveDiceSixFacesSix}
                      />
                    }
                    onClick={() => addDie({ sides: 6 })}
                    aria-label="6 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a 8 sided die"
                  aria-label="Add a 8 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={
                      <Icon
                        h={12}
                        w={12}
                        color={color}
                        as={GiDiceEightFacesEight}
                      />
                    }
                    onClick={() => addDie({ sides: 8 })}
                    aria-label="8 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a 10 sided die"
                  aria-label="Add a 10 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={<Icon h={12} w={12} color={color} as={GiD10} />}
                    onClick={() => addDie({ sides: 10 })}
                    aria-label="10 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a 12 sided die"
                  aria-label="Add a 12 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={<Icon h={12} w={12} color={color} as={GiD12} />}
                    onClick={() => addDie({ sides: 12 })}
                    aria-label="12 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a 20 sided die"
                  aria-label="Add a 20 sided die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={
                      <Icon
                        h={12}
                        w={12}
                        color={color}
                        as={GiDiceTwentyFacesTwenty}
                      />
                    }
                    onClick={() => addDie({ sides: 20 })}
                    aria-label="20 sided die"
                  />
                </Tooltip>
                <Tooltip
                  openDelay={500}
                  label="Add a fudge die"
                  aria-label="Add a fudge die"
                >
                  <IconButton
                    variant="ghost"
                    h={20}
                    w={20}
                    icon={
                      <Icon h={12} w={12} color={color} as={RiAddBoxLine} />
                    }
                    onClick={() => addDie({ sides: 6, type: 'fudge' })}
                    aria-label="fudge die"
                  />
                </Tooltip>
                <Input
                  aria-label="new die color"
                  data-testid="color-picker"
                  w={20}
                  type="color"
                  value={color}
                  onChange={({ target }) => {
                    debouncedColor(target.value);
                  }}
                />
              </Flex>
              <Text textAlign="right" fontSize="sm">
                For best results, choose a color with good contrast on light and
                dark backgrounds
              </Text>
              <Container flex="1" maxW="6xl" id={DICEBOX_ID}>
                {!isLoading && (
                  <>
                    <VisualDice
                      startingDice={data?.dice?.items}
                      roomId={data?.id}
                      setActionInProgress={setActionInProgress}
                      updateActivity={setActivity}
                    />
                    <VisualCounters
                      startingCounters={data?.counters?.items}
                      roomId={data?.id}
                      setActionInProgress={setActionInProgress}
                      updateActivity={setActivity}
                    />
                    <VisualLabels
                      startingLabels={data?.labels.items}
                      roomId={data?.id}
                      setActionInProgress={setActionInProgress}
                      updateActivity={setActivity}
                    />
                  </>
                )}
              </Container>
              <Flex>
                <HStack spacing={3} mb={3}>
                  <IconButton
                    variant="outline"
                    size="sm"
                    colorScheme="red"
                    icon={<BsClock />}
                    onClick={() => setClockModalIsOpen(true)}
                    aria-label="new clock"
                  />
                  <IconButton
                    variant="outline"
                    size="sm"
                    colorScheme="orange"
                    icon={<Icon as={RiTBoxLine} w={6} h={6} />}
                    onClick={() => setLabelModalIsOpen(true)}
                    aria-label="new label"
                  />
                </HStack>
                <Spacer />
                <Button
                  isLoading={false}
                  size="sm"
                  variant="outline"
                  colorScheme="brand"
                  onClick={async () => {
                    // Should better alert there isn't a safety module loaded
                    if (!data?.safetyModule?.id) return;
                    setActionInProgress(true);
                    await setXCard({ value: true, id: data.safetyModule.id });
                    setActionInProgress(false);
                  }}
                >
                  x-card
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel>
              {data?.safetyModule?.id && (
                <SafetyForm
                  id={data.safetyModule.id}
                  setActionInProgress={setActionInProgress}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <UsernameModal
        setUsername={setUsername}
        isOpen={userSettingsIsLoaded && !username}
        ref={quickRollRef}
      />
      <Modal
        isOpen={!userSettingsIsLoaded}
        onClose={() => {}}
        finalFocusRef={quickRollRef}
      >
        <ModalOverlay />
        <ModalContent bgColor="transparent" boxShadow="none" h="full" mt={0}>
          <Center h="full">
            <Spinner
              color="brand.500"
              size="xl"
              thickness="4px"
              speed="0.65s"
            />
          </Center>
        </ModalContent>
      </Modal>
      <ClockModal
        isOpen={clockModalIsOpen}
        onClose={() => setClockModalIsOpen(false)}
        ref={quickRollRef}
        roomId={data?.id}
      />
      <LabelModal
        isOpen={labelModalIsOpen}
        onClose={() => setLabelModalIsOpen(false)}
        ref={quickRollRef}
        roomId={data?.id}
      />
      {data?.safetyModule.id && (
        <XCardModal safetyModuleId={data.safetyModule.id} ref={quickRollRef} />
      )}
      {actionInProgress && <SpinningCube />}
    </Flex>
  );
}

type minDie = { id: string; version: number; sides: number };
type selectionEvent =
  | { type: 'default'; payload: { die: minDie } }
  | { type: 'clear' };

const selectionReducer = (
  state: { selectedDice: minDie[] },
  event: selectionEvent
): { selectedDice: minDie[] } => {
  switch (event.type) {
    case 'default':
      const { die } = event.payload;
      const { selectedDice } = state;
      const isSelected = selectedDice.findIndex((d) => die.id === d.id) >= 0;
      if (isSelected) {
        return { selectedDice: selectedDice.filter((d) => d.id !== die.id) };
      } else {
        return { selectedDice: selectedDice.concat(die) };
      }
    case 'clear':
      return { selectedDice: [] };
    default:
      return state;
  }
};

const VisualDice = ({
  startingDice = [],
  roomId = '',
  setActionInProgress,
  updateActivity,
}: {
  startingDice?: VisualDie[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
  updateActivity: () => void;
}) => {
  const [dice, setDice] = React.useState<VisualDie[]>(startingDice);
  const [state, dispatch] = React.useReducer(selectionReducer, {
    selectedDice: [],
  });
  const { selectedDice } = state;

  const rerollDice = async () => {
    setActionInProgress(true);
    updateActivity();
    const results = await getRandomNumbers(selectedDice.length);
    const updatedDice = assignResultsToDice<minDie>({
      dice: selectedDice,
      results,
    });
    try {
      await Promise.allSettled(
        updatedDice.map((die) =>
          API.graphql({
            query: mutations.updateVisualDie,
            variables: {
              input: {
                id: die.id,
                result: die.result,
                version: die.version + 1,
              },
            },
          })
        )
      );
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
      dispatch({ type: 'clear' });
    }
  };

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onCreateVisualDieByRoom,
      variables: {
        roomId,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setDice((cur) => {
          return cur.concat(value.data?.onCreateVisualDieByRoom);
        });
      },
    });
    const deleteSubscription = API.graphql({
      query: subscriptions.onDeleteVisualDie,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setDice((cur) => {
          return cur.filter(
            (die) => die.id !== value.data?.onDeleteVisualDie?.id
          );
        });
      },
    });

    return () => {
      subscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [roomId]);

  const handleSelection = React.useCallback(
    (die: minDie) => dispatch({ type: 'default', payload: { die } }),
    []
  );

  return (
    <>
      {dice.map((d) => {
        const isSelected =
          selectedDice.findIndex((die) => die.id === d.id) >= 0;
        return (
          <VDie
            die={d}
            key={d.id}
            setActionInProgress={setActionInProgress}
            isSelected={isSelected}
            selectDie={handleSelection}
            updateActivity={updateActivity}
          />
        );
      })}
      {selectedDice.length > 0 && (
        <IconButton
          position="absolute"
          top="48%"
          colorScheme="brand"
          icon={<RiRestartLine />}
          size="lg"
          aria-label="roll die"
          onClick={rerollDice}
          zIndex="2000"
        />
      )}
    </>
  );
};

const VisualCounters = ({
  startingCounters = [],
  roomId = '',
  setActionInProgress,
  updateActivity,
}: {
  startingCounters?: VisualCounter[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
  updateActivity: () => void;
}) => {
  const [counters, setCounters] = React.useState<VisualCounter[]>(
    startingCounters
  );
  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onCreateCounterByRoom,
      variables: {
        roomId,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setCounters((cur) => {
          return cur.concat(value.data?.onCreateCounterByRoom);
        });
      },
    });
    const deleteSubscription = API.graphql({
      query: subscriptions.onDeleteCounter,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setCounters((cur) => {
          return cur.filter(
            (counter) => counter.id !== value.data?.onDeleteCounter?.id
          );
        });
      },
    });

    return () => {
      subscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [roomId]);
  return (
    <>
      {counters.map((c) => (
        <VCounter
          counter={c}
          key={c.id}
          setActionInProgress={setActionInProgress}
          updateActivity={updateActivity}
        />
      ))}
    </>
  );
};

const VisualLabels = ({
  startingLabels = [],
  roomId = '',
  setActionInProgress,
  updateActivity,
}: {
  startingLabels?: VisualLabel[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
  updateActivity: () => void;
}) => {
  const [labels, setLabels] = React.useState<VisualLabel[]>(startingLabels);
  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onCreateLabelByRoom,
      variables: {
        roomId,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setLabels((cur) => {
          return cur.concat(value.data?.onCreateLabelByRoom);
        });
      },
    });
    const deleteSubscription = API.graphql({
      query: subscriptions.onDeleteLabel,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setLabels((cur) => {
          return cur.filter(
            (label) => label.id !== value.data?.onDeleteLabel?.id
          );
        });
      },
    });

    return () => {
      subscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [roomId]);

  return (
    <>
      {labels.map((l) => (
        <VLabel
          label={l}
          key={l.id}
          setActionInProgress={setActionInProgress}
          updateActivity={updateActivity}
        />
      ))}
    </>
  );
};

export default InteractiveRoom;
