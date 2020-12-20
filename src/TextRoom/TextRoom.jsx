import * as React from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import TextRoomPage from './TextRoomPage';
import { getRandomNumbers } from '../functions/randomNumbers';
import { assignResultsToDice, sumOfDice } from '../utils/rolls';

function TextRoom({ name }) {
  const [roomId, setRoomId] = React.useState();
  const [rolls, setRolls] = React.useState([]);

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateTextRoomByName,
      variables: {
        name,
      },
    }).subscribe({
      next: ({ value }) => {
        const nextRolls = value.data.onUpdateTextRoomByName?.rolls ?? [];
        setRolls(nextRolls.map((roll) => JSON.parse(roll)));
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
        const rolls = result.data?.textRoomByName?.items[0]?.rolls ?? [];
        setRolls(rolls.map((roll) => JSON.parse(roll)));
      } catch (e) {
        console.error(e);
      }
    }
    getRoomData();
  }, [name]);

  async function sendRoll(roll) {
    try {
      await API.graphql({
        query: mutations.updateTextRoom,
        variables: {
          input: {
            id: roomId,
            rolls: [roll].concat(rolls).map((r) => JSON.stringify(r)),
          },
        },
      });
    } catch (e) {
      console.error('error sending', e);
    }
  }

  async function onSubmit(rollWithoutResults) {
    try {
      const results = await getRandomNumbers(rollWithoutResults.dice.length);
      const diceWithResults = assignResultsToDice({
        dice: rollWithoutResults.dice,
        results,
      });
      const rollWithResults = { ...rollWithoutResults, dice: diceWithResults };
      rollWithResults.sum =
        sumOfDice(rollWithResults.dice) + rollWithResults.modifier;
      sendRoll(rollWithResults);
    } catch (e) {
      console.error('error sending', e);
    }
  }

  return <TextRoomPage onSubmit={onSubmit} rolls={rolls} />;
}

export default TextRoom;
