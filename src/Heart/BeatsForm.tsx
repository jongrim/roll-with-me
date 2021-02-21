import * as React from 'react';
import {
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
  Select,
  Divider,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Beat, BeatType } from './HeartGameTypes';

interface BeatsFormProps {
  beats: Beat[];
  isOpen: boolean;
  onDone: (beats?: Beat[]) => void;
}

const BeatsForm = ({ isOpen, onDone, beats }: BeatsFormProps) => {
  const [beat1, beat2] = beats;
  const [type1, setType1] = React.useState<BeatType>(beat1?.type ?? 'minor');
  const [type2, setType2] = React.useState<BeatType>(beat2?.type ?? 'minor');
  const [description1, setDescription1] = React.useState(
    beat1?.description ?? ''
  );
  const [description2, setDescription2] = React.useState(
    beat2?.description ?? ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDone([
      { id: beat1?.id || uuidv4(), type: type1, description: description1 },
      { id: beat2?.id || uuidv4(), type: type2, description: description2 },
    ]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onDone}>
      <ModalOverlay />
      <ModalContent fontFamily="Alegreya">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Adjust Beats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="beat-1-name">
              <FormLabel>Beat Type</FormLabel>
              <Select
                defaultValue={type1}
                onChange={({ target }) => setType1(target.value as BeatType)}
              >
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="zenith">Zenith</option>
              </Select>
            </FormControl>
            <FormControl id="beat-1-description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="flushed"
                value={description1}
                onChange={({ target }) => setDescription1(target.value)}
              />
            </FormControl>
            <Divider my={6} />
            <FormControl id="beat-2-name">
              <FormLabel>Beat Type</FormLabel>
              <Select
                defaultValue={type2}
                onChange={({ target }) => setType2(target.value as BeatType)}
              >
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="zenith">Zenith</option>
              </Select>
            </FormControl>
            <FormControl id="beat-2-description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="flushed"
                value={description2}
                onChange={({ target }) => setDescription2(target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" mr={2}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => onDone()}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default BeatsForm;
