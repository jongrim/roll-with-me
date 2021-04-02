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
  Tag,
  Spacer,
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
import { TrophyGoldDiceMode, TrophyGoldDiceModule } from '../API';
import { RawTrophyGoldCharacter } from '../APITypes';
import { DarkDie, LightDie } from '../TrophyShared/LightDiceDarkDice';
import { RandomNumbersContext } from '../RandomNumbersProvider';
import { viewLayout } from './TrophyGoldGameArea';
import { updateCharacter } from './Character';
import useTrophyDice from './useTrophyDice';
import WeakPoints from './WeakPoints';

interface TrophyDiceProps {
  layout: viewLayout;
  characters: RawTrophyGoldCharacter[];
  characterChoice: string;
  diceModule: TrophyGoldDiceModule;
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
      query: mutations.updateTrophyGoldDiceModule,
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

const handleCharacterSubmit = async ({
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
      query: mutations.updateTrophyGoldCharacter,
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

const handleGoldSubmit = async ({
  goldDiceCount,
  id,
  getNumbers,
}: {
  goldDiceCount: number;
  id: string;
  getNumbers: (val: number) => Promise<number[]>;
}) => {
  const results = await getNumbers(goldDiceCount);
  const goldDice = [];
  for (let i = 0; i < goldDiceCount; i++) {
    goldDice.push(`${mod6(results.pop() ?? 1) + 1}`);
  }
  try {
    API.graphql({
      query: mutations.updateTrophyGoldDiceModule,
      variables: {
        input: {
          id,
          goldDice,
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
    query: mutations.updateTrophyGoldDiceModule,
    variables: {
      input: {
        id,
        diceMode,
      },
    },
  });
}

const TrophyDice = ({
  characters,
  characterChoice,
  layout,
  diceModule,
}: TrophyDiceProps) => {
  const {
    id = '',
    lightDice = [],
    darkDice = [],
    goldDice = [],
    diceMode = TrophyGoldDiceMode.hunt,
  } = useTrophyDice({ diceModule });
  const textBgColor = useColorModeValue('white', 'grey.800');
  const [trackedDiceMode, setTrackedDiceMode] = React.useState(diceMode);
  React.useEffect(() => {
    // syncing this way lets us update the view before the data in the server has updated
    setTrackedDiceMode(diceMode);
  }, [diceMode]);

  const borderStyles =
    layout === 'side' ? {} : { borderTop: '1px solid', borderColor: 'inherit' };

  return (
    <Flex
      px={2}
      py={1}
      position="relative"
      direction={layout === 'side' ? 'column' : 'row'}
      w="full"
      h="full"
      {...borderStyles}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        direction={layout === 'side' ? 'row' : 'column'}
      >
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.hunt ? 'solid' : 'ghost'
          }
          colorScheme="orange"
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
            trackedDiceMode === TrophyGoldDiceMode.risk ? 'solid' : 'ghost'
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
            trackedDiceMode === TrophyGoldDiceMode.combat ? 'solid' : 'ghost'
          }
          colorScheme="orange"
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
            trackedDiceMode === TrophyGoldDiceMode.contest ? 'solid' : 'ghost'
          }
          colorScheme="orange"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.contest);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.contest });
          }}
        >
          contest
        </Button>
        <Button
          size="sm"
          variant={
            trackedDiceMode === TrophyGoldDiceMode.gold ? 'solid' : 'ghost'
          }
          colorScheme="orange"
          onClick={() => {
            setTrackedDiceMode(TrophyGoldDiceMode.gold);
            setDiceMode({ id, diceMode: TrophyGoldDiceMode.gold });
          }}
        >
          gold
        </Button>
      </Flex>
      <Divider
        my={2}
        mx={2}
        orientation={layout === 'top' ? 'vertical' : 'horizontal'}
      />
      <Box
        hidden={[
          TrophyGoldDiceMode.hunt,
          TrophyGoldDiceMode.contest,
          TrophyGoldDiceMode.gold,
        ].includes(trackedDiceMode)}
      >
        <Center mb={1}>
          <Text fontSize="sm" fontWeight="300" textAlign="center">
            Weak points
          </Text>
          {characterChoice === 'GM' && (
            <Button
              variant="ghost"
              size="sm"
              ml={2}
              onClick={() => {
                characters.forEach(async (c) => {
                  updateCharacter({ id: c.id, weakPoint: null });
                });
              }}
            >
              Clear
            </Button>
          )}
        </Center>
        <WeakPoints
          characters={characters}
          darkDice={darkDice}
          diceMode={trackedDiceMode}
          layout={layout}
        />
      </Box>
      <Grid gridTemplateColumns="1fr" gridTemplateRows="1fr">
        <Box
          gridArea="1 / 1"
          hidden={[
            TrophyGoldDiceMode.gold,
            TrophyGoldDiceMode.contest,
          ].includes(trackedDiceMode)}
        >
          <DiceForm
            formId="standard"
            layout={layout}
            id={id}
            lightDice={lightDice}
            darkDice={darkDice}
          />
        </Box>
        <Box
          gridArea="1 / 1"
          hidden={[
            TrophyGoldDiceMode.hunt,
            TrophyGoldDiceMode.risk,
            TrophyGoldDiceMode.combat,
            TrophyGoldDiceMode.contest,
          ].includes(trackedDiceMode)}
        >
          <GoldDiceForm id={id} goldDice={goldDice} layout={layout} />
        </Box>
        <Box
          gridArea="1 / 1"
          hidden={[
            TrophyGoldDiceMode.hunt,
            TrophyGoldDiceMode.risk,
            TrophyGoldDiceMode.combat,
            TrophyGoldDiceMode.gold,
          ].includes(trackedDiceMode)}
        >
          <DiceForm
            formId="contest"
            layout={layout}
            id={id}
            characterId={characterChoice}
            lightDice={
              characters.find(({ id }) => id === characterChoice)?.lightDice
            }
            darkDice={
              characters.find(({ id }) => id === characterChoice)?.darkDice
            }
          />
        </Box>
      </Grid>
      <Grid
        templateColumns={layout === 'side' ? '1fr 1fr' : '1fr 1fr 1fr 1fr'}
        columnGap={3}
        mt={2}
        hidden={[
          TrophyGoldDiceMode.hunt,
          TrophyGoldDiceMode.risk,
          TrophyGoldDiceMode.combat,
          TrophyGoldDiceMode.gold,
        ].includes(trackedDiceMode)}
      >
        {characters
          .filter(({ id }) => id !== characterChoice)
          .map(({ lightDice, darkDice, id, characterName }) => {
            return (
              <Box key={id}>
                <Text fontWeight="500" mb={2}>
                  {characterName}
                </Text>
                <Box
                  position="relative"
                  minH={8}
                  border="1px solid"
                  borderColor="inherit"
                  mb={2}
                >
                  <Text
                    fontSize="xs"
                    position="absolute"
                    top="-8px"
                    left="4px"
                    bgColor={textBgColor}
                  >
                    Light Dice
                  </Text>
                  <Text mt={2} pl={1} fontWeight="400">
                    {lightDice?.join(', ')}
                  </Text>
                </Box>
                <Box
                  position="relative"
                  minH={8}
                  border="1px solid"
                  borderColor="inherit"
                  mb={2}
                >
                  <Text
                    fontSize="xs"
                    position="absolute"
                    top="-8px"
                    left="4px"
                    bgColor={textBgColor}
                  >
                    Dark Dice
                  </Text>
                  <Text mt={2} pl={1} fontWeight="400">
                    {darkDice?.join(', ')}
                  </Text>
                </Box>
              </Box>
            );
          })}
      </Grid>
    </Flex>
  );
};

const DiceForm = ({
  id,
  lightDice,
  darkDice,
  layout,
  characterId,
  formId,
}: {
  id: string;
  characterId?: string;
  lightDice: TrophyGoldDiceModule['lightDice'];
  darkDice: TrophyGoldDiceModule['darkDice'];
  layout: viewLayout;
  formId: string;
}) => {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const [light, setLight] = React.useState(0);
  const [dark, setDark] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  const containerLayout =
    layout === 'top'
      ? {
          templateAreas: `
          "topLeft center lightDice"
          "bottomLeft center darkDice"
          `,
          alignItems: 'center',
          templateColumns: '150px 100px 300px',
        }
      : { templateColumns: '1fr 1fr' };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsRolling(true);
        if (characterId) {
          await handleCharacterSubmit({
            lightDiceCount: light,
            darkDiceCount: dark,
            id: characterId,
            getNumbers,
          });
        } else {
          await handleSubmit({
            lightDiceCount: light,
            darkDiceCount: dark,
            id,
            getNumbers,
          });
        }
        setIsRolling(false);
      }}
    >
      <Grid {...containerLayout} gap={8}>
        <GridItem gridArea={layout === 'top' ? 'topLeft' : ''}>
          <FormControl id={`light-dice-${formId}`}>
            <FormLabel
              fontFamily="Faith Collapsing"
              fontSize={layout === 'top' ? '2xl' : '4xl'}
            >
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
              <NumberInputField
                fontSize={layout === 'top' ? 'xl' : '2xl'}
                fontWeight="600"
                opacity="0.9"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem gridArea={layout === 'top' ? 'bottomLeft' : ''}>
          <FormControl id={`dark-dice-${formId}`}>
            <FormLabel
              fontFamily="Faith Collapsing"
              fontSize={layout === 'top' ? '2xl' : '4xl'}
            >
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
              <NumberInputField
                fontSize={layout === 'top' ? 'xl' : '2xl'}
                fontWeight="600"
                opacity="0.9"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem
          colSpan={layout === 'side' ? 2 : 1}
          gridArea={layout === 'top' ? 'center' : ''}
        >
          <Center>
            <Button
              type="submit"
              variant="ghost"
              fontFamily="Faith Collapsing"
              fontSize="3xl"
              opacity="0.9"
              w="full"
              py={6}
              isLoading={isRolling}
            >
              Roll
            </Button>
          </Center>
        </GridItem>
        <GridItem gridArea={layout === 'top' ? 'lightDice' : ''}>
          {lightDice?.map((result, i) => (
            <LightDie key={`light-die-${i}`} result={result} />
          ))}
        </GridItem>
        <GridItem gridArea={layout === 'top' ? 'darkDice' : ''}>
          {darkDice?.map((result, i) => (
            <DarkDie key={`dark-die-${i}`} result={result} />
          ))}
        </GridItem>
      </Grid>
      <Box position="absolute" bottom="-50px" right="-50px" hidden>
        <LightDie result="1" />
        <DarkDie result="1" />
      </Box>
    </form>
  );
};

const GoldDiceForm = ({
  id,
  goldDice,
  layout,
}: {
  id: string;
  goldDice: TrophyGoldDiceModule['goldDice'];
  layout: viewLayout;
}) => {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const [gold, setGold] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  const containerLayout =
    layout === 'top'
      ? {
          alignItems: 'center',
          templateColumns: '1fr 100px 1fr',
        }
      : { templateColumns: '1fr' };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsRolling(true);
        handleGoldSubmit({
          goldDiceCount: gold,
          id,
          getNumbers,
        }).then(() => {
          setIsRolling(false);
        });
      }}
    >
      <Grid gap={8} {...containerLayout}>
        <GridItem>
          <FormControl id="gold-dice">
            <FormLabel fontFamily="Faith Collapsing" fontSize="4xl">
              Gold Dice
            </FormLabel>
            <NumberInput
              variant="flushed"
              fontFamily="Faith Collapsing"
              size="lg"
              onChange={(_, val) => {
                setGold(val);
              }}
              min={0}
              value={gold}
            >
              <NumberInputField fontSize="2xl" fontWeight="600" opacity="0.9" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem colSpan={layout === 'side' ? 2 : 1}>
          <Center>
            <Button
              type="submit"
              variant="ghost"
              fontFamily="Faith Collapsing"
              fontSize="3xl"
              opacity="0.9"
              w="full"
              py={6}
              isLoading={isRolling}
            >
              Roll
            </Button>
          </Center>
        </GridItem>
        <GridItem>
          {goldDice?.map((result, i) => (
            <GoldDie key={`gold-die-${i}`} result={result} />
          ))}
        </GridItem>
      </Grid>
      <Box position="absolute" bottom="-50px" right="-50px" hidden>
        <GoldDie result="1" />
      </Box>
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
