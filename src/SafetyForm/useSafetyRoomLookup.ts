import * as React from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { SafetyModule } from '../types';

const getModuleData = async (id: string) => {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: queries.getSafetyModule,
      variables: {
        id,
      },
    });
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const useSafetyModuleLookup = (id: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [safetyModule, setSafetyModule] = React.useState<SafetyModule>({
    id: '',
    xCardActive: false,
    linesAndVeils: [],
  });
  React.useEffect(() => {
    if (id) {
      getModuleData(id).then((data) => {
        const parsedModule = data?.getSafetyModule;
        parsedModule.linesAndVeils = parsedModule.linesAndVeils.map(
          (i: string) => JSON.parse(i)
        );
        setSafetyModule(parsedModule);
        setIsLoading(false);
      });
    }
  }, [id]);

  React.useEffect(() => {
    if (!id) return;
    const subscription = API.graphql({
      query: subscriptions.onUpdateSafetyModuleById,
      variables: {
        id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        const nextSafetyModule = value?.data?.onUpdateSafetyModuleById ?? {
          id: '',
          xCardActive: false,
          linesAndVeils: [],
        };
        nextSafetyModule.linesAndVeils = nextSafetyModule.linesAndVeils.map(
          (i: string) => JSON.parse(i)
        );
        setSafetyModule(nextSafetyModule);
      },
    });
    return () => subscription.unsubscribe();
  }, [id]);

  return { ...safetyModule, isLoading };
};

export default useSafetyModuleLookup;
