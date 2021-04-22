import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Input,
  Text,
  Button,
  Center,
  Heading,
  useNumberInput,
  HStack,
  Box,
  Divider,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  CircularProgress,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { RiAddCircleLine, RiDeleteBin4Line } from 'react-icons/ri';
import { useRoomCounters } from './useRoomCounters';
import { Counter } from '../types';

interface RoomCountersProps {
  roomId: string;
  roomName: string;
  counters: unknown[];
}

const RoomCounters: React.FC<RoomCountersProps> = ({
  roomId,
  roomName,
  counters: initialCounters,
}) => {
  const {
    counters,
    createCounter,
    updateCounter,
    deleteCounter,
    isLoading,
  } = useRoomCounters({ name: roomName, roomId, initialCounters });

  const [newCounterTitle, setNewCounterTitle] = React.useState('');
  const [
    newCounterStartingCount,
    setNewCounterStartingCount,
  ] = React.useState<number>();
  const [counterToDelete, setCounterToDelete] = React.useState<Counter>();
  return (
    <Box position="relative">
      {isLoading && (
        <Box position="absolute" top={0} bottom={0} right={0} left={0}>
          <Center h="100%">
            <CircularProgress isIndeterminate color="brand.600" />
          </Center>
        </Box>
      )}
      <Box opacity={isLoading ? '0.6' : '1'}>
        <Text>Use counters to track meta-items like tokens or clocks</Text>
        {counters.map((counter: Counter) => (
          <CounterInput
            key={counter.id}
            {...counter}
            updateCounter={updateCounter}
            deleteCounter={() => setCounterToDelete(counter)}
          />
        ))}
        <Divider mt={3} mb={4} />
        <Heading size="sm" mb={3}>
          Create a new counter
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newCounter = {
              title: newCounterTitle,
              value: newCounterStartingCount,
              id: uuidv4(),
            };
            createCounter(newCounter);
            setNewCounterTitle('');
            setNewCounterStartingCount(undefined);
          }}
        >
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={newCounterTitle}
              onChange={({ target }) => setNewCounterTitle(target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel>Starting count</FormLabel>
            <NumberInput
              size="sm"
              onChange={(_, value: number) => setNewCounterStartingCount(value)}
              value={newCounterStartingCount}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            leftIcon={<RiAddCircleLine />}
            colorScheme="brand"
            variant="outline"
            type="submit"
            mt={4}
          >
            Create
          </Button>
        </form>
        <DeleteCounterDialog
          isOpen={Boolean(counterToDelete)}
          onClose={() => setCounterToDelete(undefined)}
          submitDelete={() => {
            deleteCounter(counterToDelete);
            setCounterToDelete(undefined);
          }}
        />
      </Box>
    </Box>
  );
};

interface CounterProps {
  value: number;
  title: string;
  id: string;
  updateCounter: (counter: Counter) => void;
  deleteCounter: () => void;
}

const CounterInput: React.FC<CounterProps> = ({
  value,
  title,
  id,
  updateCounter,
  deleteCounter,
}) => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    value,
  });

  const increment = () => updateCounter({ id, title, value: value + 1 });
  const decrement = () => updateCounter({ id, title, value: value - 1 });

  const inc = getIncrementButtonProps({ onClick: increment });
  const dec = getDecrementButtonProps({ onClick: decrement });
  const input = getInputProps({
    // @ts-ignore
    isReadOnly: true,
  });

  return (
    <Box mt={3}>
      <Text fontWeight="600" fontSize="sm">
        {title}
      </Text>
      <HStack mt={2}>
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
        <IconButton
          variant="outline"
          icon={<RiDeleteBin4Line />}
          aria-label="delete"
          onClick={deleteCounter}
        />
      </HStack>
    </Box>
  );
};

interface DeleteCounterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  submitDelete: () => void;
}

const DeleteCounterDialog: React.FC<DeleteCounterDialogProps> = ({
  isOpen,
  onClose,
  submitDelete,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Counter
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={submitDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RoomCounters;
