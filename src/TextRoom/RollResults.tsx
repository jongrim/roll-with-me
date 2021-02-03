import * as React from 'react';
import {
  Box,
  Center,
  CircularProgress,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { Die, Roll } from '../types';

interface RollResultsProps {
  roll: Roll;
  isRolling: boolean;
}

interface dieResultsMap {
  [key: string]: {
    dice: Die[];
    sum: number;
  };
}

const RollResults: React.FC<RollResultsProps> = ({ roll, isRolling }) => {
  const diceMap: dieResultsMap = React.useMemo(() => {
    let map: dieResultsMap = {};
    roll?.dice.forEach((d) => {
      if (map[d.name]) {
        map[d.name].dice.push(d);
        map[d.name].sum += d.result || 0;
      } else {
        map[d.name] = { dice: [d], sum: d.result || 0 };
      }
    });
    return map;
  }, [roll]);
  const groupResults = Object.values(diceMap).map((results) => results.sum);
  return (
    <>
      <HStack
        spacing={2}
        borderBottom="2px solid"
        borderBottomColor="inherit"
        pb={1}
        mb={2}
      >
        <Heading as="h3" size="md">
          Last Roll
        </Heading>
        <Text size="sm" fontWeight="300">
          by {roll.rolledBy}
        </Text>
      </HStack>
      {isRolling ? (
        <Center h="100%">
          <CircularProgress isIndeterminate color="blue.300" />
        </Center>
      ) : (
        <Box data-testid="last-roll-results">
          <Stat>
            <StatLabel>{roll?.rollName}</StatLabel>
            <StatNumber fontSize={26}>{roll?.sum}</StatNumber>
            <StatHelpText fontSize={14}>{`${groupResults.join(' + ')} + ${
              roll?.modifier
            }`}</StatHelpText>
          </Stat>
          {Object.entries(diceMap).map(([key, results], i) => {
            return (
              <Box key={key} mt={4} data-testid={`die-${i}`}>
                <HStack spacing={2}>
                  <Heading as="h4" size="sm" colorScheme="brand">
                    {key}
                  </Heading>
                  <Text fontSize="xs" fontWeight="300" opacity="0.8">
                    {results.sum} total
                  </Text>
                </HStack>
                <Divider mt={1} mb={2} />
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  {results.dice.map((d, i) => (
                    <GridItem key={d.id}>
                      <Stat>
                        <StatNumber>{d.result}</StatNumber>
                        <StatHelpText fontSize={11}>Die {i + 1}</StatHelpText>
                      </Stat>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default RollResults;
