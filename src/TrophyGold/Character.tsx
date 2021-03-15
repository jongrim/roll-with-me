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
} from '@chakra-ui/react';
import { RiCameraFill, RiPencilLine } from 'react-icons/ri';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { RawTrophyGoldCharacter } from '../APITypes';
import CharacterForm from './CharacterForm';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterDrive from './CharacterDrive';
import CharacterBackground from './CharacterBackground';
import CharacterOccupation from './CharacterOccupation';
import CharacterRituals from './CharacterRituals';
import CharacterBackpack from './CharacterBackpack';

const setRuin = async ({ id, ruin }: { id: string; ruin: number }) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyGoldCharacter,
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

export const updateCharacter = async (
  character: UpdateTrophyGoldCharacterInput
) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyGoldCharacter,
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
  character: RawTrophyGoldCharacter;
  canEdit: boolean;
}

const Character = ({ character, canEdit }: CharacterProps) => {
  const rituals = character.rituals || [];
  const ruin = character.ruin || 0;
  const baseRuin = rituals.length ?? 0 + 1;
  const disabledRuinBgColor = useColorModeValue('gray.200', 'gray.700');
  const [isEditing, setIsEditing] = React.useState(false);
  const updateWithId = (update: Omit<UpdateTrophyGoldCharacterInput, 'id'>) =>
    updateCharacter({ id: character.id, ...update });
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
                        num <= ruin ? disabledRuinBgColor : 'none'
                      }
                      onClick={() => {
                        if (num > ruin) {
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
          <CharacterDrive
            drive={character.drive || ''}
            onSubmit={updateWithId}
          />
          <Box mt={6}>
            <CharacterOccupation
              occupation={character.occupation || ''}
              onSubmit={updateWithId}
            />
          </Box>
          <Box mt={6}>
            <CharacterBackground
              background={character.background || ''}
              onSubmit={updateWithId}
            />
          </Box>
          <Box mt={6}>
            <CharacterRituals
              characterId={character.id}
              rituals={character.rituals || []}
              onSubmit={updateWithId}
            />
          </Box>
          <Box mt={6}>
            <CharacterBackpack
              backpack={character.backpack || '{}'}
              onSubmit={updateWithId}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Character;
