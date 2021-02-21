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
import {
  Equipment,
  equipmentQualities,
  EquipmentQuality,
  EquipmentRank,
  equipmentRanks,
  EquipmentType,
} from './HeartGameTypes';

interface EquipmentFormProps {
  isOpen: boolean;
  onDone: (equipment?: Equipment) => void;
}

const EquipmentForm = ({ isOpen, onDone }: EquipmentFormProps) => {
  const [type, setType] = React.useState<EquipmentType>('Kill');
  const [name, setName] = React.useState('');
  const [quality, setQuality] = React.useState<EquipmentQuality>('Standard');
  const [rank, setRank] = React.useState<EquipmentRank>('Unequipped – D4');
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

  const handleTypeChange = (val: number) => {
    switch (val) {
      case 0:
        setType('Kill');
        break;
      case 1:
        setType('Delve');
        break;
      case 2:
        setType('Mend');
        break;
      case 3:
        setType('Miscellaneous');
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
      type,
      name,
      quality,
      rank,
      tags: tagsList.concat(tags),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onDone()}>
      <ModalOverlay />
      <ModalContent fontFamily="Alegreya">
        <form onSubmit={handleSubmit}>
          <ModalHeader>New Equipment</ModalHeader>
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
                  Kill
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="33.67%"
                >
                  Delve
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="66.67%"
                >
                  Mend
                </Text>
                <Text
                  transform="translateX(-50%)"
                  display="inline-block"
                  pos="absolute"
                  left="100%"
                >
                  Misc.
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
            <FormControl id="equipment-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant="flushed"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </FormControl>
            <FormControl id="equipment-quality" isRequired mt={4}>
              <FormLabel>Quality</FormLabel>
              <Select
                placeholder="Select a quality"
                onChange={({ target }) =>
                  setQuality(target.value as EquipmentQuality)
                }
              >
                {equipmentQualities.map((quality) => (
                  <option key={quality} value={quality}>
                    {quality}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              id="equipment-rank"
              isRequired={['Kill', 'Delve', 'Mend'].includes(type)}
              mt={4}
            >
              <FormLabel>Rank</FormLabel>
              <Select
                placeholder="Select a rank"
                onChange={({ target }) =>
                  setRank(target.value as EquipmentRank)
                }
              >
                {equipmentRanks.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
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

export default EquipmentForm;
