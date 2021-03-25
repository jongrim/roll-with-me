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
  initial: number;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  field: keyof Omit<UpdateTrophyGoldCharacterInput, 'id'>;
}

export default function CharacterNumberField({
  initial,
  onSubmit,
  field,
}: CharacterNumberFieldProps) {
  const [trackedValue, setTrackedValue] = React.useState(initial);
  const delayedUpdate = useDelayedUpdate(onSubmit);
  return (
    <NumberInput
      size="sm"
      min={0}
      defaultValue={trackedValue}
      onChange={(_, val) => {
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
