import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import findEmptySpace, { getBoxes } from '../utils/findEmptySpace';

const MIN_HEIGHT = 190;
const MIN_WIDTH = 90;

interface ClockModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

const ClockModal = React.forwardRef<HTMLElement, ClockModalProps>(
  ({ isOpen, onClose, roomId = '' }, quickRollRef) => {
    const [clockTitle, setClockTitle] = React.useState('');
    const [clockSegments, setClockSegments] = React.useState<number>();
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        // @ts-ignore
        finalFocusRef={quickRollRef}
      >
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const { top, left } = findEmptySpace({
                MIN_HEIGHT,
                MIN_WIDTH,
                ...getBoxes(),
              });
              try {
                await API.graphql({
                  query: mutations.createCounter,
                  variables: {
                    input: {
                      roomId,
                      title: clockTitle,
                      x: top,
                      y: left,
                      value: 0,
                      max: clockSegments,
                      type: 'CLOCK',
                    },
                  },
                });
                toast({
                  duration: 5000,
                  description: 'Clock created',
                  status: 'success',
                  isClosable: true,
                });
              } catch (e) {
                toast({
                  duration: 5000,
                  description: 'Unable to create clock',
                  status: 'error',
                  isClosable: true,
                });
              } finally {
                setIsLoading(false);
                setClockSegments(undefined);
                setClockTitle('');
                onClose();
              }
            }}
          >
            <ModalHeader>Create a Clock</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Clock title</FormLabel>
                <Input
                  value={clockTitle}
                  onChange={({ target }) => setClockTitle(target.value)}
                />
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel>Number of segments</FormLabel>
                <NumberInput
                  size="sm"
                  onChange={(_, value) => setClockSegments(value)}
                  value={clockSegments}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                colorScheme="teal"
                type="submit"
                mr={2}
              >
                Create
              </Button>
              <Button
                colorScheme="brand"
                variant="ghost"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }
);

export default ClockModal;
