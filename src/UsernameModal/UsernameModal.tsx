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
  Link,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

interface UsernameModalProps {
  isOpen: boolean;
  setUsername: (val: string) => void;
}

const UsernameModal = React.forwardRef<HTMLElement, UsernameModalProps>(
  ({ isOpen, setUsername }, quickRollRef) => {
    const toast = useToast();
    const { user } = React.useContext(AuthContext);
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    return (
      <Modal
        isOpen={isOpen}
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
          setUsername(name);
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
              setUsername(name);
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
              {user && (
                <Text size="sm" fontWeight="300" mt={3}>
                  This will be saved for you. Change it later from the sidebar
                  or your{' '}
                  <Link
                    as={ReactRouterLink}
                    to="/profile/rooms"
                    color="brand.500"
                  >
                    active rooms
                  </Link>{' '}
                  page.
                </Text>
              )}
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
