import * as React from 'react';
import debounce from 'lodash.debounce';

export default function useDelayedState() {
  const [isUpdating, internalSetIsUpdating] = React.useState(false);
  const delayedUpdateInternal = React.useCallback(
    debounce((setIsUpdating: (val: boolean) => void) => {
      setIsUpdating(false);
    }, 1000),
    []
  );
  const setIsUpdating = React.useCallback(() => {
    if (!isUpdating) internalSetIsUpdating(true);
    delayedUpdateInternal(internalSetIsUpdating);
  }, [delayedUpdateInternal, isUpdating]);
  return { isUpdating, setIsUpdating };
}
