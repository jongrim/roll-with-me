import * as React from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import TextRoomPage from './TextRoomPage';

function TextRoom({ name }) {
  const [roomId, setRoomId] = React.useState();
  const [rolls, setRolls] = React.useState();

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateTextRoomByName,
      variables: {
        name,
      },
    }).subscribe({
      next: ({ value }) => {
        setRolls(value.data.onUpdateTextRoomByName?.rolls);
      },
    });
    return () => subscription.unsubscribe();
  }, [name]);

  React.useEffect(() => {
    async function getRoomData() {
      try {
        const result = await API.graphql({
          query: queries.textRoomByName,
          variables: { name },
        });
        setRoomId(result.data?.textRoomByName?.items[0]?.id);
        setRolls(result.data?.textRoomByName?.items[0]?.rolls);
      } catch (e) {
        console.error(e);
      }
    }
    getRoomData();
  }, [name]);

  async function sendRoll() {
    try {
      await API.graphql({
        query: mutations.updateTextRoom,
        variables: {
          input: {
            id: roomId,
            rolls: rolls.concat(JSON.stringify({ roll: 6, dice: [2, 4] })),
          },
        },
      });
    } catch (e) {
      console.error('error sending', e);
    }
  }

  const [hideDebug, setHideDebug] = React.useState(false);

  return (
    <>
      {!hideDebug && (
        <div>
          <p>you're in a text room {name}</p>
          <p>roomId {roomId}</p>
          <button onClick={() => sendRoll()}>Send new roll</button>
          <button onClick={() => setHideDebug(true)}>Hide Debug</button>
          <p>rolls {rolls}</p>
        </div>
      )}
      <TextRoomPage />
    </>
  );
}

export default TextRoom;
