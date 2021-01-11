import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

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

export default UsernameModal;
