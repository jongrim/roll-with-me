import * as React from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterNotesProps {
  notes: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterNotes({ notes, onSubmit, canEdit }: CharacterNotesProps) {
  const [trackedNotes, setTrackedNotes] = React.useState(notes || '');
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    if (!canEdit) {
      setTrackedNotes(notes);
    }
  }, [notes, canEdit]);
  return (
    <Box>
      <CharacterSectionHeading>Notes</CharacterSectionHeading>
      <Textarea
        isReadOnly={!canEdit}
        variant="outline"
        value={trackedNotes}
        onChange={({ target }) => {
          const nextVal = target.value;
          setTrackedNotes(nextVal);
          delayedUpdate({ notes: nextVal });
        }}
      />
    </Box>
  );
}

export default CharacterNotes;
