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

interface BackgroundImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  currentUrl?: string;
}

const BackgroundImageModal = React.forwardRef<
  HTMLInputElement,
  BackgroundImageModalProps
>(({ isOpen, onClose, roomId = '', currentUrl }, quickRollRef) => {
  const [contents, setContents] = React.useState(currentUrl);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClearing, setIsClearing] = React.useState(false);

  React.useEffect(() => {
    setContents(currentUrl);
  }, [currentUrl]);

  const handleSubmit = async (url: string) => {
    try {
      await API.graphql({
        query: mutations.updateInteractiveRoom,
        variables: {
          input: {
            id: roomId,
            backgroundImageUrl: url,
          },
        },
      });
      toast({
        duration: 5000,
        description: 'Image set',
        status: 'success',
        isClosable: true,
      });
    } catch (e) {
      toast({
        duration: 5000,
        description: 'Unable to set image',
        status: 'error',
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            if (!contents) return;
            setIsLoading(true);
            handleSubmit(contents).finally(() => {
              setIsLoading(false);
            });
          }}
        >
          <ModalHeader>Set a background image</ModalHeader>
          <ModalBody>
            <FormControl isRequired id="background-img">
              <FormLabel>Background Image URL</FormLabel>
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
              Set Background Image
            </Button>
            {currentUrl && (
              <Button
                onClick={() => {
                  setContents('');
                  setIsClearing(true);
                  handleSubmit('').finally(() => {
                    setIsClearing(false);
                  });
                }}
                isLoading={isClearing}
                variant="outline"
                mr={2}
              >
                Clear
              </Button>
            )}
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
});

export default BackgroundImageModal;
