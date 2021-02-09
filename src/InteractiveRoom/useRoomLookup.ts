import * as React from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { InteractiveRoomData } from '../APITypes';

const getRoomId = async (name: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.interactiveRoomByName,
    variables: { name },
  });
  if (data?.interactiveRoomByName?.items.length === 0) {
    throw new Error('room not found');
  }
  return data?.interactiveRoomByName?.items[0]?.id;
};

const getRoomData = async (id: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.getInteractiveRoom,
    variables: {
      id,
    },
  });
  return data;
};

const useRoomLookup = (name: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [roomData, setRoomData] = React.useState<InteractiveRoomData>();
  const history = useHistory();
  React.useEffect(() => {
    if (name) {
      getRoomId(name)
        .then((id) => {
          getRoomData(id).then((data) => {
            setRoomData(data?.getInteractiveRoom);
            setIsLoading(false);
          });
        })
        .catch((e) => {
          if (e.message === 'room not found') {
            history.push(`/new-room?type=visual&name=${name}&notFound=true`);
          }
        });
    }
  }, [name, history]);

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
