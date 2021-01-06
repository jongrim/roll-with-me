import * as React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  Grid,
  GridItem,
  useToast,
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
import { ClassifiedItem, Roll, SafetyModule, SavedRoll } from '../types';
import {
  createNewRollFromValues,
  getRollFromQuickString,
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
  safetyItemChanging: boolean;
  addSafetyItem: (value: ClassifiedItem) => void;
  updateSafetyItem: (value: ClassifiedItem) => void;
  removeSafetyItem: (value: ClassifiedItem) => void;
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
  safetyItemChanging,
  addSafetyItem,
  updateSafetyItem,
  removeSafetyItem,
}) => {
  const [name, setName] = React.useState('');
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
            <QuickRollBar name={name} onSubmit={onSubmit} ref={quickRollRef} />
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
                addItem={addSafetyItem}
                updateItem={updateSafetyItem}
                removeItem={removeSafetyItem}
                safetyModule={safetyModule}
              />
            </TabPanel>
            <TabPanel px={0}>
              <RollsHistory rolls={rolls} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <UsernameModal setNameInRoom={setName} ref={quickRollRef} />
      <XCardModal
        clearXCard={updateXCard}
        xCardActive={safetyModule.xCardActive}
        xCardChanging={xCardChanging}
        ref={quickRollRef}
      />
      {Boolean(
        safetyItemChanging ||
          xCardChanging ||
          loadingStates.isDeletingRoll ||
          loadingStates.isRolling ||
          loadingStates.isSavingRoll
      ) && <SpinningCube />}
    </>
  );
};

interface QuickRollBarProps {
  name: string;
  onSubmit: (roll: Roll) => void;
}

const QuickRollBar = React.forwardRef<HTMLElement, QuickRollBarProps>(
  ({ name, onSubmit }, ref) => {
    const [quickRollValue, setQuickRollValue] = React.useState('');
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const quickRoll = getRollFromQuickString(quickRollValue);
          quickRoll.rolledBy = name;
          onSubmit(quickRoll);
        }}
      >
        <InputGroup mb={3}>
          <InputLeftElement>
            <Kbd>/</Kbd>
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder="Quick roll (ex. 2d6+1 as Resist)"
            value={quickRollValue}
            onChange={({ target }) => setQuickRollValue(target.value)}
            //@ts-ignore
            ref={ref}
          />
        </InputGroup>
      </form>
    );
  }
);

interface UsernameModalProps {
  setNameInRoom: (name: string) => void;
}

const UsernameModal = React.forwardRef<HTMLElement, UsernameModalProps>(
  ({ setNameInRoom }, quickRollRef) => {
    const toast = useToast();
    const [nameModalIsOpen, setNameModalIsOpen] = React.useState(true);
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    return (
      <Modal
        isOpen={nameModalIsOpen}
        onClose={() => {
          if (!name) {
            setNameError(true);
            toast({
              title: 'Please set a name',
              description: 'The name identifies who rolled the dice',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          setNameModalIsOpen(false);
          setNameInRoom(name);
        }}
        size="xl"
        // @ts-ignore
        finalFocusRef={quickRollRef}
      >
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!name) {
                setNameError(true);
                toast({
                  title: 'Please set a name',
                  description: 'The name identifies who rolled the dice',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
                return;
              }
              setNameModalIsOpen(false);
              setNameInRoom(name);
            }}
          >
            <ModalHeader>Set your name</ModalHeader>
            <ModalBody>
              <Text pb={2}>Choose a username for your rolls</Text>
              <Input
                isInvalid={nameError}
                value={name}
                onChange={({ target }) => setName(target.value)}
                placeholder="Name"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" type="submit">
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }
);

export default TextRoomPage;
