import * as React from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import useDelayedUpdate from './useDelayedUpdate';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface CharacterNumberFieldProps {
  initial?: number;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  field: keyof Omit<UpdateTrophyGoldCharacterInput, 'id'>;
  canEdit: boolean;
}

export default function CharacterNumberField({
  initial,
  onSubmit,
  field,
  canEdit,
}: CharacterNumberFieldProps) {
  const [trackedValue, setTrackedValue] = React.useState(initial);
  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    setTrackedValue(initial);
  }, [initial]);

  if (initial === undefined) return null;

  return (
    <NumberInput
      isReadOnly={!canEdit}
      variant={canEdit ? 'outline' : 'filled'}
      size="sm"
      min={0}
      value={trackedValue}
      onChange={(_, val) => {
        if (val === trackedValue) return;
        setTrackedValue(val);
        delayedUpdate({ [field]: val });
      }}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
