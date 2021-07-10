import * as React from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
} from "react-icons/gi";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { TrophyGoldDiceMode, TrophyGoldDiceModule } from "../API";
import { RawTrophyGoldCharacter } from "../APITypes";
import { DarkDie, LightDie } from "../TrophyShared/LightDiceDarkDice";
import { RandomNumbersContext } from "../RandomNumbersProvider";
import useTrophyDice from "./useTrophyDice";
import WeakPoints from "./WeakPoints";
import getRollOutcome from "./trophyDiceResults";

interface TrophyDiceProps {
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

const TrophyDice = ({
  characters,
  characterChoice,
  diceModule,
}: TrophyDiceProps) => {
  const {
    id = "",
    lightDice = [],
    darkDice = [],
    goldDice = [],
  } = useTrophyDice({ diceModule });
  const textBgColor = useColorModeValue("white", "gray.800");

  return (
    <Tabs fontFamily="Roboto Slab" isFitted>
      <TabList>
        <Tab>Hunt</Tab>
        <Tab>Risk</Tab>
        <Tab>Combat</Tab>
        <Tab>Contest</Tab>
        <Tab>Gold</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* Hunt */}
          <DiceForm
            mode={TrophyGoldDiceMode.hunt}
            formId="standard"
            id={id}
            lightDice={lightDice}
            darkDice={darkDice}
            rollOutcome={
              <Text
                textAlign="center"
                whiteSpace="pre-wrap"
                fontFamily="Roboto Slab"
              >
                {getRollOutcome({
                  mode: TrophyGoldDiceMode.hunt,
                  lightDice,
                  darkDice,
                  goldDice: [],
                })}
              </Text>
            }
          />
        </TabPanel>
        <TabPanel>
          {/* Risk */}
          <DiceForm
            mode={TrophyGoldDiceMode.risk}
            formId="standard"
            id={id}
            lightDice={lightDice}
            darkDice={darkDice}
            rollOutcome={
              <Text
                textAlign="center"
                whiteSpace="pre-wrap"
                fontFamily="Roboto Slab"
              >
                {getRollOutcome({
                  mode: TrophyGoldDiceMode.risk,
                  lightDice,
                  darkDice,
                  goldDice: [],
                })}
              </Text>
            }
          />
        </TabPanel>
        <TabPanel>
          {/* Comabt */}
          <Box>
            <DiceForm
              mode={TrophyGoldDiceMode.combat}
              formId="standard"
              id={id}
              lightDice={lightDice}
              darkDice={darkDice}
              rollOutcome={
                <Text
                  textAlign="center"
                  whiteSpace="pre-wrap"
                  fontFamily="Roboto Slab"
                >
                  {getRollOutcome({
                    mode: TrophyGoldDiceMode.combat,
                    lightDice,
                    darkDice,
                    goldDice: [],
                  })}
                </Text>
              }
            />
            <WeakPoints
              characterChoice={characterChoice}
              characters={characters}
              darkDice={darkDice}
              diceMode={TrophyGoldDiceMode.combat}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          {/* Contest */}
          <DiceForm
            mode={TrophyGoldDiceMode.contest}
            formId="contest"
            id={id}
            characterId={characterChoice}
            lightDice={
              characters.find(({ id }) => id === characterChoice)?.lightDice ??
              []
            }
            darkDice={
              characters.find(({ id }) => id === characterChoice)?.darkDice ??
              []
            }
            rollOutcome={null}
          />
          <Grid
            templateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            width="full"
            columnGap={3}
          >
            {characters
              .filter(({ id }) => id !== characterChoice)
              .map(({ lightDice, darkDice, id, characterName }) => {
                return (
                  <Box key={id}>
                    <Text fontWeight="500" mb={2}>
                      {characterName ?? "Unnamed character"}
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
                        {lightDice?.join(", ")}
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
                        {darkDice?.join(", ")}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
          </Grid>
        </TabPanel>
        <TabPanel>
          {/* Gold */}
          <GoldDiceForm id={id} goldDice={goldDice} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const DiceForm = ({
  id,
  lightDice = [],
  darkDice = [],
  characterId,
  formId,
  mode,
  rollOutcome,
}: {
  id: string;
  characterId?: string;
  lightDice: TrophyGoldDiceModule["lightDice"];
  darkDice: TrophyGoldDiceModule["darkDice"];
  formId: string;
  mode: TrophyGoldDiceMode;
  rollOutcome: React.ReactNode;
}) => {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const [light, setLight] = React.useState(lightDice.length);
  const [dark, setDark] = React.useState(darkDice.length);
  const [isRolling, setIsRolling] = React.useState(false);
  React.useEffect(() => {
    setLight(lightDice.length);
    setDark(darkDice.length);
  }, [lightDice.length, darkDice.length]);
  const containerLayout = {
    templateAreas: `
          "diceForm"
          "center"
          "diceResults"
          "textResults"
      `,
  };
  return (
    <Center>
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
        <Grid
          {...containerLayout}
          h="full"
          w="full"
          maxW="xl"
          justifyItems="stretch"
          rowGap={6}
        >
          <GridItem maxW="lg">
            <Flex>
              {[
                TrophyGoldDiceMode.hunt,
                TrophyGoldDiceMode.risk,
                TrophyGoldDiceMode.contest,
              ].includes(mode) && (
                <FormControl id={`light-dice-${formId}`}>
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
                    <NumberInputField
                      fontSize="2xl"
                      fontWeight="600"
                      opacity="0.9"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}
              <Box
                w={8}
                h={2}
                hidden={[
                  TrophyGoldDiceMode.hunt,
                  TrophyGoldDiceMode.combat,
                  TrophyGoldDiceMode.gold,
                ].includes(mode)}
              />
              {[
                TrophyGoldDiceMode.risk,
                TrophyGoldDiceMode.combat,
                TrophyGoldDiceMode.contest,
              ].includes(mode) && (
                <FormControl id={`dark-dice-${formId}`}>
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
                    <NumberInputField
                      fontSize="2xl"
                      fontWeight="600"
                      opacity="0.9"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}
            </Flex>
          </GridItem>
          <GridItem>
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
          </GridItem>
          {mode !== TrophyGoldDiceMode.contest && (
            <GridItem py={2} overflow="auto">
              <Flex wrap="wrap" justifyContent="center">
                {[TrophyGoldDiceMode.hunt, TrophyGoldDiceMode.risk].includes(
                  mode
                ) &&
                  lightDice?.map((result, i) => (
                    <LightDie key={`light-die-${i}`} result={result} />
                  ))}
                {[TrophyGoldDiceMode.risk, TrophyGoldDiceMode.combat].includes(
                  mode
                ) &&
                  darkDice?.map((result, i) => (
                    <DarkDie key={`dark-die-${i}`} result={result} />
                  ))}
              </Flex>
            </GridItem>
          )}
          <GridItem overflow="auto">{rollOutcome}</GridItem>
        </Grid>
      </form>
    </Center>
  );
};

const GoldDiceForm = ({
  id,
  goldDice,
}: {
  id: string;
  goldDice: TrophyGoldDiceModule["goldDice"];
}) => {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const [gold, setGold] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  const containerLayout = { templateColumns: "1fr" };
  return (
    <Center>
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
            <Box w="lg">
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
                  <NumberInputField
                    fontSize="2xl"
                    fontWeight="600"
                    opacity="0.9"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
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
          <GridItem colSpan={2}>
            <Text textAlign="center" fontFamily="Roboto Slab">
              {getRollOutcome({
                mode: TrophyGoldDiceMode.gold,
                goldDice: goldDice ?? [],
              })}
            </Text>
          </GridItem>
        </Grid>
      </form>
    </Center>
  );
};

const GoldDie = ({ result }: { result: string }) => {
  const goldColor = useColorModeValue("yellow.500", "yellow.400");
  switch (result) {
    case "1":
      return <Icon h={14} w={14} as={GiDiceSixFacesOne} color={goldColor} />;
    case "2":
      return <Icon h={14} w={14} as={GiDiceSixFacesTwo} color={goldColor} />;
    case "3":
      return <Icon h={14} w={14} as={GiDiceSixFacesThree} color={goldColor} />;
    case "4":
      return <Icon h={14} w={14} as={GiDiceSixFacesFour} color={goldColor} />;
    case "5":
      return <Icon h={14} w={14} as={GiDiceSixFacesFive} color={goldColor} />;
    case "6":
      return <Icon h={14} w={14} as={GiDiceSixFacesSix} color={goldColor} />;
    default:
      return null;
  }
};

export default TrophyDice;
