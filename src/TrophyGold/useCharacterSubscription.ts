import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { RawTrophyGoldCharacter } from '../APITypes';

const useCharacterSubscription = ({
  characters,
  gameId,
}: {
  characters: RawTrophyGoldCharacter[];
  gameId?: string;
}) => {
  const [trackedCharacters, setTrackedCharacters] = React.useState<
    RawTrophyGoldCharacter[]
  >([]);

  React.useEffect(() => {
    // handles first load of characters with game data
    setTrackedCharacters(characters);
  }, [characters]);

  React.useEffect(() => {
    if (!gameId) return;
    const newCharacterSubscription = API.graphql({
      query: subscriptions.onCreateTrophyGoldCharacterByGame,
      variables: {
        gameID: gameId,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedCharacters((cur) =>
          cur.concat(value.data.onCreateTrophyGoldCharacterByGame)
        );
      },
    });
    return () => newCharacterSubscription.unsubscribe();
  }, [gameId]);

  React.useEffect(() => {
    const charSubscriptions = trackedCharacters.map((character) => {
      return API.graphql({
        query: subscriptions.onUpdateTrophyGoldCharacterById,
        variables: {
          id: character.id,
        },
        // @ts-ignore
      }).subscribe({
        // @ts-ignore
        next: ({ value }) => {
          setTrackedCharacters((cur) => {
            return cur.map((c) => {
              if (c.id === character.id) {
                return value.data.onUpdateTrophyGoldCharacterById;
              }
              return c;
            });
          });
        },
      });
    });

    return () => charSubscriptions.forEach((sub) => sub.unsubscribe());
  }, [trackedCharacters]);

  return trackedCharacters;
};

export default useCharacterSubscription;
