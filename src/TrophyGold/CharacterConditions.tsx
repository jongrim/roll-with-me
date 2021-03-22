import * as React from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterConditionsProps {
  conditions: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterConditions({
  conditions,
  onSubmit,
}: CharacterConditionsProps) {
  const [trackedConditions, setTrackedConditions] = React.useState(
    conditions || ''
  );
  const delayedUpdate = useDelayedUpdate(onSubmit);
  return (
    <Box>
      <CharacterSectionHeading>Conditions</CharacterSectionHeading>
      <Textarea
        variant="filled"
        value={trackedConditions}
        onChange={({ target }) => {
          const nextVal = target.value;
          setTrackedConditions(nextVal);
          delayedUpdate({ conditions: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterConditions;
