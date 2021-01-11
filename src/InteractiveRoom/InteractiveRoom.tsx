import * as React from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
} from '@chakra-ui/react';
import gsap, { Elastic } from 'gsap';
import { Draggable } from 'gsap/all';
import _Draggable from 'gsap/Draggable';
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
import { VisualDie } from '../types';
import { assignResultsToDice, createDieOfNSides } from '../utils/rolls';
import { getRandomNumbers } from '../functions/randomNumbers';

gsap.registerPlugin(Draggable);

type Props = {
  name: string;
};

function InteractiveRoom({ name }: Props) {
  const { data, isLoading } = useRoomLookup(name);
  const [username, setUsername] = React.useState('');
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
    const results = await getRandomNumbers(1);
    const diceWithResults = assignResultsToDice({
      dice: [die],
      results,
    });
    return diceWithResults[0];
  };

  const addDie = async ({ sides }: { sides: number }) => {
    const die = await makeNewVisualDie({ sides });
    await API.graphql({
      query: mutations.createVisualDie,
      variables: {
        input: {
          // @ts-ignore
          roomId: data?.id,
          x: 0,
          y: 0,
          createdBy: username,
          result: die.result,
          sides: die.sides,
          color,
        },
      },
    });
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
      {isLoading ? (
        <SpinningCube />
      ) : (
        <Container flex="1" maxW="6xl" id="dice-box">
          <VisualDice startingDice={data?.dice?.items} />
        </Container>
      )}
      <Container maxW="6xl" mb={3}>
        <HStack spacing={3}>
          <IconButton
            variant="outline"
            size="sm"
            colorScheme="red"
            icon={<BsClock />}
            onClick={() => {}}
            aria-label="new clock"
          />
          <IconButton
            variant="outline"
            size="sm"
            colorScheme="orange"
            icon={<MdTextFields />}
            onClick={() => {}}
            aria-label="new clock"
          />
        </HStack>
      </Container>
      <UsernameModal setNameInRoom={setUsername} ref={quickRollRef} />
    </Flex>
  );
}

const VisualDice = ({ startingDice = [] }: { startingDice?: VisualDie[] }) => {
  const [dice, setDice] = React.useState<VisualDie[]>(startingDice);
  React.useEffect(() => {
    API.graphql({
      query: subscriptions.onCreateVisualDie,
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: (data) => {
        setDice((cur) => {
          return cur.concat(data?.onCreateVisualDie);
        });
      },
    });
  }, []);
  return (
    <>
      {dice.map((d) => (
        <VDie die={d} key={d.id} />
      ))}
    </>
  );
};

const VDie = ({ die }: { die: VisualDie }) => {
  React.useEffect(() => {
    Draggable.create(document.getElementById(`${die.id}`), {
      allowEventDefault: true,
      type: 'x,y',
      bounds: document.getElementById('dice-box'),
      onDragEnd: function () {
        const dragEvent = {
          id: die.id,
          endX: this.endX,
          endY: this.endY,
          deltaX: this.endX - this.startX,
          deltaY: this.endY - this.startY,
        };
        console.log(dragEvent);
      },
    });
  }, [die]);
  const el = React.useRef(null);
  React.useEffect(() => {
    gsap.to(el.current, {
      x: die.x,
      y: die.y,
      duration: 0.25,
      ease: Elastic.easeOut.config(1, 1),
    });
  }, [die.x, die.y]);

  return (
    <Box h={8} w={12} id={die.id} ref={el} border="1px solid red">
      {die.result}
    </Box>
  );
};

export default InteractiveRoom;
