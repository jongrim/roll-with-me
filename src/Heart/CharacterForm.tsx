import * as React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Checkbox,
  Flex,
  Divider,
  Center,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Text,
  Stack,
  Select,
} from '@chakra-ui/react';
import { RiCameraFill } from 'react-icons/ri';
import { HeartCharacter } from '../APITypes';
import { CreateHeartCharacterInput } from '../API';
import { ancestries, callings, classes } from './HeartGameTypes';

interface CharacterFormProps {
  onDone: (
    character: Omit<CreateHeartCharacterInput, 'gameID' | 'playerName'>
  ) => void;
  character?: Exclude<HeartCharacter, null>;
  submitText: string;
}

const CharacterForm = ({
  character,
  onDone,
  submitText,
}: CharacterFormProps) => {
  const [characterName, setCharacterName] = React.useState(
    character?.characterName || ''
  );
  const [characterPronouns, setCharacterPronouns] = React.useState(
    character?.characterPronouns || ''
  );
  const [imageUrl, setImageUrl] = React.useState(
    character?.characterImageUrl || ''
  );
  const [ancestry, setAncestry] = React.useState(character?.ancestry || '');
  const [calling, setCalling] = React.useState(character?.calling || '');
  const [charClass, setCharClass] = React.useState(character?.class || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = imageUrl ? { characterImageUrl: imageUrl } : {};
    onDone({
      characterName,
      characterPronouns,
      ancestry,
      calling,
      class: charClass,
      abilities: [],
      beats: [],
      fallout: [],
      bloodProtection: 0,
      bloodStress: 0,
      mindProtection: 0,
      mindStress: 0,
      echoProtection: 0,
      echoStress: 0,
      fortuneProtection: 0,
      fortuneStress: 0,
      supplyProtection: 0,
      supplyStress: 0,
      skills: [],
      domains: [],
      knacks: [],
      equipment: [],
      resources: [],
      bonds: [],
      notes: '',
      ...input,
    });
  };
  return (
    <Box p={4} w="full">
      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns="minmax(150px, 33%) 1fr"
          gap={6}
          alignItems="center"
        >
          <GridItem>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Portrait of ${characterName}`}
                rounded="sm"
                boxShadow="lg"
                maxH="md"
              />
            ) : (
              <Box
                border="3px dashed"
                borderColor="inherit"
                w="full"
                h="200px"
                rounded="sm"
              >
                <Center h="full">
                  <Icon
                    as={RiCameraFill}
                    aria-label="Camera icon"
                    h={16}
                    w={16}
                  />
                </Center>
              </Box>
            )}
          </GridItem>
          <GridItem>
            <Flex direction="column" alignItems="flex-end">
              <FormControl id="character-name" isRequired>
                <FormLabel>Character name</FormLabel>
                <Input
                  value={characterName}
                  onChange={({ target }) => setCharacterName(target.value)}
                />
              </FormControl>
              <FormControl mt={4} id="character-pronouns" isRequired>
                <FormLabel>Character pronouns</FormLabel>
                <Input
                  value={characterPronouns}
                  onChange={({ target }) => setCharacterPronouns(target.value)}
                />
              </FormControl>
              <FormControl mt={4} id="url">
                <FormLabel>Character Image URL</FormLabel>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={imageUrl}
                  onChange={({ target }) => setImageUrl(target.value)}
                />
              </FormControl>
            </Flex>
          </GridItem>
        </Grid>
        <Divider my={6} />
        <Box>
          <FormControl id="ancestry" isRequired>
            <FormLabel>Ancestry</FormLabel>
            <Select
              placeholder="Select an ancestry"
              onChange={({ target }) => setAncestry(target.value)}
            >
              {ancestries.map((ancestry) => (
                <option key={ancestry} value={ancestry}>
                  {ancestry}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={6}>
          <FormControl id="calling" isRequired>
            <FormLabel>Calling</FormLabel>
            <Select
              placeholder="Select a calling"
              onChange={({ target }) => setCalling(target.value)}
            >
              {callings.map((calling) => (
                <option key={calling} value={calling}>
                  {calling}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={6}>
          <FormControl id="class" isRequired>
            <FormLabel>Class</FormLabel>
            <Select
              placeholder="Select a class"
              onChange={({ target }) => setCharClass(target.value)}
            >
              {classes.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Text textAlign="center" mt={6}>
          That's all for now. You can add more in the next part.
        </Text>
        <Button type="submit" variant="ghost" mt={6} w="full">
          {submitText}
        </Button>
      </form>
    </Box>
  );
};

export default CharacterForm;
