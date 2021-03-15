import * as React from 'react';
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Spacer,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface CharacterRitualsProps {
  characterId: string;
  rituals: string[];
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterRituals({
  characterId,
  rituals,
  onSubmit,
}: CharacterRitualsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [first, second, third] = rituals;
  const [ritual1, setRitual1] = React.useState(first || '');
  const [ritual2, setRitual2] = React.useState(second || '');
  const [ritual3, setRitual3] = React.useState(third || '');
  const trackedRituals = [ritual1, ritual2, ritual3].filter(Boolean);
  return (
    <Box>
      <Flex>
        <Text fontSize="sm" opacity="0.9">
          Rituals
        </Text>
        <Spacer />
        <EditableControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={() => {
            const nextRituals = [ritual1, ritual2, ritual3].filter(Boolean);
            onSubmit({ rituals: nextRituals || [] }).then(() => {
              setIsEditing(false);
            });
          }}
        />
      </Flex>
      {isEditing ? (
        <Box>
          <InputGroup>
            <InputLeftAddon w={20}>First</InputLeftAddon>
            <Input
              value={ritual1}
              onChange={({ target }) => setRitual1(target.value)}
            />
          </InputGroup>
          <InputGroup mt={3}>
            <InputLeftAddon w={20}>Second</InputLeftAddon>
            <Input
              value={ritual2}
              onChange={({ target }) => setRitual2(target.value)}
            />
          </InputGroup>
          <InputGroup mt={3}>
            <InputLeftAddon w={20}>Third</InputLeftAddon>
            <Input
              value={ritual3}
              onChange={({ target }) => setRitual3(target.value)}
            />
          </InputGroup>
        </Box>
      ) : (
        <UnorderedList>
          {trackedRituals.map((ritual, i) => (
            <ListItem key={`${characterId}-ritual-${i}`}>{ritual}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  );
}

export default CharacterRituals;
