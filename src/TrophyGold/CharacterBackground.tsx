import * as React from 'react';
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterBackgroundProps {
  background: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterBackground({
  background,
  onSubmit,
  canEdit,
}: CharacterBackgroundProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedBackground, setTrackedBackground] = React.useState(
    background || ''
  );
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    if (!canEdit) {
      setTrackedBackground(background);
    }
  }, [background, canEdit]);
  return (
    <Box>
      <CharacterSectionHeading>Background</CharacterSectionHeading>
      <Input
        isReadOnly={!canEdit}
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
