import * as React from 'react';
import { Text, HStack, Stack, Box } from '@chakra-ui/react';

interface HeartDiceDisplayProps {
  d4Dice: { username: string; result: number }[];
  d6Dice: { username: string; result: number }[];
  d8Dice: { username: string; result: number }[];
  d10Dice: { username: string; result: number }[];
  d12Dice: { username: string; result: number }[];
}

const HeartDiceDisplay = ({
  d4Dice,
  d6Dice,
  d8Dice,
  d10Dice,
  d12Dice,
}: HeartDiceDisplayProps) => {
  let username =
    d4Dice.length > 0
      ? d4Dice[0].username
      : d6Dice.length > 0
      ? d6Dice[0].username
      : d8Dice.length > 0
      ? d8Dice[0].username
      : d10Dice.length > 0
      ? d10Dice[0].username
      : d12Dice.length > 0
      ? d12Dice[0].username
      : 'a ghost';
  return (
    <Stack direction="column" spacing={4} mt={6}>
      {d4Dice.length > 0 && (
        <Box>
          <Text fontSize="lg" borderBottom="1px solid" borderColor="inherit">
            D4
          </Text>
          <HStack spacing={3}>
            {d4Dice.map((d, i) => (
              <Text key={`${d.result} - ${i}`} fontWeight="500" fontSize="lg">
                {d.result}
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      {d6Dice.length > 0 && (
        <Box>
          <Text fontSize="lg" borderBottom="1px solid" borderColor="inherit">
            D6
          </Text>
          <HStack spacing={3}>
            {d6Dice.map((d, i) => (
              <Text key={`${d.result} - ${i}`} fontWeight="500" fontSize="lg">
                {d.result}
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      {d8Dice.length > 0 && (
        <Box>
          <Text fontSize="lg" borderBottom="1px solid" borderColor="inherit">
            D8
          </Text>
          <HStack spacing={3}>
            {d8Dice.map((d, i) => (
              <Text key={`${d.result} - ${i}`} fontWeight="500" fontSize="lg">
                {d.result}
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      {d10Dice.length > 0 && (
        <Box>
          <Text fontSize="lg" borderBottom="1px solid" borderColor="inherit">
            D10
          </Text>
          <HStack spacing={3}>
            {d10Dice.map((d, i) => (
              <Text key={`${d.result} - ${i}`} fontWeight="500" fontSize="lg">
                {d.result}
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      {d12Dice.length > 0 && (
        <Box>
          <Text fontSize="lg" borderBottom="1px solid" borderColor="inherit">
            D12
          </Text>
          <HStack spacing={3}>
            {d12Dice.map((d, i) => (
              <Text key={`${d.result} - ${i}`} fontWeight="500" fontSize="lg">
                {d.result}
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      <Text mt={6} opacity="0.8">
        Rolled by {username}
      </Text>
    </Stack>
  );
};

export default HeartDiceDisplay;
