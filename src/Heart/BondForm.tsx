import * as React from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormHelperText,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Bond } from './HeartGameTypes';

interface BondFormProps {
  isOpen: boolean;
  onDone: (bond?: Bond) => void;
}

const BondForm = ({ isOpen, onDone }: BondFormProps) => {
  const [name, setName] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDone({
      id: uuidv4(),
      name,
      notes,
    });
    setName('');
    setNotes('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onDone} size="lg">
      <ModalOverlay />
      <ModalContent fontFamily="Roboto Slab">
        <form onSubmit={handleSubmit}>
          <ModalHeader>New Bond</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="ability-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant="flushed"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </FormControl>
            <FormControl id="ability-description" isRequired mt={4}>
              <FormLabel>Notes</FormLabel>
              <Textarea
                variant="flushed"
                value={notes}
                onChange={({ target }) => setNotes(target.value)}
              />
              <FormHelperText>
                Use notes to track stress and other relevant info
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" mr={2}>
              Add
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                onDone();
              }}
              type="button"
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default BondForm;
