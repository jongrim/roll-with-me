import * as React from 'react';
import debounce from 'lodash.debounce';

export function useDelayedCallback<T>(update: (val: T) => void, wait = 1500) {
  const delayedUpdate = React.useCallback(
    debounce((val: T) => {
      update(val);
    }, wait),
    [update, wait]
  );
  return { delayedUpdate };
}
