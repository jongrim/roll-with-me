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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useRadioGroup,
  useRadio,
  UseRadioProps,
  useColorModeValue,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import {
  Fallout,
  FalloutType,
  Resistance,
  resistances,
} from './HeartGameTypes';
import QuillEditor from '../Common/QuillEditor/QuillEditor';

interface FalloutFormProps {
  isOpen: boolean;
  onDone: (fallout?: Fallout) => void;
}

const FalloutForm = ({ isOpen, onDone }: FalloutFormProps) => {
  const [type, setType] = React.useState<FalloutType>('minor');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const errorColor = useColorModeValue('red.600', 'red.300');
  const [resistance, setResistance] = React.useState<Resistance>('Blood');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'room type',
    defaultValue: 'Blood',
    onChange: (nextValue: Resistance) => setResistance(nextValue),
  });

  const group = getRootProps();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      setDescriptionError('Please provide a description');
      return;
    }
    onDone({
      id: uuidv4(),
      type,
      description,
      title,
      resistance,
    });
    setType('minor');
    setTitle('');
    setDescription('');
    setDescriptionError('');
    setResistance('Blood');
  };

  const handleTypeChange = (val: number) => {
    switch (val) {
      case 0:
        setType('minor');
        break;
      case 1:
        setType('major');
        break;
      case 2:
        setType('critical');
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onDone} size="lg">
      <ModalOverlay />
      <ModalContent fontFamily="Roboto Slab">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add Fallout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full" h={16} px={5}>
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
                  Critical
                </Text>
              </Box>
              <Slider
                defaultValue={0}
                min={0}
                max={2}
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
            <FormControl id="fallout-title" isRequired mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                variant="flushed"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </FormControl>
            <FormControl
              id="fallout-description"
              isRequired
              mt={4}
              isInvalid={Boolean(descriptionError)}
            >
              <FormLabel>Description</FormLabel>
              <Box border="1px solid" borderColor="inherit" borderRadius="md">
                <QuillEditor
                  initial={description}
                  save={setDescription}
                  placeholder="Fallout description. Supports rich text formatting."
                  saveDelay={0}
                  height="32"
                  editorId="fallout-editor"
                  toolbar={false}
                />
              </Box>
              {descriptionError && (
                <FormHelperText color={errorColor}>
                  {descriptionError}
                </FormHelperText>
              )}
            </FormControl>
            <Flex mt={6} justifyContent="space-between" {...group}>
              {resistances.map((resistance) => (
                <ResistanceButton
                  key={resistance}
                  {...getRadioProps({ value: resistance })}
                >
                  {resistance}
                </ResistanceButton>
              ))}
            </Flex>
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

const ResistanceButton: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const redTextColor = useColorModeValue('red.800', 'red.300');

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          color: redTextColor,
          borderColor: redTextColor,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default FalloutForm;
