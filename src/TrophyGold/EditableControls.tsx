import * as React from 'react';
import { ButtonGroup, IconButton, Flex } from '@chakra-ui/react';
import { RiEdit2Fill, RiCheckFill, RiCloseFill } from 'react-icons/ri';

interface EditableControlsProps {
  onSubmit: () => void;
  setIsEditing: (val: boolean) => void;
  isEditing: boolean;
}

function EditableControls({
  onSubmit,
  isEditing,
  setIsEditing,
}: EditableControlsProps) {
  return (
    <Flex justifyContent="end">
      {isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton
            variant="ghost"
            aria-label="save edit"
            icon={<RiCheckFill />}
            onClick={onSubmit}
          />
          <IconButton
            variant="ghost"
            aria-label="cancel edit"
            icon={<RiCloseFill />}
            onClick={() => setIsEditing(false)}
          />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton
            variant="ghost"
            aria-label="edit"
            size="sm"
            icon={<RiEdit2Fill />}
            onClick={() => setIsEditing(true)}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default EditableControls;
