import * as React from 'react';
import { Box, Text, FormControl, Input, Flex, Spacer } from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface CharacterOccupationProps {
  occupation: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterOccupation({
  occupation,
  onSubmit,
}: CharacterOccupationProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [trackedOccupation, setTrackedOccupation] = React.useState(
    occupation || ''
  );
  return (
    <Box>
      <Flex>
        <Text fontSize="sm" opacity="0.9">
          Occupation
        </Text>
        <Spacer />
        <EditableControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={() => {
            onSubmit({ occupation: trackedOccupation }).then(() => {
              setIsEditing(false);
            });
          }}
        />
      </Flex>
      {isEditing ? (
        <Box>
          <FormControl id="background" isRequired>
            <Input
              value={trackedOccupation}
              onChange={({ target }) => setTrackedOccupation(target.value)}
            />
          </FormControl>
        </Box>
      ) : (
        <Box>
          <Text>{trackedOccupation}</Text>
        </Box>
      )}
    </Box>
  );
}

export default CharacterOccupation;
