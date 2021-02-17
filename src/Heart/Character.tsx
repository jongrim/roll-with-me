import * as React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Divider,
  HStack,
  Center,
  Button,
  Image,
  Icon,
  useColorModeValue,
  UnorderedList,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Stack,
  Checkbox,
  Switch,
  FormLabel,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { RiCameraFill, RiPencilLine } from 'react-icons/ri';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { HeartCharacter } from '../APITypes';
import CharacterForm from './CharacterForm';
import { UpdateHeartCharacterInput } from '../API';
import { domains, resistances, skills } from './HeartGameTypes';

const updateCharacter = async (character: UpdateHeartCharacterInput) => {
  try {
    await API.graphql({
      query: mutations.updateHeartCharacter,
      variables: {
        input: {
          ...character,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

interface CharacterProps {
  character: Exclude<HeartCharacter, null>;
  canEdit: boolean;
}

const Character = ({ character, canEdit }: CharacterProps) => {
  const borderColor = useColorModeValue('gray.50', 'inherit');
  const redTextColor = useColorModeValue('red.800', 'red.400');
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <Box fontFamily="Alegreya">
      {isEditing ? (
        <CharacterForm
          character={character}
          submitText="Resume Your Journey"
          onDone={(char) =>
            updateCharacter({
              ...char,
              id: character.id,
              gameID: character.gameID,
              playerName: character.playerName,
            }).then(() => {
              setIsEditing(false);
            })
          }
        />
      ) : (
        <>
          <Grid
            templateColumns="minmax(150px, 33%) 1fr"
            gap={6}
            alignItems="end"
          >
            <GridItem>
              {character.characterImageUrl ? (
                <Image
                  src={character.characterImageUrl}
                  alt={`Portrait of ${character.characterName}`}
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
                      aria-label="Click to set a character image"
                      h={16}
                      w={16}
                    />
                  </Center>
                </Box>
              )}
            </GridItem>
            <GridItem>
              <Flex direction="column" alignItems="flex-end">
                <Text fontSize="lg" fontWeight="600" letterSpacing="1.5px">
                  {character.characterName}
                </Text>
                <Text fontSize="sm" opacity="0.9">
                  {character.characterPronouns}
                </Text>
                <Text fontSize="md" mt={4}>
                  {character.ancestry} – {character.class}
                </Text>
                <Text fontSize="sm">{character.calling}</Text>
                {canEdit && (
                  <Button
                    mt={4}
                    leftIcon={<RiPencilLine />}
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    size="sm"
                  >
                    Edit
                  </Button>
                )}
              </Flex>
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Grid templateColumns="1fr" templateRows="1fr" gap={3}>
            {resistances.map((resistance) => {
              const stressKey = resistance.toLowerCase() + 'Stress';
              const protectionKey = resistance.toLowerCase() + 'Protection';
              return (
                <GridItem key={resistance}>
                  <Flex
                    py={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      w={20}
                      fontSize="lg"
                      fontWeight="600"
                      color={redTextColor}
                    >
                      {resistance}
                    </Text>
                    <Flex alignItems="center">
                      <Text w={24}>Stress</Text>
                      <NumberInput
                        w={24}
                        size="sm"
                        variant="flushed"
                        //@ts-ignore
                        value={character[stressKey]}
                        onChange={() => {}}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                    <Flex alignItems="center">
                      <Text w={24}>Protection</Text>
                      <NumberInput
                        w={24}
                        size="sm"
                        variant="flushed"
                        // @ts-ignore
                        value={character[protectionKey]}
                        onChange={() => {}}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
          <Divider my={6} />
          <Grid templateColumns="1fr 1fr">
            <Stack direction="column" spacing={3}>
              <HStack spacing={3}>
                <Text w={32} fontSize="lg" color={redTextColor}>
                  SKILLS
                </Text>
                <Text w={16} fontSize="lg" color={redTextColor} opacity="0.8">
                  KNACK
                </Text>
              </HStack>
              {skills.map((skill) => {
                return (
                  <HStack spacing={3}>
                    <Checkbox w={32} key={skill} value={skill}>
                      {skill}
                    </Checkbox>
                    <Switch colorScheme="red" size="sm" />
                  </HStack>
                );
              })}
            </Stack>
            <Stack direction="column" spacing={3}>
              <HStack spacing={3}>
                <Text w={32} fontSize="lg" color={redTextColor}>
                  DOMAINS
                </Text>
                <Text w={16} fontSize="lg" color={redTextColor} opacity="0.8">
                  KNACK
                </Text>
              </HStack>
              {domains.map((domain) => {
                return (
                  <HStack spacing={3}>
                    <Checkbox w={32} key={domain} value={domain}>
                      {domain}
                    </Checkbox>
                    <Switch colorScheme="red" size="sm" />
                  </HStack>
                );
              })}
            </Stack>
          </Grid>
          <Divider my={6} />
          <Stack direction="column" spacing={10}>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Abilities
              </Text>
              <Center>
                <Button variant="outline" w="md">
                  Add new ability
                </Button>
              </Center>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Equipment
              </Text>
              <Center>
                <Button variant="outline" w="md">
                  Add new equipment
                </Button>
              </Center>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Resources
              </Text>
              <Center>
                <Button variant="outline" w="md">
                  Add new resource
                </Button>
              </Center>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Bonds
              </Text>
              <Center>
                <Button variant="outline" w="md">
                  Add new bond
                </Button>
              </Center>
            </Box>
          </Stack>
          {canEdit && (
            <>
              <Divider my={6} />
              <FormLabel>Notes</FormLabel>
              <Textarea />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Character;
