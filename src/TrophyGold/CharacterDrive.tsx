import * as React from 'react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterDriveProps {
  drive: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterDrive({ drive, onSubmit }: CharacterDriveProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedDrive, setTrackedDrive] = React.useState(drive || '');
  const delayedUpdate = useDelayedUpdate(onSubmit);
  return (
    <Box>
      <CharacterSectionHeading>Drive</CharacterSectionHeading>
      <Input
        variant="flushed"
        borderColor={inputBorderColor}
        value={trackedDrive}
        onChange={({ target }) => {
          const nextVal = target.value;
          setTrackedDrive(nextVal);
          delayedUpdate({ drive: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterDrive;
