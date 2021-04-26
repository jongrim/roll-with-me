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
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { RiAddLine } from 'react-icons/ri';
import { ResourceValue, Domain, domains, Resource } from './HeartGameTypes';

interface ResourceFormProps {
  isOpen: boolean;
  onDone: (resource?: Resource) => void;
}

const ResourceForm = ({ isOpen, onDone }: ResourceFormProps) => {
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState<ResourceValue>('D4');
  const [domain, setDomain] = React.useState<Domain>('Cursed');
  const [tagsText, setTagsText] = React.useState('');
  const [tagsList, setTagsList] = React.useState<string[]>([]);

  const parseTags = () => {
    const tags = tagsText
      .split(' ')
      .map((t) => t.split(','))
      .flat()
      .filter((s) => Boolean(s));
    setTagsList((cur) => cur.concat(tags));
    setTagsText('');
  };

  const handleValueChange = (val: number) => {
    switch (val) {
      case 0:
        setValue('D4');
        break;
      case 1:
        setValue('D6');
        break;
      case 2:
        setValue('D8');
        break;
      case 3:
        setValue('D10');
        break;
      case 4:
        setValue('D12');
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsText
      .split(' ')
      .map((t) => t.split(','))
      .flat()
      .filter((s) => Boolean(s));
    onDone({
      id: uuidv4(),
      name,
      tags: tagsList.concat(tags),
      value,
      domain,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onDone()} size="lg">
      <ModalOverlay />
      <ModalContent fontFamily="Roboto Slab">
        <form onSubmit={handleSubmit}>
          <ModalHeader>New Resource</ModalHeader>
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
                  D4
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="25%"
                >
                  D6
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="50%"
                >
                  D8
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="75%"
                >
                  D10
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="100%"
                >
                  D12
                </Text>
              </Box>
              <Slider
                defaultValue={0}
                min={0}
                max={4}
                step={1}
                onChange={handleValueChange}
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
            <FormControl id="resource-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant="flushed"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </FormControl>
            <FormControl id="resouce-domain" isRequired mt={4}>
              <FormLabel>Domain</FormLabel>
              <Select
                placeholder="Select a domain"
                onChange={({ target }) => setDomain(target.value as Domain)}
              >
                {domains.map((quality) => (
                  <option key={quality} value={quality}>
                    {quality}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="tags" mt={4}>
              <FormLabel>Tags</FormLabel>
              <InputGroup>
                <Input
                  pr="2.5rem"
                  value={tagsText}
                  onChange={({ target }) => setTagsText(target.value)}
                />
                <InputRightElement width="2.5rem">
                  <IconButton
                    icon={<RiAddLine />}
                    h="1.75rem"
                    size="sm"
                    onClick={parseTags}
                    aria-label="Add tag"
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Enter tags separated by spaces or commas
              </FormHelperText>
              <HStack spacing={3} mt={2}>
                {tagsList.map((tag) => (
                  <Tag
                    size="md"
                    key={tag}
                    borderRadius="full"
                    variant="outline"
                    colorScheme="red"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() =>
                        setTagsList((cur) => cur.filter((t) => t !== tag))
                      }
                    />
                  </Tag>
                ))}
              </HStack>
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

export default ResourceForm;
