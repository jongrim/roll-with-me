import * as React from 'react';
import {
  Grid,
  GridItem,
  Box,
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
} from '@chakra-ui/react';
import { RiCameraFill } from 'react-icons/ri';
import { TrophyDarkCharacter } from '../APITypes';
import { CreateTrophyDarkCharacterInput } from '../API';

interface CharacterFormProps {
  onDone: (
    character: Omit<CreateTrophyDarkCharacterInput, 'gameID' | 'playerName'>
  ) => void;
  character?: Exclude<TrophyDarkCharacter, null>;
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
  const [drive, setDrive] = React.useState(character?.drive || '');
  const [occupation, setOccupation] = React.useState(
    character?.occupation || ''
  );
  const [background, setBackground] = React.useState(
    character?.background || ''
  );
  const [first, second, third] = character?.rituals ?? [];
  const [ritual1, setRitual1] = React.useState(first || '');
  const [ritual2, setRitual2] = React.useState(second || '');
  const [ritual3, setRitual3] = React.useState(third || '');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rituals = [ritual1, ritual2, ritual3].filter(Boolean);
    const input = imageUrl ? { characterImageUrl: imageUrl } : {};
    onDone({
      characterName,
      characterPronouns,
      drive,
      occupation,
      background,
      rituals,
      ruin: 1 + rituals.length,
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
          <FormControl id="drive" isRequired>
            <FormLabel>Drive</FormLabel>
            <Input
              value={drive}
              onChange={({ target }) => setDrive(target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={6}>
          <FormControl id="occupation" isRequired>
            <FormLabel>Occupation</FormLabel>
            <Input
              value={occupation}
              onChange={({ target }) => setOccupation(target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={6}>
          <FormControl id="background" isRequired>
            <FormLabel>Background</FormLabel>
            <Input
              value={background}
              onChange={({ target }) => setBackground(target.value)}
            />
          </FormControl>
        </Box>
        <Box mt={6}>
          <FormLabel>Rituals</FormLabel>
          <FormControl id="ritual1">
            <InputGroup>
              <InputLeftAddon w={20}>First</InputLeftAddon>
              <Input
                value={ritual1}
                onChange={({ target }) => setRitual1(target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="ritual2" mt={4}>
            <InputGroup>
              <InputLeftAddon w={20}>Second</InputLeftAddon>
              <Input
                value={ritual2}
                onChange={({ target }) => setRitual2(target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="ritual3" mt={4}>
            <InputGroup>
              <InputLeftAddon w={20}>Third</InputLeftAddon>
              <Input
                value={ritual3}
                onChange={({ target }) => setRitual3(target.value)}
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Button type="submit" variant="ghost" mt={6} w="full">
          {submitText}
        </Button>
      </form>
    </Box>
  );
};

export default CharacterForm;
