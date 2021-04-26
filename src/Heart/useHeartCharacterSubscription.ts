import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { HeartCharacter } from '../API';

const useHeartCharacterSubscription = ({
  characters,
  gameId,
}: {
  characters: HeartCharacter[];
  gameId?: string;
}) => {
  const [trackedCharacterIds, setTrackedCharacterIds] = React.useState<
    string[]
  >([]);
  const [trackedCharacters, setTrackedCharacters] = React.useState<
    HeartCharacter[]
  >([]);

  React.useEffect(() => {
    // handles first load of characters with game data
    setTrackedCharacterIds(characters.map((c) => c.id || ''));
    setTrackedCharacters(characters);
  }, [characters]);

  React.useEffect(() => {
    if (!gameId) return;
    const newCharacterSubscription = API.graphql({
      query: subscriptions.onCreateHeartCharacterByGame,
      variables: {
        gameID: gameId,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedCharacterIds((cur) =>
          cur.concat(value.data.onCreateHeartCharacterByGame.id)
        );
        setTrackedCharacters((cur) =>
          cur.concat(value.data.onCreateHeartCharacterByGame)
        );
      },
    });
    return () => newCharacterSubscription.unsubscribe();
  }, [gameId]);

  React.useEffect(() => {
    const charSubscriptions = trackedCharacterIds.map((id) => {
      return API.graphql({
        query: subscriptions.onUpdateHeartCharacterById,
        variables: {
          id,
        },
        // @ts-ignore
      }).subscribe({
        // @ts-ignore
        next: ({ value }) => {
          setTrackedCharacters((cur) => {
            return cur.map((c) => {
              if (c.id === id) {
                return value.data.onUpdateHeartCharacterById;
              }
              return c;
            });
          });
        },
      });
    });

    return () =>
      charSubscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }, [trackedCharacterIds]);

  return trackedCharacters;
};

export default useHeartCharacterSubscription;
