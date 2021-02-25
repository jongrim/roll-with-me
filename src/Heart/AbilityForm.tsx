import * as React from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Box,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Ability, AbilityType } from './HeartGameTypes';

interface AbilityFormProps {
  isOpen: boolean;
  onDone: (ability?: Ability) => void;
}

const AbilityForm = ({ isOpen, onDone }: AbilityFormProps) => {
  const [type, setType] = React.useState<AbilityType>('core');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTypeChange = (val: number) => {
    switch (val) {
      case 0:
        setType('core');
        break;
      case 1:
        setType('minor');
        break;
      case 2:
        setType('major');
        break;
      case 3:
        setType('zenith');
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDone({
      id: uuidv4(),
      name,
      description,
      type,
    });
    setType('core');
    setName('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onDone}>
      <ModalOverlay />
      <ModalContent fontFamily="Alegreya">
        <form onSubmit={handleSubmit}>
          <ModalHeader>New Ability</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full" h={24} px={3}>
              <Box position="relative" h={8}>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="0%"
                >
                  Core
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="33.67%"
                >
                  Minor
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="66.67%"
                >
                  Major
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="100%"
                >
                  Zenith
                </Text>
              </Box>
              <Slider
                defaultValue={0}
                min={0}
                max={3}
                step={1}
                onChange={handleTypeChange}
              >
                <SliderTrack bg="red.100">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb
                  boxSize={6}
                  borderColor="gray.200"
                  border="1px solid"
                />
              </Slider>
            </Box>
            <FormControl id="ability-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant="flushed"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </FormControl>
            <FormControl id="ability-description" isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="flushed"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
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

export default AbilityForm;