import * as React from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { InteractiveRoomData } from '../APITypes';

const getRoomId = async (name: string) => {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: queries.interactiveRoomByName,
      variables: { name },
    });
    return data?.interactiveRoomByName?.items[0]?.id;
  } catch (e) {
    console.warn(e);
  }
};

const getRoomData = async (id: string) => {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: queries.getInteractiveRoom,
      variables: {
        id,
      },
    });
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const useRoomLookup = (name: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [roomData, setRoomData] = React.useState<InteractiveRoomData>();
  React.useEffect(() => {
    if (name) {
      getRoomId(name).then((id) => {
        getRoomData(id).then((data) => {
          setRoomData(data?.getInteractiveRoom);
          setIsLoading(false);
        });
      });
    }
  }, [name]);

  React.useEffect(() => {
    if (!roomData) return;
    const subscription = API.graphql({
      query: subscriptions.onUpdateInteractiveRoom,
      variables: {
        id: roomData.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setRoomData(value.data?.onUpdateInteractiveRoom);
      },
    });
    return () => subscription.unsubscribe();
  }, [roomData]);

  return { data: roomData, isLoading };
};

export default useRoomLookup;
