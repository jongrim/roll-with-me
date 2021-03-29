import * as React from 'react';
import { Box, Input, VStack, useColorModeValue } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterRitualsProps {
  characterId: string;
  rituals: string[];
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterRituals({
  rituals,
  onSubmit,
  canEdit,
}: CharacterRitualsProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [trackedRituals, setTrackedRituals] = React.useState(rituals);
  const [first = '', second = '', third = ''] = trackedRituals;
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    if (!canEdit) {
      setTrackedRituals(rituals);
    }
  }, [rituals, canEdit]);
  return (
    <Box>
      <CharacterSectionHeading>Rituals</CharacterSectionHeading>
      <VStack spacing={3}>
        <Input
          isReadOnly={!canEdit}
          variant="flushed"
          borderColor={inputBorderColor}
          value={first}
          onChange={({ target }) => {
            const nextVal = target.value;
            const nextRituals = [nextVal, second, third];
            setTrackedRituals(nextRituals);
            delayedUpdate({ rituals: nextRituals });
          }}
        />
        <Input
          isReadOnly={!canEdit}
          variant="flushed"
          borderColor={inputBorderColor}
          value={second}
          onChange={({ target }) => {
            const nextVal = target.value;
            const nextRituals = [first, nextVal, third];
            setTrackedRituals(nextRituals);
            delayedUpdate({ rituals: nextRituals });
          }}
        />
        <Input
          isReadOnly={!canEdit}
          variant="flushed"
          borderColor={inputBorderColor}
          value={third}
          onChange={({ target }) => {
            const nextVal = target.value;
            const nextRituals = [first, second, nextVal];
            setTrackedRituals(nextRituals);
            delayedUpdate({ rituals: nextRituals });
          }}
        />
      </VStack>
    </Box>
  );
}

export default CharacterRituals;
