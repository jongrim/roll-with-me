import * as React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Icon,
  useColorModeValue,
  Flex,
  Text,
  Divider,
  HStack,
  Tag,
} from '@chakra-ui/react';
import {
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
} from 'react-icons/gi';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { TrophyGoldDiceMode } from '../API';
import { RawTrophyGoldCharacter, RawTrophyGoldRoomDetails } from '../APITypes';
import { DarkDie, LightDie } from '../TrophyShared/LightDiceDarkDice';
import { RandomNumbersContext } from '../RandomNumbersProvider';

interface TrophyDiceProps {
  lightDice: RawTrophyGoldRoomDetails['lightDice'];
  darkDice: RawTrophyGoldRoomDetails['darkDice'];
  goldDice: RawTrophyGoldRoomDetails['goldDice'];
  diceMode: TrophyGoldDiceMode;
  characters: RawTrophyGoldCharacter[];
  characterChoice: string;
  id: string;
}

const mod6 = (x: number) => x % 6;

const handleSubmit = async ({
  lightDiceCount,
  darkDiceCount,
  id,
  getNumbers,
}: {
  lightDiceCount: number;
  darkDiceCount: number;
  id: string;
  getNumbers: (val: number) => Promise<number[]>;
}) => {
  const results = await getNumbers(lightDiceCount + darkDiceCount);
  const lightDice = [];
  const darkDice = [];
  for (let i = 0; i < lightDiceCount; i++) {
    lightDice.push(`${mod6(results.pop() ?? 1) + 1}`);
  }
  for (let i = 0; i < darkDiceCount; i++) {
    darkDice.push(`${mod6(results.pop() ?? 1) + 1}`);
  }
  try {
    API.graphql({
      query: mutations.updateTrophyGoldRoom,
      variables: {
        input: {
          id,
          lightDice,
          darkDice,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  } finally {
    return;
  }
};

function setDiceMode({
  id,
  diceMode,
}: {
  id: string;
  diceMode: TrophyGoldDiceMode;
}) {
  API.graphql({
    query: mutations.updateTrophyGoldRoom,
    variables: {
      input: {
        id,
        diceMode,
      },
    },
  });
}

async function setWeakPoint({
  id,
  getNumbers,
}: {
  id: string;
  getNumbers: (val: number) => Promise<number[]>;
}) {
  const results = await getNumbers(1);
  return API.graphql({
    query: mutations.updateTrophyGoldCharacter,
    variables: {
      input: {
        id,
        weakPoint: mod6(results[0]) + 1,
      },
    },
  });
}

const TrophyDice = ({
  characters,
  characterChoice,
  diceMode,
  lightDice,
  darkDice,
  id,
}: TrophyDiceProps) => {
  const [trackedDiceMode, setTrackedDiceMode] = React.useState(diceMode);
  const { getNumbers } = React.useContext(RandomNumbersContext);
  React.useEffect(() => {
    // syncing this way lets us update the view before the data in the server has updated
    setTrackedDiceMode(diceMode);
  }, [diceMode]);

  return (
    <Box>
      <Text mb={3}>Toggle dice mode</Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.hunt ? 'solid' : 'outline'
          }
          colorScheme="blue"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.hunt);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.hunt });
          }}
        >
          hunt
        </Button>
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.risk ? 'solid' : 'outline'
          }
          colorScheme="orange"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.risk);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.risk });
          }}
        >
          risk
        </Button>
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.combat ? 'solid' : 'outline'
          }
          colorScheme="red"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.combat);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.combat });
          }}
        >
          combat
        </Button>
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.contest ? 'solid' : 'outline'
          }
          colorScheme="pink"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.combat);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.contest });
          }}
        >
          contest
        </Button>
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.gold ? 'solid' : 'outline'
          }
          colorScheme="yellow"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.gold);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.gold });
          }}
        >
          gold
        </Button>
      </Flex>
      <Divider my={2} />
      {[TrophyGoldDiceMode.risk, TrophyGoldDiceMode.combat].includes(
        trackedDiceMode
      ) && (
        <Box>
          <Grid templateColumns="1fr 1fr" gap={4} mb={2}>
            {characterChoice !== 'GM' && (
              <Button
                onClick={() =>
                  setWeakPoint({ id: characterChoice, getNumbers })
                }
              >
                Set your weak point
              </Button>
            )}
            <Button variant="ghost">Clear weak points</Button>
          </Grid>
          <Text>Weak points</Text>
          <HStack>
            {characters?.map((char) => {
              if (char.weakPoint) {
                return (
                  <Tag key={`${char.id}-${char.weakPoint}`} variant="outline">
                    {char.characterName} – {char.weakPoint}
                  </Tag>
                );
              }
              return null;
            })}
          </HStack>
        </Box>
      )}
      {[
        TrophyGoldDiceMode.hunt,
        TrophyGoldDiceMode.risk,
        TrophyGoldDiceMode.combat,
        TrophyGoldDiceMode.contest,
      ].includes(trackedDiceMode) && <DiceForm id={id} />}
      {[TrophyGoldDiceMode.gold].includes(trackedDiceMode) && (
        <Box>Gold dice form</Box>
      )}
    </Box>
  );
};

const DiceForm = ({ id }: { id: string }) => {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const [light, setLight] = React.useState(0);
  const [dark, setDark] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsRolling(true);
        handleSubmit({
          lightDiceCount: light,
          darkDiceCount: dark,
          id,
          getNumbers,
        }).then(() => {
          setIsRolling(false);
        });
      }}
    >
      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem>
          <FormControl id="light-dice">
            <FormLabel fontFamily="Faith Collapsing" fontSize="4xl">
              Light Dice
            </FormLabel>
            <NumberInput
              variant="flushed"
              fontFamily="Faith Collapsing"
              size="lg"
              onChange={(_, val) => setLight(val)}
              min={0}
              value={light}
            >
              <NumberInputField fontSize="2xl" fontWeight="600" opacity="0.9" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl id="dark-dice">
            <FormLabel fontFamily="Faith Collapsing" fontSize="4xl">
              Dark Dice
            </FormLabel>
            <NumberInput
              variant="flushed"
              fontFamily="Faith Collapsing"
              size="lg"
              onChange={(_, val) => setDark(val)}
              min={0}
              value={dark}
            >
              <NumberInputField fontSize="2xl" fontWeight="600" opacity="0.9" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Button
              width="md"
              type="submit"
              variant="ghost"
              fontFamily="Faith Collapsing"
              fontSize="3xl"
              opacity="0.9"
              py={6}
              isLoading={isRolling}
            >
              Roll
            </Button>
          </Center>
        </GridItem>
        <GridItem>
          {['4', '1'].map((result, i) => (
            <LightDie key={`light-die-${i}`} result={result} />
          ))}
        </GridItem>
        <GridItem>
          {['3', '2'].map((result, i) => (
            <DarkDie key={`dark-die-${i}`} result={result} />
          ))}
        </GridItem>
      </Grid>
    </form>
  );
};

const GoldDie = ({ result }: { result: string }) => {
  const goldColor = useColorModeValue('yellow.500', 'yellow.400');
  switch (result) {
    case '1':
      return <Icon h={14} w={14} as={GiDiceSixFacesOne} color={goldColor} />;
    case '2':
      return <Icon h={14} w={14} as={GiDiceSixFacesTwo} color={goldColor} />;
    case '3':
      return <Icon h={14} w={14} as={GiDiceSixFacesThree} color={goldColor} />;
    case '4':
      return <Icon h={14} w={14} as={GiDiceSixFacesFour} color={goldColor} />;
    case '5':
      return <Icon h={14} w={14} as={GiDiceSixFacesFive} color={goldColor} />;
    case '6':
      return <Icon h={14} w={14} as={GiDiceSixFacesSix} color={goldColor} />;
    default:
      return null;
  }
};

export default TrophyDice;
