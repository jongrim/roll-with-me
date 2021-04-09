import * as React from 'react';
import { Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';
import { useDelayedCallback } from './useDelayedCallback';

export function DelayedInput({
  initialValue,
  key,
  onUpdate,
  ...rest
}: {
  initialValue: string;
  key: string;
  onUpdate: (val: string) => void;
} & InputProps) {
  const [trackedValue, setTrackedValue] = React.useState(initialValue);
  const { delayedUpdate } = useDelayedCallback<string>(onUpdate);
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
