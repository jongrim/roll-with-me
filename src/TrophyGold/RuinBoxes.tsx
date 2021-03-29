import * as React from 'react';
import { Button, Center, HStack, useColorModeValue } from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

const ruinArray = [1, 2, 3, 4, 5, 6];

const setRuin = async ({ id, ruin }: { id: string; ruin: number }) => {
  try {
    await API.graphql({
      query: mutations.updateTrophyGoldCharacter,
      variables: {
        input: {
          id,
          ruin,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

interface RuinBoxesProps {
  id: string;
  ruin: number;
  baseRuin: number;
}

export default function RuinBoxes({ id, ruin, baseRuin }: RuinBoxesProps) {
  const disabledRuinBgColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <HStack spacing={3} mt={2}>
      {ruinArray.map((num) => (
        <Button
          key={`ruin-${num}`}
          h="32px"
          w="32px"
          p={0}
          minW={0}
          variant="ghost"
          rounded="sm"
          border="1px solid"
          borderColor="inherit"
          disabled={num <= baseRuin}
          backgroundColor={num <= ruin ? disabledRuinBgColor : 'transparent'}
          onClick={() => {
            if (num > ruin) {
              setRuin({ id, ruin: num });
            } else {
              setRuin({ id, ruin: num - 1 });
            }
          }}
        >
          <Center h="full">{num}</Center>
        </Button>
      ))}
    </HStack>
  );
}
