import * as React from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBin4Line,
} from 'react-icons/ri';
import { API } from 'aws-amplify';
import gsap, { Elastic } from 'gsap';
import { Draggable } from 'gsap/all';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { VisualCounter } from '../types';

const VCounter = ({
  counter,
  setActionInProgress,
  updateActivity,
}: {
  counter: VisualCounter;
  setActionInProgress: (val: boolean) => void;
  updateActivity: () => void;
}) => {
  const [trackedCounter, setTrackedCounter] = React.useState<VisualCounter>(
    counter
  );

  React.useEffect(() => {
    Draggable.create(document.getElementById(`${trackedCounter.id}`), {
      allowEventDefault: true,
      type: 'x,y',
      bounds: document.getElementById('dice-box'),
      onDragEnd: async function () {
        setActionInProgress(true);
        try {
          await API.graphql({
            query: mutations.updateCounter,
            variables: {
              input: {
                x: this.endX,
                y: this.endY,
                id: trackedCounter.id,
              },
            },
          });
        } catch (e) {
          console.warn(e);
        } finally {
          setActionInProgress(false);
        }
      },
    });
  }, [trackedCounter.id, setActionInProgress]);

  const el = React.useRef(null);
  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateCounterById,
      variables: {
        id: trackedCounter.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        setTrackedCounter({
          x: value.data?.onUpdateCounterById?.x,
          y: value.data?.onUpdateCounterById?.y,
          value: value.data?.onUpdateCounterById?.value,
          max: value.data?.onUpdateCounterById?.max,
          title: value.data?.onUpdateCounterById?.title,
          type: value.data?.onUpdateCounterById?.type,
          id: value.data?.onUpdateCounterById?.id,
        });
        gsap.to(el.current, {
          x: value.data?.onUpdateCounterById?.x,
          y: value.data?.onUpdateCounterById?.y,
          duration: 0.25,
          ease: Elastic.easeOut.config(1, 1),
        });
        setActionInProgress(false);
      },
    });
    return () => subscription.unsubscribe();
  }, [trackedCounter.id, setActionInProgress]);

  React.useEffect(() => {
    gsap.to(el.current, {
      x: trackedCounter.x,
      y: trackedCounter.y,
      duration: 0.25,
      ease: Elastic.easeOut.config(1, 1),
    });
  }, [trackedCounter.x, trackedCounter.y]);

  const increment = () => {
    setActionInProgress(true);
    updateActivity();
    try {
      API.graphql({
        query: mutations.updateCounter,
        variables: {
          input: {
            id: trackedCounter.id,
            value: trackedCounter.value + 1,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };
  const decrement = () => {
    setActionInProgress(true);
    updateActivity();
    try {
      API.graphql({
        query: mutations.updateCounter,
        variables: {
          input: {
            id: trackedCounter.id,
            value: trackedCounter.value - 1,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const deleteCounter = async () => {
    setActionInProgress(true);
    updateActivity();
    try {
      API.graphql({
        query: mutations.deleteCounter,
        variables: {
          input: {
            id: trackedCounter.id,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
  };

  if (trackedCounter.type === 'CLOCK')
    return (
      <Box
        id={trackedCounter.id}
        ref={el}
        display="inline-block"
        position="absolute"
      >
        <Clock
          id={trackedCounter.id}
          value={trackedCounter.value}
          max={trackedCounter.max || 0}
          title={trackedCounter.title}
          increment={increment}
          decrement={decrement}
          deleteCounter={deleteCounter}
        />
      </Box>
    );

  return (
    <Box h={8} w={12} id={trackedCounter.id} ref={el} border="1px solid blue">
      {`${trackedCounter.value}/${trackedCounter.max}`}
    </Box>
  );
};

interface ClockProps {
  id: string;
  value: number;
  max: number;
  title: string;
  increment: () => void;
  decrement: () => void;
  deleteCounter: () => void;
}

const Clock: React.FC<ClockProps> = ({
  id,
  value,
  max,
  title,
  increment,
  decrement,
  deleteCounter,
}) => {
  const el = React.useRef(null);
  const time = (value / max) * 100;
  React.useEffect(() => {
    gsap.to(el.current, {
      duration: 0.25,
      strokeDasharray: time > 50 ? `${time + 0.5} 100` : `${time} 100`,
    });
  }, [time]);

  return (
    <Flex
      maxW={24}
      data-testid={id}
      flexDirection="column"
      align="center"
      position="absolute"
    >
      <Text>{title}</Text>
      <svg
        data-testid={`${id}-svg`}
        viewBox="0 0 32 32"
        style={{
          background: 'transparent',
          borderRadius: '50%',
          transform: 'rotate(-90deg)',
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        <circle
          ref={el}
          fill="#44ffd2"
          stroke="#F26DF9"
          strokeWidth={32}
          strokeDasharray={`${time} 100`}
          r="16"
          cx="16"
          cy="16"
        />
      </svg>
      <Text my={1}>{`${value} / ${max}`}</Text>
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          size="sm"
          variant="outline"
          disabled={value === 0}
          icon={<RiArrowLeftLine />}
          onClick={decrement}
          aria-label="decrement clock count"
          mr={1}
        />
        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="red"
          icon={<RiDeleteBin4Line />}
          onClick={deleteCounter}
          aria-label="delete clock"
          ml={1}
          mr={1}
        />
        <IconButton
          size="sm"
          variant="outline"
          disabled={value === max}
          icon={<RiArrowRightLine />}
          onClick={increment}
          aria-label="increment clock count"
          ml={1}
        />
      </Flex>
    </Flex>
  );
};

export default VCounter;
