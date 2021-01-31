import * as React from 'react';
import { AuthContext } from '../AuthProvider';
import { UserRoomContext } from '../UserRoomProvider';

const useUserRoom = ({ roomName }: { roomName: string }) => {
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
      console.log(
        'setting username from effect',
        userRoomSettings?.defaultRoomUsername
      );
      setName(userRoomSettings?.defaultRoomUsername);
    }
  }, [userRoomSettings]);

  const updateUserSetting = (args: Record<string, string>) => {
    if (!userRoomSettings) return;
    updateUserRoom({ id: userRoomSettings?.id, ...args });
  };

  const setUsername = (name: string) => {
    if (user) {
      updateUserSetting({ defaultRoomUsername: name });
    } else {
      setName(name);
    }
  };

  // console.log({ isLoaded, userRooms, userRoomSettings });

  return {
    username: name,
    setUsername,
    userRoomSettings,
    isLoaded,
    updateUserSetting,
  };
};

export default useUserRoom;
