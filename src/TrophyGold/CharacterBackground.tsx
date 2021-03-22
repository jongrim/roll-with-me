import * as React from 'react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterBackgroundProps {
  background: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterBackground({
  background,
  onSubmit,
}: CharacterBackgroundProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedBackground, setTrackedBackground] = React.useState(
    background || ''
  );
  const delayedUpdate = useDelayedUpdate(onSubmit);
  return (
    <Box>
      <CharacterSectionHeading>Background</CharacterSectionHeading>
      <Input
        variant="flushed"
        borderColor={inputBorderColor}
        value={trackedBackground}
        onChange={({ target }) => {
          const nextVal = target.value;
          setTrackedBackground(nextVal);
          delayedUpdate({ background: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterBackground;
