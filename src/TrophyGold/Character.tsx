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
  Input,
  Image,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiCameraFill } from 'react-icons/ri';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { RawTrophyGoldCharacter } from '../APITypes';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterDrive from './CharacterDrive';
import CharacterBackground from './CharacterBackground';
import CharacterOccupation from './CharacterOccupation';
import CharacterRituals from './CharacterRituals';
import CharacterBackpack from './CharacterBackpack';
import CharacterCombatEquipment from './CharacterCombatEquipment';
import CharacterFoundEquipment from './CharacterFoundEquipment';
import SpinningCube from '../SpinningCube/SpinningCube';
import CharacterConditions from './CharacterConditions';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';
import CharacterNotes from './CharacterNotes';
import CharacterNumberField from './CharacterNumberField';
import { RandomNumbersContext } from '../RandomNumbersProvider';

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
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const tableBorderColor = useColorModeValue('gray.400', 'gray.500');
  const rituals = character.rituals?.filter(Boolean) || [];
  const baseRuin = (rituals.length ?? 0) + 1;
  const ruin = character.ruin || baseRuin;
  const disabledRuinBgColor = useColorModeValue('gray.200', 'gray.700');
  const [characterName, setCharacterName] = React.useState(
    character?.characterName || ''
  );
  const [characterPronouns, setCharacterPronouns] = React.useState(
    character?.characterPronouns || ''
  );
  const [imageUrl, setImageUrl] = React.useState(
    character?.characterImageUrl || ''
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const updateWithId = React.useCallback(
    async (update: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => {
      setIsSaving(true);
      await updateCharacter({ id: character.id, ...update });
      setIsSaving(false);
    },
    [character.id]
  );
  const { delayedUpdate: delayedNameUpdate } = useDelayedUpdate(updateWithId);
  const { delayedUpdate: delayedPronounsUpdate } = useDelayedUpdate(
    updateWithId
  );

  React.useEffect(() => {
    if (!canEdit && character?.characterName) {
      setCharacterName(character.characterName);
    }
  }, [character?.characterName, canEdit]);
  React.useEffect(() => {
    if (!canEdit && character?.characterPronouns) {
      setCharacterPronouns(character.characterPronouns);
    }
  }, [character?.characterPronouns, canEdit]);
  React.useEffect(() => {
    if (!canEdit && character?.characterImageUrl) {
      setImageUrl(character.characterImageUrl);
    }
  }, [character?.characterImageUrl, canEdit]);

  return (
    <Box
      fontFamily="Roboto Slab"
      id={character.characterName?.replace(' ', '')}
    >
      <Text mb={2} fontWeight="600">
        {character.playerName}
        {character.characterName && ` – ${character.characterName}`}
      </Text>
      <Grid
        templateColumns="minmax(150px, 33%) 1fr"
        gap={6}
        alignItems="center"
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
          <Input
            aria-label="Character image URL"
            mt={2}
            isReadOnly={!canEdit}
            type="url"
            placeholder="https://example.com"
            value={imageUrl}
            onChange={({ target }) => {
              const nextVal = target.value;
              setImageUrl(nextVal);
              try {
                const url = new URL(nextVal);
                updateWithId({ characterImageUrl: url.toString() });
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </GridItem>
        <GridItem>
          <Flex direction="column" alignItems="flex-end">
            <Text fontWeight="600">Character Name</Text>
            <Input
              isReadOnly={!canEdit}
              value={characterName}
              maxW="sm"
              onChange={({ target }) => {
                const nextVal = target.value;
                setCharacterName(nextVal);
                delayedNameUpdate({ characterName: nextVal });
              }}
            />
            <Text fontWeight="600" mt={4}>
              Character Pronouns
            </Text>
            <Input
              isReadOnly={!canEdit}
              value={characterPronouns}
              maxW="sm"
              onChange={({ target }) => {
                const nextVal = target.value;
                setCharacterPronouns(nextVal);
                delayedPronounsUpdate({ characterPronouns: nextVal });
              }}
            />
            <Text fontWeight="600" mt={4}>
              Ruin
            </Text>
            <HStack spacing={3} mt={2}>
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
                    num <= ruin ? disabledRuinBgColor : 'transparent'
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
      <HStack spacing={6} mt={6} alignItems="flex-start">
        <Flex direction="column" alignItems="center">
          <Text fontSize="sm" fontWeight="400">
            Weak Point
          </Text>
          <Text fontSize="lg">{character.weakPoint || '–'}</Text>
          <HStack spacing={3}>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                const [result] = await getNumbers(1);
                updateWithId({ weakPoint: (result % 6) + 1 });
              }}
            >
              Set
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                updateWithId({ weakPoint: null });
              }}
            >
              Clear
            </Button>
          </HStack>
        </Flex>
        <Box>
          <Text>Burdens</Text>
          <CharacterNumberField
            field="burdens"
            onSubmit={updateWithId}
            initial={character.burdens}
            canEdit={canEdit}
          />
        </Box>
        <Box>
          <Text>Hoard</Text>
          <CharacterNumberField
            field="hoard"
            onSubmit={updateWithId}
            initial={character.hoard}
            canEdit={canEdit}
          />
        </Box>
        <Box>
          <Text>Hunt Tokens</Text>
          <CharacterNumberField
            field="tokens"
            onSubmit={updateWithId}
            initial={character.tokens}
            canEdit={canEdit}
          />
        </Box>
        <Box>
          <Text>Gold</Text>
          <CharacterNumberField
            field="gold"
            onSubmit={updateWithId}
            initial={character.gold}
            canEdit={canEdit}
          />
        </Box>
      </HStack>
      <Divider my={6} />
      <CharacterDrive
        drive={character.drive || ''}
        onSubmit={updateWithId}
        canEdit={canEdit}
      />
      <Box mt={6}>
        <CharacterOccupation
          canEdit={canEdit}
          occupation={character.occupation || ''}
          onSubmit={updateWithId}
        />
      </Box>
      <Box mt={6}>
        <CharacterBackground
          canEdit={canEdit}
          background={character.background || ''}
          onSubmit={updateWithId}
        />
      </Box>
      <Box mt={6}>
        <CharacterRituals
          canEdit={canEdit}
          characterId={character.id}
          rituals={character.rituals || []}
          onSubmit={updateWithId}
        />
      </Box>
      <Divider my={6} />
      <Box mt={6}>
        <CharacterBackpack
          canEdit={canEdit}
          backpack={character.backpack || '{}'}
          onSubmit={updateWithId}
        />
      </Box>
      <Box mt={6}>
        <Grid templateColumns="1fr 1fr">
          <CharacterSectionHeading
            borderBottom="1px"
            borderColor={tableBorderColor}
            mb={0}
          >
            Combat Equipment
          </CharacterSectionHeading>
          <CharacterSectionHeading
            borderBottom="1px"
            borderColor={tableBorderColor}
            pl={3}
            mb={0}
          >
            Found Equipment
          </CharacterSectionHeading>
          <CharacterCombatEquipment
            canEdit={canEdit}
            weaponSet={character.weaponSet}
            armorSet={character.armorSet}
            onSubmit={updateWithId}
          />
          <CharacterFoundEquipment
            canEdit={canEdit}
            foundEquipment={character.foundEquipment}
            onSubmit={updateWithId}
          />
        </Grid>
      </Box>
      <Divider my={6} />
      <CharacterConditions
        conditions={character.conditions || ''}
        onSubmit={updateWithId}
        canEdit={canEdit}
      />
      <Box mt={6}>
        <CharacterNotes
          notes={character.notes || ''}
          onSubmit={updateWithId}
          canEdit={canEdit}
        />
      </Box>
      {isSaving && <SpinningCube />}
    </Box>
  );
};

export default Character;
