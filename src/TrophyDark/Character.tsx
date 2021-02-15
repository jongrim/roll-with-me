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
} from '@chakra-ui/react';
import { RiCameraFill, RiPencilLine } from 'react-icons/ri';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { TrophyDarkCharacter } from '../APITypes';
import CharacterForm from './CharacterForm';
import { UpdateTrophyDarkCharacterInput } from '../API';

const setRuin = async ({ id, ruin }: { id: string; ruin: number }) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyDarkCharacter,
      variables: {
        input: {
          id,
          ruin,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

const updateCharacter = async (character: UpdateTrophyDarkCharacterInput) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyDarkCharacter,
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
  character: Exclude<TrophyDarkCharacter, null>;
  canEdit: boolean;
}

const Character = ({ character, canEdit }: CharacterProps) => {
  const baseRuin = character.rituals.length + 1;
  const disabledRuinBgColor = useColorModeValue('gray.200', 'gray.700');
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <Box fontFamily="Roboto Slab">
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
            alignItems="center"
          >
            {canEdit && (
              <GridItem colSpan={2}>
                <Flex justifyContent="flex-end">
                  <Button
                    leftIcon={<RiPencilLine />}
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    size="sm"
                  >
                    Edit
                  </Button>
                </Flex>
              </GridItem>
            )}
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
                <HStack spacing={3} mt={4}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <Button
                      key={`ruin-${num}`}
                      h="32px"
                      w="32px"
                      p={0}
                      minW={0}
                      variant="ghost"
                      rounded="sm"
                      border="1px solid"
                      borderColor="inherit"
                      disabled={num <= baseRuin}
                      backgroundColor={
                        num <= character.ruin ? disabledRuinBgColor : 'none'
                      }
                      onClick={() => {
                        if (num > character.ruin) {
                          setRuin({ id: character.id, ruin: num });
                        } else {
                          setRuin({ id: character.id, ruin: num - 1 });
                        }
                      }}
                    >
                      <Center h="full">{num}</Center>
                    </Button>
                  ))}
                </HStack>
              </Flex>
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Box>
            <Text fontSize="sm" opacity="0.9">
              Drive
            </Text>
            <Text>{character.drive}</Text>
          </Box>
          <Box mt={6}>
            <Text fontSize="sm" opacity="0.9">
              Occupation
            </Text>
            <Text>{character.occupation}</Text>
          </Box>
          <Box mt={6}>
            <Text fontSize="sm" opacity="0.9">
              Background
            </Text>
            <Text>{character.background}</Text>
          </Box>
          <Box mt={6}>
            <Text fontSize="sm" opacity="0.9">
              Rituals
            </Text>
            <UnorderedList>
              {character.rituals.map((ritual, i) => (
                <ListItem key={`${character.id}-${ritual}-${i}`}>
                  {ritual}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Character;
