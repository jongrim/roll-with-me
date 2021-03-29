import * as React from 'react';
import {
  Box,
  Text,
  Input,
  Icon,
  Center,
  Flex,
  Textarea,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  Button,
} from '@chakra-ui/react';
import {
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
} from 'react-icons/gi';
import { TrophyGoldBeast, UpdateTrophyGoldBeastInput } from '../API';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import useDelayedUpdate from './useDelayedUpdate';
import { makeBeast } from './TrophyGoldGameTypes';
import DragonSvg from './DragonSvg';
import SpinningCube from '../SpinningCube/SpinningCube';

export const createBeast = async (gameID: string) => {
  try {
    await API.graphql({
      query: mutations.createTrophyGoldBeast,
      variables: {
        input: makeBeast(gameID),
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

interface BestiaryProps {
  beasts: TrophyGoldBeast[];
  gameID: string;
}

export default function Bestiary({ beasts, gameID }: BestiaryProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  return (
    <Box py={3}>
      {beasts.length > 0 && (
        <Flex justifyContent="flex-end" mb={-3} pr={8}>
          <Button
            variant="outline"
            onClick={async () => {
              setIsSaving(true);
              await createBeast(gameID);
              setIsSaving(false);
            }}
          >
            New Beast
          </Button>
        </Flex>
      )}
      {beasts?.map((beast) => (
        <Beast key={beast.id} beast={beast} setBusy={setIsSaving} />
      ))}
      {beasts.length === 0 && (
        <Center>
          <Button
            variant="outline"
            px={8}
            py={6}
            h="auto"
            leftIcon={
              <Icon h={12} w={12} position="relative" top="4px">
                <DragonSvg />
              </Icon>
            }
            onClick={async () => {
              setIsSaving(true);
              await createBeast(gameID);
              setIsSaving(false);
            }}
          >
            A New Beast Emerges
          </Button>
        </Center>
      )}
      {isSaving && <SpinningCube />}
    </Box>
  );
}

interface BeastProps {
  beast: TrophyGoldBeast;
  setBusy: (val: boolean) => void;
}

export const updateBeast = async (beast: UpdateTrophyGoldBeastInput) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyGoldBeast,
      variables: {
        input: {
          ...beast,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

function Beast({ beast, setBusy }: BeastProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const updateWithId = React.useCallback(
    async (update: Omit<UpdateTrophyGoldBeastInput, 'id'>) => {
      setBusy(true);
      await updateBeast({ id: beast.id || '', ...update });
      setBusy(false);
    },
    [beast.id, setBusy]
  );
  const [trackedTitle, setTrackedTitle] = React.useState(beast.title || '');
  React.useEffect(() => {
    setTrackedTitle(beast.title || '');
  }, [beast.title]);

  const [trackedEndurance, setTrackedEndurance] = React.useState(
    beast.endurance || ''
  );
  React.useEffect(() => {
    setTrackedEndurance(beast.endurance || '');
  }, [beast.endurance]);

  const [trackedDescription, setTrackedDescription] = React.useState(
    beast.description || ''
  );
  React.useEffect(() => {
    setTrackedDescription(beast.description || '');
  }, [beast.description]);

  const [trackedHabit1, setTrackedHabit1] = React.useState(beast.habit1 || '');
  React.useEffect(() => {
    setTrackedHabit1(beast.habit1 || '');
  }, [beast.habit1]);

  const [trackedHabit2, setTrackedHabit2] = React.useState(beast.habit2 || '');
  React.useEffect(() => {
    setTrackedHabit2(beast.habit2 || '');
  }, [beast.habit2]);

  const [trackedHabit3, setTrackedHabit3] = React.useState(beast.habit3 || '');
  React.useEffect(() => {
    setTrackedHabit3(beast.habit3 || '');
  }, [beast.habit3]);

  const [trackedHabit4, setTrackedHabit4] = React.useState(beast.habit4 || '');
  React.useEffect(() => {
    setTrackedHabit4(beast.habit4 || '');
  }, [beast.habit4]);

  const [trackedHabit5, setTrackedHabit5] = React.useState(beast.habit5 || '');
  React.useEffect(() => {
    setTrackedHabit5(beast.habit5 || '');
  }, [beast.habit5]);

  const [trackedHabit6, setTrackedHabit6] = React.useState(beast.habit6 || '');
  React.useEffect(() => {
    setTrackedHabit6(beast.habit6 || '');
  }, [beast.habit6]);

  const [trackedDefenses, setTrackedDefenses] = React.useState(
    beast.defenses || ''
  );
  React.useEffect(() => {
    setTrackedDefenses(beast.defenses || '');
  }, [beast.defenses]);

  const [trackedWeakness, setTrackedWeakness] = React.useState(
    beast.weakness || ''
  );
  React.useEffect(() => {
    setTrackedWeakness(beast.weakness || '');
  }, [beast.weakness]);

  const { delayedUpdate: updateTrackedTitle } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedEndurance } = useDelayedUpdate(
    updateWithId
  );
  const { delayedUpdate: updateTrackedDescription } = useDelayedUpdate(
    updateWithId
  );
  const { delayedUpdate: updateTrackedHabit1 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedHabit2 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedHabit3 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedHabit4 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedHabit5 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedHabit6 } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: updateTrackedDefenses } = useDelayedUpdate(
    updateWithId
  );
  const { delayedUpdate: updateTrackedWeakness } = useDelayedUpdate(
    updateWithId
  );

  return (
    <Box position="relative" zIndex={1} px={8} py={6}>
      <Box
        position="absolute"
        w={16}
        h={16}
        top="8px"
        left="8px"
        zIndex={2}
        borderRadius="50%"
        border="5px double"
        borderColor="inherit"
        bgColor={bgColor}
        boxShadow="sm"
      >
        <Center h="full">
          <Input
            variant="flushed"
            w={6}
            textAlign="center"
            fontWeight="500"
            fontSize="xl"
            value={trackedEndurance}
            onChange={({ target }) => {
              setTrackedEndurance(target.value);
              updateTrackedEndurance({ endurance: target.value });
            }}
          />
        </Center>
      </Box>
      <Box
        border="1px solid"
        borderColor="inherit"
        borderRadius="md"
        px={3}
        py={2}
      >
        <Flex direction="column" alignItems="flex-end" w="full" pl={8}>
          <Input
            aria-label="Beast title"
            variant="filled"
            value={trackedTitle}
            fontWeight="600"
            fontSize="lg"
            placeholder="Title"
            mb={2}
            onChange={({ target }) => {
              setTrackedTitle(target.value);
              updateTrackedTitle({ title: target.value });
            }}
          />
          <Textarea
            aria-label="Beast description"
            value={trackedDescription}
            placeholder="Description"
            onChange={({ target }) => {
              setTrackedDescription(target.value);
              updateTrackedDescription({ description: target.value });
            }}
          />
        </Flex>
        <Grid
          templateColumns={[
            '1fr 1fr',
            '1fr 1fr',
            '1fr 1fr ',
            '1fr 1fr',
            '1fr 1fr 1fr',
          ]}
          columnGap={3}
          rowGap={6}
          mt={3}
        >
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice1} />
              <Input
                aria-label="Beast habit 1"
                variant="flushed"
                value={trackedHabit1}
                onChange={({ target }) => {
                  setTrackedHabit1(target.value);
                  updateTrackedHabit1({ habit1: target.value });
                }}
              />
            </HStack>
          </GridItem>
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice2} />
              <Input
                aria-label="Beast habit 2"
                variant="flushed"
                value={trackedHabit2}
                onChange={({ target }) => {
                  setTrackedHabit2(target.value);
                  updateTrackedHabit2({ habit2: target.value });
                }}
              />
            </HStack>
          </GridItem>
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice3} />
              <Input
                aria-label="Beast habit 3"
                variant="flushed"
                value={trackedHabit3}
                onChange={({ target }) => {
                  setTrackedHabit3(target.value);
                  updateTrackedHabit3({ habit3: target.value });
                }}
              />
            </HStack>
          </GridItem>
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice4} />
              <Input
                aria-label="Beast habit 4"
                variant="flushed"
                value={trackedHabit4}
                onChange={({ target }) => {
                  setTrackedHabit4(target.value);
                  updateTrackedHabit4({ habit4: target.value });
                }}
              />
            </HStack>
          </GridItem>
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice5} />
              <Input
                aria-label="Beast habit 5"
                variant="flushed"
                value={trackedHabit5}
                onChange={({ target }) => {
                  setTrackedHabit5(target.value);
                  updateTrackedHabit5({ habit5: target.value });
                }}
              />
            </HStack>
          </GridItem>
          <GridItem>
            <HStack spacing={3}>
              <Icon h={8} w={8} as={GiInvertedDice6} />
              <Input
                aria-label="Beast habit 6"
                variant="flushed"
                value={trackedHabit6}
                onChange={({ target }) => {
                  setTrackedHabit6(target.value);
                  updateTrackedHabit6({ habit6: target.value });
                }}
              />
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="60% 40%" mt={3}>
          <GridItem mr={3}>
            <Text fontWeight="600">Defenses</Text>
            <Textarea
              variant="flushed"
              value={trackedDefenses}
              onChange={({ target }) => {
                setTrackedDefenses(target.value);
                updateTrackedDefenses({ defenses: target.value });
              }}
            />
          </GridItem>
          <GridItem>
            <Text fontWeight="600">Weakness</Text>
            <Textarea
              variant="flushed"
              value={trackedWeakness}
              onChange={({ target }) => {
                setTrackedWeakness(target.value);
                updateTrackedWeakness({ weakness: target.value });
              }}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
