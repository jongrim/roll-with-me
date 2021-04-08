import * as React from 'react';
import debounce from 'lodash.debounce';

export function useDelayedCallback<T>(update: (val: T) => void) {
  const delayedUpdate = React.useCallback(
    debounce((val: T) => {
      update(val);
    }, 3000),
    [update]
  );
  return { delayedUpdate };
}
