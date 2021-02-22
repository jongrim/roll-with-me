import * as React from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { HeartRoomDetails } from '../APITypes';

const getRoomId = async (name: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.heartRoomByName,
    variables: { name },
  });
  if (data?.heartRoomByName?.items.length === 0) {
    throw new Error('room not found');
  }
  return data?.heartRoomByName?.items[0]?.id;
};

const getRoomData = async (id: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.getHeartRoom,
    variables: {
      id,
    },
  });
  return data;
};

const useHeartRoomLookup = (name: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [roomData, setRoomData] = React.useState<HeartRoomDetails>();
  const history = useHistory();
  React.useEffect(() => {
    if (name) {
      getRoomId(name)
        .then((id) => {
          getRoomData(id).then((data) => {
            setRoomData(data?.getHeartRoom);
            setIsLoading(false);
          });
        })
        .catch((e) => {
          if (e.message === 'room not found') {
            history.push(`/new-room?type=heart&name=${name}&notFound=true`);
          }
        });
    }
  }, [name, history]);

  React.useEffect(() => {
    if (!roomData?.id) return;
    const subscription = API.graphql({
      query: subscriptions.onUpdateHeartRoom,
      variables: {
        id: roomData.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setRoomData(value.data?.onUpdateHeartRoom);
      },
    });
    return () => subscription.unsubscribe();
  }, [roomData?.id]);

  return { data: roomData, isLoading };
};

export default useHeartRoomLookup;
