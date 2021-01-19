import * as React from 'react';
import {
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
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
import { RiAddBoxLine } from 'react-icons/ri';
import {
  GiD4,
  GiPerspectiveDiceSixFacesSix,
  GiDiceEightFacesEight,
  GiD10,
  GiD12,
  GiDiceTwentyFacesTwenty,
} from 'react-icons/gi';
import { BsClock } from 'react-icons/bs';
import { MdTextFields } from 'react-icons/md';
import SpinningCube from '../SpinningCube/SpinningCube';
import { VisualCounter, VisualDie, VisualLabel } from '../types';
import { assignResultsToDice, createDieOfNSides } from '../utils/rolls';
import { getRandomNumbers } from '../functions/randomNumbers';
import VDie from './VisualDie';
import ClockModal from './ClockModal';
import VCounter from './VisualCounter';
import VLabel from './VisualLabel';
import LabelModal from './LabelModal';
import findEmptySpace, { DICEBOX_ID, getBoxes } from '../utils/findEmptySpace';

gsap.registerPlugin(Draggable);

const MIN_HEIGHT = 72;
const MIN_WIDTH = 72;

type Props = {
  name: string;
};

function InteractiveRoom({ name }: Props) {
  const [actionInProgress, setActionInProgress] = React.useState(false);
  const { data, isLoading } = useRoomLookup(name);
  const [username, setUsername] = React.useState('');
  const [clockModalIsOpen, setClockModalIsOpen] = React.useState(false);
  const [labelModalIsOpen, setLabelModalIsOpen] = React.useState(false);
  const [color, setColor] = React.useState('#c91db6');

  const quickRollRef = React.useRef<HTMLElement>(null!);
  React.useEffect(() => {
    const checkForSlash = (e: KeyboardEvent) => {
      if (e.key === '/') {
        quickRollRef.current?.focus();
      }
    };
    document.addEventListener('keyup', checkForSlash);
    return () => document.removeEventListener('keyup', checkForSlash);
  }, [quickRollRef]);

  const makeNewVisualDie = async ({ sides }: { sides: number }) => {
    const die = createDieOfNSides({ n: sides, name: `d${sides}` });
    const { top, left } = findEmptySpace({
      MIN_HEIGHT,
      MIN_WIDTH,
      ...getBoxes(),
    });
    console.log(top, left);
    const results = await getRandomNumbers(1);
    const diceWithResults = assignResultsToDice({
      dice: [die],
      results,
    });
    return { ...diceWithResults[0], x: left, y: top };
  };

  const addDie = async ({ sides }: { sides: number }) => {
    setActionInProgress(true);
    try {
      const die = await makeNewVisualDie({ sides });
      await API.graphql({
        query: mutations.createVisualDie,
        variables: {
          input: {
            // @ts-ignore
            roomId: data?.id,
            x: die.x,
            y: die.y,
            createdBy: username,
            result: die.result,
            sides: die.sides,
            version: 0,
            color,
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
      <SettingsBar />
      <Container maxW="6xl">
        <QuickRollBar
          name={username}
          onSubmit={(roll) => console.log(roll)}
          placeholder="Enter a die count to create multiple at once (ex. 2d6)"
          ref={quickRollRef}
        />
        <Flex justify="space-around" align="center" wrap="wrap" my={2}>
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={<Icon h={12} w={12} color={color} as={GiD4} />}
            onClick={() => addDie({ sides: 4 })}
            aria-label="d4"
          />
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
            aria-label="d6"
          />
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={
              <Icon h={12} w={12} color={color} as={GiDiceEightFacesEight} />
            }
            onClick={() => addDie({ sides: 8 })}
            aria-label="d8"
          />
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={<Icon h={12} w={12} color={color} as={GiD10} />}
            onClick={() => addDie({ sides: 10 })}
            aria-label="d10"
          />
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={<Icon h={12} w={12} color={color} as={GiD12} />}
            onClick={() => addDie({ sides: 12 })}
            aria-label="d12"
          />
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={
              <Icon h={12} w={12} color={color} as={GiDiceTwentyFacesTwenty} />
            }
            onClick={() => addDie({ sides: 20 })}
            aria-label="d20"
          />
          <IconButton
            variant="ghost"
            h={20}
            w={20}
            icon={<Icon h={12} w={12} color={color} as={RiAddBoxLine} />}
            onClick={() => addDie({ sides: 6 })}
            aria-label="fudge die"
          />
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
      </Container>
      <Container flex="1" maxW="6xl" id={DICEBOX_ID}>
        {!isLoading && (
          <>
            <VisualDice
              startingDice={data?.dice?.items}
              roomId={data?.id}
              setActionInProgress={setActionInProgress}
            />
            <VisualCounters
              startingCounters={data?.counters?.items}
              roomId={data?.id}
              setActionInProgress={setActionInProgress}
            />
            <VisualLabels
              startingLabels={data?.labels.items}
              roomId={data?.id}
              setActionInProgress={setActionInProgress}
            />
          </>
        )}
      </Container>
      <Container maxW="6xl" mb={3}>
        <HStack spacing={3}>
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
            icon={<MdTextFields />}
            onClick={() => setLabelModalIsOpen(true)}
            aria-label="new clock"
          />
        </HStack>
      </Container>
      <UsernameModal setNameInRoom={setUsername} ref={quickRollRef} />
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
      {actionInProgress && <SpinningCube />}
    </Flex>
  );
}

const VisualDice = ({
  startingDice = [],
  roomId = '',
  setActionInProgress,
}: {
  startingDice?: VisualDie[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
}) => {
  const [dice, setDice] = React.useState<VisualDie[]>(startingDice);
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
        console.log(value);
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
  return (
    <>
      {dice.map((d) => (
        <VDie die={d} key={d.id} setActionInProgress={setActionInProgress} />
      ))}
    </>
  );
};

const VisualCounters = ({
  startingCounters = [],
  roomId = '',
  setActionInProgress,
}: {
  startingCounters?: VisualCounter[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
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
        />
      ))}
    </>
  );
};

const VisualLabels = ({
  startingLabels = [],
  roomId = '',
  setActionInProgress,
}: {
  startingLabels?: VisualLabel[];
  roomId?: string;
  setActionInProgress: (val: boolean) => void;
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
        />
      ))}
    </>
  );
};

export default InteractiveRoom;
