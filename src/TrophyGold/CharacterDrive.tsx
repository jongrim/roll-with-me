import * as React from 'react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterDriveProps {
  drive: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterDrive({ drive, onSubmit, canEdit }: CharacterDriveProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedDrive, setTrackedDrive] = React.useState(drive || '');
  const { delayedUpdate } = useDelayedUpdate(onSubmit);

  React.useEffect(() => {
    if (!canEdit) {
      setTrackedDrive(drive);
    }
  }, [drive, canEdit]);

  return (
    <Box>
      <CharacterSectionHeading>Drive</CharacterSectionHeading>
      <Input
        isReadOnly={!canEdit}
        variant="flushed"
        borderColor={inputBorderColor}
        value={trackedDrive}
        onChange={({ target }) => {
          const nextVal = target.value;
          // setIsUpdating();
          setTrackedDrive(nextVal);
          delayedUpdate({ drive: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterDrive;
