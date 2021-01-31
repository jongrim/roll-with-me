import { API } from 'aws-amplify';
import * as React from 'react';
import { add } from 'date-fns';
import { AuthContext } from './AuthProvider';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';
import * as mutations from './graphql/mutations';

export type userRoom = {
  id: string;
  updatedOn: string;
  textRoom?: { id: string; name: string };
  interactiveRoom?: { id: string; name: string };
  trophyDarkRoom?: { id: string; name: string };
  roomKey: roomKeyType;
  description?: string;
  defaultRoomUsername?: string;
};

type roomConnectionType =
  | 'userRoomInteractiveRoomId'
  | 'userRoomTextRoomId'
  | 'userRoomTrophyDarkRoomId';

type roomKeyType = 'textRoom' | 'interactiveRoom' | 'trophyDarkRoom';

const getRoomConnectionFromRoomKey = (key: roomKeyType): roomConnectionType => {
  switch (key) {
    case 'textRoom':
      return 'userRoomTextRoomId';
    case 'interactiveRoom':
      return 'userRoomInteractiveRoomId';
    case 'trophyDarkRoom':
      return 'userRoomTrophyDarkRoomId';
  }
};

async function lookupUserRooms() {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.listUserRooms,
    variables: {
      filter: {
        updatedOn: {
          gt: add(new Date(), { days: -30 }).toISOString(),
        },
      },
    },
    // @ts-ignore
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  });
  return data?.listUserRooms;
}

async function createUserRoom({
  roomId,
  roomKey,
  roomConnection,
  roomUsername = '',
}: {
  roomId: string;
  roomKey: roomKeyType;
  roomConnection: roomConnectionType;
  roomUsername?: string;
}) {
  try {
    await API.graphql({
      query: mutations.createUserRoom,
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        input: {
          roomKey,
          [roomConnection]: roomId,
          defaultRoomUsername: roomUsername,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

async function updateUserRoom({
  id,
  ...rest
}: {
  id: string;
  rest?: Record<string, string>[];
}) {
  try {
    await API.graphql({
      query: mutations.updateUserRoom,
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        input: {
          id,
          ...rest,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

interface AddToUserRoomArgs {
  roomKey: roomKeyType;
  roomId: string;
}

export const UserRoomContext = React.createContext<{
  userRooms: userRoom[];
  updateRoomActivity: ({ roomKey, roomId }: AddToUserRoomArgs) => void;
  updateUserRoom: ({
    id,
    ...rest
  }: {
    id: string;
    rest?: Record<string, string>[];
  }) => void;
  isLoaded: boolean;
}>({
  userRooms: [],
  updateRoomActivity: () => {},
  updateUserRoom,
  isLoaded: false,
});

interface userRoomsState {
  userRooms: userRoom[];
  isLoaded: boolean;
}

type userRoomsEvents =
  | {
      type: 'loading';
    }
  | {
      type: 'load';
      payload?: {
        data: userRoom[];
      };
    }
  | {
      type: 'addRoom';
      payload: {
        data: userRoom;
      };
    }
  | {
      type: 'updateRoom';
      payload: {
        data: userRoom;
      };
    };

const userRoomsReducer = (
  state: userRoomsState,
  event: userRoomsEvents
): userRoomsState => {
  switch (event.type) {
    case 'loading':
      return {
        isLoaded: false,
        userRooms: [],
      };
    case 'load':
      return {
        isLoaded: true,
        userRooms: event.payload?.data ?? state.userRooms,
      };
    case 'addRoom':
      return {
        isLoaded: true,
        userRooms: state.userRooms.concat(event.payload.data),
      };
    case 'updateRoom':
      return {
        isLoaded: true,
        userRooms: state.userRooms.map((r) => {
          if (r.id === event.payload.data.id) {
            return event.payload.data;
          }
          return r;
        }),
      };
  }
};

const defaultUserRoomsState: userRoomsState = {
  isLoaded: false,
  userRooms: [],
};

const UserRoomProvider: React.FC = ({ children }) => {
  const [{ isLoaded, userRooms }, dispatch] = React.useReducer(
    userRoomsReducer,
    defaultUserRoomsState
  );
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log({ user });
    dispatch({ type: 'loading' });

    lookupUserRooms()
      .then((rooms) => {
        dispatch({
          type: 'load',
          payload: {
            data: rooms.items,
          },
        });
      })
      .catch((e) => {
        console.warn(e);
        dispatch({ type: 'load' });
      });

    const createSubscription = API.graphql({
      query: subscriptions.onCreateUserRoom,
      variables: {
        owner: user?.username,
      },
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        dispatch({
          type: 'addRoom',
          payload: { data: value.data.onCreateUserRoom },
        });
      },
    });
    const updateSubscription = API.graphql({
      query: subscriptions.onUpdateUserRoom,
      variables: {
        owner: user?.username,
      },
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        dispatch({
          type: 'updateRoom',
          payload: { data: value.data.onUpdateUserRoom },
        });
      },
    });

    return () => {
      createSubscription?.unsubscribe?.();
      updateSubscription?.unsubscribe?.();
    };
  }, [user]);

  const updateRoomActivity = React.useCallback(
    async function ({ roomKey, roomId }: AddToUserRoomArgs) {
      if (!user) return;
      const roomConnection = getRoomConnectionFromRoomKey(roomKey);
      const matchingRoom = userRooms.find((room) => {
        let matchingRoom = false;
        matchingRoom = room.interactiveRoom?.id === roomId;
        matchingRoom = matchingRoom || room.textRoom?.id === roomId;
        matchingRoom = matchingRoom || room.trophyDarkRoom?.id === roomId;
        return matchingRoom;
      });
      if (matchingRoom) {
        updateUserRoom({ id: matchingRoom.id });
      } else {
        createUserRoom({ roomConnection, roomId, roomKey });
      }
    },
    [user, userRooms]
  );

  return (
    <UserRoomContext.Provider
      value={{ userRooms, updateRoomActivity, isLoaded, updateUserRoom }}
    >
      {children}
    </UserRoomContext.Provider>
  );
};

export default UserRoomProvider;
