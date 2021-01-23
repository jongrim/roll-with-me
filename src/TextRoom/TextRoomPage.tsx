import * as React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Text,
  Button,
  Grid,
  GridItem,
  Center,
  Heading,
  VStack,
  Box,
  Flex,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import BuildRollForm from './BuildRollForm';
import SettingsBar from '../SettingsBar/SettingsBar';
import RollsHistory from './RollsHistory';
import { Roll, SafetyModule, SavedRoll } from '../types';
import {
  createNewRollFromValues,
  makeNDice,
  savedRollToRoll,
} from '../utils/rolls';
import RollResults from './RollResults';
import SavedRolls from './SavedRolls';
import { compose } from '../utils/fnTools';
import RoomCounters from './RoomCounters';
import XCardModal from '../XCardModal/XCardModal';
import SafetyForm from '../SafetyForm/SafetyForm';
import SpinningCube from '../SpinningCube/SpinningCube';
import UsernameModal from '../UsernameModal/UsernameModal';
import QuickRollBar from '../QuickRollBar/QuickRollBar';

interface TextRoomPageProps {
  roomId: string;
  roomName: string;
  onSubmit: (roll: Roll) => void;
  rolls: Roll[];
  savedRolls: SavedRoll[];
  createRoll: (roll: SavedRoll) => void;
  deleteRoll: (roll: SavedRoll) => void;
  editRoll: (roll: SavedRoll) => void;
  loadingStates: {
    isRolling: boolean;
    isSavingRoll: boolean;
    isDeletingRoll: boolean;
  };
  safetyModule: SafetyModule;
  updateXCard: (value: boolean) => void;
  xCardChanging: boolean;
}

const TextRoomPage: React.FC<TextRoomPageProps> = ({
  roomId,
  roomName,
  onSubmit,
  rolls,
  savedRolls,
  createRoll,
  deleteRoll,
  editRoll,
  loadingStates,
  safetyModule,
  updateXCard,
  xCardChanging,
}) => {
  const [actionInProgress, setActionInProgress] = React.useState(false);
  const [name, setName] = React.useState('');
  const quickRollRef = React.useRef<HTMLElement>(null!);
  React.useEffect(() => {
    const checkForQuickCommand = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        quickRollRef.current?.focus();
      }
    };
    document.addEventListener('keyup', checkForQuickCommand);
    return () => document.removeEventListener('keyup', checkForQuickCommand);
  }, [quickRollRef]);

  const submitQuickRoll = compose(
    onSubmit,
    savedRollToRoll(name),
    createNewRollFromValues
  );

  return (
    <>
      <SettingsBar />
      <Container maxW="6xl">
        <VStack spacing={4} w="full" align="flex-start">
          <Box w="full">
            <QuickRollBar
              name={name}
              onSubmit={onSubmit}
              ref={quickRollRef}
              placeholder="Quick roll (ex. 2d6+1 as Resist)"
            />
          </Box>
          <Flex w="full">
            <Box mr={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={() =>
                  submitQuickRoll({
                    id: uuidv4(),
                    dice: makeNDice({ count: 2, sides: 6 }),
                    rollName: '2d6',
                    rolledBy: '',
                    modifier: 0,
                  })
                }
              >
                2d6
              </Button>
            </Box>
            <Box mr={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() =>
                  submitQuickRoll({
                    id: uuidv4(),
                    dice: makeNDice({ count: 1, sides: 20 }),
                    rollName: '1d20',
                    rolledBy: '',
                    modifier: 0,
                  })
                }
              >
                1d20
              </Button>
            </Box>
            <Box mr={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="yellow"
                onClick={() =>
                  submitQuickRoll({
                    id: uuidv4(),
                    dice: makeNDice({ count: 2, sides: 20 }),
                    rollName: '2d20',
                    rolledBy: '',
                    modifier: 0,
                  })
                }
              >
                2d20
              </Button>
            </Box>
            <Box mr={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                onClick={() =>
                  submitQuickRoll({
                    id: uuidv4(),
                    dice: makeNDice({ count: 1, sides: 100 }),
                    rollName: '1d100',
                    rolledBy: '',
                    modifier: 0,
                  })
                }
              >
                1d100
              </Button>
            </Box>
            <Box ml="auto">
              <Button
                isLoading={xCardChanging}
                size="sm"
                variant="outline"
                colorScheme="brand"
                onClick={() => updateXCard(!safetyModule.xCardActive)}
              >
                x-card
              </Button>
            </Box>
          </Flex>
        </VStack>
      </Container>
      <Container maxW="6xl" mt={6} h="100%">
        <Tabs
          variant="unstyled"
          display="flex"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <TabList
            flexDirection={['row', 'row', 'row', 'column']}
            justifyContent={['stretch', 'stretch', 'flex-start']}
            mr={[0, 0, 0, 8]}
            my={[4, 4, 4, 0]}
            pt={[0, 0, 0, '0.4rem']}
          >
            <Tab
              _selected={{
                opacity: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'brand.300',
              }}
              opacity="0.6"
              flex={[1, 1, 1, 0]}
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
              flex={[1, 1, 1, 0]}
            >
              Safety
            </Tab>
            <Tab
              _selected={{
                opacity: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'brand.300',
              }}
              opacity="0.6"
              flex={[1, 1, 1, 0]}
            >
              Roll History
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Grid
                templateColumns={['1fr', '1fr', '1fr 1fr']}
                templateRows="1fr"
                w="full"
                gap={8}
              >
                <GridItem order={[2, 2, 1]}>
                  <Tabs variant="line" size="sm" isFitted>
                    <TabList>
                      <Tab>Build a Roll</Tab>
                      <Tab>Saved Rolls</Tab>
                      <Tab>Counters</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <BuildRollForm
                          onSubmit={onSubmit}
                          saveRoll={createRoll}
                          isRolling={loadingStates.isRolling}
                          rolledByName={name}
                        />
                      </TabPanel>
                      <TabPanel align="center">
                        <SavedRolls
                          createRoll={createRoll}
                          deleteRoll={deleteRoll}
                          editRoll={editRoll}
                          savedRolls={savedRolls}
                          rollSavedRoll={compose(
                            onSubmit,
                            savedRollToRoll(name)
                          )}
                        />
                      </TabPanel>
                      <TabPanel>
                        <RoomCounters roomName={roomName} roomId={roomId} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </GridItem>
                <GridItem order={[1, 1, 2]}>
                  {rolls[0] ? (
                    <RollResults
                      roll={rolls[0]}
                      isRolling={loadingStates.isRolling}
                    />
                  ) : (
                    <>
                      <Heading
                        as="h3"
                        size="md"
                        borderBottom="2px solid"
                        borderBottomColor="inherit"
                        pb={1}
                        mb={2}
                      >
                        Last Roll
                      </Heading>
                      <Center>
                        <Text>No rolls yet - try one now!</Text>
                      </Center>
                    </>
                  )}
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel px={0}>
              <SafetyForm
                id={safetyModule.id}
                setActionInProgress={setActionInProgress}
              />
            </TabPanel>
            <TabPanel px={0}>
              <RollsHistory rolls={rolls} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <UsernameModal setNameInRoom={setName} ref={quickRollRef} />
      <XCardModal safetyModuleId={safetyModule.id} ref={quickRollRef} />
      {Boolean(
        xCardChanging ||
          loadingStates.isDeletingRoll ||
          loadingStates.isRolling ||
          loadingStates.isSavingRoll ||
          actionInProgress
      ) && <SpinningCube />}
    </>
  );
};

export default TextRoomPage;
