import * as React from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { TrophyGoldDiceModule } from '../API';

const useTrophyDice = ({
  diceModule,
}: {
  diceModule: TrophyGoldDiceModule;
}) => {
  const [
    trackedDiceModule,
    setTrackedDiceModule,
  ] = React.useState<TrophyGoldDiceModule>(diceModule);

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateTrophyGoldDiceModuleById,
      variables: {
        id: diceModule.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedDiceModule(value.data?.onUpdateTrophyGoldDiceModuleById);
      },
    });
    return () => subscription.unsubscribe();
  }, [diceModule.id]);

  return trackedDiceModule;
};

export default useTrophyDice;
