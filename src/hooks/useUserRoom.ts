import * as React from 'react';
import { AuthContext } from '../AuthProvider';
import {
  createUserRoom,
  getRoomConnectionFromRoomKey,
  roomKeyType,
  UserRoomContext,
} from '../UserRoomProvider';

const useUserRoom = ({
  roomName,
  roomKey,
  roomId,
}: {
  roomName: string;
  roomKey: roomKeyType;
  roomId: string;
}) => {
  const [name, setName] = React.useState('');
  const { user } = React.useContext(AuthContext);
  const { userRooms, isLoaded, updateUserRoom } = React.useContext(
    UserRoomContext
  );

  const userRoomSettings = React.useMemo(
    () => userRooms.find((r) => r[r?.roomKey]?.name === roomName),
    [userRooms, roomName]
  );

  React.useEffect(() => {
    if (userRoomSettings?.defaultRoomUsername) {
      setName(userRoomSettings?.defaultRoomUsername);
    }
  }, [userRoomSettings]);

  const updateUserSetting = (args: Record<string, string>) => {
    if (!userRoomSettings) return;
    updateUserRoom({ id: userRoomSettings?.id, ...args });
  };

  const setUsername = async (name: string) => {
    setName(name);
    if (user) {
      if (!userRoomSettings) {
        const roomConnection = getRoomConnectionFromRoomKey(roomKey);
        createUserRoom({ roomKey, roomId, roomConnection }).then((data) => {
          updateUserRoom({ id: data.id, defaultRoomUsername: name });
        });
      } else {
        updateUserSetting({ defaultRoomUsername: name });
      }
    }
  };

  return {
    username: name,
    setUsername,
    userRoomSettings,
    isLoaded,
    updateUserSetting,
  };
};

export default useUserRoom;
