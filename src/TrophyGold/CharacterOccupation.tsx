import * as React from 'react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterOccupationProps {
  occupation: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterOccupation({
  occupation,
  onSubmit,
}: CharacterOccupationProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedOccupation, setTrackedOccupation] = React.useState(
    occupation || ''
  );
  const delayedUpdate = useDelayedUpdate(onSubmit);
  return (
    <Box>
      <CharacterSectionHeading>Occupation</CharacterSectionHeading>
      <Input
        variant="flushed"
        borderColor={inputBorderColor}
        value={trackedOccupation}
        onChange={({ target }) => {
          const nextVal = target.value;
          setTrackedOccupation(nextVal);
          delayedUpdate({ occupation: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterOccupation;
