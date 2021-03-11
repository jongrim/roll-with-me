import * as React from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { RawTrophyGoldRoomDetails } from '../APITypes';
import { TrophyGoldRoomDetails } from './TrophyGoldGameTypes';

const getRoomId = async (name: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.trophyGoldRoomByName,
    variables: { name },
  });
  if (data?.trophyGoldRoomByName?.items.length === 0) {
    throw new Error('room not found');
  }
  return data?.trophyGoldRoomByName?.items[0]?.id;
};

const getRoomData = async (id: string) => {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.getTrophyGoldRoom,
    variables: {
      id,
    },
  });
  return data;
};

const useTrophyRoomLookup = (name: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [roomData, setRoomData] = React.useState<RawTrophyGoldRoomDetails>();
  const history = useHistory();
  React.useEffect(() => {
    if (name) {
      getRoomId(name)
        .then((id) => {
          getRoomData(id).then((data) => {
            setRoomData(data?.getTrophyGoldRoom);
            setIsLoading(false);
          });
        })
        .catch((e) => {
          if (e.message === 'room not found') {
            history.push(
              `/new-room?type=trophy-gold&name=${name}&notFound=true`
            );
          }
        });
    }
  }, [name, history]);

  React.useEffect(() => {
    if (!roomData?.id) return;
    const subscription = API.graphql({
      query: subscriptions.onUpdateTrophyGoldRoom,
      variables: {
        id: roomData.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setRoomData(value.data?.onUpdateTrophyGoldRoom);
      },
    });
    return () => subscription.unsubscribe();
  }, [roomData?.id]);

  return { data: roomData, isLoading };
};

export default useTrophyRoomLookup;
