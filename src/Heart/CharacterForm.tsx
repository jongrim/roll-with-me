import * as React from "react";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Divider,
  Center,
  Button,
  Input,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Select,
} from "@chakra-ui/react";
import { RiCameraFill } from "react-icons/ri";
import { UpdateHeartCharacterInput } from "../API";
import { HeartCharacterWithID } from "../APITypes";
import { ancestries, callings, classes } from "./HeartGameTypes";

interface CharacterFormProps {
  onDone: (character: Omit<UpdateHeartCharacterInput, "id">) => void;
  character?: Exclude<HeartCharacterWithID, null>;
  submitText: string;
}

const CharacterForm = ({
  character,
  onDone,
  submitText,
}: CharacterFormProps) => {
  const [characterName, setCharacterName] = React.useState(
    character?.characterName || ""
  );
  const [characterPronouns, setCharacterPronouns] = React.useState(
    character?.characterPronouns || ""
  );
  const [imageUrl, setImageUrl] = React.useState(
    character?.characterImageUrl || ""
  );
  const [ancestry, setAncestry] = React.useState(character?.ancestry || "");
  const [calling, setCalling] = React.useState(character?.calling || "");
  const [charClass, setCharClass] = React.useState(character?.class || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = imageUrl ? { characterImageUrl: imageUrl } : {};
    onDone({
      characterName,
      characterPronouns,
      ancestry,
      calling,
      class: charClass,
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
              defaultValue={ancestry}
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
              defaultValue={calling}
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
              defaultValue={charClass}
            >
              {classes.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="outline" mt={6} w="full">
          {submitText}
        </Button>
      </form>
    </Box>
  );
};

export default CharacterForm;
