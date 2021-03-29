import * as React from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterConditionsProps {
  conditions: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterConditions({
  conditions,
  onSubmit,
  canEdit,
}: CharacterConditionsProps) {
  const [trackedConditions, setTrackedConditions] = React.useState(
    conditions || ''
  );
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    if (!canEdit) {
      setTrackedConditions(conditions);
    }
  }, [conditions, canEdit]);
  return (
    <Box>
      <CharacterSectionHeading>Conditions</CharacterSectionHeading>
      <Textarea
        isReadOnly={!canEdit}
        variant="outline"
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
