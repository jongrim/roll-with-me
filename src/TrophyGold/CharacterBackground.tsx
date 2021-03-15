import * as React from 'react';
import { Box, Text, FormControl, Input, Flex, Spacer } from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface CharacterBackgroundProps {
  background: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterBackground({
  background,
  onSubmit,
}: CharacterBackgroundProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [trackedBackground, setTrackedBackground] = React.useState(
    background || ''
  );
  return (
    <Box>
      <Flex>
        <Text fontSize="sm" opacity="0.9">
          Background
        </Text>
        <Spacer />
        <EditableControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={() => {
            onSubmit({ background: trackedBackground }).then(() => {
              setIsEditing(false);
            });
          }}
        />
      </Flex>
      {isEditing ? (
        <Box>
          <FormControl id="background" isRequired>
            <Input
              value={trackedBackground}
              onChange={({ target }) => setTrackedBackground(target.value)}
            />
          </FormControl>
        </Box>
      ) : (
        <Box>
          <Text>{trackedBackground}</Text>
        </Box>
      )}
    </Box>
  );
}

export default CharacterBackground;
