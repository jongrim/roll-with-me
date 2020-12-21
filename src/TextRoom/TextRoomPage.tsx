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
} from '@chakra-ui/react';
import BuildRollForm from './BuildRollForm';
import CustomDieForm from './CustomDieForm';
import SettingsBar from '../SettingsBar/SettingsBar';
import RollsHistory from './RollsHistory';
import { Roll, SavedRoll } from '../types';
import { getRollFromQuickString, savedRollToRoll } from '../utils/rolls';
import RollResults from './RollResults';
import SavedRolls from './SavedRolls';
import { compose } from '../utils/fnTools';

interface TextRoomPageProps {
  onSubmit: (roll: Roll) => void;
  rolls: Roll[];
  savedRolls: SavedRoll[];
  saveRoll: (roll: SavedRoll) => void;
}

const TextRoomPage: React.FC<TextRoomPageProps> = ({
  onSubmit,
  rolls,
  savedRolls,
  saveRoll,
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

  return (
    <>
      <SettingsBar />
      <Container maxW="6xl" centerContent>
        <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} w="full" gap={8}>
          <GridItem colSpan={[1, 1, 2]}>
            <QuickRollBar name={name} onSubmit={onSubmit} ref={quickRollRef} />
          </GridItem>
          <GridItem order={[2, 2, 1]}>
            <Tabs variant="line" size="sm" align="center">
              <TabList>
                <Tab>Build a Roll</Tab>
                <Tab>Saved Rolls</Tab>
                <Tab>Create a Custom Die</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BuildRollForm
                    onSubmit={(roll) => onSubmit({ ...roll, rolledBy: name })}
                    saveRoll={saveRoll}
                  />
                </TabPanel>
                <TabPanel>
                  <SavedRolls
                    savedRolls={savedRolls}
                    saveRoll={saveRoll}
                    rollSavedRoll={compose(onSubmit, savedRollToRoll(name))}
                  />
                </TabPanel>
                <TabPanel>
                  <CustomDieForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem order={[1, 1, 2]}>
            <RollResults roll={rolls[0]} />
          </GridItem>
          <GridItem order={3} colSpan={[1, 1, 2]}>
            <RollsHistory rolls={rolls} />
          </GridItem>
        </Grid>
      </Container>
      <UsernameModal setNameInRoom={setName} ref={quickRollRef} />
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
