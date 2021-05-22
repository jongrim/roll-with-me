import * as React from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { RawHexMapModule } from '../APITypes';
import {
  BackgroundImage,
  GridConfig,
  ParsedHexMapModule,
} from './gridConfiguration';

export async function updateMapConfiguration({
  id,
  gridConfiguration,
  backgroundImages,
}: {
  id: string;
  gridConfiguration: GridConfig;
  backgroundImages?: BackgroundImage[];
}) {
  const input: {
    id: string;
    gridConfiguration: string;
    backgroundImages?: string[];
  } = {
    id,
    gridConfiguration: JSON.stringify(gridConfiguration),
  };
  if (backgroundImages) {
    input.backgroundImages = backgroundImages.map((img) => JSON.stringify(img));
  }
  API.graphql({
    query: mutations.updateHexMapModule,
    variables: {
      input,
    },
  });
}

function parseMapConfig(config?: RawHexMapModule): ParsedHexMapModule {
  return {
    id: config?.id || '',
    gridConfiguration: JSON.parse(config?.gridConfiguration || '{}'),
    backgroundImages:
      config?.backgroundImages?.map((img) => JSON.parse(img)) || [],
    createdAt: config?.createdAt || '',
    updatedAt: config?.updatedAt || '',
  };
}

export default function useMap({
  map,
}: {
  map: RawHexMapModule;
}): ParsedHexMapModule {
  const [module, setModule] = React.useState<ParsedHexMapModule>(
    parseMapConfig(map)
  );

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateHexMapModuleById,
      variables: {
        id: map.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        const nextModule = parseMapConfig(
          value?.data?.onUpdateHexMapModuleById
        );
        setModule(nextModule);
      },
    });
    return () => subscription.unsubscribe();
  }, [map.id]);

  return module;
}
