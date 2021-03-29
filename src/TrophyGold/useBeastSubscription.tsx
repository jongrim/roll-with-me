import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { TrophyGoldBeast } from '../API';

const useBeastSubscription = ({
  beasts = [],
  gameID,
}: {
  beasts?: TrophyGoldBeast[];
  gameID?: string;
}) => {
  const [trackedBeastIds, setTrackedBeastIds] = React.useState<string[]>([]);
  const [trackedBeasts, setTrackedBeasts] = React.useState<TrophyGoldBeast[]>(
    []
  );

  React.useEffect(() => {
    // handles first load of characters with game data
    setTrackedBeastIds(
      beasts.map((b) => {
        if (b.id) return b.id;
        return '';
      })
    );
    setTrackedBeasts(beasts);
  }, [beasts]);

  React.useEffect(() => {
    if (!gameID) return;
    const newBeastSubscription = API.graphql({
      query: subscriptions.onCreateTrophyGoldBeastByGame,
      variables: {
        gameID,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedBeastIds((cur) =>
          cur.concat(value.data.onCreateTrophyGoldBeastByGame.id)
        );
        setTrackedBeasts((cur) =>
          cur.concat(value.data.onCreateTrophyGoldBeastByGame)
        );
      },
    });
    return () => newBeastSubscription.unsubscribe();
  }, [gameID]);

  React.useEffect(() => {
    const beastSubscriptions = trackedBeastIds.map((id) => {
      return API.graphql({
        query: subscriptions.onUpdateTrophyGoldBeastById,
        variables: {
          id,
        },
        // @ts-ignore
      }).subscribe({
        // @ts-ignore
        next: ({ value }) => {
          setTrackedBeasts((cur) => {
            return cur.map((c) => {
              if (c.id === id) {
                return value.data.onUpdateTrophyGoldBeastById;
              }
              return c;
            });
          });
        },
      });
    });

    return () =>
      beastSubscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
  }, [trackedBeastIds]);

  return trackedBeasts;
};

export default useBeastSubscription;
