import * as React from 'react';
import {
  Box,
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
  roll?: Roll;
}

interface dieResultsMap {
  [key: string]: {
    dice: Die[];
    sum: number;
  };
}

const RollResults: React.FC<RollResultsProps> = ({ roll }) => {
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
  console.log(diceMap);
  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottom="2px solid"
        borderBottomColor="inherit"
        pb={1}
        mb={2}
      >
        Last Roll
      </Heading>
      <Stat>
        <StatLabel>{roll?.rollName}</StatLabel>
        <StatNumber fontSize={26}>{roll?.sum}</StatNumber>
        <StatHelpText fontSize={14}>{`${groupResults.join(' + ')} + ${
          roll?.modifier
        }`}</StatHelpText>
      </Stat>
      {Object.entries(diceMap).map(([key, results]) => {
        return (
          <Box key={key} mt={4}>
            <HStack spacing={2}>
              <Heading as="h4" size="sm" colorScheme="brand">
                {key}
              </Heading>
              <Text color="gray.400" fontSize={12}>
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
    </>
  );
};

export default RollResults;
