import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { TrophyDarkCharacter } from '../APITypes';

type Character = Exclude<TrophyDarkCharacter, null>;

const useCharacterSubscription = (character: Character) => {
  const [trackedCharacter, setTrackedCharacter] = React.useState<Character>(
    character
  );

  React.useEffect(() => {
    const characterSubscription = API.graphql({
      query: subscriptions.onUpdateTrophyDarkCharacterById,
      variables: {
        id: character.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedCharacter(value.data.onUpdateTrophyDarkCharacterById);
      },
    });

    return () => characterSubscription.unsubscribe();
  }, [character.id]);

  return trackedCharacter;
};

export default useCharacterSubscription;
