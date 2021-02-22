import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { HeartCharacter } from '../APITypes';

type Character = Exclude<HeartCharacter, null>;

const useCharacterSubscription = (character: Character) => {
  const [trackedCharacter, setTrackedCharacter] = React.useState<Character>(
    character
  );

  React.useEffect(() => {
    const characterSubscription = API.graphql({
      query: subscriptions.onUpdateHeartCharacterById,
      variables: {
        id: character.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedCharacter(value.data.onUpdateHeartCharacterById);
      },
    });

    return () => characterSubscription.unsubscribe();
  }, [character.id]);

  return trackedCharacter;
};

export default useCharacterSubscription;
