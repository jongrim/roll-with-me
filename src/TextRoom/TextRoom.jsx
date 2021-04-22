import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import TextRoomPage from './TextRoomPage';
import { assignResultsToDice, sumOfDice } from '../utils/rolls';

import { useToast } from '@chakra-ui/react';
import { UserRoomContext } from '../UserRoomProvider';
import { RandomNumbersContext } from '../RandomNumbersProvider';

const LOCAL_STORAGE_ROLL_KEY = 'local-saved-rolls';

function TextRoom({ name }) {
  const toast = useToast();
  const history = useHistory();

  const { getNumbers } = React.useContext(RandomNumbersContext);

  const [roomId, setRoomId] = React.useState();
  const [rolls, setRolls] = React.useState([]);
  const [customDice, setCustomDice] = React.useState([]);
  const [counters, setCounters] = React.useState([]);

  const [safetyModule, setSafetyModule] = React.useState({});

  const [isRolling, setIsRolling] = React.useState(false);
  const [isSavingRoll, setIsSavingRoll] = React.useState(false);
  const [isDeletingRoll, setIsDeletingRoll] = React.useState(false);

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
        const parsedRolls = nextRolls.map((roll) => JSON.parse(roll));
        const nextCustomDice =
          value.data.onUpdateTextRoomByName?.customDice ?? [];
        const parsedCustomDice = nextCustomDice.map((die) => JSON.parse(die));
        setRolls(parsedRolls);
        setCustomDice(parsedCustomDice);
        setIsRolling(false);
      },
      error: (errors) => {
        toast({
          status: 'error',
          description:
            'Lost connection to game server. Please refresh the page',
          duration: null,
        });
      },
    });
    return () => subscription.unsubscribe();
  }, [name, toast]);

  React.useEffect(() => {
    async function getRoomData() {
      try {
        const result = await API.graphql({
          query: queries.textRoomByName,
          variables: { name },
        });
        const data = result.data?.textRoomByName?.items[0];
        if (!data) {
          history.push(`/new-room?type=text&name=${name}&notFound=true`);
        }
        setRoomId(data.id);
        const rolls = data?.rolls ?? [];
        setRolls(rolls.map((roll) => JSON.parse(roll)));
        const customDice = data?.customDice ?? [];
        setCustomDice(customDice.map((die) => JSON.parse(die)));
        const roomCounters = data?.counters ?? [];
        setCounters(roomCounters.map((counter) => JSON.parse(counter)));
        const safety = data?.safetyModule ?? {};
        safety.linesAndVeils = safety.linesAndVeils.map((i) => JSON.parse(i));
        setSafetyModule(safety);
      } catch (e) {
        if (
          e.errors &&
          e.errors[0].message ===
            "Variable 'id' has coerced Null value for NonNull type 'ID!'"
        ) {
          history.push(`/new-room?type=text&name=${name}&notFound=true`);
        }
        console.error(e);
      }
    }
    getRoomData();
  }, [name, history]);

  // Loading User Rolls
  const { user } = React.useContext(AuthContext);
  const { updateRoomActivity } = React.useContext(UserRoomContext);
  const [savedRolls, setSavedRolls] = React.useState([]);
  React.useEffect(() => {
    async function loadSavedRolls() {
      try {
        const { data } = await API.graphql({
          query: queries.listSavedRolls,
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
    }
  }, [user]);

  React.useEffect(() => {
    const localRolls = window.localStorage.getItem(LOCAL_STORAGE_ROLL_KEY);
    const parsedRolls = JSON.parse(localRolls);
    if (parsedRolls) {
      setSavedRolls((cur) => cur.concat(parsedRolls));
    }
  }, []);

  // Updating Rolls
  async function updateRoll(roll) {
    if (roll.offline) {
      updateLocalRoll(roll);
    } else {
      await updateRollInAmplify(roll);
    }
    toast({
      title: 'Roll updated',
      status: 'info',
      duration: 7000,
      isClosable: true,
    });
  }

  async function updateRollInAmplify(roll) {
    setIsSavingRoll(true);
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
    } finally {
      setIsSavingRoll(false);
    }
  }

  function updateLocalRoll(roll) {
    setSavedRolls((cur) => {
      const nextSavedRolls = cur.map((r) => {
        if (r.id === roll.id) {
          return { ...roll, offline: true };
        }
        return r;
      });
      window.localStorage.setItem(
        LOCAL_STORAGE_ROLL_KEY,
        JSON.stringify(nextSavedRolls)
      );
      return nextSavedRolls;
    });
  }

  // Deleting Rolls
  async function deleteRoll(roll) {
    if (roll.offline) {
      deleteLocalRoll(roll);
    } else {
      await deleteRollInAmplify(roll);
    }
    toast({
      title: 'Roll deleted',
      status: 'info',
      duration: 7000,
      isClosable: true,
    });
  }

  function deleteLocalRoll(roll) {
    setSavedRolls((cur) => {
      const nextSavedRolls = cur.filter((r) => r.id !== roll.id);
      window.localStorage.setItem(
        LOCAL_STORAGE_ROLL_KEY,
        JSON.stringify(nextSavedRolls)
      );
      return nextSavedRolls;
    });
  }

  async function deleteRollInAmplify(roll) {
    setIsDeletingRoll(true);
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
    } finally {
      setIsDeletingRoll(false);
    }
  }

  /**
   * SAVING ROLLS
   */
  async function saveRoll(roll) {
    if (user) {
      await saveToAmplify(roll);
    } else {
      saveToLocal(roll);
    }
    toast({
      title: 'Roll saved',
      status: 'info',
      duration: 7000,
      isClosable: true,
    });
  }

  function saveToLocal(roll) {
    setSavedRolls((cur) => {
      const nextSavedRolls = cur.concat({ ...roll, offline: true });
      window.localStorage.setItem(
        LOCAL_STORAGE_ROLL_KEY,
        JSON.stringify(nextSavedRolls)
      );
      return nextSavedRolls;
    });
  }

  async function saveToAmplify(roll) {
    setIsSavingRoll(true);
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
    } finally {
      setIsSavingRoll(false);
    }
    return;
  }

  /**
   * ROLLING
   */
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
    updateRoomActivity({
      roomKey: 'textRoom',
      roomId,
    });
    setIsRolling(true);
    try {
      const results = await getNumbers(rollWithoutResults.dice.length);
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
    } finally {
      // cleanup if something went wrong
      setTimeout(() => {
        if (isRolling) {
          setIsRolling(false);
        }
      }, 1000 * 30);
    }
  }

  /**
   * SAFETY TOOLS
   */
  const [xCardChanging, setXCardChanging] = React.useState(false);
  async function setXCard(value) {
    setXCardChanging(true);
    try {
      await API.graphql({
        query: mutations.updateSafetyModule,
        variables: {
          input: {
            id: safetyModule.id,
            xCardActive: value,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setXCardChanging(false);
    }
    return;
  }

  return (
    <TextRoomPage
      roomId={roomId}
      roomName={name}
      onSubmit={onSubmit}
      rolls={rolls}
      customDice={customDice}
      savedRolls={savedRolls}
      createRoll={saveRoll}
      deleteRoll={deleteRoll}
      editRoll={updateRoll}
      loadingStates={{
        isRolling,
        isSavingRoll,
        isDeletingRoll,
      }}
      safetyModule={safetyModule}
      updateXCard={setXCard}
      xCardChanging={xCardChanging}
    />
  );
}

export default TextRoom;
