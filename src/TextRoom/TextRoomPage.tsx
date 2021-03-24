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
  ModalOverlay,
  Modal,
  ModalContent,
  Spinner,
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
import useUserRoom from '../hooks/useUserRoom';
import TextRoomControls from './TextRoomControls';
import { CustomDie } from '../utils/dice';

interface TextRoomPageProps {
  roomId: string;
  roomName: string;
  onSubmit: (roll: Roll) => void;
  rolls: Roll[];
  customDice: CustomDie[];
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
  customDice,
  savedRolls,
  createRoll,
  deleteRoll,
  editRoll,
  loadingStates,
  safetyModule,
  updateXCard,
  xCardChanging,
}) => {
  const { username, setUsername, isLoaded: userSettingsIsLoaded } = useUserRoom(
    {
      roomName,
      roomId,
      roomKey: 'textRoom',
    }
  );
  const [actionInProgress, setActionInProgress] = React.useState(false);
  const quickRollRef = React.useRef<HTMLInputElement>(null!);
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
    savedRollToRoll(username),
    createNewRollFromValues
  );

  return (
    <Box h="full" overflow="auto">
      <SettingsBar username={username} setUsername={setUsername} />
      <Container maxW="6xl">
        <VStack spacing={4} w="full" align="flex-start">
          <Box w="full">
            <QuickRollBar
              name={username}
              onSubmit={onSubmit}
              ref={quickRollRef}
              placeholder="Quick roll (ex. 2d6+1 as Resist)"
              customDice={customDice}
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
            <Tab
              _selected={{
                opacity: 1,
                borderBottom: '1px solid',
                borderBottomColor: 'brand.300',
              }}
              opacity="0.6"
              flex={[1, 1, 1, 0]}
            >
              Room Controls
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Grid
                templateColumns={['1fr', '1fr', '1fr 1fr']}
                templateRows="minmax(0, 1fr)"
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
                          rolledByName={username}
                          savedCustomDice={customDice}
                          roomId={roomId}
                        />
                      </TabPanel>
                      <TabPanel align="center">
                        <SavedRolls
                          createRoll={createRoll}
                          deleteRoll={deleteRoll}
                          editRoll={editRoll}
                          savedRolls={savedRolls}
                          savedCustomDice={customDice}
                          rollSavedRoll={compose(
                            onSubmit,
                            savedRollToRoll(username)
                          )}
                          roomId={roomId}
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
                    <RollResults rolls={rolls.slice(0, 4)} />
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
              <RollsHistory
                rolls={rolls}
                roomId={roomId}
                rollAgain={onSubmit}
                saveRoll={createRoll}
                username={username}
              />
            </TabPanel>
            <TabPanel px={0}>
              <TextRoomControls roomId={roomId} savedCustomDice={customDice} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <UsernameModal
        ref={quickRollRef}
        setUsername={setUsername}
        isOpen={userSettingsIsLoaded && !username}
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
      <XCardModal safetyModuleId={safetyModule.id} ref={quickRollRef} />
      {Boolean(
        xCardChanging ||
          loadingStates.isDeletingRoll ||
          loadingStates.isRolling ||
          loadingStates.isSavingRoll ||
          actionInProgress
      ) && <SpinningCube />}
    </Box>
  );
};

export default TextRoomPage;
