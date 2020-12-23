import * as React from 'react';
import { AuthContext } from '../AuthProvider';
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

  /**
   * All the amplify API calls because they're a pain in the butt with Typescript
   */

  // Text Room Data including Rolls
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

  // Saving User Rolls
  const { user } = React.useContext(AuthContext);
  const [savedRolls, setSavedRolls] = React.useState([]);
  React.useEffect(() => {
    async function loadSavedRolls() {
      try {
        // @ts-ignore
        const { data } = await API.graphql({
          query: queries.listSavedRolls,
          // @ts-ignore
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const rolls = data?.listSavedRolls?.items ?? [];
        setSavedRolls(
          rolls.map((roll) => {
            return {
              id: roll?.id || '',
              rollName: roll?.rollName || '',
              modifier: roll?.modifier || 0,
              dice: roll?.dice.map((r) => JSON.parse(r)) || [],
            };
          })
        );
      } catch (e) {
        console.warn(e);
      }
    }

    if (user) {
      loadSavedRolls();
    } else {
      console.log('no user, check local');
    }
  }, [user]);

  async function saveToAmplify(roll) {
    const rollToSave = {
      rollName: roll.rollName,
      dice: roll.dice.map((d) => JSON.stringify(d)),
      modifier: roll.modifier,
    };
    try {
      const { data } = await API.graphql({
        query: mutations.createSavedRoll,
        variables: {
          input: rollToSave,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const createdRoll = data?.createSavedRoll;
      setSavedRolls((cur) =>
        cur.concat({
          id: createdRoll.id,
          rollName: createdRoll.rollName,
          modifier: createdRoll.modifier,
          dice: createdRoll.dice.map((d) => JSON.parse(d)),
        })
      );
    } catch (e) {
      console.warn(e);
    }
  }

  async function updateRoll(roll) {
    const rollToSave = {
      id: roll.id,
      rollName: roll.rollName,
      dice: roll.dice.map((d) => JSON.stringify(d)),
      modifier: roll.modifier,
    };
    try {
      const { data } = await API.graphql({
        query: mutations.updateSavedRoll,
        variables: {
          input: rollToSave,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const createdRoll = data?.updateSavedRoll;
      setSavedRolls((cur) =>
        cur
          .filter((roll) => roll.id !== createdRoll.id)
          .concat({
            id: createdRoll.id,
            rollName: createdRoll.rollName,
            modifier: createdRoll.modifier,
            dice: createdRoll.dice.map((d) => JSON.parse(d)),
          })
      );
    } catch (e) {
      console.warn(e);
    }
  }

  async function deleteRoll(roll) {
    try {
      await API.graphql({
        query: mutations.deleteSavedRoll,
        variables: {
          input: {
            id: roll.id,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      setSavedRolls((cur) => cur.filter((r) => r.id !== roll.id));
    } catch (e) {
      console.warn(e);
    }
  }

  async function saveRoll(roll) {
    if (user) {
      saveToAmplify(roll);
    } else {
      // save locally, maybe after prompt
    }
  }

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

  return (
    <TextRoomPage
      onSubmit={onSubmit}
      rolls={rolls}
      savedRolls={savedRolls}
      createRoll={saveToAmplify}
      deleteRoll={deleteRoll}
      editRoll={updateRoll}
      saveRoll={saveRoll}
    />
  );
}

export default TextRoom;
