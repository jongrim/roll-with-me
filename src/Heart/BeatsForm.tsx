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
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Heading,
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

  const handleTypeChange = (typeSetter: (type: BeatType) => void) => (
    val: number
  ) => {
    switch (val) {
      case 0:
        typeSetter('minor');
        break;
      case 1:
        typeSetter('major');
        break;
      case 2:
        typeSetter('zenith');
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onDone} size="lg">
      <ModalOverlay />
      <ModalContent fontFamily="Roboto Slab">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Adjust Beats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h3" size="md" fontFamily="Roboto Slab" mb={3}>
              First Beat
            </Heading>
            <FormControl id="beat-1-name">
              <Box w="full" h={16} px={6}>
                <Box position="relative" h={8}>
                  <Text
                    transform="translateX(-50%)"
                    display="inline-block"
                    pos="absolute"
                    left="0%"
                  >
                    Minor
                  </Text>
                  <Text
                    transform="translateX(-50%)"
                    display="inline-block"
                    pos="absolute"
                    left="50%"
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
                  max={2}
                  step={1}
                  onChange={handleTypeChange(setType1)}
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
            </FormControl>
            <FormControl id="beat-1-description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="outline"
                value={description1}
                onChange={({ target }) => setDescription1(target.value)}
              />
            </FormControl>
            <Heading as="h3" size="md" fontFamily="Roboto Slab" mt={8} mb={3}>
              Second Beat
            </Heading>
            <FormControl id="beat-2-name">
              <Box w="full" h={16} px={6}>
                <Box position="relative" h={8}>
                  <Text
                    transform="translateX(-50%)"
                    display="inline-block"
                    pos="absolute"
                    left="0%"
                  >
                    Minor
                  </Text>
                  <Text
                    transform="translateX(-50%)"
                    display="inline-block"
                    pos="absolute"
                    left="50%"
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
                  max={2}
                  step={1}
                  onChange={handleTypeChange(setType2)}
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
            </FormControl>
            <FormControl id="beat-2-description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="outline"
                value={description2}
                onChange={({ target }) => setDescription2(target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" mr={2}>
              Save
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

export default BeatsForm;
