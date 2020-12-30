import * as React from 'react';

import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { useToast } from '@chakra-ui/react';

export function useRoomCounters({ name, roomId }) {
  const [counters, setCounters] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateTextRoomByName,
      variables: {
        name,
      },
    }).subscribe({
      next: ({ value }) => {
        const nextCounters = value.data.onUpdateTextRoomByName?.counters ?? [];
        const parsedCounters = nextCounters.map((token) => JSON.parse(token));
        setCounters(parsedCounters);
        setIsLoading(false);
      },
    });
    return () => subscription.unsubscribe();
  }, [name]);

  React.useEffect(() => {
    async function getRoomData() {
      setIsLoading(true);
      try {
        const result = await API.graphql({
          query: queries.textRoomByName,
          variables: { name },
        });
        const counters = result.data?.textRoomByName?.items[0]?.counters ?? [];
        setCounters(counters.map((counter) => JSON.parse(counter)));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    getRoomData();
  }, [name]);

  async function updateAmplify(updatedCounters) {
    try {
      setIsLoading(true);
      await API.graphql({
        query: mutations.updateTextRoom,
        variables: {
          input: {
            id: roomId,
            counters: updatedCounters.map((c) => JSON.stringify(c)),
          },
        },
      });
    } catch (e) {
      console.error('error sending', e);
      setIsLoading(false);
      toast({
        title: 'An error occurred',
        description: 'Unable to complete the operation',
        status: 'error',
      });
    }
  }

  function createCounter(counter) {
    updateAmplify(counters.concat(counter));
  }

  function updateCounter(counter) {
    updateAmplify(
      counters.map((c) => {
        if (c.id === counter.id) {
          return counter;
        }
        return c;
      })
    );
  }

  function deleteCounter(counter) {
    updateAmplify(counters.filter((c) => c.id !== counter.id));
  }

  return {
    counters,
    createCounter,
    updateCounter,
    deleteCounter,
    isLoading,
  };
}
