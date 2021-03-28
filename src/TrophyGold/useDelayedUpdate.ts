import * as React from 'react';
import debounce from 'lodash.debounce';
import { UpdateTrophyGoldCharacterInput } from '../API';

export default function useDelayedUpdate(
  update: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>
) {
  const delayedUpdate = React.useCallback(
    debounce(async (val: Record<string, unknown>) => {
      await update({
        ...val,
      });
    }, 3000),
    [update]
  );
  return { delayedUpdate };
}
