import * as React from 'react';
import {
  Input,
  InputProps,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  TextareaProps,
  NumberInputProps,
  CheckboxProps,
  Checkbox,
} from '@chakra-ui/react';
import { useDelayedCallback } from './useDelayedCallback';

export function DelayedInput({
  initialValue,
  key,
  onUpdate,
  delay = 1500,
  ...rest
}: {
  initialValue: string;
  key: string;
  onUpdate: (val: string) => void;
  delay?: number;
} & InputProps) {
  const [trackedValue, setTrackedValue] = React.useState(initialValue);
  const { delayedUpdate } = useDelayedCallback<string>(onUpdate, delay);
  return (
    <Input
      variant="flushed"
      value={trackedValue}
      onChange={({ target }) => {
        const nextVal = target.value;
        setTrackedValue(nextVal);
        delayedUpdate(nextVal);
      }}
      {...rest}
    />
  );
}

export function DelayedTextarea({
  initialValue,
  onUpdate,
  ...rest
}: {
  initialValue: string;
  onUpdate: (val: string) => void;
} & TextareaProps) {
  const [trackedValue, setTrackedValue] = React.useState(initialValue);
  const { delayedUpdate } = useDelayedCallback<string>(onUpdate);
  return (
    <Textarea
      variant="flushed"
      value={trackedValue}
      onChange={({ target }) => {
        const nextVal = target.value;
        setTrackedValue(nextVal);
        delayedUpdate(nextVal);
      }}
      {...rest}
    />
  );
}

interface DelayedNumberInputProps {
  initial?: number;
  onUpdate: (val: number) => void;
  canEdit: boolean;
  min?: number;
  delay?: number;
}

export default function DelayedNumberInput({
  initial,
  onUpdate,
  canEdit,
  min,
  delay = 1500,
  ...rest
}: DelayedNumberInputProps & NumberInputProps) {
  const [trackedValue, setTrackedValue] = React.useState(initial);
  const { delayedUpdate } = useDelayedCallback<number>(onUpdate, delay);

  React.useEffect(() => {
    setTrackedValue(initial);
  }, [initial]);

  React.useEffect(() => {
    if (min === undefined || trackedValue === undefined) return;
    if (min > trackedValue && canEdit) {
      setTrackedValue(min);
      delayedUpdate(min);
    }
  }, [min, trackedValue, delayedUpdate, canEdit]);

  const handleChange = React.useCallback(
    (_, val: number) => {
      if (val === trackedValue || isNaN(val)) return;
      setTrackedValue(val);
      delayedUpdate(val);
    },
    [setTrackedValue, delayedUpdate, trackedValue]
  );

  if (initial === undefined) return null;

  return (
    <NumberInput
      isReadOnly={!canEdit}
      variant={canEdit ? 'outline' : 'filled'}
      size="sm"
      min={min || 0}
      value={trackedValue}
      onChange={handleChange}
      {...rest}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

interface DelayedCheckboxProps {
  defaultChecked: boolean;
  onUpdate: (val: boolean) => void;
  delay?: number;
}

export function DelayedCheckbox({
  defaultChecked,
  onUpdate,
  children,
  delay = 500,
  ...rest
}: DelayedCheckboxProps & CheckboxProps) {
  const [trackedValue, setTrackedValue] = React.useState(defaultChecked);
  const { delayedUpdate } = useDelayedCallback<boolean>(onUpdate, delay);

  React.useEffect(() => {
    setTrackedValue(defaultChecked);
  }, [defaultChecked]);

  return (
    <Checkbox
      isChecked={trackedValue}
      onChange={({ target }) => {
        setTrackedValue(target.checked);
        delayedUpdate(target.checked);
      }}
      {...rest}
    >
      {children}
    </Checkbox>
  );
}
