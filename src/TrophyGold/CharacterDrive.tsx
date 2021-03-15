import * as React from 'react';
import { Box, Text, FormControl, Input, Flex, Spacer } from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface CharacterDriveProps {
  drive: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterDrive({ drive, onSubmit }: CharacterDriveProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [trackedDrive, setTrackedDrive] = React.useState(drive || '');
  return (
    <Box>
      <Flex>
        <Text fontSize="sm" opacity="0.9">
          Drive
        </Text>
        <Spacer />
        <EditableControls
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onSubmit={() => {
            onSubmit({ drive: trackedDrive }).then(() => {
              setIsEditing(false);
            });
          }}
        />
      </Flex>
      {isEditing ? (
        <Box>
          <FormControl id="drive" isRequired>
            <Input
              value={trackedDrive}
              onChange={({ target }) => setTrackedDrive(target.value)}
            />
          </FormControl>
        </Box>
      ) : (
        <Box>
          <Text>{trackedDrive}</Text>
        </Box>
      )}
    </Box>
  );
}

export default CharacterDrive;
