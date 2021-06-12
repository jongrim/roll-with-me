import * as React from "react";
import { Box } from "@chakra-ui/react";
import { UpdateTrophyGoldCharacterInput } from "../API";
import CharacterSectionHeading from "./CharacterSectionHeading";
import useDelayedUpdate from "./useDelayedUpdate";
import QuillEditor from "../Common/QuillEditor/QuillEditor";

interface CharacterNotesProps {
  notes: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, "id">) => Promise<void>;
  canEdit: boolean;
  id: string;
}

function CharacterNotes({ notes, onSubmit, canEdit, id }: CharacterNotesProps) {
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  return (
    <Box>
      <CharacterSectionHeading>Notes</CharacterSectionHeading>
      <QuillEditor
        placeholder="Notes of your adventures"
        initial={notes}
        save={(nextVal) => {
          delayedUpdate({ notes: nextVal });
        }}
        updateOnChange={!canEdit}
        readOnly={!canEdit}
        height="auto"
        editorId={`character-notes-${id}`}
      />
    </Box>
  );
}

export default CharacterNotes;
