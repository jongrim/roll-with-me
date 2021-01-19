import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import findEmptySpace, { getBoxes } from '../utils/findEmptySpace';

const MIN_HEIGHT = 90;
const MIN_WIDTH = 190;

interface LabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

const LabelModal = React.forwardRef<HTMLElement, LabelModalProps>(
  ({ isOpen, onClose, roomId = '' }, quickRollRef) => {
    const [contents, setContents] = React.useState('');
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
                  query: mutations.createLabel,
                  variables: {
                    input: {
                      roomId,
                      x: left,
                      y: top,
                      contents,
                    },
                  },
                });
                toast({
                  duration: 5000,
                  description: 'Label created',
                  status: 'success',
                  isClosable: true,
                });
              } catch (e) {
                toast({
                  duration: 5000,
                  description: 'Unable to create label',
                  status: 'error',
                  isClosable: true,
                });
              } finally {
                setIsLoading(false);
                setContents('');
                onClose();
              }
            }}
          >
            <ModalHeader>Create a Label</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Label contents</FormLabel>
                <Input
                  value={contents}
                  onChange={({ target }) => setContents(target.value)}
                />
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

export default LabelModal;
