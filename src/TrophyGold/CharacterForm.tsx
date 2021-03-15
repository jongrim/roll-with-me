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
  FormControl,
  FormLabel,
  Icon,
  Image,
} from '@chakra-ui/react';
import { RiCameraFill } from 'react-icons/ri';
import { RawTrophyGoldCharacter } from '../APITypes';
import { UpdateTrophyGoldCharacterInput } from '../API';
import Library from './Library';
import { Equipment, LibraryItem } from './TrophyGoldGameTypes';
import listItemReducer, {
  initReducer,
  ListState,
  listItemEvent,
} from './listItemReducer';
import EquipmentForm from './EquipmentForm';

interface CharacterFormProps {
  onDone: (
    character: Omit<
      UpdateTrophyGoldCharacterInput,
      'id' | 'gameID' | 'playerName'
    >
  ) => void;
  character?: RawTrophyGoldCharacter;
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
  const [first, second, third] = character?.rituals ?? [];
  const [ritual1, setRitual1] = React.useState(first || '');
  const [ritual2, setRitual2] = React.useState(second || '');
  const [ritual3, setRitual3] = React.useState(third || '');
  const [libraryItems, setLibraryItems] = React.useState<LibraryItem[]>(
    character?.library?.map((s) => JSON.parse(s) as LibraryItem) ?? []
  );
  const [combatEquipment, dispatchCombatEquipment] = React.useReducer<
    React.Reducer<ListState<Equipment>, listItemEvent<Equipment>>
  >(
    listItemReducer,
    initReducer<Equipment, 'id'>(
      character?.combatEquipment?.map((s) => JSON.parse(s)) ?? [],
      'id'
    )
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rituals = [ritual1, ritual2, ritual3].filter(Boolean);
    const input = imageUrl ? { characterImageUrl: imageUrl } : {};
    onDone({
      characterName,
      characterPronouns,
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

        <Library items={libraryItems} setItems={setLibraryItems} />
        <EquipmentForm
          items={combatEquipment.items}
          itemMap={combatEquipment.itemMap}
          updateItem={(id, update) =>
            dispatchCombatEquipment({
              type: 'edit',
              payload: { value: update, id },
            })
          }
          addItem={(item, key) =>
            dispatchCombatEquipment({ type: 'add', payload: { item, key } })
          }
          removeItem={(id) =>
            dispatchCombatEquipment({ type: 'remove', payload: { id } })
          }
        />
        <Button type="submit" variant="ghost" mt={6} w="full">
          {submitText}
        </Button>
      </form>
    </Box>
  );
};

export default CharacterForm;
