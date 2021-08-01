import * as React from "react";

import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useToast } from "@chakra-ui/react";

export function useRoomCounters({ name, roomId, counters }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

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
      console.error("error sending", e);
      toast({
        title: "An error occurred",
        description: "Unable to complete the operation",
        status: "error",
      });
    } finally {
      setIsLoading(false);
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
    createCounter,
    updateCounter,
    deleteCounter,
    isLoading,
  };
}
